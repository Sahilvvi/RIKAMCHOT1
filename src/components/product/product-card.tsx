"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { Badge } from "@/components/ui/badge";

function badgeVariant(badge: string) {
  switch (badge) {
    case "new":
      return "default";
    case "bestseller":
      return "success";
    case "limited":
      return "destructive";
    default:
      return "secondary";
  }
}

export function ProductCard({ product }: { product: StorefrontProduct }) {
  const [hovered, setHovered] = useState(false);
  const { openCart, addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const hasAltImage = product.images.length > 1;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock || product.sizes.length === 0) return;
    const size = product.sizes[0];
    const color = product.colors[0]?.name || "";
    const variant = product.variants.find((v) => v.size === size && v.color === color);
    if (!variant || !variant.inStock) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      size,
      color,
      price: variant.price,
      quantity: 1,
    });
    openCart();
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-3xl p-2 transition-shadow duration-500 hover:shadow-[0_24px_70px_-12px_rgba(0,0,0,0.12)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block" data-cursor="view">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized={product.image.startsWith("/")}
          />

          <AnimatePresence>
            {hovered && hasAltImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[1]}
                  alt={`${product.name} alt`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  unoptimized={product.images[1]?.startsWith("/")}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {product.badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {product.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} variant={badgeVariant(badge) as never}>
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggle({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                });
              }}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors ${
                inWishlist ? "bg-pink text-white border-pink" : "text-foreground hover:bg-gold hover:text-ink"
              }`}
            >
              <Heart className="h-4 w-4" fill={inWishlist ? "currentColor" : "none"} />
            </button>
            {product.inStock && product.sizes.length > 0 && (
              <button
                type="button"
                onClick={handleQuickAdd}
                aria-label="Quick add to bag"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            )}
          </div>
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
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.name}
                  aria-label={color.name}
                  className="h-4 w-4 rounded-full border border-foreground/10"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
