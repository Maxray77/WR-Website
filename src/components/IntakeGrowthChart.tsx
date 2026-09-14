"use client";

import { useId, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RESCUE_BY_YEAR } from "@/lib/constants";

/**
 * Annual intake, 2010 → last complete year, as a line + area chart.
 *
 * Two deliberate choices:
 *
 * 1. Partial years are excluded. RESCUE_BY_YEAR carries the year in progress
 *    (e.g. 2026 through 31 July); plotting it would draw a cliff at the right
 *    edge that reads as a collapse in intake rather than an unfinished year.
 *
 * 2. Every label is HTML, positioned as a percentage over the SVG, rather than
 *    <text> inside it. An SVG that scales from ~830px on desktop to ~350px on a
 *    phone drags its own text down with it — 12px becomes 5px and is unreadable.
 *    HTML labels keep real CSS sizes at every width.
 */

// Plot geometry in viewBox units. Labels map onto it by percentage.
const W = 760;
const H = 340;
const PAD = { top: 30, right: 20, bottom: 34, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const Y_TICKS = [0, 1000, 2000, 3000, 4000];
const Y_MAX = 4600;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function IntakeGrowthChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const gradientId = useId();

  const data = useMemo(() => RESCUE_BY_YEAR.filter((d) => !d.partial), []);

  const first = data[0];
  const last = data[data.length - 1];
  const lastIdx = data.length - 1;
  const multiple = (last.total / first.total).toFixed(1);

  const x = (i: number) => PAD.left + (i / lastIdx) * PLOT_W;
  const y = (v: number) => PAD.top + PLOT_H - (v / Y_MAX) * PLOT_H;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.total)}`).join(" ");
  const areaPath = `${linePath} L${x(lastIdx)},${PAD.top + PLOT_H} L${x(0)},${PAD.top + PLOT_H} Z`;

  const point = active === null ? null : data[active];

  const pickNearest = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.left) / PLOT_W) * lastIdx);
    setActive(Math.min(lastIdx, Math.max(0, i)));
  };

  return (
    <div ref={wrapRef}>
      {/* Hero figure — the one number the section leads with */}
      <div className="text-center mb-8">
        <p className="text-5xl sm:text-6xl font-bold text-teal font-[family-name:var(--font-poppins)]">
          {multiple}×
        </p>
        <p className="mt-3 text-slate max-w-xl mx-auto leading-relaxed">
          More birds reach us every year. Intake has grown from{" "}
          <strong className="text-charcoal font-semibold">
            {first.total.toLocaleString()} birds in {first.year}
          </strong>{" "}
          to{" "}
          <strong className="text-charcoal font-semibold">
            {last.total.toLocaleString()} in {last.year}
          </strong>{" "}
          — our highest year on record.
        </p>
      </div>

      <figure className="m-0">
        <div
          className="relative rounded-2xl border border-gray-100 bg-white px-2 py-3 sm:px-4 sm:py-4 shadow-sm"
          onPointerLeave={() => setActive(null)}
          onPointerMove={(e) => pickNearest(e.clientX, e.currentTarget)}
        >
          <div className="relative">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="block w-full h-auto"
              role="img"
              aria-label={`Birds rescued each year from ${first.year} to ${last.year}, rising from ${first.total} to ${last.total.toLocaleString()}. Full figures are in the table below the chart.`}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A6E5C" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0A6E5C" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gridlines — recessive, hairline, solid */}
              {Y_TICKS.map((t) => (
                <line
                  key={t}
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}

              <motion.path
                d={areaPath}
                fill={`url(#${gradientId})`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke="#0A6E5C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />

              {/* Crosshair — the reader aims at a year, not at a 2px line */}
              {point && active !== null && (
                <g>
                  <line
                    x1={x(active)}
                    x2={x(active)}
                    y1={PAD.top}
                    y2={PAD.top + PLOT_H}
                    stroke="#0A6E5C"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                  />
                  <circle cx={x(active)} cy={y(point.total)} r="7" fill="#0A6E5C" stroke="#fff" strokeWidth="2.5" />
                </g>
              )}

              {/* Endpoint markers — 2px surface ring keeps them legible on the line */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <circle cx={x(0)} cy={y(first.total)} r="5" fill="#0A6E5C" stroke="#fff" strokeWidth="2.5" />
                <circle cx={x(lastIdx)} cy={y(last.total)} r="7.5" fill="#E8A317" stroke="#fff" strokeWidth="2.5" />
              </motion.g>

              {/* Focusable hit targets — keyboard parity with hover */}
              {data.map((d, i) => (
                <circle
                  key={d.year}
                  cx={x(i)}
                  cy={y(d.total)}
                  r="16"
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.year}: ${d.total.toLocaleString()} birds`}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="outline-none focus-visible:stroke-teal focus-visible:[stroke-width:2]"
                />
              ))}
            </svg>

            {/* ── Labels in HTML so they stay legible at any width ── */}

            {/* y-axis ticks */}
            {Y_TICKS.map((t) => (
              <span
                key={t}
                className="absolute -translate-y-1/2 pr-2 text-right text-[10px] sm:text-xs text-slate tabular-nums"
                style={{ top: pct(y(t), H), left: 0, width: pct(PAD.left, W) }}
              >
                {t.toLocaleString()}
              </span>
            ))}

            {/* x-axis years */}
            {data.map((d, i) =>
              d.year % 5 === 0 ? (
                <span
                  key={d.year}
                  className="absolute -translate-x-1/2 text-[10px] sm:text-xs text-slate tabular-nums"
                  style={{ left: pct(x(i), W), top: pct(PAD.top + PLOT_H + 10, H) }}
                >
                  {d.year}
                </span>
              ) : null
            )}

            {/* Direct labels — endpoints only, never a number on every point */}
            <span
              className="absolute text-[11px] sm:text-sm font-semibold text-charcoal tabular-nums [text-shadow:0_0_4px_#fff,0_0_4px_#fff]"
              style={{ left: pct(x(0) + 12, W), top: pct(y(first.total) - 30, H) }}
            >
              {first.total}
            </span>
            <span
              className="absolute -translate-x-full text-sm sm:text-lg font-bold text-charcoal tabular-nums [text-shadow:0_0_4px_#fff,0_0_4px_#fff]"
              style={{ left: pct(x(lastIdx) - 4, W), top: pct(y(last.total) - 34, H) }}
            >
              {last.total.toLocaleString()}
            </span>
          </div>

          {/* Tooltip — value leads, label follows */}
          {point && (
            <div
              className="pointer-events-none absolute top-2 right-2 sm:top-4 sm:right-4 rounded-lg bg-charcoal/95 px-3 py-2 text-white shadow-lg"
              role="status"
              aria-live="polite"
            >
              <div className="text-base sm:text-lg font-bold leading-none tabular-nums">
                {point.total.toLocaleString()}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="inline-block h-0.5 w-3 rounded-full bg-teal-light" />
                birds in {point.year}
              </div>
            </div>
          )}
        </div>

        <figcaption className="mt-3 text-xs text-slate text-center max-w-2xl mx-auto leading-relaxed">
          Birds received per year, {first.year}–{last.year}. Complete years only — the year
          in progress is excluded. The dips around 2017–18 and 2020 reflect the pandemic
          and shifts in how partner hospitals routed cases, not a fall in need.
        </figcaption>
      </figure>

      {/* Table view — every value reachable without hovering */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          aria-expanded={showTable}
          className="text-sm font-medium text-teal hover:text-teal-dark underline underline-offset-4"
        >
          {showTable ? "Hide the figures" : "View the figures as a table"}
        </button>
      </div>
      {showTable && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">
              Birds received per year, {first.year} to {last.year}
            </caption>
            <thead>
              <tr className="bg-offwhite">
                <th scope="col" className="text-left px-3 py-2 font-semibold text-charcoal">Year</th>
                <th scope="col" className="text-right px-3 py-2 font-semibold text-charcoal">Birds received</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.year} className="border-b border-gray-100">
                  <th scope="row" className="text-left px-3 py-1.5 font-normal text-slate">{d.year}</th>
                  <td className="text-right px-3 py-1.5 text-charcoal tabular-nums">
                    {d.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
