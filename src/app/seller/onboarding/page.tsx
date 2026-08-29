"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Profile", done: true },
  { label: "Business", done: true },
  { label: "KYC", done: true },
  { label: "Bank", done: true },
  { label: "Store", done: false },
  { label: "Products", done: false },
  { label: "Approval", done: false },
];

export default function SellerOnboardingPage() {
  const [active, setActive] = useState(4);

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Become a seller
        </h1>
        <p className="mt-2 text-muted-foreground">Complete the steps to launch your RIKAMCHOT storefront.</p>

        <div className="mt-10 space-y-0 rounded-2xl border border-border bg-card p-2 sm:flex">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`flex flex-1 items-center justify-between p-3 text-xs font-medium uppercase tracking-wider sm:flex-col sm:items-center sm:gap-2 ${
                i === active ? "text-gold" : step.done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                  step.done ? "bg-emerald-500/10 text-emerald-400" : i === active ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
                }`}
              >
                {step.done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-border bg-card p-6 lg:p-10"
        >
          <h2 className="font-display text-xl font-medium text-foreground">Store setup</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tell customers your story and upload your store assets.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input placeholder="Store name" className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-gold/50" />
            <input placeholder="Store slug" className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-gold/50" />
            <textarea placeholder="Brand story" className="min-h-[120px] rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-gold/50 sm:col-span-2" />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setActive((s) => Math.min(s + 1, steps.length - 1))}>
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
