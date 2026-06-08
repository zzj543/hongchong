import Link from "next/link";
import { fetchProduct, getImageUrl, getProductCategory, getSeoTitle, getSeoDescription } from "@/lib/wordpress";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ category: string; product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const p = await fetchProduct(slug);
  if (!p) return {};
  return {
    title: getSeoTitle(p, p.title.rendered),
    description: getSeoDescription(p),
    alternates: { canonical: `/glass-containers/${(await params).category}/${slug}` },
    openGraph: { images: [getImageUrl(p)] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { product: slug } = await params;
  const p = await fetchProduct(slug);

  if (!p) {
    return (
      <div className="section-inner py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-text">Product Not Found</h1>
        <p className="mt-4 text-text-muted">This product may have been removed or the URL is incorrect.</p>
        <Link href="/glass-containers" className="btn-primary mt-6">Back to Products</Link>
      </div>
    );
  }

  const meta = p.product_meta;
  const category = getProductCategory(p);

  return (
    <>
      {/* Breadcrumb */}
      <div className="section-inner pt-6 pb-0">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/glass-containers" className="hover:text-accent">Glass Containers</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/glass-containers/${category.slug}`} className="hover:text-accent">{category.name}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-text font-medium truncate">{p.title.rendered}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden">
                <img
                  src={getImageUrl(p)}
                  alt={p.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              {meta?.sku && <p className="text-sm text-text-muted mb-2">SKU: {meta.sku}</p>}
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text">
                {p.title.rendered}
              </h1>

              {/* Key Specs */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {meta?.material && <Spec label="Material" value={meta.material} />}
                {meta?.capacity && <Spec label="Capacity" value={meta.capacity} />}
                {meta?.size && <Spec label="Size" value={meta.size} />}
                {meta?.weight && <Spec label="Weight" value={meta.weight} />}
                {meta?.mouth_type && <Spec label="Mouth Type" value={meta.mouth_type} />}
                {meta?.closure && <Spec label="Closure" value={meta.closure} />}
                {meta?.moq && <Spec label="MOQ" value={meta.moq} />}
                {meta?.lead_time && <Spec label="Lead Time" value={meta.lead_time} />}
              </div>

              {/* Customization */}
              {meta?.customizable && (
                <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="font-semibold text-accent">✓ Customizable</p>
                  <p className="text-sm text-text-muted mt-1">
                    Logo, color, frosting, spray coating, screen printing, labeling, and custom closure options available.
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/request-quote?product=${encodeURIComponent(p.title.rendered)}`} className="btn-primary text-base h-12 px-8">
                  Get Quote
                </Link>
                <Link href="/request-quote" className="btn-secondary text-base h-12 px-8">
                  Request Sample
                </Link>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                No payment required. We&apos;ll reply within 24 business hours.
              </p>
            </div>
          </div>

          {/* Full Description */}
          {p.content?.rendered && (
            <div className="mt-16 max-w-3xl">
              <h2 className="font-heading text-xl font-bold text-text mb-4">Product Details</h2>
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: p.content.rendered }}
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary">
        <div className="section-inner text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white">
            Interested in {p.title.rendered}?
          </h2>
          <p className="mt-4 text-stone-300">
            Send your requirements — we&apos;ll match the best production line for your order.
          </p>
          <Link
            href={`/request-quote?product=${encodeURIComponent(p.title.rendered)}`}
            className="btn-white mt-6 text-base h-12 px-8"
          >
            Get a Quote Now →
          </Link>
        </div>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-bg-alt rounded-lg">
      <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
      <p className="mt-1 font-semibold text-text">{value}</p>
    </div>
  );
}
