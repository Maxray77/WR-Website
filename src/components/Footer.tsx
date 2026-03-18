"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Wildlife Rescue
            </h3>
            <p className="text-teal-light text-sm leading-relaxed mb-4">
              The world&apos;s largest raptor rescue facility, based in Delhi, India.
              Featured in the Oscar-nominated documentary &quot;All That Breathes.&quot;
              38,000+ birds rescued since 2010.
            </p>
            <div className="flex gap-3">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/donate", label: "Donate" },
                { href: "/all-that-breathes", label: "All That Breathes" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-teal-light hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-teal-light">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="flex gap-2 text-sm text-teal-light hover:text-white transition-colors">
                  <Phone size={16} className="shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex gap-2 text-sm text-teal-light hover:text-white transition-colors">
                  <Mail size={16} className="shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Stay Updated
            </h3>
            <p className="text-teal-light text-sm mb-3">
              Get monthly rescue updates and conservation news.
            </p>
            <form className="flex gap-2" action="#">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-amber"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber hover:bg-amber-light text-charcoal font-semibold rounded-lg text-sm transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-teal-light">
            <p>
              &copy; {new Date().getFullYear()} Wildlife Rescue. All rights reserved.
            </p>
            <p className="text-center">
              India: 80(G) Tax Exempt &nbsp;|&nbsp; USA: 501(c)(3) via {CONTACT.usFiscalSponsor.name} (EIN: {CONTACT.usFiscalSponsor.ein})
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
