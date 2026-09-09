import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Printer,
  Users,
  Clock3,
  CheckCircle2,
  ArrowUpFromLine,
} from "lucide-react";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { getSeatStats, listRegistrations } from "@/lib/bookings";
import { isAdmin } from "@/lib/auth";
import { AdminShell } from "../../AdminShell";
import { promoteWaitlistAction, updateScreeningAction } from "../../actions";
import { ScreeningForm } from "@/components/ScreeningForm";
import { AddAttendeeForm } from "./AddAttendeeForm";
import { AttendeeRow } from "./AttendeeRow";
import { CancelScreeningButton } from "./CancelScreeningButton";
import { Alert, Badge, SeatMeter, StatusPill } from "@/components/ui";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminScreeningPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  const { created } = await searchParams;

  const [screening] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, id))
    .limit(1);
  if (!screening) notFound();

  const [stats, all] = await Promise.all([
    getSeatStats(screening),
    listRegistrations(screening.id),
  ]);

  const confirmed = all.filter((r) => r.status === "confirmed");
  const waitlisted = all.filter((r) => r.status === "waitlisted");
  const cancelled = all.filter((r) => r.status === "cancelled");
  const checkedIn = confirmed.filter((r) => r.checkedInAt).length;
  const promotable = stats.remaining > 0 && waitlisted.length > 0;

  return (
    <AdminShell breadcrumb={`${screening.city} · ${screening.venueName}`}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/admin"
          className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All screenings
        </Link>

        {created === "1" && (
          <Alert tone="success" title="Screening created" className="mt-5 no-print">
            {screening.status === "draft"
              ? "It's saved as a draft. Switch the status to Published below when you're ready for people to register."
              : "It's live on the public site and open for registrations."}
          </Alert>
        )}

        {/* Header */}
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={screening.status} />
              <Badge tone="teal">{screening.city}</Badge>
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
              {screening.venueName}
            </h1>
            <p className="mt-1 text-sm text-slate">
              {formatDate(screening.startsAt)} · {formatTime(screening.startsAt)}
              {screening.doorsOpenAt && ` · doors ${formatTime(screening.doorsOpenAt)}`}
            </p>
          </div>

          <div className="no-print flex flex-wrap gap-2">
            <Link
              href={`/screenings/${screening.slug}`}
              target="_blank"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-4 text-[13px] font-semibold text-charcoal transition-colors hover:border-teal hover:text-teal"
            >
              View public page
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a
              href={`/api/admin/export?screeningId=${screening.id}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-4 text-[13px] font-semibold text-charcoal transition-colors hover:border-teal hover:text-teal"
            >
              <Download className="h-4 w-4" aria-hidden />
              Export CSV
            </a>
            <Link
              href={`/admin/screenings/${screening.id}/door-list`}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-white px-4 text-[13px] font-semibold text-charcoal transition-colors hover:border-teal hover:text-teal"
            >
              <Printer className="h-4 w-4" aria-hidden />
              Door list
            </Link>
          </div>
        </div>

        {/* Seat summary */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card px-5 py-4 sm:col-span-2">
            <SeatMeter
              capacity={stats.capacity}
              confirmedSeats={stats.confirmedSeats}
              waitlistedSeats={stats.waitlistedSeats}
            />
          </div>
          <Kpi
            icon={<Users className="h-4 w-4" aria-hidden />}
            label="Confirmed bookings"
            value={String(confirmed.length)}
          />
          <Kpi
            icon={<Clock3 className="h-4 w-4" aria-hidden />}
            label="On waiting list"
            value={String(waitlisted.length)}
          />
        </div>

        {promotable && (
          <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber/30 bg-amber-soft px-4 py-3">
            <p className="text-sm text-[#7a5200]">
              {stats.remaining} {stats.remaining === 1 ? "seat is" : "seats are"} free and{" "}
              {waitlisted.length} {waitlisted.length === 1 ? "booking is" : "bookings are"}{" "}
              waiting. Promotion runs automatically on cancellation — use this to run it
              now.
            </p>
            <form action={promoteWaitlistAction}>
              <input type="hidden" name="screeningId" value={screening.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber px-3.5 py-2 text-[13px] font-bold text-charcoal hover:bg-amber-light"
              >
                <ArrowUpFromLine className="h-4 w-4" aria-hidden />
                Promote from waiting list
              </button>
            </form>
          </div>
        )}

        {/* Attendees + add form */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <AttendeeTable
              title="Confirmed"
              subtitle={
                confirmed.length > 0
                  ? `${confirmed.reduce((n, r) => n + r.seats, 0)} seats · ${checkedIn} checked in`
                  : undefined
              }
              rows={confirmed}
              screeningId={screening.id}
              emptyText="Nobody has booked yet."
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />}
            />

            <AttendeeTable
              title="Waiting list"
              subtitle={
                waitlisted.length > 0
                  ? "In queue order — confirmed oldest first as seats free up"
                  : undefined
              }
              rows={waitlisted}
              screeningId={screening.id}
              numbered
              emptyText="Nobody is waiting."
              icon={<Clock3 className="h-4 w-4 text-amber" aria-hidden />}
            />

            {cancelled.length > 0 && (
              <AttendeeTable
                title="Cancelled"
                rows={cancelled}
                screeningId={screening.id}
                emptyText=""
              />
            )}
          </div>

          <aside className="no-print space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="card px-5 py-5">
              <h2 className="font-display text-[15px] font-bold text-charcoal">
                Add someone by hand
              </h2>
              <p className="mb-4 mt-1 text-[13px] leading-relaxed text-slate">
                For phone bookings, walk-ins and guests. They go through the same seat
                and waiting-list rules as online registrations.
              </p>
              <AddAttendeeForm
                screeningId={screening.id}
                maxSeats={screening.maxSeatsPerBooking}
              />
            </div>
          </aside>
        </div>

        {/* Edit */}
        <section className="no-print mt-14 border-t border-line pt-10">
          <h2 className="font-display text-lg font-bold text-charcoal">
            Screening settings
          </h2>
          <div className="card mt-5 px-6 py-7 sm:px-8">
            <ScreeningForm
              action={updateScreeningAction}
              screening={screening}
              submitLabel="Save changes"
            />
          </div>

          {screening.status !== "cancelled" && (
            <div className="mt-8">
              <CancelScreeningButton
                screeningId={screening.id}
                affectedCount={confirmed.length + waitlisted.length}
              />
            </div>
          )}
        </section>
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
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate">
        {icon}
        {label}
      </p>
      <p className="mt-1.5 font-display text-2xl font-bold text-charcoal">{value}</p>
    </div>
  );
}

function AttendeeTable({
  title,
  subtitle,
  rows,
  screeningId,
  numbered = false,
  emptyText,
  icon,
}: {
  title: string;
  subtitle?: string;
  rows: Awaited<ReturnType<typeof listRegistrations>>;
  screeningId: string;
  numbered?: boolean;
  emptyText: string;
  icon?: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-[15px] font-bold text-charcoal">
          {icon}
          {title}
          <span className="rounded-full bg-offwhite px-2 py-0.5 text-[12px] font-semibold text-slate">
            {rows.length}
          </span>
        </h2>
        {subtitle && <p className="text-[12px] text-slate">{subtitle}</p>}
      </div>

      {rows.length === 0 ? (
        emptyText ? (
          <p className="card px-5 py-6 text-center text-sm text-slate">{emptyText}</p>
        ) : null
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[11px] font-bold uppercase tracking-wider text-slate">
                <th className="px-3 py-2.5">Attendee</th>
                <th className="px-3 py-2.5 text-center">Seats</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Reference</th>
                <th className="px-3 py-2.5 text-right no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r, i) => (
                <AttendeeRow
                  key={r.id}
                  registration={r}
                  screeningId={screeningId}
                  index={numbered ? i + 1 : undefined}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
