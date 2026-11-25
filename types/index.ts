export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  slug: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  href: string;
  image?: string;
}

export interface FeatureValue {
  id: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface JourneyStep {
  id: string;
  /** Display index, e.g. "01" */
  number: string;
  /** Short label used in the step indicator nav */
  label: string;
  /** Full heading shown in the content panel */
  title: string;
  description: string;
  image: string;
  alt: string;
}
