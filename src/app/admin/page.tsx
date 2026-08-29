"use client";

import { motion } from "framer-motion";
import { BarChart3, Boxes, Store, ShoppingCart, Users, ShieldCheck } from "lucide-react";

const stats = [
  { label: "GMV", value: "₹42.8L", icon: BarChart3 },
  { label: "Orders", value: "1,240", icon: ShoppingCart },
  { label: "Sellers", value: "86", icon: Store },
  { label: "Products", value: "4,320", icon: Boxes },
  { label: "Customers", value: "12.5K", icon: Users },
  { label: "Pending reviews", value: "34", icon: ShieldCheck },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Admin panel</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Operations overview
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-medium text-foreground">Moderation queue</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium">Item</th>
                  <th className="py-3 pr-4 font-medium">Seller</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Monarch Oversized Tee", seller: "Sovereign Studio", status: "Pending review" },
                  { item: "Wireless ANC Headphones", seller: "TechCraft", status: "Pending review" },
                ].map((row) => (
                  <tr key={row.item} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 text-foreground">{row.item}</td>
                    <td className="py-3 pr-4">{row.seller}</td>
                    <td className="py-3 pr-4"><span className="rounded-full bg-gold/10 px-2 py-1 text-xs font-medium text-gold">{row.status}</span></td>
                    <td className="py-3 pr-4">
                      <button type="button" className="mr-2 text-emerald-400 hover:text-emerald-300">Approve</button>
                      <button type="button" className="text-pink hover:text-pink/80">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
