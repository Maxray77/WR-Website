import Image from "next/image";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import {
  ButtonLink,
  Container,
  PullQuote,
  Section,
  SectionHeading,
} from "@/components/ui";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { FILM, PARTNER } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "All That Breathes",
  description:
    "Shaunak Sen's All That Breathes — Academy Award nominee, Sundance Grand Jury Prize, Cannes Golden Eye, Peabody winner — follows the two brothers whose Delhi clinic we fund.",
  path: "/all-that-breathes",
  image: "/img/atb-poster.jpg",
});

export default function AllThatBreathesPage() {
  return (
    <>
      <PageHero
        eyebrow="The documentary"
        title={FILM.title}
        intro={
          <>
            Directed by {FILM.director}. Academy Award nominee for Best
            Documentary Feature, {FILM.awards[0].year}. Winner of the Grand Jury
            Prize at Sundance and the Golden Eye at Cannes. More than{" "}
            {FILM.awardCount} international awards.
          </>
        }
        image="/img/hero-barn-owl.jpg"
        imageAlt=""
      />

      {/* ============================================================= trailer */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-xl ring-1 ring-line lg:mx-0">
              <Image
                src="/img/atb-poster.jpg"
                alt={`Poster for ${FILM.title}`}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${FILM.trailerId}`}
                  title={`${FILM.title} — official trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <p className="mt-4 text-sm text-ash">
                Official trailer. The film premiered on HBO on{" "}
                {FILM.hboPremiere} and is distributed by {FILM.distributors}.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ synopsis */}
      <Section tone="sand">
        <Container size="narrow">
          <SectionHeading eyebrow="The film" title="What it is about" />
          <div className="prose-r3 mt-6 text-lg text-ash">
            <p>{FILM.synopsis}</p>
            <p>
              Sen shot it over years, and the result is not a campaign film. It
              spends as much time on a puddle, a rat, a mosquito or a plane
              overhead as it does on the brothers, and it declines to tell you
              what to feel. What accumulates instead is an argument: that the
              line people draw between themselves and the rest of what breathes
              is arbitrary, and that some people simply refuse to draw it.
            </p>
          </div>

          <div className="mt-12">
            <PullQuote
              quote="One shouldn't differentiate between all that breathes."
              attribution={`From the film`}
            />
          </div>
        </Container>
      </Section>

      {/* ============================================================== awards */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            eyebrow="Recognition"
            title="Selected honours"
            tone="light"
            intro={
              <>
                The film collected more than {FILM.awardCount} international
                awards and festival prizes across 2022 and 2023.
              </>
            }
          />
          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {FILM.awards.map((award) => (
              <li
                key={`${award.name}-${award.year}`}
                className="border-t border-bone/15 pt-5"
              >
                <Award className="h-5 w-5 text-gold" aria-hidden="true" />
                <p className="mt-3 font-display text-xl text-bone">
                  {award.name}
                </p>
                <p className="mt-1 text-sm text-bone/65">{award.detail}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold/80">
                  {award.year}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ======================================================== after credits */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/img/founders.jpg"
                alt="Nadeem Shehzad and Mohammad Saud"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="After the credits"
                title="The clinic did not end when the film did."
              />
              <div className="prose-r3 mt-6 text-lg text-ash">
                <p>
                  {PARTNER.founders} went back to work. Birds arrived the
                  morning after the Academy Awards in the same numbers as the
                  morning before, and the cost of treating them did not fall
                  because the story had been told well.
                </p>
                <p>
                  Wildlife Rescue has since passed forty thousand cases. The
                  brothers have presented their surgical technique to the
                  National Wildlife Rehabilitators Association in the United
                  States. The work has grown; so has the bill.
                </p>
                <p className="text-ink">
                  Raptor Rescue and Research Inc. exists so that the people the
                  film reached have a lawful, tax-deductible, low-overhead way
                  to keep it going.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/donate" tone="ember" size="lg">
                  Support the clinic
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/wildlife-rescue" tone="outline" size="lg">
                  See their work
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================== watch */}
      <Section tone="sand" className="py-16">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl text-ink sm:text-3xl">Where to watch</h2>
          <p className="mt-4 leading-relaxed text-ash">
            Availability changes by region and over time. The film is
            distributed by {FILM.distributors}; a current, country-by-country
            list of streaming, rental and purchase options is maintained by
            JustWatch.
          </p>
          <a
            href="https://www.justwatch.com/us/movie/all-that-breathes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            Find where to watch
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Container>
      </Section>
    </>
  );
}
