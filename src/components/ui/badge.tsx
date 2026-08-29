import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gold/10 text-gold border border-gold/20",
        secondary: "bg-charcoal text-foreground border border-border",
        success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        destructive: "bg-pink/10 text-pink border border-pink/20",
        outline: "border border-border text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
