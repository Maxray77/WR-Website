import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { screenings } from "@/lib/db/schema";
import { listRegistrations } from "@/lib/bookings";
import { isAdmin } from "@/lib/auth";
import { formatDate, formatTime, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

/** Escape a value for CSV, and neutralise spreadsheet formula injection. */
function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str = String(value);
  if (/^[=+\-@\t\r]/.test(str)) str = `'${str}`;
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const screeningId = new URL(request.url).searchParams.get("screeningId");
  if (!screeningId) {
    return NextResponse.json({ error: "screeningId is required" }, { status: 400 });
  }

  const [screening] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, screeningId))
    .limit(1);
  if (!screening) {
    return NextResponse.json({ error: "Screening not found" }, { status: 404 });
  }

  const rows = await listRegistrations(screening.id);

  const header = [
    "Reference",
    "Name",
    "Email",
    "Phone",
    "Seats",
    "Status",
    "Source",
    "Registered at",
    "Confirmed at",
    "Cancelled at",
    "Checked in at",
    "Notes",
    "Screening",
    "City",
    "Venue",
    "Date",
    "Time",
  ];

  const body = rows.map((r) =>
    [
      r.reference,
      r.name,
      r.email,
      r.phone,
      r.seats,
      r.status,
      r.source,
      r.createdAt.toISOString(),
      r.confirmedAt?.toISOString(),
      r.cancelledAt?.toISOString(),
      r.checkedInAt?.toISOString(),
      r.notes,
      screening.title,
      screening.city,
      screening.venueName,
      formatDate(screening.startsAt),
      formatTime(screening.startsAt),
    ]
      .map(csvCell)
      .join(","),
  );

  // BOM so Excel opens UTF-8 names correctly.
  const csv = "﻿" + [header.map(csvCell).join(","), ...body].join("\r\n");
  const filename = `registrations-${slugify(`${screening.city}-${screening.venueName}`)}-${screening.startsAt.toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
