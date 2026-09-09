import { Resend } from "resend";
import { db } from "./db";
import { emailLog } from "./db/schema";
import type { Registration, Screening } from "./db/schema";
import { formatDate, formatTime, manageUrl, siteUrl } from "./utils";

const FROM =
  process.env.SCREENING_FROM_EMAIL ||
  "All That Breathes Screenings <onboarding@resend.dev>";
const REPLY_TO = process.env.SCREENING_REPLY_TO || "nadeem@raptorrescue.org";
const BCC = (process.env.SCREENING_BCC || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export type EmailKind =
  | "confirmed"
  | "waitlisted"
  | "promoted"
  | "cancelled"
  | "screening_cancelled";

let client: Resend | null = null;
function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

/* ────────────────────────── layout ─────────────────────────── */

const TEAL = "#0A6E5C";
const TEAL_DARK = "#064E41";
const AMBER = "#E8A317";
const CHARCOAL = "#1A1A2E";
const SLATE = "#6B7280";

function layout(opts: {
  preheader: string;
  heading: string;
  accent?: string;
  body: string;
}) {
  const accent = opts.accent ?? TEAL;
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F9FAFB;">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:linear-gradient(135deg,${TEAL} 0%,${TEAL_DARK} 100%);padding:28px 32px;">
          <div style="color:rgba(255,255,255,.72);font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;">Wildlife Rescue · Delhi</div>
          <div style="color:#ffffff;font-size:23px;font-weight:700;margin-top:6px;line-height:1.25;">${escapeHtml(opts.heading)}</div>
        </td></tr>
        <tr><td style="height:4px;background:${accent};"></td></tr>
        <tr><td style="padding:28px 32px;color:${CHARCOAL};font-size:15px;line-height:1.62;">${opts.body}</td></tr>
        <tr><td style="padding:20px 32px 28px;border-top:1px solid #eef0f3;color:${SLATE};font-size:12px;line-height:1.6;">
          <strong style="color:${CHARCOAL};">Wildlife Rescue</strong><br>
          C-6/1, Rehmani Chowk, Street No. 9, Wazirabad Village, Delhi – 110084<br>
          <a href="https://www.raptorrescue.org" style="color:${TEAL};text-decoration:none;">raptorrescue.org</a>
          &nbsp;·&nbsp; Questions? Just reply to this email.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailsBlock(screening: Screening, registration: Registration) {
  const rows: Array<[string, string]> = [
    ["Film", screening.title],
    ["Date", formatDate(screening.startsAt)],
    [
      "Time",
      screening.doorsOpenAt
        ? `${formatTime(screening.startsAt)} (doors ${formatTime(screening.doorsOpenAt)})`
        : formatTime(screening.startsAt),
    ],
    ["Venue", `${screening.venueName}, ${screening.city}`],
    ["Address", screening.venueAddress],
    ["Seats", String(registration.seats)],
  ];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 20px;">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:7px 0;color:${SLATE};font-size:13px;width:88px;vertical-align:top;">${escapeHtml(k)}</td>
      <td style="padding:7px 0;color:${CHARCOAL};font-size:14px;font-weight:500;">${escapeHtml(v)}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

function referenceBadge(reference: string, accent = TEAL) {
  return `<div style="text-align:center;background:#E8F5F1;border:1px dashed ${accent};border-radius:12px;padding:18px;margin:4px 0 22px;">
    <div style="color:${SLATE};font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Booking reference</div>
    <div style="color:${TEAL_DARK};font-size:27px;font-weight:800;letter-spacing:.08em;margin-top:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${escapeHtml(reference)}</div>
    <div style="color:${SLATE};font-size:12px;margin-top:6px;">Show this at the door</div>
  </div>`;
}

function button(href: string, label: string, bg = TEAL) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px;"><tr>
    <td style="background:${bg};border-radius:10px;">
      <a href="${href}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a>
    </td></tr></table>`;
}

function manageFooter(registration: Registration) {
  const url = manageUrl(registration.reference, registration.manageToken);
  return `<p style="color:${SLATE};font-size:13px;line-height:1.6;margin:22px 0 0;border-top:1px solid #eef0f3;padding-top:18px;">
    Plans changed? You can view or cancel your booking any time — cancelling frees your seat for someone on the waiting list.<br>
    <a href="${url}" style="color:${TEAL};">Manage my booking</a>
  </p>`;
}

/* ───────────────────────── templates ───────────────────────── */

function template(
  kind: EmailKind,
  screening: Screening,
  registration: Registration,
  extra?: { waitlistPosition?: number },
): { subject: string; html: string; text: string } {
  const when = `${formatDate(screening.startsAt)}, ${formatTime(screening.startsAt)}`;
  const where = `${screening.venueName}, ${screening.city}`;
  const url = manageUrl(registration.reference, registration.manageToken);
  const notes = screening.attendeeNotes
    ? `<div style="background:#FFF8E7;border-left:3px solid ${AMBER};padding:12px 16px;border-radius:0 8px 8px 0;margin:0 0 20px;color:${CHARCOAL};font-size:14px;">${escapeHtml(screening.attendeeNotes)}</div>`
    : "";

  switch (kind) {
    case "confirmed":
      return {
        subject: `Your seat is confirmed — ${screening.title}, ${screening.city}`,
        text: `Hi ${registration.name},\n\nYour seat is confirmed for ${screening.title}.\n\nReference: ${registration.reference}\nWhen: ${when}\nWhere: ${where}\n${screening.venueAddress}\nSeats: ${registration.seats}\n\nManage or cancel: ${url}\n\n— Wildlife Rescue`,
        html: layout({
          preheader: `Confirmed — ${when} at ${where}`,
          heading: "Your seat is confirmed",
          body: `<p style="margin:0 0 6px;">Hi ${escapeHtml(registration.name)},</p>
            <p style="margin:0 0 18px;">You're all set for the screening of <strong>${escapeHtml(screening.title)}</strong>. We look forward to seeing you there.</p>
            ${referenceBadge(registration.reference)}
            ${detailsBlock(screening, registration)}
            ${notes}
            ${button(url, "View my booking")}
            ${manageFooter(registration)}`,
        }),
      };

    case "waitlisted": {
      const pos = extra?.waitlistPosition;
      return {
        subject: `You're on the waiting list — ${screening.title}, ${screening.city}`,
        text: `Hi ${registration.name},\n\nThis screening is currently full, so you're on the waiting list${pos ? ` at position ${pos}` : ""}. We'll email you the moment a seat opens up.\n\nReference: ${registration.reference}\nWhen: ${when}\nWhere: ${where}\n\nManage: ${url}\n\n— Wildlife Rescue`,
        html: layout({
          preheader: `Waiting list${pos ? ` · position ${pos}` : ""} — ${when}`,
          heading: "You're on the waiting list",
          accent: AMBER,
          body: `<p style="margin:0 0 6px;">Hi ${escapeHtml(registration.name)},</p>
            <p style="margin:0 0 18px;">This screening is fully booked right now, so we've added you to the waiting list${pos ? ` at <strong>position ${pos}</strong>` : ""}. Seats free up often — the moment one does, we'll confirm you automatically and email you straight away.</p>
            ${referenceBadge(registration.reference, AMBER)}
            ${detailsBlock(screening, registration)}
            <p style="margin:0 0 6px;color:${SLATE};font-size:14px;">Please don't travel to the venue until you receive a confirmation email.</p>
            ${manageFooter(registration)}`,
        }),
      };
    }

    case "promoted":
      return {
        subject: `A seat opened up — you're confirmed for ${screening.title}`,
        text: `Good news ${registration.name},\n\nA seat opened up and you've moved off the waiting list. Your booking is now CONFIRMED.\n\nReference: ${registration.reference}\nWhen: ${when}\nWhere: ${where}\n${screening.venueAddress}\nSeats: ${registration.seats}\n\nIf you can no longer attend, please cancel so we can pass the seat on: ${url}\n\n— Wildlife Rescue`,
        html: layout({
          preheader: `Confirmed off the waiting list — ${when}`,
          heading: "Good news — a seat opened up",
          body: `<p style="margin:0 0 6px;">Hi ${escapeHtml(registration.name)},</p>
            <p style="margin:0 0 18px;">A seat has opened up and you've moved off the waiting list. Your booking is now <strong style="color:${TEAL};">confirmed</strong>.</p>
            ${referenceBadge(registration.reference)}
            ${detailsBlock(screening, registration)}
            ${notes}
            ${button(url, "View my booking")}
            <p style="margin:18px 0 0;color:${SLATE};font-size:13px;">If you can no longer make it, please cancel so we can offer the seat to the next person waiting.</p>
            ${manageFooter(registration)}`,
        }),
      };

    case "cancelled":
      return {
        subject: `Booking cancelled — ${screening.title}, ${screening.city}`,
        text: `Hi ${registration.name},\n\nYour booking ${registration.reference} for ${screening.title} on ${when} has been cancelled. Your seat has been released to the waiting list.\n\nIf this was a mistake, you're welcome to register again: ${siteUrl()}/screenings/${screening.slug}\n\n— Wildlife Rescue`,
        html: layout({
          preheader: `Cancelled — ${screening.title}, ${when}`,
          heading: "Your booking is cancelled",
          accent: "#DC2626",
          body: `<p style="margin:0 0 6px;">Hi ${escapeHtml(registration.name)},</p>
            <p style="margin:0 0 18px;">We've cancelled booking <strong style="font-family:ui-monospace,monospace;">${escapeHtml(registration.reference)}</strong> for <strong>${escapeHtml(screening.title)}</strong> on ${escapeHtml(when)}. Your ${registration.seats === 1 ? "seat has" : "seats have"} been released to the waiting list.</p>
            <p style="margin:0 0 18px;">Sorry to miss you this time. If you change your mind and seats are still available, you're very welcome to register again.</p>
            ${button(`${siteUrl()}/screenings/${screening.slug}`, "See this screening")}`,
        }),
      };

    case "screening_cancelled":
      return {
        subject: `Screening cancelled — ${screening.title}, ${screening.city}`,
        text: `Hi ${registration.name},\n\nWe're sorry — the screening of ${screening.title} at ${where} on ${when} has been cancelled, and your booking ${registration.reference} has been released.\n\nWe'll announce new dates at ${siteUrl()}.\n\n— Wildlife Rescue`,
        html: layout({
          preheader: `Cancelled — ${screening.title} at ${where}`,
          heading: "This screening has been cancelled",
          accent: "#DC2626",
          body: `<p style="margin:0 0 6px;">Hi ${escapeHtml(registration.name)},</p>
            <p style="margin:0 0 18px;">We're sorry to say the screening of <strong>${escapeHtml(screening.title)}</strong> at ${escapeHtml(where)} on ${escapeHtml(when)} has been cancelled, and your booking <strong style="font-family:ui-monospace,monospace;">${escapeHtml(registration.reference)}</strong> has been released.</p>
            <p style="margin:0 0 18px;">Thank you for your interest — we'll announce new dates as soon as they're set.</p>
            ${button(siteUrl(), "See upcoming screenings")}`,
        }),
      };
  }
}

/* ─────────────────────────── send ──────────────────────────── */

export type SendResult = {
  sent: boolean;
  skipped?: "no_api_key";
  id?: string;
  error?: string;
};

/**
 * Send one transactional email. Never throws — a mail failure must not undo a
 * booking, so the caller logs the result and carries on.
 */
export async function sendScreeningEmail(
  kind: EmailKind,
  screening: Screening,
  registration: Registration,
  extra?: { waitlistPosition?: number },
): Promise<SendResult> {
  const { subject, html, text } = template(kind, screening, registration, extra);
  const api = resend();

  if (!api) {
    console.info(
      `[email:${kind}] RESEND_API_KEY not set — would email ${registration.email}: ${subject}`,
    );
    await recordEmail(registration.id, registration.email, kind, null, "no_api_key");
    return { sent: false, skipped: "no_api_key" };
  }

  try {
    const { data, error } = await api.emails.send({
      from: FROM,
      to: registration.email,
      replyTo: REPLY_TO,
      ...(BCC.length ? { bcc: BCC } : {}),
      subject,
      html,
      text,
    });
    if (error) {
      console.error(`[email:${kind}] failed`, error);
      await recordEmail(registration.id, registration.email, kind, null, error.message);
      return { sent: false, error: error.message };
    }
    await recordEmail(registration.id, registration.email, kind, data?.id ?? null);
    return { sent: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[email:${kind}] threw`, err);
    await recordEmail(registration.id, registration.email, kind, null, message);
    return { sent: false, error: message };
  }
}

async function recordEmail(
  registrationId: string,
  to: string,
  kind: EmailKind,
  providerId: string | null,
  error?: string,
) {
  try {
    await db.insert(emailLog).values({ registrationId, to, kind, providerId, error });
  } catch (err) {
    console.error("[email] could not write email_log row", err);
  }
}

/** Fire-and-forget batch used after a cancellation promotes people. */
export async function sendPromotionEmails(
  screening: Screening,
  promoted: Registration[],
) {
  await Promise.allSettled(
    promoted.map((r) => sendScreeningEmail("promoted", screening, r)),
  );
}
