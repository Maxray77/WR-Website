"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/lib/db";
import { registrations, screenings } from "@/lib/db/schema";
import {
  BookingError,
  cancelRegistration,
  confirmRegistration,
  createRegistration,
  runWaitlistPromotion,
  setCheckedIn,
} from "@/lib/bookings";
import { sendPromotionEmails, sendScreeningEmail } from "@/lib/email";
import {
  checkPassword,
  clearThrottle,
  endAdminSession,
  isAdmin,
  isAdminConfigured,
  loginThrottle,
  startAdminSession,
} from "@/lib/auth";
import {
  fieldErrors,
  manualRegistrationSchema,
  screeningInputSchema,
} from "@/lib/validation";
import { fromDateTimeLocal, slugify, formatShortDate } from "@/lib/utils";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* ────────────────────────── auth ───────────────────────────── */

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Admin access is not configured. Set ADMIN_PASSWORD and AUTH_SECRET in your environment.",
    };
  }

  const hdrs = await headers();
  // x-real-ip is set by the platform and is not client-spoofable; the leftmost
  // x-forwarded-for entry is, so only fall back to it.
  const ip =
    hdrs.get("x-real-ip") ||
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const throttle = loginThrottle(ip);
  if (!throttle.allowed) {
    return {
      error: `Too many attempts. Please try again in ${throttle.retryInMinutes} minute(s).`,
    };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  clearThrottle(ip);
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin/login");
}

/* ─────────────────────── screening CRUD ────────────────────── */

export type ScreeningFormState = {
  errors?: Record<string, string>;
  message?: string;
};

function parseScreeningForm(formData: FormData) {
  return screeningInputSchema.safeParse({
    title: formData.get("title"),
    city: formData.get("city"),
    venueName: formData.get("venueName"),
    venueAddress: formData.get("venueAddress"),
    mapUrl: formData.get("mapUrl"),
    startsAt: formData.get("startsAt"),
    doorsOpenAt: formData.get("doorsOpenAt"),
    capacity: formData.get("capacity"),
    maxSeatsPerBooking: formData.get("maxSeatsPerBooking"),
    waitlistEnabled: formData.get("waitlistEnabled") === "on",
    description: formData.get("description"),
    posterUrl: formData.get("posterUrl"),
    attendeeNotes: formData.get("attendeeNotes"),
    status: formData.get("status"),
  });
}

async function uniqueSlug(base: string, excludeId?: string) {
  let candidate = base || "screening";
  for (let i = 0; i < 50; i++) {
    const rows = await db
      .select({ id: screenings.id })
      .from(screenings)
      .where(eq(screenings.slug, candidate))
      .limit(1);
    const clash = rows[0];
    if (!clash || clash.id === excludeId) return candidate;
    candidate = `${base}-${i + 2}`;
  }
  return `${base}-${Date.now()}`;
}

export async function createScreeningAction(
  _prev: ScreeningFormState,
  formData: FormData,
): Promise<ScreeningFormState> {
  await requireAdmin();

  const parsed = parseScreeningForm(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const data = parsed.data;

  let startsAt: Date;
  let doorsOpenAt: Date | null = null;
  try {
    startsAt = fromDateTimeLocal(data.startsAt);
    if (data.doorsOpenAt) doorsOpenAt = fromDateTimeLocal(data.doorsOpenAt);
  } catch {
    return { errors: { startsAt: "Please enter a valid date and time." } };
  }

  const slug = await uniqueSlug(
    slugify(`${data.city}-${data.venueName}-${formatShortDate(startsAt)}`),
  );

  const [row] = await db
    .insert(screenings)
    .values({
      slug,
      title: data.title,
      city: data.city,
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      mapUrl: data.mapUrl || null,
      startsAt,
      doorsOpenAt,
      capacity: data.capacity,
      maxSeatsPerBooking: data.maxSeatsPerBooking,
      waitlistEnabled: data.waitlistEnabled,
      description: data.description || null,
      posterUrl: data.posterUrl || null,
      attendeeNotes: data.attendeeNotes || null,
      status: data.status,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/admin");
  redirect(`/admin/screenings/${row.id}?created=1`);
}

export async function updateScreeningAction(
  _prev: ScreeningFormState,
  formData: FormData,
): Promise<ScreeningFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return { message: "Missing screening id." };

  const parsed = parseScreeningForm(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const data = parsed.data;

  let startsAt: Date;
  let doorsOpenAt: Date | null = null;
  try {
    startsAt = fromDateTimeLocal(data.startsAt);
    if (data.doorsOpenAt) doorsOpenAt = fromDateTimeLocal(data.doorsOpenAt);
  } catch {
    return { errors: { startsAt: "Please enter a valid date and time." } };
  }

  const [before] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, id))
    .limit(1);
  if (!before) return { message: "Screening not found." };

  await db
    .update(screenings)
    .set({
      title: data.title,
      city: data.city,
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      mapUrl: data.mapUrl || null,
      startsAt,
      doorsOpenAt,
      capacity: data.capacity,
      maxSeatsPerBooking: data.maxSeatsPerBooking,
      waitlistEnabled: data.waitlistEnabled,
      description: data.description || null,
      posterUrl: data.posterUrl || null,
      attendeeNotes: data.attendeeNotes || null,
      status: data.status,
      updatedAt: new Date(),
    })
    .where(eq(screenings.id, id));

  // Raising capacity should immediately pull people off the waiting list.
  if (data.capacity > before.capacity) {
    const { screening, promoted } = await runWaitlistPromotion(id);
    if (promoted.length > 0) await sendPromotionEmails(screening, promoted);
  }

  revalidatePath("/");
  revalidatePath(`/screenings/${before.slug}`);
  revalidatePath(`/admin/screenings/${id}`);
  return { message: "Saved." };
}

/** Cancel the whole screening and email everyone still holding a place. */
export async function cancelScreeningAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const [screening] = await db
    .select()
    .from(screenings)
    .where(eq(screenings.id, id))
    .limit(1);
  if (!screening) return;

  const affected = await db
    .select()
    .from(registrations)
    .where(
      and(eq(registrations.screeningId, id), ne(registrations.status, "cancelled")),
    );

  const now = new Date();
  await db
    .update(screenings)
    .set({ status: "cancelled", updatedAt: now })
    .where(eq(screenings.id, id));
  await db
    .update(registrations)
    .set({ status: "cancelled", cancelledAt: now, updatedAt: now })
    .where(
      and(eq(registrations.screeningId, id), ne(registrations.status, "cancelled")),
    );

  await Promise.allSettled(
    affected.map((r) => sendScreeningEmail("screening_cancelled", screening, r)),
  );

  revalidatePath("/");
  revalidatePath(`/screenings/${screening.slug}`);
  revalidatePath(`/admin/screenings/${id}`);
}

/* ───────────────────── attendee management ─────────────────── */

export type ManualAddState = { errors?: Record<string, string>; message?: string };

export async function addAttendeeAction(
  _prev: ManualAddState,
  formData: FormData,
): Promise<ManualAddState> {
  await requireAdmin();

  const parsed = manualRegistrationSchema.safeParse({
    screeningId: formData.get("screeningId"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    seats: formData.get("seats"),
    notes: formData.get("notes"),
    forceConfirm: formData.get("forceConfirm") === "on",
  });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const sendEmail = formData.get("sendEmail") === "on";

  try {
    const result = await createRegistration({ ...parsed.data, source: "manual" });
    if (sendEmail) {
      await sendScreeningEmail(
        result.outcome === "confirmed" ? "confirmed" : "waitlisted",
        result.screening,
        result.registration,
        { waitlistPosition: result.waitlistPosition },
      );
    }
    revalidatePath(`/admin/screenings/${parsed.data.screeningId}`);
    revalidatePath("/");
    return {
      message: `${result.registration.name} added — ${result.registration.reference} (${result.outcome === "confirmed" ? "confirmed" : "waiting list"}).`,
    };
  } catch (err) {
    if (err instanceof BookingError) return { message: err.message };
    console.error("[addAttendeeAction] unexpected failure", err);
    return { message: "Could not add that person. Please try again." };
  }
}

export async function cancelAttendeeAction(formData: FormData) {
  await requireAdmin();
  const registrationId = String(formData.get("registrationId") ?? "");
  const notify = formData.get("notify") !== "off";
  if (!registrationId) return;

  try {
    const { registration, screening, promoted } = await cancelRegistration({
      registrationId,
    });
    if (notify) await sendScreeningEmail("cancelled", screening, registration);
    if (promoted.length > 0) await sendPromotionEmails(screening, promoted);
    revalidatePath(`/admin/screenings/${screening.id}`);
    revalidatePath("/");
  } catch (err) {
    console.error("[cancelAttendeeAction]", err);
  }
}

export async function confirmAttendeeAction(formData: FormData) {
  await requireAdmin();
  const registrationId = String(formData.get("registrationId") ?? "");
  const notify = formData.get("notify") !== "off";
  if (!registrationId) return;

  try {
    const { registration, screening, wasWaitlisted } =
      await confirmRegistration(registrationId);
    if (notify) {
      await sendScreeningEmail(
        wasWaitlisted ? "promoted" : "confirmed",
        screening,
        registration,
      );
    }
    revalidatePath(`/admin/screenings/${screening.id}`);
    revalidatePath("/");
  } catch (err) {
    console.error("[confirmAttendeeAction]", err);
  }
}

export async function checkInAction(formData: FormData) {
  await requireAdmin();
  const registrationId = String(formData.get("registrationId") ?? "");
  const screeningId = String(formData.get("screeningId") ?? "");
  const checkedIn = formData.get("checkedIn") === "true";
  if (!registrationId) return;
  await setCheckedIn(registrationId, checkedIn);
  revalidatePath(`/admin/screenings/${screeningId}`);
}

export async function promoteWaitlistAction(formData: FormData) {
  await requireAdmin();
  const screeningId = String(formData.get("screeningId") ?? "");
  if (!screeningId) return;
  const { screening, promoted } = await runWaitlistPromotion(screeningId);
  if (promoted.length > 0) await sendPromotionEmails(screening, promoted);
  revalidatePath(`/admin/screenings/${screeningId}`);
  revalidatePath("/");
}
