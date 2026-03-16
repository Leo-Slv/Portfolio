import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 hover:scale-105 hover:text-[#fffffe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f5af0] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white border-b-4 border-r-4 border-black text-xs sm:text-base lg:text-xl px-8 py-4 mb-2",
        outline:
          "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.9)] rounded-full h-10 px-4 text-sm font-semibold hover:bg-[rgba(255,255,255,0.1)] hover:-translate-y-0.5",
        primary:
          "rounded-full h-10 px-4 text-sm font-semibold bg-[rgba(127,90,240,0.2)] border border-[rgba(127,90,240,0.35)] text-white hover:bg-[rgba(127,90,240,0.35)] hover:-translate-y-0.5",
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
