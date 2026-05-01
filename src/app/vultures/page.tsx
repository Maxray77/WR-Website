import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Bird,
  Heart,
  Shield,
  ArrowRight,
  TrendingDown,
  Skull,
  Leaf,
  Activity,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Vulture Conservation — Saving South Asia's Endangered Vultures",
  description:
    "India's vulture populations crashed 99.7% since the 1990s due to diclofenac poisoning. Learn about the crisis and how Wildlife Rescue is working to save endangered vulture species in Delhi.",
};

/* ─── Data ─── */

const INDIA_VULTURE_SPECIES = [
  {
    name: "White-rumped Vulture",
    scientific: "Gyps bengalensis",
    status: "CR" as const,
    statusLabel: "Critically Endangered",
    threats: "Diclofenac poisoning, food source decline, habitat degradation",
    note: "Bore the brunt of the diclofenac crisis — crashed 99.9% from being the most abundant large raptor on Earth",
    image: "/vultures/white-rumped-vulture.jpg",
    imageCredit: "Petra Karstedt / CC BY-SA 1.0",
  },
  {
    name: "Indian Vulture",
    scientific: "Gyps indicus",
    status: "CR" as const,
    statusLabel: "Critically Endangered",
    threats: "Diclofenac poisoning, habitat loss, declining food sources",
    note: "Also called Long-billed Vulture — one of three Gyps species decimated by diclofenac; declined 97.4% from 1992–2003",
    image: "/vultures/indian-vulture.jpg",
    imageCredit: "Yathin sk / CC BY-SA 3.0",
  },
  {
    name: "Slender-billed Vulture",
    scientific: "Gyps tenuirostris",
    status: "CR" as const,
    statusLabel: "Critically Endangered",
    threats: "Diclofenac poisoning, habitat loss, food scarcity",
    note: "Rarest of the three diclofenac-hit Gyps species — estimated just 150–200 breeding pairs remain globally",
    image: "/vultures/slender-billed-vulture.jpg",
    imageCredit: "gailhampshire / CC BY 2.0",
  },
  {
    name: "Red-headed Vulture",
    scientific: "Sarcogyps calvus",
    status: "CR" as const,
    statusLabel: "Critically Endangered",
    threats: "Diclofenac poisoning, active persecution for traditional medicine, habitat loss",
    note: "Compounded crisis: diclofenac plus persecution for traditional medicine; solitary habits make nest protection harder",
    image: "/vultures/red-headed-vulture.jpg",
    imageCredit: "Vishal Sabharwal / CC BY-SA 3.0",
  },
  {
    name: "Egyptian Vulture",
    scientific: "Neophron percnopterus",
    status: "EN" as const,
    statusLabel: "Endangered",
    threats: "Electrocution, diclofenac, pesticide exposure",
    note: "Unique 'dual jeopardy' — threatened on South Asian wintering grounds AND European/Middle Eastern breeding grounds",
    image: "/vultures/egyptian-vulture.jpg",
    imageCredit: "J.M.Garg / CC BY-SA 3.0",
  },
  {
    name: "Cinereous Vulture",
    scientific: "Aegypius monachus",
    status: "VU" as const,
    statusLabel: "Vulnerable",
    threats: "Global population decline, habitat loss in breeding range, NSAID exposure on wintering grounds",
    note: "Winter visitor only — its global decline reduces how many birds even arrive in India each season",
    image: "/vultures/cinereous-vulture.jpg",
    imageCredit: "Alastair Rae / CC BY-SA 2.0",
  },
  {
    name: "Bearded Vulture",
    scientific: "Gypaetus barbatus",
    status: "NT" as const,
    statusLabel: "Near Threatened",
    threats: "Habitat destruction, poisoning, food source decline",
    note: "Also called Lammergeier — feeds primarily on bones; restricted to Himalayan ranges in India",
    image: "/vultures/bearded-vulture.jpg",
    imageCredit: "Richard Bartz / CC BY-SA 2.5",
  },
  {
    name: "Himalayan Vulture",
    scientific: "Gyps himalayensis",
    status: "LC" as const,
    statusLabel: "Least Concern",
    threats: "Power line electrocution, NSAID exposure from plains, habitat disturbance",
    note: "Relative success story (Least Concern) — but power line electrocution and winter NSAID exposure from the plains are eroding even its numbers",
    image: "/vultures/himalayan-vulture.jpg",
    imageCredit: "gailhampshire / CC BY 2.0",
  },
  {
    name: "Eurasian Griffon Vulture",
    scientific: "Gyps fulvus",
    status: "VU" as const,
    statusLabel: "Vulnerable (India)",
    threats: "Habitat loss, poisoning, collision with power infrastructure",
    note: "Declining in Central Asia; its global range contraction reduces winter visitor numbers in India",
    image: "/vultures/eurasian-griffon-vulture.jpg",
    imageCredit: "H. Zell / CC BY-SA 3.0",
  },
];

const STATUS_COLORS = {
  CR: "bg-red-100 text-red-700 border-red-200",
  EN: "bg-orange-100 text-orange-700 border-orange-200",
  VU: "bg-yellow-100 text-yellow-700 border-yellow-200",
  NT: "bg-blue-100 text-blue-700 border-blue-200",
  LC: "bg-green-100 text-green-700 border-green-200",
} as const;

const WR_INTAKE_DATA = [
  { year: "2020", vultures: 6, total: 2489 },
  { year: "2021", vultures: 5, total: 2767 },
  { year: "2022", vultures: 4, total: 3385 },
  { year: "2023", vultures: 5, total: 3383 },
  { year: "2024", vultures: 7, total: 3685 },
  { year: "2025*", vultures: 4, total: 1727 },
];

const CRISIS_TIMELINE = [
  {
    year: "1990s",
    event: "Vulture populations begin crashing across South Asia",
    detail:
      "Mysterious mass die-offs observed. White-rumped Vulture — once described as 'possibly the most abundant large bird of prey in the world' — starts disappearing.",
  },
  {
    year: "2003",
    event: "Diclofenac identified as the cause",
    detail:
      "Scientists discover that diclofenac, a common veterinary painkiller given to livestock, causes fatal kidney failure in vultures that feed on treated carcasses.",
  },
  {
    year: "2004",
    event: "Egyptian Vulture reclassified to Endangered",
    detail:
      "IUCN Red List upgrades Egyptian Vulture from Least Concern to Endangered as Indian populations show >35% annual decline. Road transect counts dropped 68% between 2000-2003.",
  },
  {
    year: "2006",
    event: "India bans veterinary diclofenac",
    detail:
      "The Indian government bans diclofenac for veterinary use. However, illegal use continues and human-formulation diclofenac is often diverted for animal treatment.",
  },
  {
    year: "2014",
    event: "Signs of hope — decline may be slowing",
    detail:
      "Galligan et al. (2014) report indications that Egyptian Vulture declines appear to have slowed after the ban, though small numbers make conclusions less robust.",
  },
  {
    year: "Today",
    event: "Every vulture matters — conservation is urgent",
    detail:
      "India's 4 Critically Endangered vulture species remain at dangerously low numbers. An estimated 12,400-36,000 Egyptian Vultures survive globally.",
  },
];

/* ─── Page ─── */

export default function VulturesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-charcoal via-teal-dark to-teal py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <AlertTriangle size={14} className="inline mr-1.5 -mt-0.5" />
            Conservation Priority
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Saving South Asia&apos;s Vultures
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            Once numbering in the millions, South Asia&apos;s vulture populations
            have suffered the most catastrophic decline of any bird group in
            recorded history.
          </p>

          {/* Dramatic Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "99.7%", label: "Population decline since 1990s" },
              { value: "9", label: "Vulture species in India" },
              { value: "4", label: "Critically Endangered" },
              { value: "31", label: "Vultures treated by WR (2020-25)" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="text-3xl font-bold text-amber font-[family-name:var(--font-poppins)]">
                  {stat.value}
                </div>
                <p className="text-xs text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Crisis ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Diclofenac Catastrophe"
            subtitle="How a common painkiller nearly wiped out an entire group of species."
          />

          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
              <div className="flex gap-3 items-start">
                <Skull size={24} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800">What happened?</h3>
                  <p className="text-red-700 text-sm mt-1 leading-relaxed">
                    Diclofenac, a non-steroidal anti-inflammatory drug (NSAID)
                    widely used to treat livestock pain, is lethal to vultures.
                    When vultures feed on the carcasses of animals treated with
                    diclofenac shortly before death, the drug causes acute
                    kidney failure — killing vultures within days. This single
                    drug drove the White-rumped Vulture from being the most
                    abundant large raptor on Earth to near-extinction.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {CRISIS_TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        i === CRISIS_TIMELINE.length - 1
                          ? "bg-teal text-white"
                          : "bg-charcoal text-white"
                      }`}
                    >
                      {item.year.length <= 5 ? item.year : item.year.slice(0, 4)}
                    </div>
                    {i < CRISIS_TIMELINE.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 min-h-[40px]" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-bold text-charcoal">
                      {item.year}: {item.event}
                    </h3>
                    <p className="text-sm text-slate mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate mt-4 italic">
              Sources: IUCN Red List (BirdLife International, 2021); Galligan
              et al. (2014) Bird Conservation International; Kumar et al.
              (2026) EcoHealth; Oaks et al. (2004); Prakash et al. (2003).
            </p>
          </div>
        </div>
      </section>

      {/* ─── India's 9 Vulture Species ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="India's 9 Vulture Species"
            subtitle="Four are Critically Endangered. One is Endangered. None are safe."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDIA_VULTURE_SPECIES.map((species) => (
              <div
                key={species.name}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Photo */}
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-charcoal/5 to-teal/10">
                  {species.image ? (
                    <>
                      <Image
                        src={species.image}
                        alt={species.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {species.imageCredit && (
                        <span className="absolute bottom-1 right-2 text-[10px] text-white/60 bg-black/30 px-1 rounded">
                          {species.imageCredit}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Bird size={48} className="text-teal/30" />
                      <span className="text-xs text-slate/60 mt-2">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                        {species.name}
                      </h3>
                      <p className="text-xs text-slate italic">
                        {species.scientific}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        STATUS_COLORS[species.status]
                      }`}
                    >
                      {species.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">
                    {species.note}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-slate">
                      <span className="font-semibold text-charcoal">
                        Threats:
                      </span>{" "}
                      {species.threats}
                    </p>
                  </div>
                  {species.name === "Egyptian Vulture" && (
                    <Link
                      href="/species/egyptian-vulture"
                      className="inline-flex items-center gap-1 text-xs text-teal font-semibold mt-3 hover:text-teal-dark transition-colors"
                    >
                      View full profile
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate mt-6 italic">
            Conservation status per IUCN Red List. CR = Critically Endangered,
            EN = Endangered, VU = Vulnerable, NT = Near Threatened, LC = Least Concern.
            <br />
            Source: Kumar et al. (2026) EcoHealth; IUCN (2021).
          </p>
        </div>
      </section>

      {/* ─── Key Differences by Species ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Key Differences by Species"
            subtitle="Not all vultures face the same threats — understanding these distinctions shapes how we treat and advocate for each one."
          />
          <div className="max-w-4xl mx-auto grid gap-5">
            {[
              {
                label: "The Diclofenac Trio",
                species: "White-rumped, Long-billed & Slender-billed Vultures",
                text: "These three Gyps species bore the brunt of the diclofenac crisis and are all Critically Endangered. A single contaminated carcass can wipe out an entire flock — they feed communally, so the toxin spreads through dozens of birds at once. Their recovery depends entirely on the permanent ban of veterinary diclofenac and its replacement with meloxicam.",
                color: "border-red-400 bg-red-50",
                labelColor: "text-red-700",
              },
              {
                label: "Compounded Crisis",
                species: "Red-headed Vulture",
                text: "Diclofenac hit it hard, but this species also faces active persecution — hunted for use in traditional medicine and witchcraft practices. Unlike the communal Gyps species, Red-headed Vultures are largely solitary, making it harder for rangers and rescuers to locate and protect nesting pairs.",
                color: "border-orange-400 bg-orange-50",
                labelColor: "text-orange-700",
              },
              {
                label: "Dual Jeopardy",
                species: "Egyptian Vulture",
                text: "Unlike India's other vultures, the Egyptian Vulture migrates — spending winters on the Indian subcontinent and breeding in Europe and the Middle East. This means it faces threats on two separate fronts simultaneously: persecution and poisoning in Africa and the Middle East during migration, and NSAID exposure and electrocution in South Asia during winter.",
                color: "border-amber-400 bg-amber-50",
                labelColor: "text-amber-700",
              },
              {
                label: "Relative Success Story — But Not Safe",
                species: "Himalayan Griffon",
                text: "Currently the only Least Concern vulture in South Asia — its high-altitude breeding range kept it somewhat insulated from the plains-based diclofenac crisis. But power line electrocution and winter NSAID exposure as it descends to lower elevations are eroding even its numbers. 'Least Concern' today does not mean safe tomorrow.",
                color: "border-teal/40 bg-teal-light",
                labelColor: "text-teal-dark",
              },
              {
                label: "Global Decline, Local Impact",
                species: "Cinereous (Black) Vulture",
                text: "India receives Cinereous Vultures only as winter visitors — it does not breed here. Its global population decline in Europe and Central Asia directly reduces how many birds arrive in India each season. This species is a living barometer of conservation success thousands of kilometres away.",
                color: "border-slate/40 bg-gray-50",
                labelColor: "text-charcoal",
              },
            ].map((item) => (
              <div
                key={item.species}
                className={`rounded-xl border-l-4 p-5 ${item.color}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wide ${item.labelColor}`}>
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-charcoal">
                    {item.species}
                  </span>
                </div>
                <p className="text-sm text-slate leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WR's Vulture Rescue Work ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Wildlife Rescue's Vulture Work"
            subtitle="Every vulture case is treated as a critical conservation priority."
          />

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Intake Data Table */}
            <div>
              <h3 className="text-lg font-bold text-charcoal mb-4 font-[family-name:var(--font-poppins)]">
                <Activity
                  size={20}
                  className="inline text-teal mr-2 -mt-0.5"
                />
                Egyptian Vulture Intake — Actual WR Case Records
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-teal text-white">
                      <th className="py-3 px-4 text-left font-semibold">
                        Year
                      </th>
                      <th className="py-3 px-4 text-right font-semibold">
                        Egyptian Vultures
                      </th>
                      <th className="py-3 px-4 text-right font-semibold">
                        Total Birds
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WR_INTAKE_DATA.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-gray-100 hover:bg-offwhite transition-colors"
                      >
                        <td className="py-2.5 px-4 text-charcoal font-medium">
                          {row.year}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-teal">
                          {row.vultures}
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate">
                          {row.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-charcoal text-white font-bold">
                      <td className="py-3 px-4">Total</td>
                      <td className="py-3 px-4 text-right text-amber">31</td>
                      <td className="py-3 px-4 text-right">17,436</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate mt-2 italic">
                * 2025 data is year-to-date. Source: WR intake records
                (5&nbsp;Year.xlsx).
              </p>
            </div>

            {/* Context Cards */}
            <div className="space-y-4">
              <div className="bg-amber-bg rounded-xl p-6">
                <h3 className="font-bold text-charcoal mb-2">
                  <Shield
                    size={18}
                    className="inline text-amber mr-2 -mt-0.5"
                  />
                  Why Every Vulture Counts
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  With only an estimated 12,400-36,000 Egyptian Vultures
                  remaining globally, each individual is significant for species
                  survival. Wildlife Rescue treats every vulture case as the
                  highest priority — they receive immediate triage, specialized
                  housing, and extended rehabilitation.
                </p>
              </div>

              <div className="bg-teal-light rounded-xl p-6">
                <h3 className="font-bold text-charcoal mb-2">
                  <Activity
                    size={18}
                    className="inline text-teal mr-2 -mt-0.5"
                  />
                  Common Injuries We Treat
                </h3>
                <ul className="text-sm text-charcoal space-y-1.5">
                  <li>
                    <span className="font-semibold">Vehicle collisions</span> —
                    fractured wings and legs from road impacts
                  </li>
                  <li>
                    <span className="font-semibold">Electrocution</span> — burns
                    and injuries from power lines (a leading cause globally)
                  </li>
                  <li>
                    <span className="font-semibold">
                      Kite string injuries
                    </span>{" "}
                    — manja entanglement during festival seasons
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-charcoal mb-2">
                  Sultan&apos;s Story
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  Sultan, an Egyptian Vulture (Case #34,207), arrived at
                  Wildlife Rescue with a fractured wing from a vehicle
                  collision. As an Endangered species, his case was immediately
                  escalated to critical priority.
                </p>
                <Link
                  href="/special-cases"
                  className="inline-flex items-center gap-1 text-sm text-teal font-semibold mt-3 hover:text-teal-dark transition-colors"
                >
                  Read more rescue stories
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Vultures Matter ─── */}
      <section className="bg-gradient-to-br from-amber/5 via-amber-bg to-amber/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Vultures Matter"
            subtitle="Nature's most efficient cleanup crew — and why their loss affects us all."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Leaf size={28} />,
                title: "Nature's Cleanup Crew",
                text: "A group of vultures can strip a cattle carcass in 30-40 minutes, preventing disease spread. Their highly acidic stomachs (pH ~1) safely destroy anthrax, botulism, and cholera bacteria.",
              },
              {
                icon: <TrendingDown size={28} />,
                title: "The Rabies Connection",
                text: "When vultures disappeared, feral dog populations exploded — feeding on carcasses vultures once consumed. India saw a surge in rabies cases, with an estimated $34 billion annual economic burden.",
              },
              {
                icon: <Heart size={28} />,
                title: "Cultural Significance",
                text: "Vultures hold deep cultural importance in South Asian traditions, including Zoroastrian sky burials (Towers of Silence) and Hindu beliefs. Their disappearance disrupted centuries-old practices.",
              },
              {
                icon: <Shield size={28} />,
                title: "Ecosystem Indicator",
                text: "As apex scavengers, vultures indicate ecosystem health. Their decline signals broader environmental degradation — from toxic chemicals in the food chain to habitat destruction.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-teal mb-3">{card.icon}</div>
                <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate mt-6 italic">
            Sources: Markandya et al. (2008); Ogada et al. (2012); Purohit
            &amp; Saran (2013); Houston (2001).
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bird size={48} className="text-amber mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Us Protect Vultures
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Your donation directly funds the rescue, treatment, and
            rehabilitation of endangered vultures at Wildlife Rescue in Delhi.
            Every rupee counts toward saving these irreplaceable birds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <DonateButton size="lg" />
            <Link
              href="/species/egyptian-vulture"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-teal transition-all duration-300 text-center"
            >
              Egyptian Vulture Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
