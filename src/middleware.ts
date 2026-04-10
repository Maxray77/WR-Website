import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security middleware — applies to all routes.
 *
 * 1. Security headers on every response (XSS, clickjacking, MIME sniffing)
 * 2. Origin validation on POST requests to /api/* (CSRF protection)
 */

// Allowed origins — add your production domain(s) here
const ALLOWED_ORIGINS = new Set([
  "https://wildlife-rescue-website.vercel.app",
  "https://www.raptorrescue.org",
  "https://raptorrescue.org",
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

export function middleware(request: NextRequest) {
  // --- CSRF: Block cross-origin POST requests to API routes ---
  if (
    request.method === "POST" &&
    request.nextUrl.pathname.startsWith("/api/")
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

  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking — only allow our own site to frame pages
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  // XSS filter (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Control referrer information sent with requests
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable unnecessary browser features
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(self)"
  );

  // Strict Transport Security — enforce HTTPS for 1 year
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  return response;
}

/**
 * Apply middleware to all routes except static assets and Next.js internals.
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
