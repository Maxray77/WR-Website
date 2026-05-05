import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-side Sanity client.
 *
 * Uses SANITY_API_WRITE_TOKEN (no NEXT_PUBLIC_ prefix → never sent to the
 * browser) so reads work even when the dataset is set to Private. The token
 * is only available in Server Components / API routes / build-time fetches.
 *
 * For a fully public dataset you can drop the token and queries still work.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN is faster but goes through apicdn.sanity.io, which some networks
  // block or fail to resolve. Use direct API (api.sanity.io) in dev.
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token: process.env.SANITY_API_WRITE_TOKEN,
});
