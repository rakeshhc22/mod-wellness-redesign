"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

/**
 * Subtle page-enter transition. Next.js remounts template.tsx on every
 * navigation while layout.tsx (nav, footer, SmoothScrollProvider) stays
 * mounted, so this is the correct place for a route transition that
 * doesn't flash the chrome around it or reinitialize Lenis.
 *
 * Kept fast on purpose (a few hundred ms, fade + a few px of vertical
 * movement) — the requirement is a smooth transition, not a loading
 * screen. Also nudges ScrollTrigger to refresh once the new page's
 * content is in the DOM, since the previous page's triggers were just
 * torn down and the new page's sections need fresh measurements.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { opacity: 0, y: 16 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "all" });
      });

      return () => mm.revert();
    }, ref);

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
