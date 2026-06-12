import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "dark" | "outline" | "muted";
  className?: string;
}

export function Badge({ children, variant = "brand", className }: BadgeProps) {
  const variants = {
    brand: "bg-brand/10 text-brand border border-brand/20",
    dark: "bg-charcoal text-white",
    outline: "border border-border text-muted",
    muted: "bg-surface text-muted border border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-sm uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
