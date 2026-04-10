import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, redis } from "@/lib/redis";

const MAX_EMAIL_LENGTH = 254; // RFC 5321

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await checkRateLimit("newsletter", ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Persist to Redis (or log as fallback)
    if (redis) {
      // Check for duplicate using a set
      const alreadySubscribed = await redis.sismember("newsletter:emails", email);
      if (alreadySubscribed) {
        return NextResponse.json(
          { success: true, message: "You're already subscribed!" },
          { status: 200 }
        );
      }
      await redis.sadd("newsletter:emails", email);
      await redis.lpush(
        "newsletter:signups",
        JSON.stringify({ email, timestamp: new Date().toISOString() })
      );
    } else {
      console.log("[Newsletter Signup]", email);
    }

    return NextResponse.json(
      { success: true, message: "Subscribed! Watch your inbox for rescue updates." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
