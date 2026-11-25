import { Product, Category } from "@/types";

// Product names and the one confirmed price are sourced from
// modwellness.linker.store/beauty-personal-care/essential-oil.
// Items without a confirmed listed price use "Price on request"
// rather than an invented figure.
export const products: Product[] = [
  {
    id: "p4",
    name: "MOD Ghrit Kumari Hair Shampoo",
    category: "Hair Shampoo",
    description: "A Ghrit Kumari (aloe vera) shampoo companion to the hair oil.",
    price: "Price on request",
    slug: "mod-ghrit-kumari-hair-shampoo",
    image: "/products/shampoo.png", // e.g. "/products/ghrit-kumari-shampoo.png"
  },
  {
    id: "p5",
    name: "MOD Daily Moisturizing Body Lotion",
    category: "Serum",
    description: "An everyday moisturizing body lotion from MOD.",
    price: "Price on request",
    slug: "mod-daily-moisturizing-body-lotion",
    image: "/products/serum.png", // e.g. "/products/body-lotion.png"
  },
  {
    id: "p6",
    name: "MOD Foot Cream",
    category: "Foot Cream",
    description: "Formulated for cracked, dry and damaged heels.",
    price: "Price on request",
    slug: "mod-foot-cream",
    image: "/products/cream.png", // e.g. "/products/foot-cream.png"
  },
];

// Broad categories are drawn directly from MOD's own brand
// description: "skin care, hair care, sun care, beauty,
// cosmetics, and wellness."
export const categories: Category[] = [
  {
    id: "c1",
    name: "Hair Care",
    description: "Oils, shampoos and treatments — including the MOD hair oil range.",
    href: "/products?category=hair-care",
    image: "/categories/hair-care.jpeg",
  },
  {
    id: "c2",
    name: "Skin & Personal Care",
    description: "Body lotions, foot creams and everyday skin essentials.",
    href: "/products?category=beauty-personal-care",
    image: "/categories/skin-personal-care.jpeg",
  },
  {
    id: "c3",
    name: "Sun Care",
    description: "Sun care formulations from the wider MOD range.",
    href: "/products?category=sun-care",
    image: "/categories/sun-care.jpeg",
  },
  {
    id: "c4",
    name: "Wellness & Beauty",
    description: "Beauty, cosmetics and wellness essentials for everyday life.",
    href: "/products?category=wellness-beauty",
    image: "/categories/wellness-beauty.jpeg",
  },
];
