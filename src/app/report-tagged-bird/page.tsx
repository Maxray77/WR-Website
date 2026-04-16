"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tag,
  MapPin,
  Camera,
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Bird,
  Calendar,
  Info,
  Phone,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CONTACT } from "@/lib/constants";

const SPECIES_OPTIONS = [
  "Black Kite",
  "Shikra",
  "Barn Owl",
  "Spotted Owlet",
  "Egyptian Vulture",
  "Steppe Eagle",
  "Peregrine Falcon",
  "Oriental Honey Buzzard",
  "Indian Scops Owl",
  "Crested Serpent Eagle",
  "Blue Rock Pigeon",
  "Indian Grey Hornbill",
  "Rose-ringed Parakeet",
  "Cattle Egret / Wetland Bird",
  "Other / Unknown",
];

const CONDITION_OPTIONS = [
  "Healthy — flying normally",
  "Injured — visible wound or unable to fly",
  "Weak — on the ground but alive",
  "Dead — found deceased",
  "Unknown — could not assess",
];

interface PhotoPreview {
  file: File;
  preview: string;
}

export default function ReportTaggedBirdPage() {
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    tagId: "",
    tagColor: "",
    tagLocation: "Leg (left)",
    species: "Black Kite",
    birdCondition: "Healthy — flying normally",
    sightingDate: new Date().toISOString().split("T")[0],
    sightingTime: "",
    locationDescription: "",
    city: "",
    coordinates: "",
    notes: "",
  });

  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: PhotoPreview[] = [];
    for (let i = 0; i < files.length; i++) {
      if (photos.length + newPhotos.length >= 5) break;
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) continue; // skip files over 10MB
      newPhotos.push({ file, preview: URL.createObjectURL(file) });
    }
    setPhotos((prev) => [...prev, ...newPhotos]);
    // Reset file input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const body = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      // Append photos
      photos.forEach((photo, i) => {
        body.append(`photo_${i}`, photo.file);
      });

      const res = await fetch("/api/report-tagged-bird", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit report");
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <>
        <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-poppins)]">
              Report A Tagged Bird
            </h1>
          </div>
        </section>
        <section className="py-20 lg:py-28">
          <div className="max-w-lg mx-auto px-4 text-center">
            <CheckCircle size={64} className="text-success mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-charcoal font-[family-name:var(--font-poppins)]">
              Report Submitted!
            </h2>
            <p className="text-slate mt-3 leading-relaxed">
              Thank you for reporting this tagged bird sighting. Your report
              helps us track the birds we&apos;ve rehabilitated and released.
              Our team will review your submission and may contact you for
              additional details.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-3 bg-teal text-white font-bold rounded-full hover:bg-teal-dark transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    reporterName: "",
                    reporterEmail: "",
                    reporterPhone: "",
                    tagId: "",
                    tagColor: "",
                    tagLocation: "Leg (left)",
                    species: "Black Kite",
                    birdCondition: "Healthy — flying normally",
                    sightingDate: new Date().toISOString().split("T")[0],
                    sightingTime: "",
                    locationDescription: "",
                    city: "",
                    coordinates: "",
                    notes: "",
                  });
                  setPhotos([]);
                }}
                className="px-6 py-3 bg-offwhite text-charcoal font-bold rounded-full hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-teal-dark to-teal py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
            <Tag size={14} className="text-amber" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Bird Tracking
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-poppins)]">
            Report A Tagged Bird
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Spotted a bird with a Wildlife Rescue tag? Your report helps us
            track the survival and movement of birds we&apos;ve rehabilitated
            and released back into the wild.
          </p>
        </div>
      </section>

      {/* ─── Info Bar ─── */}
      <section className="bg-offwhite py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <Tag size={20} className="text-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal text-sm">
                  Identify the Tag
                </p>
                <p className="text-xs text-slate mt-0.5">
                  Note the tag number, colour, and which leg it&apos;s on.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <Camera size={20} className="text-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal text-sm">
                  Take Photos
                </p>
                <p className="text-xs text-slate mt-0.5">
                  Photograph the tag close-up and the bird if possible.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <MapPin size={20} className="text-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal text-sm">
                  Note the Location
                </p>
                <p className="text-xs text-slate mt-0.5">
                  Where and when you saw the bird — as precise as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Form ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Sighting Report Form"
            subtitle="Fill in what you can — every detail helps us track our birds."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100 space-y-8"
          >
            {status === "error" && (
              <div className="flex items-center gap-2 bg-danger/10 text-danger rounded-lg p-3 text-sm">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            {/* ── Section: Your Details ── */}
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-4">
                <Info size={18} className="text-teal" />
                Your Details
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="reporterName"
                    required
                    value={formData.reporterName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="reporterEmail"
                    required
                    value={formData.reporterEmail}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="reporterPhone"
                    value={formData.reporterPhone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
              </div>
            </fieldset>

            <hr className="border-gray-100" />

            {/* ── Section: Tag Details ── */}
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-4">
                <Tag size={18} className="text-amber" />
                Tag Details
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Tag Number / ID
                  </label>
                  <input
                    type="text"
                    name="tagId"
                    value={formData.tagId}
                    onChange={handleChange}
                    placeholder="e.g. WR-2024-0153"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                  <p className="text-xs text-slate mt-1">
                    If you can read the number on the tag
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Tag Colour
                  </label>
                  <input
                    type="text"
                    name="tagColor"
                    value={formData.tagColor}
                    onChange={handleChange}
                    placeholder="e.g. Red, Blue, Yellow"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Tag Position
                  </label>
                  <select
                    name="tagLocation"
                    value={formData.tagLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal bg-white"
                  >
                    <option>Leg (left)</option>
                    <option>Leg (right)</option>
                    <option>Leg (unsure which)</option>
                    <option>Wing</option>
                    <option>Other / Unsure</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <hr className="border-gray-100" />

            {/* ── Section: Bird Details ── */}
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-4">
                <Bird size={18} className="text-teal" />
                Bird Details
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Species (if known)
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal bg-white"
                  >
                    {SPECIES_OPTIONS.map((sp) => (
                      <option key={sp}>{sp}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Condition *
                  </label>
                  <select
                    name="birdCondition"
                    required
                    value={formData.birdCondition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal bg-white"
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            <hr className="border-gray-100" />

            {/* ── Section: Sighting Details ── */}
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-4">
                <Calendar size={18} className="text-amber" />
                When &amp; Where
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Date of Sighting *
                  </label>
                  <input
                    type="date"
                    name="sightingDate"
                    required
                    value={formData.sightingDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Approximate Time
                  </label>
                  <input
                    type="time"
                    name="sightingTime"
                    value={formData.sightingTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    City / Area *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, Noida, Gurgaon"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    GPS Coordinates
                  </label>
                  <input
                    type="text"
                    name="coordinates"
                    value={formData.coordinates}
                    onChange={handleChange}
                    placeholder="e.g. 28.6139, 77.2090"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal"
                  />
                  <p className="text-xs text-slate mt-1">
                    Optional — from Google Maps or your phone
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Location Description *
                  </label>
                  <textarea
                    name="locationDescription"
                    required
                    rows={2}
                    value={formData.locationDescription}
                    onChange={handleChange}
                    placeholder="e.g. Near Yamuna Bank, perched on a tree along the river"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal resize-none"
                  />
                </div>
              </div>
            </fieldset>

            <hr className="border-gray-100" />

            {/* ── Section: Photos ── */}
            <fieldset>
              <legend className="flex items-center gap-2 text-lg font-bold text-charcoal font-[family-name:var(--font-poppins)] mb-4">
                <Camera size={18} className="text-teal" />
                Photos
              </legend>
              <p className="text-sm text-slate mb-4">
                Upload up to 5 photos — ideally a close-up of the tag and a
                wider shot of the bird. Max 10 MB per photo.
              </p>

              {/* Photo preview grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {photos.map((photo, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
                    >
                      <Image
                        src={photo.preview}
                        alt={`Upload ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-charcoal/70 hover:bg-danger rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove photo ${i + 1}`}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length < 5 && (
                <label className="flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-teal/40 hover:bg-teal-light/30 transition-colors cursor-pointer">
                  <Upload size={24} className="text-slate" />
                  <span className="text-sm font-semibold text-charcoal">
                    Click to upload photos
                  </span>
                  <span className="text-xs text-slate">
                    JPG, PNG, HEIC — up to 10 MB each ({5 - photos.length}{" "}
                    remaining)
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoAdd}
                    className="hidden"
                  />
                </label>
              )}
            </fieldset>

            <hr className="border-gray-100" />

            {/* ── Section: Additional Notes ── */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any other observations — behaviour, other birds nearby, weather conditions, etc."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal text-charcoal resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal hover:bg-teal-dark text-white font-bold px-8 py-3.5 rounded-full transition-colors disabled:opacity-60 shadow-md"
            >
              <Send size={16} />
              {status === "loading" ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </section>

      {/* ─── Emergency Note ─── */}
      <section className="bg-offwhite py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-bg border border-amber/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
            <Phone size={24} className="text-amber shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-charcoal font-[family-name:var(--font-poppins)]">
                Found an Injured Tagged Bird?
              </h3>
              <p className="text-sm text-slate mt-1 leading-relaxed">
                If the bird is injured and needs immediate help, please call us
                directly at{" "}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-teal font-bold hover:text-teal-dark"
                >
                  {CONTACT.phone}
                </a>{" "}
                or WhatsApp{" "}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal font-bold hover:text-teal-dark"
                >
                  +91 98100 29698
                </a>
                . You can still submit this form afterward for our records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
