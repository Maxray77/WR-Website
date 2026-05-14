"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle, Lock } from "lucide-react";

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
  onSubmit: (donor: DonorFormData) => Promise<void>;
}

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
  const [form, setForm] = useState<DonorFormData>({
    name: "", email: "", phone: "", pan: "",
    addressLine1: "", city: "", state: "", pincode: "", country: "India",
    anonymous: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!form.name.trim() || form.name.trim().length < 2) return "Please enter your full name.";
    if (!EMAIL_REGEX.test(form.email.trim())) return "Please enter a valid email address.";
    if (form.anonymous) return null;
    if (!PAN_REGEX.test(form.pan.trim().toUpperCase())) return "PAN must be 10 characters (5 letters + 4 digits + 1 letter). Check 'donate anonymously' to skip 80G.";
    if (!form.addressLine1.trim()) return "Address is required for 80(G) receipt.";
    if (!form.city.trim()) return "City is required.";
    if (!form.state.trim()) return "State is required.";
    if (form.country === "India" && !PINCODE_REGEX.test(form.pincode.trim())) return "Please enter a valid 6-digit pincode.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setSubmitting(true);
    try {
      await onSubmit({ ...form, pan: form.pan.trim().toUpperCase(), email: form.email.trim() });
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
              Your Details
            </h2>
            <p className="text-sm text-slate mt-1">
              Donation: <span className="font-bold text-teal">₹{amountInRupees.toLocaleString()}</span>
              {" "}— for your 80(G) tax-deduction receipt
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate hover:text-charcoal transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Anonymous toggle */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-offwhite border border-gray-200 cursor-pointer hover:bg-teal-light/50 transition-colors">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(e) => update("anonymous", e.target.checked)}
              className="mt-1 w-4 h-4 accent-teal cursor-pointer"
            />
            <div>
              <span className="text-sm font-semibold text-charcoal">Donate anonymously (skip 80G certificate)</span>
              <p className="text-xs text-slate mt-0.5">
                Skip if you don&apos;t want to share your PAN/address. You won&apos;t be able to claim tax deduction.
              </p>
            </div>
          </label>

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={form.anonymous ? "Full Name" : "Full Name (as per PAN)"} required>
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
            <Field label="Email" required>
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

          {/* 80G fields */}
          {!form.anonymous && (
            <>
              <div className="pt-3 border-t border-gray-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-teal mb-3">
                  Required for 80(G) Receipt
                </h3>
              </div>

              <Field label="PAN" required hint="10 chars, e.g. ABCDE1234F. Required by IT Dept for Form 10BD filing.">
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={form.pan}
                  onChange={(e) => update("pan", e.target.value.toUpperCase())}
                  className="form-input font-mono uppercase"
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

              <div className="grid sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
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
                <Field label="Country" required>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="form-input"
                  />
                </Field>
              </div>
            </>
          )}

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
              Your details are used only for tax receipts and Form 10BD filing. PAN is stored encrypted.
              We never share donor data with third parties. See our{" "}
              <a href="/privacy-policy" className="underline text-teal hover:text-teal-dark" target="_blank">Privacy Policy</a>.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="sm:flex-1 px-5 py-3 rounded-xl text-sm font-semibold border border-gray-300 text-charcoal hover:bg-offwhite transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="sm:flex-[2] px-5 py-3 rounded-xl text-sm font-bold bg-teal hover:bg-teal-dark text-white transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {submitting ? "Opening Razorpay…" : `Continue to pay ₹${amountInRupees.toLocaleString()}`}
            </button>
          </div>
        </form>
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
