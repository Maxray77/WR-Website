/**
 * Sanity → Next.js revalidation webhook.
 *
 * Sanity calls this endpoint whenever a document changes in the Studio.
 * The endpoint validates the secret and revalidates the cache tags so the
 * affected pages re-fetch on next visit.
 *
 * Configure in Sanity:
 *   1. https://sanity.io/manage → API → Webhooks → Create
 *   2. URL: https://www.raptorrescue.org/api/revalidate
 *   3. Trigger on: Create / Update / Delete (for posts, authors, categories)
 *   4. Filter: _type in ["post", "author", "category"]
 *   5. Projection: { _type, slug }
 *   6. Secret: same value as SANITY_REVALIDATE_SECRET in Vercel env vars
 *
 * ⚠️ Use the production domain above. This comment previously named
 * `wildlife-rescue-website.vercel.app`, which now returns 404
 * DEPLOYMENT_NOT_FOUND — a webhook pointed there fails silently, so Sanity
 * edits appear to "not publish" until the next deploy re-prerenders the pages.
 * If content edits ever stop showing up, check the webhook URL here first:
 * an unsigned POST to this endpoint should return 401 "Invalid signature"
 * (401 = reachable + secret set; 404 = wrong URL; 500 = secret missing).
 */
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current: string } | string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { ok: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { ok: false, error: "Bad request" },
        { status: 400 }
      );
    }

    // Always revalidate the broad tag so listings refresh.
    revalidateTag(body._type, "default");

    // If the document has a slug, also revalidate the per-slug tag.
    const slug =
      typeof body.slug === "string"
        ? body.slug
        : body.slug?.current;
    if (body._type === "post" && slug) {
      revalidateTag(`post:${slug}`, "default");
    }

    return NextResponse.json({ ok: true, revalidated: body._type, slug });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Unknown" },
      { status: 500 }
    );
  }
}
