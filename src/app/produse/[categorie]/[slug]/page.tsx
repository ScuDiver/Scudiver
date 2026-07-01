import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductBySlug, products } from "@/lib/data/products";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    categorie: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { categorie, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.categorySlug !== categorie) notFound();

  const cat = getCategoryBySlug(categorie);

  return (
    <div className="bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/produse" className="hover:text-brand transition-colors">
                  Catalog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href={`/produse/${categorie}`} className="hover:text-brand transition-colors">
                  {cat?.name}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-charcoal font-medium truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/produse/${categorie}`}
          className="inline-flex items-center gap-1.5 text-muted hover:text-brand text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Înapoi la {cat?.name}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product image */}
            {product.image && (
              <div className="bg-white border border-border rounded-sm p-6 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Product header */}
            <div className="bg-white border border-border rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="brand">{product.brand}</Badge>
                {product.featured && <Badge variant="dark">Recomandat</Badge>}
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-charcoal uppercase leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-muted leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-surface border border-border text-muted px-2 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Technical specs */}
            <div className="bg-white border border-border rounded-sm p-6">
              <h2 className="font-display font-bold text-xl text-charcoal uppercase mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-brand" />
                Specificații Tehnice
              </h2>
              <table className="w-full text-sm" aria-label="Specificații tehnice produs">
                <tbody>
                  {Object.entries(product.specs)
                    .filter(([key]) => !/diametru|lungime|înălțime|inaltime|lățime|latime|grosime|dimensiune|mărime|marime/i.test(key))
                    .map(([key, val], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? "bg-surface" : "bg-white"}
                      >
                        <td className="py-2.5 px-3 font-medium text-muted w-40 rounded-l-sm">
                          {key}
                        </td>
                        <td className="py-2.5 px-3 text-charcoal font-semibold rounded-r-sm">
                          {val}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Sidebar — quote CTA */}
          <div className="space-y-4">
            {/* Quote CTA */}
            <div className="bg-charcoal rounded-sm p-5 space-y-3">
              <h3 className="font-display font-bold text-white uppercase text-lg leading-tight">
                Solicitați Ofertă
              </h3>
              <p className="text-white/60 text-sm">
                Instituție publică sau firmă? Completați formularul și primiți
                ofertă în 48 de ore.
              </p>
              <Link
                href={`/cerere-oferta?produs=${encodeURIComponent(product.name)}&categorie=${encodeURIComponent(cat?.name ?? product.categorySlug)}`}
                className="flex items-center justify-center gap-2 w-full bg-brand text-white font-display font-bold text-base uppercase px-5 py-3 rounded-sm hover:bg-brand-dark transition-colors"
              >
                Cere Ofertă <ArrowRight size={16} />
              </Link>
              <a
                href="tel:0753657215"
                className="flex items-center justify-center gap-2 w-full border border-white/20 text-white/80 font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={14} /> Sunați acum
              </a>
            </div>

            {/* Certifications note */}
            <div className="bg-white border border-border rounded-sm p-5">
              <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide mb-2">
                Documentație disponibilă
              </h3>
              <ul className="space-y-1.5 text-sm text-muted">
                {["Declarație de conformitate CE", "Fișă tehnică / Manual", "Certificat de garanție", "Certificate ISO furnizor"].map((doc) => (
                  <li key={doc} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-brand shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
