"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Heart, Loader2, Lock } from "lucide-react";
import { GIVING_TIERS, MONTHLY_TIERS } from "@/lib/constants";

type Frequency = "once" | "monthly";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function DonateForm() {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tiers = frequency === "once" ? GIVING_TIERS : MONTHLY_TIERS;

  /** The amount we will actually charge: a custom entry always wins. */
  const amount = useMemo(() => {
    if (custom.trim() !== "") {
      const parsed = Number.parseFloat(custom);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return selected;
  }, [custom, selected]);

  const activeTier = tiers.find((t) => t.amount === selected && custom === "");

  function chooseFrequency(next: Frequency) {
    setFrequency(next);
    setError(null);
    // Reset to that frequency's featured amount so the selection stays valid.
    const list = next === "once" ? GIVING_TIERS : MONTHLY_TIERS;
    const featured = list.find((t) => t.featured) ?? list[0];
    setSelected(featured.amount);
    setCustom("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (amount === null || !Number.isFinite(amount) || amount <= 0) {
      setError("Please choose or enter a donation amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency: frequency === "monthly" ? "monthly" : "once",
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(
          data.error ??
            "Something went wrong starting the payment. Please try again.",
        );
        setLoading(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError(
        "We could not reach the payment service. Please check your connection and try again.",
      );
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 shadow-lg shadow-ink/5 sm:p-8"
      aria-labelledby="give-heading"
    >
      <h2 id="give-heading" className="font-display text-2xl text-ink">
        Make a donation
      </h2>
      <p className="mt-1.5 text-sm text-ash">
        Secure payment by card, Apple&nbsp;Pay or Google&nbsp;Pay.
      </p>

      {/* ------------------------------------------------------- frequency */}
      <fieldset className="mt-6">
        <legend className="sr-only">Donation frequency</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-full bg-sand p-1.5">
          {(
            [
              ["once", "One-time"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => chooseFrequency(value)}
              aria-pressed={frequency === value}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                frequency === value
                  ? "bg-ink text-bone shadow-sm"
                  : "text-ash hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ---------------------------------------------------------- amounts */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-ink">
          Choose an amount
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiers.map((tier) => {
            const active = selected === tier.amount && custom === "";
            return (
              <button
                key={tier.amount}
                type="button"
                onClick={() => {
                  setSelected(tier.amount);
                  setCustom("");
                  setError(null);
                }}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-4 text-center transition-colors ${
                  active
                    ? "border-ember bg-ember-light text-ember"
                    : "border-line text-ink hover:border-ember/50 hover:bg-bone"
                }`}
              >
                <span className="block font-display text-xl font-semibold">
                  {usd(tier.amount)}
                </span>
                {frequency === "monthly" ? (
                  <span className="mt-0.5 block text-[0.7rem] text-ash">
                    per month
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------- custom amount */}
        <label htmlFor="custom-amount" className="mt-5 block">
          <span className="text-sm font-semibold text-ink">
            Or enter your own amount
          </span>
          <div className="relative mt-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-ash"
            >
              $
            </span>
            <input
              id="custom-amount"
              type="number"
              inputMode="decimal"
              min={5}
              max={50000}
              step="1"
              placeholder="Other amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setError(null);
              }}
              className="w-full rounded-xl border border-line bg-white py-3.5 pl-9 pr-4 text-lg text-ink placeholder:text-ash/60 focus:border-ember focus:outline-none"
            />
          </div>
        </label>
      </fieldset>

      {/* --------------------------------------------------- tier narrative */}
      {activeTier ? (
        <p className="mt-5 rounded-xl bg-bone px-4 py-3.5 text-sm leading-relaxed text-ash">
          <span className="font-semibold text-ink">{activeTier.title}.</span>{" "}
          {activeTier.description}
        </p>
      ) : null}

      {/* ---------------------------------------------------------- errors */}
      {error ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-ember/30 bg-ember-light px-4 py-3.5 text-sm text-ember-dark"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}

      {/* ---------------------------------------------------------- submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ember px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-ember-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Taking you to checkout…
          </>
        ) : (
          <>
            <Heart className="h-5 w-5" aria-hidden="true" />
            Give{" "}
            {amount && Number.isFinite(amount) && amount > 0
              ? usd(amount)
              : ""}
            {frequency === "monthly" ? " a month" : ""}
          </>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ash">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Payments processed by Stripe. We never see or store your card details.
      </p>
    </form>
  );
}
