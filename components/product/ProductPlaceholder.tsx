import BottleMotif from "@/components/ui/BottleMotif";

interface ProductPlaceholderProps {
  label: string;
  category?: string;
}

/**
 * Aspect-ratio locked placeholder standing in for a real product
 * photo. Swap the inner content for an <Image> once product
 * photography exists — the surrounding card layout won't change.
 */
export default function ProductPlaceholder({ label, category }: ProductPlaceholderProps) {
  return (
    <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-linen border-b border-stone overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          }}
        />
      </div>
      <BottleMotif className="w-10 sm:w-12 h-auto text-moss/50 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]" />
      <span className="absolute bottom-3 left-4 right-4 eyebrow text-ink/40 truncate text-center">
        {category ?? "Product Image Placeholder"}
      </span>
      <span className="sr-only">{label} — image placeholder</span>
    </div>
  );
}
