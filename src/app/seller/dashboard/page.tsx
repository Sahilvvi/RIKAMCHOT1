"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, ShoppingBag, Star } from "lucide-react";

const stats = [
  { label: "Revenue", value: "₹1,24,500", icon: DollarSign, change: "+12%" },
  { label: "Orders", value: "48", icon: ShoppingBag, change: "+5" },
  { label: "Products", value: "24", icon: Package, change: "" },
  { label: "Rating", value: "4.9", icon: Star, change: "" },
];

export default function SellerDashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Seller portal</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Dashboard
            </h1>
          </div>
          <button type="button" className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft">
            + Add product
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-gold" />
                  {stat.change && <span className="text-xs font-medium text-emerald-400">{stat.change}</span>}
                </div>
                <p className="mt-4 font-display text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
          >
            <h2 className="font-display text-lg font-medium text-foreground">Recent orders</h2>
            <div className="mt-4 space-y-3">
              {["RC-1001", "RC-1002", "RC-1003"].map((id) => (
                <div key={id} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">{id}</p>
                    <p className="text-sm text-muted-foreground">Crown Hoodie — Ember · Qty 1</p>
                  </div>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">Processing</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="font-display text-lg font-medium text-foreground">Top products</h2>
            <div className="mt-4 space-y-3">
              {["Crown Hoodie", "Sovereign Cargo Pant", "Monarch Oversized Tee"].map((p, i) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="font-display text-sm text-muted-foreground">{i + 1}</span>
                  <p className="text-sm text-foreground">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
