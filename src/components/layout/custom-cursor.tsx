"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "view" | "explore" | "drag" | "play" | "add" | "open" | "image";

function supportsCustomCursor() {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia("(pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mql.matches && !reduced.matches;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(supportsCustomCursor);
  const [state, setState] = useState<CursorState>("default");
  const [isPressed, setIsPressed] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onChange = () => setEnabled(mql.matches && !reduced.matches);
    mql.addEventListener("change", onChange);
    reduced.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursor = target?.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
      setState(cursor || "default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  const label = {
    default: "",
    view: "VIEW",
    explore: "EXPLORE",
    drag: "DRAG",
    play: "PLAY",
    add: "ADD",
    open: "OPEN",
    image: "IMAGE",
  }[state];

  return (
    <>
      <style jsx global>{`
        .cursor-none,
        .cursor-none * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: state !== "default" ? (isPressed ? 0.85 : 1.3) : isPressed ? 0.9 : 1,
            width: label ? 72 : 12,
            height: label ? 72 : 12,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex items-center justify-center rounded-full bg-foreground text-background"
        >
          {label && (
            <span className="text-[9px] font-bold tracking-widest text-background">{label}</span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
