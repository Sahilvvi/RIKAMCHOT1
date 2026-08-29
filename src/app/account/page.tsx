"use client";

import Link from "next/link";
import { Package, MapPin, Heart, CreditCard, User } from "lucide-react";

const menu = [
  { label: "Orders", icon: Package, href: "/account/orders", desc: "Track and manage your purchases" },
  { label: "Wishlist", icon: Heart, href: "/wishlist", desc: "Saved products and lists" },
  { label: "Addresses", icon: MapPin, href: "/account/addresses", desc: "Shipping and billing addresses" },
  { label: "Payment methods", icon: CreditCard, href: "/account/payment", desc: "Saved cards and UPI" },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <User className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Welcome back
            </h1>
            <p className="text-muted-foreground">Manage your RIKAMCHOT account</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold/30 hover:bg-muted"
              >
                <Icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-display text-lg font-medium text-foreground">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
