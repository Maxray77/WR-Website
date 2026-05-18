import fs from "fs/promises";
import path from "path";
import { Resend } from "resend";
import type { DonationRecord } from "./donations";
import { STATIC_RECEIPT_ATTACHMENTS, decryptPan } from "./donations";
import { renderReceiptPdf } from "./receipt-pdf";

/**
 * Donation email delivery via Resend.
 *
 * Sends the donor a "tax pack" email containing:
 *   1. The dynamically-generated provisional 80(G) receipt PDF (this donation)
 *   2. The static Form 10AC 80(G) approval certificate (org-level credentials)
 *
 * Wired from the Razorpay webhook after persistDonation returns
 * { created: true } — so emails are not re-sent on duplicate webhook delivery.
 *
 * Env vars required:
 *   - RESEND_API_KEY     — from resend.com (free tier covers ~3k/month)
 *   - RECEIPT_FROM_EMAIL — e.g. "receipts@raptorrescue.org" (must be a verified
 *                          sending domain in Resend; otherwise use the default
 *                          "onboarding@resend.dev" while testing)
 *
 * Optional:
 *   - RECEIPT_REPLY_TO   — defaults to "saud@raptorrescue.org"
 *   - RECEIPT_BCC        — comma-separated, e.g. for internal archival
 */

const FROM_FALLBACK = "Wildlife Rescue <onboarding@resend.dev>";
const REPLY_TO_FALLBACK = "saud@raptorrescue.org";

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function formatINR(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/**
 * Load all static attachments (currently just the 80G cert PDF) into memory.
 * Files live under public/ — readable from Node at runtime on Vercel.
 */
async function loadStaticAttachments(): Promise<Array<{ filename: string; content: Buffer }>> {
  const out: Array<{ filename: string; content: Buffer }> = [];
  for (const att of STATIC_RECEIPT_ATTACHMENTS) {
    const abs = path.join(process.cwd(), "public", att.publicPath.replace(/^\//, ""));
    try {
      const content = await fs.readFile(abs);
      out.push({ filename: att.filename, content });
    } catch (err) {
      console.error(`[email] Failed to read static attachment ${att.publicPath}:`, err);
      // Continue — don't block the whole email if one attachment is missing.
    }
  }
  return out;
}

function buildSubject(record: DonationRecord): string {
  return `Your donation receipt from Wildlife Rescue — ${record.receiptNumber}`;
}

function buildHtmlBody(record: DonationRecord): string {
  const { donor, amount, capturedAt, receiptNumber, paymentId, fy } = record;
  const firstName = donor.name.split(" ")[0] || "Friend";
  const ay = nextAYFromFy(fy);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your donation receipt</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1A1A2E;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A6E5C 0%,#064E41 100%);padding:28px 32px;text-align:center;color:#ffffff;">
              <div style="font-size:14px;letter-spacing:1px;opacity:0.9;text-transform:uppercase;">Wildlife Rescue</div>
              <div style="font-size:22px;font-weight:700;margin-top:8px;">Thank you for saving lives</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Dear ${escapeHtml(firstName)},</p>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
                Thank you for your generous donation to Wildlife Rescue. Every rupee directly supports the rescue,
                treatment, and rehabilitation of injured birds — many of them victims of manja-string injuries,
                electrocutions, and the diclofenac crisis that has devastated India's vultures.
              </p>

              <!-- Receipt summary box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8F5F1;border-radius:8px;padding:20px;margin:20px 0;">
                <tr>
                  <td>
                    <div style="font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Donation received</div>
                    <div style="font-size:28px;font-weight:700;color:#064E41;line-height:1;">${formatINR(amount)}</div>
                    <table role="presentation" width="100%" style="margin-top:16px;">
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#6B7280;width:140px;">Receipt No.</td>
                        <td style="padding:4px 0;font-size:13px;font-weight:600;color:#1A1A2E;">${escapeHtml(receiptNumber)}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#6B7280;">Date</td>
                        <td style="padding:4px 0;font-size:13px;color:#1A1A2E;">${formatDate(capturedAt)}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#6B7280;">Payment ID</td>
                        <td style="padding:4px 0;font-size:12px;color:#1A1A2E;font-family:monospace;">${escapeHtml(paymentId)}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:12px;color:#6B7280;">Financial Year</td>
                        <td style="padding:4px 0;font-size:13px;color:#1A1A2E;">FY ${escapeHtml(fy)} (AY ${escapeHtml(ay)})</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Tax pack note -->
              <div style="background:#FFFBEA;border-left:3px solid #E8A317;padding:14px 16px;margin:20px 0;border-radius:4px;">
                <div style="font-size:13px;font-weight:600;color:#1A1A2E;margin-bottom:6px;">Your tax pack is attached</div>
                <div style="font-size:13px;line-height:1.6;color:#1A1A2E;">
                  <strong>1. Provisional 80(G) Receipt</strong> — for your records. Use this immediately to track the donation.
                  <br /><br />
                  <strong>2. Form 10AC 80(G) Certificate</strong> — Wildlife Rescue's tax-exemption registration with the Income Tax Department.
                  <br /><br />
                  After the financial year ends, we will file Form 10BD with the Income Tax Department and you will receive your statutory <strong>Form 10BE</strong> certificate by email (typically by 31&nbsp;May of the following year). Form 10BE is the official document to claim your 80(G) deduction at the time of income-tax filing.
                </div>
              </div>

              <p style="margin:16px 0;font-size:14px;line-height:1.6;color:#6B7280;">
                Section 80(G) of the Income-tax Act, 1961 allows a deduction of 50% of the donated amount, subject to the conditions and limits prescribed in the Act.
              </p>

              <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;" />

              <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">
                If you have any questions about your donation or this receipt, please reply to this email or write to <a href="mailto:saud@raptorrescue.org" style="color:#0A6E5C;text-decoration:none;">saud@raptorrescue.org</a> quoting receipt number <strong>${escapeHtml(receiptNumber)}</strong>.
              </p>

              <p style="margin:16px 0 0;font-size:15px;line-height:1.6;">
                With deep gratitude,<br />
                <strong style="color:#0A6E5C;">Nadeem &amp; Saud</strong><br />
                <span style="font-size:13px;color:#6B7280;">Co-Founders, Wildlife Rescue</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9FAFB;padding:20px 32px;text-align:center;border-top:1px solid #E5E7EB;">
              <div style="font-size:12px;color:#6B7280;line-height:1.6;">
                <strong>Wildlife Rescue</strong> — Registered Public Charitable Trust<br />
                PAN: AAATW2352B  •  80(G) Reg. No.: AAATW2352B25DL02<br />
                Registered Office: 2970, Shah Ganj, Ajmeri Gate, Delhi - 110006<br />
                <a href="https://www.raptorrescue.org" style="color:#0A6E5C;text-decoration:none;">www.raptorrescue.org</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nextAYFromFy(fy: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(fy);
  if (!m) return fy;
  const startYear = parseInt(m[1], 10) + 1;
  const endYear = (startYear + 1) % 100;
  return `${startYear}-${endYear.toString().padStart(2, "0")}`;
}

// ─── Public API ─────────────────────────────────────────────────────────────

export interface SendReceiptResult {
  sent: boolean;
  skipped?: "no_api_key" | "anonymous_donor" | "missing_email";
  messageId?: string;
  error?: string;
}

/**
 * Generate the provisional receipt PDF + send the tax-pack email.
 *
 * Anonymous donors get NO email (they opted out of 80G). Donors without an
 * email address (only possible via Razorpay fallback path) also get no email.
 *
 * Failures are caught and returned in the result — they never throw, so the
 * webhook can decide whether to log or alert. The donation itself is already
 * persisted by the time this is called.
 */
export async function sendDonationReceipt(record: DonationRecord): Promise<SendReceiptResult> {
  // Guard: anonymous donations have no PAN/address and don't get an 80G receipt.
  if (record.donor.anonymous) {
    return { sent: false, skipped: "anonymous_donor" };
  }

  // Guard: missing or invalid email (e.g. fallback path with no Razorpay email).
  if (!record.donor.email || record.donor.email === "no-email@example.invalid") {
    return { sent: false, skipped: "missing_email" };
  }

  const resend = getResendClient();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not configured — receipt not sent for", record.receiptNumber);
    return { sent: false, skipped: "no_api_key" };
  }

  // Decrypt PAN for the receipt PDF. If decryption fails (key missing or
  // ciphertext malformed), the PDF will show "On file (encrypted)" — donor
  // still gets a receipt, just without their masked PAN visible.
  let pan: string | undefined;
  if (record.panEncrypted) {
    pan = decryptPan(record.panEncrypted) ?? undefined;
  } else if (record.donor.pan) {
    // legacy: pre-encryption records stored PAN inline
    pan = record.donor.pan;
  }

  try {
    const [receiptPdf, staticAttachments] = await Promise.all([
      renderReceiptPdf(record, pan),
      loadStaticAttachments(),
    ]);

    const from = process.env.RECEIPT_FROM_EMAIL || FROM_FALLBACK;
    const replyTo = process.env.RECEIPT_REPLY_TO || REPLY_TO_FALLBACK;
    const bcc = process.env.RECEIPT_BCC
      ? process.env.RECEIPT_BCC.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;

    const { data, error } = await resend.emails.send({
      from,
      to: [record.donor.email],
      replyTo,
      bcc,
      subject: buildSubject(record),
      html: buildHtmlBody(record),
      attachments: [
        {
          filename: `Wildlife-Rescue-Receipt-${record.receiptNumber.replace(/\//g, "-")}.pdf`,
          content: receiptPdf,
        },
        ...staticAttachments,
      ],
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { sent: false, error: error.message || String(error) };
    }

    console.log(`[email] Sent receipt ${record.receiptNumber} to ${record.donor.email} (msg ${data?.id ?? "?"})`);
    return { sent: true, messageId: data?.id };
  } catch (err) {
    console.error("[email] sendDonationReceipt failed:", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}
