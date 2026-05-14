"use client";

import { useEffect } from "react";
import { CheckCircle2, FileCheck, X, Mail, FileText } from "lucide-react";

interface Props {
  data: {
    paymentId: string;
    amount: number; // INR rupees
    receipt80g: boolean;
    donorEmail: string | null;
  };
  onClose: () => void;
}

/**
 * Post-payment success overlay shown immediately after Razorpay returns success.
 *
 * Donors get:
 *   - Confirmation of payment + Razorpay payment ID
 *   - Immediate download link for Wildlife Rescue's 80(G) registration certificate
 *   - Note that a provisional receipt email will arrive shortly (once Phase 1b ships;
 *     for now the donor can email nadeem@raptorrescue.org with their payment ID to request one)
 */
export default function DonationThankYou({ data, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/75 backdrop-blur-md p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
        {/* Header with green success gradient */}
        <div className="relative bg-gradient-to-br from-teal via-teal to-teal-dark px-6 sm:px-10 py-8 text-white text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={36} className="text-amber-light" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
            Thank You for Saving Lives
          </h2>
          <p className="mt-2 text-white/85 text-sm">
            Your donation of <span className="font-bold text-amber-light">₹{data.amount.toLocaleString("en-IN")}</span> was successful.
          </p>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-5">
          {/* Payment ID */}
          <div className="bg-offwhite border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs text-slate uppercase tracking-wider">Razorpay Payment ID</p>
              <p className="font-mono text-sm text-charcoal mt-0.5 break-all">{data.paymentId}</p>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(data.paymentId)}
              className="text-xs text-teal font-semibold hover:underline shrink-0"
            >
              Copy
            </button>
          </div>

          {/* 80G certificate — always shown, but emphasised for 80G donors */}
          <div className={`rounded-xl p-5 border-2 ${data.receipt80g ? "bg-teal-light/50 border-teal" : "bg-offwhite border-gray-200"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center shrink-0">
                <FileCheck size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-charcoal">Wildlife Rescue&apos;s 80(G) Certificate</h3>
                <p className="text-sm text-slate mt-1 leading-relaxed">
                  Issued by the Income Tax Department.{" "}
                  {data.receipt80g
                    ? "Keep this with your provisional receipt — your CA will need both for your tax return."
                    : "Available for download in case you change your mind about claiming 80(G)."}
                </p>
                <a
                  href="/80g-certificate.pdf"
                  download="Wildlife-Rescue-80G-Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  <FileCheck size={16} />
                  Download 80(G) Certificate
                </a>
              </div>
            </div>
          </div>

          {/* Provisional receipt note */}
          {data.receipt80g ? (
            <div className="rounded-xl p-5 border border-gray-200 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-bg flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal">Provisional Donation Receipt</h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    A provisional receipt with your donation details, PAN, and receipt number will be emailed to{" "}
                    {data.donorEmail ? <span className="font-semibold text-charcoal">{data.donorEmail}</span> : "the email you provided"}{" "}
                    shortly. Your Form 10BE certificate will be issued after we file Form 10BD with the Income Tax Department (by 31 May of next FY).
                  </p>
                  <p className="text-xs text-slate mt-2">
                    Haven&apos;t received it within an hour? Email <a className="text-teal underline" href="mailto:nadeem@raptorrescue.org">nadeem@raptorrescue.org</a> with the payment ID above.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-5 border border-gray-200 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-bg flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal">Want to claim 80(G) later?</h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    No problem. Email <a className="text-teal underline" href="mailto:nadeem@raptorrescue.org">nadeem@raptorrescue.org</a> with your name, PAN, address, and the payment ID above. We&apos;ll issue a provisional receipt within 10 working days.
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full px-5 py-3 rounded-xl text-sm font-bold bg-charcoal hover:bg-charcoal/85 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
