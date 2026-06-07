import ProductGrid from "@/components/ProductGrid";

interface Product {
  id: number;
  slug: string;
  title: { rendered: string };
  product_meta?: { sku: string; material: string; capacity: string; moq: string; customizable: boolean };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
    "wp:term"?: { name: string; slug: string; taxonomy: string }[][];
  };
}

export function getImageUrl(p: Product): string {
  return p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-text-muted text-center py-12">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <a
          key={p.id}
          href={`/glass-containers/${p._embedded?.["wp:term"]?.[0]?.[0]?.slug || "uncategorized"}/${p.slug}`}
          className="product-card group"
        >
          <div className="aspect-[3/4] overflow-hidden bg-stone-100">
            <img
              src={getImageUrl(p)}
              alt={p.title.rendered}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            {p.product_meta?.sku && (
              <span className="text-xs text-text-muted">SKU: {p.product_meta.sku}</span>
            )}
            <h3 className="mt-1 font-heading font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
              {p.title.rendered}
            </h3>
            {(p.product_meta?.capacity || p.product_meta?.material) && (
              <p className="mt-1 text-sm text-text-muted">
                {[p.product_meta.capacity, p.product_meta.material].filter(Boolean).join(" · ")}
              </p>
            )}
            {p.product_meta?.customizable && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium">
                Customizable
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
