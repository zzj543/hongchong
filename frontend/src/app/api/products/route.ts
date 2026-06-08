import { NextRequest, NextResponse } from "next/server";

const WP_API = process.env.WP_API_URL || "http://127.0.0.1:8080/?rest_route=/wp/v2";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params = new URLSearchParams();

  // Forward relevant params
  const allowed = ["per_page", "page", "_embed", "slug", "product_category", "categories"];
  for (const key of allowed) {
    const val = searchParams.get(key);
    if (val) params.set(key, val);
  }

  const resp = await fetch(`${WP_API}/products&${params.toString()}`, {
    cache: "no-store",
  });

  const data = await resp.json();
  return NextResponse.json(data, {
    headers: {
      "X-WP-Total": resp.headers.get("X-WP-Total") || "0",
      "X-WP-TotalPages": resp.headers.get("X-WP-TotalPages") || "0",
    },
  });
}
