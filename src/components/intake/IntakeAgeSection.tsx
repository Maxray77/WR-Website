import { Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { AGE_BREAKDOWN, INTAKE_CASES_WITH_AGE, INTAKE_TOTAL } from "@/lib/intake-data";

// Tags: order + colour for the age groups when they appear in the data.
const STYLE: Record<string, { colour: string; description: string }> = {
  "Adult (implied)": {
    colour: "bg-slate/60",
    description: "No explicit chick or juvenile marker on the record.",
  },
  Adult: {
    colour: "bg-teal-dark",
    description: "Mature birds, full plumage and flight ability.",
  },
  Juvenile: {
    colour: "bg-teal",
    description: "Post-fledging, learning independence (first year of life).",
  },
  Fledgling: {
    colour: "bg-amber",
    description:
      "Has feathered out and is leaving the nest, but cannot yet fly well — easily found injured or grounded.",
  },
  Nestling: {
    colour: "bg-amber-light",
    description:
      "Still in the nest, mostly featherless. Most common reason for orphan rescue calls.",
  },
  Hatchling: {
    colour: "bg-danger/70",
    description:
      "Just hatched, completely dependent. Survival rate depends heavily on rapid intake.",
  },
  Mix: {
    colour: "bg-slate",
    description: "Mix-breed kite — see Hybrid column in master data.",
  },
};

export default function IntakeAgeSection() {
  // Cases with explicit age (everything except "Adult (implied)")
  const documented = AGE_BREAKDOWN.filter((a) => a.name !== "Adult (implied)");
  const chickCases = documented
    .filter((a) => a.name !== "Juvenile" && a.name !== "Mix")
    .reduce((s, a) => s + a.cases, 0);
  const chickPctOfDocumented =
    ((chickCases / INTAKE_CASES_WITH_AGE) * 100).toFixed(0);
  const documentedPct = ((INTAKE_CASES_WITH_AGE / INTAKE_TOTAL) * 100).toFixed(1);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Who They Are"
          subtitle="Adults, juveniles, and orphaned chicks — the age demographics of those we save."
        />

        {/* Headline */}
        <p className="max-w-3xl mx-auto text-center text-slate text-lg leading-relaxed -mt-4 mb-8">
          Among cases with explicit age recorded,{" "}
          <strong className="text-amber">
            {chickPctOfDocumented}% are chicks
          </strong>{" "}
          — orphaned hatchlings, nestlings, and fledglings, most often during
          monsoon and post-monsoon breeding season when storms knock young birds
          from their nests.
        </p>

        {/* Caveat */}
        <div className="max-w-3xl mx-auto mb-12 bg-teal-light border border-teal/20 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-teal-dark mt-0.5 shrink-0" />
          <div className="text-xs text-charcoal leading-relaxed">
            <strong>About this data:</strong> Age is explicitly recorded for{" "}
            {INTAKE_CASES_WITH_AGE.toLocaleString()} cases ({documentedPct}% of
            our intake) — when staff specifically mark a bird as hatchling,
            nestling, fledgling, or juvenile. The remaining{" "}
            {(INTAKE_TOTAL - INTAKE_CASES_WITH_AGE).toLocaleString()} cases
            are treated as adults by default but may include some unmarked
            juveniles.
          </div>
        </div>

        {/* Age cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {AGE_BREAKDOWN.map((age) => {
            const style = STYLE[age.name] ?? {
              colour: "bg-slate/60",
              description: "",
            };
            const isImplied = age.name === "Adult (implied)";
            const pctOfTotal = ((age.cases / INTAKE_TOTAL) * 100).toFixed(1);
            const pctOfDocumented = !isImplied
              ? ((age.cases / INTAKE_CASES_WITH_AGE) * 100).toFixed(1)
              : null;
            return (
              <div
                key={age.name}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:border-teal/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${style.colour} mb-3`}
                  aria-hidden
                />
                <h4 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {age.name}
                </h4>
                <p className="text-2xl font-bold text-teal-dark mt-2 font-mono">
                  {age.cases.toLocaleString()}
                </p>
                <p className="text-xs text-slate mt-0.5">
                  {pctOfTotal}% of total intake
                  {pctOfDocumented && (
                    <span className="block">
                      {pctOfDocumented}% of age-documented cases
                    </span>
                  )}
                </p>
                {style.description && (
                  <p className="text-xs text-slate mt-3 leading-relaxed border-t border-gray-100 pt-3">
                    {style.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
