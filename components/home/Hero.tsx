import Image from "next/image";
import { Fragment } from "react";
import { Users, ShieldCheck, Factory, type LucideIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import HeroBottle from "@/components/home/HeroBottle";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import TextReveal from "@/lib/animations/TextReveal";
import { hero } from "@/data/siteContent";

const statIcons: Record<string, LucideIcon> = {
  users: Users,
  shield: ShieldCheck,
  factory: Factory,
};

export default function Hero() {
  return (
    <section className="relative border-b border-stone overflow-hidden hero-luxury-bg">
      <Container className="hero-fit grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:py-8 min-h-[88vh] lg:min-h-0">
        <div className="flex flex-col gap-8 lg:gap-5 max-w-xl font-poppins">
          <RevealOnScroll
            trigger="mount"
            direction="left"
            distance={40}
            duration={0.7}
          >
            <span className="font-poppins font-medium text-xs uppercase tracking-[0.28em] text-gold">
              {hero.kicker}
            </span>
          </RevealOnScroll>

          <div>
            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.12}
              stagger={0.12}
              className="hero-heading-fluid font-poppins font-bold text-5xl sm:text-6xl leading-[1.05] tracking-tight text-charcoal"
              lines={hero.headline.map((line, i) => (
                <Fragment key={`${line}-${i}`}>
                  {i === 0 ? (
                    <>
                      {line.split("No.1")[0]}
                      <span className="text-gold">No.1</span>
                      {line.split("No.1")[1]}
                    </>
                  ) : (
                    line
                  )}
                </Fragment>
              ))}
            />

            <RevealOnScroll
              trigger="mount"
              direction="left"
              distance={20}
              duration={0.6}
              delay={0.55}
            >
              <div className="w-16 h-px bg-gold mt-6 lg:mt-4" aria-hidden />
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            trigger="mount"
            direction="left"
            distance={40}
            duration={0.7}
            delay={0.62}
          >
            <p className="font-poppins text-base sm:text-lg lg:text-base text-charcoal/60 leading-relaxed max-w-md">
              {hero.subtext}
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            trigger="mount"
            direction="left"
            distance={30}
            duration={0.7}
            delay={0.74}
          >
            <div className="flex items-stretch gap-6 sm:gap-8 py-2 lg:py-0">
              {hero.stats.map((stat, i) => {
                const Icon = statIcons[stat.icon];
                return (
                  <div
                    key={stat.label}
                    className={`flex items-start gap-3 ${i > 0 ? "pl-6 sm:pl-8 border-l border-charcoal/15" : ""
                      }`}
                  >


                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            trigger="mount"
            direction="left"
            distance={30}
            duration={0.7}
            delay={0.86}
          >
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href={hero.primaryCta.href}
                variant="dark"
                font="poppins"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="luxOutline"
                font="poppins"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        <div
          id="hero-bottle-zone"
          className="relative flex items-center justify-center h-[420px] sm:h-[540px] hero-zone-fluid animate-hero-bottle-in"
        >

          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] sm:w-[88%] lg:w-[84%] h-[50%] sm:h-[48%] pointer-events-none"
          >
            <Image
              src="/Images/Stone.png"
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
          </div>

          {/* Ambient contact shadow grounding the whole composition */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-8 rounded-full bg-charcoal/15 blur-2xl pointer-events-none"
          />

          <HeroBottle />
        </div>
      </Container>
    </section>
  );
}
