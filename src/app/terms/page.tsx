import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for raptorrescue.org, the official website of Wildlife Rescue, Delhi, India.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "13 May 2026";

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

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-charcoal/80 leading-relaxed mb-4">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-charcoal/80 mb-4">{children}</ul>;
}

export default function TermsPage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of terms" },
    { id: "about", title: "2. About Wildlife Rescue" },
    { id: "use", title: "3. Permitted use of the website" },
    { id: "donations", title: "4. Donations" },
    { id: "payment", title: "5. Payment processing" },
    { id: "user-content", title: "6. User-submitted content" },
    { id: "ip", title: "7. Intellectual property" },
    { id: "third-party", title: "8. Third-party services and links" },
    { id: "ai", title: "9. AI assistant (Wingman)" },
    { id: "disclaimers", title: "10. Disclaimers" },
    { id: "liability", title: "11. Limitation of liability" },
    { id: "indemnity", title: "12. Indemnification" },
    { id: "termination", title: "13. Termination" },
    { id: "law", title: "14. Governing law and jurisdiction" },
    { id: "changes", title: "15. Changes to these terms" },
    { id: "contact", title: "16. Contact" },
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
            Terms of Service
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            The terms under which Wildlife Rescue offers this website and accepts donations.
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

        <H2 id="acceptance">1. Acceptance of terms</H2>
        <P>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website
          located at <strong>raptorrescue.org</strong> and its sub-pages (the &quot;Website&quot;),
          and any donations, forms, AI assistant, or other services offered through it. By using
          the Website you agree to be bound by these Terms. If you do not agree, please do not use
          the Website.
        </P>

        <H2 id="about">2. About Wildlife Rescue</H2>
        <P>
          The Website is operated by <strong>Wildlife Rescue</strong>, a charitable trust
          registered under the Indian Trusts Act in March 2010, with FCRA registration (2020) and
          80(G) tax exemption (Reg. No. AAATW2352B25DL02 | PAN: AAATW2352B).
        </P>
        <UL>
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

        <H2 id="use">3. Permitted use of the website</H2>
        <P>
          You may browse the Website, read our content, contact us, donate, and submit reports of
          tagged birds for lawful, personal, and non-commercial purposes. You agree not to:
        </P>
        <UL>
          <li>Use the Website in any way that violates Indian law or any applicable law in your jurisdiction.</li>
          <li>Attempt to gain unauthorised access to any part of the Website, our servers, or other systems connected to the Website.</li>
          <li>Probe, scan, or test the vulnerability of any system or network without authorisation.</li>
          <li>Interfere with, disrupt, or place an unreasonable load on the Website, including through automated scraping, denial-of-service attacks, or excessive request volumes.</li>
          <li>Submit false, misleading, harassing, defamatory, or unlawful content through any form or our AI assistant.</li>
          <li>Use the Website to harvest contact information, build mailing lists, or impersonate any person or organisation.</li>
          <li>Reproduce, modify, or redistribute substantial portions of the Website&apos;s content for commercial purposes without our prior written consent.</li>
        </UL>

        <H2 id="donations">4. Donations</H2>
        <P>
          All donations made through the Website are voluntary, charitable contributions to
          Wildlife Rescue. By making a donation you confirm that:
        </P>
        <UL>
          <li>You are the lawful holder of the payment instrument used, or have explicit authorisation to use it.</li>
          <li>The funds used for the donation come from a lawful source.</li>
          <li>You are donating in your personal or organisational capacity in compliance with applicable foreign-contribution and tax laws (including the FCRA, 2010 where applicable).</li>
          <li>You understand that, except in the limited circumstances described in our{" "}
            <Link href="/refund-policy" className="text-teal hover:underline">
              Refund &amp; Cancellation Policy
            </Link>
            , donations are non-refundable.</li>
        </UL>
        <P>
          Wildlife Rescue reserves the right to decline or return any donation at our discretion,
          including where we cannot verify the source of funds or where accepting the donation
          would breach applicable law.
        </P>

        <H2 id="payment">5. Payment processing</H2>
        <P>
          Online INR donations are processed by <strong>Razorpay Software Private Limited</strong>
          {" "}(&quot;Razorpay&quot;). US donations are processed by{" "}
          <strong>{CONTACT.usFiscalSponsor.name}</strong> (EIN: {CONTACT.usFiscalSponsor.ein}) and
          by <strong>GoFundMe</strong>. Each of these providers has its own terms of service and
          privacy policy, which apply to the processing of your payment data. We do not see, store,
          or have access to your card or bank credentials.
        </P>

        <H2 id="user-content">6. User-submitted content</H2>
        <P>
          When you submit information through any of our forms (contact, newsletter, tagged-bird
          report, Wingman chat) you grant Wildlife Rescue a non-exclusive, royalty-free,
          worldwide licence to use, store, and process that information for the purposes set out
          in our{" "}
          <Link href="/privacy-policy" className="text-teal hover:underline">
            Privacy Policy
          </Link>
          .
        </P>
        <P>
          For tagged-bird reports, you grant us permission to use the photos and details you
          submit for our scientific records, conservation reporting, and related communications,
          with credit where appropriate. You confirm that any content you submit is lawful, does
          not infringe any third-party rights, and is not confidential.
        </P>

        <H2 id="ip">7. Intellectual property</H2>
        <P>
          All content on the Website &mdash; including text, photographs, videos, logos, graphics,
          page layouts, and source code &mdash; is owned by Wildlife Rescue or our licensors and
          is protected by Indian and international copyright, trademark, and other intellectual
          property laws.
        </P>
        <P>
          You may share links to our pages, quote short extracts of our content with proper
          attribution, and download materials we have explicitly made available for download
          (such as our brochure, annual reports, and financial statements). All other rights are
          reserved. Please contact us before using our photos or videos in your own publications
          or media.
        </P>

        <H2 id="third-party">8. Third-party services and links</H2>
        <P>
          The Website integrates with and links to third-party services, including Razorpay,
          GoFundMe, Raptor Rescue and Research Inc., YouTube, Google Maps, Google Analytics, and
          our blog content management system. We are not responsible for the content, practices,
          or availability of any third-party service. Your use of those services is governed by
          their own terms.
        </P>

        <H2 id="ai">9. AI assistant (Wingman)</H2>
        <P>
          Our Website includes an AI assistant called &quot;Wingman&quot; powered by OpenAI&apos;s
          language models. Wingman is an informational aid only. Its responses are generated by an
          AI model and may occasionally be inaccurate, incomplete, or out of date. You should not
          rely on Wingman for veterinary, medical, legal, financial, or emergency advice. For
          urgent bird-rescue situations, please call our hotline on{" "}
          <a href={`tel:${CONTACT.phone}`} className="text-teal hover:underline">
            {CONTACT.phone}
          </a>
          .
        </P>

        <H2 id="disclaimers">10. Disclaimers</H2>
        <P>
          The Website and its content are provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. To the maximum extent permitted by law, Wildlife Rescue makes no
          warranties of any kind, express or implied, including warranties of merchantability,
          fitness for a particular purpose, non-infringement, or that the Website will be
          uninterrupted, secure, or error-free.
        </P>
        <P>
          Information about birds, medical conditions, treatments, and conservation on the
          Website is provided for general educational purposes. It is based on our experience at
          Wildlife Rescue and is not a substitute for advice from a qualified veterinarian or
          wildlife professional in your jurisdiction.
        </P>

        <H2 id="liability">11. Limitation of liability</H2>
        <P>
          To the maximum extent permitted by law, Wildlife Rescue, its trustees, employees,
          volunteers, and agents will not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of or in connection with your use of the
          Website, including loss of data, loss of profits, or interruption of service, even if
          we have been advised of the possibility of such damages.
        </P>
        <P>
          Our total aggregate liability to you for all claims arising out of or in connection
          with the Website will not exceed the amount of any donation you have made to Wildlife
          Rescue in the twelve months preceding the event giving rise to the claim.
        </P>

        <H2 id="indemnity">12. Indemnification</H2>
        <P>
          You agree to indemnify and hold harmless Wildlife Rescue, its trustees, employees,
          volunteers, and agents from any claims, losses, damages, liabilities, and expenses
          (including reasonable legal fees) arising out of your breach of these Terms, your
          misuse of the Website, or your violation of any applicable law or third-party right.
        </P>

        <H2 id="termination">13. Termination</H2>
        <P>
          We may suspend or terminate your access to the Website at any time, without notice, if
          we reasonably believe you have breached these Terms or applicable law. The provisions
          of these Terms that by their nature should survive termination (including intellectual
          property, disclaimers, liability limits, indemnification, and governing law) will
          continue to apply.
        </P>

        <H2 id="law">14. Governing law and jurisdiction</H2>
        <P>
          These Terms are governed by the laws of India. Any dispute arising out of or in
          connection with these Terms or your use of the Website will be subject to the exclusive
          jurisdiction of the competent courts at Delhi, India.
        </P>

        <H2 id="changes">15. Changes to these terms</H2>
        <P>
          We may update these Terms from time to time. The &quot;Last updated&quot; date at the
          top of this page indicates when they were last revised. Continued use of the Website
          after a change indicates your acceptance of the revised Terms.
        </P>

        <H2 id="contact">16. Contact</H2>
        <P>For any questions about these Terms, please contact us:</P>
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
            <Link href="/refund-policy" className="text-teal hover:underline">
              Refund &amp; Cancellation Policy
            </Link>{" "}
            ·{" "}
            <Link href="/privacy-policy" className="text-teal hover:underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
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
