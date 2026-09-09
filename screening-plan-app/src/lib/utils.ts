import { randomBytes, randomInt, timingSafeEqual } from "crypto";

/** Tailwind class merge without the dependency. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Unambiguous alphabet — no 0/O, 1/I/L. */
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Booking reference, e.g. "ATB-7F3K9Q". */
export function generateReference(prefix = "ATB") {
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)];
  }
  return `${prefix}-${out}`;
}

/** Secret embedded in self-service manage/cancel links. */
export function generateManageToken() {
  return randomBytes(24).toString("hex");
}

/** Length-independent constant-time string comparison. */
export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    // Still burn a comparison so timing doesn't leak the length.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const IST_TZ = "Asia/Kolkata";

export function formatDate(date: Date, timeZone = IST_TZ) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function formatTime(date: Date, timeZone = IST_TZ) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

export function formatDateTime(date: Date, timeZone = IST_TZ) {
  return `${formatDate(date, timeZone)} · ${formatTime(date, timeZone)}`;
}

export function formatShortDate(date: Date, timeZone = IST_TZ) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(date);
}

/** "in 3 days" / "today" / "past" — used for list badges. */
export function relativeDay(date: Date, now = new Date()) {
  const ms = date.getTime() - now.getTime();
  const days = Math.round(ms / 86_400_000);
  if (ms < 0) return "Past";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 7) return `In ${days} days`;
  if (days < 14) return "Next week";
  return `In ${Math.round(days / 7)} weeks`;
}

/** `datetime-local` input value in a given IANA time zone. */
export function toDateTimeLocal(date: Date, timeZone = IST_TZ) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

/**
 * Interpret a `datetime-local` string as wall-clock time in `timeZone`
 * and return the corresponding UTC instant.
 */
export function fromDateTimeLocal(value: string, timeZone = IST_TZ): Date {
  const naive = new Date(`${value}:00Z`);
  if (Number.isNaN(naive.getTime())) {
    throw new Error(`Invalid date-time value: ${value}`);
  }
  // Offset = how far the zone is from UTC at that instant.
  const tzDate = new Date(naive.toLocaleString("en-US", { timeZone }));
  const utcDate = new Date(naive.toLocaleString("en-US", { timeZone: "UTC" }));
  const offset = tzDate.getTime() - utcDate.getTime();
  return new Date(naive.getTime() - offset);
}

export const SCREENING_TIME_ZONE = IST_TZ;

export function siteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return raw.replace(/\/+$/, "");
}

export function manageUrl(reference: string, token: string) {
  return `${siteUrl()}/booking/${encodeURIComponent(reference)}?t=${token}`;
}
