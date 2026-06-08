import Link from "next/link";
import { fetchProducts, fetchCategories, getImageUrl, getProductCategory } from "@/lib/wordpress";
import ProductGrid from "@/components/ProductGrid";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | HongChong Glass`,
    description: `Wholesale ${category.replace(/-/g, " ")} — custom OEM, flexible MOQ. Sourced from Tongshan Glass Industrial Park, China.`,
    alternates: { canonical: `/glass-containers/${category}` },
  };
}

export const dynamicParams = true;

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = await fetchCategories(0);
  const currentCat = categories.find((c) => c.slug === category);
  const subCats = categories.filter((c) => c.parent === currentCat?.id);
  const products = await fetchProducts(currentCat?.id);

  return (
    <>
      <section className="bg-primary py-16">
        <div className="section-inner">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/glass-containers" className="hover:text-white transition-colors">Glass Containers</Link>
            <span>/</span>
            <span className="text-white">{currentCat?.name || category}</span>
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">
            {currentCat?.name || category.replace(/-/g, " ")}
          </h1>
          {currentCat?.description && (
            <p className="mt-4 text-stone-300 max-w-2xl" dangerouslySetInnerHTML={{ __html: currentCat.description }} />
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          {/* Sub-categories */}
          {subCats.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href={`/glass-containers/${category}`}
                className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium"
              >
                All {currentCat?.name}
              </Link>
              {subCats.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/glass-containers/${sub.slug}`}
                  className="px-4 py-2 border border-border rounded-full text-sm text-text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}

          <ProductGrid products={products} />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-bg-alt">
        <div className="section-inner text-center">
          <h2 className="font-heading text-2xl font-bold text-text">Need custom specifications?</h2>
          <p className="mt-4 text-text-muted max-w-lg mx-auto">
            We&apos;ll match your requirements to the right production line in the park.
          </p>
          <Link href="/request-quote" className="btn-primary mt-6">Get a Quote →</Link>
        </div>
      </section>
    </>
  );
}
