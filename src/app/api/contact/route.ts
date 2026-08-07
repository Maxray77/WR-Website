import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ORG } from "@/lib/constants";

export const runtime = "nodejs";

const LIMITS = { name: 120, email: 254, subject: 200, message: 5000 } as const;

/** Reject values that try to smuggle extra headers into an email. */
function hasInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field only a bot would fill in.
  if (clean(raw.company, 100) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(raw.name, LIMITS.name);
  const email = clean(raw.email, LIMITS.email);
  const subject = clean(raw.subject, LIMITS.subject) || "Website enquiry";
  const message = clean(raw.message, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }
  if ([name, email, subject].some(hasInjection)) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? ORG.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Without a mail provider configured we still accept the message rather than
  // showing the visitor an error — but we make the gap obvious in the logs.
  if (!apiKey || !from) {
    console.warn(
      "[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL not set — message not delivered.",
      { name, email, subject },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[raptorrescueusa.org] ${subject}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      {
        error: `We could not send that. Please email us directly at ${ORG.email}.`,
      },
      { status: 502 },
    );
  }
}
