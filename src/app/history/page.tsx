import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Heart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Early Days — Wildlife Rescue History",
  description:
    "From a single injured Black Kite in the early 1990s to a motorbike ambulance navigating Delhi's lanes — the founding story of Wildlife Rescue in pictures.",
};

const EARLY_PHOTOS = [
  {
    src: "/history/nadeem-early.jpg",
    caption: "Nadeem Shehzad — Co-Founder",
    description: "Nadeem Shehzad, who co-founded Wildlife Rescue after finding an injured Black Kite in the early 1990s.",
  },
  {
    src: "/history/nadeem-02.jpg",
    caption: "Nadeem Shehzad",
    description: "Nadeem Shehzad, co-founder of Wildlife Rescue, in the early years of the rescue.",
  },
  {
    src: "/history/black-eared-kite-02.jpg",
    caption: "Black Eared Kite",
    description: "A Black Eared Kite receiving care at Wildlife Rescue — one of the most common raptors treated at the facility.",
  },
  {
    src: "/history/old-ambulance.jpg",
    caption: "The ambulance",
    description: "The Wildlife Rescue ambulance used to transport injured birds across Delhi.",
  },
  {
    src: "/history/early-days-01.jpg",
    caption: "Early days at the rescue",
    description: "The team at work in the early years of Wildlife Rescue.",
  },
  {
    src: "/history/early-days-02.jpg",
    caption: "Bird rehabilitation",
    description: "Hands-on care for injured birds before the full clinic was established.",
  },
  {
    src: "/history/saud-with-a-kite.jpg",
    caption: "Mohammad Saud with a Kite",
    description: "Mohammad Saud, co-founder of Wildlife Rescue, with an injured Black Kite in the early years.",
  },
  {
    src: "/history/saud-nadeem.jpg",
    caption: "Nadeem & Saud",
    description: "Nadeem Shehzad and Mohammad Saud — the co-founders who built Wildlife Rescue from the ground up.",
  },
  {
    src: "/history/old-black-kite.jpg",
    caption: "Black Kite — Early Case",
    description: "A Black Kite receiving care in the early days of Wildlife Rescue.",
  },
  {
    src: "/history/nadeem-03.jpg",
    caption: "Nadeem Shehzad",
    description: "Nadeem Shehzad with a rescued bird — a scene repeated thousands of times over the years.",
  },
  {
    src: "/history/chhitku-spotted-owlet-chick.jpg",
    caption: "Chhitku — Spotted Owlet Chick",
    description: "A rescued Spotted Owlet chick in care at Wildlife Rescue.",
  },
];

export default function HistoryPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-charcoal to-slate/80 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber font-semibold text-sm uppercase tracking-widest mb-4">
            Archive
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Our Early Days
          </h1>
          <p className="mt-4 text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            Before the clinic, the aviaries, and the operating theatres — there was a motorbike, a small cage, and an unshakeable belief that every bird deserves a second chance.
          </p>
        </div>
      </section>

      {/* ─── Founding Story ─── */}
      <section className="py-16 lg:py-20 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                <Clock size={22} />
              </div>
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">Early 1990s</h3>
              <p className="text-slate text-sm leading-relaxed">
                Nadeem Shehzad finds a critically injured Black Kite in the streets of Delhi. Unable to find anyone to help, he nurses it back to health himself — and never stops.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                <MapPin size={22} />
              </div>
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">Old Delhi</h3>
              <p className="text-slate text-sm leading-relaxed">
                Word spreads through the neighbourhood. Nadeem and Mohammad Saud begin taking in birds from across Delhi — operating out of their family home in Old Delhi, with little more than determination and resourcefulness. In 2013, they move the rescue to Wazirabad, where it remains today.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal">
                <Heart size={22} />
              </div>
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">March 2010</h3>
              <p className="text-slate text-sm leading-relaxed">
                Wildlife Rescue is formally registered under the Indian Trusts Act — giving legal form to what had already been years of quiet, devoted work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bike Ambulance ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/history/bike-ambulance.jpg"
                alt="The original Wildlife Rescue bike ambulance — early rescue transport"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                <p className="text-white/90 text-sm font-medium">The original bike ambulance</p>
                <p className="text-white/60 text-xs mt-0.5">Wildlife Rescue, Delhi — early operations</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-amber font-semibold text-sm uppercase tracking-widest mb-3">
                Before the clinic
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-[family-name:var(--font-poppins)] leading-tight">
                The Motorbike That Started It All
              </h2>
              <p className="mt-5 text-slate leading-relaxed">
                In the years before Wildlife Rescue had a proper clinic, this motorbike was the ambulance. Nadeem and Saud would navigate Delhi&apos;s crowded lanes on it — responding to calls from residents who had found injured birds, picking them up in makeshift carriers, and bringing them home for treatment.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                There were no operating theatres then. No X-ray machines, no anaesthesia equipment, no aviaries. Just two men on a motorbike, a handful of cages, and the kind of stubborn compassion that refuses to look away from a suffering animal.
              </p>
              <p className="mt-4 text-slate leading-relaxed">
                Today, Wildlife Rescue treats over 4,000 birds a year and has pioneered surgical techniques adopted worldwide. But this motorbike is where it all began.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
                >
                  Read our full story <ArrowRight size={16} />
                </Link>
                <Link
                  href="/clinic"
                  className="inline-flex items-center gap-2 text-teal font-semibold hover:text-teal-dark transition-colors"
                >
                  See the clinic today <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Early Photos Grid ─── */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="From the Archive"
            subtitle="Photographs from the early years of Wildlife Rescue."
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {EARLY_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                    {photo.caption}
                  </h3>
                  <p className="text-slate text-sm mt-1 leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Then vs Now ─── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal to-teal-dark rounded-2xl p-8 lg:p-12 text-white text-center">
            <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-poppins)]">
              From One Motorbike to 4,000+ Birds a Year
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed max-w-2xl mx-auto">
              Everything at Wildlife Rescue today — the surgical suite, the aviaries, the novel wing-repair techniques, the Oscar-nominated documentary — grew from that same quiet refusal to walk past a suffering bird. Support the next chapter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <DonateButton size="lg" />
              <Link
                href="/our-specialty"
                className="px-6 py-3 border-2 border-white/40 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Our techniques today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
