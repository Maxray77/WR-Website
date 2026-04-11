export interface TreatmentMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Optional caption displayed below the media */
  caption?: string;
}

export interface Treatment {
  slug: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  media: TreatmentMedia[];
}

export const TREATMENT_CATEGORIES = [
  "Anesthesia & Surgery",
  "Wound Management",
  "Post-Treatment Care",
  "Diagnostics",
  "Rehabilitation",
] as const;

export const TREATMENTS: Treatment[] = [
  {
    slug: "gas-anesthesia",
    title: "Gas Anesthesia",
    category: "Anesthesia & Surgery",
    description:
      "Wildlife Rescue uses isoflurane gas anesthesia — the gold standard for avian surgery. Birds are placed under controlled anesthesia using a mask or endotracheal tube connected to a precision vaporizer, allowing the surgical team to perform complex procedures while monitoring vital signs throughout.",
    details: [
      "Isoflurane delivered via precision vaporizer with oxygen carrier gas",
      "Face mask induction for smaller birds; endotracheal intubation for longer procedures",
      "Continuous monitoring of heart rate, respiration, and reflexes",
      "Rapid recovery — birds typically regain consciousness within minutes of gas removal",
      "Essential for fracture repairs, wound debridement, and diagnostic procedures",
      "Dedicated anesthesia technician monitors vitals throughout every procedure",
    ],
    media: [
      {
        type: "image",
        src: "/treatments/barn-owl-anesthesia.jpg",
        alt: "Barn Owl under isoflurane gas anesthesia with face mask at Wildlife Rescue surgical suite",
        caption:
          "A Barn Owl under isoflurane gas anesthesia via face mask — the bandaged wing indicates a fracture repair in progress. The precision vaporizer and breathing circuit are visible on the right.",
      },
    ],
  },
  {
    slug: "laser-wound-management",
    title: "Laser Wound Management",
    category: "Wound Management",
    description:
      "Wildlife Rescue employs therapeutic laser treatment for wound management — a non-invasive technique that accelerates healing, reduces inflammation, and manages pain. Laser therapy is particularly effective for the deep tissue lacerations caused by manja (glass-coated kite string), which is the #1 cause of injury in Delhi's raptors.",
    details: [
      "Low-level laser therapy (LLLT) stimulates cellular repair and collagen production",
      "Reduces swelling and inflammation in deep tissue injuries",
      "Non-invasive pain management — reduces the need for pharmaceutical painkillers",
      "Particularly effective for manja string lacerations on wings and feet",
      "Multiple sessions over days or weeks for optimal healing",
      "Combined with conventional wound care — cleaning, debridement, and bandaging",
    ],
    media: [
      {
        type: "video",
        src: "/treatments/laser-wound-management.mp4",
        alt: "Laser wound therapy being performed on an injured bird at Wildlife Rescue",
        caption:
          "Therapeutic laser treatment being applied to an injured bird — the focused laser light stimulates cellular repair and accelerates wound healing.",
      },
    ],
  },
  {
    slug: "post-treatment-care",
    title: "Post-Treatment Recovery",
    category: "Post-Treatment Care",
    description:
      "Recovery and rehabilitation are as critical as the initial treatment. Wildlife Rescue provides round-the-clock post-operative care including thermoregulation, assisted feeding, physiotherapy, and gradual reconditioning. Birds recovering from wing injuries undergo a careful drying and warming protocol after cleaning to prevent hypothermia.",
    details: [
      "Warm recovery enclosures with controlled temperature and humidity",
      "Assisted feeding for birds unable to self-feed during recovery",
      "Gentle drying and warming after wound cleaning to prevent hypothermia",
      "Physiotherapy and passive range-of-motion exercises for wing injuries",
      "Gradual transition from ICU to recovery cage to flight aviary",
      "Flight conditioning in large aviaries before release clearance",
    ],
    media: [
      {
        type: "video",
        src: "/treatments/kite-post-treatment.mp4",
        alt: "Black Kite being carefully dried after wound treatment at Wildlife Rescue",
        caption:
          "A Black Kite being gently dried after wound cleaning — thermoregulation is critical for avian patients, as wet feathers can cause dangerous hypothermia.",
      },
    ],
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}
