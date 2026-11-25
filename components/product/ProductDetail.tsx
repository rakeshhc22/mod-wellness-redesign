"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Product } from "@/types";
import ProductPlaceholder from "./ProductPlaceholder";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import { brand } from "@/data/siteContent";

interface ProductDetailProps {
  product: Product;
}

// Reuses the brand's own formulation claims (data/siteContent.ts) as
// the product "highlights" list instead of inventing new copy. Kept
// short and generic since individual products don't carry their own
// ingredient/highlight data yet.
const highlights = [
  "Formulated without sulphates, parabens or silicones",
  "Lab-tested at MOD's own facility before release",
  "Never tested on animals",
];

const isPriceKnown = (price: string) =>
  price.trim().toLowerCase() !== "price on request";

export default function ProductDetail({ product }: ProductDetailProps) {
  const hasImage = Boolean(product.image && product.image.trim() !== "");
  const priceKnown = isPriceKnown(product.price);

  return (
    <section>
      <div className="border-b border-stone">
        <div className="mx-auto w-full max-w-8xl px-6 sm:px-10 lg:px-16 py-5">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 font-label text-xs uppercase tracking-[0.12em] text-sage hover:text-moss focus-visible:text-moss transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            <ArrowLeft
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-8xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — product image */}
          <RevealOnScroll trigger="mount" direction="left" distance={30}>
            <div className="group relative aspect-square w-full border border-stone bg-linen-raised overflow-hidden rounded-sm">
              {hasImage ? (
                <Image
                  src={product.image!}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <ProductPlaceholder label={product.name} category={product.category} />
              )}
            </div>
          </RevealOnScroll>

          {/* RIGHT — product info */}
          <RevealOnScroll trigger="mount" direction="right" distance={30} delay={0.1}>
            <div className="flex flex-col gap-6 lg:pt-2">
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-brass">{product.category}</span>
                <h1 className="font-display text-4xl sm:text-5xl leading-[1.02] text-ink">
                  {product.name}
                </h1>
                <span
                  className={`font-label text-base ${
                    priceKnown ? "text-ink" : "italic text-brass"
                  }`}
                >
                  {product.price}
                </span>
              </div>

              <p className="text-base text-sage leading-relaxed max-w-md">
                {product.description}
              </p>

              <div className="border-t border-stone pt-6 flex flex-col gap-3">
                <span className="font-label text-xs uppercase tracking-[0.12em] text-ink/60">
                  Product Details
                </span>
                <ul className="flex flex-col gap-2.5">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-sage">
                      <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-moss" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                {priceKnown ? (
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-moss text-linen border border-moss hover:bg-moss-deep hover:border-moss-deep focus-visible:bg-moss-deep focus-visible:border-moss-deep font-label text-xs uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
                  >
                    Add to Cart
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-moss text-linen border border-moss hover:bg-moss-deep hover:border-moss-deep focus-visible:bg-moss-deep focus-visible:border-moss-deep font-label text-xs uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
                  >
                    Enquire About This Product
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}
                <p className="mt-3 text-xs text-sage/80">
                  Have a question first? Reach the {brand.name} team from the Contact page.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
