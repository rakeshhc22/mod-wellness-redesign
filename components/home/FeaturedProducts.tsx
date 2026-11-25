import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import RevealOnScroll from "@/lib/animations/RevealOnScroll";
import StaggerGroup from "@/lib/animations/StaggerGroup";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 3);

  return (
    <section className="border-b border-stone">
      <Container className="py-20 sm:py-28">
        <RevealOnScroll className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
          <SectionHeading
            kicker="Featured"
            heading="From the MOD range."
          />
          <Button href="/products" variant="secondary" className="shrink-0">
            View All Products
          </Button>
        </RevealOnScroll>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
