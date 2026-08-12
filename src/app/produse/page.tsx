import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { getBrandsForCategory } from "@/lib/data/brands";
import { PageHeader } from "@/components/ui/PageHeader";
import { BrandCarousel } from "@/components/sections/BrandCarousel";

export const metadata: Metadata = {
  title: "Domenii de Furnizare",
  description:
    "Scule electrice, scule de mână, burghie, truse, echipament de protecție, sudură, aparataj electric, vopsele și consumabile — brandurile care acoperă fiecare domeniu și codul CPV aferent.",
  alternates: { canonical: "/produse" },
};

export default function ProdusePage() {
  return (
    <>
      <PageHeader
        title="Domenii de Furnizare"
        subtitle="Fiecare domeniu duce la brandurile care îl acoperă. Furnizăm gama completă a fiecărui brand — cereți ofertă pentru orice referință, chiar dacă nu apare pe site."
        dark
      />

      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catBrands = getBrandsForCategory(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/produse/${cat.slug}`}
                  className="group bg-white border border-border rounded-sm overflow-hidden card-hover flex flex-col"
                >
                  {/* Red accent bar */}
                  <div className="h-1 bg-border group-hover:bg-brand transition-colors" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl" role="img" aria-label={cat.name}>
                        {cat.icon}
                      </span>
                      <div>
                        <h2 className="font-display font-bold text-xl text-charcoal uppercase leading-tight group-hover:text-brand transition-colors">
                          {cat.name}
                        </h2>
                        <p className="text-[11px] font-mono font-semibold text-muted mt-0.5">
                          CPV {cat.cpvCode}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                      {cat.description}
                    </p>

                    {/* Brands covering this domain — the actual route in */}
                    {catBrands.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-2">
                          Branduri
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {catBrands.map((brand) => (
                            <li
                              key={brand.slug}
                              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2 py-1 text-xs font-semibold text-charcoal/80"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: brand.accent }}
                                aria-hidden="true"
                              />
                              {brand.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Vezi brandurile{" "}
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

          {/* Nothing on this page is an exhaustive list — say so, and give a way out */}
          <div className="mt-10 bg-white border border-border rounded-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-charcoal uppercase leading-none">
                Nu găsiți domeniul căutat?
              </h2>
              <p className="mt-2 text-sm text-muted max-w-2xl">
                Portofoliul depășește domeniile listate aici. Trimiteți lista de
                produse sau caietul de sarcini și revenim cu ofertă în 48 de ore.
              </p>
            </div>
            <Link
              href="/cerere-oferta"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cere Ofertă <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <BrandCarousel />
    </>
  );
}
