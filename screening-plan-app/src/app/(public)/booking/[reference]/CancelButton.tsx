"use client";

import { useActionState, useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import { cancelBookingAction, type CancelState } from "@/app/actions";
import { Alert, Button } from "@/components/ui";

const INITIAL: CancelState = { ok: false };

export function CancelButton({
  reference,
  token,
  isWaitlisted,
}: {
  reference: string;
  token: string;
  isWaitlisted: boolean;
}) {
  const [state, formAction, pending] = useActionState(cancelBookingAction, INITIAL);
  const [confirming, setConfirming] = useState(false);

  if (state.ok) {
    return (
      <Alert tone="success" title="Booking cancelled">
        We&apos;ve sent you a confirmation email. Thank you for letting us know —
        {isWaitlisted
          ? " your place on the waiting list has been released."
          : " your seat has gone to the next person waiting."}
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {state.message && <Alert tone="error">{state.message}</Alert>}

      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="text-sm font-semibold text-red-600 underline-offset-4 hover:underline"
        >
          I can no longer attend — cancel this booking
        </button>
      ) : (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
          <p className="text-sm font-semibold text-red-800">
            Cancel booking {reference}?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-red-700">
            {isWaitlisted
              ? "You'll be removed from the waiting list. You can register again later if seats are still open."
              : "Your seats are released immediately and offered to the waiting list. This can't be undone."}
          </p>
          <form action={formAction} className="mt-4 flex flex-wrap gap-2">
            <input type="hidden" name="reference" value={reference} />
            <input type="hidden" name="token" value={token} />
            <Button type="submit" variant="danger" size="sm" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Cancelling…
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" aria-hidden />
                  Yes, cancel it
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setConfirming(false)}
              disabled={pending}
            >
              Keep my booking
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
