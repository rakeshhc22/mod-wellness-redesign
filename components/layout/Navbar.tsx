"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, ChevronDown } from "lucide-react";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import { gsap } from "@/lib/animations/gsap";
import { mainNav } from "@/data/navigation";
import { brand } from "@/data/siteContent";

/**
 * Site navigation. Structured so that, once the scroll-based
 * hero animation lands, this can become transparent over the
 * hero and solidify on scroll — the `scrolled` state below is
 * already wired up for that, it just currently always renders
 * the solid style since there's no transparent hero yet.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Very subtle on-load entrance: logo, then nav links with a small
  // stagger, then the cart/menu cluster. Skipped entirely for
  // prefers-reduced-motion users (they just see the final state).
  useLayoutEffect(() => {
    const logo = logoRef.current;
    const navList = navListRef.current;
    const actions = actionsRef.current;
    if (!logo || !actions) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const navItems = navList
          ? gsap.utils.toArray<HTMLElement>(navList.children)
          : [];

        gsap.set(logo, { opacity: 0, y: -8 });
        gsap.set(actions, { opacity: 0, y: -8 });
        if (navItems.length) gsap.set(navItems, { opacity: 0, y: -6 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(logo, { opacity: 1, y: 0, duration: 0.5 });
        if (navItems.length) {
          tl.to(
            navItems,
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
            "-=0.25"
          );
        }
        tl.to(actions, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([logo, actions], { clearProps: "all" });
        if (navList) gsap.set(navList.children, { clearProps: "all" });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full font-poppins transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur border-b border-charcoal/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link
            ref={logoRef}
            href="/"
            className="flex items-baseline gap-2 shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <span className="font-poppins font-medium text-xl tracking-tight text-charcoal">
              {brand.name}
            </span>
          </Link>

          <ul ref={navListRef} className="hidden lg:flex items-center gap-10">
            {mainNav.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 font-poppins text-sm text-charcoal/80 hover:text-gold focus-visible:text-gold transition-colors py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown size={13} strokeWidth={2} />
                  )}
                </Link>

                {item.children && (
                  <ul className="absolute left-0 top-full pt-2 min-w-[240px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <li className="bg-linen-raised border border-charcoal/10 rounded-sm overflow-hidden shadow-[0_12px_24px_-12px_rgba(30,37,43,0.2)]">
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-5 py-3 font-poppins text-sm text-charcoal/80 hover:text-gold hover:bg-ivory focus-visible:text-gold focus-visible:bg-ivory transition-colors focus-visible:outline-none"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div ref={actionsRef} className="flex items-center gap-5">
            {/* Cart placeholder — no cart functionality yet */}
            <button
              type="button"
              aria-label="Cart (placeholder)"
              className="relative text-charcoal/80 hover:text-gold focus-visible:text-gold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-gold text-ivory text-[10px] leading-none">
                0
              </span>
            </button>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-charcoal/80 hover:text-gold focus-visible:text-gold transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
