import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Leaf,
  Feather,
  Building2,
  AlertTriangle,
  Palette,
  Gift,
  Users,
  Heart,
  ArrowRight,
  Calendar,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { EDU_EVENT, EVENT_PHOTOS, DRAWINGS } from "@/lib/education-data";

export const metadata: Metadata = {
  title: "Education & Outreach — Teaching Delhi's Children About Wildlife",
  description:
    "Wildlife Rescue's school education programme teaches children about the environment, urban wildlife, and the dangers of manja (glass-coated kite string). See photos and children's drawings from our awareness session at Infinity Learning Centre, Wazirabad.",
  alternates: { canonical: "/education-outreach" },
};

const TOPICS = [
  {
    icon: <Leaf size={26} />,
    title: "Environment",
    desc: "How ecosystems fit together, why biodiversity matters, and the small everyday choices that protect nature.",
  },
  {
    icon: <Feather size={26} />,
    title: "Wildlife & Birds",
    desc: "Delhi's wild neighbours — Black Kites, owls, and vultures — and what to do when you find an injured bird.",
  },
  {
    icon: <Building2 size={26} />,
    title: "Urban Ecology",
    desc: "How wildlife survives in a megacity of glass and concrete, and how we can share the space we live in.",
  },
  {
    icon: <AlertTriangle size={26} />,
    title: "Kite-Flying & Manja Safety",
    desc: "Why glass-coated manja string maims and kills thousands of birds — and safer, kinder ways to enjoy kite flying.",
  },
];

export default function EducationOutreachPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/education/event-01.jpg"
            alt="Wildlife Rescue's education and outreach session with school children"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/40" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/20 border border-amber/40 text-sm font-semibold text-amber-light mb-5">
            <GraduationCap size={16} /> Education &amp; Outreach
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)]">
            Raising the Next Generation of Wildlife Allies
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            We take wildlife into the classroom — teaching Delhi&apos;s school
            children about the environment, urban wildlife, and the hidden
            dangers of manja kite string.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5">
              <Calendar size={15} className="text-amber-light" /> {EDU_EVENT.date}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5">
              <MapPin size={15} className="text-amber-light" /> {EDU_EVENT.venue}, {EDU_EVENT.area}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Intro ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Teaching the Next Generation"
            subtitle="Conservation begins with the young."
          />
          <p className="text-slate leading-relaxed -mt-2">
            Children are the future custodians of Delhi&apos;s skies. Through our
            education and outreach programme, Wildlife Rescue visits schools to
            help students understand the wildlife that shares their city — and
            the everyday hazards, like glass-coated manja string, that put it at
            risk. Our session at {EDU_EVENT.venue}, {EDU_EVENT.area}, was led by{" "}
            <strong className="text-charcoal">{EDU_EVENT.conductors[0]}</strong> and{" "}
            <strong className="text-charcoal">{EDU_EVENT.conductors[1]}</strong>{" "}
            of Wildlife Rescue, and ended with a drawing contest and gift
            distribution celebrating what the children had learned.
          </p>
        </div>
      </section>

      {/* ─── What we teach ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Teach"
            subtitle="Four ideas at the heart of every session."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {TOPICS.map((t) => (
              <div key={t.title} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="w-12 h-12 rounded-lg bg-teal-light text-teal flex items-center justify-center mb-4">
                  {t.icon}
                </div>
                <h3 className="font-bold text-charcoal mb-2 font-[family-name:var(--font-poppins)]">
                  {t.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Inside the classroom (event photos) ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Inside the Classroom"
            subtitle={`Our awareness session at ${EDU_EVENT.venue}, ${EDU_EVENT.area}.`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
            {EVENT_PHOTOS.map((p) => (
              <div key={p.src} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Drawing contest ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What the Children Drew"
            subtitle="After the session, students drew what they had learned — and the best became a drawing contest."
          />

          <div className="max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-3">
              <Palette className="text-amber shrink-0" size={22} />
              <p className="text-sm text-slate leading-relaxed">
                <strong className="text-charcoal">A drawing contest.</strong>{" "}
                Each child put what they had learned onto paper — birds, trees,
                clean skies, and the dangers of manja.
              </p>
            </div>
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-3">
              <Gift className="text-teal shrink-0" size={22} />
              <p className="text-sm text-slate leading-relaxed">
                <strong className="text-charcoal">Gifts for everyone.</strong>{" "}
                The session ended with a gift distribution, celebrating every
                young artist and their new role as a wildlife ally.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DRAWINGS.map((d, i) => (
              <figure key={d.src} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3] bg-offwhite">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-slate italic border-t border-gray-100">
                  Drawing #{i + 1} — a young student&apos;s view of wildlife &amp; the environment
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Led by our team ─── */}
      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-light text-teal flex items-center justify-center shrink-0">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Led by our outreach team
              </h3>
              <p className="mt-2 text-slate leading-relaxed text-sm">
                This session was conducted by{" "}
                <strong className="text-charcoal">{EDU_EVENT.conductors[0]}</strong> and{" "}
                <strong className="text-charcoal">{EDU_EVENT.conductors[1]}</strong>{" "}
                of Wildlife Rescue, who bring the work of the clinic into
                classrooms across Delhi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="mx-auto text-amber-light mb-4" size={40} />
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
            Bring Wildlife Rescue to your school
          </h2>
          <p className="mt-4 text-white/85 leading-relaxed">
            We&apos;d love to visit your classroom. Invite our team for an
            awareness session on wildlife, urban ecology, and kite-flying safety —
            or help fund the programme so more children can take part.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-charcoal font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-lg hover:scale-105"
            >
              Invite us to your school <ArrowRight size={18} />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full transition-all"
            >
              <Heart size={18} /> Support the programme
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
