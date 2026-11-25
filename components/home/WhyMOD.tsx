import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGroup from "@/lib/animations/StaggerGroup";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import { whyMod } from "@/data/siteContent";

export default function WhyMOD() {
  return (
    <section className="bg-moss text-linen border-b border-stone">
      <Container className="py-20 sm:py-28">
        <RevealOnScroll>
          <SectionHeading
            kicker={whyMod.kicker}
            heading={whyMod.heading}
            invert
            className="mb-14"
          />
        </RevealOnScroll>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {whyMod.features.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-3 border-t border-linen/20 pt-6">
              <h3 className="font-display text-xl text-linen">{feature.title}</h3>
              <p className="text-sm text-linen/90 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
