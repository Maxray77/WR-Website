import type { Metadata } from "next";
import { Award, Film, Calendar, Globe, Play, ExternalLink, Trophy } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import {
  AWARDS_WON,
  NOMINATIONS,
  FILM_DETAILS,
  FESTIVAL_SELECTIONS,
} from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.allThatBreathes;

export default function AllThatBreathesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-charcoal py-20 lg:py-28 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video embed */}
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative group">
              <iframe
                src={FILM_DETAILS.trailerUrl}
                title="All That Breathes Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div>
              <span className="text-amber font-semibold text-sm uppercase tracking-wider">
                Oscar-Nominated Documentary
              </span>
              <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)]">
                All That Breathes
              </h1>
              <p className="mt-4 text-white/70 text-lg leading-relaxed">
                The first documentary in history to win both the Sundance Grand
                Jury Prize and the Cannes Golden Eye. This breathtaking film
                follows brothers Nadeem and Saud as they rescue Black Kites
                against the backdrop of a rapidly changing Delhi.
              </p>

              {/* Top Awards */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Sundance Grand Jury Prize",
                  "Cannes Golden Eye",
                  "Oscar Nominated",
                  "Peabody Award",
                  "Gotham Award",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber/20 text-amber rounded-full text-xs font-semibold"
                  >
                    <Trophy size={12} />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Film details */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Film size={14} />
                  Dir: {FILM_DETAILS.director}
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar size={14} />
                  {FILM_DETAILS.runtime}
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Globe size={14} />
                  {FILM_DETAILS.countries}
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Play size={14} />
                  Streaming on Max
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Awards Won ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="26 Awards Won"
            subtitle="The most decorated documentary of 2022."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AWARDS_WON.map((award, i) => (
              <div
                key={`${award.award}-${award.category}`}
                className={`rounded-xl p-5 border ${
                  i < 6
                    ? "bg-amber-bg border-amber/20"
                    : "bg-white border-gray-100"
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      i < 6 ? "bg-amber/20 text-amber" : "bg-teal-light text-teal"
                    }`}
                  >
                    <Award size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-sm">
                      {award.award}
                    </h3>
                    <p className="text-slate text-xs mt-0.5">
                      {award.category}
                    </p>
                    <p className="text-xs text-amber font-semibold mt-1">
                      {award.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Nominations ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="12 Major Nominations"
            subtitle="Including the Academy Award, BAFTA, and DGA."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NOMINATIONS.map((nom) => (
              <div
                key={`${nom.award}-${nom.category}`}
                className="bg-white rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-bold text-charcoal text-sm">
                  {nom.award}
                </h3>
                <p className="text-slate text-xs mt-0.5">{nom.category}</p>
                <p className="text-xs text-slate mt-1">{nom.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Festival Selections ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="18+ Film Festival Selections"
            subtitle="Screened at the world's most prestigious film festivals."
          />

          <div className="flex flex-wrap justify-center gap-3">
            {FESTIVAL_SELECTIONS.map((festival) => (
              <span
                key={festival}
                className="px-4 py-2 bg-offwhite text-charcoal rounded-full text-sm font-medium border border-gray-200 hover:border-teal hover:text-teal transition-colors"
              >
                {festival}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Film Details ─── */}
      <section className="bg-charcoal text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About the Film"
            light
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              ["Director", FILM_DETAILS.director],
              ["Producers", FILM_DETAILS.producers],
              ["Cinematography", FILM_DETAILS.cinematography],
              ["Editor", FILM_DETAILS.editor],
              ["Music", FILM_DETAILS.music],
              ["Production", FILM_DETAILS.production],
              ["Runtime", FILM_DETAILS.runtime],
              ["Countries", FILM_DETAILS.countries],
              ["World Premiere", FILM_DETAILS.premiere],
              ["Streaming", FILM_DETAILS.streaming],
            ].map(([label, value]) => (
              <div key={label} className="py-3 border-b border-white/10">
                <span className="text-white/50 text-sm">{label}</span>
                <p className="text-white font-medium mt-0.5 text-sm">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={FILM_DETAILS.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-amber text-charcoal font-semibold rounded-full hover:bg-amber-light transition-colors"
            >
              <ExternalLink size={16} />
              Official Website
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              <Play size={16} />
              Watch on Max
            </a>
          </div>
        </div>
      </section>

      {/* ─── Screening Request ─── */}
      <section className="py-16 lg:py-20 bg-teal-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Film size={48} className="text-teal mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Host a Screening
          </h2>
          <p className="mt-3 text-slate max-w-lg mx-auto">
            Want to show &quot;All That Breathes&quot; at your university, film
            club, or community event? We can help arrange a screening.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 bg-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-dark transition-colors"
          >
            Request a Screening
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Support the Real Heroes
          </h2>
          <p className="mt-3 text-white/80">
            The documentary told our story. Your donation writes the next
            chapter.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
