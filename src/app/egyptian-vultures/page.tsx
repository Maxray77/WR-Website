import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Feather,
  Heart,
  Scissors,
  ArrowRight,
  TrendingDown,
  Globe,
  ShieldCheck,
  Play,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  EV_VIDEOS,
  EV_GALLERY,
  EV_CONDITIONS,
  EV_OUTCOMES,
  EV_INTAKE_BY_YEAR,
  EV_TOTAL_CASES,
} from "@/lib/egyptian-vulture-data";

export const metadata: Metadata = {
  title: "Egyptian Vultures — Saving an Endangered Scavenger",
  description:
    "The Egyptian Vulture is Endangered and in steep decline across South Asia. See Wildlife Rescue's flight footage, rescue outcomes (73% release rate), and the propatagium surgery that returns cut-wing vultures to the sky in Delhi.",
  alternates: { canonical: "/egyptian-vultures" },
};

const maxCondition = Math.max(...EV_CONDITIONS.map((c) => c.count));
const maxYear = Math.max(...EV_INTAKE_BY_YEAR.map((y) => y.count));

export default function EgyptianVulturesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero-egyptian-vulture.jpg"
            alt="An Egyptian Vulture — Endangered scavenger cared for at Wildlife Rescue"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/20 border border-danger/40 text-sm font-semibold text-amber-light mb-5">
            <Feather size={15} /> IUCN Endangered
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)]">
            The Egyptian Vulture
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            An Endangered species we fight to save — and return to the sky. Every
            individual that recovers at Wildlife Rescue matters for the survival
            of a vanishing bird.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { stat: "Endangered", label: "IUCN Red List status" },
              { stat: `${EV_TOTAL_CASES}+`, label: "Rescued since 2020" },
              { stat: `${EV_OUTCOMES.releaseRate}%`, label: "Release rate (resolved cases)" },
            ].map((m) => (
              <div key={m.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <div className="text-2xl sm:text-3xl font-bold text-amber-light font-[family-name:var(--font-poppins)]">
                  {m.stat}
                </div>
                <div className="text-[11px] sm:text-xs text-white/70 mt-1 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why it matters ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why the Egyptian Vulture Matters"
            subtitle="A scavenger in crisis, threatened on two continents at once."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <TrendingDown className="text-danger mb-3" size={28} />
              <h3 className="font-bold text-charcoal mb-2 font-[family-name:var(--font-poppins)]">A population in free-fall</h3>
              <p className="text-sm text-slate leading-relaxed">
                India&apos;s Egyptian Vulture population is estimated to have
                declined by around 80% over three generations — part of the wider
                South Asian vulture collapse driven by veterinary diclofenac.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <Globe className="text-teal mb-3" size={28} />
              <h3 className="font-bold text-charcoal mb-2 font-[family-name:var(--font-poppins)]">Dual jeopardy</h3>
              <p className="text-sm text-slate leading-relaxed">
                Many Egyptian Vultures migrate between breeding grounds in Europe
                and the Middle East and wintering grounds in India — facing
                threats at both ends of a long, dangerous journey.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <Feather className="text-amber mb-3" size={28} />
              <h3 className="font-bold text-charcoal mb-2 font-[family-name:var(--font-poppins)]">A remarkable bird</h3>
              <p className="text-sm text-slate leading-relaxed">
                Distinctive white plumage, a yellow face, and a 1.5–1.8 m wingspan.
                One of the few birds known to use tools — dropping stones to crack
                open eggs. They can live 30+ years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our work: intake + conditions + outcomes ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Work with Egyptian Vultures"
            subtitle={`${EV_TOTAL_CASES} documented cases, 2020–2025 — why they arrive, and what happens next.`}
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-4">
            {/* Why they come in */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              <h3 className="font-bold text-charcoal mb-1 font-[family-name:var(--font-poppins)]">Why they come in</h3>
              <p className="text-sm text-slate mb-5">
                Cut-wing wounds from <strong className="text-amber">manja</strong> (glass-coated
                kite string) are by far the leading cause — the same injury that
                dominates our wider raptor caseload.
              </p>
              <div className="space-y-3">
                {EV_CONDITIONS.map((c) => {
                  const pct = (c.count / EV_TOTAL_CASES) * 100;
                  return (
                    <div key={c.label}>
                      <div className="flex justify-between items-baseline gap-3 mb-1">
                        <span className="text-xs font-semibold text-charcoal">{c.label}</span>
                        <span className="text-xs text-slate font-mono shrink-0">{c.count}</span>
                      </div>
                      <div className="w-full bg-offwhite rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${c.label.includes("manja") ? "bg-amber" : "bg-teal"}`}
                          style={{ width: `${Math.max((c.count / maxCondition) * 100, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-teal-dark text-white rounded-2xl p-6 lg:p-8 flex flex-col">
              <h3 className="font-bold mb-1 font-[family-name:var(--font-poppins)]">What happens next</h3>
              <p className="text-sm text-teal-light mb-6">
                Of the {EV_OUTCOMES.resolved} resolved cases (those no longer in
                care), nearly three in four returned to the wild.
              </p>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-amber-light font-[family-name:var(--font-poppins)]">
                  {EV_OUTCOMES.releaseRate}%
                </div>
                <div className="text-sm text-teal-light mt-1">returned to the wild</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-auto">
                {[
                  { n: EV_OUTCOMES.freed, l: "Freed" },
                  { n: EV_OUTCOMES.inCare, l: "In care" },
                  { n: EV_OUTCOMES.lost, l: "Lost" },
                ].map((o) => (
                  <div key={o.l} className="bg-white/10 rounded-lg p-3 text-center border border-white/15">
                    <div className="text-2xl font-bold text-white">{o.n}</div>
                    <div className="text-[11px] text-teal-light mt-0.5">{o.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-teal-light/70 mt-4 leading-relaxed">
                Release rate is calculated on resolved cases only; birds still under
                care are excluded. Escapes are counted as returns to the wild. Deaths
                are shown openly.
              </p>
            </div>
          </div>

          {/* Intake by year */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 mt-8">
            <h3 className="font-bold text-charcoal mb-5 font-[family-name:var(--font-poppins)]">Egyptian Vultures received per year</h3>
            <div className="flex items-end justify-between gap-3 sm:gap-6 h-40">
              {EV_INTAKE_BY_YEAR.map((y) => (
                <div key={y.year} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-sm font-bold text-teal-dark">{y.count}</span>
                  <div className="w-full bg-teal rounded-t-md" style={{ height: `${(y.count / maxYear) * 100}%` }} />
                  <span className="text-xs text-slate font-mono">{y.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Videos: Egyptian Vultures in Flight ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Egyptian Vultures in Flight"
            subtitle="Flight conditioning and rehabilitation footage from our team — the work of getting an Endangered bird back into the air."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {EV_VIDEOS.map((v) => (
              <figure
                key={v.src}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="relative bg-charcoal">
                  <video
                    src={v.src}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full max-h-[60vh] bg-charcoal"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-semibold">
                    <Play size={10} /> Video
                  </span>
                </div>
                <figcaption className="p-4 text-sm text-slate leading-relaxed">{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photo gallery ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Egyptian Vultures in Our Care"
            subtitle="Examination, treatment, and recovery at the Wildlife Rescue clinic."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
            {EV_GALLERY.map((p) => (
              <div key={p.src} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: p.position ?? "center" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Propatagium repair highlight ─── */}
      <section className="py-16 lg:py-24 bg-charcoal text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="text-amber-light" size={28} />
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
              Why Cut-Wing Vultures Fly Free Again
            </h2>
          </div>
          <p className="text-white/85 leading-relaxed max-w-3xl">
            Manja doesn&apos;t just cut skin. On the leading edge of the wing it can
            sever <strong className="text-amber-light">muscles, tendons, nerves, skin and even bones</strong> —
            the propatagium, the structure a bird needs to fly. Restoring flight
            means rebuilding every one of those layers. The surgical technique
            Wildlife Rescue developed over two decades to repair the propatagium is
            the reason so many cut-wing Egyptian Vultures recover well enough to be
            released — driving that {EV_OUTCOMES.releaseRate}% release rate for an
            Endangered species.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { stat: "77%", label: "of EV cases arrive with manja / cut-wing wounds" },
              { stat: `${EV_OUTCOMES.releaseRate}%`, label: "of resolved EV cases returned to the wild" },
              { stat: "Endangered", label: "every released bird matters globally" },
            ].map((m) => (
              <div key={m.label} className="bg-white/10 rounded-xl p-5 border border-white/15">
                <div className="text-2xl font-bold text-amber-light font-[family-name:var(--font-poppins)]">{m.stat}</div>
                <div className="text-xs text-white/70 mt-1 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
          <Link
            href="/our-specialty"
            className="inline-flex items-center gap-2 mt-8 text-amber-light hover:text-white font-semibold text-sm transition-colors"
          >
            See how we repair the propatagium <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="mx-auto text-amber-light mb-4" size={40} />
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
            Help us keep Egyptian Vultures flying
          </h2>
          <p className="mt-4 text-white/85 leading-relaxed">
            Every donation funds the surgery, medicine, and flight aviaries that
            return Endangered vultures to the wild. For an Endangered species, every
            bird counts.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 mt-8 bg-amber hover:bg-amber-light text-charcoal font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:scale-105"
          >
            <Heart size={18} /> Donate to Wildlife Rescue
          </Link>
          <div className="mt-6">
            <Link href="/vultures" className="text-amber-light hover:text-white text-sm font-semibold inline-flex items-center gap-1.5">
              Explore the wider vulture crisis in India <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
