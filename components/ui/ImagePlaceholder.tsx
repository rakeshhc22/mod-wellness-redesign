import Image from "next/image";

interface ImagePlaceholderProps {
  /** Path under /public, e.g. "/placeholders/placeholder-hair-scalp-care.svg" */
  src: string;
  /** Descriptive alt text for the final image this will be swapped for. */
  alt: string;
  /** Small caption shown over the image (e.g. category name). Purely visual. */
  label?: string;
  className?: string;
  /** Extra classes applied directly to the <Image> (e.g. a hover-scale transition). */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Real-image placeholder for content sections that don't have final
 * photography yet. Renders an actual <Image> (compiles to a real
 * <img>) pointing at a lightweight local placeholder graphic under
 * /public/placeholders — never a fake stock photo, never a broken
 * src. Swapping in final photography later is a one-line change:
 * update the `src` passed in from the parent section.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`group relative border border-stone bg-linen-raised overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Placeholder graphics are local SVGs — Next's image optimizer
        // doesn't process SVGs without extra next.config setup, so this
        // is left unoptimized rather than touching global config for a
        // temporary asset. Swapping in a real raster photo later can
        // drop this prop.
        unoptimized
        // Same tasteful hover-scale language used on ProductCard's
        // image (group-hover:scale-105), so every image across the
        // site — story imagery, journey steps, final CTA — responds
        // to hover consistently.
        className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${imgClassName}`}
      />
      {label && (
        <span className="absolute bottom-4 left-4 right-4 eyebrow text-ink/40 truncate">
          {label}
        </span>
      )}
    </div>
  );
}
