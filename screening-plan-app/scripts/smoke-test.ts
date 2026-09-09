/** End-to-end exercise of the booking engine against a real Postgres. */
import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "../src/lib/db";
import { registrations, screenings } from "../src/lib/db/schema";
import {
  BookingError,
  cancelRegistration,
  createRegistration,
  getSeatStats,
  runWaitlistPromotion,
} from "../src/lib/bookings";

// This script deletes every row in the database, so refuse to touch anything
// that isn't obviously a local test instance.
const url = process.env.DATABASE_URL ?? "";
const isLocal = /@(localhost|127\.0\.0\.1|::1|\/tmp)/.test(url) || url.includes("host=/");
if (!isLocal && process.env.ALLOW_DESTRUCTIVE_TEST !== "yes") {
  console.error(
    "Refusing to run: DATABASE_URL does not look local, and this script wipes all data.\n" +
      "Point it at a local Postgres, or set ALLOW_DESTRUCTIVE_TEST=yes if you really mean it.",
  );
  process.exit(1);
}

let failures = 0;
function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`${ok ? "  ✓" : "  ✗"} ${label}${ok ? "" : ` — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`}`);
}

async function main() {
  await db.delete(registrations);
  await db.delete(screenings);

  const [screening] = await db
    .insert(screenings)
    .values({
      slug: "test-venue",
      city: "Delhi",
      venueName: "Test Venue",
      venueAddress: "1 Test Road",
      startsAt: new Date(Date.now() + 7 * 86400000),
      capacity: 5,
      maxSeatsPerBooking: 4,
      status: "published",
    })
    .returning();

  console.log("\n1. Seats fill up, then overflow to the waiting list");
  const a = await createRegistration({ screeningId: screening.id, name: "A", email: "a@example.com", seats: 3 });
  check("3 seats confirmed", a.outcome, "confirmed");
  const b = await createRegistration({ screeningId: screening.id, name: "B", email: "b@example.com", seats: 2 });
  check("2 more seats confirmed (room now full)", b.outcome, "confirmed");
  const c = await createRegistration({ screeningId: screening.id, name: "C", email: "c@example.com", seats: 2 });
  check("next booking waitlisted", c.outcome, "waitlisted");
  check("queue position 1", c.waitlistPosition, 1);
  const d = await createRegistration({ screeningId: screening.id, name: "D", email: "d@example.com", seats: 1 });
  check("second waitlist entry gets position 2", d.waitlistPosition, 2);

  let stats = await getSeatStats(screening);
  check("5/5 confirmed, 0 remaining", [stats.confirmedSeats, stats.remaining], [5, 0]);
  check("3 seats waiting", stats.waitlistedSeats, 3);

  console.log("\n2. Per-booking seat cap and duplicate email are rejected");
  try {
    await createRegistration({ screeningId: screening.id, name: "E", email: "e@example.com", seats: 9 });
    check("over-cap booking rejected", "no error", "too_many_seats");
  } catch (err) {
    check("over-cap booking rejected", (err as BookingError).code, "too_many_seats");
  }
  try {
    await createRegistration({ screeningId: screening.id, name: "A again", email: "A@Example.com", seats: 1 });
    check("duplicate email rejected (case-insensitive)", "no error", "duplicate");
  } catch (err) {
    check("duplicate email rejected (case-insensitive)", (err as BookingError).code, "duplicate");
  }

  console.log("\n3. Cancelling frees seats and promotes the waiting list in order");
  const cancelled = await cancelRegistration({ registrationId: b.registration.id });
  check("2 seats released promoted exactly one booking", cancelled.promoted.length, 1);
  check("the oldest waitlister (C, 2 seats) was promoted", cancelled.promoted[0]?.email, "c@example.com");
  stats = await getSeatStats(screening);
  check("still 5/5 confirmed", [stats.confirmedSeats, stats.remaining], [5, 0]);

  console.log("\n4. A party too large to fit is skipped, not blocked");
  // Free 3 seats; D (1 seat) fits. Add a 4-seat party ahead of nobody to prove skipping.
  const big = await createRegistration({ screeningId: screening.id, name: "F", email: "f@example.com", seats: 4 });
  check("4-seat party waitlisted", big.outcome, "waitlisted");
  const freed = await cancelRegistration({ registrationId: a.registration.id }); // frees 3
  check("D (1 seat) promoted from behind the 4-seat party", freed.promoted.map((r) => r.email), ["d@example.com"]);
  stats = await getSeatStats(screening);
  check("2 seats still free (4-seat party can't fit)", stats.remaining, 2);

  console.log("\n5. Raising capacity promotes the waiting party");
  await db.update(screenings).set({ capacity: 10 }).where(eq(screenings.id, screening.id));
  const bumped = await runWaitlistPromotion(screening.id);
  check("4-seat party promoted once capacity allows", bumped.promoted.map((r) => r.email), ["f@example.com"]);

  console.log("\n6. Self-service cancel requires the manage token");
  try {
    await cancelRegistration({ registrationId: c.registration.id, manageToken: "wrong-token" });
    check("bad token rejected", "no error", "invalid_token");
  } catch (err) {
    check("bad token rejected", (err as BookingError).code, "invalid_token");
  }
  const selfCancel = await cancelRegistration({
    registrationId: c.registration.id,
    manageToken: c.registration.manageToken,
  });
  check("correct token cancels", selfCancel.registration.status, "cancelled");

  console.log("\n7. Concurrency: ten simultaneous bookings never oversell");
  await db.delete(registrations);
  await db.update(screenings).set({ capacity: 4 }).where(eq(screenings.id, screening.id));
  const results = await Promise.allSettled(
    Array.from({ length: 10 }, (_, i) =>
      createRegistration({
        screeningId: screening.id,
        name: `Race ${i}`,
        email: `race${i}@example.com`,
        seats: 1,
      }),
    ),
  );
  const confirmedCount = results.filter(
    (r) => r.status === "fulfilled" && r.value.outcome === "confirmed",
  ).length;
  const waitCount = results.filter(
    (r) => r.status === "fulfilled" && r.value.outcome === "waitlisted",
  ).length;
  check("exactly 4 confirmed", confirmedCount, 4);
  check("remaining 6 waitlisted", waitCount, 6);
  stats = await getSeatStats({ id: screening.id, capacity: 4 });
  check("never oversold", stats.confirmedSeats <= 4, true);

  console.log(
    failures === 0
      ? "\nAll checks passed.\n"
      : `\n${failures} check(s) FAILED.\n`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

import { eq } from "drizzle-orm";
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
