"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import ProcessStepIndicator from "@/components/home/ProcessStepIndicator";
import ProcessStepPanel from "@/components/home/ProcessStepPanel";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { wellnessJourney } from "@/data/siteContent";

const steps = wellnessJourney.steps;

// One dedicated scroll segment per step, plus one extra segment at the
// end so the pinned panel has room to release (un-stick) after the
// final step instead of overlapping it. Progress is measured against
// this total, then clamped to the last real step index.
const TOTAL_SEGMENTS = steps.length + 1;
// Height (in vh) of a single segment. Kept below a full 100vh so the
// whole pinned journey doesn't demand an excessive scroll distance —
// still enough room per step for the cross-fade to feel intentional
// without the section overstaying its welcome.
const SEGMENT_VH = 85;

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function WellnessJourney() {
  const [active, setActive] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isNavigatingRef = useRef(false);

  // Scroll-driven progression: as the pinned wrapper scrolls past,
  // advance the active step in lockstep with scroll position.
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        `${DESKTOP_QUERY} and (prefers-reduced-motion: no-preference)`,
        () => {
          const trigger = ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              // Ignore scroll-driven updates while a click-triggered
              // scrollTo animation is in flight, so the two navigation
              // paths don't fight each other mid-transition.
              if (isNavigatingRef.current) return;
              const index = Math.min(
                steps.length - 1,
                Math.floor(self.progress * TOTAL_SEGMENTS)
              );
              setActive((prev) => (prev === index ? prev : index));
            },
          });
          scrollTriggerRef.current = trigger;

          return () => {
            trigger.kill();
            scrollTriggerRef.current = null;
          };
        }
      );

      return () => {};
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Manual navigation: clicking a step indicator jumps straight to it,
  // scrolling the pinned wrapper into the right position on desktop,
  // or scrolling the matching block into view on mobile.
  const goToStep = useCallback((index: number) => {
    setActive(index);

    const trigger = scrollTriggerRef.current;
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia(DESKTOP_QUERY).matches;

    if (trigger && isDesktop) {
      isNavigatingRef.current = true;
      const target =
        trigger.start +
        ((index + 0.5) / TOTAL_SEGMENTS) * (trigger.end - trigger.start);

      gsap.to(window, {
        duration: 1,
        ease: "power2.inOut",
        scrollTo: { y: target },
        onComplete: () => {
          isNavigatingRef.current = false;
        },
      });
    } else {
      document
        .getElementById(`journey-step-${index}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="bg-ink text-linen border-b border-stone">
      <Container className="pt-20 sm:pt-28 pb-8 sm:pb-12">
        <RevealOnScroll className="mb-10 sm:mb-14">
          <SectionHeading
            kicker={wellnessJourney.kicker}
            heading={wellnessJourney.heading}
            body={wellnessJourney.body}
            invert
            align="center"
            className="mx-auto"
          />
        </RevealOnScroll>
      </Container>

      {/* Desktop: scroll-pinned journey with cross-fading panels */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative"
        style={{ height: `${TOTAL_SEGMENTS * SEGMENT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <Container className="w-full">
            <ProcessStepIndicator
              steps={steps}
              active={active}
              onSelect={goToStep}
              className="mb-10 xl:mb-12"
            />

            <div className="relative min-h-[400px] xl:min-h-[520px]">
              {steps.map((step, index) => (
                <ProcessStepPanel
                  key={step.id}
                  step={step}
                  state={
                    index === active
                      ? "active"
                      : index < active
                        ? "prev"
                        : "next"
                  }
                />
              ))}
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile / tablet: vertical stacked sequence, no pinning */}
      <Container className="lg:hidden pb-20 sm:pb-28">
        <ProcessStepIndicator
          steps={steps}
          active={active}
          onSelect={goToStep}
          className="mb-14 sm:mb-16"
        />

        <div className="flex flex-col gap-16 sm:gap-20">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.id} start="top 78%">
              <div
                id={`journey-step-${index}`}
                className="scroll-mt-24 flex flex-col gap-6"
              >
                <ImagePlaceholder
                  src={step.image}
                  alt={step.alt}
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-col gap-3">
                  <span className="font-label text-xs text-brass">
                    {step.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-linen leading-[1.1]">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-linen/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
