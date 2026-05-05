import type { Metadata } from "next";
import Image from "next/image";
import { Scissors, Microscope, Syringe, Award, ArrowRight, Camera } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Specialty — Avian Orthopedic Innovation",
  description:
    "Wildlife Rescue pioneered novel surgical techniques for repairing raptor wings damaged by kite strings. Our methods are now adopted by rehabilitators worldwide.",
};

const TECHNIQUES = [
  {
    title: "Novel Wing Repair Surgery",
    description:
      "Our signature technique repairs wings severely damaged by manja (glass-coated kite string) that severs skin, muscles, tendons, nerves, and bones. This procedure ensures birds retain full flying ability post-surgery.",
    detail:
      "Presented at NWRA Annual Symposium 2018 (Los Angeles) and refined technique at NWRA 2025 (Seattle). Now adopted by rehabilitators and veterinarians globally.",
    icon: <Scissors size={28} />,
  },
  {
    title: "Diagnostic Imaging",
    description:
      "On-site X-ray machine enables rapid diagnosis of fractures, dislocations, and internal injuries. Critical for triage decisions on the 11+ birds arriving daily.",
    detail:
      "Immediate imaging means faster treatment decisions and better outcomes for critically injured birds.",
    icon: <Microscope size={28} />,
  },
  {
    title: "Anesthesia & Surgical Suite",
    description:
      "Full isoflurane anesthesia setup for safe surgical procedures. Hematocrit centrifuge for blood analysis and monitoring bird health throughout treatment.",
    detail:
      "Professional-grade equipment enables complex surgeries that most wildlife rescue facilities cannot perform.",
    icon: <Syringe size={28} />,
  },
];

const MEDICAL_CONDITIONS = [
  {
    category: "Manja (Kite String) Injuries",
    description:
      "Glass-coated kite strings sever skin, muscles, tendons, nerves, and bones. The #1 cause of raptor injuries in Delhi, especially during Independence Day and Uttarayan festivals.",
    percentage: "~40%",
  },
  {
    category: "Orphaned & Fallen Chicks",
    description:
      "Baby birds that fall from nests need specialized housing, feeding, and gentle care. The goal is always early release once flight-capable.",
    percentage: "~25%",
  },
  {
    category: "Collision & Electrocution",
    description:
      "Vehicle collisions, window strikes, wall impacts, and wet-wire electrocution during monsoon season cause fractures and internal injuries.",
    percentage: "~20%",
  },
  {
    category: "Disease & Infection",
    description:
      "Avian Pox, septicemia, cataracts, bumblefoot, edema, paralysis, and Metabolic Bone Disease require ongoing medical treatment.",
    percentage: "~10%",
  },
  {
    category: "Entanglement & Other",
    description:
      "Birds trapped in thread, stuck in glue traps, suffering burns, emaciation, dehydration, or contaminated feathers.",
    percentage: "~5%",
  },
];

export default function OurSpecialtyPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Internationally Recognized Techniques
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Our Specialty
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Pioneering avian orthopedic techniques that are saving raptors in
            Delhi and being adopted by rehabilitators worldwide.
          </p>
        </div>
      </section>

      {/* ─── Innovation Highlight ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-bg rounded-2xl p-8 lg:p-12 border border-amber/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Award size={40} className="text-amber mb-4" />
                <h2 className="text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  Self-Taught to World-Class
                </h2>
                <p className="mt-4 text-slate leading-relaxed">
                  Nadeem and Saud are not veterinarians. They taught themselves
                  raptor medicine through decades of hands-on experience,
                  learning from experts worldwide, and relentless
                  research. Their novel surgical technique for repairing
                  wings damaged by kite strings is now received well by rehabilitators
                  and veterinarians globally.
                </p>
                <p className="mt-4 text-slate leading-relaxed">
                  Their work has been presented at the National Wildlife
                  Rehabilitators Association (NWRA) Annual Symposium — first in
                  Los Angeles (2018) and then a refined technique in Seattle
                  (2025).
                </p>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-br from-amber/10 to-amber/5 rounded-xl flex items-center justify-center border border-amber/20">
                <div className="text-center p-8">
                  <Scissors size={48} className="text-amber mx-auto mb-3" />
                  <p className="text-slate text-sm">
                    Surgery in Progress — Photo Placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Techniques & Equipment ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Techniques & Equipment"
            subtitle="Professional-grade capabilities that set us apart."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNIQUES.map((tech) => (
              <div
                key={tech.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {tech.title}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {tech.description}
                </p>
                <p className="text-xs text-teal mt-3 font-medium leading-relaxed">
                  {tech.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What We Treat ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Treat"
            subtitle="The medical conditions and injuries we see most often."
          />

          <div className="space-y-4">
            {MEDICAL_CONDITIONS.map((condition) => (
              <div
                key={condition.category}
                className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <div className="shrink-0 w-16 h-16 bg-danger/10 rounded-xl flex items-center justify-center">
                  <span className="text-danger font-bold text-lg font-[family-name:var(--font-poppins)]">
                    {condition.percentage}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {condition.category}
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    {condition.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Rescue Vehicle ─── */}
      <section className="bg-teal-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
            Emergency Rescue Vehicle
          </h2>
          <p className="mt-4 text-slate max-w-lg mx-auto">
            Our Tata EV with Wildlife Rescue branding enables rapid response
            across Delhi — collecting injured birds from partner hospitals,
            community hotspots, and citizen rescuers.
          </p>
          <div className="mt-8 max-w-2xl mx-auto rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/rescue-vehicle.jpg"
              alt="Wildlife Rescue emergency vehicle — Tata EV with owl logo branding, parked outside the rescue center on Street No. 9, Wazirabad Village"
              width={1280}
              height={560}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Case Studies ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Case Studies"
            subtitle="Real cases showcasing our techniques in action."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                caseNo: "#12674",
                title: "Black Kite — Manja Wing Laceration",
                description:
                  "Severe wing damage from glass-coated kite string. Novel surgical technique used to repair severed tendons and muscles. Full flight capability restored after 6 weeks of rehabilitation.",
                outcome: "Released",
              },
              {
                caseNo: "#12869",
                title: "Black Kite — Compound Wing Fracture",
                description:
                  "Complex fracture requiring surgical pin placement and careful post-operative care. X-ray imaging guided the procedure. Bird regained flight after 8 weeks.",
                outcome: "Released",
              },
              {
                caseNo: "#12879",
                title: "Black Kite — Electrocution Burns",
                description:
                  "Severe burns from wet-wire electrocution during monsoon. Required wound management, infection control, and extended rehabilitation period.",
                outcome: "Released",
              },
            ].map((study) => (
              <div
                key={study.caseNo}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={32} className="text-teal/30 mx-auto mb-2" />
                    <span className="text-slate text-sm">Photo / Video Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-slate bg-gray-100 px-2 py-0.5 rounded">
                      {study.caseNo}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-green-50 text-success rounded-full">
                      {study.outcome}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate mt-2 leading-relaxed">
                    {study.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/special-cases"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all"
            >
              View All Rescue Stories <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Fund Our Life-Saving Equipment
          </h2>
          <p className="mt-3 text-white/80">
            Your donation helps maintain and upgrade the medical equipment that
            saves thousands of birds each year.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
