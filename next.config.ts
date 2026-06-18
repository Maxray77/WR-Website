import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify static deploy: set output: "export" and move src/app/api to _api-disabled
  // For full-featured deploy (Vercel): remove output: "export"

  images: {
    remotePatterns: [
      // Sanity CDN — for blog images uploaded via the Studio.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  // Exclude bulky static assets from serverless function bundles.
  // src/lib/email.ts reads attachments from public/ via process.cwd(), which
  // makes Next.js trace + bundle the entire public/ directory into every
  // function that imports email.ts. With ~200 MB of videos in public/,
  // function size exceeded Vercel's 300 MB cap.
  // Videos are NEVER read by any server function — only served as static
  // assets — so it's safe to exclude them from function traces entirely.
  outputFileTracingExcludes: {
    "*": [
      "public/clips/**/*",
      "public/species/*.mp4",
      "public/species/*.mov",
      "public/treatments/*.mp4",
      "public/treatments/*.mov",
      "public/facility/*.mp4",
      "public/facility/*.mov",
    ],
  },

  async redirects() {
    return [
      // 39,000 milestone post superseded by the 40,000 milestone (2026-06).
      {
        source: "/blog/39000th-rescue-shikra",
        destination: "/blog/40000th-rescue-shikra",
        permanent: true,
      },
      // Old facility page split into /clinic + /enclosures (2026-04-29).
      // Default redirect lands on /clinic; users can navigate to /enclosures from there.
      {
        source: "/facility",
        destination: "/clinic",
        permanent: true,
      },
      // raptorrescue.org (non-www) → www.raptorrescue.org (canonical).
      // Eliminates duplicate-content risk from both versions returning 200.
      {
        source: "/:path*",
        destination: "https://www.raptorrescue.org/:path*",
        permanent: true,
        has: [{ type: "host", value: "raptorrescue.org" }],
      },
      // wildliferescue.org.in → raptorrescue.org (secondary domain → primary, permanent 301).
      // Preserves the path so /donate still lands on /donate, etc.
      {
        source: "/:path*",
        destination: "https://www.raptorrescue.org/:path*",
        permanent: true,
        has: [{ type: "host", value: "wildliferescue.org.in" }],
      },
      {
        source: "/:path*",
        destination: "https://www.raptorrescue.org/:path*",
        permanent: true,
        has: [{ type: "host", value: "www.wildliferescue.org.in" }],
      },
    ];
  },
};

export default nextConfig;
