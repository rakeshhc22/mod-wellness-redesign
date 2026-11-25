import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import ProductPlaceholder from "./ProductPlaceholder";

interface ProductCardProps {
  product: Product;
}

const isPriceKnown = (price: string) =>
  price.trim().toLowerCase() !== "price on request";

export default function ProductCard({ product }: ProductCardProps) {
  const hasImage = Boolean(product.image && product.image.trim() !== "");
  const priceKnown = isPriceKnown(product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-stone bg-linen-raised hover:border-moss/60 focus-visible:border-moss/60 transition-colors duration-300 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
    >
      {hasImage ? (
        <div className="relative aspect-[4/3] w-full bg-linen border-b border-stone overflow-hidden">
          <Image
            src={product.image!}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <ProductPlaceholder label={product.name} category={product.category} />
      )}

      <div className="flex flex-col gap-2 p-5 sm:p-6 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        <span className="eyebrow text-brass">{product.category}</span>
        <h3 className="font-display text-lg sm:text-xl text-ink leading-snug">
          {product.name}
        </h3>
        {/* text-ink rather than text-sage here: this card sits on
            bg-linen-raised, where sage's contrast reads too faint. */}
        <p className="text-sm text-ink/75 leading-relaxed line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone">
          {priceKnown ? (
            <span className="font-label text-sm text-ink">{product.price}</span>
          ) : (
            <span className="font-label text-sm italic text-brass">
              {product.price}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-label text-xs uppercase tracking-[0.12em] text-moss group-hover:text-moss-deep transition-colors">
            {priceKnown ? "View Product" : "Enquire"}
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
