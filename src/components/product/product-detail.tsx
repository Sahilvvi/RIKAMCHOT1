"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { useCart } from "@/components/cart/cart-context";

export function ProductDetail({ product }: { product: StorefrontProduct }) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const canAdd = product.inStock && selectedSize && selectedColor && (variant ? variant.inStock : false);

  function handleAdd() {
    if (!canAdd || !variant) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      price: variant.price,
      quantity,
    });
    openCart();
  }

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <section className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/shop/${product.rootCategory}`}
          className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {product.rootCategory.charAt(0).toUpperCase() + product.rootCategory.slice(1)}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted lg:aspect-square"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized={product.image.startsWith("/")}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {product.collection}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-gold">★</span>
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>·</span>
              <span>{product.reviews} reviews</span>
              <span>·</span>
              <span>{product.material}</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-3xl font-semibold text-foreground">
                {inr(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {inr(product.compareAtPrice)}
                  </span>
                  <span className="rounded-full bg-pink px-2 py-1 text-xs font-semibold text-white">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-foreground">
                  Colour: <span className="text-muted-foreground">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      aria-label={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-10 w-10 rounded-full border-2 transition-transform ${
                        selectedColor === color.name
                          ? "border-gold scale-110"
                          : "border-transparent hover:scale-110"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-foreground">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const hasStock = product.variants.some(
                    (v) => v.size === size && v.color === selectedColor && v.inStock
                  );
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!hasStock}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border bg-background text-foreground hover:border-gold/50 disabled:opacity-40 disabled:hover:border-border"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">
              <p className="text-sm font-medium text-foreground">Quantity</p>
              <div className="flex items-center rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={!canAdd}
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold px-8 py-4 font-display font-semibold text-ink transition-all hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag className="h-5 w-5" />
                {product.inStock ? "Add to Bag" : "Out of Stock"}
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders above ₹3,500</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
