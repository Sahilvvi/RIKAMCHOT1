"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SORTS, type SortId } from "@/lib/catalog";

export function SortSelect({ value }: { value?: SortId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    const next = e.target.value as SortId | "";
    if (next) {
      params.set("sort", next);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={value || ""}
      onChange={handleChange}
      className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/50"
    >
      <option value="">Sort by</option>
      {SORTS.map((sort) => (
        <option key={sort.id} value={sort.id}>
          {sort.label}
        </option>
      ))}
    </select>
  );
}
