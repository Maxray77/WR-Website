import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Clock3,
  MapPin,
  Users,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { findByReference, getWaitlistPosition } from "@/lib/bookings";
import { Alert, Badge, ButtonLink } from "@/components/ui";
import { formatDate, formatTime, safeEqual } from "@/lib/utils";
import { CancelButton } from "./CancelButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your booking",
  robots: { index: false, follow: false },
};

/** Reads the booking and the clock together, so "already happened?" is
 *  judged against the moment the data was loaded. */
async function loadBooking(reference: string) {
  const found = await findByReference(reference);
  return found ? { ...found, now: Date.now() } : undefined;
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ t?: string; new?: string }>;
}) {
  const { reference } = await params;
  const { t: token, new: isNew } = await searchParams;

  const found = await loadBooking(decodeURIComponent(reference));
  if (!found) notFound();
  const { now } = found;

  const { registration, screening } = found;

  // The manage token is the only credential on this page — without it we show
  // nothing, so a guessed reference alone leaks no personal details.
  if (!token || !safeEqual(token, registration.manageToken)) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="card px-6 py-10 text-center sm:px-8">
          <h1 className="font-display text-xl font-bold text-charcoal">
            This link isn&apos;t valid
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Booking links are personal and expire if the reference is changed. Please
            open the link from your confirmation email, or look your booking up again.
          </p>
          <ButtonLink href="/booking" className="mt-6">
            Find my booking
          </ButtonLink>
        </div>
      </div>
    );
  }

  const waitlistPosition = await getWaitlistPosition(registration);
  const cancelled = registration.status === "cancelled";
  const waitlisted = registration.status === "waitlisted";

  // The QR is a door pass, so only a confirmed seat gets one.
  const qrDataUrl =
    registration.status === "confirmed"
      ? await QRCode.toDataURL(registration.reference, {
          margin: 1,
          width: 360,
          color: { dark: "#0A6E5C", light: "#FFFFFF" },
        })
      : null;
  const screeningCancelled = screening.status === "cancelled";
  const isPast = screening.startsAt.getTime() < now;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {isNew === "1" && !cancelled && (
        <Alert
          tone={waitlisted ? "warn" : "success"}
          title={waitlisted ? "You're on the waiting list" : "You're in — seat confirmed"}
          className="mb-6 animate-rise"
        >
          {waitlisted
            ? "We've emailed you the details. As soon as a seat frees up we'll confirm you automatically and let you know."
            : "A confirmation email is on its way. Please bring your reference to the door."}
        </Alert>
      )}

      <div className="card overflow-hidden animate-rise">
        {/* Status header */}
        <div
          className={
            cancelled || screeningCancelled
              ? "bg-gradient-to-br from-red-600 to-red-700 px-6 py-6 text-white sm:px-8"
              : waitlisted
                ? "bg-gradient-to-br from-amber to-[#c98a10] px-6 py-6 text-charcoal sm:px-8"
                : "bg-gradient-to-br from-teal to-teal-dark px-6 py-6 text-white sm:px-8"
          }
        >
          <div className="flex items-center gap-2.5">
            {cancelled || screeningCancelled ? (
              <XCircle className="h-5 w-5" aria-hidden />
            ) : waitlisted ? (
              <Clock3 className="h-5 w-5" aria-hidden />
            ) : (
              <CheckCircle2 className="h-5 w-5" aria-hidden />
            )}
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-90">
              {screeningCancelled
                ? "Screening cancelled"
                : cancelled
                  ? "Booking cancelled"
                  : waitlisted
                    ? "On the waiting list"
                    : "Seat confirmed"}
            </p>
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">
            {screening.title}
          </h1>
          <p className="mt-1 opacity-90">
            {screening.venueName}, {screening.city}
          </p>
        </div>

        <div className="grid gap-8 px-6 py-7 sm:px-8 md:grid-cols-[1fr_auto]">
          {/* Details */}
          <div>
            <dl className="space-y-4">
              <Row icon={<CalendarDays className="h-[18px] w-[18px]" />} label="Date">
                {formatDate(screening.startsAt)}
              </Row>
              <Row icon={<Clock className="h-[18px] w-[18px]" />} label="Time">
                {formatTime(screening.startsAt)}
                {screening.doorsOpenAt && (
                  <span className="block text-sm font-normal text-slate">
                    Doors open {formatTime(screening.doorsOpenAt)}
                  </span>
                )}
              </Row>
              <Row icon={<MapPin className="h-[18px] w-[18px]" />} label="Venue">
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
              </Row>
              <Row icon={<Users className="h-[18px] w-[18px]" />} label="Booked for">
                {registration.name}
                <span className="block text-sm font-normal text-slate">
                  {registration.seats} {registration.seats === 1 ? "seat" : "seats"} ·{" "}
                  {registration.email}
                </span>
              </Row>
            </dl>

            {waitlisted && waitlistPosition && (
              <Alert tone="warn" className="mt-6">
                You are <strong>number {waitlistPosition}</strong> in the queue. Please
                don&apos;t travel to the venue until we confirm your seat by email.
              </Alert>
            )}

            {screening.attendeeNotes && !cancelled && (
              <Alert tone="info" className="mt-4">
                {screening.attendeeNotes}
              </Alert>
            )}
          </div>

          {/* Reference + QR */}
          <div className="md:w-[200px]">
            <div
              className={
                cancelled
                  ? "rounded-2xl border border-line bg-offwhite p-4 text-center opacity-50"
                  : waitlisted
                    ? "rounded-2xl border border-dashed border-amber/50 bg-amber-soft p-4 text-center"
                    : "rounded-2xl border border-dashed border-teal/40 bg-teal-light p-4 text-center"
              }
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate">
                Reference
              </p>
              <p className="mt-1 font-mono text-xl font-extrabold tracking-wider text-teal-dark">
                {registration.reference}
              </p>
              {qrDataUrl && (
                <div className="mt-3 overflow-hidden rounded-xl bg-white p-2">
                  <Image
                    src={qrDataUrl}
                    alt={`QR code for booking ${registration.reference}`}
                    width={360}
                    height={360}
                    unoptimized
                    className="h-auto w-full"
                  />
                </div>
              )}
              <p className="mt-2 text-[11px] leading-snug text-slate">
                {cancelled
                  ? "No longer valid"
                  : waitlisted
                    ? "Not a door pass yet — we'll email you when your seat is confirmed"
                    : "Show this at the door"}
              </p>
            </div>
            {registration.checkedInAt && (
              <div className="mt-3 text-center">
                <Badge tone="green">Checked in</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-line bg-offwhite px-6 py-5 sm:px-8">
          {screeningCancelled ? (
            <Alert tone="error" title="This screening was cancelled">
              Your booking has been released. We&apos;ll announce new dates soon —
              thank you for your interest.
            </Alert>
          ) : cancelled ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate">
                This booking was cancelled and the seats released.
              </p>
              {!isPast && (
                <ButtonLink
                  href={`/screenings/${screening.slug}`}
                  variant="outline"
                  size="sm"
                >
                  Register again
                </ButtonLink>
              )}
            </div>
          ) : isPast ? (
            <p className="text-sm text-slate">
              This screening has taken place. Thank you for coming along.
            </p>
          ) : (
            <CancelButton
              reference={registration.reference}
              token={registration.manageToken}
              isWaitlisted={waitlisted}
            />
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate">
        <Link href="/" className="font-medium text-teal hover:text-teal-dark">
          Browse other screenings
        </Link>
      </p>
    </div>
  );
}

function Row({
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
