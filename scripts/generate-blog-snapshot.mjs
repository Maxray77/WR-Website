#!/usr/bin/env node
/**
 * Regenerates scripts/blog-posts-snapshot.json from src/lib/blog-data.ts.
 * Run this whenever blog-data.ts changes BEFORE running the migration.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "blog-posts-snapshot.json");

const res = spawnSync(
  "npx",
  ["--yes", "tsx", path.join(__dirname, "dump-blog.ts")],
  { cwd: ROOT, encoding: "utf8", shell: true }
);

if (res.status !== 0) {
  console.error("tsx failed:");
  console.error(res.stderr || res.stdout);
  process.exit(1);
}

fs.writeFileSync(OUT, res.stdout.trim() + "\n");
const posts = JSON.parse(res.stdout);
console.log(`Wrote ${posts.length} posts to ${path.relative(ROOT, OUT)}`);
