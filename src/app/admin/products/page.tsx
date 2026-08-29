"use client";

import { getProducts } from "@/lib/catalog";
import { useEffect, useState } from "react";
import { StorefrontProduct, inr } from "@/lib/catalog";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<StorefrontProduct[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Products</h1>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
                        <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" unoptimized={p.image.startsWith("/")} />
                      </div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{p.categoryName}</td>
                  <td className="p-4">{inr(p.price)}</td>
                  <td className="p-4">{p.variants.reduce((sum, v) => sum + v.stock, 0)}</td>
                  <td className="p-4"><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">Approved</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
