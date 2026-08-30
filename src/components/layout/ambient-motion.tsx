"use client";

import { motion } from "framer-motion";

export function AmbientMotion() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-[10vw] top-[10vh] h-[50vh] w-[50vh] rounded-full bg-gold/[0.08] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5vw] top-[20vh] h-[40vh] w-[40vh] rounded-full bg-cool-metallic/[0.08] blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10vh] left-[30vw] h-[35vh] w-[35vh] rounded-full bg-foreground/[0.03] blur-[90px]"
      />
    </div>
  );
}
