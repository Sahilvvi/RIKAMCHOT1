"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { inr } from "@/lib/catalog";

const orders = [
  { id: "RC-1001", status: "Delivered", date: "28 Aug 2026", total: 4599, items: ["Crown Hoodie — Ember"], icon: CheckCircle },
  { id: "RC-1002", status: "Out for delivery", date: "29 Aug 2026", total: 2299, items: ["RC Monogram Cap"], icon: Truck },
  { id: "RC-1003", status: "Processing", date: "30 Aug 2026", total: 6999, items: ["Neon Reign Sneaker"], icon: Package },
];

function statusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "text-emerald-400";
    case "Out for delivery":
      return "text-gold";
    default:
      return "text-muted-foreground";
  }
}

export default function OrdersPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your orders
        </h1>

        <div className="mt-10 space-y-4">
          {orders.map((order, i) => {
            const Icon = order.icon;
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
                      <Icon className={`h-5 w-5 ${statusColor(order.status)}`} />
                    </div>
                    <div>
                      <Link href={`/order/${order.id.toLowerCase()}`} className="font-display font-medium text-foreground hover:text-gold">
                        Order {order.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {order.items.join(", ")} · {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="font-medium text-foreground">{inr(order.total)}</span>
                    <span className={`text-sm font-medium ${statusColor(order.status)}`}>{order.status}</span>
                  </div>
                </div>
                {order.status === "Delivered" && (
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
      </div>
    </main>
  );
}
