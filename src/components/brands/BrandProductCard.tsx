import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
  /** Manufacturer colour, used for the placeholder when a photo is missing. */
  accent: string;
}

/**
 * Deliberately light product card for brand pages: photo, name, one line of
 * copy. Specifications, SKU and variants live on the product page — the brand
 * page is for browsing, not for configuring.
 */
export function BrandProductCard({ product, accent }: Props) {
  return (
    <Link
      href={`/produse/${product.categorySlug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-white card-hover"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-surface">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <Package
              size={34}
              strokeWidth={1.5}
              className="relative z-10 text-charcoal/30"
              aria-hidden="true"
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 flex-1 text-sm font-semibold leading-snug text-charcoal transition-colors group-hover:text-brand">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted">
          {product.description}
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
          Detalii și ofertă
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
