import { ArrowRight, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";
import {
  BOARD,
  FINANCE_NOTES,
  FINANCIALS,
  NY_CHARITY,
  ORG,
  PARTNER,
} from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Impact & Transparency",
  description:
    "Our complete FY2024 financials as filed with the IRS: $83,509 raised, $56,370 spent, 100% from contributions. Read the Form 990-EZ yourself.",
  path: "/impact",
  image: "/img/egyptian-vulture-care.jpg",
});

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const HEADLINE = [
  { label: "Total revenue", value: FINANCIALS.totalRevenue, note: "All from contributions and grants" },
  { label: "Total expenses", value: FINANCIALS.totalExpenses, note: "Program, grants and administration" },
  { label: "Net assets at year end", value: FINANCIALS.netAssets, note: "Carried forward as operating reserve" },
];

const ACCOUNTABILITY = [
  {
    title: "ProPublica Nonprofit Explorer",
    body: "An independent mirror of our filed Form 990-EZ, including the officers listing and full financial detail. Nothing we say here can contradict it.",
    href: FINANCIALS.propublicaUrl,
    cta: "View our filing",
  },
  {
    title: "Candid (GuideStar)",
    body: "Our organisational profile, including governance information and documents we have chosen to publish voluntarily.",
    href: FINANCIALS.candidUrl,
    cta: "View our profile",
  },
  {
    title: "IRS Tax Exempt Organization Search",
    body: `Confirm our 501(c)(3) status and eligibility to receive tax-deductible contributions directly with the IRS using EIN ${ORG.ein}.`,
    href: "https://apps.irs.gov/app/eos/",
    cta: "Verify with the IRS",
  },
  {
    title: "NY State Charities Bureau",
    body: `We are registered with the New York Attorney General as a ${NY_CHARITY.statuteType.toLowerCase()} registrant, No. ${NY_CHARITY.regNumber}, and file a ${NY_CHARITY.annualForm} every year. Our entry appears on the state's public registry.`,
    href: NY_CHARITY.registryUrl,
    cta: "Search the NY registry",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & transparency"
        title="Here are the books. Read them before you give."
        intro={
          <>
            We are a young, small charity asking you for money. The least we owe
            you is a plain account of what we raised, what we spent, and who
            decides.
          </>
        }
        image="/img/egyptian-vulture-care.jpg"
        imageAlt=""
      />

      {/* =========================================================== headline */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow={`Fiscal year ${FINANCIALS.fiscalYear}`}
            title={`As filed with the IRS on ${FINANCIALS.filedOn}.`}
            intro={
              <>
                Form {FINANCIALS.formType} for the fiscal year ending{" "}
                {FINANCIALS.fiscalYearEnd}.
              </>
            }
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HEADLINE.map((item) => (
              <Card key={item.label}>
                <p className="text-sm font-semibold uppercase tracking-wider text-ash">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-ink">
                  {usd(item.value)}
                </p>
                <p className="mt-2 text-sm text-ash">{item.note}</p>
              </Card>
            ))}
          </div>

          {/* -------------------------------------------------- summary table */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Summary of revenue, expenses and net assets for fiscal year{" "}
                {FINANCIALS.fiscalYear}
              </caption>
              <thead className="bg-sand">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-ink">
                    Line
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right font-semibold text-ink"
                  >
                    FY {FINANCIALS.fiscalYear}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {[
                  ["Contributions, gifts and grants", usd(FINANCIALS.totalRevenue)],
                  ["Program service revenue", usd(0)],
                  ["Investment income", usd(0)],
                  ["Total revenue", usd(FINANCIALS.totalRevenue), true],
                  ["Total expenses", usd(FINANCIALS.totalExpenses), true],
                  [
                    "Excess for the year",
                    usd(FINANCIALS.totalRevenue - FINANCIALS.totalExpenses),
                  ],
                  ["Total assets at year end", usd(FINANCIALS.totalAssets)],
                  ["Net assets at year end", usd(FINANCIALS.netAssets), true],
                ].map(([label, value, bold]) => (
                  <tr key={label as string} className={bold ? "bg-bone" : ""}>
                    <th
                      scope="row"
                      className={`px-6 py-3.5 font-normal ${
                        bold ? "font-semibold text-ink" : "text-graphite"
                      }`}
                    >
                      {label}
                    </th>
                    <td
                      className={`px-6 py-3.5 text-right tabular-nums ${
                        bold ? "font-semibold text-ink" : "text-graphite"
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-ash">
            Figures as reported on our Form {FINANCIALS.formType}. The complete
            return, including the officers schedule, is linked below.
          </p>
        </Container>
      </Section>

      {/* ============================================================== notes */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              eyebrow="What the numbers mean"
              title="A small balance sheet, on purpose."
            />
            <ul className="space-y-6">
              {FINANCE_NOTES.map((note) => (
                <li key={note} className="flex gap-4">
                  <ShieldCheck
                    className="mt-1 h-5 w-5 shrink-0 text-ember"
                    aria-hidden="true"
                  />
                  <p className="text-lg leading-relaxed text-ash">{note}</p>
                </li>
              ))}
              <li className="flex gap-4">
                <ShieldCheck
                  className="mt-1 h-5 w-5 shrink-0 text-ember"
                  aria-hidden="true"
                />
                <p className="text-lg leading-relaxed text-ash">
                  We deliberately carry a reserve into the following year. A
                  clinic that has to stop admitting birds because a grant
                  arrived late has failed at exactly the wrong moment.
                </p>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* ====================================================== where it lands */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            eyebrow="Where it lands"
            title="Dollars in New York, medicine in Wazirabad."
            tone="light"
            intro={
              <>
                Our grants go to {PARTNER.name} in {PARTNER.location}, a
                facility that has received more than forty thousand birds since
                2010.
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Medical consumables",
                body: "Antibiotics, analgesia, anaesthetic gas, fluids, sutures and dressings — the recurring cost of treating thousands of birds a year.",
              },
              {
                title: "Surgical and diagnostic capacity",
                body: "Imaging, laboratory and surgical equipment, its servicing, and the consumables each procedure consumes.",
              },
              {
                title: "Care through to release",
                body: "Food, aviary maintenance and the weeks of flight conditioning between a successful surgery and an actual release.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-bone/15 p-7"
              >
                <h3 className="text-xl text-bone">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/70">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/55">
            As a US 501(c)(3) we retain full discretion and control over the use
            of our funds. Grants are made against a documented request from our
            partner and reported in our annual return. We do not act as a
            conduit for earmarked transfers to a foreign organisation.
          </p>
        </Container>
      </Section>

      {/* ===================================================== accountability */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Check us"
            title="Independent records, not our word for it."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ACCOUNTABILITY.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <FileText className="h-6 w-6 text-ember" aria-hidden="true" />
                <h3 className="mt-4 text-xl text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">
                  {item.body}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-ember hover:text-ember-dark"
                >
                  {item.cta}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================== governance */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <SectionHeading
              eyebrow="Governance"
              title="Three directors, none of them paid to fundraise."
            />
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {BOARD.map((member) => (
                  <li
                    key={member.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-5"
                  >
                    <span className="text-lg font-semibold text-ink">
                      {member.name}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-ember">
                      {member.role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-ash">
                The current officers of the corporation. Our President and
                Treasurer serve without compensation, and any compensation paid
                to an officer is disclosed in full on our annual return. Our
                most recent return covers FY {FINANCIALS.fiscalYear} and so
                lists the officers who served that year.
              </p>
              <p className="mt-4 leading-relaxed text-ash">
                We are also registered with the{" "}
                <a
                  href={NY_CHARITY.registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
                >
                  New York State Charities Bureau
                </a>{" "}
                as registration No. {NY_CHARITY.regNumber}, which places us
                under the supervision of the state Attorney General and
                requires a {NY_CHARITY.annualForm} filing every year in
                addition to our federal return.
              </p>
              <ButtonLink href="/about" tone="outline" className="mt-7">
                Meet the board
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================ CTA */}
      <Section tone="white" className="py-20">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Satisfied? Then let&rsquo;s put it to work.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ash">
            Every dollar you give is unrestricted support for raptor care, and
            deductible in the United States to the extent the law allows.
          </p>
          <ButtonLink href="/donate" tone="ember" size="lg" className="mt-9">
            Donate now
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
