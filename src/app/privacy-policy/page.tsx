import LegalPage from "@/components/LegalPage";
import type { LegalSection } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { ORG, ORG_ADDRESS_ONE_LINE } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Raptor Rescue and Research Inc. collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

const UPDATED = "August 7, 2026";

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
  >
    {children}
  </a>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        {ORG.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a {ORG.status}{" "}
        registered in the United States, EIN {ORG.ein}, with a mailing address
        at {ORG_ADDRESS_ONE_LINE}. We are the controller of personal information
        collected through raptorrescueusa.org. You can reach us at any time at{" "}
        <A href={`mailto:${ORG.email}`}>{ORG.email}</A>.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>We collect only what we need in order to do three things.</p>
        <p>
          <strong className="text-ink">When you contact us:</strong> your name,
          email address, chosen subject and the content of your message. This is
          submitted voluntarily and used to reply to you.
        </p>
        <p>
          <strong className="text-ink">When you donate:</strong> your name,
          email address, billing address and donation amount. Card details are
          entered directly with our payment processor and never reach our
          servers — we cannot see your full card number at any point.
        </p>
        <p>
          <strong className="text-ink">When you browse:</strong> standard server
          logs kept by our hosting provider, which may include IP address,
          browser type and pages requested. These are used for security and to
          keep the site running.
        </p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <>
        <p>
          We use your information to process and acknowledge donations, to issue
          the written acknowledgements the IRS requires, to reply to your
          enquiries, to meet our legal and tax reporting obligations, and to
          keep the site secure.
        </p>
        <p>
          We do not sell, rent, trade or share your personal information with
          anyone for their own marketing purposes. We do not send marketing
          email unless you have asked us to.
        </p>
      </>
    ),
  },
  {
    heading: "Service providers we rely on",
    body: (
      <>
        <p>
          We are a small organisation and use a small number of established
          providers. Each processes data only on our instructions.
        </p>
        <p>
          <strong className="text-ink">Stripe</strong> — payment processing.
          Stripe is a PCI Service Provider Level 1 and handles card data
          directly. See the <A href="https://stripe.com/privacy">Stripe privacy
          policy</A>.
        </p>
        <p>
          <strong className="text-ink">Resend</strong> — delivery of contact-form
          messages to our inbox.
        </p>
        <p>
          <strong className="text-ink">Our hosting provider</strong> — serving
          the website and maintaining security logs.
        </p>
        <p>
          We may also disclose information where we are legally required to,
          such as in our annual filings with the Internal Revenue Service.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <>
        <p>
          This site sets no advertising cookies and runs no third-party
          advertising trackers. Stripe may set cookies necessary for fraud
          prevention during checkout.
        </p>
        <p>
          If we introduce analytics in future we will update this policy first,
          and will configure it to anonymise IP addresses.
        </p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Donation records are retained for at least seven years, as required
          for United States charitable tax and audit purposes.
        </p>
        <p>
          Contact-form correspondence is retained for as long as needed to deal
          with your enquiry and for a reasonable period afterwards, and is then
          deleted.
        </p>
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>
          You may ask us for a copy of the personal information we hold about
          you, ask us to correct it, or ask us to delete it. Write to{" "}
          <A href={`mailto:${ORG.email}`}>{ORG.email}</A> and we will respond
          within thirty days.
        </p>
        <p>
          Some information cannot be deleted on request where we are legally
          required to retain it — donation records being the main example.
        </p>
        <p>
          Depending on where you live you may have additional rights under laws
          such as the California Consumer Privacy Act or, for visitors in
          Europe, the General Data Protection Regulation. We will honour valid
          requests under those laws.
        </p>
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        The site is served over HTTPS. Payment card data is handled exclusively
        by our payment processor and is never stored on our systems. No method
        of transmission over the internet is completely secure, and we cannot
        guarantee absolute security, but we take reasonable measures
        proportionate to the information we hold.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        This site is not directed at children under 13 and we do not knowingly
        collect their personal information. If you believe a child has provided
        us with information, write to us and we will delete it.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of this
        page shows when it was last revised. Material changes will be described
        here rather than made silently.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        Questions about this policy, or about information we hold, should go to{" "}
        <A href={`mailto:${ORG.email}`}>{ORG.email}</A> or by post to{" "}
        {ORG.name}, {ORG_ADDRESS_ONE_LINE}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect, why we collect it, who else touches it, and how to make us delete it."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
