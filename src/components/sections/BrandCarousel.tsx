import Link from "next/link";
import Image from "next/image";
import { brands } from "@/lib/data/brands";

/**
 * Compact logo strip. Each logo links to the brand's page — on a brand-led
 * site the strip is navigation, not decoration.
 */
export function BrandCarousel() {
  return (
    <section className="bg-white py-12 border-y border-border" aria-labelledby="brand-strip-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          id="brand-strip-heading"
          className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8"
        >
          Branduri distribuite
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {brands.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/branduri/${brand.slug}`}
                className="flex items-center justify-center w-28 h-14 rounded-sm grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                title={brand.name}
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={112}
                    height={56}
                    className="max-h-10 w-auto object-contain"
                  />
                ) : (
                  /* No logo asset on file — the wordmark stands in for it. */
                  <span className="font-display font-extrabold text-sm uppercase tracking-tight text-charcoal text-center leading-tight">
                    {brand.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
