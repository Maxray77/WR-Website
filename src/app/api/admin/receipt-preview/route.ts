import { NextRequest } from "next/server";
import { renderReceiptPdf } from "@/lib/receipt-pdf";
import type { DonationRecord } from "@/lib/donations";
import { timingSafeStrEqual, enforceAdminRateLimit } from "@/lib/admin-auth";

/**
 * Admin endpoint — generate a sample provisional 80(G) receipt PDF for layout
 * preview. Returns the PDF inline so it renders in-browser.
 *
 * Protected by HTTP Basic auth using ADMIN_USERNAME / ADMIN_PASSWORD. If those
 * env vars aren't set, returns 503 — same posture as /api/admin/donations.
 *
 * Query params (all optional, sensible defaults):
 *   - name=Jane+Doe
 *   - email=jane@example.com
 *   - amount=2500           (rupees)
 *   - pan=ABCDE1234F
 *   - city=Bangalore
 *   - state=Karnataka
 *   - pincode=560001
 *
 * Use this after editing receipt-pdf.tsx to spot-check the layout.
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

export async function GET(request: NextRequest) {
  const limited = await enforceAdminRateLimit(request);
  if (limited) return limited;

  const auth = checkAuth(request);
  if (!auth.ok) {
    return new Response(auth.message, {
      status: auth.status,
      headers: auth.status === 401 ? { "WWW-Authenticate": 'Basic realm="Wildlife Rescue Admin"' } : {},
    });
  }

  const url = new URL(request.url);
  const q = url.searchParams;
  const amountRupees = Number(q.get("amount") ?? "2500");
  if (!Number.isFinite(amountRupees) || amountRupees < 1) {
    return new Response("Invalid amount", { status: 400 });
  }

  const now = new Date();
  const fy = (() => {
    const y = now.getUTCFullYear();
    const startYear = now.getUTCMonth() >= 3 ? y : y - 1;
    const endYear = (startYear + 1) % 100;
    return `${startYear}-${endYear.toString().padStart(2, "0")}`;
  })();

  const pan = (q.get("pan") ?? "ABCDE1234F").toUpperCase();

  const sample: DonationRecord = {
    paymentId: `pay_${Math.random().toString(36).slice(2, 16)}`,
    orderId: `order_${Math.random().toString(36).slice(2, 16)}`,
    amount: Math.round(amountRupees * 100),
    currency: "INR",
    capturedAt: now.toISOString(),
    receiptNumber: `WR/${fy}/PREVIEW`,
    fy,
    donor: {
      name: q.get("name") ?? "Jane Doe",
      email: q.get("email") ?? "jane@example.com",
      phone: q.get("phone") ?? "+91 98765 43210",
      addressLine1: q.get("address") ?? "Flat 4B, Greenpark Apartments, MG Road",
      city: q.get("city") ?? "Bangalore",
      state: q.get("state") ?? "Karnataka",
      pincode: q.get("pincode") ?? "560001",
      country: "India",
      anonymous: false,
    },
    panEncrypted: null,
    status: "provisional_issued",
  };

  try {
    const pdf = await renderReceiptPdf(sample, pan);
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="receipt-preview.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[receipt-preview] Render failed:", err);
    return new Response(`Render failed: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
  }
}
