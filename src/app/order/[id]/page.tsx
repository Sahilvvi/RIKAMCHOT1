"use client";

import { use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { inr } from "@/lib/catalog";
import { useHasMounted } from "@/lib/hooks/use-mounted";
import { useOrders, type OrderStatus } from "@/components/orders/order-context";

const steps: { label: string; icon: typeof ShoppingBag; status: OrderStatus }[] = [
  { label: "Order confirmed", icon: ShoppingBag, status: "confirmed" },
  { label: "Processing", icon: Package, status: "processing" },
  { label: "Shipped", icon: Truck, status: "shipped" },
  { label: "Out for delivery", icon: Truck, status: "out-for-delivery" },
  { label: "Delivered", icon: Home, status: "delivered" },
];

const statusRank: Record<OrderStatus, number> = {
  confirmed: 0,
  processing: 1,
  shipped: 2,
  "out-for-delivery": 3,
  delivered: 4,
};

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const mounted = useHasMounted();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!mounted || !order) {
    return (
      <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
          <div className="mt-10 h-32 animate-pulse rounded-2xl bg-muted" />
          <div className="mt-10 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const currentRank = statusRank[order.status] ?? 0;

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Order tracking
        </h1>
        <p className="mt-2 text-muted-foreground">Order ID — {order.id.toUpperCase()}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="font-display font-medium text-foreground">Estimated delivery</span>
              <p className="mt-1 text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
            </div>
            <span className="font-display text-xl font-semibold text-gold">{order.estimatedDelivery}</span>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">Items</p>
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized={item.image.startsWith("/")} sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.color} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-foreground">{inr(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-lg font-semibold text-foreground">{inr(order.total)}</span>
          </div>
        </motion.div>

        <div className="mt-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            const done = statusRank[step.status] <= currentRank;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-start gap-4 pb-8"
              >
                {!isLast && <div className="absolute left-[19px] top-10 h-full w-px bg-border" />}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
                    done ? "border-gold bg-gold text-ink" : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="pt-1.5">
                  <p className={`font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  <p className="text-sm text-muted-foreground">{done ? "Completed" : "Pending"}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/account/orders" className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold/50">
            Back to orders
          </Link>
          <Link href="/shop/fashion" className="rounded-xl bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-soft">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
