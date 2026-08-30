"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Package, MapPin, Heart, CreditCard, User, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";

const menu = [
  { label: "Orders", icon: Package, href: "/account/orders", desc: "Track and manage your purchases" },
  { label: "Wishlist", icon: Heart, href: "/wishlist", desc: "Saved products and lists" },
  { label: "Addresses", icon: MapPin, href: "/account/addresses", desc: "Shipping and billing addresses" },
  { label: "Payment methods", icon: CreditCard, href: "/account/payment", desc: "Saved cards and UPI" },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {user ? `Welcome, ${user.name}` : "Welcome back"}
              </h1>
              <p className="text-muted-foreground">
                {user ? user.email : "Manage your RIKAMCHOT account"}
              </p>
            </div>
          </div>
          {user && (
            <Button variant="outline" onClick={handleLogout} className="rounded-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          )}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/30 hover:bg-muted hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
                >
                  <Icon className="h-6 w-6 text-gold transition-transform group-hover:scale-110" />
                  <h3 className="mt-4 font-display text-lg font-medium text-foreground">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
