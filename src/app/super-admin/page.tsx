"use client";

import { motion } from "framer-motion";
import { Settings, BarChart3, Layers, Wallet, Shield } from "lucide-react";

const cards = [
  { label: "Platform analytics", icon: BarChart3, desc: "GMV, revenue, AOV and growth" },
  { label: "Marketplace settings", icon: Settings, desc: "Categories, commissions, shipping" },
  { label: "Commission engine", icon: Wallet, desc: "Global, category & seller overrides" },
  { label: "RBAC", icon: Shield, desc: "Roles, permissions and audit logs" },
  { label: "CMS", icon: Layers, desc: "Homepage, campaigns and content" },
];

export default function SuperAdminPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Super Admin</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Platform control
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.label}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-gold/30"
              >
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-lg font-medium text-foreground">{card.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
