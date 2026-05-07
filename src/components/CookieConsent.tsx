"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "wr-cookie-consent";
const CONSENT_VERSION = 1;

type ConsentState = {
  version: number;
  analytics: boolean;
  decidedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Google Consent Mode v2 update
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
    },
  ]);
}

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persist(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage blocked — silently ignore
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      // Re-apply stored consent on every page load
      pushConsent(stored.analytics);
      return;
    }
    // No prior decision — show banner after a small delay so it doesn't flash
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  function handleAccept() {
    persist({ version: CONSENT_VERSION, analytics: true, decidedAt: new Date().toISOString() });
    pushConsent(true);
    setVisible(false);
  }

  function handleReject() {
    persist({ version: CONSENT_VERSION, analytics: false, decidedAt: new Date().toISOString() });
    pushConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto bg-white border border-slate/20 shadow-2xl rounded-xl pointer-events-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-start gap-4 p-4 sm:p-5">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="shrink-0 w-9 h-9 rounded-full bg-teal-light flex items-center justify-center text-teal" aria-hidden>
              <Cookie size={18} />
            </div>
            <div className="text-sm text-charcoal leading-relaxed min-w-0">
              <p className="font-semibold mb-1 text-charcoal">We use cookies</p>
              <p className="text-slate">
                We use essential cookies to run this site, plus optional analytics cookies (Google
                Analytics) to understand how visitors use it. You can accept analytics or stick to
                essential only. See our{" "}
                <Link href="/privacy-policy" className="text-teal underline hover:text-teal-dark">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </div>
          </div>

          <div className="flex flex-row sm:flex-row gap-2 w-full md:w-auto shrink-0 md:items-center">
            <button
              type="button"
              onClick={handleReject}
              className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg border border-slate/30 text-charcoal hover:bg-offwhite transition-colors"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark transition-colors"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={handleReject}
              aria-label="Dismiss — essential cookies only"
              className="hidden md:inline-flex shrink-0 w-9 h-9 items-center justify-center text-slate hover:text-charcoal rounded-lg hover:bg-offwhite transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
