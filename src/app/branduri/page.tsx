import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands } from "@/lib/data/brands";
import { BrandCard } from "@/components/brands/BrandCard";
import { PageHeader } from "@/components/ui/PageHeader";

const brandNames = brands.map((b) => b.name).join(", ");

export const metadata: Metadata = {
  title: "Branduri Distribuite",
  description: `ScuDiver distribuie ${brands.length} mărci de scule, echipament de protecție, aparataj electric și chimie de construcții: ${brandNames}.`,
  keywords: [
    "branduri scule",
    "distribuitor scule Romania",
    "furnizor scule licitatii publice",
    ...brands.map((b) => b.name),
  ],
  alternates: { canonical: "/branduri" },
  openGraph: {
    title: "Branduri Distribuite | ScuDiver",
    description: `Cele ${brands.length} mărci de scule și echipamente pe care le furnizăm pentru firme și instituții publice.`,
    url: "/branduri",
    type: "website",
  },
};

export default function BranduriPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Branduri distribuite de ScuDiver",
    description: `Cele ${brands.length} mărci de scule, echipament de protecție, aparataj electric și chimie de construcții distribuite de ScuDiver.`,
    url: "https://scudiver.ro/branduri",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: brands.length,
      itemListElement: brands.map((brand, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Brand",
          name: brand.name,
          description: brand.summary,
          url: `https://scudiver.ro/branduri/${brand.slug}`,
          ...(brand.logo ? { logo: `https://scudiver.ro${brand.logo}` } : {}),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title="Branduri Distribuite"
        subtitle={`Lucrăm cu ${brands.length} producători europeni și internaționali. Fiecare marcă are pagina ei, cu descriere, domenii de specializare și produsele pe care le livrăm curent.`}
        dark
      />

      <div className="bg-charcoal py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {brands.map((brand, i) => (
              <BrandCard key={brand.slug} brand={brand} priority={i < 5} />
            ))}
          </div>
        </div>
      </div>

      {/* Written index — gives crawlers the brand summaries as real text */}
      <section className="bg-surface py-14" aria-labelledby="brand-index-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="brand-index-heading"
            className="font-display font-extrabold text-3xl md:text-4xl text-charcoal uppercase leading-none mb-8"
          >
            Ce acoperă fiecare brand
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {brands.map((brand) => (
              <div
                key={brand.slug}
                className="border-l-2 pl-4"
                style={{ borderColor: brand.accent }}
              >
                <h3 className="font-display font-bold text-lg text-charcoal uppercase leading-tight">
                  <Link
                    href={`/branduri/${brand.slug}`}
                    className="hover:text-brand transition-colors"
                  >
                    {brand.name}
                  </Link>
                  <span className="ml-2 font-body text-[11px] font-medium normal-case tracking-wide text-muted">
                    {brand.origin}
                    {brand.founded ? ` · din ${brand.founded}` : ""}
                  </span>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {brand.summary}
                </p>
                <Link
                  href={`/branduri/${brand.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                  Pagina {brand.name} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-charcoal uppercase leading-none">
              Nu găsiți brandul căutat?
            </h2>
            <p className="mt-2 text-sm text-muted max-w-2xl">
              Lucrăm și cu alți producători la cerere. Trimiteți lista de
              produse din caietul de sarcini și revenim cu ofertă în 48 de ore.
            </p>
          </div>
          <Link
            href="/cerere-oferta"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
          >
            Cere Ofertă <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
