const WP_API = process.env.NEXT_PUBLIC_WP_API || "http://212.129.239.58/?rest_route=/wp/v2";
const INQUIRY_API = process.env.NEXT_PUBLIC_INQUIRY_API || "http://212.129.239.58/?rest_route=/inquiry/v1/submit";

// Helper: build URL with rest_route format (& for additional params)
function apiUrl(path: string, params?: URLSearchParams): string {
  const sep = WP_API.includes("rest_route=") ? "&" : "?";
  const paramStr = params ? sep + params.toString() : "";
  return `${WP_API}/${path}${paramStr}`;
}

export interface WPProduct {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  yoast_head_json?: {
    title: string;
    description: string;
    og_image?: { url: string }[];
  };
  product_meta?: {
    sku: string;
    material: string;
    capacity: string;
    size: string;
    weight: string;
    mouth_type: string;
    closure: string;
    moq: string;
    lead_time: string;
    customizable: boolean;
    packaging?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
    "wp:term"?: { name: string; slug: string; taxonomy: string }[][];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  yoast_head_json?: { title: string; description: string };
}

export async function fetchProducts(categoryId?: number): Promise<WPProduct[]> {
  const params = new URLSearchParams({ _embed: "true", per_page: "100" });
  if (categoryId) params.set("product_category", String(categoryId));

  const res = await fetch(apiUrl("products", params), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchProduct(slug: string): Promise<WPProduct | null> {
  const params = new URLSearchParams({ slug, _embed: "true" });
  const res = await fetch(apiUrl("products", params), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const products = await res.json();
  return products[0] || null;
}

export async function fetchCategories(parentId?: number): Promise<WPCategory[]> {
  const params = new URLSearchParams({ per_page: "50", orderby: "name", order: "asc" });
  if (parentId !== undefined) params.set("parent", String(parentId));

  const res = await fetch(apiUrl("product-categories", params), {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchPosts(categoryId?: number): Promise<WPProduct[]> {
  const params = new URLSearchParams({ _embed: "true", per_page: "6" });
  if (categoryId) params.set("categories", String(categoryId));

  const res = await fetch(apiUrl("posts", params), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function submitInquiry(data: Record<string, string>): Promise<{ success: boolean; message: string }> {
  const res = await fetch(INQUIRY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export function getImageUrl(product: WPProduct): string {
  return product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
}

export function getProductCategory(product: WPProduct): { name: string; slug: string } | null {
  const terms = product._embedded?.["wp:term"];
  if (!terms) return null;
  for (const group of terms) {
    const cat = group.find((t) => t.taxonomy === "product_category");
    if (cat) return { name: cat.name, slug: cat.slug };
  }
  return null;
}

export function getSeoTitle(product: WPProduct, fallback?: string): string {
  return product.yoast_head_json?.title || product.title?.rendered || fallback || "";
}

export function getSeoDescription(product: WPProduct): string {
  return product.yoast_head_json?.description || "";
}
