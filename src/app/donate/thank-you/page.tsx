import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle2, Mail, Share2 } from "lucide-react";
import { ButtonLink, Container, Section } from "@/components/ui";
import { ORG, PARTNER, SOCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your donation to Raptor Rescue and Research Inc. was received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink pb-20 pt-32 sm:pt-40">
        <Image
          src="/img/hero-barn-owl.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/85 to-ink"
        />
        <Container size="narrow" className="relative z-10 text-center">
          <CheckCircle2
            className="mx-auto h-14 w-14 text-gold"
            aria-hidden="true"
          />
          <h1 className="mt-7 text-4xl text-bone sm:text-5xl">Thank you.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone/80">
            Your donation has gone through. Somewhere in Wazirabad it will turn
            into antibiotics, sutures, anaesthetic gas or a week of aviary time
            for a bird that would otherwise not fly again.
          </p>
        </Container>
      </section>

      <Section tone="bone">
        <Container size="narrow">
          <div className="rounded-3xl border border-line bg-white p-8 sm:p-10">
            <h2 className="font-display text-2xl text-ink">What happens now</h2>
            <ol className="mt-6 space-y-5">
              {[
                {
                  title: "A receipt is on its way",
                  body: "Stripe has emailed you a payment confirmation. Keep it — for gifts under $250 it is sufficient substantiation for the IRS.",
                },
                {
                  title: "For gifts of $250 or more",
                  body: `We will send a written acknowledgement letter stating that no goods or services were provided in exchange. If it has not arrived within a week, write to ${ORG.email}.`,
                },
                {
                  title: "Your gift joins the next grant",
                  body: `Contributions are pooled and granted to ${PARTNER.name} against documented need, and reported in our annual IRS return.`,
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ember-light font-semibold text-ember">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 leading-relaxed text-ash">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-9 border-t border-line pt-7">
              <h3 className="flex items-center gap-2 font-display text-xl text-ink">
                <Share2 className="h-5 w-5 text-ember" aria-hidden="true" />
                One more thing that helps
              </h3>
              <p className="mt-3 leading-relaxed text-ash">
                Most people who support us arrived through a film. The single
                most useful thing you can do next is tell someone else this
                clinic exists — and check whether your employer will match what
                you just gave.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/wildlife-rescue" tone="ink">
                  See the work you funded
                </ButtonLink>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
                >
                  Follow the clinic
                </a>
              </div>
            </div>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ash">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Questions about your gift?{" "}
            <a
              href={`mailto:${ORG.email}`}
              className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
            >
              {ORG.email}
            </a>
          </p>
        </Container>
      </Section>
    </>
  );
}
