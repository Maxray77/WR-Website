import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────── Button ─────────────────────────── */

type ButtonVariant = "primary" | "amber" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-dark shadow-sm hover:shadow disabled:hover:bg-teal",
  amber:
    "bg-amber text-charcoal hover:bg-amber-light shadow-sm disabled:hover:bg-amber",
  outline:
    "border border-line bg-white text-charcoal hover:border-teal hover:text-teal-dark",
  ghost: "text-charcoal hover:bg-teal-light hover:text-teal-dark",
  danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-xl",
};

const BASE =
  "inline-flex items-center justify-center font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-px";

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/* ─────────────────────────── Badge ──────────────────────────── */

const BADGE_TONES = {
  teal: "bg-teal-light text-teal-dark ring-teal/15",
  amber: "bg-amber-soft text-[#8a5d00] ring-amber/25",
  red: "bg-red-50 text-red-700 ring-red-200",
  slate: "bg-offwhite text-slate ring-line",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
} as const;

export function Badge({
  tone = "slate",
  children,
  className,
}: {
  tone?: keyof typeof BADGE_TONES;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset",
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ─────────────────────── Seat availability ──────────────────── */

export function SeatMeter({
  capacity,
  confirmedSeats,
  waitlistedSeats = 0,
  compact = false,
}: {
  capacity: number;
  confirmedSeats: number;
  waitlistedSeats?: number;
  compact?: boolean;
}) {
  const pct = capacity > 0 ? Math.min(100, (confirmedSeats / capacity) * 100) : 100;
  const remaining = Math.max(0, capacity - confirmedSeats);
  const tone = remaining === 0 ? "bg-amber" : pct > 80 ? "bg-amber" : "bg-teal";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13px] font-semibold text-charcoal">
          {remaining > 0 ? (
            <>
              {remaining} {remaining === 1 ? "seat" : "seats"} left
            </>
          ) : (
            "Fully booked"
          )}
        </span>
        <span className="text-[12px] text-slate">
          {confirmedSeats}/{capacity} taken
        </span>
      </div>
      <div
        className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={confirmedSeats}
        aria-valuemin={0}
        aria-valuemax={capacity}
        aria-label="Seats booked"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compact && waitlistedSeats > 0 && (
        <p className="mt-1.5 text-[12px] text-slate">
          {waitlistedSeats} {waitlistedSeats === 1 ? "person" : "people"} on the waiting
          list
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── Alert / Empty ────────────────────── */

const ALERT_TONES = {
  info: "border-teal/20 bg-teal-light text-teal-dark",
  warn: "border-amber/30 bg-amber-soft text-[#7a5200]",
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
} as const;

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof ALERT_TONES;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-xl border px-4 py-3 text-sm", ALERT_TONES[tone], className)}
      role={tone === "error" ? "alert" : undefined}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children && <div className={cn(title && "mt-1", "leading-relaxed")}>{children}</div>}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      {icon && (
        <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-teal-light text-teal">
          {icon}
        </span>
      )}
      <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
      {children && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">{children}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ───────────────────────── Page header ──────────────────────── */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {title}
        </h1>
        {description && (
          <div className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
            {description}
          </div>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { tone: keyof typeof BADGE_TONES; label: string }> = {
    confirmed: { tone: "green", label: "Confirmed" },
    waitlisted: { tone: "amber", label: "Waiting list" },
    cancelled: { tone: "red", label: "Cancelled" },
    published: { tone: "green", label: "Published" },
    draft: { tone: "slate", label: "Draft" },
    completed: { tone: "slate", label: "Completed" },
  };
  const entry = map[status] ?? { tone: "slate" as const, label: status };
  return <Badge tone={entry.tone}>{entry.label}</Badge>;
}
