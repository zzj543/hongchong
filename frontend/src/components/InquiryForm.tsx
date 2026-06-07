"use client";

import { useState } from "react";

export default function InquiryForm({ prefilledProduct }: { prefilledProduct?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    form.forEach((v, k) => { data[k] = v.toString(); });

    // Honeypot check
    if (data.website) {
      setSubmitting(false);
      return; // Silently ignore spam
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
      } else {
        setError(json.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    }
    setSubmitting(false);
  }

  if (success) {
    return (
      <div className="bg-success/10 border border-success/30 rounded-xl p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-heading text-2xl font-bold text-text">Thank You!</h2>
        <p className="mt-4 text-text-muted max-w-md mx-auto">
          Your inquiry has been received. We will review your requirements and reply within{" "}
          <strong>24 business hours</strong>. In the meantime, feel free to browse our product catalog.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          For urgent inquiries, contact us directly via email or WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from humans */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Name *</label>
          <input name="name" required className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Company *</label>
          <input name="company" required className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Email *</label>
          <input name="email" type="email" required className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Phone / WhatsApp</label>
          <input name="phone" className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" />
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-text mb-1">Country *</label>
        <select name="country" required className="w-full h-11 px-4 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent/50">
          <option value="">Select country...</option>
          <option>United States</option><option>United Kingdom</option><option>Germany</option>
          <option>France</option><option>Canada</option><option>Australia</option>
          <option>Netherlands</option><option>Spain</option><option>Italy</option>
          <option>Japan</option><option>South Korea</option><option>Other</option>
        </select>
      </div>

      {/* Interested Products */}
      <div>
        <label className="block text-sm font-medium text-text mb-1">Interested Products</label>
        <input
          name="products"
          defaultValue={prefilledProduct || ""}
          className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder="e.g., 500ml clear glass beverage bottles"
        />
      </div>

      {/* Quantity + Target Market */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Estimated Quantity</label>
          <input name="quantity" className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g., 10,000 pcs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Target Market</label>
          <input name="target_market" className="w-full h-11 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g., US, EU" />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text mb-1">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y"
          placeholder="Describe your requirements: product type, material, capacity, customization needs, packaging preferences, etc."
        />
      </div>

      {/* Error */}
      {error && <p className="text-error text-sm">{error}</p>}

      {/* Submit */}
      <button type="submit" disabled={submitting} className="btn-primary text-base h-12 px-8 w-full sm:w-auto">
        {submitting ? "Sending..." : "Submit Inquiry →"}
      </button>
      <p className="text-xs text-text-muted">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
