"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
  pauseOnHover = false,
}: {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`group flex overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
