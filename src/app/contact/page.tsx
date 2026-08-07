import { Mail, MapPin, Phone } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/ui";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { ORG, ORG_ADDRESS_ONE_LINE, PARTNER } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Raptor Rescue and Research Inc. — about a donation, a stock or DAF gift, employer matching, a bequest, or press enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to us. A person will answer."
        intro="We are a three-person volunteer board, not a call centre. That means replies take a day or two — and they come from a director, not a script."
      />

      <Section tone="bone">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <ContactForm />

            <div className="space-y-6">
              <Card>
                <h2 className="font-display text-xl text-ink">Direct details</h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-ink">Email</p>
                      <a
                        href={`mailto:${ORG.email}`}
                        className="text-ash hover:text-ember"
                      >
                        {ORG.email}
                      </a>
                      <br />
                      <a
                        href={`mailto:${ORG.altEmail}`}
                        className="text-ash hover:text-ember"
                      >
                        {ORG.altEmail}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-ink">Telephone</p>
                      <a
                        href={`tel:${ORG.phoneHref}`}
                        className="text-ash hover:text-ember"
                      >
                        {ORG.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-ink">Mailing address</p>
                      <p className="text-ash">{ORG_ADDRESS_ONE_LINE}</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <Card>
                <h2 className="font-display text-xl text-ink">
                  For your accountant
                </h2>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ["Legal name", ORG.name],
                    ["EIN", ORG.ein],
                    ["Status", ORG.status],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-ash">
                        {label}
                      </dt>
                      <dd className="text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <Card className="bg-sand">
                <h2 className="font-display text-xl text-ink">
                  Found an injured bird?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  We are a grant-making charity and do not operate a rescue
                  service ourselves. In the United States, contact a licensed
                  wildlife rehabilitator in your state — your state wildlife
                  agency keeps a list. In Delhi, contact{" "}
                  <a
                    href={PARTNER.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
                  >
                    {PARTNER.name}
                  </a>{" "}
                  directly.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand" className="py-16">
        <Container size="narrow" className="text-center">
          <SectionHeading
            title="Press and media"
            align="center"
            intro={
              <>
                For interviews, photography or information about our partner
                clinic and the documentary <em>All That Breathes</em>, write to{" "}
                <a
                  href={`mailto:${ORG.email}`}
                  className="font-semibold text-ember underline decoration-ember/30 underline-offset-4"
                >
                  {ORG.email}
                </a>{" "}
                with &ldquo;Press&rdquo; in the subject line.
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}
