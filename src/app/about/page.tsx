import Image from "next/image";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
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
  FINANCIALS,
  NY_CHARITY,
  ORG,
  ORG_ADDRESS_ONE_LINE,
  PARTNER,
} from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Who We Are",
  description:
    "The board of Raptor Rescue and Research Inc. — president Julie Collins; secretary Nadeem Shehzad, co-founder of Wildlife Rescue in Delhi; and treasurer Luis Perez. A 501(c)(3) registered with the New York State Charities Bureau.",
  path: "/about",
  image: "/img/nwra-speakers.jpg",
});

/** Initials fallback for directors without a portrait on file. */
function Monogram({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <span className="font-display text-5xl font-semibold text-gold">
        {initials}
      </span>
    </div>
  );
}

const FACTS = [
  { label: "Legal name", value: ORG.name },
  { label: "Status", value: ORG.status },
  { label: "EIN", value: ORG.ein },
  { label: "IRS ruling year", value: String(ORG.rulingYear) },
  {
    label: "NY State charity registration",
    value: `No. ${NY_CHARITY.regNumber} — ${NY_CHARITY.statuteType} registrant, ${NY_CHARITY.bureau}`,
  },
  {
    label: "NY annual filing",
    value: `Form ${NY_CHARITY.annualForm}, due 4.5 months after fiscal year end`,
  },
  { label: "Registered address", value: ORG_ADDRESS_ONE_LINE },
  {
    label: "Most recent federal filing",
    value: `Form ${FINANCIALS.formType}, FY ${FINANCIALS.fiscalYear}`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Three directors, and nobody drawing a salary to fundraise."
        intro={
          <>
            Raptor Rescue and Research is run by a volunteer board. There is no
            American office and no development department — which is how a gift
            made here arrives, very nearly whole, at a clinic in Delhi.
          </>
        }
        image="/img/nwra-speakers.jpg"
        imageAlt="Mohammad Saud and Nadeem Shehzad at the NWRA Annual Symposium"
      />

      {/* ============================================================== story */}
      <Section tone="bone">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Why we were formed"
            title="An American charity for a clinic on the other side of the world."
          />
          <div className="prose-r3 mt-6 text-lg text-ash">
            <p>
              United States tax law is unambiguous: an individual cannot deduct
              a charitable gift made directly to a foreign organisation. For a
              clinic in Delhi, that closes off the largest pool of sympathetic
              donors it will ever have.
            </p>
            <p>
              Raptor Rescue and Research Inc. was incorporated to solve that,
              and received its IRS determination in {ORG.rulingYear}. We are a
              domestic 501(c)(3) that raises funds in America, exercises
              independent discretion over how they are used, and grants them to
              raptor rehabilitation that meets our standards.
            </p>
            <p>
              It is a plumbing problem, solved by people who care a great deal
              about what flows through the pipe.
            </p>
          </div>
        </Container>
      </Section>

      {/* ============================================================== board */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Board of directors"
            title="The people responsible."
            intro={
              <>
                The current officers of the corporation. Two of the three serve
                without any compensation at all.
              </>
            }
          />

          <div className="mt-16 space-y-16">
            {BOARD.map((member, i) => {
              // Alternate which side the portrait sits on. Emit exactly one
              // grid-cols class — two conflicting ones resolve by stylesheet
              // order, not class order, and silently squeeze the text column.
              const reversed = i % 2 === 1;
              return (
                <article
                  key={member.name}
                  className={`grid gap-10 lg:gap-14 ${
                    reversed
                      ? "lg:grid-cols-[1fr_280px]"
                      : "lg:grid-cols-[280px_1fr]"
                  }`}
                >
                  <div
                    className={`relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl lg:mx-0 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    ) : (
                      <Monogram name={member.name} />
                    )}
                  </div>

                  <div className={reversed ? "lg:order-1" : ""}>
                    <p className="eyebrow text-ember">{member.role}</p>
                    <h3 className="mt-3 text-3xl text-ink">{member.name}</h3>
                    <div className="prose-r3 mt-5 text-ash">
                      {member.bio.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                    {member.links?.length ? (
                      <div className="mt-5 flex flex-wrap gap-4">
                        {member.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-ember hover:text-ember-dark"
                          >
                            {link.label}
                            <ExternalLink
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-16 rounded-2xl border border-line bg-sand p-6 text-sm leading-relaxed text-ash">
            Our President and Treasurer serve without compensation. Compensation
            paid to any officer is disclosed in full on our annual return, which
            is{" "}
            <a
              href={FINANCIALS.propublicaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
            >
              public
            </a>
            . Please note that our most recent filing covers FY{" "}
            {FINANCIALS.fiscalYear} and therefore lists the officers who served
            during that year; the board above is the current one, and will
            appear on our next return.
          </p>
        </Container>
      </Section>

      {/* ============================================================ partner */}
      <Section tone="ink">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our partner"
                title="Wildlife Rescue, Delhi"
                tone="light"
                intro={
                  <>
                    Founded by {PARTNER.founders} and registered under the
                    Indian Trusts Act in 2010. The largest raptor rescue
                    facility in the world by annual intake of birds of prey.
                  </>
                }
              />
              <p className="mt-6 leading-relaxed text-bone/70">
                Nadeem Shehzad sits on our board as Secretary. That is
                deliberate: it keeps the American charity honest about what the
                clinic actually needs, rather than what is easiest to fundraise
                against. Grant decisions remain with the full board, and
                compensation to any interested director is disclosed on our
                return.
              </p>
              <ButtonLink href="/wildlife-rescue" tone="gold" className="mt-8">
                About the partnership
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/img/saud.jpg"
                alt="Mohammad Saud, co-founder of Wildlife Rescue"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== facts */}
      <Section tone="bone">
        <Container>
          <SectionHeading
            eyebrow="Organisation details"
            title="For your records, and your accountant's."
          />
          <Card className="mt-10 p-0">
            <dl className="divide-y divide-line">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 px-6 py-5 sm:grid-cols-[240px_1fr] sm:gap-6 sm:px-8"
                >
                  <dt className="text-sm font-semibold uppercase tracking-wider text-ash">
                    {fact.label}
                  </dt>
                  <dd className="text-graphite">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/donate" tone="ember" size="lg">
              Support our work
            </ButtonLink>
            <ButtonLink href="/contact" tone="outline" size="lg">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact the board
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
