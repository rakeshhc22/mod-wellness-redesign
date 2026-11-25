import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { brandIntro } from "@/data/siteContent";

export default function BrandIntro() {
  return (
    <section className="border-b border-stone">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 relative">
            <RevealOnScroll direction="left" distance={30} start="top 80%">
              <span className="eyebrow text-brass">{brandIntro.kicker}</span>
            </RevealOnScroll>
            {/* Invisible anchor marking where the scroll-travel bottle
                (see FloatingBottle.tsx) settles into the empty space
                below the kicker. Renders nothing — position/size only. */}
            <div
              id="about-bottle-target"
              aria-hidden
              className="hidden lg:block absolute bottom-2 left-0 w-44 h-44 pointer-events-none"
            />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6">
            <TextReveal
              as="h2"
              start="top 80%"
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-ink max-w-2xl"
              lines={[brandIntro.heading]}
            />
            <RevealOnScroll start="top 80%" delay={0.1}>
              <p className="text-base sm:text-lg text-sage leading-relaxed max-w-2xl">
                {brandIntro.body}
              </p>
            </RevealOnScroll>
            <RevealOnScroll start="top 80%" delay={0.2}>
              <div className="pt-2">
                <Button href={brandIntro.cta.href} variant="ghost">
                  {brandIntro.cta.label}
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
