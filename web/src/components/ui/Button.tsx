"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-brand text-white hover:bg-brand-dark active:scale-[0.98]",
      outline:
        "border-2 border-brand text-brand hover:bg-brand hover:text-white",
      ghost:
        "text-charcoal hover:bg-surface-dark",
      danger:
        "bg-red-700 text-white hover:bg-red-800",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-sm",
      md: "px-6 py-3 text-base rounded-sm",
      lg: "px-8 py-4 text-lg rounded-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
