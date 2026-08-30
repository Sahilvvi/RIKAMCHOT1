"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { useAuth } from "@/components/auth/auth-context";

const nav = [
  { label: "Fashion", href: "/shop/fashion" },
  { label: "Tech", href: "/shop/tech" },
  { label: "Lifestyle", href: "/shop/lifestyle" },
  { label: "New Arrivals", href: "/new" },
];

export function Header() {
  const { openCart, count } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-10 ${
        isHome ? "bg-transparent" : "glass-white"
      }`}
    >
      <Link href="/" className="font-display text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
        RIKAMCHOT
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 lg:gap-4">
        <Link href="/search" aria-label="Search" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-gold/5 hover:text-foreground" data-cursor="open">
          <Search className="h-5 w-5" />
        </Link>
        <Link href="/wishlist" aria-label="Wishlist" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-gold/5 hover:text-foreground" data-cursor="open">
          <Heart className="h-5 w-5" />
        </Link>
        <Link
          href={user ? "/account" : "/login"}
          aria-label="Account"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-gold/5 hover:text-foreground"
          data-cursor="open"
        >
          <User className="h-5 w-5" />
        </Link>
        <button
          type="button"
          aria-label="Open cart"
          onClick={openCart}
          className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-gold/5 hover:text-foreground"
          data-cursor="open"
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
