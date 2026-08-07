import type { MetadataRoute } from "next";
import { NEWS_POSTS } from "@/lib/news";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/donate", priority: 0.95, changeFrequency: "monthly" },
    { path: "/mission", priority: 0.9, changeFrequency: "monthly" },
    { path: "/wildlife-rescue", priority: 0.9, changeFrequency: "monthly" },
    { path: "/all-that-breathes", priority: 0.8, changeFrequency: "yearly" },
    { path: "/impact", priority: 0.85, changeFrequency: "yearly" },
    { path: "/about", priority: 0.8, changeFrequency: "yearly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...NEWS_POSTS.map((post) => ({
      url: `${SITE_URL}/news/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
