import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Special Cases — Rescue Stories",
  description:
    "Read the stories of individual birds rescued, treated, and rehabilitated by Wildlife Rescue. Each case number tells a story of survival.",
};

const CASES = [
  {
    name: "",
    species: "Black Eared Kite",
    caseNo: "#35,412",
    date: "May 2024",
    images: ["/cases/black-kite-2.jpg", "/cases/black-kite-1.jpg"],
    condition: "Severe manja string laceration — wing tendons severed",
    treatment:
      "Emergency surgery using our novel wing repair technique. 6 weeks of intensive physiotherapy and flight conditioning in our rehabilitation aviary.",
    outcome: "Released",
    story:
      "This Black Eared Kite arrived during the busiest month on record — May 2024, when we treated 720 birds. Found tangled in manja string near Chandni Chowk, both wings had deep lacerations. Our surgical technique, developed over 20 years, was able to repair the severed tendons. After 42 days of recovery, the kite took flight over the Yamuna — exactly where it was found.",
  },
  {
    name: "Noor",
    species: "Barn Owl",
    caseNo: "#36,891",
    date: "October 2024",
    condition: "Juvenile — fell from nest during storm, malnourished",
    treatment:
      "Nutritional rehabilitation, warmth therapy, and gradual feeding program. Monitored for Metabolic Bone Disease.",
    outcome: "Released",
    story:
      "A family in Lajpat Nagar found this tiny owlet drenched on their balcony after a severe October storm. At just 3 weeks old and severely underweight, Noor needed round-the-clock feeding. Our team nursed her for 4 weeks until she was strong enough for test flights. She was released near her original nesting site, and the family who found her came to watch.",
  },
  {
    name: "Sultan",
    species: "Egyptian Vulture",
    caseNo: "#34,207",
    date: "January 2024",
    condition: "Fractured wing from vehicle collision — IUCN Endangered species",
    treatment:
      "X-ray imaging, surgical pin placement, 12 weeks of controlled rehabilitation. Laser therapy for tissue healing.",
    outcome: "In Care",
    story:
      "Egyptian Vultures are listed as Endangered by IUCN, making every individual critical to the species' survival. Sultan was struck by a vehicle near NH-44. The fracture required surgical pinning — a procedure we've refined over hundreds of raptor surgeries. His recovery is progressing well, but the complexity of the fracture means he needs additional rehabilitation time.",
  },
  {
    name: "Rani",
    species: "Shikra",
    caseNo: "#37,102",
    date: "December 2024",
    condition: "Glue trap — feathers contaminated, severe stress",
    treatment:
      "Careful feather cleaning with specialized solvents, stress reduction protocol, hydration therapy, and monitored recovery.",
    outcome: "Released",
    story:
      "Glue traps meant for rodents regularly catch birds. Rani, a small but fierce Shikra (sparrowhawk), was found stuck to a glue trap in Rohini. The adhesive had contaminated her flight feathers and she was severely dehydrated from struggling. Our team spent hours carefully removing the glue without damaging her feathers. After 10 days of recovery, she was back to hunting.",
  },
  {
    name: "Bahadur",
    species: "Crested Serpent Eagle",
    caseNo: "#33,845",
    date: "August 2023",
    condition: "Electrocution — wet monsoon wires, burns on feet and wing tips",
    treatment:
      "Burn treatment, anti-inflammatory medication, laser therapy. Monitored for secondary infection.",
    outcome: "Released",
    story:
      "Monsoon season is deadly for raptors. Wet electricity wires become lethal conductors. Bahadur, a majestic Crested Serpent Eagle — rare in urban Delhi — was found unconscious beneath a power line in Sanjay Van. Electrical burns on both feet and wing tips required weeks of careful treatment. His recovery was a team effort, with our staff monitoring him around the clock during the critical first 72 hours.",
  },
  {
    name: "Champa",
    species: "Indian Grey Hornbill",
    caseNo: "#36,234",
    date: "July 2024",
    condition: "Window collision — concussion, disoriented",
    treatment:
      "Rest in dark enclosure, anti-inflammatory medication, neurological monitoring. Gradual reintroduction to light and activity.",
    outcome: "Released",
    story:
      "As Delhi's glass-fronted buildings multiply, window strikes are increasing. Champa hit a high-rise window in Connaught Place and was found on the pavement by an office worker who called our hotline. The concussion left her disoriented for 5 days. With quiet rest and careful monitoring, she made a full recovery and was released in Lodhi Gardens.",
  },
];

export default function SpecialCasesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Special Cases
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Every case number tells a story. From Case #317 to Case #37,958 —
            here are some of the lives we&apos;ve touched.
          </p>
        </div>
      </section>

      {/* ─── Cases ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {CASES.map((c, i) => (
              <article
                key={c.caseNo}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-3">
                  {/* Photo — vertical orientation */}
                  <div className="aspect-[3/4] md:aspect-auto bg-gradient-to-br from-teal-light to-teal/5 flex items-center justify-center relative overflow-hidden">
                    {c.images ? (
                      <Image
                        src={c.images[0]}
                        alt={c.species}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <span className="text-4xl font-bold text-teal/20 font-[family-name:var(--font-poppins)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-slate text-xs mt-2">
                          Photo Placeholder
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 lg:p-8">
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-light text-teal rounded-full">
                      {c.species}
                    </span>

                    <h2 className="mt-3 text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                      {c.species}
                    </h2>

                    <div className="mt-3 space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold text-charcoal">
                          Condition:{" "}
                        </span>
                        <span className="text-slate">{c.condition}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-charcoal">
                          Treatment:{" "}
                        </span>
                        <span className="text-slate">{c.treatment}</span>
                      </p>
                    </div>

                    <p className="mt-4 text-slate text-sm leading-relaxed">
                      {c.story}
                    </p>

                    {c.images && c.images.length > 1 && (
                      <div className="mt-4 flex gap-3 overflow-x-auto">
                        {c.images.slice(1).map((img, j) => (
                          <div key={j} className="relative w-48 h-32 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={img}
                              alt={`${c.species} — photo ${j + 2}`}
                              fill
                              className="object-cover"
                              sizes="192px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-dark to-teal text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Help Write More Success Stories
          </h2>
          <p className="mt-3 text-white/80">
            Every donation funds the rescue, surgery, and rehabilitation that
            gives these birds a second chance.
          </p>
          <div className="mt-6">
            <DonateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
