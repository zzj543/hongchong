"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_media: number;
  product_meta?: {
    sku?: string;
    material?: string;
    capacity?: string;
    customizable?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
    "wp:term"?: { name: string; slug: string; taxonomy: string }[][];
  };
}

function getImage(p: Product) {
  return p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
}

function getCategory(p: Product) {
  const terms = p._embedded?.["wp:term"];
  if (!terms) return "uncategorized";
  for (const group of terms) {
    const cat = group.find((t) => t.taxonomy === "product_category");
    if (cat) return cat.slug;
  }
  return "uncategorized";
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_WP_API || "http://212.129.239.58/?rest_route=/wp/v2";
    fetch(`${apiUrl}/products&_embed=true&per_page=24&_t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-text-muted text-center py-12">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-text-muted text-center py-12">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/glass-containers/${getCategory(p)}/${p.slug}`}
          className="bg-white border border-border rounded-lg overflow-hidden hover:border-accent/30 transition-colors group"
        >
          <div className="aspect-[3/4] overflow-hidden bg-stone-100">
            <img
              src={getImage(p)}
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
        </Link>
      ))}
    </div>
  );
}
