"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt, Headphones, Sofa } from "lucide-react";

const worlds = [
  {
    id: "fashion",
    title: "Fashion",
    subtitle: "Editorial streetwear, footwear & accessories",
    icon: Shirt,
    gradient: "from-pink/20 via-background to-background",
    accent: "text-pink",
  },
  {
    id: "tech",
    title: "Tech",
    subtitle: "Audio, wearables, gadgets & smart devices",
    icon: Headphones,
    gradient: "from-gold/20 via-background to-background",
    accent: "text-gold",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    subtitle: "Furniture, travel, home & everyday objects",
    icon: Sofa,
    gradient: "from-gold-soft/20 via-background to-background",
    accent: "text-gold-soft",
  },
];

export function CategoryWorlds() {
  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Enter a world
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three immersive category experiences, each designed around how the product is discovered and understood.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {worlds.map((world, index) => {
            const Icon = world.icon;
            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/shop/${world.id}`}
                  className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 transition-colors hover:border-gold/30"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${world.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                  />

                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className={`h-6 w-6 ${world.accent}`} />
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-medium text-foreground">
                      {world.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{world.subtitle}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                      Explore
                      <span className="text-lg">→</span>
                    </span>
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
