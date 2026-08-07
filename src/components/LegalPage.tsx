import type { ReactNode } from "react";
import { Container, Section } from "./ui";
import PageHero from "./PageHero";

export type LegalSection = { heading: string; body: ReactNode };

/** Shared shell for the privacy policy and terms, with a jump-to index. */
export default function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  const slug = (heading: string) =>
    heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} intro={intro} />

      <Section tone="bone">
        <Container size="narrow">
          <nav
            aria-label="Contents"
            className="rounded-2xl border border-line bg-white p-6"
          >
            <h2 className="font-display text-lg text-ink">Contents</h2>
            <ol className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#${slug(section.heading)}`}
                    className="text-ash transition-colors hover:text-ember"
                  >
                    <span className="text-ash/60">{i + 1}.</span>{" "}
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 space-y-12">
            {sections.map((section, i) => (
              <section key={section.heading} id={slug(section.heading)}>
                <h2 className="text-2xl text-ink">
                  <span className="mr-2 text-gold">{i + 1}.</span>
                  {section.heading}
                </h2>
                <div className="prose-r3 mt-4 text-ash">{section.body}</div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
