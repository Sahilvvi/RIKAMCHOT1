"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="font-display text-3xl font-semibold text-foreground">Something went wrong</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        We couldn&apos;t load this section. Try again or return home.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/" className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:bg-gold/5">
          Home
        </Link>
      </div>
    </div>
  );
}
