"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";

const END_SCALE = 0.80;
const END_ROTATE_DELTA = -360;
const SCRUB = 1;

export default function FloatingBottle() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const zone = wrap.parentElement;
      const heroZone = document.getElementById("hero-bottle-zone");
      const heroVisual = document.getElementById("hero-bottle-visual");
      const target = document.getElementById("about-bottle-target");

      if (!zone || !heroZone || !heroVisual || !target) return;

      let deltaX = 0;
      let deltaY = 0;

      function measure() {
        const zoneRect = zone!.getBoundingClientRect();
        const heroRect = heroZone!.getBoundingClientRect();
        const targetRect = target!.getBoundingClientRect();

        const top = heroRect.top - zoneRect.top;
        const left = heroRect.left - zoneRect.left;
        const width = heroRect.width;
        const height = heroRect.height;

        wrap!.style.top = `${top}px`;
        wrap!.style.left = `${left}px`;
        wrap!.style.width = `${width}px`;
        wrap!.style.height = `${height}px`;

        const startCenterX = left + width / 2;
        const startCenterY = top + height / 2;
        const endCenterX =
          targetRect.left - zoneRect.left + targetRect.width / 2;
        const endCenterY =
          targetRect.top - zoneRect.top + targetRect.height / 2;

        deltaX = endCenterX - startCenterX;
        deltaY = endCenterY - startCenterY;
      }

      measure();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: zone,
          start: "top top",
          end: "top+=550",
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            gsap.set(wrap, { x: 0, y: 0, scale: 1, rotate: 0 });
            measure();
          },
        },
      });

      tl.to(heroVisual, { opacity: 0, duration: 0.05, ease: "none" }, 0)
        .to(wrap, { opacity: 1, duration: 0.05, ease: "none" }, 0)
        .to(
          wrap,
          {
            x: () => deltaX,
            y: () => deltaY,
            scale: END_SCALE,
            rotate: END_ROTATE_DELTA,
            duration: 1,
            ease: "none",
          },
          0
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(heroVisual, { opacity: 1 });
      };
    });

    // Below the desktop breakpoint, or when the user prefers reduced
    // motion: skip the scroll-scrubbed travel entirely. The hero
    // bottle simply stays put and this cloned element stays hidden,
    // same end state as the animation's start — no motion, no jank.
    mm.add(
      "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      () => {
        const heroVisual = document.getElementById("hero-bottle-visual");
        if (heroVisual) gsap.set(heroVisual, { opacity: 1 });
        gsap.set(wrap, { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute z-30 opacity-0 pointer-events-none hidden lg:flex items-center justify-center"
    >
      <div
        className="relative w-72 sm:w-[22rem] lg:w-[27rem] h-[90%] animate-bottle-float"
        style={{ transform: "rotate(30deg)", willChange: "transform" }}
      >
        <Image
          src="/Images/Bottle.png"
          alt=""
          fill
          className="object-contain drop-shadow-2xl"
          sizes="432px"
        />
      </div>
    </div>
  );
}
