"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

interface NavItem {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Our Work",
    children: [
      { href: "/our-specialty", label: "Our Specialty" },
      { href: "/species", label: "Species We Treat" },
      { href: "/special-cases", label: "Rescue Stories" },
      { href: "/annual-reports", label: "Annual Reports" },
    ],
  },
  {
    label: "Media",
    children: [
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/videos", label: "Video Clips" },
      { href: "/media", label: "Press & Awards" },
      { href: "/all-that-breathes", label: "All That Breathes" },
    ],
  },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

// Flat list for mobile
const MOBILE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/our-specialty", label: "Our Specialty" },
  { href: "/species", label: "Species We Treat" },
  { href: "/special-cases", label: "Rescue Stories" },
  { href: "/annual-reports", label: "Annual Reports" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/videos", label: "Video Clips" },
  { href: "/media", label: "Press & Awards" },
  { href: "/all-that-breathes", label: "All That Breathes" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

function DropdownMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-4 py-2 text-charcoal hover:text-teal font-medium text-sm transition-colors rounded-lg hover:bg-teal-light"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px] z-50">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-charcoal hover:text-teal hover:bg-teal-light transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="px-4 py-2 text-charcoal hover:text-teal font-medium text-sm transition-colors rounded-lg hover:bg-teal-light"
                >
                  {item.label}
                </Link>
              )
            )}
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
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {MOBILE_LINKS.map((link) => (
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
