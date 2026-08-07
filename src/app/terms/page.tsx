import LegalPage from "@/components/LegalPage";
import type { LegalSection } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import {
  NY_CHARITY,
  ORG,
  ORG_ADDRESS_ONE_LINE,
  PARTNER,
} from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of raptorrescueusa.org and donations made through it.",
  path: "/terms",
});

const UPDATED = "August 7, 2026";

const Mail = ({ children }: { children: React.ReactNode }) => (
  <a
    href={`mailto:${ORG.email}`}
    className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
  >
    {children}
  </a>
);

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: (
      <p>
        By using raptorrescueusa.org you agree to these terms. If you do not
        agree with them, please do not use the site. We may revise these terms
        from time to time; the date above shows when they were last changed.
      </p>
    ),
  },
  {
    heading: "About us",
    body: (
      <>
        <p>
          {ORG.name} is a {ORG.status} recognised by the United States Internal
          Revenue Service, EIN {ORG.ein}, with a mailing address at{" "}
          {ORG_ADDRESS_ONE_LINE}. We raise funds in the United States and make
          grants to organisations engaged in the rescue, treatment and release
          of birds of prey.
        </p>
        <p>
          We are registered with the New York State Charities Bureau as
          registration No. {NY_CHARITY.regNumber} and file a{" "}
          {NY_CHARITY.annualForm} with the state each year.{" "}
          {NY_CHARITY.disclosure}
        </p>
      </>
    ),
  },
  {
    heading: "Use of this site",
    body: (
      <>
        <p>
          You may read, print and share the content of this site for personal,
          non-commercial purposes. You may not use the site to break the law,
          to attempt to gain unauthorised access to our systems, to scrape or
          harvest data at scale, to introduce malicious code, or to
          misrepresent your affiliation with us.
        </p>
        <p>
          We may suspend or restrict access to the site at any time, including
          for maintenance.
        </p>
      </>
    ),
  },
  {
    heading: "Donations",
    body: (
      <>
        <p>
          Donations made through this site are voluntary charitable
          contributions. No goods or services are provided in exchange for them.
        </p>
        <p>
          Contributions are tax-deductible in the United States to the extent
          permitted by law. We are not able to give you tax advice; whether and
          to what extent you can deduct a gift depends on your own
          circumstances, and you should consult your tax adviser.
        </p>
        <p>
          By donating you confirm that the funds are lawfully yours to give and
          that you are authorised to use the payment method presented.
        </p>
      </>
    ),
  },
  {
    heading: "How your gift is used",
    body: (
      <p>
        Donations are unrestricted unless we agree otherwise in writing. As a
        United States public charity we retain full discretion and control over
        the use of all funds we receive. We currently make grants to{" "}
        {PARTNER.name} in {PARTNER.location}, but we are not a conduit for
        earmarked transfers to any particular organisation and we may direct
        funds where the need is greatest.
      </p>
    ),
  },
  {
    heading: "Refunds and cancellations",
    body: (
      <>
        <p>
          Because a donation is a gift rather than a purchase, donations are
          generally non-refundable. That said, we would much rather fix a
          mistake than keep money you did not mean to give.
        </p>
        <p>
          If you have been charged twice, entered the wrong amount, or believe a
          transaction was unauthorised, write to <Mail>{ORG.email}</Mail> within
          sixty days and we will refund it. Refunds are returned to the original
          payment method and typically take five to ten business days to appear.
        </p>
        <p>
          Recurring monthly donations can be cancelled at any time, with no
          notice period and no questions asked. Write to us and we will cancel
          it the same day; you may also manage the subscription from the link in
          your payment confirmation email. Cancelling stops future charges and
          does not refund past ones unless one of the situations above applies.
        </p>
      </>
    ),
  },
  {
    heading: "Payment processing",
    body: (
      <p>
        Card payments are processed by Stripe, and your use of that checkout is
        also subject to Stripe&rsquo;s own terms. We do not receive or store
        your full card details at any stage.
      </p>
    ),
  },
  {
    heading: "Accuracy of information",
    body: (
      <p>
        We take care that the figures on this site are accurate and sourced, and
        we identify where they come from. Statistics about our partner&rsquo;s
        caseload are published by that organisation, and financial figures are
        as filed with the IRS. Content is provided for information and may
        become out of date between updates.
      </p>
    ),
  },
  {
    heading: "No professional advice",
    body: (
      <p>
        Nothing on this site is tax, legal, financial or veterinary advice. If
        you have found an injured bird, contact a licensed wildlife
        rehabilitator in your area — we do not operate a rescue service and
        cannot advise on the treatment of an animal.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The text, design and photography on this site are owned by us or used
        with permission, and are protected by copyright. Photographs of birds in
        care are supplied by our partner organisation. Please write to us before
        reproducing images commercially; for press and educational use we are
        usually happy to say yes.
      </p>
    ),
  },
  {
    heading: "Third-party links",
    body: (
      <p>
        We link to external sites, including our partner&rsquo;s website,
        streaming services and public charity records. We do not control those
        sites and are not responsible for their content or their privacy
        practices.
      </p>
    ),
  },
  {
    heading: "Disclaimer and limitation of liability",
    body: (
      <>
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;, without warranties of any kind, whether express or
          implied, to the fullest extent permitted by law.
        </p>
        <p>
          To the extent permitted by law, our total liability arising out of
          your use of this site is limited to the greater of the amount you
          donated to us in the preceding twelve months or one hundred United
          States dollars. Nothing in these terms excludes liability that cannot
          lawfully be excluded.
        </p>
      </>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the State of New York and the
        United States, without regard to conflict-of-law principles. Any
        dispute will be brought in the state or federal courts located in New
        York County, New York.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about these terms should go to <Mail>{ORG.email}</Mail> or by
        post to {ORG.name}, {ORG_ADDRESS_ONE_LINE}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The rules for using this site, and the plain-English position on donations, refunds and cancellations."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
