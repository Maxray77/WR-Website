import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Utensils, Ruler, Brain, AlertTriangle, Lightbulb } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { SPECIES_LIST, getSpeciesBySlug } from "@/lib/species-data";

export function generateStaticParams() {
  return SPECIES_LIST.map((species) => ({ slug: species.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) return { title: "Species Not Found" };
  return {
    title: `${species.name} (${species.scientificName})`,
    description: species.description,
  };
}

export default async function SpeciesProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) notFound();

  const INFO_SECTIONS = [
    { icon: <MapPin size={20} />, title: "Habitat", content: species.habitat },
    { icon: <MapPin size={20} />, title: "Range", content: species.range },
    { icon: <Utensils size={20} />, title: "Diet", content: species.diet },
    { icon: <Ruler size={20} />, title: "Size", content: species.size },
    { icon: <Brain size={20} />, title: "Behavior", content: species.behavior },
    { icon: <AlertTriangle size={20} />, title: "Threats in Delhi", content: species.threatsInDelhi },
  ];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/species"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft size={16} /> All Species
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            {species.image ? (
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <Image
                  src={species.image}
                  alt={`${species.name} (${species.scientificName})`}
                  fill
                  className="object-cover"
                  style={species.imagePosition ? { objectPosition: species.imagePosition } : undefined}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl font-bold text-white/10 font-[family-name:var(--font-poppins)]">
                    {species.name.charAt(0)}
                  </span>
                  <p className="text-white/40 text-sm mt-2">Photo Placeholder</p>
                </div>
              </div>
            )}

            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    species.conservationStatus === "Endangered"
                      ? "bg-danger/20 text-red-200"
                      : species.conservationStatus === "Mixed"
                      ? "bg-white/20 text-white/80"
                      : "bg-green-500/20 text-green-200"
                  }`}
                >
                  {species.conservationStatus}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-white/10 text-white/80 rounded-full">
                  {species.category}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-poppins)]">
                {species.name}
              </h1>
              <p className="text-xl text-white/60 italic mt-1">
                {species.scientificName}
              </p>

              <p className="mt-6 text-white/80 leading-relaxed">
                {species.description}
              </p>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                    {species.percentage}
                  </div>
                  <p className="text-white/60 text-sm mt-1">of total intake</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                    {species.annualCases}
                  </div>
                  <p className="text-white/60 text-sm mt-1">treated annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Info Sections ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {INFO_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm text-slate leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery (if multiple images) ─── */}
      {species.images && species.images.length > 1 && (
        <section className="bg-offwhite py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)] text-center mb-8">
              {species.name} Gallery
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {species.images.map((img) => (
                <div
                  key={img.src}
                  className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <p className="p-3 text-sm text-slate italic bg-white">
                    {img.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Videos ─── */}
      {(() => {
        const allVideos = species.videos ?? (species.video ? [species.video] : []);
        if (allVideos.length === 0) return null;
        return (
          <section className="bg-offwhite py-16 lg:py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)] text-center mb-8">
                {species.name} in Action
              </h2>
              <div className={`grid gap-6 ${allVideos.length > 1 ? "sm:grid-cols-2" : "max-w-4xl mx-auto"}`}>
                {allVideos.map((v) => (
                  <div key={v.src} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <video
                      src={v.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full"
                    />
                    <p className="p-4 text-sm text-slate italic bg-white">
                      {v.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ─── Fun Fact ─── */}
      <section className="bg-amber-bg py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Lightbulb size={32} className="text-amber mx-auto mb-3" />
          <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Did You Know?
          </h2>
          <p className="mt-3 text-slate leading-relaxed">{species.funFact}</p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Protect {species.name}s
          </h2>
          <p className="mt-3 text-white/80">
            Your donation directly funds the rescue and rehabilitation of{" "}
            {species.name}s and other birds in Delhi.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
