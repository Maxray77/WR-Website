"use client";

import { useState } from "react";
import { Check, CheckCircle2, Undo2, X } from "lucide-react";
import type { Registration } from "@/lib/db/schema";
import { StatusPill } from "@/components/ui";
import {
  cancelAttendeeAction,
  checkInAction,
  confirmAttendeeAction,
} from "../../actions";

export function AttendeeRow({
  registration: r,
  screeningId,
  index,
}: {
  registration: Registration;
  screeningId: string;
  index?: number;
}) {
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const cancelled = r.status === "cancelled";

  return (
    <tr className={cancelled ? "opacity-55" : undefined}>
      <td className="px-3 py-3 align-top">
        <div className="flex items-start gap-2">
          {typeof index === "number" && (
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-soft text-[11px] font-bold text-[#8a5d00]">
              {index}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-medium text-charcoal">{r.name}</p>
            <p className="truncate text-[13px] text-slate">{r.email}</p>
            {r.phone && <p className="text-[13px] text-slate">{r.phone}</p>}
            {r.notes && (
              <p className="mt-1 text-[12px] italic text-slate">{r.notes}</p>
            )}
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-3 py-3 align-top text-center font-semibold text-charcoal">
        {r.seats}
      </td>

      <td className="whitespace-nowrap px-3 py-3 align-top">
        <div className="flex flex-col items-start gap-1">
          <StatusPill status={r.status} />
          {r.source === "manual" && (
            <span className="text-[11px] text-slate">added by hand</span>
          )}
        </div>
      </td>

      <td className="whitespace-nowrap px-3 py-3 align-top font-mono text-[13px] text-slate">
        {r.reference}
      </td>

      <td className="px-3 py-3 align-top">
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {r.status === "confirmed" && (
            <form action={checkInAction}>
              <input type="hidden" name="registrationId" value={r.id} />
              <input type="hidden" name="screeningId" value={screeningId} />
              <input
                type="hidden"
                name="checkedIn"
                value={r.checkedInAt ? "false" : "true"}
              />
              <button
                type="submit"
                className={
                  r.checkedInAt
                    ? "inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[12px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100"
                    : "inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-semibold text-charcoal hover:border-teal hover:text-teal"
                }
              >
                {r.checkedInAt ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                    In
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Check in
                  </>
                )}
              </button>
            </form>
          )}

          {(r.status === "waitlisted" || r.status === "cancelled") && (
            <form action={confirmAttendeeAction}>
              <input type="hidden" name="registrationId" value={r.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg border border-teal/30 bg-teal-light px-2.5 py-1.5 text-[12px] font-semibold text-teal-dark hover:bg-teal hover:text-white"
              >
                <Undo2 className="h-3.5 w-3.5" aria-hidden />
                {r.status === "cancelled" ? "Restore" : "Confirm"}
              </button>
            </form>
          )}

          {!cancelled &&
            (confirmingCancel ? (
              <span className="inline-flex items-center gap-1.5">
                <form action={cancelAttendeeAction}>
                  <input type="hidden" name="registrationId" value={r.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                    Confirm cancel
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setConfirmingCancel(false)}
                  className="rounded-lg px-2 py-1.5 text-[12px] font-medium text-slate hover:text-charcoal"
                >
                  Keep
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingCancel(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-semibold text-red-600 hover:border-red-200 hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Cancel
              </button>
            ))}
        </div>
      </td>
    </tr>
  );
}
