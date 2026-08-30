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
    <div className="[perspective:1200px]">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4" style={{ transformStyle: "preserve-3d" }}>
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50, scale: 0.94, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: Math.min(i * 0.06, 0.6),
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
