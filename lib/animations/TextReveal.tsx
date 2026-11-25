"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap";

interface TextRevealProps {
  /** One entry per line — matches the existing pattern of passing
   *  headline copy in as a string array (see data/siteContent.ts). */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  trigger?: "scroll" | "mount";
  start?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Premium line-reveal for large display headings ("Wellness,
 * Reimagined."). Each line sits inside its own overflow-hidden mask
 * so it can slide up from fully clipped to fully visible without any
 * layout shift — the heading occupies its final size from the very
 * first paint, only the line contents animate.
 */
export default function TextReveal({
  lines,
  as = "div",
  className = "",
  trigger = "scroll",
  start = "top 85%",
  delay = 0,
  stagger = 0.1,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as unknown as "div";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inner = gsap.utils.toArray<HTMLElement>(
        el.querySelectorAll("[data-reveal-line]")
      );
      if (!inner.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(inner, { yPercent: 110, opacity: 0 });

        const vars: gsap.TweenVars = {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger,
          ease: "expo.out",
        };

        if (trigger === "scroll") {
          vars.scrollTrigger = {
            trigger: el,
            start,
            toggleActions: "play none none none",
          };
        }

        gsap.to(inner, vars);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(inner, { clearProps: "all" });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, start, delay, stagger, lines.length]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-reveal-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
