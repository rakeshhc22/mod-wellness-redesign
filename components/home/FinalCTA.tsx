import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { finalProductCta } from "@/data/siteContent";

export default function FinalCTA() {
  return (
    <section className="border-b border-stone">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealOnScroll
            scale
            direction="none"
            duration={1}
            className="order-2 lg:order-2"
          >
            <ImagePlaceholder
              src={finalProductCta.image}
              alt="MOD Wellness product lineup"
              className="aspect-[4/5] w-full"
            />
          </RevealOnScroll>

          <div className="order-1 lg:order-1 flex flex-col gap-6">
            <RevealOnScroll direction="left" distance={30} start="top 80%">
              <span className="eyebrow text-brass">{finalProductCta.kicker}</span>
            </RevealOnScroll>
            <TextReveal
              as="h2"
              start="top 80%"
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink max-w-lg"
              lines={[finalProductCta.heading]}
            />
            <RevealOnScroll start="top 80%" delay={0.1} direction="left" distance={30}>
              <p className="text-base sm:text-lg text-sage leading-relaxed max-w-md">
                {finalProductCta.body}
              </p>
            </RevealOnScroll>
            <RevealOnScroll start="top 80%" delay={0.2} direction="left" distance={30}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href={finalProductCta.primaryCta.href} variant="primary">
                  {finalProductCta.primaryCta.label}
                </Button>
                <Button
                  href={finalProductCta.secondaryCta.href}
                  variant="secondary"
                >
                  {finalProductCta.secondaryCta.label}
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
