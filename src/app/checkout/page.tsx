"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { inr } from "@/lib/catalog";
import { useCart } from "@/components/cart/cart-context";
import { useOrders } from "@/components/orders/order-context";
import { Marquee } from "@/components/ui/marquee";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const shipping = subtotal > 3500 ? 0 : 150;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI / QR",
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.pincode.trim()) {
      setFormError("Please fill in all shipping details.");
      return;
    }
    if (form.phone.trim().length < 10) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder(items, shipping);
      clearCart();
      router.push(`/order/${order.id}`);
    }, 700);
  }

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Checkout
          </h1>
        </motion.div>

        <div className="my-8 border-y border-border/50 bg-card/40 py-2.5">
          <Marquee speed={30} className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {["Secure Checkout", "Free Shipping over ₹3,500", "7 Day Returns", "Verified Sellers", "RIKAMCHOT"].map((w) => (
              <span key={w} className="inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {w}
              </span>
            ))}
          </Marquee>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            <p className="text-lg">Your bag is empty.</p>
            <Link href="/shop/fashion" className="mt-4 inline-block text-gold hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="mt-10 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-medium text-foreground">Shipping address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <input
                    placeholder="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <input
                    placeholder="Address line 1"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    className="sm:col-span-2 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <input
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <input
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-medium text-foreground">Payment method</h2>
                <div className="mt-4 space-y-3">
                  {["UPI / QR", "Credit / Debit card", "Net banking", "Cash on delivery"].map((method) => (
                    <label
                      key={method}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                        form.payment === method ? "border-gold bg-gold/5" : "border-border hover:border-gold/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={form.payment === method}
                        onChange={(e) => handleChange("payment", e.target.value)}
                        className="accent-gold"
                      />
                      <span className="text-sm text-foreground">{method}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-medium text-foreground">Order summary</h2>
                <ul className="mt-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized={item.image.startsWith("/")}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.color} · Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {inr(item.price * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{inr(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
                  </div>
                  <div className="flex justify-between pt-2 font-display text-lg font-semibold text-foreground">
                    <span>Total</span>
                    <span>{inr(total)}</span>
                  </div>
                </div>

                {formError && (
                  <p className="mt-4 text-sm text-red-500">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-2xl bg-gold py-4 font-display font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
                >
                  {isSubmitting ? "Placing order…" : "Place order"}
                </button>
              </section>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
