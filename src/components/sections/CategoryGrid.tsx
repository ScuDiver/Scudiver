import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Wrench,
  Settings,
  Package,
  ShieldCheck,
  Layers,
  Link2,
  Flame,
  Plug,
  Paintbrush,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { getBrandsForCategory } from "@/lib/data/brands";

interface Visual {
  gradient: string;
  Icon: LucideIcon;
}

/**
 * Gradient + icon rather than photography. Category photos used to carry
 * manufacturer signage baked into the image, which promised one brand — or one
 * product type — and delivered another. Photographs now belong to brand cards,
 * where the picture and the destination are the same thing.
 */
const visuals: Record<string, Visual> = {
  "scule-electrice": {
    gradient: "linear-gradient(135deg, #D32027 0%, #8B1419 100%)",
    Icon: Zap,
  },
  "scule-de-mana": {
    gradient: "linear-gradient(135deg, #374151 0%, #1A1A1A 100%)",
    Icon: Wrench,
  },
  "burghie-si-accesorii": {
    gradient: "linear-gradient(135deg, #4B5563 0%, #1F2937 100%)",
    Icon: Settings,
  },
  "truse-de-scule": {
    gradient: "linear-gradient(135deg, #B45309 0%, #78350F 100%)",
    Icon: Package,
  },
  "echipament-de-protectie": {
    gradient: "linear-gradient(135deg, #EA580C 0%, #9A3412 100%)",
    Icon: ShieldCheck,
  },
  sudura: {
    gradient: "linear-gradient(135deg, #0069B4 0%, #013A63 100%)",
    Icon: Flame,
  },
  "aparataj-electric": {
    gradient: "linear-gradient(135deg, #0F766E 0%, #134E4A 100%)",
    Icon: Plug,
  },
  "vopsele-si-accesorii": {
    gradient: "linear-gradient(135deg, #15803D 0%, #14532D 100%)",
    Icon: Paintbrush,
  },
  consumabile: {
    gradient: "linear-gradient(135deg, #64748B 0%, #334155 100%)",
    Icon: Layers,
  },
  "elemente-de-asamblare": {
    gradient: "linear-gradient(135deg, #78716C 0%, #292524 100%)",
    Icon: Link2,
  },
};

/** Brand names named on the card before the rest are rolled into a "+N". */
const BRANDS_NAMED = 3;

export function CategoryGrid() {
  return (
    <section className="bg-surface py-16" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-1">
              Domenii de furnizare
            </p>
            <h2
              id="categories-heading"
              className="font-display font-extrabold text-4xl md:text-5xl text-charcoal uppercase leading-none"
            >
              Ce Furnizăm
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted leading-relaxed">
              Fiecare domeniu duce la brandurile care îl acoperă. Cereți ofertă
              pentru orice referință din gama unui brand, nu doar pentru ce
              apare pe site.
            </p>
          </div>
          <Link
            href="/produse"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            aria-label="Vezi toate domeniile de furnizare"
          >
            Toate domeniile <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const vis = visuals[cat.slug] ?? {
              gradient: "linear-gradient(135deg, #374151 0%, #1A1A1A 100%)",
              Icon: Package,
            };
            const { Icon } = vis;
            const catBrands = getBrandsForCategory(cat.slug);
            const named = catBrands.slice(0, BRANDS_NAMED);
            const extra = catBrands.length - named.length;

            return (
              <Link
                key={cat.slug}
                href={`/produse/${cat.slug}`}
                className="group bg-white border border-border rounded-sm overflow-hidden card-hover flex flex-col"
              >
                {/* Visual header */}
                <div
                  className="relative h-28 flex items-center justify-center overflow-hidden"
                  style={{ background: vis.gradient }}
                >
                  {/* Diagonal stripe overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                      backgroundSize: "12px 12px",
                    }}
                    aria-hidden="true"
                  />
                  {/* Grid dot pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                  />
                  <Icon
                    size={44}
                    className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-charcoal uppercase leading-tight mb-2 group-hover:text-brand transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 flex-1">
                    {cat.description}
                  </p>

                  {catBrands.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-1.5">
                        Branduri
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {named.map((brand) => (
                          <span
                            key={brand.slug}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/80"
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: brand.accent }}
                              aria-hidden="true"
                            />
                            {brand.name}
                          </span>
                        ))}
                        {extra > 0 && (
                          <span className="text-xs font-medium text-muted">
                            +{extra}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <span>Vezi brandurile</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/produse"
            className="flex items-center justify-center gap-2 w-full bg-charcoal text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
          >
            Toate domeniile <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
