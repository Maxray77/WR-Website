import { z } from "zod";

/** Reject CR/LF so values can never be spliced into email headers. */
const noHeaderInjection = (v: string) => !/[\r\n]/.test(v);

const cleanString = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .refine(noHeaderInjection, "Line breaks are not allowed here");

export const registrationInputSchema = z.object({
  screeningId: z.string().uuid("Unknown screening"),
  name: cleanString(120).min(2, "Please enter your full name"),
  email: cleanString(254)
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase()),
  phone: cleanString(30)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  seats: z.coerce
    .number()
    .int("Seats must be a whole number")
    .min(1, "At least one seat")
    .max(10, "Too many seats for one booking"),
  notes: cleanString(500)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
});

export type RegistrationInput = z.infer<typeof registrationInputSchema>;

export const screeningInputSchema = z.object({
  title: cleanString(160).min(2, "Title is required"),
  city: cleanString(80).min(2, "City is required"),
  venueName: cleanString(160).min(2, "Venue name is required"),
  venueAddress: z.string().trim().min(4, "Venue address is required").max(500),
  mapUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https?:\/\//i.test(v), "Must be an http(s) link")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  startsAt: z.string().min(10, "Start date and time is required"),
  doorsOpenAt: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  capacity: z.coerce
    .number()
    .int()
    .min(1, "Capacity must be at least 1")
    .max(100_000),
  maxSeatsPerBooking: z.coerce.number().int().min(1).max(10),
  waitlistEnabled: z.coerce.boolean(),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  posterUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https?:\/\//i.test(v), "Must be an http(s) link")
    .optional()
    .or(z.literal("")),
  attendeeNotes: z.string().trim().max(1000).optional().or(z.literal("")),
  status: z.enum(["draft", "published", "cancelled", "completed"]),
});

export type ScreeningInput = z.infer<typeof screeningInputSchema>;

export const manualRegistrationSchema = registrationInputSchema.extend({
  /** Admins may seat someone even when the room is nominally full. */
  forceConfirm: z.coerce.boolean().optional().default(false),
});

/** Turn a ZodError into `{ fieldName: "first message" }`. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
