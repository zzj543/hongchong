import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Bottles & Jars Supplier — Custom OEM | HongChong Glass",
  description:
    "Professional glass container sourcing partner in China's Tongshan Glass Industrial Park. Glass bottles, jars, vases — custom OEM, flexible MOQ, one-stop service.",
};

const mainCategories = [
  {
    name: "Glass Bottles",
    slug: "glass-bottles",
    description: "Beverage, milk, oil, sauce, liquor, swing bottles & more",
    items: ["Beverage Bottles", "Milk Bottles", "Oil Bottles", "Sauce Bottles", "Liquor & Spirit Bottles"],
  },
  {
    name: "Glass Jars",
    slug: "glass-jars",
    description: "Mason jars, candle jars, food storage, honey, spice jars & more",
    items: ["Mason Jars", "Candle Jars", "Food Storage Jars", "Honey Jars", "Spice Jars"],
  },
  {
    name: "Glass Vases",
    slug: "glass-vases",
    description: "Decorative, clear, colored, wedding & custom glass vases",
    items: ["Decorative Vases", "Clear Vases", "Colored Vases", "Wedding Vases", "Custom Vases"],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative section-inner py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-accent-light text-sm font-semibold uppercase tracking-wider mb-4">
              Located in Tongshan Glass Industrial Park, Xuzhou, China
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Your Trusted Glass Container{" "}
              <span className="text-accent-light">Sourcing Partner</span>
            </h1>
            <p className="mt-6 text-lg text-stone-300 leading-relaxed max-w-2xl">
              Not a single factory — we&apos;re your sourcing partner in China&apos;s largest glass manufacturing hub.
              Access multiple production lines across the industrial park, wider product range, flexible MOQ,
              and strict QC that single factories can&apos;t match.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/glass-containers" className="btn-primary text-base h-12 px-8">
                Browse Products
              </Link>
              <Link href="/request-quote" className="btn-white text-base h-12 px-8">
                Request a Quote
              </Link>
            </div>
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-8 text-stone-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-light" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Strict Quality Control
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-light" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Flexible MOQ
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-light" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                One-Stop Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section">
        <div className="section-inner">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text">Our Glass Containers</h2>
            <p className="mt-4 text-lg text-text-muted">
              Three main product lines covering bottles, jars, and vases — with full customization available across all categories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/glass-containers/${cat.slug}`}
                className="group p-8 bg-white border border-border rounded-xl hover:border-accent/40 hover:shadow-md transition-all"
              >
                <h3 className="font-heading text-xl font-bold text-text group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-text-muted">{cat.description}</p>
                <ul className="mt-4 space-y-1 text-sm text-text-muted">
                  {cat.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <span className="inline-block mt-5 text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                  View All →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us — Industrial Park Advantage */}
      <section className="section bg-bg-alt">
        <div className="section-inner">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text">
              Why Source Through Us?
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              We&apos;re not a factory. We&apos;re better than being tied to one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Industrial Park Location",
                desc: "Our office is inside Tongshan Glass Industrial Park — China's glass manufacturing heartland. We can walk to multiple factories in minutes, not days.",
              },
              {
                title: "Multi-Factory Flexibility",
                desc: "A single factory has 2-3 production lines. We access dozens across the park. Your product gets matched to the right line, every time.",
              },
              {
                title: "Better Pricing",
                desc: "Competition among our partner factories means competitive pricing. We negotiate on your behalf — you get factory-direct pricing without being locked to one supplier.",
              },
              {
                title: "Strict QC Process",
                desc: "As a trading company, quality is our reputation. Every order goes through sample confirmation, inline inspection, and pre-shipment check — more attention than factory self-inspection.",
              },
              {
                title: "Flexible MOQ",
                desc: "Large factories reject small orders. Our partner network lets us combine smaller orders across clients, making MOQs work for startups and test orders.",
              },
              {
                title: "One Window, Everything",
                desc: "Product + decoration + packaging + logistics. You deal with one person who speaks your language. We handle the complexity on the China side.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <h3 className="font-heading font-bold text-text text-lg">{item.title}</h3>
                <p className="mt-2 text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary">
        <div className="section-inner text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
            Ready to Source Glass Containers?
          </h2>
          <p className="mt-4 text-lg text-stone-300 max-w-xl mx-auto">
            Tell us what you need. We&apos;ll match you with the right production line in the park.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/request-quote" className="btn-white text-base h-12 px-8">
              Get a Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
