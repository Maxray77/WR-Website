import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify static deploy: set output: "export" and move src/app/api to _api-disabled
  // For full-featured deploy (Vercel): remove output: "export"
  images: {
    remotePatterns: [
      // Instagram CDN domains for Basic Display API media
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
