"use client";

import Link from "next/link";

const discover = [
  { label: "Shop Fashion", href: "/shop/fashion" },
  { label: "Shop Tech", href: "/shop/tech" },
  { label: "Shop Lifestyle", href: "/shop/lifestyle" },
  { label: "New Arrivals", href: "/new" },
  { label: "Sale", href: "/sale" },
];

const seller = [
  { label: "Become a seller", href: "/seller/onboarding" },
  { label: "Seller dashboard", href: "/seller/dashboard" },
  { label: "Admin", href: "/admin" },
  { label: "Super Admin", href: "/super-admin" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
              RIKAMCHOT
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A premium digital retail world for fashion, technology and lifestyle. Curated sellers, cinematic product stories and immersive discovery.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Discover</h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {discover.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-dark transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">For Sellers</h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {seller.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-dark transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} RIKAMCHOT. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/support" className="hover:text-foreground transition-colors">Help Center</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
