import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-mono text-[14px] font-medium leading-none tracking-[0.02em] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-ink text-canvas hover:bg-ink-deep h-9 px-5",
        secondary: "bg-canvas text-ink border border-hairline-strong hover:bg-surface-soft h-9 px-5",
        ghost: "bg-transparent text-mute hover:text-ink hover:bg-surface-soft h-9 px-4",
        tab: "bg-transparent text-mute hover:text-ink rounded-none border-b-2 border-transparent data-[active=true]:text-ink data-[active=true]:border-ink h-9 px-4",
        dark: "bg-surface-dark text-on-dark hover:bg-charcoal h-9 px-5",
      },
      size: {
        default: "",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-10 px-6",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

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
