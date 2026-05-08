import { NextRequest } from "next/server";
import crypto from "crypto";

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

  let event: { event: string; payload: { payment: { entity: { id: string; amount: number; currency: string; email?: string } } } };
  try {
    event = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const amountInRupees = payment.amount / 100;

    console.log(
      `[Razorpay] Payment captured — ID: ${payment.id}, Amount: ₹${amountInRupees}`
    );

    // Fire server-side GA4 event via Measurement Protocol if configured
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
