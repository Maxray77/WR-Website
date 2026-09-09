/**
 * Seed a few sample screenings so the UI has something to show.
 *   npm run db:seed
 * Safe to re-run: it skips slugs that already exist.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
import { eq } from "drizzle-orm";
import { db } from "../src/lib/db";
import { screenings } from "../src/lib/db/schema";
import { createRegistration } from "../src/lib/bookings";
import { slugify } from "../src/lib/utils";

function daysFromNow(days: number, hour: number, minute = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  // 18:30 IST == 13:00 UTC
  d.setUTCHours(hour - 5, minute - 30, 0, 0);
  return d;
}

const SAMPLES = [
  {
    city: "Delhi",
    venueName: "India Habitat Centre",
    venueAddress: "Lodhi Road, Lodhi Estate, New Delhi 110003",
    startsAt: daysFromNow(14, 18, 30),
    doorsOpenAt: daysFromNow(14, 18, 0),
    capacity: 120,
    description:
      "A free community screening of All That Breathes, followed by a Q&A with Nadeem Shehzad and Mohammad Saud.\n\nThe film follows the brothers' work treating injured black kites in Delhi — more than 40,000 birds have passed through their clinic.",
    attendeeNotes: "Please carry a photo ID for venue security.",
    status: "published" as const,
  },
  {
    city: "Mumbai",
    venueName: "NCPA — Godrej Dance Theatre",
    venueAddress: "NCPA Marg, Nariman Point, Mumbai 400021",
    startsAt: daysFromNow(28, 19, 0),
    capacity: 80,
    description:
      "An evening screening with a short introduction from the Wildlife Rescue team.",
    status: "published" as const,
  },
  {
    city: "Bengaluru",
    venueName: "Bangalore International Centre",
    venueAddress: "7th Main Road, Domlur II Stage, Bengaluru 560071",
    startsAt: daysFromNow(42, 18, 30),
    capacity: 60,
    status: "draft" as const,
  },
];

async function main() {
  for (const sample of SAMPLES) {
    const slug = slugify(
      `${sample.city}-${sample.venueName}-${sample.startsAt.toISOString().slice(0, 10)}`,
    );
    const existing = await db
      .select({ id: screenings.id })
      .from(screenings)
      .where(eq(screenings.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      console.log(`· skipped (exists): ${slug}`);
      continue;
    }

    const [row] = await db
      .insert(screenings)
      .values({ slug, title: "All That Breathes", ...sample })
      .returning();
    console.log(`✓ created: ${row.city} — ${row.venueName} (${row.slug})`);

    if (row.status === "published") {
      const demo = [
        { name: "Aarti Menon", email: "aarti.demo@example.com", seats: 2 },
        { name: "Rahul Verma", email: "rahul.demo@example.com", seats: 1 },
      ];
      for (const d of demo) {
        await createRegistration({
          screeningId: row.id,
          ...d,
          source: "manual",
        });
      }
      console.log(`  ↳ added ${demo.length} sample registrations`);
    }
  }

  console.log("\nDone. Run `npm run dev` and open http://localhost:3000");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
