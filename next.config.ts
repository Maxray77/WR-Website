import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify static deploy: set output: "export" and move src/app/api to _api-disabled
  // For full-featured deploy (Vercel): remove output: "export"

  async redirects() {
    return [
      // Old facility page split into /clinic + /enclosures (2026-04-29).
      // Default redirect lands on /clinic; users can navigate to /enclosures from there.
      {
        source: "/facility",
        destination: "/clinic",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
