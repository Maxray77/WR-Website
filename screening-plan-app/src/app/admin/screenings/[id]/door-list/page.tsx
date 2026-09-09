import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft, Printer } from "lucide-react";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { listRegistrations } from "@/lib/bookings";
import { isAdmin } from "@/lib/auth";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

/** Printable A4 check-in sheet for the person on the door. */
export default async function DoorListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  const [screening] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, id))
    .limit(1);
  if (!screening) notFound();

  const all = await listRegistrations(screening.id);
  const confirmed = all
    .filter((r) => r.status === "confirmed")
    .sort((a, b) => a.name.localeCompare(b.name));
  const waitlisted = all.filter((r) => r.status === "waitlisted");
  const totalSeats = confirmed.reduce((n, r) => n + r.seats, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          href={`/admin/screenings/${screening.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to screening
        </Link>
        <p className="inline-flex items-center gap-1.5 text-sm text-slate">
          <Printer className="h-4 w-4" aria-hidden />
          Use your browser&apos;s print dialog (Ctrl/⌘ + P)
        </p>
      </div>

      <header className="border-b-2 border-charcoal pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate">
          Door list · Wildlife Rescue
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-charcoal">
          {screening.title} — {screening.venueName}, {screening.city}
        </h1>
        <p className="mt-1 text-sm text-slate">
          {formatDate(screening.startsAt)} · {formatTime(screening.startsAt)}
          {screening.doorsOpenAt && ` · doors ${formatTime(screening.doorsOpenAt)}`}
        </p>
        <p className="mt-2 text-sm font-semibold text-charcoal">
          {confirmed.length} bookings · {totalSeats} seats · capacity {screening.capacity}
        </p>
      </header>

      <table className="mt-6 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-charcoal/30 text-left text-[11px] font-bold uppercase tracking-wider text-slate">
            <th className="w-10 py-2">✓</th>
            <th className="py-2">Name</th>
            <th className="py-2">Reference</th>
            <th className="w-16 py-2 text-center">Seats</th>
            <th className="py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {confirmed.map((r) => (
            <tr key={r.id} className="border-b border-line">
              <td className="py-2.5">
                <span className="inline-block h-4 w-4 rounded border border-charcoal/50" />
              </td>
              <td className="py-2.5 font-medium text-charcoal">
                {r.name}
                {r.notes && (
                  <span className="block text-[12px] italic text-slate">{r.notes}</span>
                )}
              </td>
              <td className="py-2.5 font-mono text-[13px] text-slate">{r.reference}</td>
              <td className="py-2.5 text-center font-semibold">{r.seats}</td>
              <td className="py-2.5 text-[13px] text-slate">{r.phone ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmed.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate">No confirmed bookings yet.</p>
      )}

      {waitlisted.length > 0 && (
        <section className="mt-10">
          <h2 className="border-b border-charcoal/30 pb-2 font-display text-base font-bold text-charcoal">
            Waiting list ({waitlisted.length}) — in queue order
          </h2>
          <ol className="mt-3 space-y-1.5 text-sm">
            {waitlisted.map((r, i) => (
              <li key={r.id} className="flex gap-3">
                <span className="w-5 text-right font-semibold text-slate">{i + 1}.</span>
                <span className="font-medium text-charcoal">{r.name}</span>
                <span className="text-slate">
                  {r.seats} {r.seats === 1 ? "seat" : "seats"}
                </span>
                <span className="font-mono text-[12px] text-slate">{r.reference}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
