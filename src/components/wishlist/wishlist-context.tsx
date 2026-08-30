"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

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

const STORAGE_KEY = "rikwishlist";
const CHANGE_EVENT = "rikamchot-wishlist-change";

let cache: WishlistItem[] = [];

function readStorage(): { items: WishlistItem[]; key: string | null } {
  if (typeof window === "undefined") return { items: [], key: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { items: JSON.parse(raw) as WishlistItem[], key: raw };
    return { items: [], key: null };
  } catch {
    return { items: [], key: null };
  }
}

function refreshCache() {
  cache = readStorage().items;
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot() {
  return [];
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const wrapped = () => {
    refreshCache();
    callback();
  };
  window.addEventListener("storage", wrapped);
  window.addEventListener(CHANGE_EVENT, wrapped);
  return () => {
    window.removeEventListener("storage", wrapped);
    window.removeEventListener(CHANGE_EVENT, wrapped);
  };
}

function persist(items: WishlistItem[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      refreshCache();
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {}
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    refreshCache();
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const add = useCallback((item: WishlistItem) => {
    const next = items.some((i) => i.productId === item.productId) ? items : [...items, item];
    persist(next);
  }, [items]);

  const remove = useCallback((productId: string) => {
    const next = items.filter((i) => i.productId !== productId);
    persist(next);
  }, [items]);

  const toggle = useCallback((item: WishlistItem) => {
    const exists = items.some((i) => i.productId === item.productId);
    const next = exists ? items.filter((i) => i.productId !== item.productId) : [...items, item];
    persist(next);
  }, [items]);

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
