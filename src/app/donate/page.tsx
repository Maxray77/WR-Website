import Image from "next/image";
import {
  BadgeCheck,
  Handshake,
  Info,
  Landmark,
  Mail,
  PiggyBank,
  Receipt,
  Scroll,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/ui";
import DonateForm from "@/components/DonateForm";
import { pageMetadata } from "@/lib/metadata";
import {
  ORG,
  ORG_ADDRESS_ONE_LINE,
  OTHER_WAYS_TO_GIVE,
  PARTNER,
} from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Give to Raptor Rescue and Research Inc., a US 501(c)(3) (EIN 87-3289299). One-time or monthly gifts by card, plus donor-advised funds, appreciated stock, employer matching, IRA distributions and bequests.",
  path: "/donate",
  image: "/img/barn-owl-group.jpg",
});

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  "trending-up": TrendingUp,
  handshake: Handshake,
  "piggy-bank": PiggyBank,
  scroll: Scroll,
  mail: Mail,
};

const FAQ = [
  {
    q: "Is my gift tax-deductible?",
    a: `Yes. ${ORG.name} is a 501(c)(3) organization recognised by the IRS, EIN ${ORG.ein}. Contributions are deductible in the United States to the extent permitted by law. No goods or services are provided in exchange for your gift.`,
  },
  {
    q: "Will I get a receipt?",
    a: "Stripe emails an immediate payment confirmation. For gifts of $250 or more the IRS requires a written acknowledgement from us, which we will send to the email address you provide at checkout. If you need one sooner, or for a smaller gift, just ask.",
  },
  {
    q: "Where does the money actually go?",
    a: `Grants currently go to ${PARTNER.name} in ${PARTNER.location}, funding medical consumables, surgical and diagnostic capacity, and the care that carries a bird from admission through to release. As a US charity we retain full discretion and control over the use of our funds.`,
  },
  {
    q: "Can I give in memory or in honour of someone?",
    a: "Yes. Make your gift as normal and then write to us with the name and, if you would like, an address for us to send a card to. We are happy to do this and we do not charge for it.",
  },
  {
    q: "How do I cancel or change a monthly gift?",
    a: "Write to us at any time and we will cancel or adjust it the same day, no questions asked. Your Stripe confirmation email also contains a link to manage the subscription yourself.",
  },
  {
    q: "Can I give from outside the United States?",
    a: "You are very welcome to, and card payments work internationally — but a US charitable deduction is only useful to a US taxpayer. Donors in India may prefer to give to Wildlife Rescue directly, where 80(G) relief applies.",
  },
];

export default async function DonatePage({
  searchParams,
}: PageProps<"/donate">) {
  const params = await searchParams;
  const cancelled = params?.cancelled === "1";

  return (
    <>
      {/* =============================================================== hero */}
      <section className="relative isolate overflow-hidden bg-ink pb-16 pt-28 sm:pt-36">
        <Image
          src="/img/barn-owl-group.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/60"
        />
        <Container size="wide" className="relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4 text-gold">
              {ORG.status} · EIN {ORG.ein}
            </p>
            <h1 className="text-4xl leading-[1.1] text-bone sm:text-5xl">
              Pay for a wing to be rebuilt.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">
              Your gift buys antibiotics, sutures, anaesthetic gas, food and
              aviary time at the largest raptor rescue facility in the world.
              It is deductible in the United States, and it goes out the door
              with almost nothing taken off the top.
            </p>
          </div>
        </Container>
      </section>

      {/* ======================================================= form + case */}
      <Section tone="bone" className="py-16 sm:py-20">
        <Container size="wide">
          {cancelled ? (
            <p
              role="status"
              className="mb-10 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-light px-5 py-4 text-sm text-graphite"
            >
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-ember"
                aria-hidden="true"
              />
              <span>
                Your donation was cancelled and you have not been charged. If
                something went wrong, or you would rather give another way,{" "}
                <a
                  href={`mailto:${ORG.email}`}
                  className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
                >
                  tell us
                </a>{" "}
                and we will sort it out.
              </span>
            </p>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
            {/* --------------------------------------------------- the case */}
            <div>
              <SectionHeading
                eyebrow="Why it matters"
                title="Raptor medicine is the expensive end of wildlife rescue."
              />
              <div className="prose-r3 mt-6 text-lg text-ash">
                <p>
                  A bird of prey cannot be released half-fixed. A songbird with
                  a slight wing deficit may cope in the wild; an eagle that
                  cannot hunt will starve. That means real surgery, real
                  anaesthesia, real imaging, and weeks of flight conditioning in
                  aviaries big enough to prove the repair worked.
                </p>
                <p>
                  Around {PARTNER.manjaShare} of documented injuries at our
                  partner&rsquo;s clinic come from manja — glass-coated kite
                  string that severs the leading edge of a wing. Rebuilding that
                  structure takes skill the clinic spent years developing, and
                  supplies that have to be bought again every single week.
                </p>
                <p className="text-ink">
                  The skill is already there. The money is the part that runs
                  out.
                </p>
              </div>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    Icon: BadgeCheck,
                    title: "Tax-deductible",
                    body: `A US 501(c)(3), EIN ${ORG.ein}.`,
                  },
                  {
                    Icon: Receipt,
                    title: "Low overhead",
                    body: "Unpaid board, no US office, no fundraising staff.",
                  },
                ].map(({ Icon, title, body }) => (
                  <li
                    key={title}
                    className="flex gap-3 rounded-2xl border border-line bg-white p-5"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-ink">{title}</p>
                      <p className="mt-1 text-sm text-ash">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <figure className="mt-10 overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/img/black-kite-recovery.jpg"
                    alt="A bandaged Black Kite on the table beside the gas anaesthesia machine, recovering after wing surgery"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ash">
                  A Black Kite coming round after wing surgery, still bandaged
                  and case-numbered. This is what your money is for.
                </figcaption>
              </figure>
            </div>

            {/* --------------------------------------------------- the form */}
            <div className="lg:sticky lg:top-28 lg:self-start" id="monthly">
              <DonateForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================= other routes */}
      <Section tone="sand" id="other-ways">
        <Container>
          <SectionHeading
            eyebrow="Other ways to give"
            title="Not everything has to go on a card."
            align="center"
            intro={
              <>
                Several of these are more tax-efficient than a card gift, and
                some cost you nothing at all today.
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OTHER_WAYS_TO_GIVE.map((way) => {
              const Icon = ICONS[way.icon] ?? Landmark;
              return (
                <Card key={way.title} className="flex flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-light">
                    <Icon className="h-5 w-5 text-ember" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl text-ink">{way.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">
                    {way.body}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-ink/10 bg-white p-7 sm:p-9">
            <h3 className="font-display text-xl text-ink">
              Details your broker, employer or DAF sponsor will ask for
            </h3>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["Legal name", ORG.name],
                ["Tax ID (EIN)", ORG.ein],
                ["Tax status", ORG.status],
                ["Mailing address", ORG_ADDRESS_ONE_LINE],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ash">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ash">
              For stock transfers, bequest language or anything unusual, write
              to{" "}
              <a
                href={`mailto:${ORG.email}`}
                className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
              >
                {ORG.email}
              </a>{" "}
              and a director will reply personally.
            </p>
          </div>
        </Container>
      </Section>

      {/* ================================================================ FAQ */}
      <Section tone="bone">
        <Container size="narrow">
          <SectionHeading eyebrow="Questions" title="Before you give" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink marker:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-normal text-ember transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ash">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
