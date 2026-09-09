import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives inside the WR-Website repo, which has its own lockfile;
  // pin the workspace root so Turbopack doesn't walk up to the parent.
  turbopack: { root: path.resolve(process.cwd()) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.raptorrescue.org" },
    ],
  },
};

export default nextConfig;
