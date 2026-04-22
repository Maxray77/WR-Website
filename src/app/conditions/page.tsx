import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Scissors,
  Bone,
  Baby,
  Bug,
  Thermometer,
  Stethoscope,
  Flame,
  Heart,
  Camera,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";
import { CONDITIONS_LIST } from "@/lib/conditions-data";

export const metadata: Metadata = {
  title: "Conditions We Treat — Medical Cases at Wildlife Rescue",
  description:
    "From manja string lacerations to fractures, orphans, avian pox, and septicemia — learn about the medical conditions Wildlife Rescue treats in 3,500+ birds each year.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Scissors: <Scissors size={28} />,
  Bone: <Bone size={28} />,
  Baby: <Baby size={28} />,
  Bug: <Bug size={28} />,
  Thermometer: <Thermometer size={28} />,
  Flame: <Flame size={28} />,
  Stethoscope: <Stethoscope size={28} />,
};

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "bg-danger/10 text-danger",
  Serious: "bg-amber-bg text-amber",
  Moderate: "bg-teal-light text-teal",
  Variable: "bg-gray-100 text-slate",
};

/*
  Photo placeholders for each condition.
  Replace these with real photos when available:
  - /conditions/cut-wounds-1.jpg, cut-wounds-2.jpg
  - /conditions/fractures-1.jpg, fractures-2.jpg
  - /conditions/orphans-1.jpg, orphans-2.jpg
  - /conditions/avian-pox-1.jpg, avian-pox-2.jpg
  - /conditions/septicemia-1.jpg, septicemia-2.jpg
  - /conditions/other-1.jpg, other-2.jpg
*/
const CONDITION_IMAGES: Record<
  string,
  { label1: string; label2: string; gradient: string }
> = {
  "cut-wounds": {
    label1: "Manja string laceration on wing",
    label2: "Post-surgery wound repair",
    gradient: "from-red-100 to-red-50",
  },
  fractures: {
    label1: "X-ray of wing fracture",
    label2: "Surgical pin placement",
    gradient: "from-blue-100 to-blue-50",
  },
  orphans: {
    label1: "Orphaned Black Kite chick",
    label2: "Hand-feeding juvenile raptor",
    gradient: "from-amber-100 to-amber-50",
  },
  "avian-pox": {
    label1: "Pox lesions on pigeon",
    label2: "Recovery after treatment",
    gradient: "from-purple-100 to-purple-50",
  },
  septicemia: {
    label1: "Infected wound before treatment",
    label2: "Clean wound after debridement",
    gradient: "from-rose-100 to-rose-50",
  },
  "other-conditions": {
    label1: "Electrocution burn on feet",
    label2: "Poisoning treatment in progress",
    gradient: "from-slate-100 to-slate-50",
  },
};

export default function ConditionsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Conditions We Treat
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            3,500+ birds every year. From manja lacerations to fractures,
            orphans, and infectious diseases — every case gets expert care.
          </p>
        </div>
      </section>

      {/* ─── Overview Stats ─── */}
      <section className="py-12 bg-offwhite border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { stat: "3,500+", label: "Cases per year" },
              { stat: "106+", label: "Species treated" },
              { stat: "20+", label: "Years of expertise" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                  {item.stat}
                </div>
                <p className="text-sm text-slate mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Conditions — Full-Width Cards with Photos ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Treat"
            subtitle="Click on any condition to learn about causes, symptoms, treatment, and real case studies from our facility."
            centered
          />

          <div className="mt-12 space-y-10">
            {CONDITIONS_LIST.map((condition, index) => {
              const images = CONDITION_IMAGES[condition.slug];
              const isEven = index % 2 === 0;

              return (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-teal/20 transition-all"
                >
                  <div
                    className={`grid md:grid-cols-2 ${
                      !isEven ? "md:grid-flow-dense" : ""
                    }`}
                  >
                    {/* ─── Photo Gallery Side ─── */}
                    <div
                      className={`${!isEven ? "md:col-start-2" : ""}`}
                    >
                      {condition.images && condition.images.length >= 2 ? (
                        <div className="grid grid-cols-2 h-full min-h-[280px] lg:min-h-[340px]">
                          {condition.images.slice(0, 2).map((img, imgIdx) => (
                            <div key={imgIdx} className={`relative ${imgIdx === 1 ? "border-l border-gray-100" : ""}`}>
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            </div>
                          ))}
                        </div>
                      ) : condition.images && condition.images.length === 1 ? (
                        <div className="relative h-full min-h-[280px] lg:min-h-[340px]">
                          <Image
                            src={condition.images[0].src}
                            alt={condition.images[0].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 h-full min-h-[280px] lg:min-h-[340px]">
                          <div
                            className={`relative bg-gradient-to-br ${images?.gradient || "from-gray-100 to-gray-50"} flex flex-col items-center justify-center p-4`}
                          >
                            <div className="w-16 h-16 bg-white/60 rounded-xl flex items-center justify-center text-slate/40 mb-3">
                              <Camera size={28} />
                            </div>
                            <p className="text-xs text-slate/60 text-center leading-snug">
                              {images?.label1 || "Photo placeholder"}
                            </p>
                          </div>
                          <div
                            className={`relative bg-gradient-to-bl ${images?.gradient || "from-gray-100 to-gray-50"} flex flex-col items-center justify-center p-4 border-l border-white/50`}
                          >
                            <div className="w-16 h-16 bg-white/60 rounded-xl flex items-center justify-center text-slate/40 mb-3">
                              <Camera size={28} />
                            </div>
                            <p className="text-xs text-slate/60 text-center leading-snug">
                              {images?.label2 || "Photo placeholder"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ─── Content Side ─── */}
                    <div
                      className={`p-6 lg:p-10 flex flex-col justify-center ${
                        !isEven ? "md:col-start-1 md:row-start-1" : ""
                      }`}
                    >
                      {/* Icon + Severity */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                          {ICON_MAP[condition.icon]}
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SEVERITY_COLORS[condition.severity]}`}
                        >
                          {condition.severity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                        {condition.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-slate leading-relaxed">
                        {condition.shortDescription}
                      </p>

                      {/* Stats Row */}
                      <div className="mt-5 flex flex-wrap items-center gap-6">
                        <div>
                          <span className="text-3xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                            {condition.percentage}
                          </span>
                          <span className="text-xs text-slate ml-1.5">
                            of cases
                          </span>
                        </div>
                        <div className="h-10 w-px bg-gray-200" />
                        <div>
                          <span className="text-lg font-semibold text-charcoal">
                            {condition.annualCases}
                          </span>
                        </div>
                        <div className="h-10 w-px bg-gray-200" />
                        <div>
                          <span className="text-sm text-slate">
                            Recovery:{" "}
                            <span className="font-semibold text-charcoal">
                              {condition.recoveryRate}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-6 flex items-center text-teal font-semibold group-hover:gap-2 transition-all">
                        View Full Details{" "}
                        <ArrowRight size={16} className="ml-1.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Treatment Process"
            subtitle="From rescue call to release — every bird follows a structured treatment pathway."
            centered
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Rescue & Intake",
                desc: "Bird is brought to our facility or rescued by our team. Initial triage assessment within minutes.",
              },
              {
                step: "02",
                title: "Diagnosis & Treatment",
                desc: "X-rays, lab work, surgical intervention as needed. Species-specific treatment protocols begin immediately.",
              },
              {
                step: "03",
                title: "Recovery & Rehab",
                desc: "Controlled recovery environment. Physiotherapy, flight conditioning, and gradual reintroduction to natural behavior.",
              },
              {
                step: "04",
                title: "Release",
                desc: "When fully recovered, birds are released at appropriate habitat. Location and timing are carefully chosen for survival.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto bg-teal text-white rounded-full flex items-center justify-center text-xl font-bold font-[family-name:var(--font-poppins)]">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Found Injured Bird CTA ─── */}
      <section className="py-12 lg:py-16 bg-amber-bg border-y border-amber/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart size={32} className="text-danger mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Found an Injured Bird?
          </h2>
          <p className="mt-3 text-slate max-w-xl mx-auto">
            Call us immediately. Do not try to feed the bird
            or give water. Keep it in a dark, quiet box and bring it to us as
            soon as possible.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+919810029698"
              className="inline-flex items-center gap-2 bg-danger text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-red-700 transition-colors"
            >
              📞 +91 98100 29698
            </a>
            <a
              href="https://wa.me/919810029698"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── Donate CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Fund Life-Saving Treatment
          </h2>
          <p className="mt-3 text-white/80">
            Every donation funds the surgery, medication, and rehabilitation that
            gives injured birds a second chance at life.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
