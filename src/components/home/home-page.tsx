"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Play, Shirt, Headphones, Sofa, ArrowUpRight, Star, ShoppingBag } from "lucide-react";
import { PulseDot, PulseRing } from "@/components/ui/pulse-dot";
import type { StorefrontProduct } from "@/lib/catalog";
import { inr } from "@/lib/catalog";
import { useMouse } from "@/lib/hooks/use-mouse";
import { Button } from "@/components/ui/button";
import { Product3DViewer } from "@/components/product/product-3d-viewer";
import { useCart } from "@/components/cart/cart-context";
import { ProductCard } from "@/components/product/product-card";
import { Marquee } from "@/components/ui/marquee";
import { Carousel } from "@/components/ui/carousel";
import type { CarouselSlide } from "@/components/ui/carousel";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, align = "left" }: { eyebrow?: string; title: string; align?: "left" | "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </motion.div>
  );
}

function HomeMarquee({ direction = "left" }: { direction?: "left" | "right" }) {
  const words = ["FASHION", "TECH", "LIFESTYLE", "SOVEREIGN", "NEW DROP", "LIMITED", "3D LAB", "RIKAMCHOT"];
  return (
    <div className="border-y border-border bg-card/40 py-3">
      <Marquee speed={28} direction={direction} className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {words.map((w) => (
          <span key={w} className="inline-flex items-center gap-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {w}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function HeroWorld() {
  const { normalized } = useMouse();
  const spring = { stiffness: 60, damping: 20 };
  const moveX = useSpring(normalized.x * 20, spring);
  const moveY = useSpring(normalized.y * 20, spring);

  const titleWords = ["The", "Future", "of", "Everyday", "Commerce."];

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
        className="hero-video z-0"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background/30 to-background/0" />
      <div className="pointer-events-none absolute inset-0 z-10 grain opacity-20" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ x: moveX, y: moveY }}
        className="relative z-20 max-w-6xl"
      >
        <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-9xl">
          {titleWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl"
        >
          Discover fashion, technology and lifestyle through cinematic product stories, interactive 3D and curated sellers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-foreground/30 p-1"
        >
          <div className="h-2 w-full rounded-full bg-foreground/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function EnterTheWorld() {
  const worlds = [
    { id: "fashion", title: "Fashion", subtitle: "Streetwear, footwear & accessories", icon: Shirt, image: "/products/fashion-2.jpg", color: "from-pink/10" },
    { id: "tech", title: "Tech", subtitle: "Audio, wearables & smart devices", icon: Headphones, image: "/products/tech-1.jpg", color: "from-cool-metallic/20" },
    { id: "lifestyle", title: "Lifestyle", subtitle: "Objects for the spaces you live in", icon: Sofa, image: "/products/lifestyle-2.jpg", color: "from-gold/10" },
  ];

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Enter a world" title="Three immersive experiences" />
        <div className="grid gap-5 md:grid-cols-3">
          {worlds.map((world, i) => {
            const Icon = world.icon;
            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
                className="group relative min-h-[460px] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-[0_28px_80px_-12px_rgba(201,162,76,0.18)]"
                data-cursor="explore"
              >
                <Link href={`/shop/${world.id}`} className="absolute inset-0">
                  <Image src={world.image} alt={world.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                  <div className={`absolute inset-0 bg-gradient-to-t ${world.color} via-background/50 to-background/90`} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <motion.span
                      className="w-fit rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <div>
                      <Icon className="h-8 w-8 text-foreground transition-transform duration-500 group-hover:scale-110" />
                      <h3 className="mt-4 font-display text-3xl font-semibold text-foreground">{world.title}</h3>
                      <p className="mt-2 text-muted-foreground transition-colors group-hover:text-foreground/80">{world.subtitle}</p>
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.7]);
  const newDropSlides: CarouselSlide[] = (product.images.length ? product.images : [product.image]).map((src) => ({ type: "image", src, alt: product.name }));

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <TiltCard className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-muted card-glow">
            <motion.div style={{ scale, opacity }} className="relative h-full w-full">
              <Carousel slides={newDropSlides} autoPlay interval={4000} aspect="" className="h-full w-full rounded-[2.5rem]" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute left-6 top-6 z-10"
              >
                <Badge className="bg-background/90 text-foreground backdrop-blur-sm">New Drop</Badge>
              </motion.div>
            </motion.div>
          </TiltCard>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Object 01</p>
            <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
              {product.name}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-3xl font-semibold">{inr(product.price)}</span>
              {product.compareAtPrice && <span className="text-lg text-muted-foreground line-through">{inr(product.compareAtPrice)}</span>}
            </div>
            <div className="mt-8 flex gap-3">
              <Button size="lg" className="rounded-full px-8" data-cursor="add">Add to Bag</Button>
              <Link href={`/product/${product.slug}`}>
                <Button size="lg" variant="white" className="rounded-full px-8" data-cursor="view">View details</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrendingRail({ products }: { products: StorefrontProduct[] }) {
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
      <div className="overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
        <div className="flex w-max gap-5 px-6 lg:px-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[75vw] flex-shrink-0 snap-start sm:w-[45vw] lg:w-[30vw]"
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
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
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            className="aspect-square rounded-[2rem] border border-border bg-background shadow-2xl"
          >
            <Product3DViewer accentColor="#c9a24c" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl font-semibold text-foreground">360° exploration</h3>
            <p className="mt-4 text-muted-foreground">Drag to rotate. Scroll to zoom. Switch materials and colours in real time. The product is no longer a static image.</p>
            <div className="mt-8 space-y-3">
              {["Drag to rotate", "Pinch to zoom", "Tap hotspots for details"].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {feature}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/customize/neon-reign-sneaker">
                <Button className="rounded-full px-8" data-cursor="view">Customize in 3D</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShopByWorld() {
  const worlds = [
    { name: "Street", image: "/products/fashion-1.jpg", span: "col-span-2 row-span-2" },
    { name: "Tech", image: "/products/tech-3.jpg", span: "" },
    { name: "Home", image: "/products/lifestyle-4.jpg", span: "" },
    { name: "Travel", image: "/products/lifestyle-3.jpg", span: "" },
    { name: "Workspace", image: "/products/tech-5.jpg", span: "" },
    { name: "Night", image: "/products/fashion-5.jpg", span: "" },
    { name: "Weekend", image: "/products/fashion-6.jpg", span: "" },
  ];

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Shop by world" title="Worlds to explore" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {worlds.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl border border-border ${w.span || "aspect-square"}`}
              data-cursor="explore"
            >
              <Link href={`/shop/${w.name.toLowerCase()}`} className="absolute inset-0">
                <Image src={w.image} alt={w.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity group-hover:opacity-90" />
                <span className="absolute bottom-4 left-4 font-display text-lg font-medium text-foreground transition-transform group-hover:translate-y-[-2px]">{w.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialStory({ product }: { product: StorefrontProduct }) {
  const editorialSlides: CarouselSlide[] = (product.images.length ? product.images : [product.image]).map((src) => ({ type: "image", src, alt: product.name }));
  editorialSlides.push({ type: "video", src: "/videos/hero-loop.mp4", alt: "Showreel" });

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
            <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Carousel slides={editorialSlides} autoPlay interval={5000} aspect="" className="h-full w-full rounded-[2rem]" />
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="absolute left-[20%] top-[40%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-lg"
                data-cursor="view"
              >
                <PulseRing />
                <PlusIcon />
              </motion.div>
            </TiltCard>
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
            <div className="mt-8 rounded-2xl border border-border bg-card p-4 transition-all hover:border-gold/20 hover:shadow-xl">
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
          <TiltCard className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-muted">
            <Image src={products[0]?.image || "/products/fashion-1.jpg"} alt="Look" fill className="object-cover" unoptimized />
            {products.slice(1, 4).map((p, i) => (
              <motion.button
                key={p.id}
                onMouseEnter={() => setFocus(p.id)}
                onMouseLeave={() => setFocus(null)}
                whileHover={{ scale: 1.3 }}
                className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink shadow-xl"
                style={{ left: `${25 + i * 25}%`, top: `${35 + i * 12}%` }}
                data-cursor="view"
              >
                <PulseRing />
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
          </TiltCard>

          <div className="flex flex-col justify-center">
            <h3 className="font-display text-3xl font-semibold text-foreground">The Sovereign Set</h3>
            <p className="mt-4 text-muted-foreground">Curated pieces that work together. Click any hotspot to add it, or take the full look.</p>
            <div className="mt-8 space-y-4">
              {products.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/product/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg" data-cursor="view">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{inr(p.price)}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold-dark" />
                  </Link>
                </motion.div>
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

function TechShowroom({ product }: { product: StorefrontProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const specs = [
    { label: "Material", value: product.material },
    { label: "Weight", value: "240g" },
    { label: "Connectivity", value: "Bluetooth 5.3" },
    { label: "Battery", value: "30 hours" },
  ];

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
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-xl"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{spec.label}</p>
                  <p className="mt-2 font-display text-xl font-medium text-foreground">{spec.value}</p>
                </motion.div>
              ))}
            </div>
            <Button size="lg" className="mt-8 rounded-full px-8" data-cursor="view">View product</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 aspect-square overflow-hidden rounded-[2rem] bg-muted lg:order-2"
          >
            <TiltCard className="h-full w-full">
              <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LifestyleSpace({ products }: { products: StorefrontProduct[] }) {
  const lifestyleSlides: CarouselSlide[] = [
    { type: "image", src: "/products/lifestyle-4.jpg", alt: "Lifestyle space" },
    { type: "image", src: "/products/lifestyle-2.jpg", alt: "Lifestyle detail" },
    { type: "video", src: "/videos/hero-loop.mp4", alt: "Lifestyle film" },
    { type: "image", src: "/products/lifestyle-5.jpg", alt: "Lifestyle object" },
  ];

  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Lifestyle" title="Spatial commerce" />
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border bg-muted">
          <Carousel slides={lifestyleSlides} autoPlay interval={6000} aspect="" className="absolute inset-0 h-full w-full rounded-[2rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/30" />
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
                <PulseDot className="h-4 w-4 rounded-full border-2 border-background shadow-lg" />
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
            <Badge className="border-background/20 bg-background/10 text-gold">Limited drop</Badge>
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
              <Button className="rounded-full bg-gold px-8 text-ink hover:bg-gold-soft hover:shadow-[0_0_40px_rgba(201,162,76,0.35)]">Secure now</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square overflow-hidden rounded-[2rem]"
          >
            <TiltCard className="h-full w-full">
              <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CommunityGrid() {
  const images = ["/products/fashion-1.jpg", "/products/tech-1.jpg", "/products/lifestyle-2.jpg", "/products/fashion-4.jpg", "/products/tech-5.jpg", "/products/lifestyle-5.jpg"];
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
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl break-inside-avoid"
              data-cursor="explore"
            >
              <Image src={src} alt="Community" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipClub() {
  const benefits = ["Early access", "Private drops", "Member products", "Exclusive rewards"];
  return (
    <section className="overflow-hidden px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] border border-border bg-card px-8 py-16 text-center lg:px-16 lg:py-24 card-glow"
          whileHover={{ y: -4 }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/5 via-transparent to-cool-metallic/5" />
          <Badge className="mb-6">Membership</Badge>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Join the inner circle.
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
                className="rounded-2xl border border-border bg-background p-6 transition-all"
              >
                <Star className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-display font-medium text-foreground">{benefit}</p>
              </motion.div>
            ))}
          </div>
          <Button size="lg" className="mt-10 rounded-full px-8" data-cursor="add">Become a member</Button>
        </motion.div>
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
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
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
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground ring-4 ring-background md:left-1/2" />
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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[140px]" />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-9xl"
      >
        Discover
        <br />
        <span className="text-gradient-gold">what&apos;s next.</span>
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
      <HeroWorld />
      <HomeMarquee />
      <EnterTheWorld />
      <HomeMarquee direction="right" />
      <NewDrop product={newDrop} />
      <TrendingRail products={trending} />
      <Product3DLab />
      <ShopByWorld />
      <HomeMarquee />
      <EditorialStory product={newDrop} />
      <CompleteTheLook products={lookProducts} />
      <TechShowroom product={techProduct} />
      <LifestyleSpace products={lifestyle} />
      <LimitedDrop product={limited} />
      <HomeMarquee direction="right" />
      <CommunityGrid />
      <MembershipClub />
      <BrandStory />
      <HomeMarquee />
      <FinalCTA />
    </main>
  );
}
