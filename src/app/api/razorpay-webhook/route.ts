import { NextRequest } from "next/server";
import crypto from "crypto";
import { getDonorDraft, persistDonation } from "@/lib/donations";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET not configured");
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: {
    event: string;
    payload: {
      payment: {
        entity: {
          id: string;
          order_id?: string;
          amount: number;
          currency: string;
          email?: string;
          contact?: string;
          notes?: Record<string, string | null>;
          created_at?: number; // unix seconds
        };
      };
    };
  };
  try {
    event = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const amountInRupees = payment.amount / 100;

    console.log(
      `[Razorpay] Payment captured — ID: ${payment.id}, Order: ${payment.order_id ?? "(none)"}, Amount: ₹${amountInRupees}`
    );

    // ─── Persist donation record (Phase 1a) ────────────────────────────
    try {
      const orderId = payment.order_id ?? "";
      let donor = orderId ? await getDonorDraft(orderId) : null;

      // Fallback: synthesize an anonymous donor record from Razorpay's basic
      // fields if no draft was stored. This happens if create-order failed to
      // stash (Redis down, legacy donate flow, etc.). The donation is still
      // logged — donor can request a receipt manually.
      if (!donor) {
        const fallbackEmail = payment.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payment.email)
          ? payment.email
          : "no-email@example.invalid";
        donor = {
          name: payment.notes?.donor_name ?? "Anonymous Donor",
          email: fallbackEmail,
          phone: payment.contact ?? undefined,
          anonymous: true,
        };
        console.warn(`[Razorpay] No donor draft for order ${orderId} — fell back to anonymous.`);
      }

      const capturedAt = payment.created_at ? new Date(payment.created_at * 1000) : new Date();
      const result = await persistDonation({
        paymentId: payment.id,
        orderId,
        amount: payment.amount,
        currency: payment.currency,
        capturedAt,
        donor,
      });
      console.log(
        `[Razorpay] Donation ${result.created ? "persisted" : "already existed"}: receipt ${result.record.receiptNumber} (FY ${result.record.fy})`
      );

      // Phase 1b — when receipt email goes out, attach BOTH:
      //   1. Dynamically-generated provisional receipt PDF (from @react-pdf/renderer)
      //   2. Static 80(G) certificate PDF (from STATIC_RECEIPT_ATTACHMENTS in
      //      src/lib/donations.ts — currently /public/80g-certificate.pdf)
      // Only send if result.record.status === "provisional_issued" and donor
      // is not anonymous. See STATIC_RECEIPT_ATTACHMENTS for the file list.
    } catch (err) {
      // Persistence failure must NOT cause webhook retry storms or expose
      // internals. Log and continue — donor still paid; can be reconciled
      // from Razorpay dashboard.
      console.error("[Razorpay] persistDonation failed:", err);
    }

    // ─── GA4 server-side conversion event (existing) ───────────────────
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const gaMpSecret = process.env.GA4_MEASUREMENT_PROTOCOL_SECRET;
    if (gaId && gaMpSecret) {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${gaId}&api_secret=${gaMpSecret}`,
        {
          method: "POST",
          body: JSON.stringify({
            client_id: payment.id, // use payment ID as proxy client_id
            events: [
              {
                name: "donation",
                params: {
                  currency: payment.currency,
                  value: amountInRupees,
                  transaction_id: payment.id,
                  payment_method: "razorpay",
                },
              },
            ],
          }),
        }
      ).catch((err) => console.error("[GA4 MP] Failed to send event:", err));
    }
  }

  return Response.json({ received: true });
}
