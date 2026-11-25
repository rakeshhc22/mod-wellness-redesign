"use client";

import type { JourneyStep } from "@/types";

interface ProcessStepIndicatorProps {
  steps: JourneyStep[];
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}

/**
 * Horizontal 01—02—03—04 process nav. Renders a base hairline plus a
 * brass progress line whose width tracks the active step, with each
 * step as a clickable button (circle + number + label) so the same
 * component can drive both the desktop pinned journey and the mobile
 * stacked sequence.
 */
export default function ProcessStepIndicator({
  steps,
  active,
  onSelect,
  className = "",
}: ProcessStepIndicatorProps) {
  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-3.5 left-0 right-0 h-px bg-linen/15" />
      <div
        className="absolute top-3.5 left-0 h-px bg-brass transition-[width] duration-700 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="relative grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isReached = index <= active;
          const isActive = index === active;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isActive ? "step" : undefined}
              className="group flex flex-col items-center sm:items-start gap-3 text-left cursor-pointer"
            >
              <span
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-ink transition-colors duration-500 ${
                  isReached
                    ? "border-brass"
                    : "border-linen/25 group-hover:border-linen/50"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    isReached ? "bg-brass" : "bg-linen/25 group-hover:bg-linen/50"
                  }`}
                />
              </span>
              <span className="flex flex-col items-center sm:items-start gap-1">
                <span
                  className={`font-label text-[0.65rem] transition-colors duration-500 ${
                    isActive ? "text-linen/70" : "text-linen/30"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`font-label text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.1em] text-center sm:text-left leading-tight transition-colors duration-500 ${
                    isActive
                      ? "text-linen"
                      : "text-linen/35 group-hover:text-linen/60"
                  }`}
                >
                  {step.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
