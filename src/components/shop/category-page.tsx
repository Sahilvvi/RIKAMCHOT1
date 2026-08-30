"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shirt, Headphones, Sofa, Lamp, Gamepad2, Watch, Briefcase, Home, Sparkles, Smartphone } from "lucide-react";
import type { StorefrontProduct, StorefrontCategory } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/product-grid";

const categoryIcon: Record<string, React.ReactNode> = {
  fashion: <Shirt className="h-5 w-5" />,
  tech: <Headphones className="h-5 w-5" />,
  lifestyle: <Sofa className="h-5 w-5" />,
  audio: <Headphones className="h-5 w-5" />,
  wearables: <Watch className="h-5 w-5" />,
  smartphones: <Smartphone className="h-5 w-5" />,
  gaming: <Gamepad2 className="h-5 w-5" />,
  "computer-accessories": <Briefcase className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  lighting: <Lamp className="h-5 w-5" />,
  desk: <Briefcase className="h-5 w-5" />,
  travel: <Briefcase className="h-5 w-5" />,
  kitchen: <Sparkles className="h-5 w-5" />,
};

function SectionHeading({ eyebrow, title, align = "left" }: { eyebrow?: string; title: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
    </div>
  );
}

function CategoryHero({ category, featured }: { category: StorefrontCategory; featured: StorefrontProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[75vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={featured.image} alt={category.name} fill priority className="object-cover" unoptimized={featured.image.startsWith("/")} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 grain opacity-30" />
      </motion.div>
      <motion.div style={{ opacity }} className="relative flex h-full flex-col justify-end px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-semibold uppercase tracking-widest text-gold"
          >
            {category.description || "Explore the world"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            {category.name}
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}

function SubcategoryGrid({ categories, current }: { categories: StorefrontCategory[]; current: string }) {
  if (categories.length === 0) return null;
  return (
    <section className="border-b border-border/50 px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/shop/${cat.slug}`}
                className={`group flex items-center gap-3 rounded-2xl border border-border px-5 py-3 transition-all hover:border-gold/40 hover:bg-gold/5 hover:shadow-lg ${
                  cat.slug === current ? "bg-gold/10 border-gold/30" : "bg-background"
                }`}
                data-cursor="open"
              >
                <span className="text-muted-foreground transition-colors group-hover:text-gold">{categoryIcon[cat.slug] || <Sparkles className="h-5 w-5" />}</span>
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingRail({ products }: { products: StorefrontProduct[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Trending now" title="Most wanted" />
        <motion.div ref={ref} whileTap={{ cursor: "grabbing" }} className="overflow-hidden">
          <motion.div drag="x" dragConstraints={ref} className="flex gap-5 pb-4" data-cursor="drag">
            {products.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="w-[72vw] flex-shrink-0 sm:w-[45vw] lg:w-[28vw]"
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function EditorialBlock({ product }: { product: StorefrontProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="px-6 py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-3xl bg-muted lg:grid-cols-2 lg:gap-0">
        <motion.div style={{ y }} className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
          <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized={product.image.startsWith("/")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-8 lg:p-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{product.collection}</p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{product.name}</h3>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="font-display text-2xl font-semibold text-foreground">{inr(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">{inr(product.compareAtPrice)}</span>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className={cn(buttonVariants({ variant: "default" }), "mt-8 w-fit rounded-full")}
            data-cursor="view"
          >
            View product <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar({ count, collections }: { count: number; collections: string[] }) {
  const uniqueCollections = Array.from(new Set(collections)).slice(0, 3);
  const stats = [
    { label: "Products", value: count },
    { label: "Collections", value: uniqueCollections.length },
    { label: "Curated sellers", value: 12 },
    { label: "Delivery", value: "2–5 days" },
  ];
  return (
    <section className="border-y border-border/50 px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="space-y-1"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="font-display text-3xl font-semibold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ValueCTA({ category }: { category: StorefrontCategory }) {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The {category.name} world is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Curated pieces, verified sellers, and a commerce experience designed around the product — not the cart.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/search" className={cn(buttonVariants({ variant: "white", size: "lg" }), "rounded-full")} data-cursor="open">
              Search all products
            </Link>
            <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")} data-cursor="open">
              Back to worlds
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CategoryPageClient({
  category,
  relatedCategories,
  products,
}: {
  category: StorefrontCategory;
  relatedCategories: StorefrontCategory[];
  products: StorefrontProduct[];
}) {
  const featured = products[0];
  const trending = products.slice(0, 8);
  const editorial = products.find((p) => p.isBestSeller || p.isNew) || products[1] || featured;
  const collections = products.map((p) => p.collection);

  return (
    <main className="bg-background">
      {featured && <CategoryHero category={category} featured={featured} />}
      <SubcategoryGrid categories={relatedCategories} current={category.slug} />
      <StatsBar count={products.length} collections={collections} />
      {trending.length > 0 && <TrendingRail products={trending} />}
      {editorial && <EditorialBlock product={editorial} />}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Browse" title={`All ${category.name}`} />
          <ProductGrid products={products} />
        </div>
      </section>
      <ValueCTA category={category} />
    </main>
  );
}
