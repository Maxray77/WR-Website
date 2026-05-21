import { Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { AGE_BREAKDOWN, INTAKE_CASES_WITH_AGE } from "@/lib/intake-data";

// Lay out the explicit life-stage cases (excluding "Adult (implied)" — that's
// not a real measurement, it's just "no age was recorded"). Showing it as a
// dominant 94.5% bar creates a false impression that we actually know those
// birds were adults. We don't.

const STAGE_ORDER = ["Hatchling", "Nestling", "Fledgling", "Juvenile"];

const STYLE: Record<string, { colour: string; description: string }> = {
  Hatchling: {
    colour: "bg-danger/70",
    description:
      "Just hatched, completely dependent. Survival rate depends heavily on rapid intake.",
  },
  Nestling: {
    colour: "bg-amber-light",
    description:
      "Still in the nest, mostly featherless. Most common reason for orphan rescue calls.",
  },
  Fledgling: {
    colour: "bg-amber",
    description:
      "Feathered out and leaving the nest, but not yet a confident flyer — easily found injured or grounded.",
  },
  Juvenile: {
    colour: "bg-teal",
    description:
      "Post-fledging, learning independence in their first year of life.",
  },
};

export default function IntakeAgeSection() {
  // Pull stages in deliberate life-stage order, not by count
  const stages = STAGE_ORDER
    .map((name) => AGE_BREAKDOWN.find((a) => a.name === name))
    .filter((s): s is { name: string; cases: number } => s !== undefined);

  const totalYoung = stages.reduce((s, x) => s + x.cases, 0);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Chicks & Juveniles"
          subtitle="Over 17 years, we've cared for thousands of orphaned and grounded young birds."
        />

        {/* Headline — meaningful denominator */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-8">
          We&apos;ve documented{" "}
          <strong className="text-amber">
            {totalYoung.toLocaleString()} chicks and juveniles
          </strong>{" "}
          rescued across our records — orphaned hatchlings, nestlings knocked
          from trees, and fledglings unable to fly. Most arrive during
          monsoon and post-monsoon season, when storms strip nests apart.
        </p>

        {/* Caveat — honest about what we DON'T know */}
        <div className="max-w-3xl mx-auto mb-12 bg-teal-light border border-teal/20 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-teal-dark mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed">
            <strong>About this data:</strong> These figures count only cases
            where staff explicitly recorded the life stage. The remaining
            ~37,000 cases over 17 years are adults and birds where age was
            not formally tagged — adult intake far outweighs chick intake in
            sheer volume, but the chick figures here are the ones we can
            cite with confidence.
          </div>
        </div>

        {/* Life-stage cards — ordered by life stage, percentages of documented subset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {stages.map((stage) => {
            const style = STYLE[stage.name];
            const pct = ((stage.cases / INTAKE_CASES_WITH_AGE) * 100).toFixed(1);
            return (
              <div
                key={stage.name}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:border-teal/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${style.colour} mb-3`}
                  aria-hidden
                />
                <h4 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {stage.name}
                </h4>
                <p className="text-3xl font-bold text-teal-dark mt-2 font-mono">
                  {stage.cases.toLocaleString()}
                </p>
                <p className="text-xs text-slate mt-0.5">
                  {pct}% of documented young birds
                </p>
                <p className="text-xs text-slate mt-3 leading-relaxed border-t border-gray-100 pt-3">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
