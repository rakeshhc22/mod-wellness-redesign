"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";

interface LineRevealProps {
  className?: string;
  duration?: number;
  delay?: number;
  start?: string;
}

/**
 * Draws a horizontal line in from the left as it scrolls into view —
 * used for the process timeline's connecting line. Same GSAP +
 * ScrollTrigger + prefers-reduced-motion pattern as RevealOnScroll,
 * just animating scaleX instead of opacity/position, since a fade
 * doesn't read as a "line reveal".
 */
export default function LineReveal({
  className = "",
  duration = 1.1,
  delay = 0,
  start = "top 85%",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(el, {
          scaleX: 1,
          duration,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "all" });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, delay, start]);

  return <div ref={ref} className={className} />;
}
