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

  async redirects() {
    return [
      // Old facility page split into /clinic + /enclosures (2026-04-29).
      // Default redirect lands on /clinic; users can navigate to /enclosures from there.
      {
        source: "/facility",
        destination: "/clinic",
        permanent: true,
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
