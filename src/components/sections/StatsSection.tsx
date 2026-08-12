import { brands } from "@/lib/data/brands";
import { yearsInBusiness } from "@/lib/company";

/**
 * The only place on the site that quantifies the range. Every other surface
 * routes to a brand instead of counting products — the catalogue holds a
 * sample, so per-category and per-brand counts understated the offer.
 */
const stats = [
  { value: `${brands.length}`, label: "Branduri distribuite" },
  { value: `${yearsInBusiness()}+`, label: "Ani de experiență" },
  { value: "5.000+", label: "Produse disponibile" },
  { value: "48h", label: "Răspuns la oferte" },
];

export function StatsSection() {
  return (
    <section
      className="bg-white border-b border-border"
      aria-label="Cifre cheie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-extrabold text-4xl md:text-5xl text-brand leading-none">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-muted uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
