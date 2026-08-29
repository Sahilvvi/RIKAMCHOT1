"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

const nav = [
  { label: "Fashion", href: "/shop/fashion" },
  { label: "Tech", href: "/shop/tech" },
  { label: "Lifestyle", href: "/shop/lifestyle" },
  { label: "New Arrivals", href: "/new" },
];

export function Header() {
  const { openCart, count } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-10 ${
        isHome ? "" : "glass"
      }`}
    >
      <Link href="/" className="font-display text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
        RIKAMCHOT
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 lg:gap-4">
        <Link href="/search" aria-label="Search" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Search className="h-5 w-5" />
        </Link>
        <Link href="/wishlist" aria-label="Wishlist" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Heart className="h-5 w-5" />
        </Link>
        <Link href="/account" aria-label="Account" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <User className="h-5 w-5" />
        </Link>
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
