import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Mail, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CONTACT } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
  return (
    <>
      {/* ─── Emergency Banner ─── */}
      <section className="bg-danger py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Report an Injured Bird
          </h1>
          <p className="mt-3 text-white/90 text-lg max-w-xl mx-auto">
            Found an injured bird? Call us immediately. We operate 24/7, 365
            days a year.
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

          <p className="mt-4 text-white/70 text-sm">
            If you find an injured bird, please keep it in a dark, quiet box
            with air holes. Do not try to feed it. Call us right away.
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
                    <h3 className="font-bold text-charcoal">Operating Hours</h3>
                    <p className="text-slate text-sm mt-1">
                      Open 24/7, 365 days a year
                    </p>
                    <p className="text-slate text-sm">
                      Visiting hours: 10:00 AM – 5:00 PM daily
                    </p>
                  </div>
                </div>
              </div>

              {/* Getting There */}
              <div className="mt-8 bg-offwhite rounded-xl p-6">
                <h3 className="font-bold text-charcoal mb-2">Getting Here</h3>
                <p className="text-sm text-slate leading-relaxed">
                  Located in Wazirabad Village, North Delhi. Nearest Metro:
                  Kashmere Gate (Yellow Line, ~20 min by auto). By car: Near
                  Wazirabad Bridge on the Yamuna. Look for the Wildlife Rescue
                  signboard on Street No. 9.
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

          <form className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal text-charcoal"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal text-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal text-charcoal bg-white">
                <option>General Inquiry</option>
                <option>Volunteer / Intern</option>
                <option>Media / Press</option>
                <option>Donation Question</option>
                <option>Report an Injured Bird</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal text-charcoal resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
