import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API route.
 *
 * Currently stores submissions in-memory (dev) and logs them.
 * In production, replace with one of:
 *   - Formspree (POST to https://formspree.io/f/{form_id})
 *   - Resend / SendGrid email API
 *   - Database write (Supabase, PlanetScale, etc.)
 */

// In-memory store for dev — replace with real persistence
const submissions: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const submission = {
      name,
      email,
      phone: phone || null,
      subject: subject || "General Inquiry",
      message,
      timestamp: new Date().toISOString(),
    };

    // Store (dev) — replace with real backend
    submissions.push(submission);
    console.log("[Contact Form]", JSON.stringify(submission, null, 2));

    // TODO: Send email notification
    // await sendEmail({
    //   to: "nadeem@raptorrescue.org",
    //   subject: `New contact: ${subject}`,
    //   body: `From: ${name} (${email})\n\n${message}`,
    // });

    return NextResponse.json(
      { success: true, message: "Message received. We'll get back to you soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
