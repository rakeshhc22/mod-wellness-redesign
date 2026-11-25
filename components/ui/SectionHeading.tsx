interface SectionHeadingProps {
  kicker?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
  /** Use on dark section backgrounds (e.g. the moss-green bands). */
  invert?: boolean;
  className?: string;
}

/**
 * Consistent section header used across the homepage and inner
 * pages: a small tracked-caps kicker, a serif heading, and an
 * optional supporting line.
 */
export default function SectionHeading({
  kicker,
  heading,
  body,
  align = "left",
  invert = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto items-center" : "text-left"} flex flex-col gap-4 max-w-2xl ${className}`}
    >
      {kicker && (
        <span className={`eyebrow ${invert ? "text-linen/85" : "text-brass"}`}>
          {kicker}
        </span>
      )}
      <h2
        className={`font-display text-4xl sm:text-5xl leading-[1.05] ${invert ? "text-linen" : "text-ink"}`}
      >
        {heading}
      </h2>
      {body && (
        <p className={`text-base sm:text-lg leading-relaxed ${invert ? "text-linen/90" : "text-sage"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
