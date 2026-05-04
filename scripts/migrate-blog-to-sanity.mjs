#!/usr/bin/env node
/**
 * One-time migration: copies the static blog posts (snapshot in
 * scripts/blog-posts-snapshot.json) into Sanity, including:
 *   - Authors (deduped — one document per unique name)
 *   - Categories (deduped)
 *   - Posts with markdown→Portable Text body conversion
 *   - Featured images uploaded from /public to Sanity assets
 *
 * Usage:
 *   1. Make sure these env vars are set in .env.local:
 *      - NEXT_PUBLIC_SANITY_PROJECT_ID
 *      - NEXT_PUBLIC_SANITY_DATASET (usually "production")
 *      - SANITY_API_WRITE_TOKEN  (Editor token from sanity.io/manage)
 *   2. Run: npm run migrate-blog
 *
 * Re-running is safe — uses deterministic _id values so each post is created
 * once (subsequent runs replace the same doc).
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// ── Sanity client ────────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

// ── Load static post snapshot ────────────────────────────────────────────────
const POSTS = JSON.parse(
  fs.readFileSync(path.join(__dirname, "blog-posts-snapshot.json"), "utf8")
);

// ── Helpers ──────────────────────────────────────────────────────────────────
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function deterministicId(prefix, key) {
  return `${prefix}.${slugify(key)}`;
}

function randomKey() {
  return Math.random().toString(36).slice(2, 14);
}

/**
 * Convert markdown-lite content to Portable Text blocks.
 * Handles: paragraphs, ## headings, **bold** spans, [text](url) links,
 *          - bullet lists.
 */
function markdownToPortableText(md) {
  const blocks = [];
  const paragraphs = md.split("\n\n").filter(Boolean);

  for (const para of paragraphs) {
    const h2 = para.match(/^##\s+(.*)$/);
    if (h2) {
      blocks.push(textBlock("h2", h2[1]));
      continue;
    }

    const lines = para.split("\n");
    if (lines.every((l) => /^-\s+/.test(l))) {
      for (const line of lines) {
        blocks.push(listItemBlock(line.replace(/^-\s+/, "")));
      }
      continue;
    }

    blocks.push(textBlock("normal", para));
  }
  return blocks;
}

function textBlock(style, text) {
  const { spans, markDefs } = parseInline(text);
  return {
    _type: "block",
    _key: randomKey(),
    style,
    markDefs,
    children: spans,
  };
}

function listItemBlock(text) {
  const { spans, markDefs } = parseInline(text);
  return {
    _type: "block",
    _key: randomKey(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs,
    children: spans,
  };
}

/**
 * Tokenize inline text into a flat list of {text, bold, linkKey} segments,
 * then emit Portable Text spans + the corresponding markDefs.
 */
function parseInline(text) {
  const markDefs = [];

  // Tokens for sentinel-delimited link placeholders.
  const LINK_OPEN = "";
  const LINK_SEP = "";
  const LINK_CLOSE = "";

  const withLinkTokens = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, href) => {
      const _key = randomKey();
      markDefs.push({ _key, _type: "link", href });
      return `${LINK_OPEN}${_key}${LINK_SEP}${label}${LINK_CLOSE}`;
    }
  );

  const segments = [];
  let bold = false;
  let activeLink = null;
  let buffer = "";

  const flush = () => {
    if (buffer) {
      segments.push({ text: buffer, bold, linkKey: activeLink });
      buffer = "";
    }
  };

  for (let i = 0; i < withLinkTokens.length; ) {
    const ch = withLinkTokens[i];

    if (ch === LINK_OPEN) {
      flush();
      const sep = withLinkTokens.indexOf(LINK_SEP, i + 1);
      activeLink = withLinkTokens.slice(i + 1, sep);
      i = sep + 1;
      continue;
    }
    if (ch === LINK_CLOSE) {
      flush();
      activeLink = null;
      i++;
      continue;
    }
    if (ch === "*" && withLinkTokens[i + 1] === "*") {
      flush();
      bold = !bold;
      i += 2;
      continue;
    }
    buffer += ch;
    i++;
  }
  flush();

  const spans = segments
    .filter((s) => s.text.length > 0)
    .map((s) => {
      const marks = [];
      if (s.bold) marks.push("strong");
      if (s.linkKey) marks.push(s.linkKey);
      return {
        _type: "span",
        _key: randomKey(),
        text: s.text,
        marks,
      };
    });

  // Drop unused markDefs (in case a link was inside a block we filtered out).
  const usedKeys = new Set(spans.flatMap((s) => s.marks));
  const usedMarkDefs = markDefs.filter((m) => usedKeys.has(m._key));

  return { spans, markDefs: usedMarkDefs };
}

// ── Image upload ─────────────────────────────────────────────────────────────
async function uploadImageFromPublic(relPath) {
  const filePath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! Image not found at ${filePath}, skipping`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

function absoluteUrlIfNeeded(url) {
  if (/^https?:\/\//i.test(url)) return url;
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://wildlife-rescue-website.vercel.app";
  return `${site}${url}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(
    `Migrating ${POSTS.length} posts to Sanity (${projectId}/${dataset})...\n`
  );

  // 1. Authors
  const authorNames = [...new Set(POSTS.map((p) => p.author))];
  const authorIdByName = {};
  for (const name of authorNames) {
    const id = deterministicId("author", name);
    authorIdByName[name] = id;
    await client.createOrReplace({ _id: id, _type: "author", name });
    console.log(`  [author]   ${name}`);
  }

  // 2. Categories
  const categoryNames = [...new Set(POSTS.map((p) => p.category))];
  const categoryIdByName = {};
  for (const name of categoryNames) {
    const id = deterministicId("category", name);
    categoryIdByName[name] = id;
    await client.createOrReplace({
      _id: id,
      _type: "category",
      title: name,
      slug: { _type: "slug", current: slugify(name) },
    });
    console.log(`  [category] ${name}`);
  }

  // 3. Posts
  for (const p of POSTS) {
    console.log(`\n  [post]     ${p.title}`);

    let imageField;
    if (p.image) {
      imageField = await uploadImageFromPublic(p.image);
      if (imageField) console.log(`             image uploaded: ${p.image}`);
    }

    const body = markdownToPortableText(p.content);

    const doc = {
      _id: deterministicId("post", p.slug),
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      date: new Date(p.date).toISOString(),
      readTime: p.readTime,
      body,
      author: { _type: "reference", _ref: authorIdByName[p.author] },
      category: { _type: "reference", _ref: categoryIdByName[p.category] },
      ...(imageField ? { image: imageField } : {}),
      ...(p.pdfUrl ? { pdfUrl: absoluteUrlIfNeeded(p.pdfUrl) } : {}),
      ...(p.annualReportYear ? { annualReportYear: p.annualReportYear } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`             saved`);
  }

  console.log(
    `\nDone. Open https://www.sanity.io/manage/project/${projectId} or visit /studio to verify.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
