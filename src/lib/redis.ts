import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * Upstash Redis client — used for rate limiting and persistent storage.
 *
 * Required env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Set up at https://console.upstash.com or via Vercel Marketplace integration.
 * If not configured, rate limiting and storage gracefully degrade.
 */

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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
    }
  : null;

/**
 * Check rate limit for an endpoint. Returns { allowed: true } if Redis
 * is not configured (graceful degradation).
 */
export async function checkRateLimit(
  limiter: "contact" | "newsletter" | "chat",
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
