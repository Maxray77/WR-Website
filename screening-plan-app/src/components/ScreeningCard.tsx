import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import type { Screening } from "@/lib/db/schema";
import type { SeatStats } from "@/lib/bookings";
import { Badge, SeatMeter } from "@/components/ui";
import { formatDate, formatTime, relativeDay } from "@/lib/utils";

export function ScreeningCard({
  screening,
  stats,
}: {
  screening: Screening;
  stats: SeatStats;
}) {
  const soon = relativeDay(screening.startsAt);
  const full = stats.isFull;

  return (
    <Link
      href={`/screenings/${screening.slug}`}
      className="card group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg"
    >
      <div className="relative flex items-start justify-between gap-3 border-b border-line bg-gradient-to-br from-teal to-teal-dark px-5 py-4">
        <div className="text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
            {screening.city}
          </p>
          <p className="mt-0.5 font-display text-lg font-bold leading-snug">
            {screening.venueName}
          </p>
        </div>
        <Badge
          tone="amber"
          className="shrink-0 bg-white/15 text-white ring-white/25 backdrop-blur"
        >
          {soon}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        <dl className="space-y-2 text-sm">
          <div className="flex items-center gap-2.5 text-charcoal">
            <CalendarDays className="h-4 w-4 shrink-0 text-teal" aria-hidden />
            <dd className="font-medium">{formatDate(screening.startsAt)}</dd>
          </div>
          <div className="flex items-center gap-2.5 text-charcoal">
            <Clock className="h-4 w-4 shrink-0 text-teal" aria-hidden />
            <dd className="font-medium">
              {formatTime(screening.startsAt)}
              {screening.doorsOpenAt && (
                <span className="font-normal text-slate">
                  {" "}
                  · doors {formatTime(screening.doorsOpenAt)}
                </span>
              )}
            </dd>
          </div>
          <div className="flex items-start gap-2.5 text-slate">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
            <dd className="line-clamp-2">{screening.venueAddress}</dd>
          </div>
        </dl>

        <div className="mt-auto">
          <SeatMeter
            capacity={stats.capacity}
            confirmedSeats={stats.confirmedSeats}
            waitlistedSeats={stats.waitlistedSeats}
          />
          <div className="mt-4 flex items-center justify-between">
            <span
              className={
                full
                  ? "text-[13px] font-semibold text-[#8a5d00]"
                  : "text-[13px] font-semibold text-teal"
              }
            >
              {full
                ? screening.waitlistEnabled
                  ? "Join the waiting list"
                  : "Registration closed"
                : "Reserve a free seat"}
            </span>
            <ArrowRight
              className="h-4 w-4 text-teal transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
