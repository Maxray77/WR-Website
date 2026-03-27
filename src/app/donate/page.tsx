"use client";

import { useState } from "react";
import { Heart, CreditCard, Building2, Smartphone, Globe, Send, Mail, Shield, PieChart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  DONATION_AMOUNTS_INR,
  DONATION_AMOUNTS_USD,
  BANK_DETAILS,
  CONTACT,
  FEATURED_RESCUES,
} from "@/lib/constants";

const TABS = [
  { id: "upi", label: "Scan & Pay (UPI)", icon: <Smartphone size={16} /> },
  { id: "online", label: "Online", icon: <CreditCard size={16} /> },
  { id: "bank", label: "Bank Transfer", icon: <Building2 size={16} /> },
  { id: "us", label: "US Donors", icon: <Globe size={16} /> },
  { id: "gofundme", label: "GoFundMe", icon: <Send size={16} /> },
  { id: "cheque", label: "Mail Cheque", icon: <Mail size={16} /> },
];

export default function DonatePage() {
  const [activeTab, setActiveTab] = useState("upi");
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");

  const amounts = currency === "inr" ? DONATION_AMOUNTS_INR : DONATION_AMOUNTS_USD;
  const symbol = currency === "inr" ? "₹" : "$";

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-amber/10 via-amber-bg to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Help Us Save More Lives
          </h1>
          <p className="mt-4 text-xl text-slate max-w-2xl mx-auto">
            Every donation directly funds the rescue, treatment, and
            rehabilitation of injured birds in Delhi.
          </p>
        </div>
      </section>

      {/* ─── Donation Interface ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-teal text-white shadow-lg"
                    : "bg-offwhite text-slate hover:bg-teal-light hover:text-teal"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-10">
            {activeTab === "online" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6 font-[family-name:var(--font-poppins)]">
                  Donate Online
                </h2>

                {/* Currency Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setCurrency("inr")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currency === "inr"
                        ? "bg-teal text-white"
                        : "bg-offwhite text-slate"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    onClick={() => setCurrency("usd")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      currency === "usd"
                        ? "bg-teal text-white"
                        : "bg-offwhite text-slate"
                    }`}
                  >
                    $ USD
                  </button>
                </div>

                {/* Amount Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {amounts.map((item) => (
                    <button
                      key={item.amount}
                      className="p-4 rounded-xl border-2 border-gray-200 hover:border-amber text-center transition-all hover:shadow-md group"
                    >
                      <div className="text-2xl font-bold text-teal font-[family-name:var(--font-poppins)] group-hover:text-amber transition-colors">
                        {symbol}
                        {item.amount.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate mt-1">{item.label}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Custom Amount
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-offwhite border border-r-0 border-gray-200 rounded-l-lg text-slate font-semibold">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:outline-none focus:border-teal text-charcoal"
                    />
                  </div>
                </div>

                {/* Monthly Toggle */}
                <label className="flex items-center gap-3 mb-8 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal"
                  />
                  <span className="text-charcoal font-medium">
                    Make this a monthly donation
                  </span>
                </label>

                {/* Donate Button */}
                <button className="w-full bg-amber hover:bg-amber-light text-charcoal font-bold py-4 rounded-xl text-lg transition-all hover:shadow-lg">
                  Donate {symbol}
                  {amounts[0].amount.toLocaleString()}
                </button>
                <p className="text-xs text-slate text-center mt-3">
                  Secure payment via Stripe / Razorpay (coming soon)
                </p>
              </div>
            )}

            {activeTab === "bank" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6 font-[family-name:var(--font-poppins)]">
                  Bank Transfer (India)
                </h2>
                <div className="bg-offwhite rounded-xl p-6 space-y-3">
                  {[
                    ["Bank", BANK_DETAILS.bankName],
                    ["Account Name", BANK_DETAILS.accountName],
                    ["Account Number", BANK_DETAILS.accountNumber],
                    ["IFSC Code", BANK_DETAILS.ifsc],
                    ["Branch", BANK_DETAILS.branch],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="text-slate text-sm">{label}</span>
                      <span className="text-charcoal font-semibold text-sm font-mono">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate mt-4">
                  After transferring, please email {CONTACT.email} with your
                  transaction details for a receipt.
                </p>
              </div>
            )}

            {activeTab === "upi" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6 font-[family-name:var(--font-poppins)]">
                  Scan & Pay via UPI
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="w-56 h-56 bg-offwhite rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-teal/30">
                      <div className="text-center">
                        <Smartphone size={48} className="text-teal mx-auto mb-2" />
                        <span className="text-slate text-sm">QR Code Coming Soon</span>
                      </div>
                    </div>
                    <div className="bg-teal-light rounded-lg px-4 py-3 inline-block">
                      <p className="text-sm text-teal font-medium">UPI ID</p>
                      <p className="text-lg font-bold text-teal-dark font-mono">
                        {BANK_DETAILS.upiId}
                      </p>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-charcoal text-lg">
                      How to Pay
                    </h3>
                    {[
                      {
                        step: "1",
                        title: "Open any UPI app",
                        desc: "Google Pay, PhonePe, Paytm, BHIM, or any banking app with UPI",
                      },
                      {
                        step: "2",
                        title: "Scan QR code or enter UPI ID",
                        desc: `Search for UPI ID: ${BANK_DETAILS.upiId}`,
                      },
                      {
                        step: "3",
                        title: "Enter amount & pay",
                        desc: "Complete the payment — you'll receive instant confirmation",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">
                            {item.title}
                          </p>
                          <p className="text-sm text-slate">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-amber-bg rounded-lg p-4 mt-4">
                      <p className="text-sm text-charcoal">
                        <strong>Tip:</strong> After payment, email{" "}
                        <span className="font-mono text-teal">{CONTACT.email}</span>{" "}
                        with your transaction ID for an 80(G) tax receipt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "us" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6 font-[family-name:var(--font-poppins)]">
                  US Donors
                </h2>
                <p className="text-slate mb-6">
                  Choose your preferred donation method:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Option 1: Tax-Deductible via R3 */}
                  <div className="bg-teal-light rounded-xl p-6 border-2 border-teal/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={20} className="text-teal" />
                      <h3 className="font-bold text-charcoal">
                        Tax-Deductible (501c3)
                      </h3>
                    </div>
                    <p className="text-sm text-charcoal leading-relaxed mb-4">
                      Donate through our US fiscal sponsor for a tax-deductible
                      receipt under Section 501(c)(3).
                    </p>
                    <div className="bg-white rounded-lg p-4 space-y-2 mb-4 text-sm">
                      <p><span className="text-slate">Organization:</span> <span className="font-semibold text-charcoal">{CONTACT.usFiscalSponsor.name}</span></p>
                      <p><span className="text-slate">EIN:</span> <span className="font-semibold text-charcoal font-mono">{CONTACT.usFiscalSponsor.ein}</span></p>
                    </div>
                    <a
                      href="https://raptorrescueusa.org/donate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-teal hover:bg-teal-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Donate via R3 Website
                    </a>
                  </div>

                  {/* Option 2: No tax benefit via GoFundMe */}
                  <div className="bg-offwhite rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart size={20} className="text-amber" />
                      <h3 className="font-bold text-charcoal">
                        Direct Donation (No Tax Benefit)
                      </h3>
                    </div>
                    <p className="text-sm text-charcoal leading-relaxed mb-4">
                      Donate directly via GoFundMe. No tax deduction, but 100%
                      of your donation reaches Wildlife Rescue.
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm text-slate">
                        Donations in US$ are processed through GoFundMe and
                        transferred directly to our team in Delhi.
                      </p>
                    </div>
                    <a
                      href="https://gofund.me/d9df0362"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-amber hover:bg-amber-light text-charcoal font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Donate via GoFundMe
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gofundme" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4 font-[family-name:var(--font-poppins)]">
                  GoFundMe Campaign
                </h2>
                <p className="text-slate mb-6 max-w-lg">
                  Support us through our GoFundMe campaign. Donate in US$ —
                  share with friends and family to multiply your impact.
                </p>
                {/* GoFundMe Embed Widget */}
                <div
                  className="mb-6"
                  dangerouslySetInnerHTML={{
                    __html: `<div class="gfm-embed" data-url="https://www.gofundme.com/f/help-all-that-breathes-protagonists-save-birds-in-india/widget/large?sharesheet=undefined&attribution_id=sl:c5e5159e-e117-4168-b426-b8c59e29af44"></div><script defer src="https://www.gofundme.com/static/js/embed.js"></script>`,
                  }}
                />
                <div className="text-center mt-4">
                  <a
                    href="https://gofund.me/d9df0362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber hover:bg-amber-light text-charcoal font-semibold px-8 py-3 rounded-full transition-colors"
                  >
                    Open GoFundMe Page
                  </a>
                  <p className="text-xs text-slate mt-2">
                    If the widget above doesn&apos;t load, click the button to
                    visit our GoFundMe page directly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "cheque" && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6 font-[family-name:var(--font-poppins)]">
                  Mail a Cheque
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-offwhite rounded-xl p-6">
                    <h3 className="font-bold text-charcoal mb-2">
                      India Donations
                    </h3>
                    <p className="text-sm text-slate">
                      Payable to: Wildlife Rescue
                    </p>
                    <p className="text-sm text-slate mt-2">{CONTACT.address}</p>
                  </div>
                  <div className="bg-offwhite rounded-xl p-6">
                    <h3 className="font-bold text-charcoal mb-2">
                      US Donations
                    </h3>
                    <p className="text-sm text-slate">
                      Payable to: {CONTACT.usFiscalSponsor.name}
                    </p>
                    <p className="text-sm text-slate mt-2">
                      {CONTACT.usFiscalSponsor.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Trust Section ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Your Trust Matters"
            subtitle="Full transparency in how your donation is used."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <Shield size={32} className="text-teal mx-auto mb-3" />
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                80(G) Certified
              </h3>
              <p className="text-sm text-slate mt-2">
                Indian donors receive tax deduction under Section 80(G) of the
                Income Tax Act.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <Shield size={32} className="text-teal mx-auto mb-3" />
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                501(c)(3) Partner
              </h3>
              <p className="text-sm text-slate mt-2">
                US donations are tax-deductible via Raptor Rescue and Research
                Inc. (EIN: {CONTACT.usFiscalSponsor.ein}).
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
              <PieChart size={32} className="text-teal mx-auto mb-3" />
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Where Your Money Goes
              </h3>
              <p className="text-sm text-slate mt-2">
                Food, medicine, rescue operations, staff salaries, and facility
                maintenance — every rupee accounted for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Impact Stories ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Your Donation in Action"
            subtitle="Real stories of birds saved through donor support."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_RESCUES.map((rescue) => (
              <div
                key={rescue.title}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                  <span className="text-slate text-sm">Photo Placeholder</span>
                </div>
                <div className="p-6">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      rescue.outcome === "Released"
                        ? "bg-green-50 text-success"
                        : "bg-amber-bg text-amber"
                    }`}
                  >
                    {rescue.outcome}
                  </span>
                  <h3 className="text-lg font-bold text-charcoal mt-2 font-[family-name:var(--font-poppins)]">
                    {rescue.title}
                  </h3>
                  <p className="text-sm text-slate mt-2">{rescue.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
