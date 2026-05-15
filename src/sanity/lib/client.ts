import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-side Sanity client (read-only path).
 *
 * Token selection order:
 *   1. SANITY_API_READ_TOKEN — preferred. Create one in Sanity Manage →
 *      API → Tokens with Viewer permissions. Scopes the blast radius if
 *      server env ever leaks: an attacker can read content but cannot
 *      mutate / publish / delete.
 *   2. SANITY_API_WRITE_TOKEN — legacy fallback so the site keeps working
 *      while you provision the read token. Should be removed once the
 *      read token is set in Vercel.
 *
 * Neither variable is prefixed NEXT_PUBLIC_ — both stay server-side.
 * Migration scripts (scripts/migrate-blog-to-sanity.mjs) explicitly load the
 * write token and continue to need Editor permissions.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN is faster but goes through apicdn.sanity.io, which some networks
  // block or fail to resolve. Use direct API (api.sanity.io) in dev.
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  token:
    process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});
