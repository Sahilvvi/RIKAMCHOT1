"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

const nav = [
  { label: "Fashion", href: "/shop/fashion" },
  { label: "Tech", href: "/shop/tech" },
  { label: "Lifestyle", href: "/shop/lifestyle" },
  { label: "New Arrivals", href: "/new" },
];

export function Header() {
  const { openCart, count } = useCart();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 lg:px-10"
    >
      <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
        RIKAMCHOT
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button aria-label="Search" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Search className="h-5 w-5" />
        </button>
        <button aria-label="Wishlist" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <User className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Open cart"
          onClick={openCart}
          className="relative p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
