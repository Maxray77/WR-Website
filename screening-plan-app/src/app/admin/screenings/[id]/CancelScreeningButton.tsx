"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cancelScreeningAction } from "../../actions";

export function CancelScreeningButton({
  screeningId,
  affectedCount,
}: {
  screeningId: string;
  affectedCount: number;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-red-600 underline-offset-4 hover:underline"
      >
        Cancel this whole screening
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-red-800">
        <AlertTriangle className="h-4 w-4" aria-hidden />
        Cancel the entire screening?
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-red-700">
        This marks the screening cancelled, releases every booking, and emails all{" "}
        <strong>{affectedCount}</strong>{" "}
        {affectedCount === 1 ? "person" : "people"} still holding a seat or a waiting-list
        place. It cannot be undone from here.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <form action={cancelScreeningAction}>
          <input type="hidden" name="id" value={screeningId} />
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-red-700"
          >
            Yes, cancel and notify everyone
          </button>
        </form>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate hover:text-charcoal"
        >
          Keep it
        </button>
      </div>
    </div>
  );
}
