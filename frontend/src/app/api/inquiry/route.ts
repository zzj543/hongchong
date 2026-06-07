import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true, message: "Submitted" });
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.country || !body.company) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Forward to WordPress inquiry endpoint
    const wpUrl = process.env.NEXT_PUBLIC_INQUIRY_API || "http://212.129.239.58/wp-json/inquiry/v1/submit";
    const res = await fetch(wpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        source_url: request.headers.get("referer") || "",
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, message: err.message || "Submission failed" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
