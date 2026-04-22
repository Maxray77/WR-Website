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
    slug: "ultrasonic-bone-cutter",
    title: "Ultrasonic Bone Cutter",
    category: "Anesthesia & Surgery",
    description:
      "Wildlife Rescue's surgical suite is equipped with a Woodpecker Surgic Smart ultrasonic bone cutter — a precision instrument that uses high-frequency vibrations to cut bone without damaging surrounding soft tissue. This is critical in avian surgery where bones are thin, hollow, and millimeters from vital nerves and blood vessels.",
    details: [
      "Ultrasonic vibrations cut bone cleanly while preserving adjacent nerves, blood vessels, and soft tissue",
      "Integrated irrigation system (visible IV drip) keeps the surgical site cool and debris-free",
      "Multiple tip configurations for different bone densities and surgical approaches",
      "LED-illuminated handpiece provides direct visibility in the surgical field",
      "Adjustable power levels (1–5) and modes (Bone, Perio, Endo) for precise control",
      "Essential for complex fracture repairs, pin placement, and orthopedic procedures on raptors",
    ],
    media: [
      {
        type: "image",
        src: "/treatments/usbc-control-unit.jpg",
        alt: "Woodpecker Surgic Smart ultrasonic bone cutter control unit showing touchscreen display with bone mode settings",
        caption:
          "The Surgic Smart control unit in Bone mode — the touchscreen displays power level, water flow rate, and tip configuration. The foot pedal (left) gives the surgeon hands-free control.",
      },
      {
        type: "image",
        src: "/treatments/usbc-full-setup.jpg",
        alt: "Complete ultrasonic bone cutter surgical setup with control unit, handpiece, IV irrigation, and foot pedal",
        caption:
          "The complete surgical setup — control unit, LED handpiece on its cradle, IV irrigation bag for cooling, and foot pedal for hands-free operation.",
      },
      {
        type: "image",
        src: "/treatments/usbc-tip-sets.jpg",
        alt: "Two sets of specialized ultrasonic cutting tips in stainless steel holders for different bone surgery applications",
        caption:
          "Specialized tip sets for different surgical applications — each tip shape is designed for specific bone cuts, from fine osteotomies to broader resections.",
      },
      {
        type: "image",
        src: "/treatments/usbc-handpiece.jpg",
        alt: "Woodpecker HB-2 LED ultrasonic handpiece with attached cutting tip resting on its cradle",
        caption:
          "The HB-2 LED handpiece — the ultrasonic vibrations at the tip cut bone with sub-millimeter precision while the built-in LED illuminates the surgical field.",
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
        type: "image",
        src: "/treatments/laser-therapy.jpg",
        alt: "Two Wildlife Rescue team members wearing protective laser goggles applying therapeutic laser to a raptor's wing wound",
        caption:
          "Wildlife Rescue staff in protective laser goggles apply focused laser therapy to a raptor's wing laceration — the handheld laser probe stimulates cellular repair deep in the wound tissue.",
      },
      {
        type: "image",
        src: "/treatments/laser-therapy-big.jpg",
        alt: "Wildlife Rescue veterinarian applying laser therapy to a raptor — red laser beam visible on the bird's wound with the laser control unit in the background",
        caption:
          "A Wildlife Rescue team member applies focused laser therapy to a raptor's wound — the laser unit (background) delivers precise wavelengths that stimulate cellular repair and reduce inflammation.",
      },
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
        type: "image",
        src: "/treatments/black-kite-drip.jpg",
        alt: "Black Kite receiving intravenous fluid therapy on the clinic table at Wildlife Rescue — IV drip line visible",
        caption:
          "A Black Kite receiving IV fluid therapy — intravenous drips deliver essential fluids, electrolytes, and medication directly to critically dehydrated or weakened birds.",
      },
      {
        type: "image",
        src: "/treatments/painkiller-drops.jpg",
        alt: "Wildlife Rescue staff administering painkiller drops to a raptor's beak during post-treatment care",
        caption:
          "Administering oral painkiller drops to a raptor — precise dosing of medication is essential for pain management during recovery from surgery or injury.",
      },
      {
        type: "video",
        src: "/treatments/kite-post-treatment.mp4",
        alt: "Black Kite being carefully dried after wound treatment at Wildlife Rescue",
        caption:
          "A Black Kite being gently dried after wound cleaning — thermoregulation is critical for avian patients, as wet feathers can cause dangerous hypothermia.",
      },
    ],
  },
  {
    slug: "orphan-chick-care",
    title: "Orphan & Chick Rehabilitation",
    category: "Rehabilitation",
    description:
      "Wildlife Rescue receives dozens of orphaned and fallen raptor chicks every breeding season. Many arrive unidentified — tiny, downy bundles that could grow into kites, eagles, or buzzards. Each receives round-the-clock care including hand-feeding, thermoregulation, and gradual socialization to prepare them for eventual release into the wild.",
    details: [
      "Specialized formula feeding every 2–3 hours for very young chicks",
      "Temperature-controlled brooder boxes mimicking nest warmth",
      "Gradual transition from hand-feeding to self-feeding as chicks develop",
      "Species identification as plumage develops — determines release protocol",
      "Socialization with same-species birds to ensure proper behavioral development",
      "Flight training in progressively larger aviaries before release clearance",
    ],
    media: [
      {
        type: "image",
        src: "/treatments/baby-spotted-owlet.jpg",
        alt: "Baby Spotted Owlet receiving hand-raising care at Wildlife Rescue — a tiny orphaned owlet being rehabilitated before eventual release",
        caption: "A baby Spotted Owlet in our orphan nursery — hand-raised with round-the-clock feeding and warmth until old enough to fend for itself.",
      },
      {
        type: "video",
        src: "/treatments/raptor-chick.mp4",
        alt: "A raptor baby being cared for at Wildlife Rescue — an unidentified chick receiving rehabilitation",
        caption:
          "A raptor baby under care at Wildlife Rescue — this unidentified chick will be raised, identified as its feathers develop, and eventually released back into the wild.",
      },
    ],
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}
