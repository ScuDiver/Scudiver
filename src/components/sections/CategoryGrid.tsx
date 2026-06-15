import Link from "next/link";
import { ArrowRight, Zap, Wrench, Settings, Package, ShieldCheck, Layers, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/lib/data/categories";

interface Visual {
  gradient: string;
  Icon: LucideIcon;
}

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
  "consumabile": {
    gradient: "linear-gradient(135deg, #64748B 0%, #334155 100%)",
    Icon: Layers,
  },
  "elemente-de-asamblare": {
    gradient: "linear-gradient(135deg, #78716C 0%, #292524 100%)",
    Icon: Link2,
  },
};

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const vis = visuals[cat.slug] ?? {
              gradient: "linear-gradient(135deg, #374151 0%, #1A1A1A 100%)",
              Icon: Package,
            };
            const { Icon } = vis;
            return (
              <Link
                key={cat.slug}
                href={`/produse/${cat.slug}`}
                className="group bg-white border border-border rounded-sm overflow-hidden card-hover"
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
                  {/* CPV badge */}
                  <span className="absolute top-2 right-2 text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                    CPV {cat.cpvCode}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-charcoal uppercase leading-tight mb-2 group-hover:text-brand transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <span>{cat.productCount} produse</span>
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
            Toate produsele <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
