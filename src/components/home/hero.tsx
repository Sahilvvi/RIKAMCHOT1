"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* ambient background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[40vh] rounded-full bg-pink/10 blur-[80px]" />
        <div className="absolute right-0 top-0 h-[35vh] w-[35vh] rounded-full bg-gold-soft/10 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-charcoal/50 px-4 py-1.5 text-xs font-medium tracking-widest text-gold uppercase backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Premium multi-vendor marketplace
        </span>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          Discover. Interact. <br />
          <span className="text-gradient-gold">Understand.</span> Buy.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A premium digital retail world for fashion, technology and lifestyle. Curated sellers, cinematic product stories and immersive discovery — without the marketplace friction.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group rounded-full px-8">
            Explore Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-white/10 text-foreground hover:bg-white/5 hover:text-foreground">
            Discover What&apos;s New
          </Button>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-muted-foreground/30 p-1"
        >
          <div className="h-2 w-full rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
