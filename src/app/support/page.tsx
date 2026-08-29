const faqs = [
  { q: "How long does delivery take?", a: "Most orders are delivered within 3–5 business days." },
  { q: "Can I return a product?", a: "Yes, we offer easy 7-day returns on most items." },
  { q: "Do you ship internationally?", a: "Currently we ship across India." },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Help Center
        </h1>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-border bg-card p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                {faq.q}
                <span className="text-gold group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
