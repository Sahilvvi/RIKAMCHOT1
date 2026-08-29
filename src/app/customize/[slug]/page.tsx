"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Product3DViewer } from "@/components/product/product-3d-viewer";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/catalog";

const colors = [
  { name: "Gold", hex: "#c9a24c" },
  { name: "Black", hex: "#0a0a0b" },
  { name: "Pink", hex: "#ff2f8f" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Navy", hex: "#1a2b4a" },
];

export default function CustomizePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [color, setColor] = useState(colors[0].hex);
  const [text, setText] = useState("");
  const base = 6999;
  const total = text ? base + 499 : base;

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Customization studio</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl capitalize">
          {slug.replace(/-/g, " ")}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square"
          >
            <Product3DViewer accentColor={color} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm font-medium text-foreground">Base colour</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.hex)}
                    className={`h-10 w-10 rounded-full border-2 transition-transform ${
                      color === c.hex ? "border-gold scale-110" : "border-transparent hover:scale-110"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">Custom text</p>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. INITIALS"
                maxLength={8}
                className="mt-3 h-12 w-full max-w-sm rounded-xl border border-border bg-background px-4 text-sm uppercase tracking-widest outline-none focus:border-gold/50"
              />
              <p className="mt-2 text-xs text-muted-foreground">{text ? "+ ₹499 personalization" : "Optional · max 8 characters"}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Base price</span>
                <span>{inr(base)}</span>
              </div>
              {text && (
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Personalization</span>
                  <span>{inr(499)}</span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display text-lg font-medium text-foreground">Total</span>
                <span className="font-display text-2xl font-semibold text-foreground">{inr(total)}</span>
              </div>
              <Button size="lg" className="mt-6 w-full">
                Save design & add to bag
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
