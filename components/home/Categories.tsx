import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerGroup from "@/lib/animations/StaggerGroup";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section className="border-b border-stone">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          kicker="Shop By Category"
          heading="Everything you need, sorted simply."
          className="mb-14"
        />

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone border border-stone">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative flex flex-col justify-between gap-10 bg-linen p-8 min-h-[280px] overflow-hidden hover:bg-linen-raised transition-colors duration-300"
            >
              {category.image && (
                <>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/45 group-hover:bg-ink/55 transition-colors duration-300" />
                </>
              )}
              <div className="relative flex items-start justify-between">
                <span />
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="text-linen transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div className="relative flex flex-col gap-2">
                <h3 className="font-display text-2xl text-linen">{category.name}</h3>
                <p className="text-sm text-linen/80 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
