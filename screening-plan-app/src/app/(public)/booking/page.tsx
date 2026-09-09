import type { Metadata } from "next";
import Link from "next/link";
import { LookupForm } from "./LookupForm";

export const metadata: Metadata = {
  title: "Find my booking",
  description: "Look up, view or cancel your screening booking.",
};

export default function BookingLookupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 sm:py-20">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Find your booking
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate">
          Enter the reference from your confirmation email to view your seats, or to
          cancel if your plans have changed.
        </p>
      </div>

      <div className="card mt-8 px-6 py-7 sm:px-8">
        <LookupForm />
      </div>

      <p className="mt-6 text-center text-sm text-slate">
        Lost the email?{" "}
        <a
          href="mailto:nadeem@raptorrescue.org"
          className="font-medium text-teal hover:text-teal-dark"
        >
          Write to us
        </a>{" "}
        and we&apos;ll find it for you — or{" "}
        <Link href="/" className="font-medium text-teal hover:text-teal-dark">
          browse screenings
        </Link>
        .
      </p>
    </div>
  );
}
