import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Syringe,
  Zap,
  HeartPulse,
  ScanSearch,
  Bird,
  ChevronRight,
  Play,
  CheckCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/lib/treatments-data";

export const metadata: Metadata = {
  title: "Treatments in Our Facility | Wildlife Rescue",
  description:
    "Explore the advanced veterinary treatments used at Wildlife Rescue — from gas anesthesia and laser wound management to post-operative rehabilitation. Photos and videos from inside the clinic.",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Anesthesia & Surgery": <Syringe size={22} />,
  "Wound Management": <Zap size={22} />,
  "Post-Treatment Care": <HeartPulse size={22} />,
  Diagnostics: <ScanSearch size={22} />,
  Rehabilitation: <Bird size={22} />,
};

const FACILITY_HIGHLIGHTS = [
  { label: "Treatments Daily", value: "30+" },
  { label: "Surgical Procedures/Year", value: "1,500+" },
  { label: "Birds Treated Since 2010", value: "39,000+" },
  { label: "Operating Since", value: "2003" },
];

export default function TreatmentsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-teal-dark via-teal to-teal-dark py-20 lg:py-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber/20 text-amber-light text-sm font-semibold rounded-full mb-6">
            Inside the Clinic
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
            Treatments in Our Facility
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            From emergency surgery to gentle rehabilitation — an inside look at
            the advanced veterinary care that gives Delhi&apos;s injured birds a
            second chance at the sky.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {FACILITY_HIGHLIGHTS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-2xl sm:text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                  {stat.value}
                </div>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Category Quick Nav ─── */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {TREATMENT_CATEGORIES.map((cat) => {
              const hasTreatments = TREATMENTS.some(
                (t) => t.category === cat
              );
              if (!hasTreatments) return null;
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-teal text-sm font-medium whitespace-nowrap hover:bg-teal hover:text-white transition-colors"
                >
                  {CATEGORY_ICONS[cat]}
                  {cat}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Treatment Sections ─── */}
      {TREATMENT_CATEGORIES.map((category) => {
        const categoryTreatments = TREATMENTS.filter(
          (t) => t.category === category
        );
        if (categoryTreatments.length === 0) return null;

        return (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
            className="py-16 lg:py-24 even:bg-offwhite"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center text-teal">
                  {CATEGORY_ICONS[category]}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {category}
                </h2>
              </div>

              {/* Treatment cards */}
              <div className="space-y-16">
                {categoryTreatments.map((treatment, idx) => (
                  <article
                    key={treatment.slug}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Media section */}
                    <div
                      className={`grid lg:grid-cols-2 gap-0 ${
                        idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Media gallery */}
                      <div className="bg-gray-50">
                        {treatment.media.length === 1 ? (
                          <div className="relative">
                            {treatment.media[0].type === "image" ? (
                              <div className="aspect-video relative">
                                <Image
                                  src={treatment.media[0].src}
                                  alt={treatment.media[0].alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                              </div>
                            ) : (
                              <div className="aspect-video relative">
                                <video
                                  src={treatment.media[0].src}
                                  muted
                                  autoPlay
                                  loop
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Play size={12} fill="white" /> Video
                                </div>
                              </div>
                            )}
                            {treatment.media[0].caption && (
                              <p className="px-4 py-3 text-sm text-slate italic border-t border-gray-100">
                                {treatment.media[0].caption}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2">
                            {treatment.media.map((m) => (
                              <div key={m.src} className="relative">
                                {m.type === "image" ? (
                                  <div className="aspect-video relative">
                                    <Image
                                      src={m.src}
                                      alt={m.alt}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 640px) 100vw, 25vw"
                                    />
                                  </div>
                                ) : (
                                  <div className="aspect-video relative">
                                    <video
                                      src={m.src}
                                      muted
                                      autoPlay
                                      loop
                                      playsInline
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                      <Play size={12} fill="white" /> Video
                                    </div>
                                  </div>
                                )}
                                {m.caption && (
                                  <p className="px-3 py-2 text-xs text-slate italic border-t border-gray-100">
                                    {m.caption}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Text content */}
                      <div className="p-6 lg:p-8 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                          {treatment.title}
                        </h3>
                        <p className="mt-4 text-slate leading-relaxed">
                          {treatment.description}
                        </p>

                        {/* Detail bullets */}
                        <ul className="mt-6 space-y-3">
                          {treatment.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-3 text-sm text-slate"
                            >
                              <CheckCircle
                                size={16}
                                className="text-teal mt-0.5 shrink-0"
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── More Treatments Coming Soon ─── */}
      <section className="py-16 lg:py-20 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="More Treatments & Procedures"
            subtitle="We're documenting more of our treatment protocols with photos and videos. Check back for updates on diagnostics, fracture repair, physiotherapy, and flight reconditioning."
          />
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/our-specialty"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-teal font-medium hover:border-teal hover:shadow-md transition-all"
            >
              Our Specialty <ChevronRight size={16} />
            </Link>
            <Link
              href="/clinic"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-teal font-medium hover:border-teal hover:shadow-md transition-all"
            >
              Our Clinic <ChevronRight size={16} />
            </Link>
            <Link
              href="/enclosures"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-teal font-medium hover:border-teal hover:shadow-md transition-all"
            >
              Bird Enclosures <ChevronRight size={16} />
            </Link>
            <Link
              href="/conditions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-teal font-medium hover:border-teal hover:shadow-md transition-all"
            >
              Conditions We Treat <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Fund Life-Saving Treatments
          </h2>
          <p className="mt-3 text-white/80">
            Every donation directly funds the medicines, equipment, and surgical
            supplies that give injured birds a second chance.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
