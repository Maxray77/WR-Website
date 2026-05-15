import { NextRequest } from "next/server";
import crypto from "crypto";
import { getFinancialYear, listDonationsForFy, decryptPan, type DonationRecord } from "@/lib/donations";
import { checkRateLimit } from "@/lib/redis";

/**
 * Admin endpoint to export donations for an FY in Form 10BD-compatible CSV.
 *
 * Auth: HTTP Basic, credentials from ADMIN_USERNAME / ADMIN_PASSWORD env vars.
 * If not configured, endpoint returns 503.
 *
 * Hardening:
 *  - constant-time credential comparison (defeats byte-by-byte timing attacks)
 *  - 20 requests/hour per IP rate limit (bounds brute-force without
 *    throttling the small admin team's legitimate CSV exports)
 *
 * Usage:
 *   GET /api/admin/donations                  → current FY, CSV
 *   GET /api/admin/donations?fy=2025-26       → specific FY, CSV
 *   GET /api/admin/donations?format=json      → JSON dump (no PAN; encrypted only)
 *   GET /api/admin/donations?format=10bd      → Form 10BD CSV (PAN decrypted)
 */

/** Constant-time string compare. Pads with zeros so length mismatch is itself constant-time. */
function constantTimeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  // Force equal length to defeat early-exit length leak. Compare expected
  // (b) against itself once and against (a)-padded once; AND the results.
  const max = Math.max(aBuf.length, bBuf.length);
  const aPad = Buffer.concat([aBuf, Buffer.alloc(max - aBuf.length)], max);
  const bPad = Buffer.concat([bBuf, Buffer.alloc(max - bBuf.length)], max);
  const valueEq = crypto.timingSafeEqual(aPad, bPad);
  const lengthEq = aBuf.length === bBuf.length;
  return valueEq && lengthEq;
}

function requireAuth(request: NextRequest): { ok: true } | { ok: false; res: Response } {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPass) {
    return {
      ok: false,
      res: Response.json({ error: "Admin endpoint not configured" }, { status: 503 }),
    };
  }
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return {
      ok: false,
      res: new Response("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="WR Admin", charset="UTF-8"' },
      }),
    };
  }
  let decoded = "";
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    // malformed base64
  }
  const sepIdx = decoded.indexOf(":");
  const u = sepIdx >= 0 ? decoded.slice(0, sepIdx) : decoded;
  const p = sepIdx >= 0 ? decoded.slice(sepIdx + 1) : "";
  // Always run BOTH comparisons (no short-circuit) so failure timing reveals
  // neither which field is wrong nor any length information.
  const userOk = constantTimeEqual(u, adminUser);
  const passOk = constantTimeEqual(p, adminPass);
  if (!userOk || !passOk) {
    return {
      ok: false,
      res: new Response("Invalid credentials", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="WR Admin", charset="UTF-8"' },
      }),
    };
  }
  return { ok: true };
}

function csvField(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toFormBdRow(d: DonationRecord, idx: number): string[] {
  const pan = d.panEncrypted ? (decryptPan(d.panEncrypted) ?? "") : (d.donor.pan ?? "");
  // Form 10BD official columns (as per Income Tax Dept template):
  //   SL.NO, Pre-Acknowledgement Number, Name of donor, ID Type, ID Number,
  //   Section Code, Unique Identification Number of donor, Donation Type,
  //   Mode of receipt, Amount of donation (Indian rupees)
  const sectionCode = "80G(5)(iv)"; // WR's 80G clause
  const idType = pan ? "1" : ""; // 1 = PAN
  const donationType = "Specific Grant"; // generic donations
  const mode = "Other than Cash"; // Razorpay = electronic
  const amountRupees = (d.amount / 100).toFixed(2);

  return [
    String(idx + 1),
    d.receiptNumber,
    d.donor.name,
    idType,
    pan,
    sectionCode,
    "", // Unique Identification Number (typically Aadhaar — left blank unless captured)
    donationType,
    mode,
    amountRupees,
    // Plus contextual fields for our own reference (CA can ignore these)
    d.donor.email,
    d.donor.phone ?? "",
    d.donor.addressLine1 ?? "",
    d.donor.city ?? "",
    d.donor.state ?? "",
    d.donor.pincode ?? "",
    d.donor.country ?? "",
    d.paymentId,
    d.capturedAt,
  ];
}

export async function GET(request: NextRequest) {
  // Rate limit first so brute-force attempts can't bypass via 401 responses
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkRateLimit("admin", ip);
  if (!allowed) {
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": "3600" },
    });
  }

  const auth = requireAuth(request);
  if (!auth.ok) return auth.res;

  const url = new URL(request.url);
  const fy = url.searchParams.get("fy") ?? getFinancialYear();
  const format = url.searchParams.get("format") ?? "10bd";

  const donations = await listDonationsForFy(fy);

  if (format === "json") {
    return Response.json({
      fy,
      count: donations.length,
      total_rupees: donations.reduce((s, d) => s + d.amount, 0) / 100,
      donations: donations.map((d) => ({
        ...d,
        donor: { ...d.donor, pan: undefined }, // never return PAN in JSON
        panEncrypted: d.panEncrypted ? "[encrypted]" : null,
      })),
    });
  }

  // Default: Form 10BD CSV
  const header = [
    "SL.NO", "Pre-Acknowledgement Number", "Name of donor", "ID Type", "ID Number",
    "Section Code", "UIN", "Donation Type", "Mode of receipt", "Amount (INR)",
    // contextual / internal columns
    "Email", "Phone", "Address", "City", "State", "Pincode", "Country",
    "Razorpay Payment ID", "Captured At",
  ];
  const rows = [
    header.map(csvField).join(","),
    ...donations.map((d, idx) => toFormBdRow(d, idx).map(csvField).join(",")),
  ];
  const csv = "﻿" + rows.join("\r\n"); // BOM for Excel UTF-8

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="WR-donations-${fy}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
