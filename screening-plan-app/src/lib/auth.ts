import "server-only";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { safeEqual } from "./utils";

const COOKIE = "sp_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    );
  }
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function issueToken() {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx <= 0) return false;
  const payload = token.slice(0, idx);
  const signature = token.slice(idx + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

/** True when admin auth is configured at all. Unset ⇒ /admin returns 503. */
export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);
}

export function checkPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export async function startAdminSession() {
  const store = await cookies();
  store.set(COOKIE, issueToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endAdminSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin() {
  if (!isAdminConfigured()) return false;
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

/* ── very small in-memory login throttle (per server instance) ── */

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function loginThrottle(key: string): { allowed: boolean; retryInMinutes: number } {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryInMinutes: 0 };
  }
  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryInMinutes: Math.max(1, Math.ceil((entry.resetAt - now) / 60000)),
    };
  }
  return { allowed: true, retryInMinutes: 0 };
}

export function clearThrottle(key: string) {
  attempts.delete(key);
}

export const ADMIN_COOKIE = COOKIE;
