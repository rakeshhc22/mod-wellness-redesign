"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap";

interface StaggerGroupProps {
  /** Each direct child becomes its own staggered item — drop this in
   *  place of the existing grid/flex wrapper div, same className. */
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: boolean;
  stagger?: number;
  duration?: number;
  start?: string;
}

/**
 * Reveals a group of sibling elements (product cards, category tiles,
 * feature items, nav links, ...) with a gentle bottom-up stagger the
 * moment the group scrolls into view. Renders as a plain div carrying
 * whatever layout className is passed in (grid, flex, etc.) so it can
 * drop directly in place of an existing wrapper without touching the
 * layout itself.
 */
export default function StaggerGroup({
  children,
  className = "",
  y = 32,
  scale = false,
  stagger = 0.1,
  duration = 0.7,
  start = "top 85%",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(Array.from(el.children));
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fromVars: gsap.TweenVars = { opacity: 0, y };
        if (scale) fromVars.scale = 0.95;
        gsap.set(items, fromVars);

        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { clearProps: "all" });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y, scale, stagger, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
