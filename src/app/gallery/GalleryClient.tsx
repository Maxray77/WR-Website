"use client";

import { useState } from "react";
import Image from "next/image";
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
  { id: 17, title: "Black Eared Kite", category: "Species", src: "/species/black-eared-kite-02.jpg", description: "A Black Eared Kite — the migratory winter visitor from Central Asia — at Wildlife Rescue clinic." },
  { id: 22, title: "Manja Thread in the Wound", category: "Clinic", src: "/gallery/black-kite-manja-wound.jpg", description: "A Black Kite with kite-flying manja thread found embedded in the wound — the sharp glass-coated string slices wing tendons and skin, sometimes remaining lodged in tissue for days before rescue." },
  { id: 23, title: "Black Kite", category: "Species", src: "/gallery/black-kite.jpg", description: "A Black Kite — the most common raptor in Delhi's skies and the species at the heart of Wildlife Rescue's work." },
  { id: 24, title: "Painted Stork", category: "Species", src: "/gallery/painted-stork.jpg", description: "A Painted Stork in care at Wildlife Rescue — a tall wading bird of India's wetlands, occasionally arriving at the clinic with injuries from power lines or fishing line entanglement." },
  { id: 25, title: "Crow Under Gas Anesthesia", category: "Clinic", src: "/gallery/crow-gas-anesthesia.jpg", description: "A Crow undergoing gas anesthesia for a medical procedure at the Wildlife Rescue clinic." },
  { id: 26, title: "Black Headed Ibis Under Anesthesia", category: "Clinic", src: "/gallery/black-headed-ibis-anesthesia.jpg", description: "A Black Headed Ibis under gas anesthesia at the Wildlife Rescue clinic — a wetland bird occasionally treated for injuries from fishing line, power lines, or predator attacks." },
  { id: 27, title: "Cattle Egret in the Clinic", category: "Clinic", src: "/gallery/cattle-egret-clinic.jpg", description: "A Cattle Egret in care at the Wildlife Rescue clinic — these small white herons follow grazing livestock for insects and sometimes arrive injured from collisions or entanglement." },
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

export default function GalleryClient() {
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
                    {/* Real photo or placeholder */}
                    {"src" in photo && photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-slate/40 text-xs text-center">{photo.title}</p>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-center justify-center">
                      <ZoomIn
                        size={32}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      />
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
