"use client";

import { useActionState } from "react";
import { Loader2, Search } from "lucide-react";
import { lookupBookingAction, type LookupState } from "@/app/actions";
import { Alert, Button } from "@/components/ui";

const INITIAL: LookupState = { ok: false };

export function LookupForm() {
  const [state, formAction, pending] = useActionState(lookupBookingAction, INITIAL);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && <Alert tone="error">{state.message}</Alert>}

      <div>
        <label htmlFor="reference" className="field-label">
          Booking reference
        </label>
        <input
          id="reference"
          name="reference"
          className="field font-mono uppercase tracking-widest"
          placeholder="ATB-XXXXXX"
          required
          maxLength={16}
          autoComplete="off"
          spellCheck={false}
        />
        <p className="field-hint">It&apos;s at the top of your confirmation email.</p>
      </div>

      <div>
        <label htmlFor="email" className="field-label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          className="field"
          placeholder="you@example.com"
          required
          maxLength={254}
          autoComplete="email"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
            Looking…
          </>
        ) : (
          <>
            <Search className="h-[18px] w-[18px]" aria-hidden />
            Find my booking
          </>
        )}
      </Button>
    </form>
  );
}
