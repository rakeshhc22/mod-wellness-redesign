import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import Container from "@/components/layout/Container";
import ProductCard from "@/components/product/ProductCard";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import StaggerGroup from "@/lib/animations/StaggerGroup";
import { products, categories } from "@/data/products";
import { productsPage, brand } from "@/data/siteContent";

export const metadata: Metadata = {
  title: `Shop — ${brand.name}`,
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-stone">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <RevealOnScroll trigger="mount" direction="left" distance={30}>
            <span className="eyebrow text-brass">Shop</span>
          </RevealOnScroll>
          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            className="font-display text-5xl sm:text-6xl leading-[0.98] text-ink mt-4 max-w-2xl"
            lines={[productsPage.heading]}
          />
          <RevealOnScroll trigger="mount" direction="left" distance={30} delay={0.35}>
            <p className="text-base sm:text-lg text-sage leading-relaxed max-w-xl mt-5">
              {productsPage.intro}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          {/* Filter UI placeholder — no real filtering logic yet */}
          <RevealOnScroll
            trigger="mount"
            delay={0.15}
            className="flex flex-wrap items-center gap-3 pb-10 mb-10 border-b border-stone"
          >
            <span className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.12em] text-ink/60 mr-2">
              <SlidersHorizontal size={14} strokeWidth={2} />
              Filter
            </span>
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-moss bg-moss text-linen font-label text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="px-4 py-2 rounded-full border border-stone text-ink/70 hover:border-moss hover:text-moss focus-visible:border-moss focus-visible:text-moss transition-colors font-label text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
              >
                {category.name}
              </button>
            ))}
          </RevealOnScroll>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
