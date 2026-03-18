"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

interface Props {
  variant?: "inline" | "banner";
}

export default function NewsletterSignup({ variant = "banner" }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Mailchimp / Resend API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center justify-center gap-2 ${
          variant === "banner" ? "py-6" : "py-3"
        }`}
      >
        <CheckCircle size={20} className="text-success" />
        <p className="text-sm font-semibold text-charcoal">
          You&apos;re subscribed! Watch your inbox for rescue updates.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal bg-white text-charcoal"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber text-charcoal font-bold rounded-lg hover:bg-amber-light transition-colors text-sm shrink-0"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <section className="bg-gradient-to-r from-teal-dark to-teal py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail size={32} className="text-amber mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
          Stay Updated
        </h2>
        <p className="text-white/70 text-sm mt-2 max-w-md mx-auto">
          Get monthly rescue stories, impact updates, and behind-the-scenes
          news delivered to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber/50 text-charcoal"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber text-charcoal font-bold rounded-full hover:bg-amber-light transition-colors text-sm"
          >
            Subscribe
          </button>
        </form>
        <p className="text-white/40 text-xs mt-3">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
