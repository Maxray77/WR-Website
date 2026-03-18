import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter subscription API route.
 *
 * Currently stores emails in-memory (dev).
 * In production, replace with:
 *   - Mailchimp API (POST /lists/{list_id}/members)
 *   - Resend Audiences API
 *   - ConvertKit, Buttondown, etc.
 */

const subscribers: { email: string; timestamp: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Check for duplicates
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    subscribers.push({ email, timestamp: new Date().toISOString() });
    console.log("[Newsletter Signup]", email);

    // TODO: Add to Mailchimp/Resend
    // await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: "POST",
    //   headers: { Authorization: `apikey ${MAILCHIMP_API_KEY}` },
    //   body: JSON.stringify({ email_address: email, status: "subscribed" }),
    // });

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
