import crypto from "crypto";

/**
 * Constant-time string comparison for secrets (admin credentials, etc.).
 *
 * A plain `a === b` short-circuits on the first differing byte, so response
 * timing leaks how much of a guessed credential is correct. We HMAC both
 * inputs with a per-process random key and compare the fixed-length digests,
 * making the comparison time independent of input length and content.
 */
const COMPARE_KEY = crypto.randomBytes(32);

export function timingSafeStrEqual(a: string, b: string): boolean {
  const ha = crypto.createHmac("sha256", COMPARE_KEY).update(a, "utf8").digest();
  const hb = crypto.createHmac("sha256", COMPARE_KEY).update(b, "utf8").digest();
  return crypto.timingSafeEqual(ha, hb);
}
