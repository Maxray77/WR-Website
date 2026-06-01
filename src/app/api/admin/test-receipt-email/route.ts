import { NextRequest, NextResponse } from "next/server";
import { sendDonationReceipt } from "@/lib/email";
import type { DonationRecord } from "@/lib/donations";
import { timingSafeStrEqual } from "@/lib/admin-auth";

/**
 * Admin endpoint — fire a real Resend test email to an arbitrary inbox.
 *
 * Used for deliverability testing across providers (Gmail / Outlook / Yahoo /
 * ProtonMail / Indian providers). Sends the same tax-pack email a real donor
 * would receive, with both PDFs attached.
 *
 * Protected by HTTP Basic auth using ADMIN_USERNAME / ADMIN_PASSWORD.
 *
 * Query params:
 *   - to=foo@gmail.com           (REQUIRED — recipient inbox)
 *   - name=Test+Donor            (optional, default "Test Donor")
 *   - amount=100                 (optional rupees, default 100)
 *   - pan=ABCDE1234F             (optional)
 *
 * Receipt number uses a "TEST-{timestamp}" suffix so test records don't
 * collide with real ones in subject lines / logs.
 *
 * Example:
 *   curl -u wr-admin:'<password>' \
 *     'https://www.raptorrescue.org/api/admin/test-receipt-email?to=you@gmail.com'
 */

function checkAuth(request: NextRequest): { ok: true } | { ok: false; status: number; message: string } {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) {
    return { ok: false, status: 503, message: "Admin credentials not configured" };
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return { ok: false, status: 401, message: "Unauthorized" };
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  const idx = decoded.indexOf(":");
  if (idx === -1) return { ok: false, status: 401, message: "Unauthorized" };
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);
  if (!timingSafeStrEqual(u, adminUsername) || !timingSafeStrEqual(p, adminPassword)) {
    return { ok: false, status: 401, message: "Unauthorized" };
  }
  return { ok: true };
}

function currentFy(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const startYear = now.getUTCMonth() >= 3 ? y : y - 1;
  const endYear = (startYear + 1) % 100;
  return `${startYear}-${endYear.toString().padStart(2, "0")}`;
}

export async function GET(request: NextRequest) {
  const auth = checkAuth(request);
  if (!auth.ok) {
    return new Response(auth.message, {
      status: auth.status,
      headers: auth.status === 401 ? { "WWW-Authenticate": 'Basic realm="Wildlife Rescue Admin"' } : {},
    });
  }

  const url = new URL(request.url);
  const q = url.searchParams;
  const to = q.get("to");
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({ error: "Missing or invalid ?to= query param" }, { status: 400 });
  }

  const amountRupees = Number(q.get("amount") ?? "100");
  if (!Number.isFinite(amountRupees) || amountRupees < 1) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const fy = currentFy();
  const stamp = Date.now().toString(36).toUpperCase();
  const pan = (q.get("pan") ?? "ABCDE1234F").toUpperCase();

  const sample: DonationRecord = {
    paymentId: `pay_test_${stamp}`,
    orderId: `order_test_${stamp}`,
    amount: Math.round(amountRupees * 100),
    currency: "INR",
    capturedAt: new Date().toISOString(),
    receiptNumber: `WR/${fy}/TEST-${stamp}`,
    fy,
    donor: {
      name: q.get("name") ?? "Test Donor",
      email: to,
      phone: "+91 98765 43210",
      addressLine1: "Flat 4B, Greenpark Apartments, MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
      anonymous: false,
    },
    panEncrypted: null,
    status: "provisional_issued",
  };
  // sendDonationReceipt falls back to inline donor.pan when panEncrypted is null
  (sample.donor as { pan?: string }).pan = pan;

  const result = await sendDonationReceipt(sample);

  return NextResponse.json(
    {
      to,
      receiptNumber: sample.receiptNumber,
      ...result,
    },
    { status: result.sent ? 200 : 500 }
  );
}
