import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  PullQuote,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { PARTNER, PARTNER_STATS } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "The Wildlife Rescue Partnership",
  description:
    "Wildlife Rescue in Wazirabad, Delhi is the largest raptor rescue facility in the world. Forty thousand birds since 2010, 138 species, and a surgical technique for manja-cut wings they developed and then taught to the field.",
  path: "/wildlife-rescue",
  image: "/img/hero-egyptian-vulture.jpg",
});

const GALLERY = [
  {
    src: "/img/clinic-xray.jpg",
    alt: "Digital X-ray with DR detector in use at the clinic",
    caption: "Digital radiography — fractures mapped before surgery.",
  },
  {
    src: "/img/black-kite-recovery.jpg",
    alt: "A bandaged Black Kite recovering beside the gas anaesthesia machine",
    caption: "Coming round after surgery, bandaged and logged by case number.",
  },
  {
    src: "/img/nwra-stage1-slide.jpg",
    alt: "Nadeem Shehzad and Mohammad Saud presenting stage one of the repair, dorsal and ventral views on screen",
    caption:
      "Stage one, presented to the field: the skin layer sutured, dorsal and ventral.",
  },
  {
    src: "/img/aviary.jpg",
    alt: "Enclosures at the facility with recovering raptors perched at the far end",
    caption:
      "Enclosures and aviaries, where birds are conditioned before release.",
  },
  {
    src: "/img/owlet-chick.jpg",
    alt: "A Spotted Owlet chick in care",
    caption: "Orphan season. Chicks arrive by the hundred each summer.",
  },
  {
    src: "/img/barn-owl-group.jpg",
    alt: "Six Barn Owls ready for release",
    caption: "Six Barn Owls, the morning of their release.",
  },
];

const SPECIES = [
  { src: "/img/steppe-eagle.jpg", name: "Steppe Eagle", status: "Endangered" },
  {
    src: "/img/egyptian-vulture.jpg",
    name: "Egyptian Vulture",
    status: "Endangered",
  },
  { src: "/img/peregrine-falcon.jpg", name: "Peregrine Falcon", status: null },
  { src: "/img/scops-owl.jpg", name: "Indian Scops Owl", status: null },
  { src: "/img/black-eared-kite.jpg", name: "Black-Eared Kite", status: null },
  { src: "/img/spotted-owlet.jpg", name: "Spotted Owlet", status: null },
];

export default function WildlifeRescuePage() {
  return (
    <>
      <PageHero
        eyebrow="Where your gift goes"
        title="Wildlife Rescue, Wazirabad, Delhi"
        intro={
          <>
            The largest raptor rescue facility in the world, by the number of
            birds of prey it receives each year. Founded by two brothers who
            started with a single injured Black Kite and a family home.
          </>
        }
        image="/img/hero-egyptian-vulture.jpg"
        imageAlt="An Egyptian Vulture in flight"
      />

      {/* =============================================================== stats */}
      <Section tone="white" className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================== origin */}
      <Section tone="bone">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="How it started"
                title="A bird nobody would take."
              />
              <div className="prose-r3 mt-6 text-lg text-ash">
                <p>
                  In the early 1990s, {PARTNER.founders} — brothers in Delhi —
                  found an injured Black Kite and carried it to a bird hospital.
                  They were turned away. The hospital was vegetarian and did not
                  treat raptors, which eat meat.
                </p>
                <p>
                  So they treated it themselves. Then the next one, and the one
                  after that, out of their own home, funded by the small
                  soap-dispenser business they ran to pay for it. They taught
                  themselves avian anatomy, surgery and anaesthesia largely from
                  books and repetition.
                </p>
                <p>
                  Wildlife Rescue was formally registered under the Indian
                  Trusts Act in 2010. The case register has been kept by hand
                  ever since — every bird, numbered in sequence.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/img/founders.jpg"
                alt="Nadeem Shehzad and Mohammad Saud"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16">
            <PullQuote
              quote="One should not differentiate between the birds and oneself. Life itself is a kinship — we are all a community of air."
              attribution="Nadeem Shehzad and Mohammad Saud"
            />
          </div>
        </Container>
      </Section>

      {/* =============================================================== manja */}
      <Section tone="ink">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/img/manja-wound.jpg"
                alt="A manja wound across a Black Kite's wing"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="The signature injury"
                title="Manja"
                tone="light"
                intro={
                  <>
                    Kite-flying is a Delhi institution. The string used for it —
                    manja — is often coated in powdered glass so that flyers can
                    cut each other&rsquo;s lines. Strung invisibly across the
                    sky, it does the same thing to birds.
                  </>
                }
              />
              <div className="prose-r3 mt-6 text-lg text-bone/70">
                <p>
                  A manja strike catches the leading edge of the wing. It cuts
                  through skin, then through the propatagial tendon that holds
                  the wing&rsquo;s leading membrane taut, then into muscle and
                  nerve. In severe cases it reaches bone.
                </p>
                <p>
                  About {PARTNER.manjaShare} of documented injuries at the
                  clinic are manja wounds. It is not seasonal in the way people
                  assume — it happens all year, and spikes around the
                  kite-flying festivals.
                </p>
                <p className="text-bone">
                  Repairing it means rebuilding every severed layer, in order,
                  and then proving the wing works before the bird is released.
                  That is the technique the clinic spent years developing.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================ gallery */}
      <Section tone="bone">
        <Container size="wide">
          <SectionHeading
            eyebrow="Inside the facility"
            title="A working hospital, not a shelter."
            intro={
              <>
                Digital radiography, gas anaesthesia, a diagnostic laboratory, an
                ultrasonic bone cutter, surgical laser, intensive care and large
                flight aviaries — assembled over three decades, largely from
                donations.
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item) => (
              <figure key={item.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm leading-relaxed text-ash">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================= species */}
      <Section tone="sand">
        <Container size="wide">
          <SectionHeading
            eyebrow="Who arrives"
            title={`${PARTNER.speciesCount} species, and counting.`}
            intro={
              <>
                Black Kites make up roughly {PARTNER.blackKiteShare} of intake —
                Delhi holds one of the densest populations of them on earth. The
                remainder spans owls, falcons, eagles, vultures, storks and
                herons.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {SPECIES.map((s) => (
              <div key={s.name}>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">{s.name}</p>
                {s.status ? (
                  <p className="text-xs font-semibold uppercase tracking-wider text-ember">
                    {s.status}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ what we fund */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Our role"
            title="What an American charity can usefully do."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Consumables that never stop",
                body: "Antibiotics, analgesia, fluids, sutures, dressings, anaesthetic gas and food. Unglamorous, constant, and the first thing to run short.",
              },
              {
                title: "Equipment and its upkeep",
                body: "Imaging, surgical and laboratory equipment has to be bought, serviced and eventually replaced. Capital gifts are hard to raise locally.",
              },
              {
                title: "The research they give away",
                body: "Documenting outcomes and presenting technique at professional symposia costs money and earns none. It is also how one clinic's knowledge reaches many.",
              },
            ].map((c) => (
              <Card key={c.title}>
                <h3 className="text-xl text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ash">{c.body}</p>
              </Card>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4">
            <ButtonLink href="/donate" tone="ember" size="lg">
              Fund this clinic
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <a
              href={PARTNER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ash hover:text-ember"
            >
              Visit Wildlife Rescue&rsquo;s own site
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
