"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { useCart } from "@/components/cart/cart-context";
import { inr } from "@/lib/catalog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem, openCart } = useCart();

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Your Wishlist
          </h1>
        </motion.div>

        <div className="my-8 border-y border-border/50 bg-card/40 py-2.5">
          <Marquee speed={26} direction="right" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {["Saved for Later", "Curated by You", "Fashion", "Tech", "Lifestyle", "Wishlist", "RIKAMCHOT"].map((w) => (
              <span key={w} className="inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                {w}
              </span>
            ))}
          </Marquee>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <Heart className="h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-foreground">Your wishlist is empty</p>
            <p className="mt-1 text-muted-foreground">Save your favorite pieces to shop later.</p>
            <Link href="/shop/fashion" className={cn(buttonVariants({ variant: "default" }), "mt-6")}>
              Explore products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.productId} className="group rounded-2xl border border-border bg-card p-3">
                <Link href={`/product/${item.slug}`} className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                  <Image src={item.image} alt={item.name} fill sizes="25vw" className="object-cover" unoptimized={item.image.startsWith("/")} />
                </Link>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-display font-medium text-foreground hover:text-gold">
                      {item.name}
                    </Link>
                    <p className="text-sm font-medium text-foreground">{inr(item.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => {
                    addItem({
                      productId: item.productId,
                      variantId: `${item.productId}-default`,
                      name: item.name,
                      slug: item.slug,
                      image: item.image,
                      size: "",
                      color: "",
                      price: item.price,
                      quantity: 1,
                    });
                    openCart();
                  }}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
