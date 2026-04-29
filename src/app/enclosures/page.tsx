import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Bird,
  Baby,
  TreePine,
  Sun,
  ShieldCheck,
  Wind,
  Sparkles,
  Heart,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Bird Enclosures — Aviary Complex & Rehabilitation Housing",
  description:
    "Wildlife Rescue's purpose-built aviary complex in Delhi — recovery cages, flight aviaries, chick nursery, raptor enclosures, and conditioning pens. Where rescued birds rebuild strength and prepare for release back to the wild.",
};

const ENCLOSURE_STATS = [
  { value: "Multi-stage", label: "Aviary Complex" },
  { value: "Species-Specific", label: "Housing Design" },
  { value: "Pre-Release", label: "Flight Conditioning" },
  { value: "Lifelong", label: "Care for Non-Releasable Birds" },
];

const ENCLOSURE_TYPES = [
  {
    title: "Recovery Cages",
    description:
      "Individually ventilated enclosures for post-surgical patients. Padded interiors, controlled lighting, and limited movement protect freshly repaired wings during the first critical weeks of healing.",
    icon: <Home size={28} />,
  },
  {
    title: "Flight Aviaries",
    description:
      "Spacious netted aviaries — the heart of our rehabilitation programme. Birds rebuild flight muscles, coordination, and stamina here over weeks, often months, before being assessed for release.",
    icon: <Bird size={28} />,
  },
  {
    title: "Chick Nursery",
    description:
      "Warm, draft-free housing for orphaned and fallen hatchlings. Specialized feeding stations, gentle-handling protocols, and species-correct diets ensure healthy development from helpless chick to independent juvenile.",
    icon: <Baby size={28} />,
  },
  {
    title: "Species-Specific Raptor Enclosures",
    description:
      "Black Kites, Egyptian Vultures, Barn Owls, Spotted Owlets, Shikras, and others all have different perching, lighting, and shelter needs. Each species houses in conditions tuned to its biology.",
    icon: <TreePine size={28} />,
  },
  {
    title: "Open-Air Conditioning Pens",
    description:
      "Semi-exposed enclosures that gradually re-acclimatise birds to Delhi&apos;s heat, humidity, monsoon, and temperature swings. Critical bridge between protected indoor recovery and the open sky.",
    icon: <Sun size={28} />,
  },
  {
    title: "Permanent Resident Housing",
    description:
      "Birds with permanent disabilities — missing eyes, amputated wings, neurological damage — receive lifelong care in comfortable, enriched enclosures. Many become ambassadors for visitor education.",
    icon: <ShieldCheck size={28} />,
  },
];

const DESIGN_PRINCIPLES = [
  {
    title: "Low-Stress Design",
    description:
      "Visual barriers, quiet zones, and minimal human contact during recovery. Wild raptors are not pets — every enclosure protects their wildness so they can return to it.",
    icon: <Wind size={24} />,
  },
  {
    title: "Hygiene & Disease Control",
    description:
      "Easy-clean surfaces, segregated wards for infectious cases, and routine sanitation protocols. Cross-contamination between recovering and incoming birds is the silent killer in rescue work — we engineer against it.",
    icon: <Sparkles size={24} />,
  },
  {
    title: "Behavioural Enrichment",
    description:
      "Perching at multiple heights, varied substrates, hidden food, line-of-sight to other birds. Boredom and learned helplessness in captivity erode the instincts a bird needs to survive after release.",
    icon: <Heart size={24} />,
  },
];

const AVIARY_GALLERY = [
  {
    src: "/facility/enclosure-01.jpg",
    alt: "Raptors perched on rails inside a recovery enclosure — Black Kites and Egyptian Vultures behind protective mesh at Wildlife Rescue",
    caption: "Recovery Enclosure — Mixed Raptors",
  },
  {
    src: "/facility/enclosure-02.jpg",
    alt: "Large flight aviary filled with dozens of raptors including Black Kites and Egyptian Vultures perched at multiple levels at Wildlife Rescue",
    caption: "Main Flight Aviary — Pre-Release",
  },
  {
    src: "/facility/enclosure-03.jpg",
    alt: "Raptors including Egyptian Vultures and Black Kites perched together in an aviary enclosure viewed through mesh at Wildlife Rescue",
    caption: "Aviary Interior — Species Mix",
  },
];

const REHAB_JOURNEY = [
  {
    step: 1,
    title: "Transfer from the Clinic",
    description:
      "Once medically stable and feeding independently, the bird leaves the ICU and enters the aviary complex. The medical work is done; now the rebuilding begins.",
  },
  {
    step: 2,
    title: "Recovery Cage",
    description:
      "Restricted movement protects healing surgical sites. Daily wound checks, weight monitoring, and gentle physical therapy on stiffened wings.",
  },
  {
    step: 3,
    title: "Small Flight Aviary",
    description:
      "First short flights. Distance is built up day by day. Wing strength, balance, and stamina are tracked closely — setbacks are caught early.",
  },
  {
    step: 4,
    title: "Main Flight Aviary",
    description:
      "Large open space. The bird must demonstrate sustained flight, accurate landings, and full range of motion. Hunting and self-feeding skills are reinforced.",
  },
  {
    step: 5,
    title: "Outdoor Conditioning Pen",
    description:
      "Re-acclimatisation to Delhi's weather extremes. The bird experiences sun, wind, rain, and ambient noise — everything it will face on release day.",
  },
  {
    step: 6,
    title: "Release",
    description:
      "Final flight assessment. The bird is taken to a suitable release site — ideally near where it was originally found — and returned to the wild.",
  },
];

export default function EnclosuresPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Where Rescued Birds Become Wild Again
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Bird Enclosures
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            A purpose-built aviary complex designed for one mission: rebuilding
            the strength, instincts, and wildness a rescued raptor needs to
            survive on release. From padded recovery cages to open flight
            aviaries — every space is engineered for the bird inside it.
          </p>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENCLOSURE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-teal-light rounded-2xl p-6 border border-teal/10"
              >
                <p className="text-2xl lg:text-3xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                  {stat.value}
                </p>
                <p className="text-sm text-slate mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── A Home for Every Stage ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                A Home for Every Stage of Recovery
              </h2>
              <p className="mt-4 text-slate leading-relaxed text-lg">
                Surgery is only the beginning. The real work — and the most
                time-intensive part of rescue — happens after a bird leaves the
                operating theater.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                A Black Kite with a repaired propatagium can take six to eight
                weeks of careful flight conditioning before it&apos;s ready to
                hunt again. An orphaned Spotted Owlet chick may live with us for
                months before it can survive alone. An Egyptian Vulture with
                lead poisoning needs a quiet, dark recovery space, then gradual
                exposure, then space to soar.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                Our aviary complex is engineered for these journeys. Every
                enclosure type was built — and rebuilt — based on what we
                learned the previous year about what works.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <video
                src="/facility/aviaries.mp4"
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enclosure Types ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Six Types of Housing"
            subtitle="Each tuned to a specific phase of recovery — or a specific resident."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENCLOSURE_TYPES.map((enclosure) => (
              <div
                key={enclosure.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal mb-4">
                  {enclosure.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {enclosure.title}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {enclosure.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Inside Our Aviaries Gallery ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Inside Our Aviaries"
            subtitle="Dozens of raptors share these spaces — Black Kites, Egyptian Vultures, owls, and others — at different stages of their journey home."
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {AVIARY_GALLERY.map((img) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="p-3 text-xs text-slate font-medium text-center">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Design Principles ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why These Enclosures Work"
            subtitle="The design principles behind every cage, perch, and aviary in our complex."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {DESIGN_PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 bg-amber-bg rounded-xl flex items-center justify-center text-amber mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {principle.title}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Rehab Journey ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Rehabilitation Journey"
            subtitle="From the moment a bird leaves the clinic to the day it returns to the sky."
          />

          <div className="max-w-3xl mx-auto">
            {REHAB_JOURNEY.map((item, index) => (
              <div key={item.step} className="relative flex gap-6 pb-10">
                {index < REHAB_JOURNEY.length - 1 && (
                  <div className="absolute left-[23px] top-12 w-0.5 h-full bg-teal/20" />
                )}
                <div className="shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-poppins)] z-10">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/clinic"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all"
            >
              See where it starts: Our Clinic <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Sponsor an Enclosure
          </h2>
          <p className="mt-3 text-white/80">
            Building and maintaining specialised housing is one of the most
            expensive parts of running a rescue. Your donation can fund a
            recovery cage, an aviary expansion, or chick-nursery upgrades.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
