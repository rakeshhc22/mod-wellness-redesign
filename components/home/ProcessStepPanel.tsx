"use client";

import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { JourneyStep } from "@/types";

interface ProcessStepPanelProps {
  step: JourneyStep;
  /** "active" is the currently visible panel; "prev"/"next" sit off to
   *  either side, hidden, ready to cross-fade in from the direction
   *  the user is moving through the journey. */
  state: "active" | "prev" | "next";
}

export default function ProcessStepPanel({ step, state }: ProcessStepPanelProps) {
  const isActive = state === "active";
  const isPrev = state === "prev";

  return (
    <div
      aria-hidden={!isActive}
      className={`journey-panel absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Image: fades/scales in place, with a faint directional drift
          so it reads as "arriving" rather than the whole panel sliding. */}
      <div
        className={`journey-panel__image order-2 lg:order-1 transition-[opacity,transform] duration-700 ease-out ${
          isActive
            ? "opacity-100 scale-100 translate-x-0"
            : isPrev
              ? "opacity-0 scale-[0.96] -translate-x-3"
              : "opacity-0 scale-[0.96] translate-x-3"
        }`}
      >
        <ImagePlaceholder
          src={step.image}
          alt={step.alt}
          className="journey-panel__image-frame w-full h-[clamp(360px,45vh,520px)]"
          priority={isActive}
        />
      </div>

      {/* Content: fades/rises independently, slightly after the image,
          so image and text arrive together but not as one rigid block. */}
      <div
        className={`order-1 lg:order-2 flex flex-col gap-5 transition-[opacity,transform] duration-700 ease-out delay-[60ms] ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="font-label text-xs text-brass">{step.number}</span>
        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-linen">
          {step.title}
        </h3>
        <p className="text-base sm:text-lg text-linen/65 leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  );
}
