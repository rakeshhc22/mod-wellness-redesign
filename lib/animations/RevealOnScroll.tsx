"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap";

type Direction = "up" | "left" | "right" | "none";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Direction the element travels in from. */
  direction?: Direction;
  /** Travel distance in px. Kept intentionally subtle (30-80px). */
  distance?: number;
  duration?: number;
  delay?: number;
  /** Adds a small scale-in (0.94 -> 1) alongside the fade/slide. */
  scale?: boolean;
  /** "scroll" (default) reveals when it enters the viewport. "mount"
   *  plays immediately — for above-the-fold content like the Hero. */
  trigger?: "scroll" | "mount";
  /** ScrollTrigger start position, only used when trigger="scroll". */
  start?: string;
  className?: string;
}

/**
 * Shared reveal primitive used across every section of the site.
 * Wraps its children in a div, hides them with GSAP before first
 * paint (useLayoutEffect, same pattern as the existing FloatingBottle
 * animation), then animates them into place either immediately or
 * the moment the element scrolls into view.
 *
 * Respects prefers-reduced-motion via gsap.matchMedia: reduced-motion
 * users get the final, fully-visible state with no animation at all
 * rather than a smaller version of it.
 */
export default function RevealOnScroll({
  children,
  direction = "up",
  distance = 40,
  duration = 0.9,
  delay = 0,
  scale = false,
  trigger = "scroll",
  start = "top 85%",
  className = "",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fromVars: gsap.TweenVars = { opacity: 0 };
        if (direction === "up") fromVars.y = distance;
        if (direction === "left") fromVars.x = -distance;
        if (direction === "right") fromVars.x = distance;
        if (scale) fromVars.scale = 0.94;

        gsap.set(el, fromVars);

        const toVars: gsap.TweenVars = {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          clearProps: "transform",
        };

        if (trigger === "scroll") {
          toVars.scrollTrigger = {
            trigger: el,
            start,
            toggleActions: "play none none none",
          };
        }

        gsap.to(el, toVars);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "all" });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, distance, duration, delay, scale, trigger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
