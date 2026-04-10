import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Instagram feed unavailable" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error("Instagram API error:", res.status);
      return NextResponse.json(
        { error: "Instagram feed temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await res.json();
    // Filter to only IMAGE and CAROUSEL_ALBUM (skip VIDEO-only posts with no thumbnail)
    const posts = (data.data ?? []).filter(
      (p: { media_type: string }) =>
        p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM"
    );

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Instagram fetch failed:", err);
    return NextResponse.json(
      { error: "Instagram feed temporarily unavailable" },
      { status: 502 }
    );
  }
}
