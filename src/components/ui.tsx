import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Layout primitives                                                         */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  const width =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={`${width} mx-auto px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  children,
  className = "",
  tone = "bone",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "bone" | "sand" | "ink" | "white";
  id?: string;
}) {
  const tones = {
    bone: "bg-bone text-graphite",
    sand: "bg-sand text-graphite",
    white: "bg-white text-graphite",
    ink: "bg-ink text-bone",
  };
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typography                                                                */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = "ember",
}: {
  children: ReactNode;
  tone?: "ember" | "gold" | "ash";
}) {
  const tones = { ember: "text-ember", gold: "text-gold", ash: "text-ash" };
  return <p className={`eyebrow ${tones[tone]} mb-4`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const titleColor = tone === "light" ? "text-bone" : "text-ink";
  const introColor = tone === "light" ? "text-bone/75" : "text-ash";
  return (
    <div className={`${alignment} ${align === "center" ? "max-w-3xl" : "max-w-3xl"}`}>
      {eyebrow ? (
        <Eyebrow tone={tone === "light" ? "gold" : "ember"}>{eyebrow}</Eyebrow>
      ) : null}
      <Tag
        className={`${titleColor} text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]`}
      >
        {title}
      </Tag>
      {intro ? (
        <div className={`${introColor} mt-5 text-lg leading-relaxed`}>{intro}</div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                   */
/* -------------------------------------------------------------------------- */

type ButtonTone = "ember" | "ink" | "outline" | "outlineLight" | "gold";

const BUTTON_TONES: Record<ButtonTone, string> = {
  ember: "bg-ember text-white hover:bg-ember-dark shadow-sm",
  ink: "bg-ink text-bone hover:bg-ink-2 shadow-sm",
  gold: "bg-gold text-ink hover:bg-gold/85 shadow-sm",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  outlineLight:
    "border border-bone/35 text-bone hover:bg-bone hover:text-ink hover:border-bone",
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200";

const BUTTON_SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-base sm:text-lg",
};

export function ButtonLink({
  href,
  children,
  tone = "ember",
  size = "md",
  className = "",
  external = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  size?: keyof typeof BUTTON_SIZES;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const classes = `${BUTTON_BASE} ${BUTTON_SIZES[size]} ${BUTTON_TONES[tone]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  tone = "ember",
  size = "md",
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: ButtonTone;
  size?: keyof typeof BUTTON_SIZES;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${BUTTON_BASE} ${BUTTON_SIZES[size]} ${BUTTON_TONES[tone]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content blocks                                                            */
/* -------------------------------------------------------------------------- */

export function Stat({
  value,
  label,
  detail,
  tone = "dark",
}: {
  value: string;
  label: string;
  detail?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div>
      <p
        className={`font-display text-4xl sm:text-5xl font-semibold ${
          tone === "light" ? "text-gold" : "text-ember"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-2 font-semibold ${
          tone === "light" ? "text-bone" : "text-ink"
        }`}
      >
        {label}
      </p>
      {detail ? (
        <p
          className={`mt-1.5 text-sm leading-relaxed ${
            tone === "light" ? "text-bone/65" : "text-ash"
          }`}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(13,27,38,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Full-width pull quote used to break up long narrative pages. */
export function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <blockquote className="border-l-2 border-ember pl-6 sm:pl-8">
      <p className="font-display text-2xl sm:text-3xl leading-snug text-ink">
        {quote}
      </p>
      {attribution ? (
        <footer className="mt-4 text-sm font-semibold uppercase tracking-wider text-ash">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
