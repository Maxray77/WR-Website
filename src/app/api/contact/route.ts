import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, storeSubmission } from "@/lib/redis";

// Input length limits to prevent abuse
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_PHONE_LENGTH = 30;
const MAX_SUBJECT_LENGTH = 300;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await checkRateLimit("contact", ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Type checks — reject non-string inputs
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid input types." },
        { status: 400 }
      );
    }

    // Length limits
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be under ${MAX_NAME_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: `Email must be under ${MAX_EMAIL_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (phone && typeof phone === "string" && phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json(
        { error: `Phone must be under ${MAX_PHONE_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (subject && typeof subject === "string" && subject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json(
        { error: `Subject must be under ${MAX_SUBJECT_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Reject email header injection attempts (newlines in fields)
    if (/[\r\n]/.test(name) || /[\r\n]/.test(email) || /[\r\n]/.test(subject || "")) {
      return NextResponse.json(
        { error: "Invalid characters in input." },
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

    // Persist to Redis (or log to console as fallback)
    const stored = await storeSubmission("contact:submissions", submission);
    if (!stored) {
      console.log("[Contact Form]", JSON.stringify(submission, null, 2));
    }

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
