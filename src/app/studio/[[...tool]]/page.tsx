/**
 * Embedded Sanity Studio at /studio.
 * Staff log in here to author blog posts.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
