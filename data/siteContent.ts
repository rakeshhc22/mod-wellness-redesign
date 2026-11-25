// All brand copy lives here, separated from UI components, so
// it can be refined later without touching layout code. Facts
// (founding year, location, contact, formulation claims) are
// sourced from modwellness.linker.store — nothing here is invented.

import type { JourneyStep } from "@/types";

export const brand = {
  name: "MOD Wellness",
  legalName: "MOD Wellness And Care LLP",
  tagline: "Discover wellness, naturally.",
  foundedYear: 2021,
};

export const contact = {
  email: "vishal@modwellness.in",
  address: "First Floor, GT Road, Bahalgarh, Sonipat, Haryana - 131021, India",
};

export const hero = {
  kicker: "",
  /** Rendered line by line in Hero.tsx; "No.1" in the first line is
   *  highlighted in the gold accent color. */
  headline: ["India's No.1", "Personal Care", "Manufacturing Brand."],
  subtext:
    "Premium products. Proven science. Trusted by thousands. Crafted with care to elevate your everyday wellness.",
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "Discover MOD", href: "/about" },
  stats: [
    { icon: "users", value: "20+", label: "Happy Customers" },
    { icon: "shield", value: "10+", label: "Years Experience" },
    { icon: "factory", value: "India's No.1", label: "Manufacturing Industry" },
  ],
};

export const brandIntro = {
  kicker: "About MOD",
  heading: "A single window for everyday wellness.",
  body: "MOD Wellness and Care is a premium personal care company built around one idea: looking and feeling good every day shouldn't be complicated. The range spans hair care, skin care, sun care, beauty, cosmetics and wellness, developed through ongoing research and lab-tested before it reaches you.",
  cta: { label: "Learn More", href: "/about" },
};

export const whyMod = {
  kicker: "Why Choose MOD",
  heading: "Formulated with intention.",
  features: [
    {
      id: "f1",
      title: "Lab-Tested Quality",
      description:
        "Every product is manufactured at MOD's own facility and lab-tested before it reaches you.",
    },
    {
      id: "f2",
      title: "Free From Harsh Chemicals",
      description:
        "Formulated without sulphates, parabens or silicones, and free from added toxins.",
    },
    {
      id: "f3",
      title: "Cruelty-Free",
      description: "MOD products are not tested on animals.",
    },
    {
      id: "f4",
      title: "Research-Led",
      description:
        "Ongoing product development means each formula is built to be safe and effective, not just fashionable.",
    },
  ],
};

export const brandStory = {
  kicker: "Thoughtfully Made",
  heading: "Thoughtfully made. Naturally inspired.",
  body: "MOD Wellness and Care was founded on a simple premise: wellness shouldn't require a dozen brands and a cabinet full of guesswork. Every formula is researched and developed in-house, then lab-tested at MOD's own facility in Sonipat before it's considered finished — so what reaches you has already earned its place.",
  image: "/placeholders/placeholder-brand-story.png",
  cta: { label: "Discover Our Approach", href: "/about" },
};

const wellnessJourneySteps: JourneyStep[] = [
  {
    id: "js1",
    number: "01",
    label: "Product Selection",
    title: "Private Label & Product Selection",
    description:
      "Connect with the MOD team and choose from a wide range of ready formulations, or start from scratch. Select the products you want and build a wellness or beauty line under your own brand.",
    image: "/placeholders/placeholder-product-selection.png",
    alt: "Private label wellness and beauty products",
  },
  {
    id: "js2",
    number: "02",
    label: "Manufacturing",
    title: "Manufacturing",
    description:
      "Every formula is produced at MOD's own facility, where lab-tested processes and careful quality control turn your selection into a finished product.",
    image: "/placeholders/placeholder-manufacturing.png",
    alt: "Wellness product manufacturing and production",
  },
  {
    id: "js3",
    number: "03",
    label: "Packaging",
    title: "Packaging",
    description:
      "The right packaging is selected and designed around your brand, protecting the product and presenting it exactly the way it deserves to be seen.",
    image: "/placeholders/placeholder-packaging.png",
    alt: "Wellness product packaging and presentation",
  },
  {
    id: "js4",
    number: "04",
    label: "Product Shipping",
    title: "Product Shipping",
    description:
      "Finished products are carefully prepared and shipped out, closing the loop from a first idea to something that's ready for your shelf.",
    image: "/placeholders/placeholder-shipping.png",
    alt: "Finished wellness products ready for shipping",
  },
];

export const wellnessJourney = {
  kicker: "The MOD Wellness Journey",
  heading: "From product idea to your doorstep.",
  body: "From selecting the right formulation to manufacturing, packaging and delivery, every step is thoughtfully handled to bring your product vision to life.",
  steps: wellnessJourneySteps,
};

export const finalProductCta = {
  kicker: "MOD Wellness",
  heading: "Wellness, made personal.",
  body: "Discover products thoughtfully created to become part of the rituals that make everyday life better.",
  image: "/placeholders/placeholder-final-cta.jpg",
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "Learn More", href: "/about" },
};

export const cta = {
  kicker: "Discover MOD",
  heading: "Wellness designed for everyday life.",
  primaryCta: { label: "Explore Products", href: "/products" },
};

export const aboutPage = {
  heading: "About MOD Wellness",
  brandStory: {
    heading: "Brand Story",
    body: "MOD Wellness and Care LLP was established in 2021 as an innovative, premium personal care company. Operating from Sonipat, Haryana, the company set out to be a single window shop for products spanning skin care, hair care, sun care, beauty, cosmetics and wellness.",
  },
  philosophy: {
    heading: "Our Philosophy",
    body: "MOD's philosophy is rooted in providing world-class quality products that suit each person's needs. That means intensive research during product development, so that every formula is both safe and effective.",
  },
  products: {
    heading: "Our Products",
    body: "The MOD range is anchored by its hair care line — including the Ghrit Kumari (aloe vera) and onion-based hair oils — alongside shampoos, body lotion and foot cream, with a broader catalogue across beauty and personal care.",
  },
  approach: {
    heading: "Our Approach",
    body: "All products are manufactured at MOD's own facility and lab-tested before release. Formulas are free from sulphates, parabens, silicones and other harsh chemicals, use skin-friendly ingredients, and are never tested on animals.",
  },
};

export const productsPage = {
  heading: "Shop MOD Wellness",
  intro:
    "Hair care, skin care and everyday wellness essentials — formulated without sulphates, parabens or silicones.",
};

export const contactPage = {
  heading: "Get in Touch",
  intro: "Questions about MOD Wellness products? Reach out below.",
};

export const footerContent = {
  brandBlurb:
    "MOD Wellness and Care is a premium personal care company spanning hair care, skin care, sun care, beauty, cosmetics and wellness — lab-tested and formulated without sulphates, parabens or silicones.",
};
