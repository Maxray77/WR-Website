import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * Upstash Redis client — used for rate limiting and persistent storage.
 *
 * Required env vars (either naming convention works):
 *   - UPSTASH_REDIS_REST_URL    + UPSTASH_REDIS_REST_TOKEN   (Upstash direct / old Vercel KV setup)
 *   - KV_REST_API_URL           + KV_REST_API_TOKEN          (newer Vercel Marketplace integration)
 *
 * Set up at https://console.upstash.com OR via Vercel Storage tab → Upstash for
 * Redis. If neither pair is set, rate limiting and storage gracefully degrade.
 */

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export const redis = createRedis();

/**
 * Rate limiters for different API endpoints.
 * Falls back to allowing all requests if Redis is not configured.
 */
export const rateLimiters = redis
  ? {
      // Contact form: 5 submissions per hour per IP
      contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        prefix: "rl:contact",
      }),
      // Newsletter: 3 signups per hour per IP
      newsletter: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        prefix: "rl:newsletter",
      }),
      // Chat: 30 messages per hour per IP
      chat: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 h"),
        prefix: "rl:chat",
      }),
      // Admin endpoints: 20 requests per hour per IP — bounds credential
      // brute-force without throttling the small admin team's legitimate use.
      admin: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, "1 h"),
        prefix: "rl:admin",
      }),
    }
  : null;

/**
 * Best-effort client IP for rate limiting.
 *
 * On Vercel, `x-real-ip` is set by the platform to the actual connecting IP and
 * cannot be spoofed by the client. The leftmost `x-forwarded-for` entry, by
 * contrast, is attacker-supplied — a client can prepend its own XFF value, which
 * Vercel preserves, so keying limits on `xff.split(",")[0]` lets an attacker
 * rotate the value to defeat per-IP caps. Prefer x-real-ip; fall back to the
 * first XFF hop only when x-real-ip is absent (e.g. local dev), then "unknown".
 */
export function clientIp(headers: Headers): string {
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return "unknown";
}

/**
 * Check rate limit for an endpoint. Returns { allowed: true } if Redis
 * is not configured (graceful degradation).
 */
export async function checkRateLimit(
  limiter: "contact" | "newsletter" | "chat" | "admin",
  ip: string
): Promise<{ allowed: boolean; remaining?: number }> {
  if (!rateLimiters) return { allowed: true };
  const { success, remaining } = await rateLimiters[limiter].limit(ip);
  return { allowed: success, remaining };
}

/**
 * Store a record in Redis with automatic TTL.
 * Used for contact form submissions and newsletter signups.
 * Records are stored as JSON in a sorted set keyed by timestamp.
 */
export async function storeSubmission(
  key: string,
  data: Record<string, unknown>,
  ttlDays = 90
): Promise<boolean> {
  if (!redis) return false;
  const timestamp = Date.now();
  const entry = JSON.stringify({ ...data, _storedAt: new Date().toISOString() });
  // Store in a list with TTL
  await redis.lpush(key, entry);
  // Set expiry on the list (resets on each push — keeps list alive while active)
  await redis.expire(key, ttlDays * 24 * 60 * 60);
  return true;
}
