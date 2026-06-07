import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Sourcing Partner in China's Glass Industrial Park",
  description:
    "Xuzhou HongChong International Trading Co., Ltd. — Your glass container sourcing partner in Tongshan Glass Industrial Park, Xuzhou, Jiangsu, China. Multi-factory access, strict QC, one-stop service.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="section-inner">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl">
            Your sourcing partner in China&apos;s largest glass manufacturing hub — not tied to one factory, not limited by one production line.
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section">
        <div className="section-inner">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text">Company Overview</h2>
            <p className="mt-6 text-text-muted leading-relaxed">
              <strong>Xuzhou HongChong International Trading Co., Ltd.</strong> is a professional glass container
              sourcing company established in 2026, headquartered in the{" "}
              <strong>Tongshan Glass Industrial Park</strong> in Xuzhou, Jiangsu Province — one of China&apos;s
              largest and most concentrated glass manufacturing regions.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              Unlike single-factory websites that can only offer their own production lines, we leverage our
              strategic location within the industrial park to connect overseas buyers with the{" "}
              <strong>right factory for each specific product and order</strong>. This means wider product
              coverage, more competitive pricing, and production flexibility that individual factories cannot match.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              We may be a young company, but our team brings deep industry knowledge, quick response times,
              and a genuine commitment to every client — whether you need 500 pieces or 50,000.
            </p>
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="section bg-bg-alt">
        <div className="section-inner">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text text-center mb-12">
            Why HongChong Glass?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "🏭 Industrial Park Location",
                desc: "Our office is located inside the Tongshan Glass Industrial Park. We can inspect production lines, check samples, and resolve issues within hours — not days or weeks.",
              },
              {
                title: "🔗 Multi-Factory Network",
                desc: "Access to dozens of specialized production lines across the park. One factory excels at beverage bottles, another at candle jars. We match your product to the best line.",
              },
              {
                title: "🔍 Quality Control",
                desc: "Three-stage QC: sample confirmation → inline production inspection → pre-shipment random check. As a trading company, quality is the foundation of our reputation.",
              },
              {
                title: "📦 One-Stop Service",
                desc: "Product sourcing → decoration (screen printing, frosting, spray coating) → packaging design → container loading → shipping. One contact, end-to-end.",
              },
              {
                title: "💬 Responsive Communication",
                desc: "English-speaking team. 24-hour email response. WeChat/WhatsApp for urgent matters. No waiting days for a factory salesperson who doesn't understand your market.",
              },
              {
                title: "🌍 Global Shipping Experience",
                desc: "Familiar with US, EU, Southeast Asian, and Middle Eastern markets. We handle export documentation, customs requirements, and shipping logistics.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-heading font-bold text-text">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Location */}
      <section className="section">
        <div className="section-inner">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-text">Our Location</h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              <strong>Address:</strong> Tongshan Glass Industrial Park, Xuzhou, Jiangsu Province, China
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              The Tongshan Glass Industrial Park is one of China&apos;s largest glass container manufacturing clusters,
              home to hundreds of specialized factories producing everything from pharmaceutical vials to large-format
              beverage bottles. Being located here gives us unmatched access to production capacity, technical expertise,
              and competitive pricing.
            </p>
            <p className="mt-4 text-text-muted leading-relaxed">
              <strong>Visitors welcome.</strong> If you&apos;re traveling to China for sourcing, we&apos;d be happy to
              host you at our office and arrange factory visits within the park.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary">
        <div className="section-inner text-center">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white">
            Work With Us
          </h2>
          <p className="mt-4 text-stone-300 max-w-lg mx-auto">
            Send your requirements. We&apos;ll match you with the right production capacity — fast, transparent, and at competitive pricing.
          </p>
          <Link href="/request-quote" className="btn-white mt-6 text-base h-12 px-8">
            Get a Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
