"use client";

import { createContext, useContext, ReactNode, useEffect, useSyncExternalStore, useCallback } from "react";
import type { CartItem } from "@/components/cart/cart-context";

export type OrderStatus = "confirmed" | "processing" | "shipped" | "out-for-delivery" | "delivered";

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
};

type OrderContextValue = {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  createOrder: (items: CartItem[], shipping: number) => Order;
  clearOrders: () => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

const STORAGE_KEY = "rikamchot:orders";
const CHANGE_EVENT = "rikamchot-orders-change";

let cacheOrders: Order[] = [];

function readStorage(): { orders: Order[]; key: string | null } {
  if (typeof window === "undefined") return { orders: [], key: null };
  try {
    const key = localStorage.getItem(STORAGE_KEY);
    if (key) return { orders: JSON.parse(key) as Order[], key };
    return { orders: [], key: null };
  } catch {
    return { orders: [], key: null };
  }
}

function refreshCache() {
  const { orders } = readStorage();
  cacheOrders = orders;
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

function getSnapshot() {
  return cacheOrders;
}

function getServerSnapshot() {
  return [];
}

function generateId() {
  const ts = Date.now().toString(36).slice(-6);
  const rand = Math.random().toString(36).slice(2, 6);
  return `rc-${ts}-${rand}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    refreshCache();
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const orders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id.toLowerCase() === id.toLowerCase()),
    [orders]
  );

  const createOrder = useCallback((items: CartItem[], shipping: number) => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal + shipping;
    const now = new Date();
    const order: Order = {
      id: generateId(),
      items,
      subtotal,
      shipping,
      total,
      status: "confirmed",
      createdAt: now.toISOString(),
      estimatedDelivery: formatDate(addDays(now, 3)),
    };
    if (typeof window !== "undefined") {
      const next = [order, ...readStorage().orders];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      refreshCache();
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
    return order;
  }, []);

  const clearOrders = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      refreshCache();
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, getOrder, createOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
}
