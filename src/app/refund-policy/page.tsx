import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Wildlife Rescue's refund, cancellation, and donation receipt policy for online donations processed through Razorpay, GoFundMe, and Raptor Rescue and Research Inc. (R3).",
  alternates: { canonical: "/refund-policy" },
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

export default function RefundPolicyPage() {
  const sections = [
    { id: "scope", title: "1. Scope" },
    { id: "nature", title: "2. Nature of a donation" },
    { id: "general", title: "3. General refund policy" },
    { id: "exceptions", title: "4. When we will issue a refund" },
    { id: "request", title: "5. How to request a refund" },
    { id: "timeline", title: "6. Refund processing timeline" },
    { id: "failed", title: "7. Failed or pending transactions" },
    { id: "cancellation", title: "8. Cancellation" },
    { id: "receipt", title: "9. Donation receipt and 80(G) certificate" },
    { id: "international", title: "10. International donations" },
    { id: "chargebacks", title: "11. Chargebacks and disputes" },
    { id: "contact", title: "12. Contact us" },
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
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Our policy for refunds, cancellations, and donation receipts.
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
          This Refund &amp; Cancellation Policy explains how Wildlife Rescue (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;) handles refund requests and cancellations for donations
          received through <strong>raptorrescue.org</strong>. It applies to donations made via
          Razorpay (UPI, cards, net banking, wallets), bank transfer, cheque, GoFundMe, and our US
          fiscal sponsor Raptor Rescue and Research Inc. (R3).
        </P>

        <H2 id="nature">2. Nature of a donation</H2>
        <P>
          A donation to Wildlife Rescue is a voluntary, charitable contribution. It is{" "}
          <strong>not a purchase of goods or services</strong>. In exchange for your donation, we
          provide an acknowledgement and, where applicable, a tax-receipt (80(G) certificate for
          Indian donors, or a 501(c)(3) acknowledgement for US donors who give through R3).
        </P>
        <P>
          Because a donation is a gift rather than a commercial transaction, refunds are governed
          by the principles below and are issued only in limited circumstances.
        </P>

        <H2 id="general">3. General refund policy</H2>
        <P>
          As a general rule, <strong>donations are non-refundable</strong> once they have been
          received and acknowledged. Donations are used to fund the rescue, treatment, and
          rehabilitation of injured birds and are typically committed to operational expenses
          (food, medicine, salaries, ambulance, clinic upkeep) shortly after receipt.
        </P>
        <P>
          However, we understand that mistakes happen. We will consider refund requests in good
          faith and process them where they fall within the exceptions described in section 4.
        </P>

        <H2 id="exceptions">4. When we will issue a refund</H2>
        <P>We will issue a refund in the following circumstances:</P>
        <UL>
          <li>
            <strong>Duplicate transaction</strong> — you were charged more than once for the same
            intended donation due to a technical retry, double-click, or network error.
          </li>
          <li>
            <strong>Incorrect amount</strong> — you entered the wrong amount (for example, an extra
            zero) and notify us within{" "}
            <strong>7 calendar days</strong> of the transaction. We will refund the difference or
            the full amount at your option.
          </li>
          <li>
            <strong>Unauthorised transaction</strong> — the donation was made without your
            authorisation (for example, a family member or someone with access to your device or
            card used it without permission). We may ask you to report the matter to your bank or
            card issuer in parallel.
          </li>
          <li>
            <strong>Technical / processing error</strong> — Razorpay or the payment gateway
            reported a failure to you, but the amount was still debited from your account.
          </li>
          <li>
            <strong>Failure to deliver acknowledgement or 80(G) receipt</strong> — where we are
            unable to issue an 80(G) tax receipt that you specifically requested at the time of
            donation, and you no longer wish to proceed with the gift.
          </li>
        </UL>
        <P>
          Refunds outside these circumstances are at the sole discretion of Wildlife Rescue and
          may be declined where the funds have already been committed to active rescue and
          medical expenses.
        </P>

        <H2 id="request">5. How to request a refund</H2>
        <P>
          To request a refund, please email us at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
            {CONTACT.email}
          </a>{" "}
          with the following details:
        </P>
        <UL>
          <li>Your full name and the name on the donor account, if different</li>
          <li>The date of the donation</li>
          <li>The amount donated</li>
          <li>The Razorpay payment ID, UPI reference number, or transaction ID</li>
          <li>The email address or phone number used at the time of donation</li>
          <li>A brief description of the reason for the refund request</li>
        </UL>
        <P>
          You may also call us on{" "}
          <a href={`tel:${CONTACT.phone}`} className="text-teal hover:underline">
            {CONTACT.phone}
          </a>{" "}
          during working hours. Refund requests must be in writing (email) for us to process them.
        </P>

        <H2 id="timeline">6. Refund processing timeline</H2>
        <P>
          Once we receive your refund request and confirm it is eligible, we will initiate the
          refund through the same payment method used for the original transaction. Indicative
          timelines are:
        </P>
        <UL>
          <li>
            <strong>Acknowledgement of request:</strong> within 3 working days of receiving your
            email.
          </li>
          <li>
            <strong>Decision and refund initiation:</strong> within 7 working days of
            acknowledgement.
          </li>
          <li>
            <strong>Credit to your account:</strong> typically 5&ndash;10 working days after
            initiation, depending on your bank or card issuer (Razorpay&apos;s standard refund
            window).
          </li>
        </UL>
        <P>
          Refunds are always returned to the original source (the same card, UPI handle, or bank
          account) and cannot be redirected to a different account. For UPI refunds, please
          ensure your UPI handle is still active.
        </P>

        <H2 id="failed">7. Failed or pending transactions</H2>
        <P>
          If a transaction fails on the payment gateway but the amount is still debited from your
          account, this is usually because the bank has placed a temporary hold. In the vast
          majority of cases, the amount is automatically reversed by the bank within{" "}
          <strong>5&ndash;7 working days</strong>. You do not need to take any action.
        </P>
        <P>
          If the amount is not reversed after 7 working days, please contact us with your
          transaction reference and we will work with Razorpay to investigate.
        </P>

        <H2 id="cancellation">8. Cancellation</H2>
        <P>
          We currently accept <strong>one-time donations only</strong>. We do not operate any
          recurring donation subscriptions, standing instructions, or monthly auto-debit
          arrangements through our website. There is therefore no donation subscription for you
          to cancel.
        </P>
        <P>
          If you have set up a recurring transfer to our bank account directly through your own
          bank, please cancel it through your bank&apos;s standing-instruction facility. We have
          no ability to cancel transfers initiated from your end.
        </P>

        <H2 id="receipt">9. Donation receipt and 80(G) certificate</H2>
        <P>
          On successful completion of an online donation, you will receive an automated payment
          confirmation from Razorpay or the payment processor. This serves as proof of payment.
        </P>
        <P>
          For an <strong>80(G) tax exemption certificate</strong> (Indian donors only), please
          email{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
            {CONTACT.email}
          </a>{" "}
          with the following:
        </P>
        <UL>
          <li>Your full name (as per PAN)</li>
          <li>PAN number</li>
          <li>Postal address</li>
          <li>Transaction ID and date of donation</li>
        </UL>
        <P>
          We will issue and email the 80(G) receipt within <strong>10 working days</strong> of
          receiving these details. Wildlife Rescue is registered under Section 80(G) of the
          Income Tax Act, 1961 (Reg. No. AAATW2352B25DL02, valid for Assessment Years 2027-28 to
          2031-32).
        </P>

        <H2 id="international">10. International donations</H2>
        <P>
          Donations made by US donors through our fiscal sponsor{" "}
          <strong>{CONTACT.usFiscalSponsor.name}</strong> (EIN: {CONTACT.usFiscalSponsor.ein})
          are governed by R3&apos;s own refund and acknowledgement policies. For refund
          requests on US-side donations, please write to{" "}
          <a href="mailto:nshehzad@raptorrescueusa.org" className="text-teal hover:underline">
            nshehzad@raptorrescueusa.org
          </a>{" "}
          or visit{" "}
          <a
            href="https://raptorrescueusa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline"
          >
            raptorrescueusa.org
          </a>
          .
        </P>
        <P>
          Donations made via <strong>GoFundMe</strong> are governed by GoFundMe&apos;s own refund
          policy, available on their website.
        </P>

        <H2 id="chargebacks">11. Chargebacks and disputes</H2>
        <P>
          If you believe a donation was made fraudulently or in error, we encourage you to contact
          us <em>first</em> at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">
            {CONTACT.email}
          </a>{" "}
          before initiating a chargeback with your bank or card issuer. A direct refund through
          Razorpay is usually faster and avoids the dispute fees and administrative burden that
          chargebacks place on our small team.
        </P>

        <H2 id="contact">12. Contact us</H2>
        <P>For any questions about this policy, refunds, or receipts:</P>
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
            <Link href="/terms" className="text-teal hover:underline">
              Terms of Service
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
