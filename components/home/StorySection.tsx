import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { brandStory } from "@/data/siteContent";

export default function StorySection() {
  return (
    <section className="bg-linen-raised border-b border-stone">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <RevealOnScroll
            scale
            direction="none"
            duration={1}
            className="order-2 lg:order-1"
          >
            <ImagePlaceholder
              src={brandStory.image}
              alt="MOD Wellness product and lifestyle imagery"
              className="aspect-[4/3] w-full"
            />
          </RevealOnScroll>

          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <RevealOnScroll direction="right" distance={30} start="top 80%">
              <span className="eyebrow text-brass">{brandStory.kicker}</span>
            </RevealOnScroll>
            <TextReveal
              as="h2"
              start="top 80%"
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-ink max-w-xl"
              lines={[brandStory.heading]}
            />
            <RevealOnScroll start="top 80%" delay={0.1} direction="right" distance={30}>
              <p className="text-base sm:text-lg text-sage leading-relaxed max-w-lg">
                {brandStory.body}
              </p>
            </RevealOnScroll>
            <RevealOnScroll start="top 80%" delay={0.2} direction="right" distance={30}>
              <div className="pt-2">
                <Button href={brandStory.cta.href} variant="ghost">
                  {brandStory.cta.label}
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
