import crypto from "crypto";
import { redis } from "./redis";

/**
 * Donation persistence + receipt numbering for 80(G) compliance.
 *
 * Two-stage flow:
 *   1. Provisional receipt issued at payment.captured (this module persists the record)
 *   2. Form 10BE certificate issued after annual Form 10BD filing with IT Dept
 *
 * Redis schema:
 *   donation:order:{order_id}          → JSON, donor draft from create-order step (TTL 24h)
 *   donation:payment:{payment_id}      → JSON, full donation record (no TTL)
 *   donation:fy:{2026-27}:counter      → int, INCR for sequential receipt numbering
 *   donation:fy:{2026-27}:index        → sorted set (score=captured_at, value=payment_id)
 *
 * PAN handling: encrypted-at-rest with AES-256-GCM if PAN_ENCRYPTION_KEY is set
 * (32-byte hex). Falls back to plaintext with a server log warning if missing.
 */

// ─── Types ─────────────────────────────────────────────────────────────────

export interface DonorDetails {
  name: string;
  email: string;
  phone?: string;
  pan?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  anonymous: boolean; // if true, skip 80G — no PAN/address required
}

export interface DonationRecord {
  paymentId: string;
  orderId: string;
  amount: number; // paise
  currency: string;
  capturedAt: string; // ISO
  receiptNumber: string; // e.g. WR/2026-27/000123
  fy: string; // e.g. 2026-27
  donor: DonorDetails;
  panEncrypted?: string | null; // ciphertext if encryption key configured
  status: "provisional_issued" | "10be_issued";
  form10be?: { certificateNumber: string; issuedAt: string; pdfUrl: string };
}

// ─── Validation ────────────────────────────────────────────────────────────

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const PHONE_REGEX = /^[+\d\s()-]{6,20}$/;

export function validateDonorDetails(input: unknown): { ok: true; donor: DonorDetails } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Missing donor details" };
  const d = input as Record<string, unknown>;

  const name = typeof d.name === "string" ? d.name.trim() : "";
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";
  const anonymous = d.anonymous === true;

  if (!name || name.length < 2 || name.length > 100) return { ok: false, error: "Name is required (2–100 chars)" };
  if (!EMAIL_REGEX.test(email) || email.length > 254) return { ok: false, error: "Valid email is required" };
  if (phone && !PHONE_REGEX.test(phone)) return { ok: false, error: "Phone format invalid" };

  // header-injection block
  for (const v of [name, email, phone]) {
    if (typeof v === "string" && /[\r\n]/.test(v)) return { ok: false, error: "Invalid characters in input" };
  }

  if (anonymous) {
    return { ok: true, donor: { name, email, phone: phone || undefined, anonymous: true } };
  }

  // 80G path — PAN + address required
  const pan = typeof d.pan === "string" ? d.pan.trim().toUpperCase() : "";
  const addressLine1 = typeof d.addressLine1 === "string" ? d.addressLine1.trim() : "";
  const city = typeof d.city === "string" ? d.city.trim() : "";
  const state = typeof d.state === "string" ? d.state.trim() : "";
  const pincode = typeof d.pincode === "string" ? d.pincode.trim() : "";
  const country = typeof d.country === "string" ? d.country.trim() : "India";

  if (!PAN_REGEX.test(pan)) return { ok: false, error: "Valid PAN required (10 chars, e.g. ABCDE1234F). Or check 'donate anonymously' to skip 80G." };
  if (!addressLine1 || addressLine1.length > 300) return { ok: false, error: "Address required (max 300 chars)" };
  if (!city || city.length > 80) return { ok: false, error: "City required" };
  if (!state || state.length > 80) return { ok: false, error: "State required" };
  if (country === "India" && !PINCODE_REGEX.test(pincode)) return { ok: false, error: "Valid Indian pincode required (6 digits)" };

  return {
    ok: true,
    donor: { name, email, phone: phone || undefined, pan, addressLine1, city, state, pincode, country, anonymous: false },
  };
}

// ─── Financial Year ────────────────────────────────────────────────────────

/** India FY runs 1 Apr – 31 Mar. Returns "2026-27" for any date in that range. */
export function getFinancialYear(date: Date = new Date()): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-indexed; March = 2, April = 3
  const startYear = month >= 3 ? year : year - 1;
  const endYear = (startYear + 1) % 100;
  return `${startYear}-${endYear.toString().padStart(2, "0")}`;
}

// ─── PAN Encryption ────────────────────────────────────────────────────────

function getEncryptionKey(): Buffer | null {
  const hex = process.env.PAN_ENCRYPTION_KEY;
  if (!hex) return null;
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
    console.warn("[donations] PAN_ENCRYPTION_KEY must be 32-byte hex — encryption disabled");
    return null;
  }
  return Buffer.from(hex, "hex");
}

export function encryptPan(pan: string): string | null {
  const key = getEncryptionKey();
  if (!key) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(pan, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  // store as base64(iv).base64(ct).base64(tag)
  return `${iv.toString("base64")}.${ct.toString("base64")}.${tag.toString("base64")}`;
}

export function decryptPan(ciphertext: string): string | null {
  const key = getEncryptionKey();
  if (!key) return null;
  try {
    const [ivB64, ctB64, tagB64] = ciphertext.split(".");
    if (!ivB64 || !ctB64 || !tagB64) return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
    decipher.setAuthTag(Buffer.from(tagB64, "base64"));
    const pt = Buffer.concat([decipher.update(Buffer.from(ctB64, "base64")), decipher.final()]);
    return pt.toString("utf8");
  } catch (err) {
    console.error("[donations] PAN decryption failed:", err);
    return null;
  }
}

// ─── Receipt Number Generator ──────────────────────────────────────────────

/**
 * Atomic INCR per FY counter. Returns format WR/{fy}/{seq:06d}.
 * Throws if Redis not configured — fail loudly rather than ship duplicate receipt numbers.
 */
export async function nextReceiptNumber(fy: string): Promise<string> {
  if (!redis) throw new Error("Redis not configured — cannot issue receipt number");
  const key = `donation:fy:${fy}:counter`;
  const seq = await redis.incr(key);
  return `WR/${fy}/${seq.toString().padStart(6, "0")}`;
}

// ─── Draft Storage (create-order → webhook handoff) ───────────────────────

/**
 * Stores donor draft when create-order is called, keyed by Razorpay order_id.
 * 24h TTL — webhook normally fires within seconds of payment.
 */
export async function storeDonorDraft(orderId: string, donor: DonorDetails): Promise<void> {
  if (!redis) {
    console.warn("[donations] Redis not configured — donor draft not stored. Receipt cannot be auto-generated.");
    return;
  }
  await redis.set(`donation:order:${orderId}`, JSON.stringify(donor), { ex: 24 * 60 * 60 });
}

export async function getDonorDraft(orderId: string): Promise<DonorDetails | null> {
  if (!redis) return null;
  const raw = await redis.get<string | Record<string, unknown>>(`donation:order:${orderId}`);
  if (!raw) return null;
  // Upstash sometimes auto-deserializes JSON
  if (typeof raw === "object") return raw as unknown as DonorDetails;
  try {
    return JSON.parse(raw) as DonorDetails;
  } catch {
    return null;
  }
}

// ─── Donation Record Persistence ───────────────────────────────────────────

/**
 * Idempotent persist. Returns existing record if paymentId already stored
 * (webhook can be re-delivered by Razorpay).
 */
export async function persistDonation(params: {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  capturedAt: Date;
  donor: DonorDetails;
}): Promise<{ created: boolean; record: DonationRecord }> {
  if (!redis) {
    throw new Error("Redis not configured — cannot persist donation");
  }

  const key = `donation:payment:${params.paymentId}`;

  // Check existing first
  const existing = await redis.get<string | Record<string, unknown>>(key);
  if (existing) {
    const record = typeof existing === "object" ? (existing as unknown as DonationRecord) : (JSON.parse(existing as string) as DonationRecord);
    return { created: false, record };
  }

  const fy = getFinancialYear(params.capturedAt);
  const receiptNumber = await nextReceiptNumber(fy);

  const panEncrypted = params.donor.pan ? encryptPan(params.donor.pan) : null;

  const record: DonationRecord = {
    paymentId: params.paymentId,
    orderId: params.orderId,
    amount: params.amount,
    currency: params.currency,
    capturedAt: params.capturedAt.toISOString(),
    receiptNumber,
    fy,
    donor: panEncrypted
      ? { ...params.donor, pan: undefined } // drop plaintext PAN from main record
      : params.donor,
    panEncrypted,
    status: "provisional_issued",
  };

  // Write with NX so concurrent webhook deliveries don't double-assign receipt numbers.
  // (set with nx returns null if key already exists.)
  const written = await redis.set(key, JSON.stringify(record), { nx: true });
  if (written === null) {
    // race lost — read what the winner wrote
    const winner = await redis.get<string | Record<string, unknown>>(key);
    const wRecord = typeof winner === "object" ? (winner as unknown as DonationRecord) : (JSON.parse(winner as string) as DonationRecord);
    // The counter we just spent is now unused — leave it; gap in sequence is fine.
    console.warn(`[donations] Race on ${params.paymentId} — burnt receipt number ${receiptNumber}`);
    return { created: false, record: wRecord };
  }

  // Index by FY for admin listing
  await redis.zadd(`donation:fy:${fy}:index`, { score: params.capturedAt.getTime(), member: params.paymentId });

  return { created: true, record };
}

export async function getDonation(paymentId: string): Promise<DonationRecord | null> {
  if (!redis) return null;
  const raw = await redis.get<string | Record<string, unknown>>(`donation:payment:${paymentId}`);
  if (!raw) return null;
  return typeof raw === "object" ? (raw as unknown as DonationRecord) : (JSON.parse(raw as string) as DonationRecord);
}

export async function listDonationsForFy(fy: string): Promise<DonationRecord[]> {
  if (!redis) return [];
  const paymentIds = await redis.zrange<string[]>(`donation:fy:${fy}:index`, 0, -1);
  if (!paymentIds || paymentIds.length === 0) return [];
  const records: DonationRecord[] = [];
  for (const pid of paymentIds) {
    const r = await getDonation(pid);
    if (r) records.push(r);
  }
  return records;
}
