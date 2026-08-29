"use client";

import { motion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/catalog";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: StorefrontProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
