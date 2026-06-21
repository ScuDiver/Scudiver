import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { BrandCarousel } from "@/components/sections/BrandCarousel";
import { B2GBanner } from "@/components/sections/B2GBanner";
import { ToolsShowcase } from "@/components/sections/ToolsShowcase";
import { getFeaturedProducts } from "@/lib/data/products";
import Link from "next/link";
import { ArrowRight, Zap, Wrench, Settings, Package, ShieldCheck, Layers, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  "scule-electrice": Zap,
  "scule-de-mana": Wrench,
  "burghie-si-accesorii": Settings,
  "truse-de-scule": Package,
  "echipament-de-protectie": ShieldCheck,
  "consumabile": Layers,
  "elemente-de-asamblare": Link2,
};

const categoryGradients: Record<string, string> = {
  "scule-electrice": "linear-gradient(135deg, #D32027 0%, #8B1419 100%)",
  "scule-de-mana": "linear-gradient(135deg, #374151 0%, #1A1A1A 100%)",
  "burghie-si-accesorii": "linear-gradient(135deg, #4B5563 0%, #1F2937 100%)",
  "truse-de-scule": "linear-gradient(135deg, #B45309 0%, #78350F 100%)",
  "echipament-de-protectie": "linear-gradient(135deg, #EA580C 0%, #9A3412 100%)",
  "consumabile": "linear-gradient(135deg, #64748B 0%, #334155 100%)",
  "elemente-de-asamblare": "linear-gradient(135deg, #78716C 0%, #292524 100%)",
};

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <Hero />
      <StatsSection />
      <ToolsShowcase />
      <CategoryGrid />
      <BrandCarousel />

      {/* Featured products */}
      <section className="bg-white py-16" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand font-bold text-sm uppercase tracking-widest mb-1">
                Selecție
              </p>
              <h2
                id="featured-heading"
                className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none"
              >
                Produse Recomandate
              </h2>
            </div>
            <Link
              href="/produse"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Toate produsele <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((product) => {
              const Icon = categoryIcons[product.categorySlug] ?? Package;
              const gradient = categoryGradients[product.categorySlug] ?? "linear-gradient(135deg, #374151 0%, #1A1A1A 100%)";
              return (
                <Link
                  key={product.id}
                  href={`/produse/${product.categorySlug}/${product.slug}`}
                  className="group bg-white border border-border rounded-sm overflow-hidden card-hover"
                >
                  {/* Visual header */}
                  <div
                    className="relative h-24 flex items-center justify-center overflow-hidden"
                    style={{ background: gradient }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                        backgroundSize: "12px 12px",
                      }}
                      aria-hidden="true"
                    />
                    <Icon size={36} className="text-white/90 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} aria-hidden="true" />
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-white/80 bg-white/10 px-1.5 py-0.5 rounded-sm">
                      {product.brand}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal text-sm leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="text-[10px] text-muted/60 font-mono">
                      CPV: {product.cpvCode}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                      Cere ofertă <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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

      <B2GBanner />
    </>
  );
}
