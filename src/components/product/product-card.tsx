"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
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

export function ProductCard({ product, index }: { product: StorefrontProduct; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { openCart, addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

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

  const label = product.isNew
    ? "NEW DROP"
    : product.isLimited
      ? "LIMITED"
      : product.isBestSeller
        ? "BESTSELLER"
        : "FEATURED";
  const indexLabel =
    index !== undefined ? `${String(index + 1).padStart(2, "0")} / ${label}` : label;

  const sequence = [product.image, product.images[1] || product.image, product.image];
  const sequenceScale = [1, 1, 1.12];

  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % sequence.length);
    }, 1400);
    return () => clearInterval(id);
  }, [hovered, sequence.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const texX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const texY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const productX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const productY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);

  const badgeLayerX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);
  const badgeLayerY = useTransform(smoothY, [-0.5, 0.5], [-34, 34]);

  const ctaLayerX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const ctaLayerY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);

  const hoverScale = useMotionValue(1);
  const cardScale = useSpring(hoverScale, { stiffness: 300, damping: 25 });

  const productScale = useMotionValue(1);
  const productScaleSpring = useSpring(productScale, { stiffness: 250, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  }

  function handleMouseEnter() {
    setHovered(true);
    setImageIndex(0);
    hoverScale.set(1.025);
    productScale.set(1.06);
  }

  function handleMouseLeave() {
    setHovered(false);
    setImageIndex(0);
    mouseX.set(0);
    mouseY.set(0);
    hoverScale.set(1);
    productScale.set(1);
  }

  return (
    <div ref={cardRef} className="[perspective:1200px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.12)]"
      >
        <Link href={`/product/${product.slug}`} className="block h-full" data-cursor="view">
          <span className="absolute left-4 top-4 z-20 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {indexLabel}
          </span>

          <motion.div
            style={{ x: bgX, y: bgY }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-muted opacity-60"
          />
          <motion.div
            style={{ x: texX, y: texY }}
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(201,162,76,0.18), transparent 60%)",
              }}
            />
          </motion.div>

          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              style={{ x: productX, y: productY, scale: productScaleSpring }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, 0.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.16))" }}
              >
                <AnimatePresence mode="wait">
                  {sequence.map(
                    (src, i) =>
                      i === imageIndex && (
                        <motion.div
                          key={`${src}-${i}`}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: sequenceScale[i] }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={src}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain"
                            unoptimized={src.startsWith("/")}
                          />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: badgeLayerX, y: badgeLayerY }}
              className="absolute left-4 top-10 z-10 flex flex-wrap gap-2"
            >
              {product.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} variant={badgeVariant(badge) as never}>
                  {badge}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              style={{ x: ctaLayerX, y: ctaLayerY }}
              className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
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
            </motion.div>

            <motion.div
              style={{ x: ctaLayerX, y: ctaLayerY }}
              className="absolute bottom-4 right-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
                View <ArrowUpRight className="h-3 w-3" />
              </span>
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col justify-end p-5">
            <h3 className="font-display text-base font-medium text-foreground transition-transform duration-300 group-hover:translate-x-1">
              {product.name}
            </h3>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {product.collection}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-gold">★</span>
              <span>{product.rating}</span>
              <span>·</span>
              <span>{product.reviews} reviews</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold text-foreground">
                  {inr(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {inr(product.compareAtPrice)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs font-medium text-pink">-{discount}%</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
