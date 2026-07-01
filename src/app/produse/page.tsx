import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Catalog Produse",
  description:
    "Catalog complet de scule electrice, scule de mână, burghie, truse și accesorii pentru construcții. Specificații tehnice complete.",
};

export default function ProdusePage() {
  return (
    <>
      <PageHeader
        title="Catalog Produse"
        subtitle="Scule electrice, scule de mână, burghie și accesorii pentru construcții — cu specificații tehnice complete."
        dark
      />

      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catProducts = products.filter(
                (p) => p.categorySlug === cat.slug
              );
              return (
                <Link
                  key={cat.slug}
                  href={`/produse/${cat.slug}`}
                  className="group bg-white border border-border rounded-sm overflow-hidden card-hover"
                >
                  {/* Red accent bar */}
                  <div className="h-1 bg-border group-hover:bg-brand transition-colors" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl" role="img" aria-label={cat.name}>
                        {cat.icon}
                      </span>
                      <div>
                        <h2 className="font-display font-bold text-xl text-charcoal uppercase leading-tight group-hover:text-brand transition-colors">
                          {cat.name}
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {cat.description}
                    </p>

                    {/* Sample products */}
                    <ul className="space-y-1 mb-4">
                      {catProducts.slice(0, 3).map((p) => (
                        <li
                          key={p.id}
                          className="text-xs text-charcoal/70 flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
                          {p.name}
                        </li>
                      ))}
                      {catProducts.length > 3 && (
                        <li className="text-xs text-muted italic">
                          + {catProducts.length - 3} alte produse...
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Vezi categoria ({catProducts.length} produse){" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
