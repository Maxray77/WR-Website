"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import IucnBadge from "./IucnBadge";
import PlatePlaceholder from "./PlatePlaceholder";
import { SPECIES_BREAKDOWN, INTAKE_TOTAL, type SpeciesRow } from "@/lib/intake-data";

// Endangered = CR / EN / VU / NT. LC + null get no badge per project rules.
function isEndangered(iucn: SpeciesRow["iucn"]): boolean {
  return iucn === "CR" || iucn === "EN" || iucn === "VU" || iucn === "NT";
}

function pct(cases: number): string {
  return ((cases / INTAKE_TOTAL) * 100).toFixed(cases / INTAKE_TOTAL < 0.005 ? 2 : 1);
}

export default function IntakeSpeciesSection() {
  const [expanded, setExpanded] = useState(false);

  // Non-target species excluded from the featured top-10 cards (Wildlife
  // Rescue's focus is raptors + scheduled species; pigeons are kept in the
  // full appendix list further down for transparency).
  const FEATURED_EXCLUSIONS = new Set(["Pigeon", "Blue Rock Pigeon"]);
  const featured = SPECIES_BREAKDOWN
    .filter((s) => !FEATURED_EXCLUSIONS.has(s.name))
    .slice(0, 10);
  const featuredNames = new Set(featured.map((s) => s.name));
  // Appendix = everything NOT in the featured cards (still in rank order).
  const rest = SPECIES_BREAKDOWN.filter((s) => !featuredNames.has(s.name));
  const endangeredOnly = SPECIES_BREAKDOWN.filter((s) => isEndangered(s.iucn));

  const blackKite = SPECIES_BREAKDOWN[0]; // by case count, will be Black Kite
  const blackKitePct = pct(blackKite.cases);

  return (
    <section className="bg-offwhite py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Who We Rescue"
          subtitle={`From iconic raptors to common urban birds — ${SPECIES_BREAKDOWN.length} distinct species across 17 years.`}
        />

        {/* Lead paragraph */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-12">
          As a raptor rescue, Black Kites — the iconic birds of prey ruling
          Delhi&apos;s skies — dominate our intake at{" "}
          <strong className="text-teal-dark">
            {blackKitePct}% of all rescues
          </strong>
          . Beyond that, our records span Critically Endangered vultures, owls,
          eagles, hornbills, and the wider community of wild birds we treat.
        </p>

        {/* ─── Featured Species Grid (raptors + scheduled species; pigeons appendixed) ─── */}
        <h3 className="text-xl font-bold text-charcoal text-center mb-8 font-[family-name:var(--font-poppins)]">
          Featured Species
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-5">
          {featured.map((s, idx) => (
            <SpeciesCard key={s.name} species={s} rank={idx + 1} />
          ))}
        </div>

        {/* ─── Endangered Highlights ─── */}
        {endangeredOnly.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-charcoal text-center mb-2 font-[family-name:var(--font-poppins)]">
              Endangered & Threatened Species
            </h3>
            <p className="text-center text-sm text-slate max-w-2xl mx-auto mb-8">
              These IUCN-listed species form a small but vital portion of our
              intake. Every individual matters for global conservation efforts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {endangeredOnly.map((s) => (
                <EndangeredCard key={s.name} species={s} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Full Species List (collapsible) ─── */}
        <div className="mt-16">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="w-full flex items-center justify-center gap-2 bg-offwhite hover:bg-teal-light text-charcoal py-4 px-6 rounded-lg border border-gray-200 hover:border-teal transition-colors font-semibold text-sm group"
          >
            <span>
              {expanded ? "Hide" : "View"} all {SPECIES_BREAKDOWN.length} species
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform ${expanded ? "rotate-180" : ""} text-teal group-hover:text-teal-dark`}
            />
          </button>

          {expanded && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              <p className="text-xs text-slate mb-4 italic">
                Complete species list — ordered by case count. Includes occasional
                non-bird records (squirrels, snakes, kittens) handled by our
                rescue team.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                {rest.map((s) => (
                  <div
                    key={s.name}
                    className="flex justify-between items-baseline gap-2 border-b border-gray-100 py-1.5"
                  >
                    <span className="text-charcoal flex items-center gap-1.5 truncate">
                      {s.name}
                      <IucnBadge status={s.iucn} />
                    </span>
                    <span className="text-slate font-mono text-xs shrink-0">
                      {s.cases.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SpeciesCard({ species, rank }: { species: SpeciesRow; rank: number }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-teal/40 hover:shadow-md transition-all">
      <div className="relative">
        <PlatePlaceholder name={species.name} />
        <span className="absolute top-2 left-2 bg-teal-dark text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
          #{rank}
        </span>
        <span className="absolute top-2 right-2">
          <IucnBadge status={species.iucn} />
        </span>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-charcoal leading-tight font-[family-name:var(--font-poppins)] min-h-[2.5rem]">
          {species.name}
        </h4>
        <p className="text-2xl font-bold text-teal-dark mt-1 font-mono">
          {species.cases.toLocaleString()}
        </p>
        <p className="text-[10px] uppercase tracking-wide text-slate">
          {pct(species.cases)}% of intake
        </p>
      </div>
    </div>
  );
}

function EndangeredCard({ species }: { species: SpeciesRow }) {
  return (
    <div className="bg-white rounded-xl border-2 border-amber/40 p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
      <div className="w-20 shrink-0">
        <PlatePlaceholder name={species.name} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-bold text-charcoal text-sm font-[family-name:var(--font-poppins)]">
            {species.name}
          </h4>
          <IucnBadge status={species.iucn} size="md" />
        </div>
        <p className="text-lg font-bold text-teal-dark mt-1 font-mono">
          {species.cases.toLocaleString()}
          <span className="text-xs font-normal text-slate ml-1">cases</span>
        </p>
      </div>
    </div>
  );
}
