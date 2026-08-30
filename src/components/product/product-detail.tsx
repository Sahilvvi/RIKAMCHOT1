"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Heart,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Share2,
  Star,
  Package,
  Clock,
  ChevronDown,
  Box,
} from "lucide-react";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "./product-grid";

const TAB_LABELS = ["Story", "Specs", "Reviews", "Delivery & Returns"];

const faqs = [
  { q: "What is the return window?", a: "You can return unused items with original tags within 7 days of delivery." },
  { q: "How long does delivery take?", a: "Most orders ship within 24 hours and reach metro cities in 2–3 days." },
  { q: "Are products authenticated?", a: "Yes — every seller on RIKAMCHOT is verified and products go through quality checks." },
];

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function Review({ name, rating, text }: { name: string; rating: number; text: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-border/60 p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-xs text-foreground">
          {name[0]}
        </div>
        <span className="text-sm font-medium text-foreground">{name}</span>
        <div className="ml-auto flex items-center gap-1 text-xs text-gold">
          <Star className="h-3 w-3" fill="currentColor" />
          {rating}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function ProductDetail({
  product,
  recommendations,
}: {
  product: StorefrontProduct;
  recommendations?: StorefrontProduct[];
}) {
  const { addItem, openCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const variant = useMemo(
    () => product.variants.find((v) => v.size === selectedSize && v.color === selectedColor),
    [product.variants, selectedSize, selectedColor]
  );

  const canAdd = product.inStock && selectedSize && selectedColor && (variant ? variant.inStock : false);

  async function handleAdd() {
    if (!canAdd || !variant) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 400));
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
    setAdding(false);
    openCart();
  }

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);
  const visibleImages = product.images.length > 1 ? product.images : [product.image, product.image];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      <section ref={heroRef} className="min-h-screen px-6 pb-16 pt-24 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/shop/${product.rootCategory}`}
            className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="open"
          >
            ← {product.rootCategory.charAt(0).toUpperCase() + product.rootCategory.slice(1)}
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Media */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted lg:aspect-square" data-cursor="explore">
                <motion.div style={{ y: imageY }} className="absolute inset-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={visibleImages[activeImage]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized={visibleImages[activeImage].startsWith("/")}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="absolute left-4 top-4 flex gap-2">
                  {product.badges.map((b) => (
                    <Badge key={b} variant={b === "new" ? "default" : b === "bestseller" ? "success" : "destructive"}>
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {visibleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                      activeImage === i ? "border-gold" : "border-transparent"
                    }`}
                    data-cursor="image"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized={img.startsWith("/")}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4">
                <Box className="h-5 w-5 text-gold" />
                <p className="text-sm text-muted-foreground">
                  View in the{" "}
                  <Link href={`/customize/${product.slug}`} className="font-medium text-foreground underline-offset-4 hover:text-gold hover:underline">
                    3D customization studio
                  </Link>
                  .
                </p>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{product.collection}</p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="text-gold">★</span>
                <span className="font-medium text-foreground">{product.rating}</span>
                <span>·</span>
                <span>{product.reviews} reviews</span>
                <span>·</span>
                <span>{product.material}</span>
              </div>

              {product.sellerName && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Sold by</span>
                  <Link href={`/seller/${product.sellerName.toLowerCase().replace(/\s+/g, "-")}`} className="font-medium text-foreground hover:text-gold" data-cursor="open">
                    {product.sellerName}
                  </Link>
                  {product.sellerVerified && <BadgeCheck className="h-4 w-4 text-gold" />}
                  {product.sellerRating && <span className="text-muted-foreground">({product.sellerRating} ★)</span>}
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <span className="font-display text-3xl font-semibold text-foreground">{inr(product.price)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{inr(product.compareAtPrice)}</span>
                    <Badge variant="destructive">Save {discount}%</Badge>
                  </>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

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
                          selectedColor === color.name ? "border-gold scale-110" : "border-transparent hover:scale-110"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-medium text-foreground">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const hasStock = product.variants.some((v) => v.size === size && v.color === selectedColor && v.inStock);
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
              )}

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-4">
                <p className="text-sm font-medium text-foreground">Quantity</p>
                <div className="flex items-center rounded-xl border border-border">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 text-muted-foreground hover:text-foreground">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="p-3 text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" disabled={!canAdd || adding} onClick={handleAdd} className="flex-1" data-cursor="add">
                  <ShoppingBag className="h-5 w-5" />
                  {adding ? "Adding..." : product.inStock ? "Add to Bag" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() =>
                    toggle({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                    })
                  }
                  className="flex-1"
                >
                  <Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} />
                  {inWishlist ? "Saved" : "Wishlist"}
                </Button>
                <Button size="icon" variant="outline" aria-label="Share" data-cursor="open">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-gold" />
                  <span>Free shipping above ₹3,500</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  <span>Buyer protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCcw className="h-4 w-4 text-gold" />
                  <span>Easy 7-day returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  <span>{product.sellerVerified ? "Verified seller" : "Trusted seller"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showroom tabs */}
      <section className="border-t border-border/50 bg-card px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 border-b border-border/50 pb-2">
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`rounded-t-xl px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === i ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 min-h-[240px]">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div key="story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">The story behind {product.name}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Designed for the {product.rootCategory} world and finished in {product.material.toLowerCase()}. Every seam, surface and silhouette has been considered to balance everyday utility with a quiet sense of luxury.
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Part of the {product.collection} collection — a line built for those who notice details.
                    </p>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized={product.image.startsWith("/")} />
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="max-w-3xl">
                  <h3 className="mb-6 font-display text-2xl font-semibold text-foreground">Materials & specifications</h3>
                  <SpecRow label="Material" value={product.material} />
                  <SpecRow label="Category" value={product.categoryName} />
                  <SpecRow label="Collection" value={product.collection} />
                  <SpecRow label="Available colours" value={product.colors.map((c) => c.name).join(", ")} />
                  <SpecRow label="Available sizes" value={product.sizes.join(", ")} />
                  <SpecRow label="Seller rating" value={`${product.sellerRating} / 5`} />
                  <SpecRow label="Ships from" value="RIKAMCHOT fulfilment centre" />
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-foreground">Customer reviews</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Based on {product.reviews} verified reviews</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-2">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      <span className="font-display text-xl font-semibold text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">/ 5</span>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Review name="Aarav M." rating={5} text="The quality is exceptional and the unboxing experience felt premium." />
                    <Review name="Isha K." rating={4.5} text="Beautiful finish. Sizing was accurate and delivery was faster than expected." />
                    <Review name="Rohan S." rating={5} text="Exactly as described. Already added another colour to my wishlist." />
                    <Review name="Priya D." rating={4} text="Minimal packaging, great product. The material feels expensive." />
                  </div>
                </motion.div>
              )}

              {activeTab === 3 && (
                <motion.div key="delivery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">Delivery & returns</h3>
                    <ul className="mt-6 space-y-4">
                      <li className="flex gap-3 text-sm text-muted-foreground">
                        <Truck className="h-5 w-5 text-gold" />
                        Free shipping on all orders above ₹3,500
                      </li>
                      <li className="flex gap-3 text-sm text-muted-foreground">
                        <Clock className="h-5 w-5 text-gold" />
                        Standard delivery: 2–5 business days
                      </li>
                      <li className="flex gap-3 text-sm text-muted-foreground">
                        <Package className="h-5 w-5 text-gold" />
                        Express delivery available at checkout
                      </li>
                      <li className="flex gap-3 text-sm text-muted-foreground">
                        <RotateCcw className="h-5 w-5 text-gold" />
                        7-day easy returns with original tags
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group rounded-2xl border border-border/60 bg-background p-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                          {faq.q}
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Complete the look */}
      {recommendations && recommendations.length > 0 && (
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">You may also like</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">Complete the look</h2>
            <div className="mt-10">
              <ProductGrid products={recommendations} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
