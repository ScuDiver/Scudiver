"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Acasă", href: "/" },
  {
    label: "Produse",
    href: "/produse",
    children: [
      { label: "Scule Electrice", href: "/produse/scule-electrice" },
      { label: "Scule de Mână", href: "/produse/scule-de-mana" },
      { label: "Burghie și Accesorii", href: "/produse/burghie-si-accesorii" },
      { label: "Truse de Scule", href: "/produse/truse-de-scule" },
      { label: "Echipament de Protecție", href: "/produse/echipament-de-protectie" },
      { label: "Consumabile", href: "/produse/consumabile" },
      { label: "Elemente de Asamblare", href: "/produse/elemente-de-asamblare" },
    ],
  },
  { label: "Despre Noi", href: "/despre-noi" },
  { label: "Licitații B2G", href: "/licitatii-b2g" },
  { label: "Certificări", href: "/certificari" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-charcoal sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-charcoal-mid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs text-white/60">
          <span>Furnizor autorizat SEAP · Licitații publice e-licitatie.ro</span>
          <a
            href="tel:[TELEFON_PLACEHOLDER]"
            className="flex items-center gap-1.5 hover:text-brand transition-colors"
            aria-label="Telefon contact"
          >
            <Phone size={12} />
            <span>[TELEFON_PLACEHOLDER]</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline-brand focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm">
            <Image
              src="/assets/brands/LOGO.jpeg"
              alt="ScuDiver — Scule și Accesorii pentru Construcții"
              width={160}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigare principală" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown size={14} className={cn("transition-transform", dropdownOpen && "rotate-180")} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white shadow-xl rounded-sm border border-border z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-charcoal hover:bg-surface hover:text-brand font-medium transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1">
                        <Link
                          href="/produse"
                          className="block px-4 py-2.5 text-sm text-brand font-semibold hover:bg-surface transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Vezi toate produsele →
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
          className="lg:hidden bg-charcoal-mid border-t border-white/10 px-4 pb-4"
        >
          <div className="space-y-1 pt-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <div className="px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider mt-2">
                    {link.label}
                  </div>
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
