import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Binoculars, Coins, GraduationCap, Scale } from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  PullQuote,
  Section,
  SectionHeading,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { ORG, PARTNER } from "@/lib/constants";
import PageHero from "@/components/PageHero";

export const metadata = pageMetadata({
  title: "Our Mission",
  description:
    "Raptor Rescue and Research Inc. funds the rescue, treatment and release of birds of prey — and the research that makes that treatment better. Here is what we do, how we choose partners, and what we will not do.",
  path: "/mission",
  image: "/img/serpent-eagle.jpg",
});

const PILLARS = [
  {
    Icon: Coins,
    title: "Fund treatment directly",
    body: "We make grants to raptor rescue organisations that admit, treat and release birds of prey. Not awareness campaigns. Not conferences. The clinic floor.",
  },
  {
    Icon: GraduationCap,
    title: "Fund the research behind it",
    body: "Better surgical technique saves more birds than more cages do. We support the documentation, publication and teaching of methods that other rehabilitators can adopt.",
  },
  {
    Icon: Scale,
    title: "Give American donors a lawful route",
    body: "A US taxpayer cannot deduct a gift sent directly to a foreign charity. As a 501(c)(3) exercising independent control over our grants, we make that support both possible and deductible.",
  },
  {
    Icon: Binoculars,
    title: "Look for the next partner",
    body: "Raptor rehabilitation across South and Southeast Asia is chronically underfunded. Our long-term intention is to support more than one facility.",
  },
];

const PRINCIPLES = [
  {
    title: "We fund people who were already doing the work",
    body: "We do not start clinics. We find the ones that have already proven themselves over years — with case registers, outcomes and a reputation among their peers — and we take a funding problem off their desk.",
  },
  {
    title: "Release rate is the measure that counts",
    body: "Admissions are easy to grow and easy to publicise. What matters is how many birds fly away afterwards. We ask our partners for outcome data, not intake numbers.",
  },
  {
    title: "We publish what we can substantiate",
    body: "Where we quote a figure, it comes from an audited account, a filed return or a partner's own case register — and we say which. We would rather look less impressive than be imprecise.",
  },
  {
    title: "Overhead stays low because the board is unpaid",
    body: "We have no US office and no fundraising staff. Our directors serve without compensation. That is not a marketing line, it is on our Form 990.",
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title="Put birds of prey back in the sky, and pay for the people who know how."
        intro="Raptor Rescue and Research Inc. is a United States charity with a deliberately narrow remit. We raise money in America and move it, with as little friction as possible, to raptor rehabilitation that already works."
        image="/img/serpent-eagle.jpg"
        imageAlt="A Crested Serpent Eagle in care"
      />

      {/* ============================================================ statement */}
      <Section tone="bone">
        <Container size="narrow">
          <PullQuote quote="A raptor that cannot fly has not been rescued. It has been detained. Restoring flight is the entire job, and it is expensive, technical work." />
          <div className="prose-r3 mt-10 text-lg text-ash">
            <p>
              Birds of prey are hard to rehabilitate. They are large, powerful,
              easily stressed, and the injuries they arrive with — fractured
              wings, severed tendons, degloved skin, septicaemia — sit at the
              difficult end of veterinary medicine. A raptor also cannot be
              released half-fixed. A songbird with a slight wing deficit may
              cope. An eagle that cannot hunt will starve.
            </p>
            <p>
              That means raptor rehabilitation demands surgical capability,
              anaesthesia, imaging, long recovery periods and large flight
              aviaries. It is the most resource-hungry corner of wildlife
              rescue, and in most of the world it is funded by almost nobody.
            </p>
            <p>
              We exist to change that arithmetic at the specific places where
              the skill already exists and only the money is missing.
            </p>
          </div>
        </Container>
      </Section>

      {/* ============================================================== pillars */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Four things, and nothing else."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PILLARS.map(({ Icon, title, body }) => (
              <Card key={title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-light">
                  <Icon className="h-5 w-5 text-ember" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-ash">{body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* =========================================================== where now */}
      <Section tone="ink">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Where the money goes today"
                title="One partner, chosen carefully."
                tone="light"
                intro={
                  <>
                    Every grant we have made so far has gone to{" "}
                    {PARTNER.name} in {PARTNER.location} — a facility that has
                    received more than forty thousand birds since 2010 and
                    treats some {PARTNER.speciesCount} distinct species.
                  </>
                }
              />
              <div className="prose-r3 mt-6 text-lg text-bone/70">
                <p>
                  They were not chosen because a film was made about them. They
                  were chosen because they are, by volume of raptors received,
                  the largest facility of their kind anywhere — and because they
                  developed a surgical repair for the injury that dominates
                  their caseload and then taught it to the wider field rather
                  than keeping it.
                </p>
                <p>
                  Concentrating on one partner keeps our costs near zero and our
                  oversight real. As our income grows, we intend to add
                  partners — carefully, and on the same evidence.
                </p>
              </div>
              <ButtonLink
                href="/wildlife-rescue"
                tone="gold"
                className="mt-8"
              >
                Meet our partner
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/img/aviary.jpg"
                alt="Enclosures at the partner facility, with recovering raptors perched at the far end"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================== principles */}
      <Section tone="bone">
        <Container>
          <SectionHeading
            eyebrow="How we operate"
            title="The commitments we hold ourselves to."
          />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                <span className="font-display text-2xl font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 max-w-3xl leading-relaxed text-ash">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ closing */}
      <Section tone="sand">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Small charity. Narrow remit. Public books.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ash">
            {ORG.name} is a {ORG.status}, EIN {ORG.ein}. You can read our IRS
            filing, see what we raised and what we spent, and decide for
            yourself whether we are worth your money.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/donate" tone="ember" size="lg">
              Support this work
            </ButtonLink>
            <ButtonLink href="/impact" tone="outline" size="lg">
              See the numbers
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ash">
            Questions first?{" "}
            <Link
              href="/contact"
              className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
            >
              Write to us
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
