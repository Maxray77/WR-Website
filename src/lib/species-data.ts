export interface Species {
  slug: string;
  name: string;
  scientificName: string;
  conservationStatus: string;
  iucnColor: string;
  percentage: string;
  annualCases: string;
  category: string;
  habitat: string;
  range: string;
  diet: string;
  size: string;
  behavior: string;
  threatsInDelhi: string;
  description: string;
  funFact: string;
}

export const SPECIES_LIST: Species[] = [
  {
    slug: "black-kite",
    name: "Black Kite",
    scientificName: "Milvus migrans",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~80%",
    annualCases: "~3,200/year",
    category: "Raptor",
    habitat: "Urban areas, open country near water, landfills, and markets. Delhi's Old City neighborhoods are a global hotspot for Black Kite density.",
    range: "Widespread across Europe, Asia, Africa, and Australasia. The Indian subspecies (M. m. govinda) is a year-round resident of the Indian subcontinent.",
    diet: "Opportunistic scavenger and predator. Feeds on fish, rodents, insects, scraps from markets, and waste. Often seen soaring over the Yamuna River and Delhi's landfills.",
    size: "Body length 47–60 cm, wingspan 120–153 cm, weight 400–900g. Medium-sized raptor with a distinctive forked tail.",
    behavior: "Highly social and gregarious. Nests on trees, ledges, and buildings in Delhi. Famous for their spectacular aerial acrobatics — swooping, diving, and kiting on thermal updrafts over the city.",
    threatsInDelhi: "Manja (glass-coated kite string) is the #1 threat — causes severe wing lacerations during festivals. Also electrocution from wet power lines during monsoon, vehicle collisions, poisoning from contaminated food at landfills, and habitat loss from rapid urbanization.",
    description: "The Black Kite is Delhi's most iconic raptor and the core of Wildlife Rescue's mission. Millions live in the city, making Delhi one of the highest concentrations of raptors in any urban area worldwide. Their presence is a barometer of the city's ecological health.",
    funFact: "Delhi has one of the highest densities of Black Kites in the world — estimated at over 5,000 birds in the city alone. They've lived alongside Delhi's human population for centuries.",
  },
  {
    slug: "barn-owl",
    name: "Barn Owl",
    scientificName: "Tyto alba",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~3.3%",
    annualCases: "~130/year",
    category: "Raptor",
    habitat: "Old buildings, temples, ruins, farmland edges, and cavity-rich trees. In Delhi, they favor heritage structures and abandoned buildings in older neighborhoods.",
    range: "One of the most widespread birds in the world — found on every continent except Antarctica. The Indian subspecies (T. a. stertens) is resident across the subcontinent.",
    diet: "Specialized rodent hunter. Hunts almost exclusively at night using extraordinary hearing — can locate prey in complete darkness. A single Barn Owl family can consume over 3,000 rodents per year.",
    size: "Body length 33–39 cm, wingspan 80–95 cm, weight 250–480g. Heart-shaped facial disc is distinctive.",
    behavior: "Strictly nocturnal. Silent flier due to specialized feather structure that muffles wing noise. Nests in cavities — buildings, tree hollows, and nest boxes.",
    threatsInDelhi: "Habitat loss as old buildings are demolished. Rodenticide poisoning (secondary poisoning from eating poisoned rats). Vehicle collisions at night. Superstition — some communities consider owls unlucky, leading to persecution.",
    description: "The Barn Owl is one of the most effective natural pest controllers on the planet. Their presence in Delhi should be celebrated, not feared. Wildlife Rescue treats ~130 Barn Owls annually, mostly juveniles that fall from nesting sites.",
    funFact: "A Barn Owl can hear a mouse's heartbeat from 30 feet away. Their asymmetric ears allow them to pinpoint prey in three dimensions using sound alone.",
  },
  {
    slug: "egyptian-vulture",
    name: "Egyptian Vulture",
    scientificName: "Neophron percnopterus",
    conservationStatus: "Endangered",
    iucnColor: "text-danger",
    percentage: "~0.2%",
    annualCases: "~7/year",
    category: "Raptor",
    habitat: "Open dry habitats, cliffs, and increasingly urban areas where they scavenge at dumps and slaughterhouses. In Delhi, found near the Yamuna floodplain and on the outskirts.",
    range: "Southern Europe, Africa, Middle East, and South Asia. Indian population has declined dramatically — estimated 80% decline in 3 generations.",
    diet: "Scavenger feeding on carcasses, waste, and organic refuse. One of the few birds that uses tools — drops stones on ostrich eggs to break them open.",
    size: "Body length 47–65 cm, wingspan 155–180 cm, weight 1.6–2.4 kg. Adults are distinctive white with black flight feathers and a yellow face.",
    behavior: "Often seen soaring on thermals. Relatively tolerant of humans. Nests on cliffs and building ledges. Can live 30+ years.",
    threatsInDelhi: "Diclofenac poisoning (the drug that decimated South Asia's vulture populations). Electrocution from power lines. Lead poisoning from contaminated carcasses. Habitat loss and disturbance at nesting sites.",
    description: "Every Egyptian Vulture matters. With IUCN Endangered status and populations crashing across South Asia, the individuals that Wildlife Rescue treats represent a critical contribution to species survival. We treat approximately 7 per year — each one is precious.",
    funFact: "Egyptian Vultures are one of the only birds known to use tools. They pick up stones in their beaks and throw them at ostrich eggs to crack them open — a behavior observed for thousands of years and depicted in ancient Egyptian art.",
  },
  {
    slug: "shikra",
    name: "Shikra",
    scientificName: "Accipiter badius",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~1.6%",
    annualCases: "~60/year",
    category: "Raptor",
    habitat: "Wooded areas, gardens, parks, and urban green spaces. Well-adapted to city life in Delhi — found in Lodhi Gardens, Sanjay Van, and residential areas with mature trees.",
    range: "Widespread across sub-Saharan Africa and South/Southeast Asia. Common resident across the Indian subcontinent.",
    diet: "Active predator hunting small birds, lizards, frogs, and large insects. Hunts from a perch, making short fast dashes to catch prey — a classic accipiter hunting style.",
    size: "Body length 26–30 cm, wingspan 40–55 cm, weight 75–160g. Small but fierce raptor with bright red-orange eyes.",
    behavior: "Bold and aggressive despite small size. Will defend territory against much larger birds. Fast, agile flier capable of navigating dense vegetation at speed.",
    threatsInDelhi: "Window strikes in modern buildings. Glue traps meant for rodents. Pesticide poisoning from eating contaminated insects and lizards. Nest disturbance during tree pruning.",
    description: "The Shikra is Delhi's most common small raptor — a compact, fierce predator perfectly adapted to urban life. Despite their small size, they're formidable hunters. Wildlife Rescue treats approximately 60 Shikras per year.",
    funFact: "The name 'Shikra' comes from the Hindi word 'shikari' (hunter). They were historically used in falconry across India and the Middle East — prized for their speed and agility.",
  },
  {
    slug: "spotted-owlet",
    name: "Spotted Owlet",
    scientificName: "Athene brama",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~0.4%",
    annualCases: "~15/year",
    category: "Raptor",
    habitat: "Extremely adaptable — found in gardens, parks, old buildings, temple complexes, and even busy marketplaces. One of Delhi's most common owls.",
    range: "Resident across South and Southeast Asia, from Iran to Vietnam. Abundant across the Indian subcontinent at all elevations up to 1,400m.",
    diet: "Insects, small rodents, lizards, and small birds. Most active at dusk and dawn (crepuscular) but also hunts during the day — unusual for an owl.",
    size: "Body length 19–21 cm, weight 110–120g. Small, stocky owl with spotted plumage, bright yellow eyes, and a perpetually surprised expression.",
    behavior: "Unusually bold for an owl — often seen bobbing and weaving on branches when curious or alarmed. Nests in tree cavities, wall holes, and building crevices. Often found in pairs.",
    threatsInDelhi: "Habitat loss as old trees and buildings are removed. Vehicle strikes during dusk/dawn hunting. Superstitious persecution. Nest disturbance during construction and renovation.",
    description: "The Spotted Owlet is one of Delhi's most charismatic birds — small, bold, and endlessly entertaining. Their wide-eyed expressions and head-bobbing behavior make them favorites of birdwatchers. Wildlife Rescue treats about 15 per year.",
    funFact: "Spotted Owlets are one of the few owl species that are regularly active during daylight. They're often the first owl species that Delhi birdwatchers learn to identify — usually spotted glaring from a hole in an old wall or tree.",
  },
  {
    slug: "crested-serpent-eagle",
    name: "Crested Serpent Eagle",
    scientificName: "Spilornis cheela",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~0.2%",
    annualCases: "~10/year",
    category: "Raptor",
    habitat: "Forested areas and woodland edges. In Delhi, found in the Ridge forests (Sanjay Van, Northern Ridge) and wooded campuses. Requires mature canopy for nesting.",
    range: "Widespread across South and Southeast Asia, from India to Indonesia. Indian populations are resident.",
    diet: "Specialized snake and reptile hunter — as the name suggests. Also takes frogs, lizards, small mammals, and birds. Hunts from a high perch, watching the forest floor for movement.",
    size: "Body length 56–74 cm, wingspan 123–155 cm, weight 420–1,800g. Large, impressive eagle with a distinctive crest and bold barred pattern.",
    behavior: "Soars on thermals with a distinctive loud, piercing call — one of the most recognizable raptor calls in Indian forests. Relatively shy compared to Black Kites.",
    threatsInDelhi: "Electrocution from power lines at forest edges. Habitat loss as Delhi's Ridge forests face encroachment. Vehicle collisions on roads cutting through forested areas. Disturbance at nest sites.",
    description: "The Crested Serpent Eagle is a magnificent forest raptor that most Delhiites don't even know lives in their city. Found in Delhi's Ridge forests, they represent the wild heart of the capital. Wildlife Rescue treats about 10 per year.",
    funFact: "Their loud, ringing 'kee-kee-kee-kee' call echoing through Delhi's Ridge forests is one of the most evocative wild sounds you can hear in an Indian city. In many Southeast Asian cultures, they're considered a symbol of watchfulness and courage.",
  },
  {
    slug: "blue-rock-pigeon",
    name: "Blue Rock Pigeon",
    scientificName: "Columba livia",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~6.3%",
    annualCases: "~240/year",
    category: "Urban Bird",
    habitat: "One of the most successful urban birds worldwide. Found everywhere in Delhi — markets, temples, residential areas, railway stations, and monuments.",
    range: "Native to southern Europe, North Africa, and South Asia. Feral populations now found worldwide — possibly the most widely distributed bird in the world.",
    diet: "Seeds, grains, food scraps. Highly adaptable feeder that thrives on human food waste and deliberate feeding at temples and public spaces.",
    size: "Body length 29–37 cm, wingspan 62–72 cm, weight 238–380g. Familiar gray bird with iridescent neck feathers.",
    behavior: "Highly social and gregarious. Capable of remarkable navigation — can find their way home over hundreds of kilometers. In Delhi, they congregate at temples and feeding spots in flocks of hundreds.",
    threatsInDelhi: "Thread and manja entanglement. Glue traps. Vehicle strikes. Disease outbreaks in dense populations. Poisoning from contaminated grain.",
    description: "Once a small part of intake, the Blue Rock Pigeon is now Wildlife Rescue's #2 species at 6.3% of cases — reflecting the organization's broadening mission beyond raptors to serve all Delhi's birds in need.",
    funFact: "Despite being the 'common pigeon,' Blue Rock Pigeons are remarkable navigators. They can detect the Earth's magnetic field, use the sun as a compass, and recognize landmarks from the air — abilities that humans exploited for thousands of years using carrier pigeons.",
  },
  {
    slug: "indian-grey-hornbill",
    name: "Indian Grey Hornbill",
    scientificName: "Ocyceros birostris",
    conservationStatus: "Least Concern",
    iucnColor: "text-success",
    percentage: "~0.4%",
    annualCases: "~15/year",
    category: "Cavity Nester",
    habitat: "Deciduous forests, orchards, and urban areas with large old trees. In Delhi, found in Ridge forests, old campuses (Delhi University, JNU), and areas with mature Ficus and Peepal trees.",
    range: "Endemic to the Indian subcontinent. Found across most of India except the northeast and extreme south.",
    diet: "Mainly fruit (figs are a favorite), supplemented with insects, lizards, and small vertebrates. Important seed disperser for many tree species.",
    size: "Body length 50–61 cm, weight 275–420g. Distinctive large curved bill with a casque (hornlike projection) on top.",
    behavior: "Famous for their extraordinary nesting behavior — the female seals herself inside a tree cavity with mud, leaving only a narrow slit for the male to pass food through. She remains sealed in for the entire incubation and chick-rearing period (~3 months).",
    threatsInDelhi: "Loss of old trees with suitable nesting cavities — the #1 threat. When old trees are cut, hornbills lose irreplaceable nesting sites. Window strikes. Competition for cavities with other species.",
    description: "The Indian Grey Hornbill is a barometer of urban tree health. Their presence indicates mature trees with cavities — a rapidly declining resource in Delhi's development boom. Wildlife Rescue treats about 15 per year.",
    funFact: "When the female hornbill seals herself inside the nesting cavity, she undergoes a complete feather molt — becoming temporarily flightless. She depends entirely on the male for food for up to 3 months. If the male dies, the female and chicks are trapped.",
  },
];

export function getSpeciesBySlug(slug: string): Species | undefined {
  return SPECIES_LIST.find((s) => s.slug === slug);
}
