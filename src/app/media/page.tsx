import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, Tv, Mic, Award, Download, ExternalLink, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Media & Press",
  description:
    "Wildlife Rescue in the press — Oscar-nominated documentary, international media coverage, conference presentations, and press resources.",
};

const AWARDS = [
  {
    year: "2022",
    title: "Academy Award Nomination — Best Documentary Feature",
    event: "95th Academy Awards",
    detail: "\"All That Breathes\" directed by Shaunak Sen, featuring Wildlife Rescue's work.",
  },
  {
    year: "2022",
    title: "Grand Jury Prize — World Cinema Documentary",
    event: "Sundance Film Festival",
    detail: "The film premiered at Sundance and won the top documentary prize.",
  },
  {
    year: "2022",
    title: "Golden Eye Award — Best Documentary",
    event: "Cannes Film Festival",
    detail: "Recognized at Cannes as one of the year's most powerful documentaries.",
  },
  {
    year: "2025",
    title: "NWRA Symposium Presentation — Refined Surgical Technique",
    event: "National Wildlife Rehabilitators Association, Seattle",
    detail: "Presented updated novel wing repair technique to international audience of rehabilitators and veterinarians.",
  },
  {
    year: "2018",
    title: "NWRA Symposium Presentation — Novel Wing Repair Surgery",
    event: "National Wildlife Rehabilitators Association, Los Angeles",
    detail: "First international presentation of Wildlife Rescue's self-developed surgical technique for manja-injured raptors.",
  },
];

const PRESS_COVERAGE = [
  {
    outlet: "HBO",
    title: "All That Breathes — Full Documentary",
    type: "Documentary",
    year: "2022",
    description: "Feature-length Oscar-nominated documentary streaming on HBO Max.",
  },
  {
    outlet: "The New York Times",
    title: "Coverage of 'All That Breathes' Oscar Nomination",
    type: "Article",
    year: "2023",
    description: "Feature coverage of the documentary's historic Oscar nomination for India.",
  },
  {
    outlet: "BBC World Service",
    title: "The Delhi Brothers Saving Birds of Prey",
    type: "Radio/Podcast",
    year: "2022",
    description: "BBC profile of Nadeem and Saud's decades-long mission to rescue raptors.",
  },
  {
    outlet: "DW (Deutsche Welle)",
    title: "'All That Breathes' Vies for Best Documentary at Oscars",
    type: "Video",
    year: "2023",
    description: "German international broadcaster covers Wildlife Rescue's work in polluted Delhi.",
  },
  {
    outlet: "ThePrint",
    title: "How Delhi Brothers Rescue Carnivorous Birds",
    type: "Video",
    year: "2021",
    description: "Field report following Wildlife Rescue on daily rounds collecting injured raptors.",
  },
  {
    outlet: "The Guardian",
    title: "Profile: The Bird Doctors of Delhi",
    type: "Article",
    year: "2022",
    description: "Feature on the brothers' self-taught veterinary skills and growing rescue operation.",
  },
  {
    outlet: "NewsClick",
    title: "NC Hangout Ft. Wildlife Rescue Team",
    type: "Interview",
    year: "2021",
    description: "Extended conversation about mission, challenges, and vision for the future.",
  },
  {
    outlet: "National Geographic India",
    title: "Urban Raptors: Delhi's Black Kites",
    type: "Article",
    year: "2023",
    description: "Feature on the intersection of urbanization and raptor conservation in Delhi.",
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Documentary: <Tv size={16} />,
  Article: <Newspaper size={16} />,
  Video: <Tv size={16} />,
  "Radio/Podcast": <Mic size={16} />,
  Interview: <Mic size={16} />,
};

const TYPE_COLORS: Record<string, string> = {
  Documentary: "bg-purple-50 text-purple-600",
  Article: "bg-blue-50 text-blue-600",
  Video: "bg-amber-bg text-amber",
  "Radio/Podcast": "bg-teal-light text-teal",
  Interview: "bg-green-50 text-success",
};

export default function MediaPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-charcoal to-gray-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Oscar-Nominated &bull; Internationally Featured
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Media & Press
          </h1>
          <p className="mt-4 text-xl text-white/70 max-w-2xl mx-auto">
            From a home rescue operation to an Academy Award nomination — our
            story in the world&apos;s press.
          </p>
        </div>
      </section>

      {/* ─── Awards & Recognition ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Awards & Recognition"
            subtitle="Milestones that brought global attention to raptor conservation in Delhi."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber/30 hidden sm:block" />

            <div className="space-y-6">
              {AWARDS.map((award, i) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  {/* Year dot */}
                  <div className="shrink-0 relative">
                    <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center text-charcoal font-bold text-xs font-[family-name:var(--font-poppins)] z-10 relative">
                      {award.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 flex-1 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Award size={20} className="text-amber shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                          {award.title}
                        </h3>
                        <p className="text-sm text-teal font-semibold mt-0.5">
                          {award.event}
                        </p>
                        <p className="text-sm text-slate mt-1">
                          {award.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Press Coverage ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Press Coverage"
            subtitle="Selected features from international media outlets."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRESS_COVERAGE.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      TYPE_COLORS[item.type] || "bg-gray-100 text-slate"
                    }`}
                  >
                    {TYPE_ICONS[item.type]}
                    {item.type}
                  </span>
                  <span className="text-xs text-slate">{item.year}</span>
                </div>

                <p className="text-xs text-teal font-bold uppercase tracking-wider">
                  {item.outlet}
                </p>
                <h3 className="text-sm font-bold text-charcoal mt-1 leading-snug font-[family-name:var(--font-poppins)]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate mt-2 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Press Kit ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-light to-teal/5 rounded-2xl p-8 lg:p-12 border border-teal/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Download size={32} className="text-teal mb-3" />
                <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Press Kit
                </h2>
                <p className="mt-3 text-slate text-sm leading-relaxed">
                  For media inquiries, interview requests, or hi-res photos,
                  contact us directly. We&apos;re happy to provide logos, team
                  photos, rescue footage, and background materials.
                </p>
                <a
                  href="mailto:nadeem@raptorrescue.org?subject=Press%20Inquiry"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
                >
                  nadeem@raptorrescue.org <ExternalLink size={14} />
                </a>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Hi-Res Photos
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    Rescue operations, team portraits, species close-ups
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Logo & Branding
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    SVG and PNG formats, usage guidelines
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-charcoal">
                    Fact Sheet
                  </p>
                  <p className="text-xs text-slate mt-0.5">
                    Key stats, timeline, and organization background
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-12 lg:py-16 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Watch the Documentary
          </h2>
          <p className="mt-2 text-white/60 text-sm">
            See how it all started — the Oscar-nominated film that brought our
            story to the world.
          </p>
          <Link
            href="/all-that-breathes"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-amber text-charcoal font-bold rounded-full hover:bg-amber-light transition-colors text-sm"
          >
            All That Breathes <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
