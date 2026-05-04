/**
 * Sanity Studio configuration — embedded at /studio.
 * Staff log in here to write and publish blog posts.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId, studioUrl } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "wildlife-rescue-blog",
  title: "Wildlife Rescue — Blog",
  basePath: studioUrl,
  projectId,
  dataset,
  schema: schemaTypes,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
