import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Scissors,
  Bone,
  Baby,
  Bug,
  Thermometer,
  Stethoscope,
  Heart,
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
  Stethoscope: <Stethoscope size={28} />,
};

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "bg-danger/10 text-danger",
  Serious: "bg-amber-bg text-amber",
  Moderate: "bg-teal-light text-teal",
  Variable: "bg-gray-100 text-slate",
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "3,500+", label: "Cases per year" },
              { stat: "106+", label: "Species treated" },
              { stat: "24/7", label: "Emergency care" },
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

      {/* ─── Conditions Grid ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Treat"
            subtitle="Click on any condition to learn about causes, symptoms, treatment, and real case studies from our facility."
            centered
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONDITIONS_LIST.map((condition) => (
              <Link
                key={condition.slug}
                href={`/conditions/${condition.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                {/* Icon + Severity */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                    {ICON_MAP[condition.icon]}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SEVERITY_COLORS[condition.severity]}`}
                  >
                    {condition.severity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)] group-hover:text-teal transition-colors">
                  {condition.name}
                </h3>

                {/* Short description */}
                <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-3">
                  {condition.shortDescription}
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-bold text-teal font-[family-name:var(--font-poppins)]">
                      {condition.percentage}
                    </span>
                    <span className="text-xs text-slate ml-1">of cases</span>
                  </div>
                  <div className="h-8 w-px bg-gray-200" />
                  <div>
                    <span className="text-sm font-semibold text-charcoal">
                      {condition.annualCases}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center text-teal text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} className="ml-1" />
                </div>
              </Link>
            ))}
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
            Call our 24/7 emergency hotline immediately. Do not try to feed the
            bird or give water. Keep it in a dark, quiet box and bring it to us
            as soon as possible.
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
