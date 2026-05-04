/**
 * Server-side fetch helper for Sanity content.
 * Uses Next.js fetch caching with tag-based revalidation.
 *
 * Tags allow on-demand revalidation via webhook when content changes
 * in the Studio. See /api/revalidate.
 */
import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  /** Revalidate window in seconds. Default 300 (5 min). */
  revalidate?: number | false;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 300,
}: SanityFetchOptions): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags && tags.length > 0 ? false : revalidate,
      tags,
    },
  });
}
