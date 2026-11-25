import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyMOD from "@/components/home/WhyMOD";
import StorySection from "@/components/home/StorySection";
import WellnessJourney from "@/components/home/WellnessJourney";
import FinalCTA from "@/components/home/FinalCTA";
import CTASection from "@/components/home/CTASection";
import FloatingBottle from "@/components/home/FloatingBottle";

export default function Home() {
  return (
    <>
      {/* Shared positioning context for the Hero -> About bottle travel.
          FloatingBottle is absolutely positioned against this wrapper. */}
      <div className="relative">
        <Hero />
        <BrandIntro />
        <FloatingBottle />
      </div>
      <Categories />
      <FeaturedProducts />
      <WhyMOD />
      <StorySection />
      <WellnessJourney />
      <FinalCTA />
      <CTASection />
    </>
  );
}
