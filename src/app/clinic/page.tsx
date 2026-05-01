import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Scan,
  Syringe,
  TestTube,
  Thermometer,
  Pill,
  ClipboardList,
  Activity,
  Microscope,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Clinic — Avian Surgical Suite & Diagnostic Center",
  description:
    "Inside Wildlife Rescue's clinic — a fully equipped avian medical facility in Delhi with on-site X-ray, isoflurane anesthesia, ultrasonic bone cutter, surgical laser, and a modern operation theater. The most advanced raptor clinic in South Asia.",
};

const CLINIC_STATS = [
  { value: "11+", label: "Birds Treated Daily" },
  { value: "Modern", label: "Operation Theater" },
  { value: "On-Site", label: "X-Ray & Lab" },
  { value: "24/7", label: "ICU Monitoring" },
];

const CLINIC_FEATURES = [
  {
    title: "X-Ray & Diagnostic Imaging",
    description:
      "Dedicated on-site X-ray station for rapid fracture, dislocation, and internal-injury diagnosis. Triage decisions happen within minutes of intake — critical for the 11+ birds arriving daily.",
    icon: <Scan size={28} />,
  },
  {
    title: "Modern Operation Theater",
    description:
      "Sterile surgical theater with full isoflurane gas anesthesia, vital-sign monitors, microwave ablation device, and precision instruments for complex orthopedic and soft-tissue procedures.",
    icon: <Syringe size={28} />,
  },
  {
    title: "Ultrasonic Bone Cutter",
    description:
      "Woodpecker Surgic Smart ultrasonic system — selectively cuts bone while sparing soft tissue. A game-changer for raptor orthopedic surgery, where margins are millimeters.",
    icon: <Activity size={28} />,
  },
  {
    title: "Surgical Laser",
    description:
      "Therapeutic and surgical laser equipment for wound debridement, accelerated healing of manja-cut tissue, and post-operative therapy on burn and electrocution cases.",
    icon: <Stethoscope size={28} />,
  },
  {
    title: "Diagnostic Laboratory",
    description:
      "Hematocrit centrifuge for blood analysis, microscope for parasitology and cytology, and basic pathology workflow for comprehensive avian health assessment.",
    icon: <TestTube size={28} />,
  },
  {
    title: "ICU & Critical Care",
    description:
      "Temperature-controlled intensive care area for post-surgical recovery and critically injured birds requiring round-the-clock observation and intervention.",
    icon: <Thermometer size={28} />,
  },
  {
    title: "Avian Pharmacy",
    description:
      "Stocked with antibiotics, anti-inflammatories, fluids, wound-care supplies, and species-appropriate pain management — sourced and dosed for raptor physiology.",
    icon: <Pill size={28} />,
  },
  {
    title: "Intake & Triage",
    description:
      "First point of contact for every bird. Case logged, photographed, weighed, and stabilized before being routed to imaging, surgery, or the recovery wing.",
    icon: <ClipboardList size={28} />,
  },
  {
    title: "Surgical Microscopy",
    description:
      "Magnification optics for microsurgical work — particularly the propatagium repair, where individual tendons (TPLT, EMR) are identified and re-apposed by hand.",
    icon: <Microscope size={28} />,
  },
];

const EQUIPMENT_GALLERY = [
  {
    src: "/treatments/usbc-full-setup.jpg",
    alt: "Ultrasonic bone cutter surgical setup with control unit, handpiece, IV irrigation, and foot pedal at Wildlife Rescue clinic",
    caption: "Ultrasonic Bone Cutter — Full Setup",
  },
  {
    src: "/treatments/usbc-control-unit.jpg",
    alt: "Woodpecker Surgic Smart ultrasonic bone cutter touchscreen control unit in Bone mode",
    caption: "USBC Control Unit",
  },
  {
    src: "/treatments/usbc-handpiece.jpg",
    alt: "HB-2 LED ultrasonic handpiece with cutting tip resting on cradle",
    caption: "LED Surgical Handpiece",
  },
  {
    src: "/treatments/usbc-tip-sets.jpg",
    alt: "Specialized ultrasonic cutting tip sets in stainless steel holders",
    caption: "Precision Tip Sets",
  },
  {
    src: "/facility/ot-table.jpg",
    alt: "Wildlife Rescue operating theater with anesthesia machine, microwave ablation device, monitors, and surgical supplies",
    caption: "Operating Theater",
  },
  {
    src: "/facility/laser-surgery.jpg",
    alt: "Close-up of laser surgical procedure on a raptor at Wildlife Rescue",
    caption: "Laser Surgery",
  },
  {
    src: "/treatments/laser-therapy-big.jpg",
    alt: "Wide shot of laser therapy treatment on a recovering raptor at Wildlife Rescue",
    caption: "Laser Wound Therapy",
  },
  {
    src: "/facility/lab-02.jpg",
    alt: "Wildlife Rescue technician operating hematocrit centrifuge and microscope in the diagnostic laboratory",
    caption: "Diagnostic Laboratory",
  },
  {
    src: "/treatments/barn-owl-anesthesia.jpg",
    alt: "Barn Owl under isoflurane gas anesthesia with face mask at Wildlife Rescue",
    caption: "Gas Anesthesia in Action",
  },
  {
    src: "/treatments/black-kite-drip.jpg",
    alt: "Black Kite receiving IV fluid therapy post-surgery at Wildlife Rescue",
    caption: "IV Fluid Therapy",
  },
  {
    src: "/treatments/painkiller-drops.jpg",
    alt: "Wildlife Rescue staff administering oral pain medication to a recovering raptor",
    caption: "Pain Management",
  },
];

const CLINIC_JOURNEY = [
  {
    step: 1,
    title: "Arrival & Intake",
    description:
      "The bird is logged, photographed, and given an initial physical assessment. The clock starts on critical injuries — every minute matters.",
  },
  {
    step: 2,
    title: "Imaging & Diagnosis",
    description:
      "X-rays reveal fractures, foreign bodies, and internal injuries. Blood work in the lab confirms infection, anemia, or organ stress before any procedure.",
  },
  {
    step: 3,
    title: "Surgery or Treatment",
    description:
      "From a routine wound clean to a multi-hour propatagium reconstruction, the surgical theater handles cases most facilities refer out or decline.",
  },
  {
    step: 4,
    title: "ICU & Recovery",
    description:
      "Heated, low-stress recovery boxes with continuous monitoring. Pain management, fluid therapy, and medication schedules dialed in to species-specific needs.",
  },
  {
    step: 5,
    title: "Transfer to Aviaries",
    description:
      "Once stable and feeding independently, the bird moves out of the clinic and into the aviary complex for rehabilitation and flight reconditioning.",
  },
];

export default function ClinicPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            One of India&apos;s Most Advanced Clinics for Birds
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Our Clinic
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            A fully equipped avian medical center in the heart of Delhi —
            on-site X-ray, modern operation theater, ultrasonic bone cutter,
            surgical laser, diagnostic lab, and ICU. Every piece of equipment
            chosen with one goal: getting birds back in the sky.
          </p>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-teal-light rounded-2xl p-6 border border-teal/10"
              >
                <p className="text-3xl lg:text-4xl font-bold text-teal font-[family-name:var(--font-poppins)]">
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

      {/* ─── Where Healing Begins ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <Image
                src="/treatments/usbc-full-setup.jpg"
                alt="Ultrasonic bone cutter surgical setup at Wildlife Rescue clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Where Every Rescue Begins
              </h2>
              <p className="mt-4 text-slate leading-relaxed text-lg">
                The clinic is the nerve center of Wildlife Rescue. Every injured
                bird that arrives — whether tangled in manja, electrocuted, hit
                by a vehicle, or fallen as a chick — passes through here first.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                What started in a rooftop room in Old Delhi has grown into a
                professional-grade medical facility with imaging, surgical, and
                critical-care capabilities that rival university veterinary
                schools. The difference: every machine, every protocol, every
                surgical technique was developed for one species group — birds
                of prey.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                That focus is what enables us to perform surgeries — like the
                propatagium repair developed by Saud and Nadeem — that no
                general-practice veterinary hospital in the region attempts.
              </p>
              <Link
                href="/our-specialty"
                className="inline-flex items-center gap-2 text-teal font-semibold mt-6 hover:gap-3 transition-all"
              >
                Learn About Our Surgical Techniques <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Equipment Cards ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Inside the Clinic"
            subtitle="Nine integrated medical capabilities under one roof — built specifically for raptor care."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINIC_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Equipment Gallery ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Equipment Gallery"
            subtitle="Photos from inside the operating theater, lab, and recovery rooms — the tools that save raptors every day."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EQUIPMENT_GALLERY.map((img) => (
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

      {/* ─── Clinic Journey ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="A Bird's Path Through the Clinic"
            subtitle="From the moment a raptor arrives until it&apos;s ready to move to the aviary complex."
          />

          <div className="max-w-3xl mx-auto">
            {CLINIC_JOURNEY.map((item, index) => (
              <div key={item.step} className="relative flex gap-6 pb-10">
                {index < CLINIC_JOURNEY.length - 1 && (
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
              href="/enclosures"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all"
            >
              Continue the journey: Bird Enclosures <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Us Equip the Clinic
          </h2>
          <p className="mt-3 text-white/80">
            Surgical instruments, imaging equipment upgrades, and ICU supplies —
            every donation directly funds the tools that save raptor lives.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
