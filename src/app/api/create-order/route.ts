import { NextRequest } from "next/server";
import { storeDonorDraft, validateDonorDetails, type DonorDetails } from "@/lib/donations";

export async function POST(request: NextRequest) {
  let body: { amount?: unknown; donor?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // amount must be a positive integer in paise (min ₹1 = 100 paise)
  const { amount } = body;
  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 100 || amount > 10_000_000) {
    return Response.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Validate donor details. Donor is optional for backwards compatibility,
  // but if absent the donation cannot be 80G-receipted (only acknowledged).
  let donor: DonorDetails | null = null;
  if (body.donor !== undefined) {
    const result = validateDonorDetails(body.donor);
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    donor = result.donor;
  }

  // After validation: check the gateway is configured. Local dev without
  // Razorpay credentials still gets validation feedback above.
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return Response.json({ error: "Payment service unavailable" }, { status: 503 });
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  // NOTE: we deliberately do NOT pass PAN/address into Razorpay's `notes`.
  // Donor PII stays in our Redis only, keyed by order_id.
  const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: `wr_${Date.now()}`,
      notes: {
        source: "wildlife-rescue-website",
        // include only non-PII donor markers for Razorpay's reference
        donor_email: donor?.email ?? null,
        donor_anonymous: donor?.anonymous ? "true" : "false",
      },
    }),
  });

  if (!rzpRes.ok) {
    console.error("Razorpay order creation failed:", await rzpRes.text());
    return Response.json({ error: "Failed to create order" }, { status: 502 });
  }

  const order = await rzpRes.json();

  // Stash donor details keyed by order_id for the webhook to pick up.
  // Best-effort: if Redis isn't configured we still let the payment proceed
  // (webhook will note absence and donor can request manual receipt).
  if (donor) {
    try {
      await storeDonorDraft(order.id, donor);
    } catch (err) {
      console.error("[create-order] Failed to stash donor draft:", err);
    }
  }

  return Response.json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    key_id: keyId,
  });
}
