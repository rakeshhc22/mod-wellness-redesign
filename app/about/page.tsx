import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Placeholder from "@/components/ui/Placeholder";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { aboutPage, brand } from "@/data/siteContent";

export const metadata: Metadata = {
  title: `About Us — ${brand.name}`,
};

const sections = [
  aboutPage.brandStory,
  aboutPage.philosophy,
  aboutPage.products,
  aboutPage.approach,
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-stone">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <RevealOnScroll trigger="mount" direction="left" distance={30}>
            <span className="eyebrow text-brass">Since {brand.foundedYear}</span>
          </RevealOnScroll>
          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-ink mt-4 max-w-3xl"
            lines={[aboutPage.heading]}
          />
        </Container>
      </section>

      <section className="border-b border-stone">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealOnScroll scale direction="none" duration={1}>
              <Placeholder
                label="Brand Image Placeholder"
                sublabel="Manufacturing facility, Sonipat"
                className="aspect-[4/3] w-full"
              />
            </RevealOnScroll>
            <div className="flex flex-col gap-8">
              {sections.slice(0, 2).map((section, i) => (
                <RevealOnScroll
                  key={section.heading}
                  direction="right"
                  delay={i * 0.12}
                  className="flex flex-col gap-3"
                >
                  <h2 className="font-display text-2xl sm:text-3xl text-ink">
                    {section.heading}
                  </h2>
                  <p className="text-base text-sage leading-relaxed">
                    {section.body}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-stone">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              {sections.slice(2, 4).map((section, i) => (
                <RevealOnScroll
                  key={section.heading}
                  direction="left"
                  delay={i * 0.12}
                  className="flex flex-col gap-3"
                >
                  <h2 className="font-display text-2xl sm:text-3xl text-ink">
                    {section.heading}
                  </h2>
                  <p className="text-base text-sage leading-relaxed">
                    {section.body}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
            <RevealOnScroll
              scale
              direction="none"
              duration={1}
              className="order-1 lg:order-2"
            >
              <Placeholder
                label="Ingredient Placeholder"
                sublabel="Formulation & sourcing"
                className="aspect-[4/3] w-full"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-28">
          <RevealOnScroll className="flex flex-col items-center text-center gap-6">
            <h2 className="font-display text-3xl sm:text-4xl text-ink max-w-xl">
              Explore the full MOD range.
            </h2>
            <Button href="/products" variant="primary">
              Shop Products
            </Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
