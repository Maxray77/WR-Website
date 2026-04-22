import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Scissors,
  Bone,
  Baby,
  Bug,
  Thermometer,
  Stethoscope,
  Flame,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Shield,
  Users,
  Camera,
  Play,
} from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { CONDITIONS_LIST, getConditionBySlug } from "@/lib/conditions-data";

export function generateStaticParams() {
  return CONDITIONS_LIST.map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return { title: "Condition Not Found" };
  return {
    title: `${condition.name} — Treatment at Wildlife Rescue`,
    description: condition.shortDescription,
  };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Scissors: <Scissors size={24} />,
  Bone: <Bone size={24} />,
  Baby: <Baby size={24} />,
  Bug: <Bug size={24} />,
  Thermometer: <Thermometer size={24} />,
  Flame: <Flame size={24} />,
  Stethoscope: <Stethoscope size={24} />,
};

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "bg-danger/20 text-red-200",
  Serious: "bg-amber/20 text-amber-light",
  Moderate: "bg-green-500/20 text-green-200",
  Variable: "bg-white/20 text-white/80",
};

const OUTCOME_COLORS: Record<string, string> = {
  Released: "bg-green-50 text-success",
  "In Care": "bg-amber-bg text-amber",
  "Permanent Resident": "bg-teal-light text-teal",
};

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft size={16} /> All Conditions
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Photo or Icon fallback */}
            {condition.image ? (
              <div className="relative aspect-square max-h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={condition.image}
                  alt={condition.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ) : (
              <div className="aspect-square max-h-[400px] bg-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-white/60 mb-4">
                    <span className="scale-[2]">
                      {ICON_MAP[condition.icon]}
                    </span>
                  </div>
                  <span className="text-6xl font-bold text-white/10 font-[family-name:var(--font-poppins)]">
                    {condition.percentage}
                  </span>
                  <p className="text-white/40 text-sm mt-2">of all cases</p>
                </div>
              </div>
            )}

            {/* Right: Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${SEVERITY_COLORS[condition.severity]}`}
                >
                  {condition.severity}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-poppins)]">
                {condition.name}
              </h1>

              <p className="mt-6 text-white/80 leading-relaxed">
                {condition.shortDescription}
              </p>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                    {condition.percentage}
                  </div>
                  <p className="text-white/60 text-sm mt-1">of total cases</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                    {condition.annualCases}
                  </div>
                  <p className="text-white/60 text-sm mt-1">treated annually</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                    {condition.recoveryRate}
                  </div>
                  <p className="text-white/60 text-sm mt-1">recovery rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Full Description ─── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate leading-relaxed text-lg">
            {condition.description}
          </p>
        </div>
      </section>

      {/* ─── Photo Gallery (if images available) ─── */}
      {condition.images && condition.images.length > 0 && (
        <section className="pb-12 lg:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid gap-4 ${
              condition.images.length === 1
                ? "grid-cols-1 max-w-2xl mx-auto"
                : condition.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 lg:grid-cols-3"
            }`}>
              {condition.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <p className="text-white text-xs">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Causes & Symptoms ─── */}
      <section className="py-12 lg:py-16 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Causes */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center text-danger">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Causes
                </h2>
              </div>
              <ul className="space-y-3">
                {condition.causes.map((cause, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate">
                    <span className="w-1.5 h-1.5 bg-danger rounded-full mt-2 shrink-0" />
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            {/* Symptoms */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-bg rounded-lg flex items-center justify-center text-amber">
                  <Activity size={20} />
                </div>
                <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Symptoms to Watch For
                </h2>
              </div>
              <ul className="space-y-3">
                {condition.symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate">
                    <span className="w-1.5 h-1.5 bg-amber rounded-full mt-2 shrink-0" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Treatment ─── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                <CheckCircle size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  How We Treat It
                </h2>
                <p className="text-sm text-slate">
                  Average recovery time: {condition.avgRecoveryTime}
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {condition.treatment.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate bg-offwhite rounded-lg p-3"
                >
                  <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Treatment Video ─── */}
      {condition.video && (
        <section className="py-12 lg:py-16 bg-offwhite">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)] text-center mb-8">
              Treatment in Action
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative">
                <video
                  src={condition.video.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Play size={12} fill="white" /> Video
                </div>
              </div>
              <p className="p-4 text-sm text-slate italic bg-white">
                {condition.video.caption}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── Case Study ─── */}
      <section className="py-12 lg:py-16 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)] text-center mb-8">
            Real Case Study
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="grid md:grid-cols-3">
              {/* Photo or placeholder */}
              {condition.caseStudy.image ? (
                <div className="relative aspect-square md:aspect-auto min-h-[200px]">
                  <Image
                    src={condition.caseStudy.image}
                    alt={`${condition.caseStudy.name} the ${condition.caseStudy.species}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-square md:aspect-auto bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center p-6">
                  <div className="text-center">
                    <span className="text-5xl font-bold text-teal/20 font-[family-name:var(--font-poppins)]">
                      {condition.caseStudy.name.charAt(0)}
                    </span>
                    <p className="text-slate text-xs mt-2">Photo Placeholder</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="md:col-span-2 p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-light text-teal rounded-full">
                    {condition.caseStudy.species}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${OUTCOME_COLORS[condition.caseStudy.outcome]}`}
                  >
                    {condition.caseStudy.outcome}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {condition.caseStudy.name} the {condition.caseStudy.species}
                </h3>

                <p className="mt-4 text-slate text-sm leading-relaxed">
                  {condition.caseStudy.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Common Species + Prevention ─── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Common Species */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                  <Users size={20} />
                </div>
                <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Most Affected Species
                </h2>
              </div>
              <ul className="space-y-3">
                {condition.commonSpecies.map((species, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate">
                    <span className="w-1.5 h-1.5 bg-teal rounded-full mt-2 shrink-0" />
                    {species}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-success">
                  <Shield size={20} />
                </div>
                <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  How You Can Help Prevent This
                </h2>
              </div>
              <ul className="space-y-3">
                {condition.prevention.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Emergency CTA ─── */}
      <section className="py-10 bg-amber-bg border-y border-amber/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Clock size={28} className="text-amber mx-auto mb-2" />
          <h2 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Found a bird with these symptoms?
          </h2>
          <p className="mt-2 text-slate text-sm">
            Time is critical. Call us now.
          </p>
          <a
            href="tel:+919810029698"
            className="mt-4 inline-flex items-center gap-2 bg-danger text-white font-semibold px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors"
          >
            📞 +91 98100 29698
          </a>
        </div>
      </section>

      {/* ─── Donate CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Fund Treatment for {condition.name}
          </h2>
          <p className="mt-3 text-white/80">
            Your donation directly funds the treatment and rehabilitation of
            birds suffering from {condition.name.toLowerCase()}.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
