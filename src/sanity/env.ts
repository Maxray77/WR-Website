/**
 * Sanity environment variables.
 *
 * Returns empty strings when env vars are missing so the Next.js build
 * doesn't crash before Sanity is configured. Components that rely on these
 * (Studio, blog adapter) gate their behavior on `projectId` being non-empty.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const studioUrl = "/studio";
