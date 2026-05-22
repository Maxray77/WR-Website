import Image from "next/image";
import { Feather } from "lucide-react";

// Vintage public-domain ornithological plates sourced from Wikimedia Commons.
// Plates live at /public/plates/{slug}.jpg. Species without a sourced plate
// fall back to the styled aged-paper placeholder.
//
// Attribution shown in `title` (hover tooltip) and the on-page attribution list.
type PlateInfo = { artist: string; work: string; year: string };

const PLATES: Record<string, PlateInfo> = {
  "black-kite": {
    artist: "John Gould",
    work: "The Birds of Europe",
    year: "1832–1837",
  },
  "barn-owl": {
    artist: "Friedrich von Riesenthal",
    work: "Die Raubvögel Deutschlands",
    year: "1894",
  },
  "black-eared-kite": {
    artist: "Thomas Hardwicke",
    work: "Illustrations of Indian Zoology",
    year: "1830–1832",
  },
  "shikra": {
    artist: "Nicolas Huet / Jean-Gabriel Prêtre",
    work: "Nouveau recueil de planches coloriées",
    year: "1838",
  },
  "spotted-owlet": {
    artist: "Nicolas Huet / Jean-Gabriel Prêtre",
    work: "Nouveau recueil de planches coloriées",
    year: "1838",
  },
  "crested-serpent-eagle": {
    artist: "John Gould",
    work: "A Century of Birds from the Himalaya Mountains",
    year: "1832",
  },
  "egyptian-vulture": {
    artist: "John Gould",
    work: "The Birds of Europe",
    year: "1832–1837",
  },
  "indian-scops-owl": {
    artist: "Thomas Pennant",
    work: "Indian Zoology",
    year: "1790",
  },
  "oriental-honey-buzzard": {
    artist: "Lady Elizabeth Gwillim",
    work: "Indian bird studies",
    year: "1801",
  },
  "short-toed-snake-eagle": {
    artist: "John Gould",
    work: "The Birds of Europe",
    year: "1832–1837",
  },
};

export function plateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPlateInfo(name: string): PlateInfo | null {
  return PLATES[plateSlug(name)] ?? null;
}

export default function PlatePlaceholder({ name }: { name: string }) {
  const slug = plateSlug(name);
  const info = PLATES[slug];

  if (info) {
    const credit = `${info.artist} — ${info.work} (${info.year}). Public domain via Wikimedia Commons.`;
    return (
      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#f5efe1] border border-[#c9b88a]">
        <Image
          src={`/plates/${slug}.jpg`}
          alt={`${name} — vintage plate by ${info.artist}, ${info.year}`}
          title={credit}
          fill
          sizes="(min-width: 768px) 200px, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-gradient-to-br from-[#f5efe1] to-[#e8dcc0] border border-[#c9b88a] flex flex-col items-center justify-center p-4 text-center">
      <Feather size={32} className="text-[#8a7344] mb-2 opacity-60" />
      <p className="text-[10px] uppercase tracking-widest text-[#8a7344] font-semibold">
        Plate forthcoming
      </p>
      <p className="text-xs italic text-[#5a4a2a] mt-1 line-clamp-2 font-[family-name:var(--font-poppins)]">
        {name}
      </p>
    </div>
  );
}
