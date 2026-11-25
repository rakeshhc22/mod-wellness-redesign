import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import BottleMotif from "@/components/ui/BottleMotif";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";

export default function ProductNotFound() {
  return (
    <section>
      <Container className="py-24 sm:py-32 text-center flex flex-col items-center gap-5">
        <RevealOnScroll trigger="mount" scale className="flex flex-col items-center gap-5">
          <BottleMotif className="w-14 h-auto text-moss/40 mb-1" />
          <span className="eyebrow text-brass">404</span>
          <h1 className="font-display text-4xl sm:text-5xl text-ink">
            We couldn&apos;t find that product
          </h1>
          <p className="text-base text-ink/75 leading-relaxed max-w-md">
            It may have been moved or is no longer available. Browse the full
            range from the shop instead.
          </p>
          <Button href="/products" variant="primary" className="mt-2">
            Back to Shop
          </Button>
          <Link
            href="/"
            className="font-label text-xs uppercase tracking-[0.12em] text-sage hover:text-moss focus-visible:text-moss transition-colors mt-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50 focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            Return Home
          </Link>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
