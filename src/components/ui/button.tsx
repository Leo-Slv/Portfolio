import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-af-sm border border-white/10 surface-depth bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition-af focus-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/[0.08] hover:text-white [&_svg]:size-4 [&_svg]:text-white/80 [&_svg]:group-hover:text-accent",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "bg-surface border-white/10 hover:brightness-110 text-white",
        accent:
          "bg-accent-soft-15 border-accent-soft-25 text-white hover:bg-accent-soft-25 hover:border-accent-soft-35",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
