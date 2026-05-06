"use client";

import { useState, useEffect } from "react";
import { Shield, Heart, ArrowRight, X } from "lucide-react";
import { DONATION_AMOUNTS_USD } from "@/lib/constants";

type Variant = "full" | "teaser";

export default function UsdAmountGrid({ variant = "full" }: { variant?: Variant }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (selectedAmount === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAmount(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedAmount]);

  const cardClass =
    variant === "teaser"
      ? "bg-white rounded-xl p-5 text-center border-2 border-gray-100 hover:border-amber hover:shadow-lg transition-all group"
      : "p-4 rounded-xl border-2 border-gray-200 text-center hover:border-amber hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group";

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DONATION_AMOUNTS_USD.map((item) => (
          <button
            key={item.amount}
            type="button"
            onClick={() => setSelectedAmount(item.amount)}
            className={cardClass}
          >
            <div className="text-2xl font-bold text-teal font-[family-name:var(--font-poppins)] group-hover:text-amber transition-colors">
              ${item.amount}
            </div>
            <p className="text-xs text-slate mt-1">{item.label}</p>
          </button>
        ))}
      </div>

      {selectedAmount !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedAmount(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="usd-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAmount(null)}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-offwhite flex items-center justify-center text-slate hover:text-charcoal transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <p className="text-sm text-slate">You&apos;re donating</p>
              <p className="text-4xl font-bold text-teal font-[family-name:var(--font-poppins)] mt-1">
                ${selectedAmount}
              </p>
              <h2
                id="usd-modal-title"
                className="text-lg font-semibold text-charcoal mt-3"
              >
                Choose how to donate
              </h2>
            </div>

            <div className="space-y-3">
              <a
                href="https://raptorrescueusa.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-teal-light rounded-xl p-4 hover:bg-teal/10 transition-colors border border-teal/10 group"
              >
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal group-hover:text-teal transition-colors">
                    Donate via R3 — Tax-Deductible (501c3)
                  </p>
                  <p className="text-xs text-slate mt-1">
                    US tax-deductible receipt · Raptor Rescue and Research Inc. · EIN: 87-3289299
                  </p>
                </div>
                <ArrowRight size={16} className="text-teal shrink-0 mt-1" />
              </a>

              <a
                href="https://gofund.me/d9df0362"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-offwhite rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center shrink-0">
                  <Heart size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-charcoal group-hover:text-amber transition-colors">
                    Donate via GoFundMe
                  </p>
                  <p className="text-xs text-slate mt-1">
                    Quick US$ donation · No tax receipt · No account required
                  </p>
                </div>
                <ArrowRight size={16} className="text-amber shrink-0 mt-1" />
              </a>
            </div>

            <p className="text-[11px] text-slate text-center mt-5">
              You&apos;ll be taken to the partner site to complete your donation. Please enter ${selectedAmount} as the amount.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
