"use client";

export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-3 w-3 ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
      <span className="relative inline-flex h-full w-full rounded-full bg-gold" />
    </span>
  );
}

export function PulseRing({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute inset-0 inline-flex items-center justify-center rounded-full ${className}`}>
      <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-40" />
      <span className="absolute inset-1 rounded-full bg-gold" />
    </span>
  );
}
