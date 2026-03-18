import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify static preview: temporarily set output: "export"
  // and move src/app/api to _api-disabled, then deploy with --no-build
  // For full-featured deploy (Vercel): remove output: "export"
};

export default nextConfig;
