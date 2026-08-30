"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

const nav = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Search", icon: Search, href: "/search" },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
  { label: "Account", icon: User, href: "/account" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { openCart, count } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-white md:hidden">
      <nav className="mx-auto flex max-w-md items-center justify-around px-2 pb-2 pt-2">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl py-2.5 px-3 text-[10px] font-medium transition-colors ${
                active ? "text-gold-dark" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 py-2.5 px-3 text-[10px] font-medium text-muted-foreground"
        >
          <ShoppingBag className="h-5 w-5" />
          Bag
          {count > 0 && (
            <span className="absolute right-1 top-1 h-4 min-w-[1rem] rounded-full bg-gold px-1 text-[9px] font-bold text-ink">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}
