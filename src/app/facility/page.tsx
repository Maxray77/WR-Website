import type { Metadata } from "next";
import {
  Scan,
  Syringe,
  TestTube,
  Thermometer,
  Pill,
  ClipboardList,
  Home,
  Bird,
  Baby,
  TreePine,
  Sun,
  ShieldCheck,
  Camera,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Facility — Clinic, Aviaries & Rehabilitation Center",
  description:
    "Tour the world's largest raptor rescue facility in Delhi — a fully equipped clinic with X-ray and surgical suite, plus 50+ enclosures rehabilitating 11+ birds daily.",
};

// ─── Facility Stats ───
const FACILITY_STATS = [
  { value: "11+", label: "Birds Arrive Daily" },
  { value: "2", label: "Operating Theaters" },
  { value: "50+", label: "Enclosures & Aviaries" },
  { value: "Since 2003", label: "Years in Operation" },
];

// ─── Clinic & Equipment Data ───
const CLINIC_FEATURES = [
  {
    title: "X-Ray & Imaging",
    description:
      "Dedicated imaging station with an on-site X-ray machine for rapid fracture and injury diagnosis. Enables triage decisions within minutes of a bird's arrival.",
    icon: <Scan size={28} />,
  },
  {
    title: "Surgical Theater",
    description:
      "Full isoflurane anesthesia setup, precision surgical instruments, and a sterile environment for complex wing repair and orthopedic procedures.",
    icon: <Syringe size={28} />,
  },
  {
    title: "Diagnostic Lab",
    description:
      "Hematocrit centrifuge for blood analysis, microscope for parasitology, and basic pathology tools for comprehensive health assessment.",
    icon: <TestTube size={28} />,
  },
  {
    title: "ICU / Critical Care",
    description:
      "Temperature-controlled intensive care area for post-surgical recovery and critically injured birds requiring round-the-clock monitoring.",
    icon: <Thermometer size={28} />,
  },
  {
    title: "Pharmacy & Supplies",
    description:
      "Stocked with antibiotics, anti-inflammatories, wound care supplies, and specialized avian medications for ongoing treatment protocols.",
    icon: <Pill size={28} />,
  },
  {
    title: "Intake & Triage",
    description:
      "First point of contact for incoming birds. Assessment, documentation, and initial stabilization happen here before transfer to treatment areas.",
    icon: <ClipboardList size={28} />,
  },
];

// ─── Enclosure & Housing Data ───
const ENCLOSURE_TYPES = [
  {
    title: "Recovery Cages",
    description:
      "Individual enclosed cages for post-surgical birds needing restricted movement. Padded interiors prevent further injury during the healing process.",
    icon: <Home size={28} />,
  },
  {
    title: "Flight Aviaries",
    description:
      "Large netted aviaries where recovering birds rebuild flight muscles and stamina before undergoing release assessment.",
    icon: <Bird size={28} />,
  },
  {
    title: "Chick Nursery",
    description:
      "Warm, protected housing for orphaned and fallen chicks. Specialized feeding stations and gentle-handling protocols ensure healthy development.",
    icon: <Baby size={28} />,
  },
  {
    title: "Raptor Enclosures",
    description:
      "Species-appropriate perching and shelter for medium to large raptors undergoing extended rehabilitation periods.",
    icon: <TreePine size={28} />,
  },
  {
    title: "Open-Air Conditioning Pens",
    description:
      "Semi-exposed pens that acclimatize birds to outdoor conditions before final release, mimicking their natural environments.",
    icon: <Sun size={28} />,
  },
  {
    title: "Permanent Residents",
    description:
      "Dedicated housing for non-releasable birds with permanent disabilities who serve as ambassadors for the organization.",
    icon: <ShieldCheck size={28} />,
  },
];

// ─── Bird Journey Steps ───
const FACILITY_JOURNEY = [
  {
    step: 1,
    title: "Arrival & Intake",
    description:
      "Bird arrives via rescue vehicle, citizen drop-off, or partner hospital transfer. Logged into records and given an initial assessment.",
  },
  {
    step: 2,
    title: "Triage & Diagnosis",
    description:
      "X-ray imaging, blood work, and physical examination. Severity classification determines the treatment path forward.",
  },
  {
    step: 3,
    title: "Treatment & Surgery",
    description:
      "Medical or surgical intervention as needed — from wound cleaning and medication to complex orthopedic wing repair surgery.",
  },
  {
    step: 4,
    title: "ICU & Recovery",
    description:
      "Post-treatment monitoring in intensive care. Medication schedules, specialized feeding, and wound management around the clock.",
  },
  {
    step: 5,
    title: "Rehabilitation",
    description:
      "Transfer to recovery cages, then flight aviaries. Gradual rebuilding of strength, coordination, and full flight capability.",
  },
  {
    step: 6,
    title: "Release",
    description:
      "Flight assessment confirms readiness. Bird is released at an appropriate site, ideally near where it was originally found.",
  },
];

export default function FacilityPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            The World&apos;s Largest Raptor Rescue Facility
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Our Facility
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            A purpose-built rescue center in the heart of Delhi, housing a fully
            equipped clinic and expansive aviary complex dedicated to saving
            raptors.
          </p>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITY_STATS.map((stat) => (
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

      {/* ─── Clinic & Surgical Suite ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Clinic & Surgical Suite"
            subtitle="Professional-grade medical infrastructure for diagnosing and treating thousands of raptors each year."
          />

          {/* Two-column intro */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="aspect-[4/3] bg-gradient-to-br from-teal-light to-teal/5 rounded-xl flex items-center justify-center border border-teal/10">
              <div className="text-center p-8">
                <Camera size={48} className="text-teal/30 mx-auto mb-3" />
                <p className="text-slate text-sm">
                  Clinic Interior — Photo Placeholder
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Where Healing Begins
              </h3>
              <p className="mt-4 text-slate leading-relaxed">
                Our clinic is the nerve center of every rescue. From the moment
                an injured bird arrives, it passes through a streamlined system
                of triage, diagnosis, and treatment. The facility houses a
                dedicated X-ray room, a fully equipped surgical theater with
                isoflurane anesthesia, a diagnostic lab, and an intensive care
                unit — all under one roof.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                What began as a makeshift rooftop operation has grown into a
                professional-grade clinic capable of performing complex
                orthopedic surgeries that most wildlife rescue facilities cannot
                attempt.
              </p>
              <a
                href="/our-specialty"
                className="inline-flex items-center gap-2 text-teal font-semibold mt-4 hover:gap-3 transition-all"
              >
                Learn About Our Surgical Techniques <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Equipment cards */}
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

      {/* ─── Enclosures & Bird Housing ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Enclosures & Aviary Complex"
            subtitle="Purpose-built housing for every stage of rehabilitation, from intensive care to pre-release flight conditioning."
          />

          {/* Two-column intro (reversed) */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                A Home for Every Stage
              </h3>
              <p className="mt-4 text-slate leading-relaxed">
                Recovery doesn&apos;t end in the operating room. Our aviary
                complex provides specialized housing for every phase of a
                bird&apos;s rehabilitation — from padded recovery cages for
                post-surgical patients to sprawling flight aviaries where
                healed birds rebuild their strength before release.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                The facility also includes a dedicated chick nursery for
                orphaned hatchlings, species-specific raptor enclosures, and
                open-air conditioning pens that simulate natural environments.
                Birds that cannot be released due to permanent disabilities
                receive lifelong care in comfortable, purpose-built housing.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-teal-light to-teal/5 rounded-xl flex items-center justify-center border border-teal/10">
              <div className="text-center p-8">
                <Camera size={48} className="text-teal/30 mx-auto mb-3" />
                <p className="text-slate text-sm">
                  Aviary Complex — Photo Placeholder
                </p>
              </div>
            </div>
          </div>

          {/* Enclosure cards */}
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

      {/* ─── A Day at the Facility ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="A Bird's Journey Through Our Facility"
            subtitle="From arrival to release — every step of the rehabilitation process happens under our roof."
          />

          <div className="max-w-3xl mx-auto">
            {FACILITY_JOURNEY.map((item, index) => (
              <div key={item.step} className="relative flex gap-6 pb-10">
                {/* Connecting line */}
                {index < FACILITY_JOURNEY.length - 1 && (
                  <div className="absolute left-[23px] top-12 w-0.5 h-full bg-teal/20" />
                )}

                {/* Step number */}
                <div className="shrink-0 w-12 h-12 bg-teal rounded-full flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-poppins)] z-10">
                  {item.step}
                </div>

                {/* Content */}
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
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Us Expand Our Facility
          </h2>
          <p className="mt-3 text-white/80">
            Your donation funds new enclosures, equipment upgrades, and expanded
            capacity to rescue more birds every year.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
