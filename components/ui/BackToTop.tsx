"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button. Appears once the user has scrolled
 * past roughly one viewport height (i.e. past the hero) and smooth-
 * scrolls back to the top on click.
 *
 * Positioned on the opposite side of the screen from Chatbot's
 * bottom-right toggle (see components/ui/Chatbot.tsx) so the two
 * floating controls never collide, at any viewport width.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-linen border border-stone text-ink shadow-[0_12px_30px_-10px_rgba(30,37,43,0.35)] hover:border-moss hover:text-moss transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}
