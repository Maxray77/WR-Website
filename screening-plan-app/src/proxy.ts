import { NextResponse, type NextRequest } from "next/server";

/**
 * Baseline security headers, plus a same-origin check on state-changing
 * requests (server actions post to the page URL, so this covers them too).
 */
export function proxy(request: NextRequest) {
  if (request.method === "POST") {
    const origin = request.headers.get("origin");
    if (origin) {
      const allowed = new Set<string>([request.nextUrl.origin]);
      const configured = process.env.NEXT_PUBLIC_SITE_URL;
      if (configured) allowed.add(configured.replace(/\/+$/, ""));
      if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        allowed.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
      }
      if (!allowed.has(origin)) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  );
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
