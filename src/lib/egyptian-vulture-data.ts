/**
 * Egyptian Vulture page data.
 *
 * Powers the dedicated /egyptian-vultures page. Kept separate from the
 * /vultures page (which retains its own EV section) — minor overlap is
 * intentional. Captions for the videos are editable placeholders.
 */

export type EvVideo = { src: string; caption: string };
export type EvPhoto = { src: string; alt: string; position?: string };

/** Flight & rehabilitation footage (compressed from the source clips). */
export const EV_VIDEOS: EvVideo[] = [
  { src: "/egyptian-vultures/ev-flight-01.mp4", caption: "An Egyptian Vulture on the wing at Wildlife Rescue — the moment every rescue is working toward." },
  { src: "/egyptian-vultures/ev-flight-02.mp4", caption: "A rehabilitated Egyptian Vulture takes to the air." },
  { src: "/egyptian-vultures/ev-flight-03.mp4", caption: "Flight conditioning — rebuilding strength and stamina ahead of release." },
  { src: "/egyptian-vultures/ev-flight-04.mp4", caption: "An Egyptian Vulture stretches and tests its wings during conditioning." },
  { src: "/egyptian-vultures/ev-flight-05.mp4", caption: "Wing work in our flight aviary — the final stage before an Endangered vulture is freed." },
  { src: "/egyptian-vultures/ev-flight-06.mp4", caption: "An Egyptian Vulture in flight, up close." },
  { src: "/egyptian-vultures/ev-flight-07-portrait.mp4", caption: "An Egyptian Vulture in our care." },
  { src: "/egyptian-vultures/ev-flight-08.mp4", caption: "Archive footage (2022) — an Egyptian Vulture during rehabilitation at Wildlife Rescue." },
  { src: "/egyptian-vultures/ev-flight-09.mp4", caption: "Archive footage (2022) — an Egyptian Vulture at Wildlife Rescue." },
];

/** Care-and-rehabilitation photo gallery (reuses the existing EV images). */
export const EV_GALLERY: EvPhoto[] = [
  { src: "/species/egyptian-vulture-02.jpg", alt: "Egyptian Vulture under care at Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-03.jpg", alt: "Egyptian Vulture recovering at the Wildlife Rescue clinic", position: "left center" },
  { src: "/species/egyptian-vulture-04.jpg", alt: "Egyptian Vulture in rehabilitation at Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-05.jpg", alt: "Egyptian Vulture being cared for at Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-06.jpg", alt: "Egyptian Vulture in the care of Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-07.jpg", alt: "Endangered Egyptian Vulture under treatment at Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-08.jpg", alt: "Egyptian Vulture recovering at Wildlife Rescue", position: "left center" },
  { src: "/species/egyptian-vulture-09.jpg", alt: "Egyptian Vulture in rehabilitation at the Wildlife Rescue facility", position: "left center" },
  { src: "/species/egyptian-vulture-10.jpg", alt: "Egyptian Vulture under care at Wildlife Rescue", position: "right center" },
  { src: "/species/egyptian-vulture-11.jpg", alt: "Egyptian Vulture being rehabilitated at Wildlife Rescue", position: "right center" },
  { src: "/species/egyptian-vulture-12.jpg", alt: "Egyptian Vulture in care at Wildlife Rescue", position: "center center" },
];

/**
 * Egyptian Vulture case analysis, 2020–2025 (35 documented cases).
 * Source: E. Vulture Data 20-25.xlsx. "Escaped" outcomes are counted as
 * successful returns to the wild. The release rate is on resolved cases
 * only — birds still under care are excluded.
 */
export const EV_CONDITIONS = [
  { label: "Wing cut wound (manja / kite string)", count: 27 },
  { label: "Emaciated / dehydrated", count: 3 },
  { label: "Feather damage (broken or plucked)", count: 2 },
  { label: "Wing fracture", count: 1 },
  { label: "Eye infection", count: 1 },
  { label: "No external injury on arrival", count: 1 },
];

export const EV_OUTCOMES = {
  freed: 19, // 17 released + 2 escaped (escapes count as returns to the wild)
  inCare: 9,
  lost: 7,
  resolved: 26, // freed + lost (excludes birds still in care)
  releaseRate: 73, // 19 / 26
};

/** Egyptian Vultures received per year (subset of total intake). */
export const EV_INTAKE_BY_YEAR = [
  { year: "2020", count: 6 },
  { year: "2021", count: 5 },
  { year: "2022", count: 4 },
  { year: "2023", count: 5 },
  { year: "2024", count: 7 },
  { year: "2025", count: 8 },
];

export const EV_TOTAL_CASES = 35;
