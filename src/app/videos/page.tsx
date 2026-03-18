import type { Metadata } from "next";
import { Play, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Video Clips",
  description:
    "Watch Wildlife Rescue in action — rescue operations, rehabilitation footage, media features, and the Oscar-nominated documentary trailer.",
};

const FEATURED_VIDEO = {
  title: "All That Breathes — Official Trailer",
  description:
    "The Oscar-nominated documentary that follows brothers Nadeem and Saud as they rescue Black Kites in Delhi.",
  embedUrl: "https://www.youtube.com/embed/X_bDAFfCRnE",
  source: "HBO Documentary Films",
};

const VIDEOS = [
  {
    title: "How Delhi Brothers Rescue Carnivorous Birds",
    source: "ThePrint",
    duration: "4:39",
    description:
      "Field report following Wildlife Rescue on their daily rounds collecting injured raptors from across Delhi.",
    category: "Media Feature",
  },
  {
    title: "Wildlife Rescue in Delhi — The Keepers",
    source: "The Best of India",
    duration: "6:18",
    description:
      "Early documentary-style video about Nadeem and Saud's rescue work from their home in Old Delhi.",
    category: "Documentary",
  },
  {
    title: "Oscars: 'All That Breathes' Vies for Best Documentary",
    source: "DW (Deutsche Welle)",
    duration: "3:45",
    description:
      "German international broadcaster covers Wildlife Rescue's NGO work in polluted Delhi.",
    category: "Media Feature",
  },
  {
    title: "NC Hangout Ft. Wildlife Rescue Team",
    source: "NewsClick",
    duration: "25:00",
    description:
      "Extended conversation with the Wildlife Rescue team about their mission, challenges, and vision.",
    category: "Interview",
  },
  {
    title: "Black Kite Rescue During Monsoon Season",
    source: "Wildlife Rescue",
    duration: "2:30",
    description:
      "Watch our team respond to an emergency call during peak monsoon — wet wire electrocution rescue.",
    category: "Field Rescue",
  },
  {
    title: "Wing Repair Surgery — Our Novel Technique",
    source: "Wildlife Rescue",
    duration: "5:15",
    description:
      "A look at our signature surgical technique for repairing wings damaged by manja string.",
    category: "Medical",
  },
  {
    title: "Release Day — 15 Raptors Return to the Sky",
    source: "Wildlife Rescue",
    duration: "3:00",
    description:
      "The most rewarding moment — releasing recovered birds back into the wild at the Yamuna floodplains.",
    category: "Release",
  },
  {
    title: "A Day at Wildlife Rescue Center",
    source: "Wildlife Rescue",
    duration: "8:45",
    description:
      "Follow our team through a typical day — from early morning feeding to late-night emergency calls.",
    category: "Behind the Scenes",
  },
];

const CATEGORIES = ["All", "Media Feature", "Documentary", "Field Rescue", "Medical", "Release", "Behind the Scenes", "Interview"];

export default function VideosPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Video Clips
          </h1>
          <p className="mt-4 text-xl text-white/70 max-w-2xl mx-auto">
            Watch Wildlife Rescue in action — from emergency rescues to
            successful releases.
          </p>
        </div>
      </section>

      {/* ─── Featured Video ─── */}
      <section className="bg-charcoal pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={FEATURED_VIDEO.embedUrl}
              title={FEATURED_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
              {FEATURED_VIDEO.title}
            </h2>
            <p className="text-white/60 text-sm mt-1">
              {FEATURED_VIDEO.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="All Videos"
            subtitle="Rescue operations, media coverage, and behind-the-scenes footage."
          />

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  cat === "All"
                    ? "bg-teal text-white"
                    : "bg-offwhite text-slate hover:bg-teal-light hover:text-teal"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {VIDEOS.map((video) => (
              <div
                key={video.title}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-charcoal to-gray-800 relative flex items-center justify-center">
                  <div className="w-14 h-14 bg-amber/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      size={24}
                      className="text-charcoal ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-teal-light text-teal rounded-full">
                    {video.category}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-charcoal leading-snug font-[family-name:var(--font-poppins)]">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate mt-1.5 leading-relaxed">
                    {video.description}
                  </p>
                  <p className="text-xs text-amber font-semibold mt-2">
                    {video.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
