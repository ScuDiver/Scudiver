import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, FileText, BookOpen, Download, ExternalLink } from "lucide-react";
import { brands, getBrandBySlug, getProductsByBrand } from "@/lib/data/brands";
import { getCategoryBySlug } from "@/lib/data/categories";
import { BrandHero } from "@/components/brands/BrandHero";
import { BrandProductCard } from "@/components/brands/BrandProductCard";

const SITE = "https://scudiver.ro";

/** Products shown on a brand page — a selection, not the full catalogue. */
const PRODUCTS_SHOWN = 6;

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  const url = `/branduri/${brand.slug}`;

  return {
    title: brand.seo.title,
    description: brand.seo.description,
    keywords: brand.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${brand.seo.title} | ScuDiver`,
      description: brand.seo.description,
      url,
      type: "website",
      images: [{ url: brand.imageWide, alt: brand.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.seo.title} | ScuDiver`,
      description: brand.seo.description,
      images: [brand.imageWide],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const shown = getProductsByBrand(brand.slug).slice(0, PRODUCTS_SHOWN);
  const brandCategories = brand.categorySlugs
    .map((s) => getCategoryBySlug(s))
    .filter((c) => c !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: SITE },
          { "@type": "ListItem", position: 2, name: "Branduri", item: `${SITE}/branduri` },
          {
            "@type": "ListItem",
            position: 3,
            name: brand.name,
            item: `${SITE}/branduri/${brand.slug}`,
          },
        ],
      },
      {
        "@type": "Brand",
        name: brand.name,
        description: brand.summary,
        url: `${SITE}/branduri/${brand.slug}`,
        ...(brand.logo ? { logo: `${SITE}${brand.logo}` } : {}),
        image: `${SITE}${brand.imageWide}`,
        slogan: brand.tagline,
      },
      {
        "@type": "ItemList",
        name: `Produse ${brand.name} distribuite de ScuDiver`,
        numberOfItems: shown.length,
        itemListElement: shown.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: product.name,
            description: product.description,
            brand: { "@type": "Brand", name: brand.name },
            sku: product.sku,
            url: `${SITE}/produse/${product.categorySlug}/${product.slug}`,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BrandHero brand={brand} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-brand transition-colors">
                  Acasă
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/branduri" className="hover:text-brand transition-colors">
                  Branduri
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-charcoal font-medium">{brand.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Brand story + facts */}
      <section className="bg-white py-12" aria-labelledby="despre-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-brand font-bold text-xs uppercase tracking-widest mb-2">
                Despre brand
              </p>
              <h2
                id="despre-brand"
                className="font-display font-extrabold text-3xl md:text-4xl text-charcoal uppercase leading-none"
              >
                {brand.name} la ScuDiver
              </h2>

              <div className="mt-5 space-y-4">
                {brand.description.map((paragraph, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Specialties */}
              <div className="mt-8">
                <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide mb-3">
                  Domenii de specializare
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brand.specialties.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-charcoal/80"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: brand.accent }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="border border-border rounded-sm overflow-hidden">
                <div
                  className="h-1"
                  style={{ backgroundColor: brand.accent }}
                  aria-hidden="true"
                />
                <dl className="divide-y divide-border text-sm">
                  <div className="flex items-center justify-between px-5 py-3">
                    <dt className="text-muted">Origine</dt>
                    <dd className="font-semibold text-charcoal">{brand.origin}</dd>
                  </div>
                  {brand.founded && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <dt className="text-muted">Fondat</dt>
                      <dd className="font-semibold text-charcoal">{brand.founded}</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-3">
                    <dt className="text-muted">Disponibilitate</dt>
                    <dd className="font-semibold text-charcoal">Gama completă</dd>
                  </div>
                </dl>
              </div>

              {brandCategories.length > 0 && (
                <div className="border border-border rounded-sm p-5">
                  <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide mb-3">
                    Categorii acoperite
                  </h3>
                  <ul className="space-y-1.5">
                    {brandCategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/produse/${cat.slug}`}
                          className="flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors"
                        >
                          <span aria-hidden="true">{cat.icon}</span>
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {brand.catalog && (
                <a
                  href={brand.catalog.url}
                  target={brand.catalog.external ? "_blank" : undefined}
                  rel={brand.catalog.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-3 border border-border rounded-sm p-5 hover:border-brand hover:bg-surface transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen
                      size={20}
                      className="shrink-0"
                      style={{ color: brand.accent }}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-bold text-charcoal text-sm uppercase tracking-wide">
                        Catalog {brand.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {brand.catalog.label}
                      </span>
                    </span>
                  </span>
                  {brand.catalog.external ? (
                    <ExternalLink
                      size={16}
                      className="shrink-0 text-muted group-hover:text-brand transition-colors"
                      aria-hidden="true"
                    />
                  ) : (
                    <Download
                      size={16}
                      className="shrink-0 text-muted group-hover:text-brand transition-colors"
                      aria-hidden="true"
                    />
                  )}
                </a>
              )}

              <div className="bg-charcoal rounded-sm p-5 space-y-3">
                <h3 className="font-display font-bold text-white uppercase text-lg leading-tight">
                  Ofertă {brand.name}
                </h3>
                <p className="text-white/60 text-sm">
                  Trimiteți lista de produse sau caietul de sarcini și revenim cu
                  ofertă în 48 de ore.
                </p>
                <Link
                  href={`/cerere-oferta?brand=${encodeURIComponent(brand.name)}`}
                  className="flex items-center justify-center gap-2 w-full bg-brand text-white font-display font-bold text-base uppercase px-5 py-3 rounded-sm hover:bg-brand-dark transition-colors"
                >
                  Cere Ofertă <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:0753657215"
                  className="flex items-center justify-center gap-2 w-full border border-white/20 text-white/80 font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-white/10 transition-colors"
                >
                  <Phone size={14} /> 0753 657 215
                </a>
              </div>

              <div className="border border-border rounded-sm p-5">
                <h3 className="flex items-center gap-2 font-bold text-charcoal text-sm uppercase tracking-wide mb-2">
                  <FileText size={14} className="text-brand" aria-hidden="true" />
                  La livrare
                </h3>
                <ul className="space-y-1.5 text-sm text-muted">
                  {[
                    "Declarație de conformitate CE",
                    "Fișă tehnică / manual",
                    "Certificat de garanție",
                    "Factură și aviz de însoțire",
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-brand shrink-0" aria-hidden="true" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Product selection */}
      {shown.length > 0 && (
        <section className="bg-surface py-12" aria-labelledby="produse-brand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-brand font-bold text-xs uppercase tracking-widest mb-1">
                  Selecție
                </p>
                <h2
                  id="produse-brand"
                  className="font-display font-extrabold text-3xl md:text-4xl text-charcoal uppercase leading-none"
                >
                  Exemple din gama {brand.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shown.map((product) => (
                <BrandProductCard
                  key={product.id}
                  product={product}
                  accent={brand.accent}
                />
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              Selecția de mai sus este un reper, nu gama. Furnizăm întregul
              portofoliu {brand.name} — trimiteți codul de produs, descrierea
              din caietul de sarcini sau doar aplicația, și revenim cu ofertă în
              48 de ore.
            </p>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="bg-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white uppercase leading-none">
              Aveți nevoie de o referință {brand.name} anume?
            </h2>
            <p className="mt-2 text-sm text-white/60 max-w-2xl">
              Furnizăm întreaga gamă {brand.name}, inclusiv referințele care nu
              apar în catalogul de pe site. Pentru instituții publice pregătim
              oferta în formatul cerut de procedura de achiziție.
            </p>
          </div>
          <div className="flex shrink-0 flex-col sm:flex-row gap-3">
            <Link
              href={`/cerere-oferta?brand=${encodeURIComponent(brand.name)}`}
              className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cere Ofertă <ArrowRight size={16} />
            </Link>
            <Link
              href="/branduri"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-sm hover:bg-white/10 transition-colors"
            >
              Alte branduri
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
