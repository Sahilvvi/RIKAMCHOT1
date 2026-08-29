"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";

function badgeClass(badge: string) {
  switch (badge) {
    case "new":
      return "bg-gold text-ink";
    case "bestseller":
      return "bg-pink text-white";
    case "limited":
      return "bg-charcoal text-foreground border border-border";
    default:
      return "bg-muted text-foreground";
  }
}

export function ProductCard({ product }: { product: StorefrontProduct }) {
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized={product.image.startsWith("/")}
          />

          {product.badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {product.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badgeClass(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {product.collection}
          </p>
          <h3 className="font-display text-base font-medium text-foreground">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-gold">★</span>
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="font-display text-sm font-semibold text-foreground">
              {inr(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {inr(product.compareAtPrice)}
                </span>
                <span className="text-xs font-medium text-pink">-{discount}%</span>
              </>
            )}
          </div>

          {product.colors.length > 0 && (
            <div className="flex gap-1.5 pt-2">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  aria-label={color.name}
                  className="h-4 w-4 rounded-full border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
