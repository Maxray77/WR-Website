import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio", "/studio/"],
      },
    ],
    sitemap: "https://www.raptorrescue.org/sitemap.xml",
    host: "https://www.raptorrescue.org",
  };
}
