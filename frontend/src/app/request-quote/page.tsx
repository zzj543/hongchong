import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Request a Quote — Get Glass Container Pricing",
  description:
    "Send your glass container requirements. Flexible MOQ, custom OEM, competitive pricing. We reply within 24 hours. Located in Tongshan Glass Industrial Park, China.",
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <section className="bg-primary py-16">
        <div className="section-inner">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">Request a Quote</h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl">
            Tell us what you need. We&apos;ll match your requirements to the right production line in the park and get back to you within 24 business hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="max-w-2xl mx-auto">
            <InquiryForm prefilledProduct={product} />
          </div>
        </div>
      </section>
    </>
  );
}
