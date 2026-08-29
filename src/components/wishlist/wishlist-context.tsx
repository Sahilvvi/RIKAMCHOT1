"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type WishlistItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

type WishlistContextValue = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (productId: string) => void;
  toggle: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("rikwishlist");
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem("rikwishlist", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((item: WishlistItem) => {
    setItems((prev) => (prev.some((i) => i.productId === item.productId) ? prev : [...prev, item]));
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.productId === item.productId);
      return exists ? prev.filter((i) => i.productId !== item.productId) : [...prev, item];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => items.some((i) => i.productId === productId), [items]);

  const count = useMemo(() => items.length, [items]);

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, isInWishlist, count }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
