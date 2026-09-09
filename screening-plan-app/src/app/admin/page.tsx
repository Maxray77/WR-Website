import Link from "next/link";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { CalendarPlus, ChevronRight, Ticket, Users, Clock3 } from "lucide-react";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { getSeatStatsMap } from "@/lib/bookings";
import { isAdmin } from "@/lib/auth";
import { AdminShell } from "./AdminShell";
import { ButtonLink, EmptyState, PageHeader, SeatMeter, StatusPill } from "@/components/ui";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function loadScreenings() {
  const all = await db
    .select()
    .from(screenings)
    .orderBy(desc(screenings.startsAt));
  return { all, now: Date.now() };
}

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");

  const { all, now } = await loadScreenings();
  const stats = await getSeatStatsMap(all);

  // Soonest first for things still to come; most recent first for the archive.
  const upcoming = all
    .filter((s) => s.startsAt.getTime() >= now && s.status !== "cancelled")
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const past = all.filter(
    (s) => s.startsAt.getTime() < now || s.status === "cancelled",
  );

  const totals = upcoming.reduce(
    (acc, s) => {
      const st = stats.get(s.id);
      return {
        seats: acc.seats + (st?.confirmedSeats ?? 0),
        capacity: acc.capacity + s.capacity,
        waiting: acc.waiting + (st?.waitlistedSeats ?? 0),
      };
    },
    { seats: 0, capacity: 0, waiting: 0 },
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <PageHeader
          eyebrow="Overview"
          title="Screenings"
          description="Every screening, its seat count and its waiting list. Open one to manage attendees, add people by hand or export the door list."
        />

        {upcoming.length > 0 && (
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <Kpi
              icon={<Ticket className="h-4 w-4" aria-hidden />}
              label="Upcoming screenings"
              value={String(upcoming.length)}
            />
            <Kpi
              icon={<Users className="h-4 w-4" aria-hidden />}
              label="Seats confirmed"
              value={`${totals.seats.toLocaleString("en-IN")} / ${totals.capacity.toLocaleString("en-IN")}`}
            />
            <Kpi
              icon={<Clock3 className="h-4 w-4" aria-hidden />}
              label="On waiting lists"
              value={totals.waiting.toLocaleString("en-IN")}
            />
          </dl>
        )}

        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-charcoal">Upcoming</h2>
          <div className="mt-4">
            {upcoming.length === 0 ? (
              <EmptyState
                icon={<CalendarPlus className="h-6 w-6" aria-hidden />}
                title="No upcoming screenings"
                action={
                  <ButtonLink href="/admin/screenings/new">
                    Schedule the first one
                  </ButtonLink>
                }
              >
                Create a screening, publish it, and the public page starts taking
                registrations straight away.
              </EmptyState>
            ) : (
              <ul className="space-y-3">
                {upcoming.map((s) => (
                  <ScreeningRow key={s.id} screening={s} stats={stats.get(s.id)} />
                ))}
              </ul>
            )}
          </div>
        </section>

        {past.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-lg font-bold text-charcoal">
              Past &amp; cancelled
            </h2>
            <ul className="mt-4 space-y-3 opacity-80">
              {past.map((s) => (
                <ScreeningRow key={s.id} screening={s} stats={stats.get(s.id)} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </AdminShell>
  );
}

function Kpi({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card px-5 py-4">
      <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-2xl font-bold text-charcoal">{value}</dd>
    </div>
  );
}

function ScreeningRow({
  screening,
  stats,
}: {
  screening: typeof screenings.$inferSelect;
  stats?: {
    capacity: number;
    confirmedSeats: number;
    waitlistedSeats: number;
    waitlistedBookings: number;
  };
}) {
  return (
    <li>
      <Link
        href={`/admin/screenings/${screening.id}`}
        className="card group flex flex-col gap-4 px-5 py-4 transition-all hover:border-teal/30 hover:shadow-md sm:flex-row sm:items-center"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={screening.status} />
            <span className="text-[13px] font-semibold text-teal">{screening.city}</span>
            {stats && stats.waitlistedBookings > 0 && (
              <span className="text-[12px] font-medium text-[#8a5d00]">
                {stats.waitlistedBookings} waiting
              </span>
            )}
          </div>
          <p className="mt-1 truncate font-display text-[15px] font-bold text-charcoal">
            {screening.venueName}
          </p>
          <p className="mt-0.5 text-[13px] text-slate">
            {formatDate(screening.startsAt)} · {formatTime(screening.startsAt)}
          </p>
        </div>

        <div className="w-full sm:w-56">
          {stats && (
            <SeatMeter
              capacity={stats.capacity}
              confirmedSeats={stats.confirmedSeats}
              compact
            />
          )}
        </div>

        <ChevronRight
          className="hidden h-5 w-5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 sm:block"
          aria-hidden
        />
      </Link>
    </li>
  );
}
