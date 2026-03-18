"use client";

import { useState } from "react";
import {
  Heart,
  Stethoscope,
  Camera,
  Globe,
  Truck,
  GraduationCap,
  Clock,
  MapPin,
  CheckCircle,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const ROLES = [
  {
    icon: <Stethoscope size={24} />,
    title: "Veterinary Volunteer",
    commitment: "2–4 weeks minimum",
    description:
      "Assist with bird examinations, wound care, medication, and feeding. Hands-on experience with raptor medicine under expert guidance from our team.",
    requirements: ["Vet students or licensed vets preferred", "Comfortable handling birds of prey", "Physical stamina for long days"],
  },
  {
    icon: <Heart size={24} />,
    title: "Bird Care Assistant",
    commitment: "1–2 weeks minimum",
    description:
      "Help with daily feeding of 40+ birds, cage cleaning, flight conditioning, and monitoring recovery progress.",
    requirements: ["No experience needed — we train you", "Must be gentle and patient", "Early morning start (6 AM)"],
  },
  {
    icon: <Camera size={24} />,
    title: "Photographer / Videographer",
    commitment: "Flexible",
    description:
      "Document rescue operations, rehabilitation progress, and release events. Your content helps us raise awareness and funds globally.",
    requirements: ["Own camera/equipment", "Portfolio preferred", "Comfortable in field conditions"],
  },
  {
    icon: <Globe size={24} />,
    title: "Social Media & Outreach",
    commitment: "Remote, ongoing",
    description:
      "Manage our social media presence, create content, respond to supporters, and help grow our online community.",
    requirements: ["Experience with social media management", "Strong English writing", "Can work remotely"],
  },
  {
    icon: <Truck size={24} />,
    title: "Rescue Driver / Field Support",
    commitment: "On-call",
    description:
      "Assist with emergency rescue calls across Delhi. Collect injured birds from partner hospitals and citizen rescuers.",
    requirements: ["Valid Delhi driving license", "Knowledge of Delhi roads", "Available for emergency calls"],
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Research Intern",
    commitment: "3–6 months",
    description:
      "Contribute to our data collection, species tracking, and research on raptor ecology in urban environments. Published research opportunities.",
    requirements: ["Enrolled in biology/ecology/vet program", "Data analysis skills", "Research methodology knowledge"],
  },
];

const FAQ = [
  {
    q: "Do I need experience with birds?",
    a: "Not for most roles! We provide hands-on training. Veterinary volunteers should have some animal handling experience, but bird care assistants and other roles welcome complete beginners.",
  },
  {
    q: "Is accommodation provided?",
    a: "We don't provide housing, but we can help you find affordable accommodation near our center in Wazirabad Village. Many volunteers stay in nearby guest houses.",
  },
  {
    q: "Can international volunteers apply?",
    a: "Absolutely! We welcome volunteers from around the world. You'll need to arrange your own visa (tourist visa works for short-term volunteering). Many of our volunteers come from the US, UK, and Europe.",
  },
  {
    q: "What are the working hours?",
    a: "Typically 6 AM to 6 PM with breaks. Raptors need early morning feeding, so expect early starts. Emergency calls can happen anytime.",
  },
  {
    q: "Is there a minimum age?",
    a: "Volunteers should be at least 18 years old, or 16+ with parental consent and accompanied by a guardian.",
  },
];

export default function VolunteerPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart size={48} className="text-amber mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Get Involved
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            Join our team — volunteer your time, skills, or expertise to save
            raptors in Delhi.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { icon: <MapPin size={18} />, text: "Wazirabad Village, Delhi" },
              { icon: <Clock size={18} />, text: "Year-round opportunities" },
            ].map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 text-white/70 text-sm"
              >
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Volunteer Roles ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Volunteer Roles"
            subtitle="Find the role that fits your skills and availability."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all flex flex-col"
              >
                <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center text-teal mb-4">
                  {role.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                  {role.title}
                </h3>
                <span className="text-xs text-amber font-semibold mt-1">
                  {role.commitment}
                </span>
                <p className="text-sm text-slate mt-3 leading-relaxed flex-1">
                  {role.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {role.requirements.map((req) => (
                    <li
                      key={req}
                      className="text-xs text-slate flex items-start gap-2"
                    >
                      <CheckCircle
                        size={14}
                        className="text-teal shrink-0 mt-0.5"
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Application Form ─── */}
      <section className="bg-offwhite py-16 lg:py-24" id="apply">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Apply to Volunteer"
            subtitle="Tell us about yourself and we'll get back to you within a week."
          />

          {formSubmitted ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <CheckCircle size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Application Received!
              </h3>
              <p className="text-slate mt-2">
                Thank you for your interest. We&apos;ll review your application
                and get back to you within a week.
              </p>
            </div>
          ) : (
            <form
              className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");
                const form = e.currentTarget;
                const data = new FormData(form);
                try {
                  const res = await fetch("/api/volunteer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: data.get("name"),
                      email: data.get("email"),
                      phone: data.get("phone"),
                      location: data.get("location"),
                      role: selectedRole,
                      dates: data.get("dates"),
                      about: data.get("about"),
                    }),
                  });
                  const result = await res.json();
                  if (!res.ok) throw new Error(result.error);
                  setFormSubmitted(true);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Something went wrong");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {error && (
                <div className="flex items-center gap-2 bg-danger/10 text-danger rounded-lg p-3 text-sm">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">
                  Interested Role *
                </label>
                <select
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal bg-white"
                >
                  <option value="">Select a role...</option>
                  {ROLES.map((r) => (
                    <option key={r.title} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                  <option value="Other">Other / Multiple</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">
                  Available Dates
                </label>
                <input
                  type="text"
                  name="dates"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  placeholder="e.g., June 2026, 2 weeks"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">
                  Tell Us About Yourself *
                </label>
                <textarea
                  name="about"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                  placeholder="Relevant experience, motivation, and what you hope to contribute..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-teal text-white font-bold rounded-full hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-60"
              >
                <Send size={16} /> {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about volunteering with us."
          />

          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-bold text-charcoal text-sm font-[family-name:var(--font-poppins)]">
                  {item.q}
                </h3>
                <p className="text-sm text-slate mt-2 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
