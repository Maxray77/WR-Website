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

  // Featured cards = raptors only (Wildlife Rescue is a raptor specialist).
  // All other species — egrets, crows, hornbills, kingfishers, pigeons,
  // ibises, etc. — are kept in the full appendix list below for transparency
  // but don't appear in the prominent plate cards.
  const RAPTORS = new Set([
    // Kites
    "Black Kite", "Black Eared Kite", "Black-Winged Kite",
    // Hawks / sparrowhawks
    "Shikra", "Besra",
    // Eagles
    "Crested Serpent Eagle", "Short-Toed Snake Eagle", "Booted Eagle",
    "Steppe Eagle", "Tawny Eagle", "Eastern Imperial Eagle",
    // Buzzards
    "Oriental Honey Buzzard", "Common Buzzard", "White Eyed Buzzard",
    "Long Legged Buzzard",
    // Vultures
    "Egyptian Vulture", "White-Rumped Vulture", "Indian Vulture",
    "Slender-Billed Vulture", "Red-Headed Vulture", "Cinereous Vulture",
    "Eurasian Griffon", "Himalayan Griffon", "Himalayan Vulture",
    "Bearded Vulture",
    // Falcons
    "Peregrine Falcon", "Common Kestrel", "Eurasian Hobby",
    "Laggar Falcon", "Shaheen Falcon",
    // Harriers
    "Eurasian Marsh Harrier", "Marsh Harrier", "Pied Harrier",
    // Owls (incl. owlets — same order Strigiformes)
    "Barn Owl", "Spotted Owlet", "Indian Scops Owl", "Pallid Scops Owl",
    "Oriental Scops Owl", "Rock Eagle Owl", "Brown Fish Owl",
    "Brown Hawk Owl", "Jungle Owlet", "Long Eared Owl",
  ]);
  const featured = SPECIES_BREAKDOWN
    .filter((s) => RAPTORS.has(s.name))
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
          As a raptor rescue, our core focus is the birds of prey ruling
          Delhi&apos;s skies — Black Kites, owls, eagles, vultures, and falcons.
          Black Kites alone account for{" "}
          <strong className="text-teal-dark">
            {blackKitePct}% of all rescues
          </strong>
          . While we also care for the wider community of wild birds —
          egrets, hornbills, crows, kingfishers — these are the species at the
          heart of our work.
        </p>

        {/* ─── Featured Raptors Grid ─── */}
        <h3 className="text-xl font-bold text-charcoal text-center mb-2 font-[family-name:var(--font-poppins)]">
          Featured Raptors
        </h3>
        <p className="text-center text-sm text-slate max-w-2xl mx-auto mb-8">
          Our top-10 birds of prey by intake. Non-raptor species are listed in
          the full appendix below.
        </p>
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
