import { NavLink, SocialLink } from "@/types";

// Mirrors the existing modwellness.linker.store structure:
// Home / About Us / All / Beauty & Personal Care > Essential Oil / Contact us
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  {
    label: "Categories",
    href: "/products",
    children: [
      { label: "Beauty & Personal Care", href: "/products?category=beauty-personal-care" },
      { label: "Essential Oil", href: "/products?category=essential-oil" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// No verified social profiles were listed on the existing
// MOD Wellness storefront, so this stays empty rather than
// inventing links. Populate here once confirmed.
export const socialLinks: SocialLink[] = [];
