"use client";

import Image from "next/image";
import Link from "next/link";
import { inr } from "@/lib/catalog";
import { useCart } from "@/components/cart/cart-context";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = subtotal > 3500 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            <p className="text-lg">Your bag is empty.</p>
            <Link href="/shop/fashion" className="mt-4 inline-block text-gold hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-medium text-foreground">Shipping address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input placeholder="Full name" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50" />
                  <input placeholder="Phone" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50" />
                  <input placeholder="Address line 1" className="sm:col-span-2 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50" />
                  <input placeholder="City" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50" />
                  <input placeholder="Pincode" className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-medium text-foreground">Payment method</h2>
                <div className="mt-4 space-y-3">
                  {["UPI / QR", "Credit / Debit card", "Net banking", "Cash on delivery"].map((method) => (
                    <label key={method} className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-gold/30">
                      <input type="radio" name="payment" className="accent-gold" />
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

                <button
                  type="button"
                  className="mt-6 w-full rounded-2xl bg-gold py-4 font-display font-semibold text-ink transition-colors hover:bg-gold-soft"
                >
                  Place order
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
