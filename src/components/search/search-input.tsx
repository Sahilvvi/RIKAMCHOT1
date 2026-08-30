"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params?.get("q") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fashion, tech, lifestyle..."
        className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-6 text-sm text-foreground outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-gold"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}
