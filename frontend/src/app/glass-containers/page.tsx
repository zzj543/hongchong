import Link from "next/link";
import { fetchCategories } from "@/lib/wordpress";
import type { Metadata } from "next";
import ProductList from "@/components/ProductList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Glass Containers — Bottles, Jars & Vases",
  description:
    "Browse our complete range of glass bottles, jars, and vases. Custom OEM available. Flexible MOQ. Located in Tongshan Glass Industrial Park, China.",
};

export default async function ProductsPage() {
  const categories = await fetchCategories(0);

  return (
    <>
      <section className="bg-primary py-16">
        <div className="section-inner">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">Glass Containers</h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl">
            All glass bottles, jars, and vases — custom OEM available, flexible MOQ, sourced from multiple factories in Tongshan Glass Industrial Park.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          {/* Category Navigation */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/glass-containers"
                className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/glass-containers/${cat.slug}`}
                  className="px-4 py-2 border border-border rounded-full text-sm text-text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          )}

          {/* Client-side Products Grid */}
          <ProductList />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-bg-alt">
        <div className="section-inner text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text">
            Can&apos;t find what you need?
          </h2>
          <p className="mt-4 text-text-muted max-w-lg mx-auto">
            We source from multiple factories. If you don&apos;t see your product, send us your requirements and we&apos;ll match the right production line.
          </p>
          <Link href="/request-quote" className="btn-primary mt-6">
            Send Requirements →
          </Link>
        </div>
      </section>
    </>
  );
}
