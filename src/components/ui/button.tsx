import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-ink hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(201,162,76,0.22)] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:border-gold/30 hover:bg-muted active:scale-[0.98]",
        outline:
          "border border-border bg-background hover:border-gold/50 hover:bg-gold/5 text-foreground active:scale-[0.98]",
        ghost:
          "hover:bg-gold/5 hover:text-gold-dark text-foreground active:scale-[0.98]",
        destructive:
          "bg-pink text-white hover:bg-pink/90 active:scale-[0.98]",
        white:
          "bg-white text-ink border border-border hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 rounded-lg",
        lg: "h-14 px-8 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
