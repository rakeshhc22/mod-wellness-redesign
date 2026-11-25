import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { products } from "@/data/products";
import { brand } from "@/data/siteContent";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: `Product Not Found — ${brand.name}` };
  }

  return {
    title: `${product.name} — ${brand.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
