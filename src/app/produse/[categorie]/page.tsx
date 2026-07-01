import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ categorie: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const cat = getCategoryBySlug(categorie);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;
  const cat = getCategoryBySlug(categorie);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(categorie);

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-12 border-b-2 border-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/produse"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Înapoi la catalog
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl" role="img" aria-label={cat.name}>
              {cat.icon}
            </span>
            <div>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none">
                {cat.name}
              </h1>
            </div>
          </div>
          <p className="mt-4 text-white/70 max-w-2xl">{cat.description}</p>
        </div>
      </section>

      {/* Products grid */}
      <div className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">
              {catProducts.length} produse găsite
            </p>
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cere ofertă pentru categorie <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {catProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produse/${cat.slug}/${product.slug}`}
                className="group bg-white border border-border rounded-sm overflow-hidden card-hover flex flex-col"
              >
                {/* Product image */}
                <div className="relative h-44 bg-surface flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-xs font-medium text-muted/50">{product.brand}</span>
                  )}
                </div>

                {/* Card content */}
                <div className="p-5 flex flex-col flex-1">
                {/* Brand + featured badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="brand">{product.brand}</Badge>
                  {product.featured && (
                    <Badge variant="dark">Recomandat</Badge>
                  )}
                </div>

                <h2 className="font-semibold text-charcoal text-base leading-snug mb-2 group-hover:text-brand transition-colors flex-1">
                  {product.name}
                </h2>

                <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Key specs preview */}
                <div className="border-t border-border pt-3 mb-3">
                  {Object.entries(product.specs)
                    .slice(0, 3)
                    .map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-xs py-0.5">
                        <span className="text-muted">{key}</span>
                        <span className="font-medium text-charcoal">{val}</span>
                      </div>
                    ))}
                </div>

                <div className="flex items-center justify-end">
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand">
                    Detalii <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                </div>
              </Link>
            ))}
          </div>

          {catProducts.length === 0 && (
            <p className="text-center text-muted py-16">
              Nu există produse în această categorie momentan.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
