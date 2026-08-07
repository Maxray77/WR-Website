import Stripe from "stripe";

/**
 * Lazily constructed Stripe client.
 *
 * The site is designed to build and run without Stripe credentials — the
 * donate page stays fully readable and falls back to the other giving routes.
 * Only the checkout API route requires a key, and it fails loudly there.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

export const STRIPE_ENABLED = Boolean(process.env.STRIPE_SECRET_KEY);

/** Guard rails on donation size, in whole US dollars. */
export const MIN_DONATION = 5;
export const MAX_DONATION = 50_000;

export function validateAmount(input: unknown): {
  ok: boolean;
  amount?: number;
  error?: string;
} {
  const amount =
    typeof input === "number" ? input : Number.parseFloat(String(input ?? ""));

  if (!Number.isFinite(amount)) {
    return { ok: false, error: "Please enter a donation amount." };
  }
  // Reject fractional cents; we only take whole-dollar gifts.
  const rounded = Math.round(amount * 100) / 100;
  if (rounded < MIN_DONATION) {
    return { ok: false, error: `The minimum gift is $${MIN_DONATION}.` };
  }
  if (rounded > MAX_DONATION) {
    return {
      ok: false,
      error: `For gifts above $${MAX_DONATION.toLocaleString(
        "en-US",
      )}, please contact us directly so we can arrange the transfer.`,
    };
  }
  return { ok: true, amount: rounded };
}
