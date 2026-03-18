"use client";

import { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const CATEGORIES = [
  "All",
  "Rescues",
  "Releases",
  "Clinic",
  "Team",
  "Species",
  "Events",
];

const PHOTOS = [
  { id: 1, title: "Black Kite in Flight", category: "Releases", description: "A recovered Black Kite soaring over the Yamuna floodplains after successful rehabilitation." },
  { id: 2, title: "Manja String Surgery", category: "Clinic", description: "Our team performing the novel wing repair surgery on a manja-injured raptor." },
  { id: 3, title: "Founders at Work", category: "Team", description: "Nadeem and Saud examining an injured Black Kite at the rescue center." },
  { id: 4, title: "Baby Barn Owl", category: "Species", description: "A juvenile Barn Owl being hand-fed during rehabilitation." },
  { id: 5, title: "Monsoon Rescue", category: "Rescues", description: "Emergency rescue during monsoon season — collecting an electrocuted raptor from wet power lines." },
  { id: 6, title: "Release Day Celebration", category: "Events", description: "Community members watching as 12 rehabilitated Black Kites are released together." },
  { id: 7, title: "Egyptian Vulture Close-up", category: "Species", description: "A rare and endangered Egyptian Vulture being treated at our facility." },
  { id: 8, title: "X-Ray Imaging", category: "Clinic", description: "Using our on-site X-ray machine to diagnose a wing fracture." },
  { id: 9, title: "Rescue Vehicle on Duty", category: "Rescues", description: "Our Tata EV responding to an emergency call in South Delhi." },
  { id: 10, title: "Shikra Recovery", category: "Species", description: "A fierce little Shikra (sparrowhawk) recovering from a glue trap incident." },
  { id: 11, title: "Team Group Photo", category: "Team", description: "The Wildlife Rescue team outside the center in Wazirabad Village." },
  { id: 12, title: "Feeding Time", category: "Clinic", description: "Daily feeding of 40+ birds in care — a logistics operation requiring precision and dedication." },
  { id: 13, title: "Kite Festival Aftermath", category: "Rescues", description: "The aftermath of Uttarayan — dozens of manja-injured birds arriving in a single day." },
  { id: 14, title: "Crested Serpent Eagle", category: "Species", description: "A majestic Crested Serpent Eagle recovering from electrical burns." },
  { id: 15, title: "Laser Treatment Session", category: "Clinic", description: "Using VAYMED Class 4 laser for tissue regeneration on a healing wing." },
  { id: 16, title: "Night Rescue Operation", category: "Rescues", description: "Responding to a late-night call — an owl trapped in a factory vent." },
];

// Color mapping for category badges
const CATEGORY_COLORS: Record<string, string> = {
  Rescues: "bg-danger/10 text-danger",
  Releases: "bg-green-50 text-success",
  Clinic: "bg-teal-light text-teal",
  Team: "bg-amber-bg text-amber",
  Species: "bg-purple-50 text-purple-600",
  Events: "bg-blue-50 text-blue-600",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<(typeof PHOTOS)[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Photo Gallery
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            A visual journey through our rescue work — from emergency calls to
            triumphant releases.
          </p>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-teal text-white shadow-lg"
                    : "bg-offwhite text-slate hover:bg-teal-light hover:text-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((photo, i) => {
              // Vary heights for masonry effect
              const heights = ["aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/2]"];
              const height = heights[i % heights.length];

              return (
                <div
                  key={photo.id}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setLightboxPhoto(photo)}
                >
                  <div
                    className={`${height} bg-gradient-to-br from-teal-light to-teal/10 rounded-xl overflow-hidden relative border border-gray-100 hover:shadow-lg transition-all`}
                  >
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-center justify-center">
                      <ZoomIn
                        size={32}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    {/* Placeholder content */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <p className="text-slate/40 text-xs text-center">
                        {photo.title}
                      </p>
                    </div>

                    {/* Category badge */}
                    <span
                      className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[photo.category] || "bg-gray-100 text-slate"
                      }`}
                    >
                      {photo.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightboxPhoto(null)}
          >
            <X size={32} />
          </button>
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-teal-light to-teal/10 flex items-center justify-center">
              <p className="text-slate">Full-size Photo Placeholder</p>
            </div>
            <div className="p-6">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  CATEGORY_COLORS[lightboxPhoto.category] || "bg-gray-100 text-slate"
                }`}
              >
                {lightboxPhoto.category}
              </span>
              <h3 className="mt-2 text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                {lightboxPhoto.title}
              </h3>
              <p className="text-slate text-sm mt-2">
                {lightboxPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
