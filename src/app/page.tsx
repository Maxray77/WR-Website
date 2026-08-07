import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Film,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  ButtonLink,
  Stat,
  Card,
} from "@/components/ui";
import {
  FILM,
  FINANCIALS,
  GIVING_TIERS,
  ORG,
  PARTNER,
  PARTNER_STATS,
} from "@/lib/constants";
import { formatDate, sortedPosts } from "@/lib/news";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function HomePage() {
  const posts = sortedPosts().slice(0, 3);

  return (
    <>
      {/* ================================================================ hero */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-ink">
        <Image
          src="/img/hero-steppe-eagle.jpg"
          alt="A Steppe Eagle held in careful hands at the clinic in Delhi"
          fill
          priority
          sizes="100vw"
          // Framed so the eagle's eye sits clear of the headline column
          style={{ objectPosition: "64% 36%" }}
          className="object-cover opacity-90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent"
        />

        <Container size="wide" className="relative z-10 pb-20 pt-36 sm:pb-28">
          <div className="max-w-2xl">
            <Eyebrow tone="gold">
              A US 501(c)(3) charity · EIN {ORG.ein}
            </Eyebrow>
            <h1 className="text-4xl leading-[1.08] text-bone sm:text-5xl lg:text-6xl">
              The birds keep falling.
              <br />
              <span className="text-gold">Someone has to catch them.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/80">
              We are the American partner of Wildlife Rescue in Delhi — the
              largest raptor rescue facility in the world, and the subject of
              the Oscar-nominated documentary <em>All That Breathes</em>. Your
              gift pays for the medicine, the surgery and the aviary time that
              puts a bird back in the sky.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/donate" tone="ember" size="lg">
                Donate now
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/wildlife-rescue" tone="outlineLight" size="lg">
                See where your gift goes
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================= trust strip */}
      <div className="border-b border-line bg-white">
        <Container size="wide">
          <ul className="grid gap-y-4 py-5 text-sm text-ash sm:grid-cols-3 sm:gap-x-8">
            {[
              {
                Icon: BadgeCheck,
                text: `${ORG.status} — gifts are tax-deductible in the US`,
              },
              {
                Icon: FileText,
                text: "IRS Form 990 filings public and independently mirrored",
              },
              {
                Icon: HeartHandshake,
                text: "Volunteer board — no US fundraising staff to pay",
              },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-2.5">
                <Icon
                  className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                  aria-hidden="true"
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* ============================================================== opener */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Why we exist"
                title="A great clinic should not have to depend on a great film."
                intro={
                  <>
                    In 2023, a documentary about two brothers treating injured
                    Black Kites in a Delhi basement was nominated for an Academy
                    Award. Millions of people watched it and wanted to help.
                    Almost none of them had a straightforward way to do so.
                  </>
                }
              />
              <div className="prose-r3 mt-6 text-lg text-ash">
                <p>
                  Raptor Rescue and Research Inc. was formed to close that gap.
                  We are a small American charity with one job: turn support
                  raised in the United States into working capital for raptor
                  rescue on the ground — reliably, transparently, and without a
                  layer of overhead in between.
                </p>
                <p>
                  Today that means funding{" "}
                  <Link
                    href="/wildlife-rescue"
                    className="font-semibold text-ember underline decoration-ember/30 underline-offset-4 hover:decoration-ember"
                  >
                    Wildlife Rescue in Delhi
                  </Link>
                  . As we grow, it will mean supporting raptor rehabilitation in
                  other places where the need is enormous and the funding is
                  not.
                </p>
              </div>
              <ButtonLink href="/mission" tone="outline" className="mt-8">
                Read our mission
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/img/egyptian-vulture.jpg"
                  alt="An Egyptian Vulture, an Endangered species treated at the clinic"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-[15rem] rounded-2xl bg-ink p-5 text-bone shadow-xl sm:block">
                <p className="font-display text-lg leading-snug">
                  The Egyptian Vulture is Endangered.
                </p>
                <p className="mt-2 text-sm text-bone/70">
                  Our partner has treated dozens, and released nearly three in
                  four of the resolved cases.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =============================================================== stats */}
      <Section tone="ink">
        <Container size="wide">
          <SectionHeading
            eyebrow="Our partner in numbers"
            title="What your money is buying into."
            tone="light"
            intro={
              <>
                Figures published by Wildlife Rescue, Wazirabad, Delhi — drawn
                from a case register kept by hand since 2010.
              </>
            }
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_STATS.map((stat) => (
              <Stat key={stat.label} {...stat} tone="light" />
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================= partnership */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/img/manja-wound.jpg"
                  alt="A Black Kite on the clinic table with a bandaged wing, the manja string that cut it still lying beside the bird"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/img/black-kite-recovery.jpg"
                  alt="A bandaged Black Kite recovering beside the anaesthesia machine after surgery"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="The work itself"
                title="Manja cuts a wing to the bone. They rebuild it, layer by layer."
                intro={
                  <>
                    Around {PARTNER.manjaShare} of documented injuries at the
                    clinic come from manja — kite string coated in powdered
                    glass. It severs skin, tendon, muscle and nerve along the
                    leading edge of the wing.
                  </>
                }
              />
              <div className="prose-r3 mt-6 text-lg text-ash">
                <p>
                  For most of the history of raptor rehabilitation, that injury
                  ended the bird. Wildlife Rescue spent years developing a
                  staged surgical repair of the propatagium that restores real,
                  releasable flight — and then took it to the National Wildlife
                  Rehabilitators Association to teach it to everyone else.
                </p>
                <p>
                  This is the difference between a shelter and a hospital. It is
                  also why we chose them.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/wildlife-rescue" tone="ink">
                  <Stethoscope className="h-4 w-4" aria-hidden="true" />
                  Inside the clinic
                </ButtonLink>
                <ButtonLink href="/donate" tone="outline">
                  Fund a surgery
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================ film */}
      <Section tone="ink">
        <Container>
          {/* Explicit track width: an `auto` column collapses to zero around a
              w-full child, which silently hides the poster. */}
          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl ring-1 ring-bone/15 sm:max-w-sm lg:max-w-none">
              <Image
                src="/img/atb-poster.jpg"
                alt={`Poster for ${FILM.title}`}
                fill
                sizes="(max-width: 640px) 80vw, 384px"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Academy Award nominee"
                title={FILM.title}
                tone="light"
                intro={FILM.synopsis}
              />
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {FILM.awards.slice(0, 6).map((award) => (
                  <li key={award.name} className="flex items-start gap-2.5">
                    <Film
                      className="mt-1 h-4 w-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-bone/80">
                      <span className="font-semibold text-bone">
                        {award.name}
                      </span>{" "}
                      — {award.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/all-that-breathes"
                tone="gold"
                className="mt-9"
              >
                About the film
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== giving */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Give"
            title="Choose what you would like to pay for."
            align="center"
            intro={
              <>
                Every gift is unrestricted support for raptor care at our
                partner clinic. These headings describe the kind of work your
                money underwrites.
              </>
            }
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GIVING_TIERS.map((tier) => (
              <Card
                key={tier.amount}
                className={
                  tier.featured ? "border-ember/40 ring-1 ring-ember/20" : ""
                }
              >
                <p className="font-display text-3xl font-semibold text-ink">
                  {usd(tier.amount)}
                </p>
                <p className="mt-2 font-semibold text-ember">{tier.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {tier.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href="/donate" tone="ember" size="lg">
              Give today
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <p className="mt-4 text-sm text-ash">
              One-time or monthly · Donor-advised funds, stock and employer
              matching all welcome
            </p>
          </div>
        </Container>
      </Section>

      {/* ======================================================== transparency */}
      <Section tone="bone">
        <Container>
          <Card className="grid gap-10 border-line/80 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Transparency"
                title="Read the filing before you give."
                intro={
                  <>
                    We would rather show you the numbers than describe them. Our
                    Form {FINANCIALS.formType} for the year ending{" "}
                    {FINANCIALS.fiscalYearEnd} is public and independently
                    mirrored.
                  </>
                }
              />
              <ButtonLink href="/impact" tone="ink" className="mt-7">
                Impact &amp; transparency
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <dl className="grid grid-cols-2 gap-6">
              {[
                ["Total revenue", usd(FINANCIALS.totalRevenue)],
                ["Total expenses", usd(FINANCIALS.totalExpenses)],
                ["Net assets", usd(FINANCIALS.netAssets)],
                ["From contributions", "100%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-ash">{label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink">
                    {value}
                  </dd>
                </div>
              ))}
              <p className="col-span-2 text-xs text-ash">
                Fiscal year {FINANCIALS.fiscalYear}, as filed with the IRS on{" "}
                {FINANCIALS.filedOn}.
              </p>
            </dl>
          </Card>
        </Container>
      </Section>

      {/* ================================================================ news */}
      <Section tone="white">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Latest" title="News and updates" />
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-semibold text-ember hover:text-ember-dark"
            >
              All updates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                  {post.category} · {formatDate(post.date)}
                </p>
                <h3 className="mt-2 text-xl text-ink group-hover:text-ember">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ final CTA */}
      <section className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
        <Image
          src="/img/barn-owl-group.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60"
        />
        <Container className="relative z-10 text-center">
          <h2 className="text-3xl text-bone sm:text-4xl lg:text-5xl">
            Six barn owls, ready for release.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">
            That photograph exists because people who will never visit Delhi
            decided to pay for it. You can be one of them.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/donate" tone="ember" size="lg">
              Donate now
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" tone="outlineLight" size="lg">
              Talk to us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
