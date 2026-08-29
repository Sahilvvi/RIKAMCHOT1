"use client";

import { Store, ShieldCheck } from "lucide-react";

const sellers = [
  { name: "RIKAMCHOT House", status: "Active", rating: 4.9, verified: true },
  { name: "Sovereign Studio", status: "Active", rating: 4.7, verified: true },
  { name: "TechCraft India", status: "Pending", rating: 0, verified: false },
];

export default function AdminSellersPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sellers</h1>
        <div className="mt-8 space-y-4">
          {sellers.map((s) => (
            <div key={s.name} className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Store className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-medium text-foreground">{s.name}</p>
                    {s.verified && <ShieldCheck className="h-4 w-4 text-gold" />}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {s.rating > 0 ? `${s.rating} ★` : "No reviews"} · {s.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {s.status === "Pending" ? (
                  <>
                    <button type="button" className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-ink">Approve</button>
                    <button type="button" className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground">Review</button>
                  </>
                ) : (
                  <button type="button" className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground">Manage</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
