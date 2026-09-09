"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Loader2, Ticket, Clock3 } from "lucide-react";
import { registerAction, type RegisterState } from "@/app/actions";
import { Alert, Button } from "@/components/ui";

const INITIAL: RegisterState = { ok: false };

export function RegisterForm({
  screeningId,
  maxSeats,
  remaining,
  waitlistEnabled,
}: {
  screeningId: string;
  maxSeats: number;
  remaining: number;
  waitlistEnabled: boolean;
}) {
  const [state, formAction, pending] = useActionState(registerAction, INITIAL);
  const [seats, setSeats] = useState(1);

  const goingOnWaitlist = seats > remaining;
  const seatOptions = Array.from({ length: maxSeats }, (_, i) => i + 1);
  const err = (field: string) => state.errors?.[field];

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="screeningId" value={screeningId} />

      {state.message && (
        <Alert tone="error">
          {state.message}
          {state.existingReference && (
            <>
              {" "}
              Your existing reference is{" "}
              <strong className="font-mono">{state.existingReference}</strong> — you can
              find it via{" "}
              <Link href="/booking" className="underline">
                My booking
              </Link>
              .
            </>
          )}
        </Alert>
      )}

      <div>
        <label htmlFor="name" className="field-label">
          Full name
        </label>
        <input
          id="name"
          name="name"
          className="field"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={err("name") ? "true" : undefined}
          aria-describedby={err("name") ? "name-error" : undefined}
        />
        {err("name") && (
          <p id="name-error" className="field-error">
            {err("name")}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={err("email") ? "true" : undefined}
            aria-describedby={err("email") ? "email-error" : "email-hint"}
          />
          {err("email") ? (
            <p id="email-error" className="field-error">
              {err("email")}
            </p>
          ) : (
            <p id="email-hint" className="field-hint">
              Your confirmation goes here.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Phone <span className="font-normal text-slate">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            maxLength={30}
            aria-invalid={err("phone") ? "true" : undefined}
          />
          {err("phone") && <p className="field-error">{err("phone")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="seats" className="field-label">
          How many seats?
        </label>
        <select
          id="seats"
          name="seats"
          className="field"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        >
          {seatOptions.map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "seat" : "seats"}
            </option>
          ))}
        </select>
        <p className="field-hint">Up to {maxSeats} per booking, including yourself.</p>
      </div>

      <div>
        <label htmlFor="notes" className="field-label">
          Anything we should know? <span className="font-normal text-slate">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="field resize-y"
          maxLength={500}
          placeholder="Accessibility needs, arriving late, bringing a school group…"
        />
      </div>

      {goingOnWaitlist && waitlistEnabled && (
        <Alert tone="warn" title="This will join the waiting list">
          {remaining > 0 ? (
            <>
              Only {remaining} {remaining === 1 ? "seat is" : "seats are"} free, so a
              booking for {seats} will be waitlisted as a group. We&apos;ll confirm you
              automatically as soon as enough seats open up.
            </>
          ) : (
            <>
              This screening is full. We&apos;ll hold your place in the queue and email
              you the moment a seat is released.
            </>
          )}
        </Alert>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
            Reserving…
          </>
        ) : goingOnWaitlist && waitlistEnabled ? (
          <>
            <Clock3 className="h-[18px] w-[18px]" aria-hidden />
            Join the waiting list
          </>
        ) : (
          <>
            <Ticket className="h-[18px] w-[18px]" aria-hidden />
            Reserve {seats === 1 ? "my seat" : `${seats} seats`}
          </>
        )}
      </Button>

      <p className="text-center text-xs leading-relaxed text-slate">
        Seats are free. We only use your details to manage this screening — never for
        anything else. You can cancel any time from the link in your confirmation email.
      </p>
    </form>
  );
}
