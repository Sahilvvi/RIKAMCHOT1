"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export type CarouselSlide = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export function Carousel({
  slides,
  autoPlay = false,
  interval = 5000,
  aspect = "aspect-[16/9]",
  showControls = true,
  className = "",
}: {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  aspect?: string;
  showControls?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, slides.length]);

  if (!slides.length) return null;
  const current = slides[index];

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-border bg-muted ${aspect} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {current.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={current.poster}
              className="h-full w-full object-cover"
            >
              <source src={current.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={current.src}
              alt={current.alt || "Carousel image"}
              fill
              className="object-cover"
              unoptimized={current.src.startsWith("/")}
              priority
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showControls && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-gold hover:text-ink group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-gold hover:text-ink group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      )}

      {current.type === "video" && (
        <div className="pointer-events-none absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
          <Play className="h-3.5 w-3.5 fill-foreground text-foreground" />
        </div>
      )}
    </div>
  );
}
