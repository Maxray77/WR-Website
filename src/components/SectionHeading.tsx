interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 lg:mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-white/80" : "text-slate"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-amber ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
