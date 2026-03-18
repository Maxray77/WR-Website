"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/our-specialty", label: "Our Specialty" },
  { href: "/species", label: "Species" },
  { href: "/special-cases", label: "Stories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/all-that-breathes", label: "All That Breathes" },
  { href: "/annual-reports", label: "Reports" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-teal-dark font-bold text-lg leading-tight block font-[family-name:var(--font-poppins)]">
                Wildlife Rescue
              </span>
              <span className="text-slate text-xs leading-tight block">
                Raptor Rescue &amp; Rehab
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-charcoal hover:text-teal font-medium text-sm transition-colors rounded-lg hover:bg-teal-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919810029698"
              className="flex items-center gap-1.5 text-sm text-danger font-semibold hover:underline"
            >
              <Phone size={14} />
              Emergency
            </a>
            <Link
              href="/donate"
              className="bg-amber hover:bg-amber-light text-charcoal font-semibold px-6 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:scale-105"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/donate"
              className="bg-amber hover:bg-amber-light text-charcoal font-semibold px-4 py-2 rounded-full text-xs transition-all"
            >
              Donate
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-charcoal hover:text-teal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-charcoal hover:text-teal hover:bg-teal-light rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 bg-amber text-charcoal rounded-lg font-semibold text-center mt-2"
            >
              Donate Now
            </Link>
            <a
              href="tel:+919810029698"
              className="flex items-center justify-center gap-2 px-4 py-3 text-danger font-semibold mt-1"
            >
              <Phone size={16} />
              Report Injured Bird: +91 98100 29698
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
