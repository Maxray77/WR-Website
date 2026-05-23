import { Info, Egg } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  CLINICAL_AGES,
  CLINICAL_TOTAL_CASES,
  JUVENILE_CONDITIONS,
} from "@/lib/case-records-data";

// Life-stage order, oldest to youngest, for visual flow on the cards row.
const STAGE_ORDER = ["Adult", "Juvenile", "Fledgling", "Nestling", "Hatchling"];

const STYLE: Record<string, { colour: string; description: string }> = {
  Adult: {
    colour: "bg-teal-dark",
    description:
      "Birds that arrive after full development — typically the manja-injury and collision cases.",
  },
  Juvenile: {
    colour: "bg-teal",
    description:
      "Post-fledging, first year of life. Still learning to hunt and navigate Delhi's airspace.",
  },
  Fledgling: {
    colour: "bg-amber",
    description:
      "Feathered but not yet confident flyers — easily found grounded or injured.",
  },
  Nestling: {
    colour: "bg-amber-light",
    description:
      "Still in the nest, mostly featherless. Most common reason for orphan rescue calls.",
  },
  Hatchling: {
    colour: "bg-danger/70",
    description:
      "Just hatched, completely dependent. Survival depends on rapid intake.",
  },
};

export default function IntakeAgeSection() {
  const stages = STAGE_ORDER
    .map((name) => CLINICAL_AGES.find((a) => a.name === name))
    .filter((s): s is { name: string; cases: number } => s !== undefined);

  const totalAged = stages.reduce((s, x) => s + x.cases, 0);
  const adult = stages.find((s) => s.name === "Adult");
  const juvenileTotal = stages
    .filter((s) => s.name !== "Adult")
    .reduce((s, x) => s + x.cases, 0);
  const juvenilePct = ((juvenileTotal / totalAged) * 100).toFixed(1);

  // For the MBD callout
  const mbdJuv = JUVENILE_CONDITIONS.find(
    (c) => c.name === "Metabolic Bone Disease"
  );
  const mbdPct = mbdJuv
    ? ((mbdJuv.cases / juvenileTotal) * 100).toFixed(1)
    : "0";

  return (
    <section className="bg-offwhite py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Who Arrives at Our Door"
          subtitle="Adults, juveniles, fledglings, nestlings, and hatchlings — life stage matters for treatment."
        />

        {/* Headline */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-4">
          Across{" "}
          <strong className="text-charcoal">
            {totalAged.toLocaleString()}
          </strong>{" "}
          clinical records with documented life stage,{" "}
          <strong className="text-amber">
            roughly 1 in 3 birds we rescue is a juvenile
          </strong>
          .
        </p>

        {/* Seasonal causes — what brings juveniles to our door */}
        <div className="max-w-4xl mx-auto mb-10 grid gap-3 sm:grid-cols-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber">
              Summer
            </p>
            <p className="text-sm text-charcoal font-semibold mt-1">
              Heat &amp; Dehydration
            </p>
            <p className="text-xs text-slate mt-1.5 leading-relaxed">
              Delhi&apos;s extreme summer heat dehydrates young birds that
              haven&apos;t yet learned to find water in the city.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber">
              April–May
            </p>
            <p className="text-sm text-charcoal font-semibold mt-1">
              Dust Storms
            </p>
            <p className="text-xs text-slate mt-1.5 leading-relaxed">
              Dry, dusty pre-monsoon storms knock nests out of trees — sending
              nestlings and hatchlings to the ground in waves.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber">
              Monsoon
            </p>
            <p className="text-sm text-charcoal font-semibold mt-1">
              Kite-flying Season
            </p>
            <p className="text-xs text-slate mt-1.5 leading-relaxed">
              The paper-kite festivals coincide with juveniles taking their
              first flights. Inexperienced fledglings can&apos;t avoid the
              manja thread — and arrive with the same wing injuries we see
              in adults.
            </p>
          </div>
        </div>

        {/* Source note */}
        <div className="max-w-3xl mx-auto mb-12 bg-teal-light border border-teal/20 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-teal-dark mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed">
            <strong>About this data:</strong> Life stage is recorded
            structurally on each case record — not inferred from the condition
            text. These figures count the{" "}
            {CLINICAL_TOTAL_CASES.toLocaleString()} cases between 2019 and 2025
            where staff explicitly assigned a stage.
          </div>
        </div>

        {/* Life-stage cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 max-w-6xl mx-auto mb-12">
          {stages.map((stage) => {
            const style = STYLE[stage.name];
            const pct = ((stage.cases / totalAged) * 100).toFixed(1);
            return (
              <div
                key={stage.name}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:border-teal/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${style.colour} mb-3`}
                  aria-hidden
                />
                <h4 className="font-bold text-charcoal text-sm font-[family-name:var(--font-poppins)]">
                  {stage.name}
                </h4>
                <p className="text-2xl font-bold text-teal-dark mt-1.5 font-mono">
                  {stage.cases.toLocaleString()}
                </p>
                <p className="text-xs text-slate mt-0.5">
                  {pct}% of intake
                </p>
                <p className="text-xs text-slate mt-3 leading-relaxed border-t border-gray-100 pt-3">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* MBD callout — Delhi food shortage narrative */}
        {mbdJuv && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border-l-4 border-danger/70 border-y border-r border-gray-100 p-6 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
                <Egg size={24} className="text-danger" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  A clinical signal from urban Delhi
                </h3>
                <p className="text-sm text-amber font-mono font-bold mt-1">
                  {mbdJuv.cases.toLocaleString()} juveniles arrive with
                  Metabolic Bone Disease — about {mbdPct}% of all juvenile
                  cases.
                </p>
                <p className="text-sm text-slate mt-3 leading-relaxed">
                  Metabolic Bone Disease in young raptors reflects a calcium-
                  and nutrient-deficient diet during the rapid-growth phase.
                  The pattern points to a natural prey shortage in Delhi&apos;s
                  airspace: parent kites can&apos;t find enough nutrient-rich
                  food to feed growing chicks. By the time these juveniles
                  reach us, their developing bones are already compromised.
                </p>
                <p className="text-xs text-slate mt-3 italic leading-relaxed">
                  MBD cannot be reversed. Only early-stage cases can be
                  stopped in their tracks — managed with corrective diet and
                  supportive care to prevent further degradation, and
                  released if the bird can still manage flight. For birds
                  that arrive too late, the damage is permanent — and the
                  underlying environmental cause is one we can&apos;t treat
                  in the clinic alone.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What juveniles present with */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-base font-bold text-charcoal text-center mb-4 font-[family-name:var(--font-poppins)]">
            What our juvenile cases present with
          </h3>
          <p className="text-xs text-slate text-center mb-6 max-w-2xl mx-auto">
            Same {juvenileTotal.toLocaleString()} juvenile-stage cases, sliced
            by clinical condition. Many fit multiple categories at once.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {JUVENILE_CONDITIONS.map((c) => {
              const pct = ((c.cases / juvenileTotal) * 100).toFixed(1);
              return (
                <div
                  key={c.name}
                  className="bg-white rounded-lg border border-gray-100 p-3 text-center"
                >
                  <p className="text-xl font-bold text-teal-dark font-mono">
                    {c.cases.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate font-semibold mt-0.5">
                    {pct}%
                  </p>
                  <p className="text-xs text-charcoal mt-1.5 leading-snug">
                    {c.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
