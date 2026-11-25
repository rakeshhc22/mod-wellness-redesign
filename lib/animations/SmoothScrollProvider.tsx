"use client";

import { useLayoutEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

/**
 * Global smooth-scroll layer.
 *
 * Mounted once in app/layout.tsx (outside <main>, wrapping the whole
 * body) so it survives route changes instead of re-initializing on
 * every navigation. Lenis takes over wheel/trackpad scrolling and
 * feeds its position into GSAP's ticker so every ScrollTrigger
 * instance in the app (product/category reveals, the Hero -> About
 * bottle travel in FloatingBottle, etc.) stays perfectly in sync.
 *
 * Deliberately conservative:
 *   - `syncTouch: false` leaves native touch/momentum scrolling on
 *     mobile completely untouched, per the "don't interfere with
 *     mobile/touch scrolling" requirement.
 *   - Skips initialization entirely when the user has
 *     prefers-reduced-motion enabled, falling back to plain native
 *     scrolling rather than a reduced version of the smoothing.
 *   - Renders no DOM of its own — Lenis operates on the native
 *     window scroll, so this can't affect layout or hydration.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    function onLenisScroll() {
      ScrollTrigger.update();
    }
    lenis.on("scroll", onLenisScroll);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    // Lenis already smooths the scroll position itself; letting GSAP's
    // ticker also apply lag smoothing on top double-dips and can make
    // fast scrolling feel sluggish, so it's turned off here.
    gsap.ticker.lagSmoothing(0);

    // Re-measure every ScrollTrigger once images/fonts have actually
    // settled, so trigger start/end positions aren't based on a
    // pre-font-swap layout.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
