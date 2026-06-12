import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const legalLinks = [
  { label: "Termeni și Condiții", href: "/termeni-conditii" },
  { label: "Politică de Confidențialitate", href: "/politica-confidentialitate" },
  { label: "Politică de Cookie-uri", href: "/politica-cookie" },
  { label: "Reclamații / Sesizări", href: "/reclamatii" },
  { label: "Declarație de Accesibilitate", href: "/declaratie-accesibilitate" },
];

const productLinks = [
  { label: "Scule Electrice", href: "/produse/scule-electrice" },
  { label: "Scule de Mână", href: "/produse/scule-de-mana" },
  { label: "Burghie și Accesorii", href: "/produse/burghie-si-accesorii" },
  { label: "Truse de Scule", href: "/produse/truse-de-scule" },
  { label: "Echipament de Protecție", href: "/produse/echipament-de-protectie" },
  { label: "Consumabile", href: "/produse/consumabile" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-auto" aria-label="Subsol pagină">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/assets/brands/LOGO.jpeg"
                alt="ScuDiver"
                width={140}
                height={42}
                className="h-10 w-auto object-contain brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Furnizor de scule, unelte și accesorii pentru construcții. Partener de
              încredere în licitații publice SEAP — din 2016.
            </p>
            {/* SAL Pictogram — 250×50px, required by OPANPC 270/2026 */}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SAL — Soluționarea Alternativă a Litigiilor — ANPC"
              className="inline-block mt-2 focus-visible:outline-brand focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
            >
              <div
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors rounded-sm text-xs text-white/70 font-medium"
                style={{ width: "250px", height: "50px" }}
                role="img"
                aria-label="SAL ANPC — Soluționarea Alternativă a Litigiilor"
              >
                <span className="mr-1">⚖️</span>
                SAL — Soluționare Alternativă Litigii · ANPC
              </div>
            </a>
            <p className="text-white/40 text-xs mt-1">
              * Descărcați pictograma oficială de pe{" "}
              <a
                href="https://anpc.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70"
              >
                anpc.ro
              </a>{" "}
              și înlocuiți acest placeholder.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Catalog Produse
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Companie
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/despre-noi" className="text-sm text-white/70 hover:text-white transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link href="/licitatii-b2g" className="text-sm text-white/70 hover:text-white transition-colors">
                  Licitații Publice (B2G)
                </Link>
              </li>
              <li>
                <Link href="/certificari" className="text-sm text-white/70 hover:text-white transition-colors">
                  Certificări și Conformitate
                </Link>
              </li>
              <li>
                <Link href="/cerere-oferta" className="text-sm text-white/70 hover:text-white transition-colors">
                  Cerere de Ofertă
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details — REQUIRED by Legea 365/2002 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm text-white/70">
              <p className="font-semibold text-white">[DENUMIRE_COMPLETA_FIRMA] SRL</p>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-brand mt-0.5 shrink-0" />
                <span>
                  [ADRESA_COMPLETA]<br />
                  [LOCALITATE], [JUDET], [COD_POSTAL]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand shrink-0" />
                <a href="tel:[TELEFON_PLACEHOLDER]" className="hover:text-white transition-colors">
                  [TELEFON_PLACEHOLDER]
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand shrink-0" />
                <a href="mailto:office@scudiver.ro" className="hover:text-white transition-colors">
                  office@scudiver.ro
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Identification data — Legea 365/2002 art.5 + Legea 31/1990 */}
          <div className="text-xs text-white/50 space-y-1 mb-4">
            <p>
              <strong className="text-white/70">[DENUMIRE_COMPLETA_FIRMA] SRL</strong>
              {" "}· CUI: <strong className="text-white/70">RO[CUI_PLACEHOLDER]</strong>
              {" "}· J [J_PLACEHOLDER]
              {" "}· Capital social: [CAPITAL_SOCIAL] RON subscris și vărsat
            </p>
            <p>
              Sediu social: [ADRESA_COMPLETA], [LOCALITATE], [JUDET]
              {" "}· IBAN: [IBAN_PLACEHOLDER] · Bancă: [BANCA_PLACEHOLDER]
            </p>
            <p>
              Operator înregistrat în SEAP /{" "}
              <a
                href="https://e-licitatie.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 inline-flex items-center gap-0.5"
              >
                e-licitatie.ro <ExternalLink size={10} />
              </a>
              {" "}· Semnătură electronică calificată
            </p>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/50 mb-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} [DENUMIRE_COMPLETA_FIRMA] SRL. Toate drepturile rezervate.
            Site de prezentare — nu se efectuează comenzi sau plăți online.
          </p>
        </div>
      </div>
    </footer>
  );
}
