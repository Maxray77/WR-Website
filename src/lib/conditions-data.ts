export interface Condition {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  percentage: string;
  /** Override for the label rendered next to `percentage` (default: "of cases" / "of total cases") */
  percentageLabel?: string;
  annualCases: string;
  severity: "Critical" | "Serious" | "Moderate" | "Variable";
  shortDescription: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  recoveryRate: string;
  avgRecoveryTime: string;
  commonSpecies: string[];
  /** Hero image for the condition detail page */
  image?: string;
  /** Gallery images shown on listing cards and detail page */
  images?: { src: string; alt: string }[];
  /** Video clip for the condition detail page */
  video?: { src: string; caption: string };
  caseStudy: {
    name: string;
    species: string;
    story: string;
    outcome: "Released" | "In Care" | "Permanent Resident";
    /** Optional case study photo */
    image?: string;
  };
}

export const CONDITIONS_LIST: Condition[] = [
  {
    slug: "cut-wounds",
    name: "Cut Wounds & Lacerations",
    icon: "Scissors",
    percentage: "~35%",
    annualCases: "~1,300/year",
    severity: "Serious",
    shortDescription:
      "The #1 injury we treat. Manja (glass-coated kite string) causes devastating cuts to wings, legs, and bodies of Delhi's raptors.",
    description:
      "Cut wounds account for approximately 35% of all cases at Wildlife Rescue — making them by far the most common condition we treat. The primary cause is manja, the glass-coated string used in kite flying across Delhi. During festivals like Makar Sankranti and Independence Day, manja-related injuries spike dramatically. These razor-sharp strings can sever tendons, slice through muscle, and even amputate wing tips. Beyond manja, birds also suffer cuts from barbed wire, sheet metal, broken glass, and sharp construction debris scattered across Delhi's urban landscape. Our surgical team has developed specialized techniques over 20+ years to repair even severe tendon and ligament damage — expertise that has been shared with wildlife rehabilitators worldwide.",
    causes: [
      "Manja (glass-coated kite string) — accounts for 60%+ of all cut wounds",
      "Barbed wire fencing around construction sites and industrial areas",
      "Sheet metal and broken glass in landfills and demolition sites",
      "Sharp edges on overhead wires and cable installations",
      "Discarded fishing line and netting near water bodies",
    ],
    symptoms: [
      "Visible open wounds with bleeding or exposed tissue",
      "Drooping or trailing wing — indicates severed flight tendons",
      "Inability to fly or gain altitude",
      "Bird on the ground, unable to take off",
      "String or wire tangled around limbs or wings",
      "Swelling, infection, or maggot infestation in untreated wounds",
    ],
    treatment: [
      "Emergency stabilization — fluid therapy, pain management, wound cleaning",
      "Surgical debridement — removal of dead tissue and foreign material",
      "Tendon and ligament repair using WR's proprietary microsurgical techniques",
      "Suturing of deep lacerations under magnification",
      "Antibiotic therapy to prevent or treat infection",
      "Laser therapy and physiotherapy during recovery",
      "Flight conditioning in rehabilitation aviary before release",
    ],
    prevention: [
      "Ban on manja — Wildlife Rescue actively advocates for enforcement of the 2017 NGT ban",
      "Community education campaigns during kite flying festivals",
      "Removal of barbed wire in known raptor corridors",
      "Proper disposal of fishing line and netting",
      "Securing sharp edges on construction sites near nesting areas",
    ],
    recoveryRate: "~65%",
    avgRecoveryTime: "3–8 weeks",
    commonSpecies: [
      "Black Kite (80%+ of manja cases)",
      "Barn Owl",
      "Shikra",
      "Blue Rock Pigeon",
      "Egyptian Vulture",
    ],
    video: { src: "/treatments/laser-wound-management.mp4", caption: "Laser wound therapy being applied to a Black Kite — this non-invasive treatment accelerates healing of deep manja lacerations, the #1 injury Wildlife Rescue treats" },
    caseStudy: {
      name: "Kiran",
      species: "Black Kite",
      story:
        "Found tangled in manja near Chandni Chowk during the peak May season. Both wings had deep lacerations with severed tendons. Our 20-year surgical technique repaired the damage. After 42 days of recovery and flight conditioning, Kiran was released over the Yamuna — exactly where she was found.",
      outcome: "Released",
    },
  },
  {
    slug: "fractures",
    name: "Fractures & Bone Injuries",
    icon: "Bone",
    percentage: "~20%",
    annualCases: "~750/year",
    severity: "Critical",
    shortDescription:
      "Broken wings and legs from vehicle collisions, electrocution, and falls. Complex fractures require surgical pinning and months of rehabilitation.",
    description:
      "Fractures are the second most common condition at Wildlife Rescue, accounting for about 20% of all cases. The most common causes are vehicle collisions (especially on highways cutting through green corridors), electrocution from power lines, and falls from nests during storms. Wing fractures are the most critical — a bird that cannot fly cannot survive in the wild. Our surgical team uses intramedullary pins, external fixators, and figure-eight bandaging techniques depending on the fracture type and location. Large raptors like eagles and vultures present the greatest surgical challenge due to their size and the mechanical stress their wings endure during flight. Recovery from fractures is long — typically 6 to 16 weeks — and requires careful physiotherapy to restore flight capability.",
    causes: [
      "Vehicle collisions — birds struck by cars, trucks, and trains",
      "Electrocution from contact with power lines and transformers",
      "Falls from nests during storms, especially juveniles",
      "Window strikes in glass-fronted buildings",
      "Attacks by dogs, cats, or other predators",
      "Human violence — stones, pellet guns, catapults",
    ],
    symptoms: [
      "Wing hanging at an abnormal angle (wing fracture)",
      "Inability to bear weight on a leg (leg fracture)",
      "Visible swelling or deformity at the fracture site",
      "Complete inability to fly",
      "Crepitus (grinding sensation) when the limb is gently palpated",
      "Pain response — bird is reluctant to move or defensive",
    ],
    treatment: [
      "X-ray imaging to determine fracture type and location",
      "Surgical pinning (intramedullary pins) for long bone fractures",
      "External fixation for complex or open fractures",
      "Figure-eight wing bandaging for stable closed fractures",
      "Pain management and anti-inflammatory medication",
      "Controlled rehabilitation — restricted movement during healing",
      "Gradual physiotherapy and flight conditioning",
      "Follow-up X-rays to confirm bone healing before release",
    ],
    prevention: [
      "Bird-safe infrastructure — flight diverters on power lines",
      "Speed reduction zones near known wildlife corridors",
      "Anti-collision markers on glass buildings",
      "Community education about protecting nesting sites during storms",
      "Enforcement of wildlife protection laws against deliberate harm",
    ],
    recoveryRate: "~50%",
    avgRecoveryTime: "6–16 weeks",
    commonSpecies: [
      "Black Kite",
      "Egyptian Vulture",
      "Eagles (Steppe, Greater Spotted)",
      "Barn Owl",
      "Crested Serpent Eagle",
    ],
    caseStudy: {
      name: "Sultan",
      species: "Egyptian Vulture",
      story:
        "Struck by a vehicle near NH-44, Sultan suffered a complex wing fracture. As an Endangered species, every individual matters. Surgical pinning — refined over hundreds of raptor surgeries — was performed. His recovery is ongoing with controlled rehabilitation to restore flight capability.",
      outcome: "In Care",
    },
  },
  {
    slug: "orphans",
    name: "Orphaned & Juvenile Birds",
    icon: "Baby",
    percentage: "~18%",
    annualCases: "~670/year",
    severity: "Moderate",
    shortDescription:
      "Baby birds that fall from nests, are abandoned, or lose their parents. Raising them to independence requires species-specific care over weeks to months.",
    description:
      "Orphaned and juvenile birds make up about 18% of Wildlife Rescue's caseload, with a dramatic spike during the breeding season (March–August). Most are nestlings or fledglings that have fallen from nests during storms, been displaced by construction, or lost parents to injury or death. Raising orphaned raptors is particularly challenging — they need to develop proper hunting skills and flight capability before release. Wildlife Rescue uses careful imprinting protocols to ensure birds don't become habituated to humans, which would make them unable to survive in the wild. Young raptors are gradually introduced to live prey and given flight training in large aviaries before release. For non-raptor species like pigeons, parakeets, and mynas, the process is shorter but still requires careful hand-feeding and socialization with conspecifics.",
    causes: [
      "Nest destruction during tree cutting, pruning, and construction",
      "Falls from nests during severe storms and high winds",
      "Parent death or injury — orphaned when adults are killed",
      "Premature fledging — chicks leave the nest too early due to disturbance",
      "Heat stress — chicks overheat and fall from exposed nests during Delhi summers (45°C+)",
      "Well-meaning humans removing healthy fledglings ('kidnapping') — thinking they need help",
    ],
    symptoms: [
      "Young bird found on the ground, unable to fly",
      "Fluffy down feathers with few or no flight feathers",
      "Begging behavior — gaping mouth, calling for food",
      "Dehydration — sunken eyes, dry mouth, lethargy",
      "Malnourishment — prominent keel bone, low body weight",
      "No parent birds visible after extended observation (2+ hours)",
    ],
    treatment: [
      "Initial assessment — age, species identification, health status",
      "Rehydration therapy (oral or subcutaneous fluids)",
      "Species-appropriate feeding schedule (every 2–4 hours for young chicks)",
      "Warmth management — incubators for very young birds",
      "Anti-imprinting protocols — minimal human contact for raptors",
      "Socialization with conspecifics when possible",
      "Gradual introduction to natural food and live prey (raptors)",
      "Flight training in rehabilitation aviary",
      "Soft release at appropriate habitat when fully independent",
    ],
    prevention: [
      "Avoid tree cutting during breeding season (March–August)",
      "Secure nesting sites before monsoon season",
      "If you find a healthy fledgling, leave it alone — parents are usually nearby",
      "Contact Wildlife Rescue before 'rescuing' a baby bird",
      "Install nest platforms for species displaced by construction",
    ],
    recoveryRate: "~70%",
    avgRecoveryTime: "4–12 weeks (depending on age at intake)",
    commonSpecies: [
      "Black Kite (chicks fall from urban nests)",
      "Blue Rock Pigeon",
      "Rose-ringed Parakeet",
      "Common Myna",
      "Barn Owl",
      "Spotted Owlet",
    ],
    caseStudy: {
      name: "Noor",
      species: "Barn Owl",
      story:
        "Found at just 3 weeks old on a balcony in Lajpat Nagar after a severe October storm. Severely underweight and drenched, Noor needed round-the-clock feeding for 4 weeks. Our team nursed her to full health and strength. She was released near her original nesting site, and the family who found her came to watch.",
      outcome: "Released",
    },
  },
  {
    slug: "avian-pox",
    name: "Avian Pox",
    icon: "Bug",
    percentage: "Juveniles",
    percentageLabel: "only",
    annualCases: "~60/year",
    severity: "Serious",
    image: "/conditions/avian-pox-kite.jpg",
    images: [
      { src: "/conditions/avian-pox-kite.jpg", alt: "Juvenile Black Kite with avian pox lesions — warty growths visible around the beak and cere area" },
    ],
    shortDescription:
      "A viral disease seen only in juvenile birds, causing wart-like growths on skin, feet, and around the eyes. Can blind birds and prevent feeding if untreated.",
    description:
      "Avian pox is a viral disease caused by Avipoxvirus. At Wildlife Rescue we see it exclusively in juvenile birds — adult raptors and adult birds in general have already developed immunity from earlier exposure. We treat roughly 60 juvenile cases per year. The disease produces wart-like growths on unfeathered skin — feet, legs, the base of the beak, and around the eyes — that can swell shut, blind the bird, or interfere with feeding. The virus is transmitted primarily by mosquitoes, and also through direct contact with infected birds or contaminated surfaces. In Delhi's warm, humid climate — especially during and after monsoon — mosquito-borne transmission spikes dramatically, which is when we see the seasonal influx of juvenile cases.",
    causes: [
      "Mosquito bites — the primary transmission vector",
      "Direct contact with infected birds at communal roosting or feeding sites",
      "Contaminated surfaces — perches, feeding stations, water sources",
      "Open wounds that provide entry points for the virus",
      "Juvenile immune systems that haven't yet been exposed to the virus",
    ],
    symptoms: [
      "Wart-like nodules on feet, legs, beak base, and around eyes",
      "Crusty, raised lesions that may be yellow, brown, or dark",
      "Swollen or closed eyes — can lead to blindness if untreated",
      "Difficulty eating if lesions develop around the beak",
      "Weight loss and lethargy as the disease progresses",
      "Stunted growth in young chicks",
    ],
    treatment: [
      "Isolation from other birds to prevent transmission",
      "Supportive care — fluids, nutrition, warmth",
      "Gentle removal of dried pox scabs when ready to separate",
      "Topical antiseptic application to lesion sites",
      "Antibiotic therapy to prevent secondary bacterial infections",
      "Eye drops and treatment if lesions affect vision",
      "Immune support — vitamin supplementation",
    ],
    prevention: [
      "Mosquito control at rescue facilities and known roost sites",
      "Regular disinfection of communal feeding and watering points",
      "Quarantine of new admissions to prevent facility spread",
      "Reduce overcrowding at pigeon feeding sites (temples, markets)",
      "Vaccination programs where feasible for captive populations",
    ],
    recoveryRate: "High — most juveniles recover with timely care",
    avgRecoveryTime: "3–6 weeks",
    commonSpecies: [
      "Juvenile Black Kite",
      "Juvenile Blue Rock Pigeon",
      "Juvenile Rose-ringed Parakeet",
      "Juvenile Common Myna",
      "Other juvenile passerines (occasional)",
    ],
    caseStudy: {
      name: "Guddu",
      species: "Juvenile Blue Rock Pigeon",
      story:
        "Brought in by a temple priest from Jama Masjid area with severe pox lesions covering both eyes — completely blind. After 3 weeks of careful treatment including daily eye drops and antiseptic application, the lesions dried and fell away. Guddu regained full vision and was released at the temple where the priest continues to watch over the resident flock.",
      outcome: "Released",
    },
  },
  {
    slug: "septicemia",
    name: "Septicemia & Infections",
    icon: "Thermometer",
    percentage: "~10%",
    annualCases: "~370/year",
    severity: "Critical",
    image: "/conditions/septicemia-owl-face.jpg",
    images: [
      { src: "/conditions/septicemia-owl-face.jpg", alt: "Barn Owl with infected eye wounds from septicemia" },
      { src: "/conditions/septicemia-eye-closeup.jpg", alt: "Close-up of infected eye wound on Barn Owl" },
      { src: "/conditions/septicemia-feet-both.jpg", alt: "Infected feet showing tissue damage from septicemia" },
      { src: "/conditions/septicemia-foot-closeup.jpg", alt: "Close-up of infected foot with tissue damage" },
      { src: "/conditions/septicemia-feet-held.jpg", alt: "Examining infected raptor feet during treatment" },
      { src: "/conditions/septicemia-egyptian-vulture.jpg", alt: "Sultan the Egyptian Vulture in care at Wildlife Rescue — an endangered bird being treated for septicemia" },
    ],
    shortDescription:
      "Life-threatening blood infections from untreated wounds, contaminated environments, or secondary to other diseases. Requires aggressive antibiotic therapy.",
    description:
      "Septicemia — bacterial infection of the bloodstream — is one of the most dangerous conditions Wildlife Rescue encounters. It accounts for approximately 10% of cases and has one of the highest mortality rates. Septicemia typically develops as a secondary complication: an untreated wound becomes infected, bacteria enter the bloodstream, and the infection becomes systemic. In Delhi's warm, humid environment, wounds become infected rapidly — often within hours. Birds brought in with old, untreated injuries frequently present with septicemia. The condition is also common in birds weakened by other diseases, malnutrition, or prolonged stress. Treatment is a race against time: aggressive antibiotic therapy must begin immediately, combined with fluid support and nutritional rehabilitation. Despite our best efforts, septicemia carries a significant mortality rate — early intervention is critical.",
    causes: [
      "Untreated wounds — cuts, fractures, and lacerations that become infected",
      "Contaminated environments — polluted water, landfills, sewage-exposed areas",
      "Secondary to other conditions — avian pox, fractures, burns",
      "Maggot infestation (myiasis) — fly larvae in wounds produce toxins",
      "Immunosuppression from stress, starvation, or concurrent disease",
      "Puncture wounds from animal attacks (dogs, cats, rats)",
    ],
    symptoms: [
      "Extreme lethargy — bird is unresponsive or barely moving",
      "Fluffed-up feathers, eyes closed, withdrawn posture",
      "Elevated body temperature (or abnormally low in late stages)",
      "Rapid breathing or open-mouth breathing",
      "Foul-smelling wounds with discharge or necrotic tissue",
      "Dehydration — sunken eyes, dry mucous membranes",
      "Sudden deterioration after seeming stable (septic shock)",
    ],
    treatment: [
      "Emergency triage — septicemia cases are treated as critical priority",
      "Aggressive broad-spectrum antibiotic therapy (IV or intramuscular)",
      "Fluid therapy — IV or subcutaneous to combat dehydration and shock",
      "Wound debridement — removal of necrotic tissue and maggots",
      "Thermal support — maintaining body temperature in weakened birds",
      "Nutritional support — tube feeding if bird cannot eat",
      "Blood culture and sensitivity testing to target specific bacteria",
      "Close monitoring — vital signs checked every few hours",
    ],
    prevention: [
      "Early treatment of wounds — the single most important preventive measure",
      "Community awareness: bring injured birds to WR immediately, don't wait",
      "Clean wound management in the field before transport",
      "Reducing environmental contamination at known bird habitats",
      "Rapid response to reported injured birds — our hotline: +91 98100 29698",
    ],
    recoveryRate: "~35%",
    avgRecoveryTime: "2–6 weeks (if bird survives the critical first 72 hours)",
    commonSpecies: [
      "Black Kite (from infected manja wounds)",
      "Blue Rock Pigeon",
      "All species (any bird with untreated injuries)",
    ],
    caseStudy: {
      name: "Veera",
      species: "Black Kite",
      story:
        "Found on the roadside in Wazirabad with an old manja wound on the left wing — at least a week old and severely infected. By the time Veera arrived, the infection had spread to the bloodstream. Aggressive IV antibiotics were started within minutes. The first 72 hours were critical — our team monitored him round the clock. Against the odds, Veera pulled through. After 5 weeks of recovery, he was released.",
      outcome: "Released",
    },
  },
  {
    slug: "methane-burns",
    name: "Methane & Chemical Burns",
    icon: "Flame",
    percentage: "~2%",
    annualCases: "~75/year",
    severity: "Critical",
    shortDescription:
      "Burns from methane gas ignition at landfills and industrial sites — one of Delhi's most severe and distinctive urban hazards for raptors.",
    description:
      "Delhi's vast landfills — Ghazipur, Bhalswa, Okhla — generate enormous quantities of methane from decomposing organic waste. Kites, vultures, and other scavenging raptors that feed at these sites are at constant risk of methane gas ignition events. When methane pockets ignite, birds caught nearby suffer severe burns to their feathers, skin, feet, and wing tips. The burns are often deep and can involve large surface areas, making them among the most challenging cases Wildlife Rescue treats. Kites are especially vulnerable because landfills are prime feeding grounds for them. Methane burn cases increased significantly as Delhi's landfills grew — Ghazipur alone exceeds the height of the Qutub Minar. Chemical contamination from industrial waste at these same sites adds another layer of complexity to treatment.",
    causes: [
      "Methane gas ignition at Delhi's landfills (Ghazipur, Bhalswa, Okhla)",
      "Industrial chemical burns from factory waste sites",
      "Contact with heated or burning material at waste dumps",
      "Secondary burns from fires that spread rapidly through dry landfill material",
      "Chemical contamination combined with thermal burns",
    ],
    symptoms: [
      "Charred, singed, or missing feathers over burned areas",
      "Blackened, blistered, or sloughing skin",
      "Burns on feet, wing tips, face, and beak — areas exposed during feeding",
      "Eye damage if face was close to ignition point",
      "Respiratory distress from smoke inhalation",
      "Shock — weakness, inability to stand, unresponsiveness",
    ],
    treatment: [
      "Emergency stabilisation — warmth, fluids, pain management",
      "Wound debridement — careful removal of dead tissue",
      "Topical wound treatment and protective dressings",
      "Laser therapy (VAYMED Class 4) to accelerate tissue regeneration",
      "Systemic antibiotics to prevent secondary infection",
      "Long-term feather regrowth monitoring — full recovery may require a full moult cycle",
      "Eye treatment if ocular damage present",
    ],
    prevention: [
      "Managed methane extraction and flaring at landfill sites",
      "Bird deterrents around active landfill zones",
      "Faster closure and capping of legacy landfill mountains",
      "Waste segregation to reduce organic content and methane generation",
    ],
    recoveryRate: "~50%",
    avgRecoveryTime: "8–20 weeks",
    commonSpecies: [
      "Black Kite — most frequent, feeds at landfills year-round",
      "Black Eared Kite — migratory visitor, unfamiliar with local hazards",
      "Egyptian Vulture — IUCN Endangered, feeds at same landfill sites",
      "Steppe Eagle — migratory, scavenges at landfills during winter",
    ],
    image: "/conditions/methane-burn-hero.jpg",
    images: [
      { src: "/conditions/methane-burn-02.jpg", alt: "Methane burn case — close-up of burn wounds being assessed at Wildlife Rescue" },
      { src: "/conditions/methane-burn-03.jpg", alt: "Raptor recovering from methane burn injuries — treatment in progress at Wildlife Rescue clinic" },
      { src: "/conditions/methane-burn-04.jpg", alt: "Bird with methane burn damage to wing and body — Wildlife Rescue clinic, early case" },
    ],
    caseStudy: {
      name: "",
      species: "Black Eared Kite",
      story:
        "This Black Eared Kite arrived from a landfill site with severe burns across its wing and body from a methane gas ignition event. The singed feathers and damaged skin required weeks of careful wound management and laser therapy. Cases like this — a migratory bird from Central Asia, fatally unfamiliar with Delhi's industrial hazards — illustrate why landfill management is as much a conservation issue as it is a public health one.",
      outcome: "Released",
      image: "/conditions/methane-burn-02.jpg",
    },
  },
  {
    slug: "other-conditions",
    name: "Other Conditions",
    icon: "Stethoscope",
    percentage: "~9%",
    annualCases: "~340/year",
    severity: "Variable",
    shortDescription:
      "Poisoning, electrocution burns, eye injuries, metabolic bone disease, lead toxicity, and other conditions that don't fit neatly into one category.",
    description:
      "Wildlife Rescue treats a wide variety of conditions beyond the five major categories. These include poisoning (pesticide, rodenticide, and lead), electrocution burns, eye injuries, metabolic bone disease in juveniles, dehydration and heat stress during Delhi's extreme summers, oil and chemical contamination, and neurological conditions. Each requires specialized expertise. Poisoning cases are particularly challenging — the bird may look normal initially before rapid deterioration. Electrocution burns are common during monsoon when wet birds contact power lines. Metabolic bone disease affects juveniles raised on inadequate diets (often by well-meaning rescuers who feed bread or rice). Lead poisoning is insidious — vultures and eagles that feed on carcasses containing lead ammunition fragments suffer cumulative toxicity. The diversity of conditions reflects the complexity of urban wildlife rescue in a megacity of 30+ million people.",
    causes: [
      "Poisoning — pesticides, rodenticides (secondary poisoning), lead ammunition fragments",
      "Electrocution — contact with power lines, especially during wet monsoon weather",
      "Eye injuries — from fights, collisions, thorns, or infections",
      "Metabolic Bone Disease (MBD) — calcium deficiency in hand-raised juveniles",
      "Dehydration and heat stress — during Delhi summers exceeding 45°C",
      "Oil and chemical contamination — from industrial areas and polluted waterways",
      "Neurological damage — head trauma from collisions, poisoning effects",
      "Bumblefoot (pododermatitis) — infected pressure sores on feet",
      "Aspergillosis — fungal respiratory infection, especially in immunocompromised birds",
    ],
    symptoms: [
      "Varies widely by condition",
      "Poisoning: tremors, seizures, green-stained droppings, sudden collapse",
      "Burns: charred or blackened tissue on feet, wing tips, or beak",
      "Eye injury: swollen or closed eye, discharge, head tilting",
      "MBD: soft or deformed bones, inability to stand, bowed legs in juveniles",
      "Heat stress: panting, wings held away from body, collapse",
      "Neurological: head tilt, circling, inability to balance, seizures",
    ],
    treatment: [
      "Condition-specific protocols — each condition has a tailored treatment plan",
      "Poisoning: activated charcoal, chelation therapy (for lead), IV fluids, supportive care",
      "Burns: wound management, pain control, anti-inflammatory medication, laser therapy",
      "Eye injuries: ophthalmic examination, eye drops, surgery if needed",
      "MBD: calcium and vitamin D supplementation, UV light exposure, diet correction",
      "Heat stress: gradual cooling, IV fluids, electrolyte therapy",
      "Aspergillosis: antifungal medication (itraconazole), nebulization therapy",
    ],
    prevention: [
      "Ban on harmful pesticides and secondary poisoning via rodenticides",
      "Bird-safe power line infrastructure — insulated transformers, flight diverters",
      "Public education — never feed bread or rice to baby birds",
      "Shade and water stations for birds during extreme heat events",
      "Reduced use of lead ammunition near wildlife areas",
      "Proper handling of oil and chemical waste near water bodies",
    ],
    recoveryRate: "~55% (varies widely by condition)",
    avgRecoveryTime: "1–12 weeks (varies widely)",
    commonSpecies: [
      "All species — these conditions affect every bird we treat",
      "Raptors are especially vulnerable to secondary poisoning and electrocution",
      "Waterbirds to oil contamination",
      "Juveniles to metabolic bone disease",
    ],
    caseStudy: {
      name: "Bahadur",
      species: "Crested Serpent Eagle",
      story:
        "Found unconscious beneath a power line in Sanjay Van during monsoon. Electrical burns on both feet and wing tips. The first 72 hours were critical — our team monitored him around the clock. Burn treatment, anti-inflammatory medication, and laser therapy over several weeks brought Bahadur back to full flight capability.",
      outcome: "Released",
    },
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return CONDITIONS_LIST.find((c) => c.slug === slug);
}
