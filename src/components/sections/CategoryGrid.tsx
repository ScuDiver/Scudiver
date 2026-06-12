import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";

export function CategoryGrid() {
  return (
    <section className="bg-surface py-16" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-1">
              Catalog
            </p>
            <h2
              id="categories-heading"
              className="font-display font-extrabold text-4xl md:text-5xl text-charcoal uppercase leading-none"
            >
              Categorii de Produse
            </h2>
          </div>
          <Link
            href="/produse"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            aria-label="Vezi toate categoriile de produse"
          >
            Toate produsele <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produse/${cat.slug}`}
              className="group bg-white border border-border rounded-sm p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl" role="img" aria-label={cat.name}>
                  {cat.icon}
                </span>
                <span className="text-xs font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  CPV: {cat.cpvCode}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal uppercase leading-tight mb-2 group-hover:text-brand transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                <span>
                  {cat.productCount} produse
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/produse"
            className="flex items-center justify-center gap-2 w-full bg-charcoal text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-charcoal-mid transition-colors"
          >
            Toate produsele <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
