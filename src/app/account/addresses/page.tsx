"use client";

import { MapPin, Plus } from "lucide-react";

const addresses = [
  { id: "1", label: "Home", line: "12B, Palm Grove Avenue", city: "Mumbai", pin: "400001", default: true },
];

export default function AddressesPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Saved addresses
        </h1>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                {addr.default && <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-gold">Default</span>}
              </div>
              <h3 className="mt-4 font-display font-medium text-foreground">{addr.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {addr.line}<br />{addr.city}, {addr.pin}
              </p>
            </div>
          ))}
          <button
            type="button"
            className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-5 text-muted-foreground transition-colors hover:border-gold/30 hover:text-foreground"
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">Add new address</span>
          </button>
        </div>
      </div>
    </main>
  );
}
