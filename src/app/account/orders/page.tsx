"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, RotateCcw, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { inr } from "@/lib/catalog";
import { useHasMounted } from "@/lib/hooks/use-mounted";
import { useOrders, type OrderStatus } from "@/components/orders/order-context";

const statusMeta: Record<
  OrderStatus,
  { label: string; icon: typeof Package; color: string }
> = {
  confirmed: { label: "Confirmed", icon: ShoppingBag, color: "text-gold" },
  processing: { label: "Processing", icon: Package, color: "text-muted-foreground" },
  shipped: { label: "Shipped", icon: Truck, color: "text-gold" },
  "out-for-delivery": { label: "Out for delivery", icon: Truck, color: "text-gold" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "text-emerald-400" },
};

export default function OrdersPage() {
  const mounted = useHasMounted();
  const { orders } = useOrders();

  if (!mounted) {
    return (
      <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="mt-10 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your orders
        </h1>

        {orders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-lg text-muted-foreground">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop/fashion" className="mt-4 inline-block text-gold hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {orders.map((order, i) => {
              const meta = statusMeta[order.status];
              const Icon = meta.icon;
              const title = order.items.map((i) => i.name).join(", ");
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/20"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <Icon className={`h-5 w-5 ${meta.color}`} />
                      </div>
                      <div>
                        <Link href={`/order/${order.id.toLowerCase()}`} className="font-display font-medium text-foreground hover:text-gold">
                          Order {order.id.toUpperCase()}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {title} · {new Date(order.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="font-medium text-foreground">{inr(order.total)}</span>
                      <span className={`text-sm font-medium ${meta.color}`}>{meta.label}</span>
                    </div>
                  </div>
                  {order.status === "delivered" && (
                    <div className="mt-4 flex gap-3 border-t border-border pt-4">
                      <button type="button" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5">
                        <RotateCcw className="h-4 w-4" />
                        Return / exchange
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
