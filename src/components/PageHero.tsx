import Image from "next/image";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

/**
 * Standard interior-page hero: dark band, optional background photograph.
 * The homepage uses its own taller treatment.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-20 pt-28 sm:pb-24 sm:pt-36">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55"
          />
        </>
      ) : null}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow tone="gold">{eyebrow}</Eyebrow> : null}
          <h1 className="text-4xl leading-[1.1] text-bone sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {intro ? (
            <div className="mt-6 text-lg leading-relaxed text-bone/75">
              {intro}
            </div>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
