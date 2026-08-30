"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window !== "undefined") {
    const id = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(id);
  }
  return () => {};
}

function getSnapshot() {
  return typeof window !== "undefined";
}

function getServerSnapshot() {
  return false;
}

export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
