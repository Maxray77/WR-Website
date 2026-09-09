import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Info,
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { getSeatStats } from "@/lib/bookings";
import { Alert, Badge, SeatMeter } from "@/components/ui";
import { formatDate, formatTime, relativeDay } from "@/lib/utils";
import { RegisterForm } from "./RegisterForm";

export const dynamic = "force-dynamic";

async function getScreening(slug: string) {
  const [row] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.slug, slug))
    .limit(1);
  // The timestamp travels with the row so "has this already happened?" is
  // decided against the moment the data was read, not during render.
  return { screening: row, now: Date.now() };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { screening } = await getScreening(slug);
  if (!screening) return { title: "Screening not found" };
  return {
    title: `${screening.title} — ${screening.city}, ${formatDate(screening.startsAt)}`,
    description: `Free screening at ${screening.venueName}, ${screening.city}. Reserve your seat.`,
  };
}

export default async function ScreeningPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { screening, now } = await getScreening(slug);
  if (!screening || screening.status === "draft") notFound();

  const stats = await getSeatStats(screening);
  const isPast = screening.startsAt.getTime() < now;
  const isCancelled = screening.status === "cancelled";
  const isClosed = isPast || isCancelled || screening.status === "completed";
  const canWaitlist = stats.isFull && screening.waitlistEnabled;
  const registrationOpen =
    !isClosed && screening.status === "published" && (!stats.isFull || canWaitlist);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-teal"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All screenings
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        {/* Left — details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="teal">{screening.city}</Badge>
            {isCancelled ? (
              <Badge tone="red">Cancelled</Badge>
            ) : isPast ? (
              <Badge tone="slate">Past screening</Badge>
            ) : (
              <Badge tone="amber">{relativeDay(screening.startsAt)}</Badge>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            {screening.title}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate">{screening.venueName}</p>

          {isCancelled && (
            <Alert tone="error" title="This screening has been cancelled" className="mt-6">
              We&apos;re sorry for the disruption. Everyone who had booked has been
              emailed. Please check the homepage for other dates.
            </Alert>
          )}

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <Detail icon={<CalendarDays className="h-[18px] w-[18px]" />} label="Date">
              {formatDate(screening.startsAt)}
            </Detail>
            <Detail icon={<Clock className="h-[18px] w-[18px]" />} label="Time">
              {formatTime(screening.startsAt)}
              {screening.doorsOpenAt && (
                <span className="block text-sm font-normal text-slate">
                  Doors open {formatTime(screening.doorsOpenAt)}
                </span>
              )}
            </Detail>
            <Detail icon={<MapPin className="h-[18px] w-[18px]" />} label="Venue">
              {screening.venueAddress}
              {screening.mapUrl && (
                <a
                  href={screening.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-dark"
                >
                  Open in maps
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </Detail>
            <Detail icon={<Users className="h-[18px] w-[18px]" />} label="Capacity">
              {screening.capacity} seats
              <span className="block text-sm font-normal text-slate">
                Max {screening.maxSeatsPerBooking} per booking
              </span>
            </Detail>
          </dl>

          {screening.description && (
            <div className="mt-9 border-t border-line pt-8">
              <h2 className="font-display text-lg font-bold text-charcoal">
                About this screening
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate">
                {screening.description.split(/\n{2,}/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {screening.attendeeNotes && (
            <Alert tone="warn" className="mt-6">
              <span className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{screening.attendeeNotes}</span>
              </span>
            </Alert>
          )}
        </div>

        {/* Right — booking panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="border-b border-line bg-offwhite px-6 py-5">
              <SeatMeter
                capacity={stats.capacity}
                confirmedSeats={stats.confirmedSeats}
                waitlistedSeats={stats.waitlistedSeats}
              />
            </div>

            <div className="px-6 py-6">
              {registrationOpen ? (
                <>
                  <h2 className="font-display text-lg font-bold text-charcoal">
                    {canWaitlist ? "Join the waiting list" : "Reserve your free seat"}
                  </h2>
                  <p className="mb-5 mt-1 text-sm leading-relaxed text-slate">
                    {canWaitlist
                      ? "All seats are taken right now. Add your name and we'll confirm you automatically the moment one frees up."
                      : "Takes about thirty seconds. You'll get a confirmation email with your booking reference."}
                  </p>
                  <RegisterForm
                    screeningId={screening.id}
                    maxSeats={screening.maxSeatsPerBooking}
                    remaining={stats.remaining}
                    waitlistEnabled={screening.waitlistEnabled}
                  />
                </>
              ) : (
                <div className="py-4 text-center">
                  <h2 className="font-display text-lg font-bold text-charcoal">
                    {isCancelled
                      ? "Screening cancelled"
                      : isPast
                        ? "This screening has finished"
                        : "Registration is closed"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {isPast
                      ? "Thank you to everyone who came along."
                      : "This screening is full and the waiting list is closed."}
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-block text-sm font-semibold text-teal hover:text-teal-dark"
                  >
                    See other screenings →
                  </Link>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 px-1 text-center text-xs text-slate">
            Already registered?{" "}
            <Link href="/booking" className="font-medium text-teal hover:text-teal-dark">
              Manage your booking
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-light text-teal">
        {icon}
      </span>
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-wider text-slate">
          {label}
        </dt>
        <dd className="mt-0.5 font-medium leading-snug text-charcoal">{children}</dd>
      </div>
    </div>
  );
}
