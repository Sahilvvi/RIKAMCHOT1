"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, Shirt, Headphones, Sofa, ArrowUpRight, Star, ShoppingBag } from "lucide-react";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { useMouse } from "@/lib/hooks/use-mouse";
import { Button } from "@/components/ui/button";
import { Product3DViewer } from "@/components/product/product-3d-viewer";
import { useCart } from "@/components/cart/cart-context";
import { ProductCard } from "@/components/product/product-card";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, align = "left" }: { eyebrow?: string; title: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function HeroWorld({ products }: { products: StorefrontProduct[] }) {
  const { normalized } = useMouse();
  const springConfig = { stiffness: 60, damping: 20 };
  const x1 = useSpring(normalized.x * 30, springConfig);
  const y1 = useSpring(normalized.y * 30, springConfig);
  const x2 = useSpring(normalized.x * -40, springConfig);
  const y2 = useSpring(normalized.y * -40, springConfig);
  const x3 = useSpring(normalized.x * 20, springConfig);
  const y3 = useSpring(normalized.y * 20, springConfig);

  const featured = products.slice(0, 3);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-cool-metallic/10 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl"
      >
        <Badge className="mb-8 border-gold/30 text-gold-dark">Premium multi-vendor marketplace</Badge>

        <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-9xl">
          {"The Future of".split(" ").map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="inline-block mr-4">
              {w}
            </motion.span>
          ))}
          <br />
          <span className="text-gradient-gold">Everyday Commerce.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Discover fashion, technology and lifestyle through cinematic product stories, interactive 3D and curated sellers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="group rounded-full px-8" data-cursor="add">
            Explore Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="white" className="group rounded-full px-8" data-cursor="play">
            <Play className="h-4 w-4 fill-foreground" />
            Watch Showreel
          </Button>
        </motion.div>
      </motion.div>

      {featured.map((p, i) => {
        const pos = [
          { x: x1, y: y1, class: "-left-4 top-1/4 w-32 sm:w-44 lg:w-56" },
          { x: x2, y: y2, class: "-right-4 top-1/3 w-36 sm:w-48 lg:w-64" },
          { x: x3, y: y3, class: "left-1/4 bottom-12 w-28 sm:w-36 lg:w-44" },
        ][i];
        return (
          <motion.div
            key={p.id}
            style={{ x: pos.x, y: pos.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.8 }}
            className={`pointer-events-none absolute hidden select-none rounded-2xl bg-card p-2 shadow-2xl sm:block ${pos.class}`}
          >
            <Image src={p.image} alt={p.name} width={300} height={400} className="rounded-xl object-cover" unoptimized />
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-border p-1"
        >
          <div className="h-2 w-full rounded-full bg-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function EnterTheWorld() {
  const worlds = [
    { id: "fashion", title: "Fashion", subtitle: "Streetwear, footwear & accessories", icon: Shirt, image: "/products/product-1.jpg", color: "from-pink/10" },
    { id: "tech", title: "Tech", subtitle: "Audio, wearables & smart devices", icon: Headphones, image: "/products/product-4.jpg", color: "from-cool-metallic/20" },
    { id: "lifestyle", title: "Lifestyle", subtitle: "Objects for the spaces you live in", icon: Sofa, image: "/products/product-7.jpg", color: "from-gold/10" },
  ];

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Enter a world" title="Three immersive experiences" />
        <div className="grid gap-4 md:grid-cols-3">
          {worlds.map((world, i) => {
            const Icon = world.icon;
            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-card"
              >
                <Link href={`/shop/${world.id}`} className="absolute inset-0" data-cursor="view">
                  <Image src={world.image} alt={world.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className={`absolute inset-0 bg-gradient-to-t ${world.color} via-background/40 to-transparent`} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="w-fit rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Icon className="h-8 w-8 text-foreground" />
                      <h3 className="mt-4 font-display text-3xl font-semibold text-foreground">{world.title}</h3>
                      <p className="mt-2 text-muted-foreground">{world.subtitle}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-dark transition-all group-hover:gap-3">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NewDrop({ product }: { product: StorefrontProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div style={{ scale, opacity }} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-muted">
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
            <div className="absolute left-6 top-6">
              <Badge className="bg-background/90 text-foreground backdrop-blur-sm">Object 01</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">New Drop</p>
            <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
              {product.name}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-3xl font-semibold">{inr(product.price)}</span>
              {product.compareAtPrice && <span className="text-lg text-muted-foreground line-through">{inr(product.compareAtPrice)}</span>}
            </div>
            <div className="mt-8 flex gap-3">
              <Button size="lg" className="rounded-full px-8">Add to Bag</Button>
              <Link href={`/product/${product.slug}`}>
                <Button size="lg" variant="white" className="rounded-full px-8">View details</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrendingRail({ products }: { products: StorefrontProduct[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex items-end justify-between">
          <SectionHeading eyebrow="Curated now" title="Trending now" />
          <Link href="/shop/fashion" className="hidden text-sm font-medium text-gold-dark hover:underline sm:inline-flex" data-cursor="open">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          className="flex cursor-grab gap-4 px-6 active:cursor-grabbing lg:px-12"
          data-cursor="drag"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[75vw] flex-shrink-0 sm:w-[45vw] lg:w-[30vw]">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ShopByWorld() {
  const worlds = [
    { name: "Street", image: "/products/product-1.jpg" },
    { name: "Tech", image: "/products/product-4.jpg" },
    { name: "Home", image: "/products/product-7.jpg" },
    { name: "Travel", image: "/products/product-3.jpg" },
    { name: "Workspace", image: "/products/product-6.jpg" },
    { name: "Night", image: "/products/product-2.jpg" },
    { name: "Weekend", image: "/products/product-5.jpg" },
  ];

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Shop by world" title="Worlds to explore" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {worlds.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <Link href="/shop/fashion" className="absolute inset-0" data-cursor="view">
                <Image src={w.image} alt={w.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-lg font-medium text-foreground">{w.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialStory({ product }: { product: StorefrontProduct }) {
  return (
    <section className="relative overflow-hidden px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image src={product.image} alt="Editorial" fill className="object-cover" unoptimized />
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="absolute left-[20%] top-[40%] flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink shadow-lg"
                data-cursor="view"
              >
                <PlusIcon />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Editorial</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              The Jacket. Reimagined.
            </h2>
            <p className="mt-6 text-muted-foreground">
              A single piece can define an entire look. Explore the story behind the silhouette, the fabric, and the craft.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-4">
              <ProductCard product={product} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return <span className="text-lg font-light">+</span>;
}

function CompleteTheLook({ products }: { products: StorefrontProduct[] }) {
  const [focus, setFocus] = useState<string | null>(null);
  const { addItem } = useCart();

  function addAll() {
    products.forEach((p) => {
      const variant = p.variants[0];
      if (variant) {
        addItem({
          productId: p.id,
          variantId: variant.id,
          name: p.name,
          slug: p.slug,
          image: p.image,
          size: variant.size,
          color: variant.color,
          price: variant.price,
          quantity: 1,
        });
      }
    });
  }

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Fashion" title="Complete the look" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-muted">
            <Image src={products[0]?.image || "/products/product-1.jpg"} alt="Look" fill className="object-cover" unoptimized />
            {products.slice(1, 4).map((p, i) => (
              <motion.button
                key={p.id}
                onMouseEnter={() => setFocus(p.id)}
                onMouseLeave={() => setFocus(null)}
                whileHover={{ scale: 1.2 }}
                className="absolute h-10 w-10 rounded-full bg-gold text-ink shadow-xl"
                style={{ left: `${25 + i * 25}%`, top: `${35 + i * 12}%` }}
                data-cursor="view"
              >
                <PlusIcon />
              </motion.button>
            ))}
            {focus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/90 p-4 backdrop-blur-md"
              >
                {(() => {
                  const p = products.find((x) => x.id === focus);
                  if (!p) return null;
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-medium">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{inr(p.price)}</p>
                      </div>
                      <Button size="sm" onClick={() => addItem({
                        productId: p.id,
                        variantId: p.variants[0]?.id || p.id,
                        name: p.name,
                        slug: p.slug,
                        image: p.image,
                        size: p.variants[0]?.size || "",
                        color: p.variants[0]?.color || "",
                        price: p.price,
                        quantity: 1,
                      })}>Add</Button>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-display text-3xl font-semibold text-foreground">The Sovereign Set</h3>
            <p className="mt-4 text-muted-foreground">Curated pieces that work together. Click any hotspot to add it, or take the full look.</p>
            <div className="mt-8 space-y-4">
              {products.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-gold/30" data-cursor="view">
                  <Image src={p.image} alt={p.name} width={80} height={100} className="rounded-xl object-cover" unoptimized />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{inr(p.price)}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold-dark" />
                </Link>
              ))}
            </div>
            <Button size="lg" className="mt-8 w-full rounded-full" onClick={addAll} data-cursor="add">
              <ShoppingBag className="h-4 w-4" />
              Add entire look
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Product3DLab() {
  return (
    <section className="overflow-hidden bg-ivory px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="The 3D Lab" title="Interact with the product" align="center" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-square rounded-[2rem] border border-border bg-background shadow-2xl">
            <Product3DViewer accentColor="#c9a24c" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl font-semibold text-foreground">360° exploration</h3>
            <p className="mt-4 text-muted-foreground">Drag to rotate. Scroll to zoom. Switch materials and colours in real time. The product is no longer a static image.</p>
            <div className="mt-8 space-y-3">
              {["Drag to rotate", "Pinch to zoom", "Tap hotspots for details"].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/customize/neon-reign-sneaker">
                <Button className="rounded-full px-8">Customize in 3D</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechShowroom({ product }: { product: StorefrontProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div style={{ y }} className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tech Showroom</p>
            <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Precision engineering.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                { label: "Material", value: product.material },
                { label: "Weight", value: "240g" },
                { label: "Connectivity", value: "Bluetooth 5.3" },
                { label: "Battery", value: "30 hours" },
              ].map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{spec.label}</p>
                  <p className="mt-2 font-display text-xl font-medium text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-8 rounded-full px-8">View product</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 aspect-square overflow-hidden rounded-[2rem] bg-muted lg:order-2"
          >
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LifestyleSpace({ products }: { products: StorefrontProduct[] }) {
  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Lifestyle" title="Spatial commerce" />
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-muted">
          <Image src="/products/product-7.jpg" alt="Lifestyle space" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />
          {products.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="absolute hidden sm:block"
              style={{ left: `${15 + i * 22}%`, top: `${30 + (i % 2) * 30}%` }}
            >
              <div className="group relative" data-cursor="view">
                <div className="h-4 w-4 rounded-full border-2 border-background bg-gold shadow-lg" />
                <div className="absolute left-6 top-0 w-48 rounded-2xl border border-border bg-background/95 p-3 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-md">
                  <p className="font-display text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{inr(p.price)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LimitedDrop({ product }: { product: StorefrontProduct }) {
  const stock = 12;
  return (
    <section className="bg-ink px-6 py-32 text-background lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="border-background/20 text-gold">Limited drop</Badge>
            <h2 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl">{product.name}</h2>
            <p className="mt-6 max-w-md text-background/70">Only a small run is produced. Once sold, it will not restock. Secure your piece now.</p>

            <div className="mt-8 max-w-md">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-background/60">
                <span>Inventory</span>
                <span>{stock} left</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background/10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(stock / 50) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full bg-gold" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-3xl font-semibold">{inr(product.price)}</span>
              <Button className="rounded-full bg-gold px-8 text-ink hover:bg-gold-soft">Secure now</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square overflow-hidden rounded-[2rem]"
          >
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CommunityGrid() {
  const images = ["/products/product-1.jpg", "/products/product-2.jpg", "/products/product-3.jpg", "/products/product-5.jpg", "/products/product-6.jpg", "/products/product-8.jpg"];
  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Community" title="Worn by you" />
        <div className="columns-2 gap-4 space-y-4 md:columns-3">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid"
              data-cursor="explore"
            >
              <Image src={src} alt="Community" width={600} height={800} className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipClub() {
  return (
    <section className="overflow-hidden px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[2.5rem] border border-border bg-card px-8 py-16 text-center lg:px-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/5 via-transparent to-cool-metallic/5" />
          <Badge className="mb-6">Membership</Badge>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Join the inner circle.
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Early access", "Private drops", "Member products", "Exclusive rewards"].map((benefit) => (
              <div key={benefit} className="rounded-2xl border border-border bg-background p-6">
                <Star className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display font-medium text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-10 rounded-full px-8">Become a member</Button>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  const milestones = [
    { year: "2022", title: "Origin", desc: "RIKAMCHOT founded as a premium digital marketplace." },
    { year: "2023", title: "Curators", desc: "First verified sellers and editorial collections." },
    { year: "2024", title: "3D Lab", desc: "Interactive product configurators go live." },
    { year: "2025", title: "World", desc: "A global community of creators and collectors." },
  ];
  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Brand story" title="The RIKAMCHOT journey" align="center" />
        <div className="relative space-y-12 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-border md:before:left-1/2 md:before:-translate-x-1/2">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 md:text-center">
                <span className="font-display text-3xl font-semibold text-gold-dark">{m.year}</span>
              </div>
              <div className="absolute left-4 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground md:left-1/2" />
              <div className="flex-1 pl-10 md:pl-0 md:pr-0">
                <h3 className="font-display text-xl font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-muted-foreground">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center lg:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-9xl"
      >
        Discover
        <br />
        what&apos;s next.
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <Button size="lg" className="rounded-full px-10 py-6 text-lg" data-cursor="add">
          Start exploring
          <ArrowRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  );
}

export function HomePage({ products }: { products: StorefrontProduct[] }) {
  const trending = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 8);
  const newDrop = products.find((p) => p.isNew) || products[0];
  const techProduct = products.find((p) => p.rootCategory === "tech") || products[3];
  const limited = products.find((p) => p.isLimited) || products[2];
  const lookProducts = products.slice(0, 4);
  const lifestyle = products.slice(4, 8);

  return (
    <main className="bg-background">
      <HeroWorld products={products} />
      <EnterTheWorld />
      <NewDrop product={newDrop} />
      <TrendingRail products={trending} />
      <Product3DLab />
      <ShopByWorld />
      <EditorialStory product={newDrop} />
      <CompleteTheLook products={lookProducts} />
      <TechShowroom product={techProduct} />
      <LifestyleSpace products={lifestyle} />
      <LimitedDrop product={limited} />
      <CommunityGrid />
      <MembershipClub />
      <BrandStory />
      <FinalCTA />
    </main>
  );
}
