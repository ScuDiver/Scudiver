import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { BrandCarousel } from "@/components/sections/BrandCarousel";
import { B2GBanner } from "@/components/sections/B2GBanner";
import { getFeaturedProducts } from "@/lib/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <Hero />
      <StatsSection />
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
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/produse/${product.categorySlug}/${product.slug}`}
                className="group bg-white border border-border rounded-sm p-5 card-hover"
              >
                <div className="mb-3">
                  <span className="inline-block text-xs font-bold uppercase tracking-wide text-brand bg-brand/10 px-2 py-0.5 rounded-sm">
                    {product.brand}
                  </span>
                </div>
                <h3 className="font-semibold text-charcoal text-sm leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="text-xs text-muted/70">
                  CPV: {product.cpvCode}
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                  Cere ofertă <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <B2GBanner />
    </>
  );
}
