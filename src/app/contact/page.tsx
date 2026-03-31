import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
  return (
    <>
      {/* ─── Contact Us Banner ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Contact Us
          </h1>
          <p className="mt-3 text-white/90 text-lg max-w-xl mx-auto">
            Get in touch with Wildlife Rescue. Found an injured bird? Call us
            during office hours.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 bg-white text-danger font-bold px-8 py-4 rounded-full text-xl hover:shadow-lg transition-all hover:scale-105"
            >
              <Phone size={24} />
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-success text-white font-semibold px-6 py-4 rounded-full hover:shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>

          <p className="mt-4 text-white/80 text-sm">
            If you find an injured bird, please keep it in a dark, quiet box
            with air holes. Do not try to feed it. Call us during office hours.
          </p>
        </div>
      </section>

      {/* ─── Contact Info + Map ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <SectionHeading title="Visit Us" centered={false} />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">Address</h3>
                    <p className="text-slate text-sm mt-1">
                      {CONTACT.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">Phone</h3>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-teal text-sm mt-1 hover:underline block"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">Email</h3>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal text-sm mt-1 hover:underline block"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">Office Hours</h3>
                    <p className="text-slate text-sm mt-1">
                      Monday – Saturday: 10:00 AM – 8:00 PM
                    </p>
                    <p className="text-slate text-sm">
                      Sunday: Closed (emergencies only by phone)
                    </p>
                    <p className="text-xs text-amber font-semibold mt-1">
                      Rescue calls accepted during office hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Getting There */}
              <div className="mt-8 bg-offwhite rounded-xl p-6">
                <h3 className="font-bold text-charcoal mb-2">Getting Here</h3>
                <p className="text-sm text-slate leading-relaxed">
                  Located in Wazirabad Village, North Delhi. Nearest Metro:
                  Jagatpur - Wazirabad (Pink Line). By car: Near
                  Signature Bridge on the Yamuna. Look for the Wildlife Rescue
                  in Wazirabad, Street No. 9.
                </p>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-offwhite rounded-2xl overflow-hidden border border-gray-200">
                <iframe
                  src={CONTACT.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wildlife Rescue Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Send Us a Message"
            subtitle="For general inquiries, volunteering, media requests, or any questions."
          />

          <ContactForm />
        </div>
      </section>
    </>
  );
}
