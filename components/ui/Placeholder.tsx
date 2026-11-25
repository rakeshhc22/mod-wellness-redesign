import { ReactNode } from "react";
import BottleMotif from "./BottleMotif";

interface PlaceholderProps {
  label: string;
  sublabel?: string;
  className?: string;
  icon?: ReactNode;
  showMotif?: boolean;
}

/**
 * Standard placeholder used everywhere a real photo, product
 * render, or animation will eventually live. Keeping this as a
 * single component means swapping in real imagery later is a
 * one-place change.
 */
export default function Placeholder({
  label,
  sublabel,
  className = "",
  icon,
  showMotif = true,
}: PlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 border border-stone bg-linen-raised text-sage overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          }}
        />
      </div>
      {icon}
      {showMotif && !icon && (
        <BottleMotif className="w-12 h-auto text-moss/40" />
      )}
      <div className="relative flex flex-col items-center gap-1 px-4 text-center">
        <span className="eyebrow text-ink/60">{label}</span>
        {sublabel && (
          <span className="text-xs text-sage/80">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
