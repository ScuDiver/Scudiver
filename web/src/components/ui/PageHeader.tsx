import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export function PageHeader({ title, subtitle, className, dark }: PageHeaderProps) {
  return (
    <section
      className={cn(
        "py-16 border-b border-border",
        dark ? "bg-charcoal text-white" : "bg-surface",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className={cn(
            "font-display font-bold text-4xl md:text-5xl uppercase tracking-tight leading-none",
            dark ? "text-white" : "text-charcoal"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-4 text-lg max-w-2xl",
              dark ? "text-white/70" : "text-muted"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
