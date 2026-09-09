"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  BookingError,
  cancelRegistration,
  createRegistration,
  findByReference,
} from "@/lib/bookings";
import { sendPromotionEmails, sendScreeningEmail } from "@/lib/email";
import { registrationInputSchema, fieldErrors } from "@/lib/validation";

export type RegisterState = {
  ok: boolean;
  errors?: Record<string, string>;
  message?: string;
  /** Set when the visitor already holds a live booking for this screening. */
  existingReference?: string;
};

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registrationInputSchema.safeParse({
    screeningId: formData.get("screeningId"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    seats: formData.get("seats"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { ok: false, errors: fieldErrors(parsed.error) };
  }

  let result;
  try {
    result = await createRegistration({ ...parsed.data, source: "online" });
  } catch (err) {
    if (err instanceof BookingError) {
      return {
        ok: false,
        message: err.message,
        existingReference:
          typeof err.meta?.reference === "string" ? err.meta.reference : undefined,
      };
    }
    console.error("[registerAction] unexpected failure", err);
    return {
      ok: false,
      message:
        "Something went wrong on our side and your seat was not booked. Please try again in a moment.",
    };
  }

  // Email is best-effort: the booking already exists and is visible on the
  // confirmation page even if delivery fails.
  await sendScreeningEmail(
    result.outcome === "confirmed" ? "confirmed" : "waitlisted",
    result.screening,
    result.registration,
    { waitlistPosition: result.waitlistPosition },
  );

  revalidatePath("/");
  revalidatePath(`/screenings/${result.screening.slug}`);

  redirect(
    `/booking/${result.registration.reference}?t=${result.registration.manageToken}&new=1`,
  );
}

/* ─────────────────── self-service cancellation ─────────────── */

export type CancelState = { ok: boolean; message?: string };

export async function cancelBookingAction(
  _prev: CancelState,
  formData: FormData,
): Promise<CancelState> {
  const reference = String(formData.get("reference") ?? "").trim();
  const token = String(formData.get("token") ?? "").trim();

  const found = await findByReference(reference);
  if (!found) return { ok: false, message: "We couldn't find that booking." };

  try {
    const { registration, screening, promoted } = await cancelRegistration({
      registrationId: found.registration.id,
      manageToken: token,
    });

    await sendScreeningEmail("cancelled", screening, registration);
    if (promoted.length > 0) await sendPromotionEmails(screening, promoted);

    revalidatePath("/");
    revalidatePath(`/screenings/${screening.slug}`);
    revalidatePath(`/booking/${registration.reference}`);
    return { ok: true, message: "Your booking has been cancelled." };
  } catch (err) {
    if (err instanceof BookingError) return { ok: false, message: err.message };
    console.error("[cancelBookingAction] unexpected failure", err);
    return {
      ok: false,
      message: "We couldn't cancel that booking. Please email us and we'll sort it out.",
    };
  }
}

/* ───────────────────────── lookup ──────────────────────────── */

export type LookupState = { ok: boolean; message?: string };

export async function lookupBookingAction(
  _prev: LookupState,
  formData: FormData,
): Promise<LookupState> {
  const reference = String(formData.get("reference") ?? "")
    .trim()
    .toUpperCase();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!reference || !email) {
    return { ok: false, message: "Please enter both your booking reference and email." };
  }

  const found = await findByReference(reference);
  // Same message either way so the form can't be used to probe for emails.
  if (!found || found.registration.email.toLowerCase() !== email) {
    return {
      ok: false,
      message:
        "No booking matches that reference and email address. Check your confirmation email, or write to nadeem@raptorrescue.org.",
    };
  }

  redirect(
    `/booking/${found.registration.reference}?t=${found.registration.manageToken}`,
  );
}
