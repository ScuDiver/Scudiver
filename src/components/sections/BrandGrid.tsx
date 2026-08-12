import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands } from "@/lib/data/brands";
import { BrandCard } from "@/components/brands/BrandCard";

export function BrandGrid() {
  return (
    <section className="bg-charcoal py-16" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-1">
              Branduri distribuite
            </p>
            <h2
              id="brands-heading"
              className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none"
            >
              Mărcile pe care le furnizăm
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/60 leading-relaxed">
              Lucrăm direct cu {brands.length} producători europeni și
              internaționali de scule, echipament de protecție, aparataj electric
              și chimie de construcții. Fiecare marcă are pagina ei, cu produsele
              pe care le livrăm curent.
            </p>
          </div>
          <Link
            href="/branduri"
            className="hidden md:flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white hover:text-brand transition-colors"
          >
            Toate brandurile <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {brands.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} priority={i < 5} />
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/branduri"
            className="flex items-center justify-center gap-2 w-full bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
          >
            Toate brandurile <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
