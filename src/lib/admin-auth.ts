import crypto from "crypto";
import { checkRateLimit } from "@/lib/redis";

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

/**
 * Per-IP rate limit for admin endpoints (20/hour). Returns a 429 Response if
 * the caller is over the limit, else null. Call at the top of each admin
 * handler BEFORE the credential check, so brute-force 401 churn is throttled.
 * No-ops (allows) when Redis isn't configured.
 */
export async function enforceAdminRateLimit(
  request: Request
): Promise<Response | null> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkRateLimit("admin", ip);
  if (!allowed) {
    return new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": "3600" },
    });
  }
  return null;
}
