import { and, asc, eq, lt, ne, sql } from "drizzle-orm";
import { db } from "./db";
import {
  registrations,
  screenings,
  type Registration,
  type Screening,
} from "./db/schema";
import { generateManageToken, generateReference } from "./utils";

export type SeatStats = {
  capacity: number;
  confirmedSeats: number;
  waitlistedSeats: number;
  remaining: number;
  confirmedBookings: number;
  waitlistedBookings: number;
  isFull: boolean;
};

export class BookingError extends Error {
  constructor(
    message: string,
    readonly code:
      | "not_found"
      | "not_open"
      | "duplicate"
      | "too_many_seats"
      | "full"
      | "already_cancelled"
      | "invalid_token",
    readonly meta?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "BookingError";
  }
}

/* ─────────────────────── seat accounting ───────────────────── */

type Queryable = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

async function seatTotals(exec: Queryable, screeningId: string) {
  const rows = await exec
    .select({
      status: registrations.status,
      seats: sql<number>`coalesce(sum(${registrations.seats}), 0)::int`,
      bookings: sql<number>`count(*)::int`,
    })
    .from(registrations)
    .where(eq(registrations.screeningId, screeningId))
    .groupBy(registrations.status);

  let confirmedSeats = 0;
  let waitlistedSeats = 0;
  let confirmedBookings = 0;
  let waitlistedBookings = 0;
  for (const row of rows) {
    if (row.status === "confirmed") {
      confirmedSeats = Number(row.seats);
      confirmedBookings = Number(row.bookings);
    } else if (row.status === "waitlisted") {
      waitlistedSeats = Number(row.seats);
      waitlistedBookings = Number(row.bookings);
    }
  }
  return { confirmedSeats, waitlistedSeats, confirmedBookings, waitlistedBookings };
}

export async function getSeatStats(
  screening: Pick<Screening, "id" | "capacity">,
): Promise<SeatStats> {
  const totals = await seatTotals(db, screening.id);
  const remaining = Math.max(0, screening.capacity - totals.confirmedSeats);
  return {
    capacity: screening.capacity,
    ...totals,
    remaining,
    isFull: remaining <= 0,
  };
}

/** Seat stats for many screenings in one round-trip. */
export async function getSeatStatsMap(
  list: Pick<Screening, "id" | "capacity">[],
): Promise<Map<string, SeatStats>> {
  const out = new Map<string, SeatStats>();
  if (list.length === 0) return out;

  const rows = await db
    .select({
      screeningId: registrations.screeningId,
      status: registrations.status,
      seats: sql<number>`coalesce(sum(${registrations.seats}), 0)::int`,
      bookings: sql<number>`count(*)::int`,
    })
    .from(registrations)
    .where(ne(registrations.status, "cancelled"))
    .groupBy(registrations.screeningId, registrations.status);

  for (const s of list) {
    const mine = rows.filter((r) => r.screeningId === s.id);
    const confirmed = mine.find((r) => r.status === "confirmed");
    const waiting = mine.find((r) => r.status === "waitlisted");
    const confirmedSeats = Number(confirmed?.seats ?? 0);
    out.set(s.id, {
      capacity: s.capacity,
      confirmedSeats,
      waitlistedSeats: Number(waiting?.seats ?? 0),
      confirmedBookings: Number(confirmed?.bookings ?? 0),
      waitlistedBookings: Number(waiting?.bookings ?? 0),
      remaining: Math.max(0, s.capacity - confirmedSeats),
      isFull: s.capacity - confirmedSeats <= 0,
    });
  }
  return out;
}

/* ────────────────────────── create ─────────────────────────── */

export type CreateRegistrationInput = {
  screeningId: string;
  name: string;
  email: string;
  phone?: string;
  seats: number;
  notes?: string;
  source?: "online" | "manual";
  /** Admin override: seat the booking even if that exceeds capacity. */
  forceConfirm?: boolean;
};

export type CreateRegistrationResult = {
  registration: Registration;
  screening: Screening;
  outcome: "confirmed" | "waitlisted";
  /** Queue position when waitlisted (1 = next in line). */
  waitlistPosition?: number;
};

/**
 * Postgres error details survive a couple of layers of driver/ORM wrapping,
 * so walk the cause chain looking for the constraint name.
 */
function pgErrorInfo(err: unknown): { code?: string; constraint?: string } {
  let current: unknown = err;
  for (let depth = 0; depth < 5 && current; depth++) {
    const candidate = current as {
      code?: string;
      constraint?: string;
      constraint_name?: string;
      cause?: unknown;
    };
    const constraint = candidate.constraint_name ?? candidate.constraint;
    if (constraint || candidate.code) return { code: candidate.code, constraint };
    current = candidate.cause;
  }
  return {};
}

export async function createRegistration(
  input: CreateRegistrationInput,
): Promise<CreateRegistrationResult> {
  const source = input.source ?? "online";
  const isAdmin = source === "manual";

  return db.transaction(async (tx) => {
    // Serialise concurrent bookings for this screening so two people can
    // never claim the same last seat.
    const locked = await tx.execute(
      sql`select id from ${screenings} where ${screenings.id} = ${input.screeningId} for update`,
    );
    if (locked.length === 0) {
      throw new BookingError("Screening not found", "not_found");
    }

    const [screening] = await tx
      .select()
      .from(screenings)
      .where(eq(screenings.id, input.screeningId))
      .limit(1);

    if (!screening) throw new BookingError("Screening not found", "not_found");

    if (!isAdmin) {
      if (screening.status !== "published") {
        throw new BookingError(
          "This screening is not open for registration.",
          "not_open",
        );
      }
      if (screening.startsAt.getTime() < Date.now()) {
        throw new BookingError("This screening has already taken place.", "not_open");
      }
      if (input.seats > screening.maxSeatsPerBooking) {
        throw new BookingError(
          `You can book up to ${screening.maxSeatsPerBooking} seats per registration.`,
          "too_many_seats",
        );
      }
    }

    const totals = await seatTotals(tx, screening.id);
    const remaining = Math.max(0, screening.capacity - totals.confirmedSeats);

    let status: Registration["status"];
    if (input.forceConfirm && isAdmin) {
      status = "confirmed";
    } else if (input.seats <= remaining) {
      status = "confirmed";
    } else if (screening.waitlistEnabled) {
      status = "waitlisted";
    } else {
      throw new BookingError(
        "This screening is fully booked.",
        "full",
        { remaining },
      );
    }

    // Checked up front (we already hold the screening lock, so this is
    // serialised) to give a helpful message; the partial unique index below is
    // the backstop against any race.
    const [duplicate] = await tx
      .select({ reference: registrations.reference })
      .from(registrations)
      .where(
        and(
          eq(registrations.screeningId, screening.id),
          sql`lower(${registrations.email}) = ${input.email.toLowerCase()}`,
          ne(registrations.status, "cancelled"),
        ),
      )
      .limit(1);
    if (duplicate) {
      throw new BookingError(
        "There is already a booking for this email address at this screening.",
        "duplicate",
        { reference: duplicate.reference },
      );
    }

    const now = new Date();
    let registration: Registration | undefined;

    // Each attempt runs in a savepoint: a unique violation would otherwise
    // abort the whole transaction and make recovery impossible.
    for (let attempt = 0; attempt < 5 && !registration; attempt++) {
      try {
        registration = await tx.transaction(async (sp) => {
          const [row] = await sp
            .insert(registrations)
            .values({
              screeningId: screening.id,
              reference: generateReference(),
              manageToken: generateManageToken(),
              name: input.name,
              email: input.email,
              phone: input.phone,
              seats: input.seats,
              notes: input.notes,
              source,
              status,
              confirmedAt: status === "confirmed" ? now : null,
            })
            .returning();
          return row;
        });
      } catch (err) {
        const { constraint } = pgErrorInfo(err);
        if (constraint === "registrations_one_live_per_email_idx") {
          throw new BookingError(
            "There is already a booking for this email address at this screening.",
            "duplicate",
          );
        }
        if (constraint === "registrations_reference_idx") continue;
        throw err;
      }
    }

    if (!registration) {
      throw new Error("Could not allocate a unique booking reference.");
    }

    let waitlistPosition: number | undefined;
    if (status === "waitlisted") {
      waitlistPosition = await queuePosition(tx, registration);
    }

    return {
      registration,
      screening,
      outcome: status as "confirmed" | "waitlisted",
      waitlistPosition,
    };
  });
}

async function queuePosition(exec: Queryable, registration: Registration) {
  const [row] = await exec
    .select({ ahead: sql<number>`count(*)::int` })
    .from(registrations)
    .where(
      and(
        eq(registrations.screeningId, registration.screeningId),
        eq(registrations.status, "waitlisted"),
        lt(registrations.createdAt, registration.createdAt),
      ),
    );
  return Number(row?.ahead ?? 0) + 1;
}

export async function getWaitlistPosition(registration: Registration) {
  if (registration.status !== "waitlisted") return undefined;
  return queuePosition(db, registration);
}

/* ────────────────────── waitlist promotion ─────────────────── */

/**
 * Fill freed seats from the waitlist, oldest booking first.
 *
 * A party larger than the seats currently free is skipped rather than
 * blocking the queue — so freeing two seats promotes the next party of one
 * or two, and a party of four keeps its place for a bigger release later.
 * Must be called inside a transaction that already locked the screening row.
 */
async function promoteFromWaitlist(
  tx: Queryable,
  screening: Pick<Screening, "id" | "capacity">,
): Promise<Registration[]> {
  const totals = await seatTotals(tx, screening.id);
  let remaining = Math.max(0, screening.capacity - totals.confirmedSeats);
  if (remaining <= 0) return [];

  const queue = await tx
    .select()
    .from(registrations)
    .where(
      and(
        eq(registrations.screeningId, screening.id),
        eq(registrations.status, "waitlisted"),
      ),
    )
    .orderBy(asc(registrations.createdAt));

  const promoted: Registration[] = [];
  const now = new Date();

  for (const entry of queue) {
    if (remaining <= 0) break;
    if (entry.seats > remaining) continue;
    const [row] = await tx
      .update(registrations)
      .set({ status: "confirmed", confirmedAt: now, updatedAt: now })
      .where(
        and(eq(registrations.id, entry.id), eq(registrations.status, "waitlisted")),
      )
      .returning();
    if (row) {
      promoted.push(row);
      remaining -= row.seats;
    }
  }

  return promoted;
}

/* ────────────────────────── cancel ─────────────────────────── */

export type CancelResult = {
  registration: Registration;
  screening: Screening;
  promoted: Registration[];
};

export async function cancelRegistration(opts: {
  registrationId: string;
  /** Required for self-service cancellation; omitted for admin actions. */
  manageToken?: string;
}): Promise<CancelResult> {
  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(registrations)
      .where(eq(registrations.id, opts.registrationId))
      .limit(1);

    if (!existing) throw new BookingError("Booking not found", "not_found");
    if (opts.manageToken && opts.manageToken !== existing.manageToken) {
      throw new BookingError("This cancellation link is not valid.", "invalid_token");
    }
    if (existing.status === "cancelled") {
      throw new BookingError("This booking is already cancelled.", "already_cancelled");
    }

    await tx.execute(
      sql`select id from ${screenings} where ${screenings.id} = ${existing.screeningId} for update`,
    );

    const [screening] = await tx
      .select()
      .from(screenings)
      .where(eq(screenings.id, existing.screeningId))
      .limit(1);
    if (!screening) throw new BookingError("Screening not found", "not_found");

    const now = new Date();
    const [registration] = await tx
      .update(registrations)
      .set({ status: "cancelled", cancelledAt: now, updatedAt: now })
      .where(eq(registrations.id, existing.id))
      .returning();

    const promoted =
      existing.status === "confirmed"
        ? await promoteFromWaitlist(tx, screening)
        : [];

    return { registration, screening, promoted };
  });
}

/* ─────────────────── admin status transitions ──────────────── */

/** Confirm a waitlisted booking by hand (may exceed capacity — admin's call). */
export async function confirmRegistration(registrationId: string) {
  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(registrations)
      .where(eq(registrations.id, registrationId))
      .limit(1);
    if (!existing) throw new BookingError("Booking not found", "not_found");

    await tx.execute(
      sql`select id from ${screenings} where ${screenings.id} = ${existing.screeningId} for update`,
    );
    const [screening] = await tx
      .select()
      .from(screenings)
      .where(eq(screenings.id, existing.screeningId))
      .limit(1);
    if (!screening) throw new BookingError("Screening not found", "not_found");

    const now = new Date();
    const [registration] = await tx
      .update(registrations)
      .set({ status: "confirmed", confirmedAt: now, cancelledAt: null, updatedAt: now })
      .where(eq(registrations.id, registrationId))
      .returning();

    return { registration, screening, wasWaitlisted: existing.status === "waitlisted" };
  });
}

/** Manually run the promotion pass (e.g. after raising capacity). */
export async function runWaitlistPromotion(screeningId: string) {
  return db.transaction(async (tx) => {
    await tx.execute(
      sql`select id from ${screenings} where ${screenings.id} = ${screeningId} for update`,
    );
    const [screening] = await tx
      .select()
      .from(screenings)
      .where(eq(screenings.id, screeningId))
      .limit(1);
    if (!screening) throw new BookingError("Screening not found", "not_found");
    const promoted = await promoteFromWaitlist(tx, screening);
    return { screening, promoted };
  });
}

export async function setCheckedIn(registrationId: string, checkedIn: boolean) {
  const [row] = await db
    .update(registrations)
    .set({ checkedInAt: checkedIn ? new Date() : null, updatedAt: new Date() })
    .where(eq(registrations.id, registrationId))
    .returning();
  return row;
}

/* ────────────────────────── lookups ────────────────────────── */

export async function findByReference(reference: string) {
  const [row] = await db
    .select()
    .from(registrations)
    .where(sql`upper(${registrations.reference}) = ${reference.toUpperCase()}`)
    .limit(1);
  if (!row) return undefined;
  const [screening] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, row.screeningId))
    .limit(1);
  return screening ? { registration: row, screening } : undefined;
}

export async function listRegistrations(screeningId: string) {
  return db
    .select()
    .from(registrations)
    .where(eq(registrations.screeningId, screeningId))
    .orderBy(asc(registrations.createdAt));
}
