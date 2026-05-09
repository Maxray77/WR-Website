import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return Response.json({ error: "Payment service unavailable" }, { status: 503 });
  }

  let amount: unknown;
  try {
    ({ amount } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // amount must be a positive integer in paise (min ₹1 = 100 paise)
  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 100 || amount > 10_000_000) {
    return Response.json({ error: "Invalid amount" }, { status: 400 });
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

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
    }),
  });

  if (!rzpRes.ok) {
    console.error("Razorpay order creation failed:", await rzpRes.text());
    return Response.json({ error: "Failed to create order" }, { status: 502 });
  }

  const order = await rzpRes.json();
  return Response.json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    key_id: keyId,
  });
}
