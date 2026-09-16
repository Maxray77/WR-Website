/**
 * Education & Outreach page data.
 *
 * Powers /education-outreach. Wildlife Rescue ran the same bilingual
 * (English/Hindi) curriculum at seven Delhi schools between June and
 * September 2026 — presentation, then an in-class drawing contest.
 *
 * MEDIA RULES, applied to every session and not to be relaxed:
 *  - Faces are blurred in all photographs. See scripts/prep-school-media.py.
 *  - No child is named anywhere: the NAME / CLASS / ROLL NO. block is redacted
 *    on every drawing, and captions credit placings only.
 * Add a new school by dropping an entry into EDU_SESSIONS, newest first.
 */

export type EduImage = { src: string; alt: string };

export type EduSession = {
  slug: string;
  school: string;
  /** Display date, e.g. "7 September 2026". */
  date: string;
  dateISO: string;
  /** Photos from the session. Empty until the media has been prepared. */
  photos: EduImage[];
  /** Contest drawings, winners first where placings were awarded. */
  drawings: EduImage[];
};

/** Every school visited, newest first. */
export const EDU_SESSIONS: EduSession[] = [
  {
    slug: "navjyoti",
    school: "Nav Jyoti Model School",
    date: "7 September 2026",
    dateISO: "2026-09-07",
    photos: [
      { src: "/education/navjyoti/navjyoti-01.jpg", alt: "Children watching a bilingual slide comparing what crows do for a city, at a Wildlife Rescue session" },
      { src: "/education/navjyoti/navjyoti-02.jpg", alt: "Students looking up at a slide identifying the myna during a Wildlife Rescue class" },
      { src: "/education/navjyoti/navjyoti-03.jpg", alt: "A class watching a photograph of an injured bird under treatment at the Wildlife Rescue clinic" },
    ],
    drawings: [
      { src: "/education/navjyoti/navjyoti-drawing-01.jpg", alt: "First-place drawing: a boy flying a kite beside a bird, captioned “Bird is no safe, please safe bird”" },
      { src: "/education/navjyoti/navjyoti-drawing-02.jpg", alt: "A child's contest drawing about keeping birds safe from kite string" },
      { src: "/education/navjyoti/navjyoti-drawing-03.jpg", alt: "A child's contest drawing from the Wildlife Rescue session" },
    ],
  },
  {
    slug: "sabrang",
    school: "Sabrang Public School",
    date: "5 September 2026",
    dateISO: "2026-09-05",
    photos: [
      { src: "/education/sabrang/sabrang-01.jpg", alt: "Students watching a photograph of a bird being treated at the Wildlife Rescue clinic" },
      { src: "/education/sabrang/sabrang-02.jpg", alt: "A class facing the Wildlife Rescue helpline number on screen: 9810029698" },
      { src: "/education/sabrang/sabrang-03.jpg", alt: "Students drawing at their desks during the Wildlife Rescue contest" },
    ],
    drawings: [
      { src: "/education/sabrang/sabrang-drawing-01.jpg", alt: "First-place drawing: a four-panel strip showing a bird cut by kite string, carried to a building marked Wildlife Rescue, with the helpline number" },
      { src: "/education/sabrang/sabrang-drawing-02.jpg", alt: "Second-place drawing: rat poison crossed out beside a cage trap ticked, showing a lizard and snake also killed by the poison" },
      { src: "/education/sabrang/sabrang-drawing-03.jpg", alt: "Third-place drawing: a bird captioned “king of the nature”, with warnings against kite thread and glue traps" },
    ],
  },
  {
    slug: "rama",
    school: "Rama Public Sr. Sec. School",
    date: "1 September 2026",
    dateISO: "2026-09-01",
    photos: [],
    drawings: [],
  },
  {
    slug: "giggling-toddlers",
    school: "Giggling Toddler's School",
    date: "20 August 2026",
    dateISO: "2026-08-20",
    photos: [],
    drawings: [],
  },
  {
    slug: "convent-modern-education",
    school: "Convent of Modern Education",
    date: "12 August 2026",
    dateISO: "2026-08-12",
    photos: [],
    drawings: [],
  },
  {
    slug: "abc-modern",
    school: "ABC Modern School",
    date: "28 July 2026",
    dateISO: "2026-07-28",
    photos: [],
    drawings: [],
  },
  {
    slug: "infinity",
    school: "Infinity Learning Centre",
    date: "20 June 2026",
    dateISO: "2026-06-20",
    photos: [
      { src: "/education/event-02.jpg", alt: "Students learning about Delhi's birds and urban wildlife at the Wildlife Rescue session" },
      { src: "/education/event-05.jpg", alt: "A student at the Wildlife Rescue awareness session at Infinity Learning Centre" },
      { src: "/education/event-07.jpg", alt: "Interactive learning during the Wildlife Rescue school outreach session" },
      { src: "/education/event-08.jpg", alt: "Students taking part in the Wildlife Rescue environment and wildlife class" },
      { src: "/education/event-09.jpg", alt: "Gift distribution to children following the Wildlife Rescue drawing contest" },
      { src: "/education/event-10.jpg", alt: "Children with their gifts at the Wildlife Rescue education and outreach event" },
    ],
    drawings: [
      { src: "/education/drawing-01.jpg", alt: "A child's drawing about wildlife and the environment from the Wildlife Rescue contest" },
      { src: "/education/drawing-02.jpg", alt: "A student's artwork on birds and urban ecology from the awareness session" },
      { src: "/education/drawing-03.jpg", alt: "A child's drawing on the dangers of manja kite string to birds" },
      { src: "/education/drawing-04.jpg", alt: "A student's drawing about protecting Delhi's wildlife" },
      { src: "/education/drawing-05.jpg", alt: "A child's artwork about the environment and nature" },
      { src: "/education/drawing-06.jpg", alt: "A student's drawing of birds and wildlife from the Wildlife Rescue contest" },
      { src: "/education/drawing-07.jpg", alt: "A child's drawing about kite-flying safety and birds" },
      { src: "/education/drawing-08.jpg", alt: "A student's artwork on urban ecology and sharing the city with wildlife" },
      { src: "/education/drawing-09.jpg", alt: "A child's drawing about wildlife conservation" },
      { src: "/education/drawing-10.jpg", alt: "A student's drawing about the environment, wildlife, and kite safety" },
    ],
  },
];

/** Headline figures, derived so they cannot drift from the data. */
export const EDU_TOTALS = {
  schools: EDU_SESSIONS.length,
  firstDate: "June 2026",
  latestDate: "September 2026",
};

/** The session the page leads with. */
export const LATEST_SESSION = EDU_SESSIONS[0];
