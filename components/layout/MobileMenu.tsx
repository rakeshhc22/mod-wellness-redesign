"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";
import { mainNav } from "@/data/navigation";
import { brand } from "@/data/siteContent";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const navRef = useRef<HTMLElement>(null);

  // Stagger the links in a beat after the panel itself has slid in
  // (the panel's own open/close motion stays CSS-driven, see the
  // translate-x classes below — this only handles the link stagger).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !open) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const items = gsap.utils.toArray<HTMLElement>(nav.children);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, x: 16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        delay: 0.15,
        stagger: 0.05,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }, [open]);

  // Esc closes the panel, matching the chatbot's keyboard behavior.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-linen border-l border-stone transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-stone">
          <span className="font-poppins font-medium text-xl text-charcoal">{brand.name}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="text-charcoal/80 hover:text-gold focus-visible:text-gold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav ref={navRef} className="flex flex-col px-6 py-8 gap-1">
          {mainNav.map((item) => (
            <div key={item.label} className="border-b border-stone/70 py-3">
              <Link
                href={item.href}
                onClick={onClose}
                className="font-poppins font-medium text-2xl text-charcoal hover:text-gold focus-visible:text-gold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex flex-col gap-2 mt-3 pl-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="font-poppins text-xs uppercase tracking-[0.12em] text-charcoal/55 hover:text-gold focus-visible:text-gold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
