/**
 * Education & Outreach page data.
 *
 * Powers /education-outreach. Photos + children's drawings from the
 * 20 June 2026 awareness session at Infinity Learning Centre, Wazirabad,
 * conducted by Samia and Mohammad Umar of Wildlife Rescue.
 */

export type EduImage = { src: string; alt: string };

export const EDU_EVENT = {
  date: "20 June 2026",
  dateISO: "2026-06-20",
  venue: "Infinity Learning Centre",
  area: "Wazirabad, Delhi",
  conductors: ["Samia", "Mohammad Umar"],
};

/** Photos from the awareness session with the students. */
export const EVENT_PHOTOS: EduImage[] = [
  { src: "/education/event-01.jpg", alt: "Wildlife Rescue's awareness session with school children at Infinity Learning Centre, Wazirabad" },
  { src: "/education/event-02.jpg", alt: "Students learning about Delhi's birds and urban wildlife at the Wildlife Rescue session" },
  { src: "/education/event-03.jpg", alt: "Wildlife Rescue educators teaching children about the environment and wildlife" },
  { src: "/education/event-04.jpg", alt: "School children engaged in the Wildlife Rescue education and outreach programme" },
  { src: "/education/event-05.jpg", alt: "A student at the Wildlife Rescue awareness session at Infinity Learning Centre" },
  { src: "/education/event-07.jpg", alt: "Interactive learning during the Wildlife Rescue school outreach session" },
  { src: "/education/event-08.jpg", alt: "Students taking part in the Wildlife Rescue environment and wildlife class" },
  { src: "/education/event-09.jpg", alt: "Gift distribution to children following the Wildlife Rescue drawing contest" },
  { src: "/education/event-10.jpg", alt: "Children with their gifts at the Wildlife Rescue education and outreach event" },
];

/** Children's drawings of what they learned, from the in-class drawing contest. */
export const DRAWINGS: EduImage[] = [
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
];
