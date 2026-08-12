import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/types";

interface Props {
  brand: Brand;
  /** Number of columns the card sits in at the widest breakpoint. */
  sizes?: string;
  priority?: boolean;
}

/**
 * 4:5 catalogue card. The photo carries the brand, so the name sits over a
 * scrim rather than next to a logo — manufacturer logos are on light
 * backgrounds and do not survive being placed over a photograph.
 */
export function BrandCard({ brand, sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw", priority = false }: Props) {
  return (
    <Link
      href={`/branduri/${brand.slug}`}
      className="group relative block overflow-hidden rounded-sm bg-charcoal card-hover border border-transparent"
    >
      <div className="relative aspect-4/5">
        <Image
          src={brand.imagePortrait}
          alt={brand.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Scrim — keeps the name legible whatever the photo does */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5"
          aria-hidden="true"
        />
      </div>

      {/* Accent rule in the manufacturer's colour */}
      <div
        className="absolute bottom-0 left-0 h-1 w-12 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: brand.accent }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50">
          {brand.origin}
        </p>
        <h3 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl uppercase leading-none text-white mt-1">
          {brand.name}
        </h3>
        <p className="mt-1.5 text-[11px] sm:text-xs leading-snug text-white/70 line-clamp-2">
          {brand.tagline}
        </p>
        <span className="mt-2 sm:mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white">
          Vezi brandul
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
