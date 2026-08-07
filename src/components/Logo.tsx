import Link from "next/link";

/**
 * Typographic R3 mark. The organisation's existing branding already leads with
 * "R3", so we keep that and build a proper wordmark around it. If a designed
 * logo file arrives later, swap the <svg> for an <Image> and leave the rest.
 */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle cx="24" cy="24" r="24" className="fill-ink" />
      {/* Swept wing arc, echoing a raptor in a thermal */}
      <path
        d="M6.5 31.5c6-1.2 10.6-4.2 14.2-9.1"
        className="stroke-gold"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M41.5 16.5c-6 1.2-10.6 4.2-14.2 9.1"
        className="stroke-gold"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-bone font-display"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.5"
      >
        R3
      </text>
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const primary = tone === "light" ? "text-bone" : "text-ink";
  const secondary = tone === "light" ? "text-bone/60" : "text-ash";
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Raptor Rescue and Research Inc. — home"
    >
      <LogoMark className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-semibold tracking-tight ${primary}`}
        >
          Raptor Rescue
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${secondary}`}
        >
          &amp; Research Inc.
        </span>
      </span>
    </Link>
  );
}
