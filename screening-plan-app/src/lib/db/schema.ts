import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

/* ─────────────────────────── enums ─────────────────────────── */

export const screeningStatusEnum = pgEnum("screening_status", [
  "draft",
  "published",
  "cancelled",
  "completed",
]);

export const registrationStatusEnum = pgEnum("registration_status", [
  "confirmed",
  "waitlisted",
  "cancelled",
]);

export const registrationSourceEnum = pgEnum("registration_source", [
  "online",
  "manual",
]);

export const emailKindEnum = pgEnum("email_kind", [
  "confirmed",
  "waitlisted",
  "promoted",
  "cancelled",
  "screening_cancelled",
  "reminder",
]);

/* ──────────────────────── screenings ───────────────────────── */

export const screenings = pgTable(
  "screenings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** URL segment, e.g. "delhi-india-habitat-centre-2026-10-04" */
    slug: text("slug").notNull(),
    title: text("title").notNull().default("All That Breathes"),
    city: text("city").notNull(),
    venueName: text("venue_name").notNull(),
    venueAddress: text("venue_address").notNull(),
    /** Optional map / directions link shown on the detail page. */
    mapUrl: text("map_url"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    doorsOpenAt: timestamp("doors_open_at", { withTimezone: true }),
    /** Total seats available for confirmed registrations. */
    capacity: integer("capacity").notNull(),
    /** Seats a single booking may request. */
    maxSeatsPerBooking: integer("max_seats_per_booking").notNull().default(4),
    /** When false, a full screening simply closes instead of queueing people. */
    waitlistEnabled: boolean("waitlist_enabled").notNull().default(true),
    description: text("description"),
    posterUrl: text("poster_url"),
    /** Optional note printed on confirmation emails (parking, ID, etc.). */
    attendeeNotes: text("attendee_notes"),
    status: screeningStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("screenings_slug_idx").on(t.slug),
    index("screenings_starts_at_idx").on(t.startsAt),
    index("screenings_status_idx").on(t.status),
  ],
);

/* ─────────────────────── registrations ─────────────────────── */

export const registrations = pgTable(
  "registrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    screeningId: uuid("screening_id")
      .notNull()
      .references(() => screenings.id, { onDelete: "cascade" }),
    /** Human-facing booking code, e.g. "ATB-7F3K9Q". */
    reference: text("reference").notNull(),
    /** Secret used to authorise self-service cancel links. */
    manageToken: text("manage_token").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    seats: integer("seats").notNull().default(1),
    status: registrationStatusEnum("status").notNull().default("confirmed"),
    source: registrationSourceEnum("source").notNull().default("online"),
    /** Internal-only note, visible to admins. */
    notes: text("notes"),
    checkedInAt: timestamp("checked_in_at", { withTimezone: true }),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("registrations_reference_idx").on(t.reference),
    index("registrations_screening_idx").on(t.screeningId),
    index("registrations_status_idx").on(t.screeningId, t.status),
    /** Queue order for the waitlist. */
    index("registrations_created_idx").on(t.screeningId, t.createdAt),
    /** One live booking per email per screening (cancelled rows excluded). */
    uniqueIndex("registrations_one_live_per_email_idx")
      .on(t.screeningId, sql`lower(${t.email})`)
      .where(sql`${t.status} <> 'cancelled'`),
  ],
);

/* ───────────────────────── email log ───────────────────────── */

export const emailLog = pgTable(
  "email_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    registrationId: uuid("registration_id").references(
      () => registrations.id,
      { onDelete: "cascade" },
    ),
    to: text("to").notNull(),
    kind: emailKindEnum("kind").notNull(),
    providerId: text("provider_id"),
    error: text("error"),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("email_log_registration_idx").on(t.registrationId)],
);

/* ───────────────────────── relations ───────────────────────── */

export const screeningsRelations = relations(screenings, ({ many }) => ({
  registrations: many(registrations),
}));

export const registrationsRelations = relations(
  registrations,
  ({ one, many }) => ({
    screening: one(screenings, {
      fields: [registrations.screeningId],
      references: [screenings.id],
    }),
    emails: many(emailLog),
  }),
);

export const emailLogRelations = relations(emailLog, ({ one }) => ({
  registration: one(registrations, {
    fields: [emailLog.registrationId],
    references: [registrations.id],
  }),
}));

/* ───────────────────────── inferred types ──────────────────── */

export type Screening = typeof screenings.$inferSelect;
export type NewScreening = typeof screenings.$inferInsert;
export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
export type ScreeningStatus = Screening["status"];
export type RegistrationStatus = Registration["status"];
