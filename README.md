# 🌿 MOD Wellness Redesign

### A polished wellness and personal care storefront concept

A responsive website concept for MOD Wellness, built with Next.js. It pairs a
product catalog and brand story with animated sections, product imagery, and
a calm visual style.

> **Portfolio demo:** This repository presents a storefront concept. It does
> not process purchases or send contact form submissions.

## ✨ Features

- 🧴 Product catalog and individual product detail pages
- 🪴 Brand story, categories, and a wellness journey section
- 🎬 Scroll-driven motion, text reveals, page transitions, and smooth scrolling
- 📱 Responsive navigation and mobile menu
- 💬 A local FAQ chatbot with keyword-based answers
- 🎨 Custom typography, image assets, and reusable UI components

## 🧰 Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 and custom CSS |
| Motion | GSAP and Lenis |
| Icons | Lucide React |
| Fonts | Self-hosted Fraunces, Manrope, IBM Plex Mono, and Poppins |

## 🚀 Run locally

**Prerequisite:** Node.js 20.9 or later.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm run start
```

No environment variables or external services are required to browse this
demo. Product and brand content lives in the `data/` directory.

## 🧭 Pages

| Route | What it shows |
| --- | --- |
| `/` | Animated homepage, brand sections, categories, and featured products |
| `/products` | Product listing |
| `/products/[slug]` | Product details |
| `/about` | Brand story |
| `/contact` | Contact information and demo form |

## 📂 Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Routes, layout, and global styles |
| `components/home/` | Homepage sections and visual storytelling |
| `components/product/` | Product cards and detail views |
| `components/layout/` | Navigation, footer, and shared shell |
| `lib/animations/` | Motion and smooth-scroll helpers |
| `data/` | Product, navigation, and brand content |
| `public/` | Product and category images |

## ⚠️ Demo limitations

The cart button, category filters, and contact form are visual interface
elements without a connected commerce or messaging backend. Some product
prices are shown as **Price on request**. The FAQ chatbot responds from
local predefined answers and does not call an AI service.
