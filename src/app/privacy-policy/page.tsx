import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Wildlife Rescue collects, uses, and protects personal data. Compliant with India's Digital Personal Data Protection Act 2023 and the EU GDPR.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "7 May 2026";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl lg:text-3xl font-bold text-charcoal mt-12 mb-4 font-[family-name:var(--font-poppins)] scroll-mt-24"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg lg:text-xl font-semibold text-charcoal mt-6 mb-2 font-[family-name:var(--font-poppins)]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-charcoal/80 leading-relaxed mb-4">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-charcoal/80 mb-4">{children}</ul>;
}

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "scope", title: "1. Scope" },
    { id: "controller", title: "2. Who we are" },
    { id: "what-we-collect", title: "3. Information we collect" },
    { id: "how-we-use", title: "4. How we use your information" },
    { id: "legal-basis", title: "5. Legal basis for processing" },
    { id: "cookies", title: "6. Cookies and analytics" },
    { id: "third-parties", title: "7. Third-party services" },
    { id: "sharing", title: "8. Sharing your information" },
    { id: "retention", title: "9. Data retention" },
    { id: "rights", title: "10. Your rights" },
    { id: "security", title: "11. Security" },
    { id: "international", title: "12. International transfers" },
    { id: "children", title: "13. Children's privacy" },
    { id: "changes", title: "14. Changes to this policy" },
    { id: "contact", title: "15. Contact us" },
  ];

  return (
    <article className="bg-offwhite">
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber font-semibold uppercase tracking-wider text-sm mb-3">
            Legal
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            How Wildlife Rescue collects, uses, and protects your personal information.
          </p>
          <p className="text-white/60 text-sm mt-3">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="bg-white border border-slate/15 rounded-xl p-5 lg:p-6 mb-10"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate mb-3">
            Contents
          </h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-teal hover:text-teal-dark hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <H2 id="scope">1. Scope</H2>
        <P>
          This Privacy Policy explains how Wildlife Rescue (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects,
          uses, stores, and shares personal information when you visit{" "}
          <strong>raptorrescue.org</strong> or interact with us through our forms, donation
          channels, AI assistant (Wingman), email, phone, or WhatsApp.
        </P>
        <P>
          We comply with the Digital Personal Data Protection Act, 2023 (India) and the EU General
          Data Protection Regulation (GDPR) where applicable to visitors from the European
          Economic Area and the United Kingdom.
        </P>

        <H2 id="controller">2. Who we are</H2>
        <P>
          The data controller responsible for your information is:
        </P>
        <UL>
          <li>
            <strong>Wildlife Rescue</strong>, a charitable trust registered under the Indian
            Trusts Act (March 2010), with FCRA registration (2020) and 80(G) tax exemption
            (Reg. No. AAATW2352B25DL02).
          </li>
          <li>
            <strong>Operating address:</strong> {CONTACT.address}
          </li>
          <li>
            <strong>Registered address:</strong> {CONTACT.registeredAddress}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${CONTACT.phone}`} className="text-teal hover:underline">
              {CONTACT.phone}
            </a>
          </li>
        </UL>
        <P>
          For donations from US donors processed by our fiscal sponsor{" "}
          <strong>{CONTACT.usFiscalSponsor.name}</strong> (EIN: {CONTACT.usFiscalSponsor.ein}),
          their privacy practices apply to that processing.
        </P>

        <H2 id="what-we-collect">3. Information we collect</H2>
        <H3>3.1 Information you give us directly</H3>
        <UL>
          <li>
            <strong>Contact form:</strong> name, email, phone (optional), subject, and message.
          </li>
          <li>
            <strong>Newsletter signup:</strong> email address.
          </li>
          <li>
            <strong>Tagged-bird reports:</strong> your name and contact details, the tag number,
            sighting details (location, date, condition of the bird), and any photos you upload.
          </li>
          <li>
            <strong>Wingman chat:</strong> the messages you type into our AI assistant. Messages
            are sent to OpenAI to generate a reply and are not used to train OpenAI&apos;s models.
          </li>
          <li>
            <strong>Donations:</strong> payment information is collected and processed entirely
            by Razorpay, GoFundMe, or Raptor Rescue and Research Inc. (R3). We do not see, store,
            or have access to your card or bank details.
          </li>
        </UL>

        <H3>3.2 Information collected automatically</H3>
        <UL>
          <li>
            <strong>Server logs:</strong> IP address, user-agent, requested URL, timestamp, and
            referrer. Used for security, abuse prevention, and rate-limiting (stored briefly in
            Upstash Redis).
          </li>
          <li>
            <strong>Analytics (only with your consent):</strong> if you accept analytics
            cookies, Google Analytics 4 collects pseudonymous usage information — pages viewed,
            session duration, approximate location (city-level), device and browser type. IP
            addresses are anonymised. We do not collect advertising identifiers.
          </li>
        </UL>

        <H2 id="how-we-use">4. How we use your information</H2>
        <UL>
          <li>To respond to your enquiries, donations, and tagged-bird reports.</li>
          <li>To send you the rescue updates you have subscribed to (you can unsubscribe at any time).</li>
          <li>To process and acknowledge donations and provide tax receipts.</li>
          <li>To operate, secure, and improve the website.</li>
          <li>To comply with our legal and regulatory obligations (FCRA, 80(G), tax reporting).</li>
        </UL>
        <P>
          We do not sell, rent, or trade your personal information. We do not use your data for
          targeted advertising.
        </P>

        <H2 id="legal-basis">5. Legal basis for processing</H2>
        <P>For visitors covered by the GDPR, our legal bases are:</P>
        <UL>
          <li>
            <strong>Consent</strong> — for analytics cookies and the newsletter.
          </li>
          <li>
            <strong>Performance of a task in the public interest</strong> and our{" "}
            <strong>legitimate interests</strong> as a charitable organisation — for responding
            to enquiries, processing donations, and operating the site securely.
          </li>
          <li>
            <strong>Legal obligation</strong> — for retaining donation and FCRA records.
          </li>
        </UL>

        <H2 id="cookies">6. Cookies and analytics</H2>
        <P>
          We use a small number of cookies and similar technologies. We classify them as either
          essential or optional.
        </P>
        <H3>6.1 Essential cookies</H3>
        <P>
          These keep the site working and remember your privacy choice. They cannot be turned off.
          The only essential cookie we set is the one that records your decision on this banner so
          we don&apos;t ask again on every page.
        </P>
        <H3>6.2 Optional analytics cookies</H3>
        <P>
          We use Google Analytics 4 with IP anonymisation and Google Consent Mode v2. Analytics
          cookies are <strong>denied by default</strong> and are only set if you click
          &quot;Accept all&quot; on our cookie banner. You can change your decision at any time by
          clearing your browser&apos;s site data for this domain — the banner will reappear on your
          next visit.
        </P>

        <H2 id="third-parties">7. Third-party services</H2>
        <P>The following processors handle data on our behalf or directly with you:</P>
        <UL>
          <li>
            <strong>Vercel</strong> (hosting, USA) — serves the website and stores short-lived
            request logs.
          </li>
          <li>
            <strong>Google Analytics 4</strong> (Google LLC, USA) — only with your consent.
          </li>
          <li>
            <strong>Razorpay</strong> (India) — processes INR donations. Their privacy policy
            applies to payment data.
          </li>
          <li>
            <strong>GoFundMe</strong> (USA) — for one route of US donations.
          </li>
          <li>
            <strong>Raptor Rescue and Research Inc. (R3)</strong> (USA) — our 501(c)(3) fiscal
            sponsor for tax-deductible US donations.
          </li>
          <li>
            <strong>OpenAI</strong> (USA) — generates Wingman&apos;s responses. Per OpenAI&apos;s API
            terms, prompts and completions sent through the API are not used to train their models.
          </li>
          <li>
            <strong>Upstash</strong> (USA/EU) — stores rate-limit counters and queued submissions.
          </li>
          <li>
            <strong>Sanity</strong> (Norway/EU) — content management system for our blog.
          </li>
          <li>
            <strong>YouTube and Google Maps</strong> (Google LLC, USA) — embedded videos and maps.
          </li>
        </UL>

        <H2 id="sharing">8. Sharing your information</H2>
        <P>
          We share personal information only with the processors listed above, and otherwise only
          when required by law (for example, in response to a valid court order, regulatory
          request, or to protect the safety of a person or animal). We never share donor or
          subscriber lists with other charities or commercial partners.
        </P>

        <H2 id="retention">9. Data retention</H2>
        <UL>
          <li>
            <strong>Contact form messages</strong> — retained for up to 24 months, then deleted.
          </li>
          <li>
            <strong>Newsletter subscribers</strong> — retained until you unsubscribe.
          </li>
          <li>
            <strong>Tagged-bird reports</strong> — retained as part of our scientific records.
          </li>
          <li>
            <strong>Donation records</strong> — retained for the period required by Indian tax
            law and FCRA reporting (currently 7 years).
          </li>
          <li>
            <strong>Server logs and rate-limit counters</strong> — typically retained for 30 days
            or less.
          </li>
          <li>
            <strong>Analytics data</strong> — retained by Google for the period configured in our
            GA4 property (default 14 months).
          </li>
        </UL>

        <H2 id="rights">10. Your rights</H2>
        <P>Subject to applicable law, you have the right to:</P>
        <UL>
          <li>Access the personal information we hold about you.</li>
          <li>Ask us to correct inaccurate information.</li>
          <li>Ask us to erase your information (subject to legal retention obligations).</li>
          <li>Withdraw your consent at any time, including for analytics and the newsletter.</li>
          <li>Object to or restrict processing in certain circumstances.</li>
          <li>Lodge a complaint with the Data Protection Board of India or, for EEA/UK residents, your local supervisory authority.</li>
        </UL>
        <P>
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
            {CONTACT.email}
          </a>
          . We aim to respond within 30 days.
        </P>

        <H2 id="security">11. Security</H2>
        <P>
          We use HTTPS across the entire site, a strict Content Security Policy, modern security
          headers (HSTS, X-Frame-Options, Permissions-Policy), origin-checked CSRF protection on
          form endpoints, and per-IP rate limiting. Donation payment data is handled entirely by
          PCI-DSS-compliant processors (Razorpay, GoFundMe, R3) and never touches our servers.
        </P>

        <H2 id="international">12. International transfers</H2>
        <P>
          Some of our processors are based outside India (notably Vercel, Google, OpenAI, GoFundMe,
          and Sanity). Where personal information is transferred outside your country of
          residence, those transfers are protected by standard contractual clauses and the
          processors&apos; own compliance frameworks.
        </P>

        <H2 id="children">13. Children&apos;s privacy</H2>
        <P>
          Our website is not directed at children under 13, and we do not knowingly collect
          personal information from children. If you believe a child has provided us with personal
          information, please contact us and we will delete it.
        </P>

        <H2 id="changes">14. Changes to this policy</H2>
        <P>
          We may update this policy from time to time. The &quot;Last updated&quot; date at the
          top of this page indicates when it was last revised. Material changes will be announced
          on the homepage or by email to subscribers.
        </P>

        <H2 id="contact">15. Contact us</H2>
        <P>
          For privacy questions, complaints, or to exercise your rights, contact us at:
        </P>
        <UL>
          <li>
            Email:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
              {CONTACT.email}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${CONTACT.phone}`} className="text-teal hover:underline">
              {CONTACT.phone}
            </a>
          </li>
          <li>Post: {CONTACT.address}</li>
        </UL>

        <div className="mt-12 pt-8 border-t border-slate/15 text-sm text-slate">
          <p>
            See also:{" "}
            <Link href="/contact" className="text-teal hover:underline">
              Contact Us
            </Link>{" "}
            ·{" "}
            <Link href="/donate" className="text-teal hover:underline">
              Donate
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
