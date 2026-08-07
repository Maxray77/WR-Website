import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FINANCIALS,
  NY_CHARITY,
  ORG,
  ORG_ADDRESS_ONE_LINE,
  SOCIAL,
} from "@/lib/constants";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { Logo } from "./Logo";

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] =
  [
    {
      heading: "Our Work",
      links: [
        { label: "Our Mission", href: "/mission" },
        { label: "The Wildlife Rescue Partnership", href: "/wildlife-rescue" },
        { label: "All That Breathes", href: "/all-that-breathes" },
        { label: "News & Updates", href: "/news" },
      ],
    },
    {
      heading: "Support Us",
      links: [
        { label: "Make a Donation", href: "/donate" },
        { label: "Give Monthly", href: "/donate#monthly" },
        { label: "Donor-Advised Funds", href: "/donate#other-ways" },
        { label: "Stock & Legacy Gifts", href: "/donate#other-ways" },
      ],
    },
    {
      heading: "About",
      links: [
        { label: "Who We Are", href: "/about" },
        { label: "Impact & Transparency", href: "/impact" },
        {
          label: "Our IRS Filings",
          href: FINANCIALS.propublicaUrl,
          external: true,
        },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

const SOCIALS = [
  { label: "Instagram", href: SOCIAL.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: SOCIAL.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: SOCIAL.youtube, Icon: YoutubeIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* ------------------------------------------------ brand column */}
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed text-bone/70">
              A United States 501(c)(3) charity funding the rescue, treatment and
              release of birds of prey — and the people who do that work.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-bone/70">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span>{ORG_ADDRESS_ONE_LINE}</span>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${ORG.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {ORG.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${ORG.phoneHref}`}
                  className="transition-colors hover:text-gold"
                >
                  {ORG.phone}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} — our partner Wildlife Rescue`}
                  className="rounded-full border border-bone/20 p-2.5 text-bone/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ----------------------------------------------- link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-display text-base font-semibold text-bone">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bone/70 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-bone/70 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* ------------------------------------------------ legal / bottom */}
        <div className="mt-14 border-t border-bone/12 pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-bone/55">
            {ORG.name} is a {ORG.status} recognised by the Internal Revenue
            Service. <span className="text-bone/75">EIN {ORG.ein}.</span>{" "}
            Registered with the New York State Charities Bureau,{" "}
            <span className="text-bone/75">
              Reg. No. {NY_CHARITY.regNumber}
            </span>
            . Contributions are tax-deductible in the United States to the
            extent permitted by law. No goods or services are provided in
            exchange for your gift.
          </p>
          <p className="mt-3 max-w-4xl text-xs leading-relaxed text-bone/40">
            {NY_CHARITY.disclosure}
          </p>

          <div className="mt-6 flex flex-col gap-4 text-sm text-bone/55 sm:flex-row sm:items-center sm:justify-between">
            {/* ORG.name already ends in "Inc." — no extra full stop. */}
            <p>
              © {year} {ORG.name} All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-gold"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-gold">
                Terms of Use
              </Link>
              <Link href="/impact" className="transition-colors hover:text-gold">
                Financial Transparency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
