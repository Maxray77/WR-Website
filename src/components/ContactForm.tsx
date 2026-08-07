"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { ORG } from "@/lib/constants";

const SUBJECTS = [
  "General enquiry",
  "A donation I have made",
  "Donor-advised fund or stock gift",
  "Employer matching",
  "Leaving a gift in my will",
  "Press or media",
  "Partnership proposal",
];

const FIELD =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ash/60 focus:border-ember focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError(
        `We could not reach the server. Please email us at ${ORG.email}.`,
      );
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-line bg-white p-10 text-center"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-ember"
          aria-hidden="true"
        />
        <h2 className="mt-5 font-display text-2xl text-ink">Message sent</h2>
        <p className="mt-3 leading-relaxed text-ash">
          Thank you — a director will read this and reply personally. We are a
          small volunteer board, so please allow a couple of days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 font-semibold text-ember hover:text-ember-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">
            Your name <span className="text-ember">*</span>
          </span>
          <input
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={`mt-2 ${FIELD}`}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink">
            Email <span className="text-ember">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={`mt-2 ${FIELD}`}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-ink">
          What is this about?
        </span>
        <select name="subject" defaultValue={SUBJECTS[0]} className={`mt-2 ${FIELD}`}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-ink">
          Message <span className="text-ember">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={`mt-2 resize-y ${FIELD}`}
        />
      </label>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-ember/30 bg-ember-light px-4 py-3.5 text-sm text-ember-dark"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ember px-8 py-3.5 font-semibold text-white transition-colors hover:bg-ember-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
