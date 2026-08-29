"use client";

import Link from "next/link";

const links = [
  { label: "Shop Fashion", href: "/shop/fashion" },
  { label: "Shop Tech", href: "/shop/tech" },
  { label: "Shop Lifestyle", href: "/shop/lifestyle" },
  { label: "New Arrivals", href: "/new" },
  { label: "Sell on RIKAMCHOT", href: "/seller/onboarding" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
              RIKAMCHOT
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A premium digital retail world for fashion, technology and lifestyle.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Discover</h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {links.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">For Sellers</h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              <li>
                <Link href="/seller/onboarding" className="hover:text-gold transition-colors">
                  Become a seller
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-gold transition-colors">
                  Seller dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold transition-colors">
                  Admin
                </Link>
              </li>
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
