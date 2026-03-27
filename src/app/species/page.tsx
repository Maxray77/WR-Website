import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { SPECIES_LIST } from "@/lib/species-data";

export const metadata: Metadata = {
  title: "Species We Treat",
  description:
    "Wildlife Rescue treats 106+ species including endangered Egyptian Vulture. Learn about the birds we rescue — their habitat, behavior, and the threats they face in Delhi.",
};

export default function SpeciesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Species We Treat
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            106+ species and counting. From Delhi&apos;s iconic Black Kite to the
            endangered Egyptian Vulture — every bird matters.
          </p>
        </div>
      </section>

      {/* ─── Species Grid ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SPECIES_LIST.map((species) => (
              <Link
                key={species.slug}
                href={`/species/${species.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                {/* Image placeholder */}
                <div className="aspect-square bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center relative">
                  <span className="text-5xl font-bold text-teal/10 font-[family-name:var(--font-poppins)]">
                    {species.name.charAt(0)}
                  </span>

                  {/* Conservation status badge */}
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      species.conservationStatus === "Endangered"
                        ? "bg-danger/10 text-danger"
                        : "bg-green-50 text-success"
                    }`}
                  >
                    {species.conservationStatus}
                  </span>

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-0.5 bg-charcoal/70 text-white rounded-full">
                    {species.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                    {species.name}
                  </h3>
                  <p className="text-sm text-slate italic mt-0.5">
                    {species.scientificName}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                        {species.percentage}
                      </span>
                      <span className="text-xs text-slate ml-1">of intake</span>
                    </div>
                    <span className="text-xs text-slate">
                      {species.annualCases}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center text-teal text-sm font-semibold group-hover:gap-2 transition-all">
                    View Profile <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── More Species Note ─── */}
      <section className="bg-offwhite py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            And 98+ More Species
          </h2>
          <p className="mt-3 text-slate">
            We also treat Red Naped Ibis, Red Wattled Lapwing, Rose Ringed
            Parakeet, White Breasted Kingfisher, Pond Heron, Asian Koel, Common
            Myna, Yellow Footed Green Pigeon, Painted Stork, Peafowl, Brown Fish
            Owl, Steppe Eagle, and many others. Detailed profiles coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
