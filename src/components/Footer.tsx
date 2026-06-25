"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import NewsletterSignup from "./NewsletterSignup";

type FooterLink = { href: string; label: string; external?: boolean };

// Full site map — every public page, grouped. Keep in sync with the routes.
const FOOTER_SECTIONS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Our Work",
    links: [
      { href: "/our-specialty", label: "Our Specialty" },
      { href: "/clinic", label: "Our Clinic" },
      { href: "/enclosures", label: "Bird Enclosures" },
      { href: "/treatments", label: "Treatments" },
      { href: "/conditions", label: "Conditions We Treat" },
      { href: "/nwra-2025", label: "NWRA Symposium 2025" },
    ],
  },
  {
    title: "Species & Conservation",
    links: [
      { href: "/species", label: "Species We Treat" },
      { href: "/vultures", label: "Vulture Conservation" },
      { href: "/egyptian-vultures", label: "Egyptian Vultures" },
      { href: "/annual-reports", label: "Annual Reports" },
      { href: "/financials", label: "Financial Transparency" },
    ],
  },
  {
    title: "Media & Stories",
    links: [
      { href: "/all-that-breathes", label: "All That Breathes" },
      { href: "/special-cases", label: "Rescue Stories" },
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/videos", label: "Video Clips" },
      { href: "/blog", label: "Blog" },
      { href: "/media", label: "Press & Awards" },
      { href: "/bird-brothers", label: "Bird Brothers Book" },
      { href: "/history", label: "Our Early Days" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Contact Us" },
      { href: "/education-outreach", label: "Education & Outreach" },
      { href: "/report-tagged-bird", label: "Report a Tagged Bird" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/wr-brochure.pdf", label: "CSR Brochure (PDF)", external: true },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = "text-teal-light hover:text-white text-sm transition-colors";
  return (
    <li>
      {link.external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
          {link.label}
        </a>
      ) : (
        <Link href={link.href} className={className}>
          {link.label}
        </Link>
      )}
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top: brand + contact + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 mb-10 border-b border-white/10">
          {/* About */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-white.png"
              alt="Wildlife Rescue"
              width={120}
              height={60}
              className="mb-3 object-contain"
            />
            <p className="text-teal-light text-sm leading-relaxed mb-4 max-w-md">
              The world&apos;s largest raptor rescue facility, based in Delhi, India.
              Featured in the Oscar-nominated documentary &quot;All That Breathes.&quot;
              40,000+ birds rescued since 2010.
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

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-teal-light">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span>{CONTACT.address}</span>
                  <span className="block text-xs text-teal-light/70 mt-1">Regd: {CONTACT.registeredAddress}</span>
                </div>
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
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        {/* Site map — every page */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-4 font-[family-name:var(--font-poppins)] uppercase tracking-wide text-white/90">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <FooterLinkItem key={link.href} link={link} />
                ))}
              </ul>
            </div>
          ))}
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
              India: 80(G) Tax Exempt Reg. No. AAATW2352B25DL02 &nbsp;|&nbsp; USA: 501(c)(3) via {CONTACT.usFiscalSponsor.name} (EIN: {CONTACT.usFiscalSponsor.ein})
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
