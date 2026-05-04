/**
 * Blog data adapter.
 *
 * Reads from Sanity when env vars are present (NEXT_PUBLIC_SANITY_PROJECT_ID +
 * NEXT_PUBLIC_SANITY_DATASET), and falls back to the static BLOG_POSTS array
 * in `blog-data.ts` otherwise.
 *
 * The blog pages call these functions exclusively — they never import Sanity
 * or BLOG_POSTS directly. This keeps the site working before/after Sanity
 * setup with no code changes.
 */
import type { PortableTextBlock } from "@portabletext/types";
import { BLOG_POSTS } from "./blog-data";

export type NormalizedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole?: string;
  authorImageUrl?: string;
  category: string;
  readTime: string;
  /** Resolved image URL (static path or Sanity CDN URL) */
  imageUrl?: string;
  imageAlt?: string;
  pdfUrl?: string;
  annualReportYear?: number;
  /**
   * Body in one of two shapes depending on the source.
   * - From static data: `{ kind: "markdown", content: string }`
   * - From Sanity:      `{ kind: "portableText", blocks: PortableTextBlock[] }`
   */
  body:
    | { kind: "markdown"; content: string }
    | { kind: "portableText"; blocks: PortableTextBlock[] };
};

export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

// ── Static fallback ──────────────────────────────────────────────────────────
function staticPosts(): NormalizedPost[] {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    author: p.author,
    category: p.category,
    readTime: p.readTime,
    imageUrl: p.image,
    pdfUrl: p.pdfUrl,
    annualReportYear: p.annualReportYear,
    body: { kind: "markdown", content: p.content },
  }));
}

// ── Sanity-backed implementations ────────────────────────────────────────────
async function sanityPosts(): Promise<NormalizedPost[]> {
  const { sanityFetch } = await import("@/sanity/lib/fetch");
  const { POSTS_QUERY } = await import("@/sanity/lib/queries");
  const { urlFor } = await import("@/sanity/lib/image");

  const docs = await sanityFetch<SanityPostDoc[]>({
    query: POSTS_QUERY,
    tags: ["post"],
  });
  return docs.map((d) => normalizeSanityDoc(d, urlFor));
}

async function sanityPostBySlug(slug: string): Promise<NormalizedPost | null> {
  const { sanityFetch } = await import("@/sanity/lib/fetch");
  const { POST_BY_SLUG_QUERY } = await import("@/sanity/lib/queries");
  const { urlFor } = await import("@/sanity/lib/image");

  const doc = await sanityFetch<(SanityPostDoc & { body?: PortableTextBlock[] }) | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  });
  if (!doc) return null;
  return normalizeSanityDoc(doc, urlFor, doc.body);
}

async function sanityPostSlugs(): Promise<string[]> {
  const { sanityFetch } = await import("@/sanity/lib/fetch");
  const { POST_SLUGS_QUERY } = await import("@/sanity/lib/queries");
  const docs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
  });
  return docs.map((d) => d.slug);
}

// ── Public API ───────────────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<NormalizedPost[]> {
  if (isSanityConfigured()) {
    try {
      return await sanityPosts();
    } catch (err) {
      console.error("Sanity fetch failed, falling back to static:", err);
    }
  }
  return staticPosts();
}

export async function getBlogPostBySlug(
  slug: string
): Promise<NormalizedPost | null> {
  if (isSanityConfigured()) {
    try {
      const post = await sanityPostBySlug(slug);
      if (post) return post;
    } catch (err) {
      console.error("Sanity fetch failed, falling back to static:", err);
    }
  }
  const stat = staticPosts().find((p) => p.slug === slug);
  return stat ?? null;
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    try {
      return await sanityPostSlugs();
    } catch (err) {
      console.error("Sanity fetch failed, falling back to static:", err);
    }
  }
  return staticPosts().map((p) => p.slug);
}

// ── Sanity types & normalizer ────────────────────────────────────────────────
type SanityImage = {
  alt?: string;
  asset?: { _id: string; url?: string };
};

type SanityPostDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime?: string;
  pdfUrl?: string;
  annualReportYear?: number;
  image?: SanityImage;
  author?: { name: string; role?: string; image?: SanityImage };
  category?: { title: string; slug: string };
};

type UrlForFn = typeof import("@/sanity/lib/image")["urlFor"];

function normalizeSanityDoc(
  d: SanityPostDoc,
  urlFor: UrlForFn,
  body?: PortableTextBlock[]
): NormalizedPost {
  return {
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    date: d.date,
    author: d.author?.name ?? "Wildlife Rescue",
    authorRole: d.author?.role,
    authorImageUrl: d.author?.image?.asset
      ? urlFor(d.author.image).width(120).url()
      : undefined,
    category: d.category?.title ?? "Update",
    readTime: d.readTime ?? "3 min",
    imageUrl: d.image?.asset
      ? urlFor(d.image).width(1600).url()
      : undefined,
    imageAlt: d.image?.alt,
    pdfUrl: d.pdfUrl,
    annualReportYear: d.annualReportYear,
    body: body
      ? { kind: "portableText", blocks: body }
      : { kind: "markdown", content: "" },
  };
}
