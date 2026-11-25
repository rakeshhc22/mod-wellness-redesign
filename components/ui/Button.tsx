import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "luxOutline";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  /** Label font. Defaults to the site-wide tracked mono label font;
   *  the premium Hero passes "poppins" to match its typography. */
  font?: "label" | "poppins";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-moss text-linen hover:bg-moss-deep focus-visible:bg-moss-deep border border-moss hover:border-moss-deep focus-visible:border-moss-deep focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen",
  secondary:
    "bg-transparent text-ink border border-ink/70 hover:border-ink hover:bg-ink hover:text-linen focus-visible:border-ink focus-visible:bg-ink focus-visible:text-linen focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-linen",
  ghost:
    "bg-transparent text-moss border border-transparent hover:text-moss-deep focus-visible:text-moss-deep px-0 focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen rounded-sm",
  /* Premium hero primary CTA — solid charcoal, used only in the
     redesigned Hero (see components/home/Hero.tsx). */
  dark: "bg-charcoal text-ivory border border-charcoal hover:bg-[#141a1f] hover:border-[#141a1f] focus-visible:bg-[#141a1f] focus-visible:border-[#141a1f] focus-visible:ring-2 focus-visible:ring-charcoal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
  /* Premium hero secondary CTA — transparent with a thin border that
     warms to gold on hover. */
  luxOutline:
    "bg-transparent text-charcoal border border-charcoal/25 hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
};

/**
 * Shared call-to-action button. Keep every CTA in the site
 * routed through this component so future style changes (e.g.
 * once real product imagery lands) only need to happen once.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className = "",
  font = "label",
}: ButtonProps) {
  const isGhost = variant === "ghost";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 ${
        isGhost ? "" : "px-7 py-3.5 rounded-sm"
      } ${font === "poppins" ? "font-poppins" : "font-label"} text-xs uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none ${variantStyles[variant]} ${className}`}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          size={15}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
