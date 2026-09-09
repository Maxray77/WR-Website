"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import type { Screening } from "@/lib/db/schema";
import type { ScreeningFormState } from "@/app/admin/actions";
import { Alert, Button } from "@/components/ui";
import { toDateTimeLocal, SCREENING_TIME_ZONE } from "@/lib/utils";

const INITIAL: ScreeningFormState = {};

export function ScreeningForm({
  action,
  screening,
  submitLabel = "Save screening",
}: {
  action: (state: ScreeningFormState, formData: FormData) => Promise<ScreeningFormState>;
  screening?: Screening;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);
  const err = (f: string) => state.errors?.[f];

  return (
    <form action={formAction} className="space-y-8">
      {screening && <input type="hidden" name="id" value={screening.id} />}

      {state.message && (
        <Alert tone={state.message === "Saved." ? "success" : "error"}>
          {state.message}
        </Alert>
      )}

      <Section title="Where and when">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Film / event title" error={err("title")} className="sm:col-span-2">
            <input
              name="title"
              className="field"
              defaultValue={screening?.title ?? "All That Breathes"}
              required
              maxLength={160}
            />
          </Field>

          <Field label="City" error={err("city")}>
            <input
              name="city"
              className="field"
              defaultValue={screening?.city ?? ""}
              placeholder="Delhi"
              required
              maxLength={80}
            />
          </Field>

          <Field label="Venue name" error={err("venueName")}>
            <input
              name="venueName"
              className="field"
              defaultValue={screening?.venueName ?? ""}
              placeholder="India Habitat Centre"
              required
              maxLength={160}
            />
          </Field>

          <Field
            label="Venue address"
            error={err("venueAddress")}
            className="sm:col-span-2"
          >
            <textarea
              name="venueAddress"
              rows={2}
              className="field resize-y"
              defaultValue={screening?.venueAddress ?? ""}
              placeholder="Lodhi Road, Lodhi Estate, New Delhi 110003"
              required
              maxLength={500}
            />
          </Field>

          <Field
            label="Map link (optional)"
            error={err("mapUrl")}
            hint="Google Maps or similar — shown as an 'Open in maps' link."
            className="sm:col-span-2"
          >
            <input
              name="mapUrl"
              type="url"
              className="field"
              defaultValue={screening?.mapUrl ?? ""}
              placeholder="https://maps.app.goo.gl/…"
              maxLength={500}
            />
          </Field>

          <Field
            label="Starts at"
            error={err("startsAt")}
            hint={`Local time (${SCREENING_TIME_ZONE.replace("_", " ")}).`}
          >
            <input
              name="startsAt"
              type="datetime-local"
              className="field"
              defaultValue={
                screening ? toDateTimeLocal(screening.startsAt) : ""
              }
              required
            />
          </Field>

          <Field label="Doors open (optional)" error={err("doorsOpenAt")}>
            <input
              name="doorsOpenAt"
              type="datetime-local"
              className="field"
              defaultValue={
                screening?.doorsOpenAt ? toDateTimeLocal(screening.doorsOpenAt) : ""
              }
            />
          </Field>
        </div>
      </Section>

      <Section title="Seats and waiting list">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Capacity"
            error={err("capacity")}
            hint="Raising this promotes people off the waiting list automatically."
          >
            <input
              name="capacity"
              type="number"
              min={1}
              max={100000}
              className="field"
              defaultValue={screening?.capacity ?? 100}
              required
            />
          </Field>

          <Field label="Max seats per booking" error={err("maxSeatsPerBooking")}>
            <input
              name="maxSeatsPerBooking"
              type="number"
              min={1}
              max={10}
              className="field"
              defaultValue={screening?.maxSeatsPerBooking ?? 4}
              required
            />
          </Field>

          <label className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 sm:col-span-2">
            <input
              type="checkbox"
              name="waitlistEnabled"
              defaultChecked={screening?.waitlistEnabled ?? true}
              className="mt-0.5 h-4 w-4 rounded border-line accent-[#0A6E5C]"
            />
            <span>
              <span className="block text-sm font-semibold text-charcoal">
                Keep a waiting list when full
              </span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-slate">
                People can still register once every seat is taken, and are confirmed
                automatically — oldest first — whenever someone cancels.
              </span>
            </span>
          </label>
        </div>
      </Section>

      <Section title="Details shown to attendees">
        <div className="space-y-4">
          <Field
            label="Description (optional)"
            error={err("description")}
            hint="Blank line between paragraphs. Shown on the screening page."
          >
            <textarea
              name="description"
              rows={5}
              className="field resize-y"
              defaultValue={screening?.description ?? ""}
              maxLength={4000}
              placeholder="A free community screening followed by a Q&A with Nadeem and Saud…"
            />
          </Field>

          <Field
            label="Note for attendees (optional)"
            error={err("attendeeNotes")}
            hint="Highlighted on the page and repeated in every confirmation email."
          >
            <textarea
              name="attendeeNotes"
              rows={2}
              className="field resize-y"
              defaultValue={screening?.attendeeNotes ?? ""}
              maxLength={1000}
              placeholder="Please carry a photo ID. Parking is available in Block B."
            />
          </Field>

          <Field label="Poster image URL (optional)" error={err("posterUrl")}>
            <input
              name="posterUrl"
              type="url"
              className="field"
              defaultValue={screening?.posterUrl ?? ""}
              maxLength={500}
            />
          </Field>
        </div>
      </Section>

      <Section title="Visibility">
        <Field
          label="Status"
          error={err("status")}
          hint="Draft is hidden from the public site. Published takes registrations."
        >
          <select
            name="status"
            className="field"
            defaultValue={screening?.status ?? "draft"}
          >
            <option value="draft">Draft — hidden</option>
            <option value="published">Published — open for registration</option>
            <option value="completed">Completed — archived</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </Field>
      </Section>

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-[18px] w-[18px]" aria-hidden />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-[15px] font-bold text-charcoal">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="field-label">{label}</label>
      {children}
      {error ? (
        <p className="field-error">{error}</p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}
