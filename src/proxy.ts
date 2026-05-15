import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security proxy — applies to all routes.
 *
 * Renamed from `middleware.ts` per the Next.js 16 file-convention deprecation
 * (https://nextjs.org/docs/app/api-reference/file-conventions/proxy). Behaviour
 * is otherwise unchanged.
 *
 * 1. Origin validation on POST /api/* (CSRF protection)
 * 2. Security headers on every response (clickjacking, MIME sniffing, etc.)
 * 3. Content-Security-Policy on app routes; CSP is skipped for /studio because
 *    Sanity Studio is a third-party SPA that opens many connections to
 *    *.sanity.io. Other headers (incl. X-Frame-Options) still apply to /studio
 *    so the Studio is not iframe-able for clickjacking.
 */

// Allowed origins — add your production domain(s) here
const ALLOWED_ORIGINS = new Set([
  "https://wildlife-rescue-website.vercel.app",
  "https://www.raptorrescue.org",
  "https://raptorrescue.org",
  "https://wildliferescue.org.in",
  "https://www.wildliferescue.org.in",
]);

// In development, also allow localhost
if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.add("http://localhost:3000");
  ALLOWED_ORIGINS.add("http://127.0.0.1:3000");
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin);
}

export function proxy(request: NextRequest) {
  // --- CSRF: Block cross-origin POST requests to API routes ---
  // Exempt /api/razorpay-webhook — Razorpay servers POST from their own origin;
  // security is provided by HMAC-SHA256 signature verification inside the route.
  if (
    request.method === "POST" &&
    request.nextUrl.pathname.startsWith("/api/") &&
    request.nextUrl.pathname !== "/api/razorpay-webhook"
  ) {
    const origin = request.headers.get("origin");

    // Allow requests with no origin header (same-origin requests from
    // older browsers, server-side calls, curl, etc.)
    // In production, the browser ALWAYS sends Origin on cross-origin POSTs,
    // so a missing origin means it's same-origin or non-browser.
    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json(
        { error: "Forbidden — cross-origin request blocked." },
        { status: 403 }
      );
    }
  }

  // --- Security headers on all responses ---
  const response = NextResponse.next();
  const isStudio = request.nextUrl.pathname.startsWith("/studio");

  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking — only allow our own site to frame pages
  // (also applies to /studio, which would otherwise be iframe-able)
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  // XSS filter (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent with requests
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable unnecessary browser features.
  // payment= allows Razorpay's checkout domains to use the Payment Request API.
  response.headers.set(
    "Permissions-Policy",
    'geolocation=(), microphone=(), camera=(), payment=(self "https://checkout.razorpay.com" "https://api.razorpay.com")'
  );

  // Strict Transport Security — enforce HTTPS for 1 year
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // CSP is incompatible with Sanity Studio's many *.sanity.io connections
  // (API, CDN, WebSocket). Skip only the CSP for /studio; clickjacking
  // protection above (X-Frame-Options) still applies.
  if (isStudio) return response;

  // Content Security Policy.
  // Pragmatic allowlist: 'unsafe-inline' is still needed for Next.js inline
  // runtime scripts, JSON-LD, and framer-motion/Tailwind inline styles. The
  // real wins here are frame-ancestors (clickjacking), base-uri (base-tag
  // injection), object-src (no plugins), form-action (prevents form hijack to
  // arbitrary domains), and the external-host allowlist for scripts/frames.
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://razorpay.com https://checkout.razorpay.com https://*.razorpay.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://razorpay.com https://api.razorpay.com https://lumberjack.razorpay.com https://*.razorpay.com https://www.google-analytics.com https://*.analytics.google.com",
    "frame-src 'self' https://razorpay.com https://*.razorpay.com https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://www.gofundme.com",
    "frame-ancestors 'self'",
    "form-action 'self' https://razorpay.com https://*.razorpay.com",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

/**
 * Apply proxy to all routes except static assets and Next.js internals.
 */
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|woff|woff2)).*)",
  ],
};
