import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Netlify static deploy: set output: "export" and move src/app/api to _api-disabled
  // For full-featured deploy (Vercel): remove output: "export"
};

export default nextConfig;
