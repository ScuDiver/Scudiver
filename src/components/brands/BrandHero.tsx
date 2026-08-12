import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, CalendarDays } from "lucide-react";
import type { Brand } from "@/lib/types";

/**
 * Art-directed brand hero: the 4:5 catalogue photo below `md`, the 16:9 one
 * above it. This needs `<picture>` rather than two `next/image` elements —
 * a hidden `<img>` is still fetched, so the CSS-toggle approach would make
 * every visitor download both crops.
 */
export function BrandHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative bg-charcoal">
      <div className="relative aspect-4/5 sm:aspect-3/2 md:aspect-16/9 max-h-[70vh] w-full overflow-hidden">
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet={`${brand.imageWideSm} 1280w, ${brand.imageWide} 1920w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${brand.imagePortraitSm} 800w, ${brand.imagePortrait} 1200w`}
            sizes="100vw"
          />
          {/* Plain <img> is deliberate — it is the fallback for <picture> above. */}
          <img
            src={brand.imagePortrait}
            alt={brand.imageAlt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex flex-col justify-between max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Link
            href="/branduri"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Toate brandurile
          </Link>

          <div>
            <div
              className="h-1 w-16 mb-4"
              style={{ backgroundColor: brand.accent }}
              aria-hidden="true"
            />
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase leading-none text-white">
              {brand.name}
            </h1>
            <p className="mt-2 text-base md:text-lg text-white/80 max-w-2xl">
              {brand.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} aria-hidden="true" />
                {brand.origin}
              </span>
              {brand.founded && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} aria-hidden="true" />
                  Din {brand.founded}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                {brand.logo && (
                  <span className="relative h-6 w-16 rounded-xs bg-white/90 px-1.5">
                    <Image
                      src={brand.logo}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-0.5"
                    />
                  </span>
                )}
                Distribuit de ScuDiver
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
