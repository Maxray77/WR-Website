import { ButtonLink, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section tone="bone" className="py-32">
      <Container size="narrow" className="text-center">
        <p className="eyebrow text-ember">404</p>
        <h1 className="mt-4 text-4xl text-ink sm:text-5xl">
          That page has flown.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ash">
          The link may be out of date, or we may have moved something. The main
          sections of the site are all one click away.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" tone="ink" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/donate" tone="ember" size="lg">
            Donate
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
