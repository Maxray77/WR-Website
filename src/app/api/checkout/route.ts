import { NextResponse } from "next/server";
import { ORG } from "@/lib/constants";
import { getStripe, validateAmount } from "@/lib/stripe";

export const runtime = "nodejs";

/** Resolve the public origin, preferring an explicit env var over the request. */
function siteOrigin(req: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const origin = req.headers.get("origin");
  if (origin) return origin;
  return ORG.url;
}

export async function POST(req: Request) {
  const stripe = getStripe();

  if (!stripe) {
    // Not an error the donor caused — tell them plainly and offer a fallback.
    return NextResponse.json(
      {
        error:
          "Card donations are not available right now. Please use one of the other giving options on this page, or write to us and we will help.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { amount, frequency } = (body ?? {}) as {
    amount?: unknown;
    frequency?: unknown;
  };

  const recurring = frequency === "monthly";
  const check = validateAmount(amount);
  if (!check.ok || check.amount === undefined) {
    return NextResponse.json({ error: check.error }, { status: 400 });
  }

  const unitAmount = Math.round(check.amount * 100);
  const origin = siteOrigin(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? "subscription" : "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: recurring
                ? "Monthly donation to Raptor Rescue and Research Inc."
                : "Donation to Raptor Rescue and Research Inc.",
              description:
                "Supports the rescue, treatment and release of birds of prey. No goods or services are provided in exchange for this contribution.",
            },
            ...(recurring ? { recurring: { interval: "month" as const } } : {}),
          },
        },
      ],
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?cancelled=1`,
      submit_type: recurring ? undefined : "donate",
      billing_address_collection: "required",
      allow_promotion_codes: false,
      metadata: {
        source: "raptorrescueusa.org",
        frequency: recurring ? "monthly" : "one-time",
        ein: ORG.ein,
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    return NextResponse.json(
      {
        error:
          "We could not start the payment. Please try again, or use one of the other giving options below.",
      },
      { status: 502 },
    );
  }
}
