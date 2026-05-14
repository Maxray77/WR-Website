"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle, Lock, ArrowLeft, Heart, FileCheck, Sparkles, Check } from "lucide-react";

export interface DonorFormData {
  name: string;
  email: string;
  phone: string;
  pan: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  anonymous: boolean;
}

interface Props {
  open: boolean;
  amountInRupees: number;
  onClose: () => void;
  /**
   * Called when donor proceeds to payment.
   *   - `null` → skip 80G; create order with no donor draft (truly anonymous,
   *     Razorpay collects email/phone via its own UI)
   *   - DonorFormData with anonymous=false → full 80G flow
   */
  onSubmit: (donor: DonorFormData | null) => Promise<void>;
}

type Step = "choice" | "details";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function DonorDetailsModal({ open, amountInRupees, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<Step>("choice");
  const [form, setForm] = useState<DonorFormData>({
    name: "", email: "", phone: "", pan: "",
    addressLine1: "", city: "", state: "", pincode: "", country: "India",
    anonymous: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to choice step every time the modal opens
  useEffect(() => {
    if (open) {
      setStep("choice");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  function update<K extends keyof DonorFormData>(key: K, value: DonorFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  }

  function validate(): string | null {
    if (!form.name.trim() || form.name.trim().length < 2) return "Please enter your full name as per your PAN card.";
    if (!EMAIL_REGEX.test(form.email.trim())) return "Please enter a valid email address — your receipt will be sent here.";
    if (!PAN_REGEX.test(form.pan.trim().toUpperCase())) return "PAN must be 10 characters (5 letters + 4 digits + 1 letter). Example: ABCDE1234F.";
    if (!form.addressLine1.trim()) return "Address is required for 80(G) receipt.";
    if (!form.city.trim()) return "City is required.";
    if (!form.state.trim()) return "State is required.";
    if (form.country === "India" && !PINCODE_REGEX.test(form.pincode.trim())) return "Please enter a valid 6-digit Indian pincode.";
    return null;
  }

  async function handleSkip80G() {
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handle80GSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        pan: form.pan.trim().toUpperCase(),
        email: form.email.trim(),
        anonymous: false,
      });
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 backdrop-blur-md p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">

        {/* ─── Header strip (shared) ─── */}
        <div className="relative bg-gradient-to-br from-teal-dark via-teal to-teal-dark px-6 sm:px-8 py-6 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Heart size={18} className="text-amber-light" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">
                {step === "choice" ? "Step 1 of 2" : "Step 2 of 2 — Your Details"}
              </p>
              <p className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                Donation: ₹{amountInRupees.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* ─── STEP 1: Choice ─── */}
        {step === "choice" && (
          <div className="px-6 sm:px-10 py-8 sm:py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal text-center font-[family-name:var(--font-poppins)]">
              Would you like an 80(G) tax-deduction receipt?
            </h2>
            <p className="text-center text-sm text-slate mt-3 max-w-xl mx-auto leading-relaxed">
              Indian taxpayers can claim a <span className="font-semibold text-teal-dark">50% deduction</span>{" "}
              on this donation under Section 80(G). Both options are equally welcome — every rupee saves a bird either way.
            </p>

            {/* Two large choice cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              {/* LEFT — No receipt */}
              <button
                type="button"
                onClick={handleSkip80G}
                disabled={submitting}
                className="group relative text-left bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-teal hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-wait"
              >
                <div className="w-12 h-12 rounded-xl bg-offwhite border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-teal-light group-hover:border-teal-light transition-colors">
                  <Heart size={22} className="text-slate group-hover:text-teal transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  No, donate directly
                </h3>
                <p className="text-sm text-slate mt-1.5 leading-snug">
                  Skip to payment — no personal details needed beyond your card / UPI.
                </p>
                <ul className="text-xs text-slate mt-4 space-y-1.5">
                  <li className="flex items-center gap-1.5"><span className="text-teal">•</span> Fastest option</li>
                  <li className="flex items-center gap-1.5"><span className="text-amber">•</span> No tax-deduction certificate</li>
                </ul>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal group-hover:text-teal transition-colors">
                  {submitting ? "Opening Razorpay…" : "Continue to payment"}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </button>

              {/* RIGHT — Yes, 80G receipt (visually prominent) */}
              <button
                type="button"
                onClick={() => setStep("details")}
                disabled={submitting}
                className="group relative text-left bg-gradient-to-br from-teal to-teal-dark text-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 ring-1 ring-teal-dark/50"
              >
                <span className="absolute -top-3 right-4 inline-flex items-center gap-1 bg-amber text-charcoal text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  <Sparkles size={11} /> Tax-Deductible
                </span>
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-4">
                  <FileCheck size={22} className="text-amber-light" />
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                  Yes, I&apos;d like an 80(G) receipt
                </h3>
                <p className="text-sm text-white/85 mt-1.5 leading-snug">
                  Claim a <span className="font-bold">50% deduction</span> from your taxable income.
                </p>
                <ul className="text-xs text-white/80 mt-4 space-y-1.5">
                  <li className="flex items-center gap-1.5"><Check size={12} className="text-amber-light" /> I&apos;ll share my name, PAN &amp; address</li>
                  <li className="flex items-center gap-1.5"><Check size={12} className="text-amber-light" /> Receipt issued instantly by email</li>
                  <li className="flex items-center gap-1.5"><Check size={12} className="text-amber-light" /> Form 10BE certificate after FY filing</li>
                </ul>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Continue with details
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </button>
            </div>

            {/* Error feedback for skip path */}
            {error && (
              <div className="mt-6 flex gap-2 items-start bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-center text-xs text-slate mt-8">
              You can always email us later for an 80(G) receipt — but the instant option is faster.
            </p>
          </div>
        )}

        {/* ─── STEP 2: Details form (only shown if "Yes" was clicked) ─── */}
        {step === "details" && (
          <form onSubmit={handle80GSubmit} className="px-6 sm:px-8 py-6 space-y-4">
            <button
              type="button"
              onClick={() => { setStep("choice"); setError(null); }}
              className="inline-flex items-center gap-1 text-sm text-slate hover:text-teal transition-colors mb-1"
            >
              <ArrowLeft size={14} /> Back to options
            </button>

            <div>
              <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Your Details for the 80(G) Receipt
              </h2>
              <p className="text-sm text-slate mt-1">
                All fields are required by the Income Tax Department for Form 10BD filing.
              </p>
            </div>

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name (as per PAN)" required>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="form-input"
                  placeholder="Mohammad Saud"
                />
              </Field>
              <Field label="Email" required hint="Your receipt will be sent here">
                <input
                  type="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <Field label="Phone (optional)">
              <input
                type="tel"
                maxLength={20}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="form-input"
                placeholder="+91 98100 12345"
              />
            </Field>

            <Field label="PAN" required hint="10 chars — 5 letters + 4 digits + 1 letter. e.g. ABCDE1234F.">
              <input
                type="text"
                required
                maxLength={10}
                value={form.pan}
                onChange={(e) => update("pan", e.target.value.toUpperCase())}
                className="form-input font-mono uppercase tracking-wider"
                placeholder="ABCDE1234F"
                autoCapitalize="characters"
              />
            </Field>

            <Field label="Address" required>
              <input
                type="text"
                required
                maxLength={300}
                value={form.addressLine1}
                onChange={(e) => update("addressLine1", e.target.value)}
                className="form-input"
                placeholder="Flat / House No., Street, Area"
              />
            </Field>

            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="City" required>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="form-input"
                  placeholder="Delhi"
                />
              </Field>
              <Field label="State" required>
                <select
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="form-input"
                >
                  <option value="">— Select —</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Pincode" required={form.country === "India"}>
                <input
                  type="text"
                  required={form.country === "India"}
                  maxLength={10}
                  inputMode="numeric"
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value)}
                  className="form-input"
                  placeholder="110084"
                />
              </Field>
            </div>

            {/* Error feedback */}
            {error && (
              <div className="flex gap-2 items-start bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Privacy note */}
            <div className="flex gap-2 items-start text-xs text-slate bg-teal-light/40 rounded-lg p-3">
              <Lock size={14} className="shrink-0 mt-0.5 text-teal" />
              <span>
                Your details are used only for the tax receipt and Form 10BD filing. PAN is stored encrypted.
                We never share donor data with third parties. See our{" "}
                <a href="/privacy-policy" className="underline text-teal hover:text-teal-dark" target="_blank">Privacy Policy</a>.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-5 py-3.5 rounded-xl text-sm font-bold bg-teal hover:bg-teal-dark text-white transition-colors disabled:opacity-60 disabled:cursor-wait shadow-md"
            >
              {submitting ? "Opening Razorpay…" : `Continue to pay ₹${amountInRupees.toLocaleString("en-IN")} →`}
            </button>
          </form>
        )}

      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          color: #1A1A2E;
          font-size: 0.875rem;
          line-height: 1.4;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          outline: none;
          border-color: #0A6E5C;
          box-shadow: 0 0 0 3px rgba(10, 110, 92, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">
        {label}{required && <span className="text-amber ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-slate mt-1">{hint}</span>}
    </label>
  );
}
