import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Microscope,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "NWRA Symposium 2025 — Advanced Propatagium Surgery | Wildlife Rescue",
  description:
    "Nadeem Shehzad and Mohammad Saud of Wildlife Rescue presented their refined surgical technique for propatagium repair in raptors at the National Wildlife Rehabilitators Association (NWRA) Symposium, Bellevue, WA (Seattle area), February 2025.",
  openGraph: {
    title: "NWRA Symposium 2025 — Advanced Propatagium Surgery",
    description:
      "Wildlife Rescue's refined surgical technique for raptor wing repair, presented at the 2025 NWRA Symposium in Seattle.",
    images: ["/nwra-2025/stage1-skin-suture.jpg"],
  },
};

const PHOTOS = [
  {
    src: "/nwra-2025/speakers-backdrop.jpg",
    alt: "Nadeem Shehzad and Mohammad Saud of Wildlife Rescue wearing Speaker lanyards in front of the NWRA Annual Symposium backdrop, February 2025",
    caption:
      "Nadeem Shehzad and Mohammad Saud in front of the NWRA Annual Symposium backdrop — both wearing official Speaker lanyards.",
  },
  {
    src: "/nwra-2025/stage1-skin-suture.jpg",
    alt: "Nadeem Shehzad and Mohammad Saud presenting Stage 1 Case I — dorsal and ventral views of a propatagium skin suture — at the NWRA Symposium 2025",
    caption:
      "Stage 1, Case I — skin suture. Dorsal and ventral views of the propatagium repair shown to the audience.",
  },
  {
    src: "/nwra-2025/stage1-tplt-emr-sutured.jpg",
    alt: "Slide showing TPLT and EMR sutured during Stage 1 Case II propatagium repair surgery",
    caption:
      "Stage 1, Case II — TPLT and EMR sutured. Close-up surgical photography demonstrating the layered repair.",
  },
  {
    src: "/nwra-2025/the-fusion-day32.jpg",
    alt: "The Fusion Day 32 Recovery slide showing the healed propatagium — dorsal view with measurement tape",
    caption:
      "Day 32 — the fusion. Dorsal view of the healed propatagium, demonstrating tissue integration and successful recovery.",
  },
  {
    src: "/nwra-2025/thank-you-01.jpg",
    alt: "Mohammad Saud and Nadeem Shehzad at the podium during the Q&A session at NWRA Symposium 2025",
    caption:
      "Taking questions from the audience — international rehabilitators and veterinarians engaging with the technique.",
  },
  {
    src: "/nwra-2025/thank-you-02.jpg",
    alt: "Thank you slide crediting Mohammad Saud, Nadeem Shehzad, Wildlife Rescue Delhi India, and Raptor Rescue and Research Inc., Waynesboro VA",
    caption:
      "Acknowledgements — Wildlife Rescue (Delhi, India) and Raptor Rescue and Research Inc. (Waynesboro, VA), the U.S. fiscal sponsor that made the trip possible.",
  },
  {
    src: "/nwra-2025/networking.jpg",
    alt: "Mohammad Saud and Nadeem Shehzad networking with fellow wildlife rehabilitators at the NWRA Symposium 2025",
    caption:
      "Meeting fellow rehabilitators in the hallway between sessions — sharing knowledge across continents.",
  },
] as const;

const STAGES = [
  {
    label: "Stage 1 — Case I",
    title: "Skin Suture",
    description:
      "The initial layer of the repair: dorsal and ventral skin sutures that close the laceration and begin the healing cascade. The propatagium — the triangular skin membrane along the leading edge of the wing — is thin, richly vascularised, and critical to flight.",
    image: PHOTOS[1],
  },
  {
    label: "Stage 1 — Case II",
    title: "TPLT & EMR Sutured",
    description:
      "Tensor propatagialis longus tendon (TPLT) and the extensor metacarpi radialis (EMR) — the two functional structures that give the propatagium its rigidity during flight — are individually sutured. Getting this layer right is what determines whether the bird flies again.",
    image: PHOTOS[2],
  },
  {
    label: "Day 32 — Recovery",
    title: "The Fusion",
    description:
      "Post-operative follow-up at day 32. Tissue has integrated, the wound has fused cleanly, and the wing is ready to progress into flight-conditioning in a large aviary before eventual release.",
    image: PHOTOS[3],
  },
] as const;

export default function NWRA2025Page() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-900 to-teal-dark py-20 lg:py-28 overflow-hidden">
        {/* Subtle background slide image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/nwra-2025/stage1-skin-suture.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-charcoal/70 to-teal-dark/70" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber/20 border border-amber/40 rounded-full mb-6">
            <Award size={14} className="text-amber" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber">
              International Presentation
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
            Advanced Surgical Repair of the{" "}
            <span className="text-amber">Avian Propatagium</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Nadeem Shehzad and Mohammad Saud of Wildlife Rescue presented their
            refined technique for propatagium repair in raptors at the
            National Wildlife Rehabilitators Association (NWRA) Symposium —
            one of the world&apos;s most respected gatherings of wildlife
            rehabilitators and veterinarians.
          </p>

          {/* Event meta row */}
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl border border-white/15 p-4">
              <Calendar size={18} className="text-amber mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wider text-white/60 font-bold">
                When
              </p>
              <p className="text-sm text-white mt-1 font-semibold">
                February 2025
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl border border-white/15 p-4">
              <MapPin size={18} className="text-amber mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wider text-white/60 font-bold">
                Where
              </p>
              <p className="text-sm text-white mt-1 font-semibold">
                Bellevue, WA (Seattle)
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl border border-white/15 p-4">
              <Users size={18} className="text-amber mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wider text-white/60 font-bold">
                Presented by
              </p>
              <p className="text-sm text-white mt-1 font-semibold">
                Shehzad &amp; Saud
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Story / Context ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why This Matters"
            subtitle="The propatagium is the hardest part of the wing to repair — and also the most commonly injured by manja string."
          />

          <div className="prose prose-lg max-w-none mt-8 space-y-5 text-slate leading-relaxed">
            <p>
              Every year, tens of thousands of Delhi&apos;s raptors — Black
              Kites, Shikras, Barn Owls, eagles — fall from the sky after
              catching their wings in <strong>manja</strong>: the
              glass-coated kite-flying string that slices through skin,
              tendons, and bone with equal ease. The single most frequent
              injury we see is a laceration across the{" "}
              <strong>propatagium</strong>, the triangular membrane along
              the leading edge of the wing that holds the wing rigid during
              flight.
            </p>
            <p>
              Cut the propatagium and you cut both skin <em>and</em> the
              underlying tendons — the{" "}
              <strong>tensor propatagialis longus</strong> and the{" "}
              <strong>extensor metacarpi radialis</strong>. Standard skin
              closure is not enough. Without a precise, layered repair of the
              tendons, the wing heals closed but the bird will never fly
              properly again — and in the wild, a bird that cannot fly is
              already dead.
            </p>
            <p>
              Over 15 years of operating on manja-injured raptors, Wildlife
              Rescue refined a technique that restores both structure and
              function. In February 2025, at the NWRA Symposium near
              Seattle, Nadeem and Saud presented that technique to the
              international rehabilitation community — showing the staged
              repair, the day-32 fusion, and the release outcomes that
              follow.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Surgical Stages ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Technique, in Three Stages"
            subtitle="Stills from the presentation slides — from initial closure to day-32 recovery."
          />

          <div className="mt-12 space-y-12 lg:space-y-16">
            {STAGES.map((stage, i) => (
              <div
                key={stage.label}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl bg-charcoal">
                  <Image
                    src={stage.image.src}
                    alt={stage.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber mb-2">
                    {stage.label}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-slate leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Full Gallery ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Scenes from the Symposium"
            subtitle="At the podium, in the hallway, and on the screen — February 2025."
          />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHOTOS.map((photo) => (
              <figure
                key={photo.src}
                className="group rounded-xl overflow-hidden bg-charcoal/5 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <figcaption className="p-4 text-xs text-slate leading-relaxed bg-white">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About NWRA + R3 credit ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {/* NWRA */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <Microscope size={28} className="text-teal mb-3" />
            <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
              About the NWRA
            </h3>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              The National Wildlife Rehabilitators Association is a U.S.-based
              professional organisation serving wildlife rehabilitators,
              veterinarians, and researchers worldwide. Its annual symposium
              is the leading forum for peer-reviewed rehabilitation
              techniques and research.
            </p>
            <a
              href="https://www.nwrawildlife.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-teal hover:text-teal-dark transition-colors"
            >
              nwrawildlife.org
              <ExternalLink size={14} />
            </a>
          </div>

          {/* R3 sponsor credit */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <Award size={28} className="text-amber mb-3" />
            <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
              Made Possible By R3
            </h3>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              This international presentation was sponsored by{" "}
              <strong>Raptor Rescue and Research Inc.</strong> — Wildlife
              Rescue&apos;s U.S. fiscal sponsor, a 501(c)(3) nonprofit based
              in New York. R3 donors make trips like this one — and the
              knowledge transfer that happens at them — financially
              possible.
            </p>
            <a
              href="https://raptorrescueusa.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-teal hover:text-teal-dark transition-colors"
            >
              raptorrescueusa.org
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Cross-links ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/our-specialty"
              className="group bg-offwhite rounded-xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber">
                Explore
              </p>
              <h4 className="text-lg font-bold text-charcoal mt-1 font-[family-name:var(--font-poppins)]">
                Our Surgical Specialty
              </h4>
              <p className="text-xs text-slate mt-2">
                The full story of how we developed this technique.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm text-teal font-bold group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/treatments"
              className="group bg-offwhite rounded-xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber">
                Explore
              </p>
              <h4 className="text-lg font-bold text-charcoal mt-1 font-[family-name:var(--font-poppins)]">
                Treatments &amp; Equipment
              </h4>
              <p className="text-xs text-slate mt-2">
                Gas anesthesia, ultrasonic bone cutter, laser wound therapy.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm text-teal font-bold group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/conditions/cut-wounds"
              className="group bg-offwhite rounded-xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-md transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber">
                Explore
              </p>
              <h4 className="text-lg font-bold text-charcoal mt-1 font-[family-name:var(--font-poppins)]">
                Manja &amp; Cut Wounds
              </h4>
              <p className="text-xs text-slate mt-2">
                Why glass-coated string is Delhi&apos;s #1 cause of raptor
                injury.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm text-teal font-bold group-hover:gap-2 transition-all">
                Read more <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Us Share More Techniques with the World
          </h2>
          <p className="mt-3 text-white/80">
            Every international presentation is funded by donors. Help us
            keep the knowledge moving.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-light text-charcoal font-bold rounded-full transition-colors shadow-md"
            >
              Donate
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors border border-white/20"
            >
              More Press &amp; Awards
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
