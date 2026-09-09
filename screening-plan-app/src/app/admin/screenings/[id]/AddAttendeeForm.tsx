"use client";

import { useActionState, useRef, useEffect } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { addAttendeeAction, type ManualAddState } from "../../actions";
import { Alert, Button } from "@/components/ui";

const INITIAL: ManualAddState = {};

export function AddAttendeeForm({
  screeningId,
  maxSeats,
}: {
  screeningId: string;
  maxSeats: number;
}) {
  const [state, formAction, pending] = useActionState(addAttendeeAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  const added = Boolean(state.message?.includes("added"));

  useEffect(() => {
    if (added) formRef.current?.reset();
  }, [added, state.message]);

  const err = (f: string) => state.errors?.[f];

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <input type="hidden" name="screeningId" value={screeningId} />

      {state.message && (
        <Alert tone={added ? "success" : "error"}>{state.message}</Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="m-name" className="field-label">
            Name
          </label>
          <input id="m-name" name="name" className="field" required maxLength={120} />
          {err("name") && <p className="field-error">{err("name")}</p>}
        </div>

        <div>
          <label htmlFor="m-email" className="field-label">
            Email
          </label>
          <input
            id="m-email"
            name="email"
            type="email"
            className="field"
            required
            maxLength={254}
          />
          {err("email") && <p className="field-error">{err("email")}</p>}
        </div>

        <div>
          <label htmlFor="m-phone" className="field-label">
            Phone <span className="font-normal text-slate">(optional)</span>
          </label>
          <input id="m-phone" name="phone" type="tel" className="field" maxLength={30} />
        </div>

        <div>
          <label htmlFor="m-seats" className="field-label">
            Seats
          </label>
          <input
            id="m-seats"
            name="seats"
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            className="field"
            required
          />
          {err("seats") && <p className="field-error">{err("seats")}</p>}
          <p className="field-hint">
            Public limit is {maxSeats}; you can exceed it here.
          </p>
        </div>

        <div>
          <label htmlFor="m-notes" className="field-label">
            Internal note <span className="font-normal text-slate">(optional)</span>
          </label>
          <input
            id="m-notes"
            name="notes"
            className="field"
            maxLength={500}
            placeholder="Phoned in, school group…"
          />
        </div>
      </div>

      <div className="space-y-2 rounded-xl bg-offwhite px-4 py-3">
        <label className="flex items-start gap-2.5 text-[13px]">
          <input
            type="checkbox"
            name="sendEmail"
            defaultChecked
            className="mt-0.5 h-4 w-4 rounded border-line accent-[#0A6E5C]"
          />
          <span className="text-charcoal">
            Email them a confirmation
            <span className="block text-slate">
              Uncheck for walk-ins or people with no email address of their own.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2.5 text-[13px]">
          <input
            type="checkbox"
            name="forceConfirm"
            className="mt-0.5 h-4 w-4 rounded border-line accent-[#E8A317]"
          />
          <span className="text-charcoal">
            Confirm even if the room is full
            <span className="block text-slate">
              Overbooks past capacity instead of adding them to the waiting list.
            </span>
          </span>
        </label>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />
            Adding…
          </>
        ) : (
          <>
            <UserPlus className="h-[18px] w-[18px]" aria-hidden />
            Add attendee
          </>
        )}
      </Button>
    </form>
  );
}
