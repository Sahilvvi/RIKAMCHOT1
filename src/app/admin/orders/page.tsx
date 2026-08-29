"use client";

import { inr } from "@/lib/catalog";

const orders = [
  { id: "RC-1001", customer: "Aarav Mehta", seller: "RIKAMCHOT House", total: 4599, status: "Delivered" },
  { id: "RC-1002", customer: "Priya Shah", seller: "Sovereign Studio", total: 2299, status: "Shipped" },
  { id: "RC-1003", customer: "Kabir Rao", seller: "RIKAMCHOT House", total: 6999, status: "Processing" },
];

function statusColor(status: string) {
  switch (status) {
    case "Delivered": return "bg-emerald-500/10 text-emerald-400";
    case "Shipped": return "bg-gold/10 text-gold";
    default: return "bg-muted text-muted-foreground";
  }
}

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Orders</h1>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm text-left text-muted-foreground">
            <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Seller</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-foreground">{o.id}</td>
                  <td className="p-4">{o.customer}</td>
                  <td className="p-4">{o.seller}</td>
                  <td className="p-4">{inr(o.total)}</td>
                  <td className="p-4"><span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(o.status)}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
