"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { brands } from "@/lib/data/brands";
import { categories } from "@/lib/data/categories";

interface NavLink {
  label: string;
  href: string;
  /** Menu key — present only on links that open a dropdown. */
  menu?: string;
  children?: { label: string; href: string }[];
  /** Render the dropdown in two columns (used for the long brand list). */
  wide?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Acasă", href: "/" },
  {
    label: "Branduri",
    href: "/branduri",
    menu: "branduri",
    wide: true,
    children: brands.map((b) => ({
      label: b.name,
      href: `/branduri/${b.slug}`,
    })),
  },
  {
    label: "Produse",
    href: "/produse",
    menu: "produse",
    children: categories.map((c) => ({
      label: c.name,
      href: `/produse/${c.slug}`,
    })),
  },
  { label: "Despre Noi", href: "/despre-noi" },
  { label: "Licitații B2G", href: "/licitatii-b2g" },
  { label: "Certificări", href: "/certificari" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="bg-charcoal sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-charcoal-mid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs text-white/60">
          <span>Furnizor autorizat SEAP · Licitații publice e-licitatie.ro</span>
          <a
            href="tel:0753657215"
            className="flex items-center gap-1.5 hover:text-brand transition-colors"
            aria-label="Telefon contact"
          >
            <Phone size={12} />
            <span>0753 657 215</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline-brand focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm">
            <Image
              src="/assets/brands/LOGO.webp"
              alt="ScuDiver — Scule și Accesorii pentru Construcții"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigare principală" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === link.menu ? null : link.menu!)}
                    onBlur={() => setTimeout(() => setOpenMenu(null), 150)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                    aria-expanded={openMenu === link.menu}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", openMenu === link.menu && "rotate-180")}
                    />
                  </button>
                  {openMenu === link.menu && (
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1 bg-white shadow-xl rounded-sm border border-border z-50",
                        link.wide ? "w-[26rem]" : "w-60"
                      )}
                    >
                      <div className={cn("py-1", link.wide && "grid grid-cols-2")}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-charcoal hover:bg-surface hover:text-brand font-medium transition-colors"
                            onClick={() => setOpenMenu(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-border">
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-brand font-semibold hover:bg-surface transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          {link.menu === "branduri"
                            ? "Vezi toate brandurile →"
                            : "Vezi toate produsele →"}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA button (desktop) */}
          <div className="hidden lg:block">
            <Link
              href="/cerere-oferta"
              className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cere Ofertă
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-sm hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          aria-label="Navigare mobilă"
          className="lg:hidden bg-charcoal-mid border-t border-white/10 px-4 pb-4 max-h-[calc(100vh-6.25rem)] overflow-y-auto"
        >
          <div className="space-y-1 pt-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider mt-2 hover:text-white/70 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label} — vezi toate
                  </Link>
                  <div className={cn(link.wide && "grid grid-cols-2")}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/cerere-oferta"
                className="block w-full text-center bg-brand text-white text-sm font-semibold px-5 py-3 rounded-sm hover:bg-brand-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Cere Ofertă
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
