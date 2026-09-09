import { asc, eq, gte, and } from "drizzle-orm";
import { CalendarX2, Ticket, Users, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { getSeatStatsMap } from "@/lib/bookings";
import { ScreeningCard } from "@/components/ScreeningCard";
import { ButtonLink, EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

/**
 * Screenings still worth showing: published, and not more than three hours
 * past their start time (so a listing doesn't vanish mid-show).
 */
async function loadUpcoming() {
  const cutoff = new Date(Date.now() - 3 * 60 * 60 * 1000);
  return db
    .select()
    .from(screenings)
    .where(
      and(eq(screenings.status, "published"), gte(screenings.startsAt, cutoff)),
    )
    .orderBy(asc(screenings.startsAt));
}

export default async function HomePage() {
  const upcoming = await loadUpcoming();
  const stats = await getSeatStatsMap(upcoming);

  const cities = Array.from(new Set(upcoming.map((s) => s.city))).sort();
  const totalSeats = upcoming.reduce((n, s) => n + s.capacity, 0);

  const byCity = cities.map((city) => ({
    city,
    items: upcoming.filter((s) => s.city === city),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-teal via-teal to-teal-dark">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="animate-rise text-[11px] font-bold uppercase tracking-[0.18em] text-amber-light">
            Academy Award nominee · Sundance Grand Jury Prize
          </p>
          <h1 className="animate-rise mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Come and watch <em className="not-italic text-amber-light">All That Breathes</em> with us
          </h1>
          <p className="animate-rise mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Wildlife Rescue hosts free community screenings of the Oscar-nominated
            documentary about two brothers in Delhi who have treated more than 40,000
            injured birds. Pick a city, reserve your seat, and we&apos;ll email your
            confirmation straight away.
          </p>

          <div className="animate-rise mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="#screenings"
              variant="amber"
              size="lg"
              className="shadow-lg"
            >
              <Ticket className="h-[18px] w-[18px]" aria-hidden />
              Find a screening
            </ButtonLink>
            <ButtonLink
              href="/booking"
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/15 hover:text-white"
            >
              Look up my booking
            </ButtonLink>
          </div>

          {upcoming.length > 0 && (
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <Stat
                icon={<CalendarX2 className="h-4 w-4" aria-hidden />}
                value={String(upcoming.length)}
                label={upcoming.length === 1 ? "Screening" : "Screenings"}
              />
              <Stat
                icon={<MapPin className="h-4 w-4" aria-hidden />}
                value={String(cities.length)}
                label={cities.length === 1 ? "City" : "Cities"}
              />
              <Stat
                icon={<Users className="h-4 w-4" aria-hidden />}
                value={totalSeats.toLocaleString("en-IN")}
                label="Seats"
              />
            </dl>
          )}
        </div>
      </section>

      {/* Listing */}
      <section id="screenings" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {upcoming.length === 0 ? (
          <EmptyState
            icon={<CalendarX2 className="h-6 w-6" aria-hidden />}
            title="No screenings scheduled just yet"
          >
            We&apos;re lining up the next set of dates. Check back soon, or write to{" "}
            <a
              href="mailto:nadeem@raptorrescue.org"
              className="font-medium text-teal hover:text-teal-dark"
            >
              nadeem@raptorrescue.org
            </a>{" "}
            if you&apos;d like to host a screening in your city.
          </EmptyState>
        ) : (
          <div className="space-y-14">
            {byCity.map(({ city, items }) => (
              <div key={city}>
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-charcoal">
                    {city}
                  </h2>
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-[13px] font-medium text-slate">
                    {items.length} {items.length === 1 ? "date" : "dates"}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => {
                    const stat = stats.get(s.id);
                    if (!stat) return null;
                    return <ScreeningCard key={s.id} screening={s} stats={stat} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-bold text-white">{value}</dd>
    </div>
  );
}
