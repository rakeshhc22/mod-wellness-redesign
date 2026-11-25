import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import { cta } from "@/data/siteContent";

export default function CTASection() {
  return (
    <section>
      <Container className="py-24 sm:py-32">
        <RevealOnScroll className="flex flex-col items-center text-center gap-6">
          <span className="eyebrow text-brass">{cta.kicker}</span>
          <h2 className="font-display text-4xl sm:text-6xl leading-[1.02] text-ink max-w-3xl">
            {cta.heading}
          </h2>
          <div className="pt-2">
            <Button href={cta.primaryCta.href} variant="primary">
              {cta.primaryCta.label}
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
