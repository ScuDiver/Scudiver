import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { getBrandsForCategory } from "@/lib/data/brands";
import { BrandCard } from "@/components/brands/BrandCard";
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

  const brandNames = getBrandsForCategory(cat.slug)
    .map((b) => b.name)
    .join(", ");
  const description = brandNames
    ? `${cat.description} Branduri distribuite: ${brandNames}.`
    : cat.description;

  return {
    title: cat.name,
    description,
    alternates: { canonical: `/produse/${cat.slug}` },
    openGraph: {
      title: `${cat.name} | ScuDiver`,
      description,
      url: `/produse/${cat.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;
  const cat = getCategoryBySlug(categorie);
  if (!cat) notFound();

  const categoryBrands = getBrandsForCategory(cat.slug);
  // A sample of the range, shown to make the domain concrete — never a count.
  const examples = getProductsByCategory(categorie);

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-12 border-b-2 border-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/produse"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Toate domeniile
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl" role="img" aria-label={cat.name}>
              {cat.icon}
            </span>
            <div>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none">
                {cat.name}
              </h1>
              <p className="mt-1.5 text-xs font-mono font-semibold text-white/40">
                CPV {cat.cpvCode} · {cat.cpvDescription}
              </p>
            </div>
          </div>
          <p className="mt-4 text-white/70 max-w-2xl">{cat.description}</p>

          <div className="mt-6">
            <Link
              href={`/cerere-oferta?categorie=${encodeURIComponent(cat.name)}`}
              className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cere ofertă <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands — the primary route through this page */}
      {categoryBrands.length > 0 && (
        <section className="bg-charcoal pb-14" aria-labelledby="branduri-categorie">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <p className="text-brand font-bold text-xs uppercase tracking-widest mb-1">
                Alegeți brandul
              </p>
              <h2
                id="branduri-categorie"
                className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase leading-none"
              >
                Branduri pentru {cat.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/60 leading-relaxed">
                Furnizăm gama completă a fiecărui brand de mai jos, nu doar
                referințele publicate pe site. Deschideți brandul care vă
                interesează sau cereți direct oferta.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {categoryBrands.map((brand, i) => (
                <BrandCard
                  key={brand.slug}
                  brand={brand}
                  priority={i < 4}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Illustrative products — explicitly a sample, never the full range */}
      {examples.length > 0 && (
        <div className="bg-surface py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-brand font-bold text-xs uppercase tracking-widest mb-1">
                Exemple din gamă
              </p>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-charcoal uppercase leading-none">
                Cum arată o cerere tipică
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">
                Câteva referințe cu fișă tehnică, ca reper pentru caietul de
                sarcini. Gama efectivă este mult mai largă.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {examples.map((product) => (
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
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="brand">{product.brand}</Badge>
                      {product.featured && <Badge variant="dark">Recomandat</Badge>}
                    </div>

                    <h3 className="font-semibold text-charcoal text-base leading-snug mb-2 group-hover:text-brand transition-colors flex-1">
                      {product.name}
                    </h3>

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
          </div>
        </div>
      )}

      {/* Closing CTA */}
      <section className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-charcoal uppercase leading-none">
              Aveți o listă de {cat.name.toLowerCase()}?
            </h2>
            <p className="mt-2 text-sm text-muted max-w-2xl">
              Trimiteți lista de produse, codul CPV sau caietul de sarcini și
              revenim cu ofertă în 48 de ore — inclusiv pentru referințe care nu
              apar pe site.
            </p>
          </div>
          <Link
            href={`/cerere-oferta?categorie=${encodeURIComponent(cat.name)}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
          >
            Cere Ofertă <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
