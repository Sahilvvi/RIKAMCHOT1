"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { inr } from "@/lib/catalog";

const steps = [
  { label: "Order confirmed", icon: ShoppingBag, done: true },
  { label: "Processing", icon: Package, done: true },
  { label: "Shipped", icon: Truck, done: true },
  { label: "Out for delivery", icon: Truck, done: true },
  { label: "Delivered", icon: Home, done: false },
];

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Order tracking
        </h1>
        <p className="mt-2 text-muted-foreground">Order ID — {id.toUpperCase()}</p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="font-display font-medium text-foreground">Estimated delivery</span>
            <span className="font-display text-xl font-semibold text-gold">Tomorrow</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Crown Hoodie — Ember · {inr(4599)}</p>
        </div>

        <div className="mt-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
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
                    step.done ? "border-gold bg-gold text-ink" : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step.done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="pt-1.5">
                  <p className={`font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.done ? "Completed" : "Pending"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/account/orders" className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold/50">
            Back to orders
          </Link>
        </div>
      </div>
    </main>
  );
}
