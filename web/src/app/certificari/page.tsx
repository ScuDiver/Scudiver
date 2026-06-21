import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckCircle2, ShieldCheck, FileText, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificări și Conformitate",
  description: "ScuDiver distribuie exclusiv produse certificate CE, conforme cu directivele europene. Documentație de conformitate disponibilă la cerere.",
};

const standards = [
  {
    category: "Scule electrice",
    directive: "Directiva 2006/42/CE (Mașini)",
    standards: ["EN 60745 — Scule electromecanice portabile", "EN 62841 — Scule cu acumulator", "EN 55014 — Compatibilitate electromagnetică"],
    note: "Toate sculele electrice dețin marcaj CE și sunt însoțite de declarație de conformitate.",
  },
  {
    category: "Echipament de protecție",
    directive: "Regulamentul UE 2016/425 (EIP)",
    standards: ["EN 397 — Căști de protecție industriale", "EN 388 — Mănuși de protecție mecanică", "EN 166 — Protecție individuală a ochilor"],
    note: "EIP de categorie II și III sunt certificate de organisme notificate conform Art. 19 Reg. UE 2016/425.",
  },
  {
    category: "Elemente de asamblare",
    directive: "Regulamentul UE 305/2011 (CPR)",
    standards: ["ETA — Evaluare Tehnică Europeană (ancore)", "DIN 931/934 — Bolțuri și piulițe metrice", "EN 14566 — Șuruburi pentru sisteme de construcție uscată"],
    note: "Ancorele structurale sunt certificate ETA de organisme tehnice europene acreditate.",
  },
  {
    category: "Consumabile",
    directive: "Directiva 2004/42/CE (COV)",
    standards: ["EN 12413 — Discuri abrazive consolidate", "ETAG 026 — Sigilanți și adezivi structurali", "EN 13165 — Spume poliuretanice"],
    note: "Produsele chimice (spume, sigilanți) respectă limitele COV conform Directivei 2004/42/CE.",
  },
];

const certifiedBrands = [
  { name: "Bosch", file: "bosch.webp", certs: ["CE", "ISO 9001", "ISO 14001"] },
  { name: "DeWalt", file: "dewalt.webp", certs: ["CE", "ISO 9001", "UL"] },
  { name: "Milwaukee", file: "milwaukee.webp", certs: ["CE", "ISO 9001"] },
  { name: "Makita", file: "makita.webp", certs: ["CE", "ISO 9001", "ISO 14001"] },
  { name: "Unior", file: "unior.webp", certs: ["CE", "ISO 9001", "VDE"] },
  { name: "YATO", file: "YATO.webp", certs: ["CE", "ISO 9001"] },
];

export default function CertificariPage() {
  return (
    <>
      <PageHeader
        title="Certificări și Conformitate"
        subtitle="Distribuim exclusiv produse certificate CE, conforme cu directivele europene. Documentație disponibilă la cerere."
        dark
      />

      {/* Intro */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">Angajamentul nostru</p>
              <h2 className="font-display font-extrabold text-4xl text-white uppercase leading-none mb-5">
                Calitate fără compromis
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                ScuDiver distribuie exclusiv produse de la producători care dețin sisteme de management al calității
                certificate ISO 9001 și care aplică marcajul CE conform directivelor europene aplicabile.
              </p>
              <p className="text-white/60 leading-relaxed">
                Pentru orice produs din portofoliul nostru putem furniza, la cerere, declarația de conformitate CE,
                fișa tehnică, certificatul de garanție și, după caz, raportul de testare de la un laborator acreditat.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: ShieldCheck, t: "Marcaj CE obligatoriu", d: "Produse conforme cu cerințele esențiale din directivele aplicabile." },
                { Icon: Award, t: "ISO 9001 furnizori", d: "Toți furnizorii noștri principali sunt certificați ISO 9001:2015." },
                { Icon: FileText, t: "Declarații conformitate", d: "Furnizăm documentație completă pentru caietele de sarcini." },
                { Icon: CheckCircle2, t: "Organisme notificate", d: "EIP Cat. II/III și ancore structurale certificate de organisme europene." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="bg-white/5 border border-white/10 rounded-sm p-4">
                  <Icon size={24} className="text-brand mb-3" strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-white text-sm uppercase mb-1">{t}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards by category */}
      <section className="bg-surface py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Pe categorii</p>
            <h2 className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none">
              Standarde și Directive
            </h2>
          </div>
          <div className="space-y-4">
            {standards.map((s) => (
              <div key={s.category} className="bg-white border border-border rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <p className="font-display font-bold text-lg text-charcoal uppercase">{s.category}</p>
                    <p className="text-xs text-muted mt-0.5">{s.directive}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                    <ul className="space-y-1.5">
                      {s.standards.map((std) => (
                        <li key={std} className="flex items-center gap-2 text-sm text-charcoal">
                          <CheckCircle2 size={13} className="text-brand shrink-0" />
                          {std}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted leading-relaxed italic border-l border-border pl-3">
                      {s.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand certifications */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Producători</p>
            <h2 className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none">
              Branduri Certificate
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifiedBrands.map((brand) => (
              <div key={brand.name} className="bg-surface border border-border rounded-sm p-5 flex flex-col items-center text-center">
                <Image
                  src={`/assets/brands/${brand.file}`}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain grayscale mb-3"
                />
                <p className="font-display font-bold text-charcoal text-sm uppercase mb-2">{brand.name}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {brand.certs.map((c) => (
                    <span key={c} className="text-[10px] font-bold bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request docs CTA */}
      <section className="bg-surface py-12 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl text-charcoal uppercase mb-3">
            Solicitați Documentația
          </h2>
          <p className="text-muted mb-6">
            Aveți nevoie de declarații de conformitate CE, fișe tehnice sau certificate pentru un caiet de sarcini?
            Contactați-ne și vă trimitem documentația în cel mult 24 de ore lucrătoare.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-white font-display font-bold text-base uppercase px-8 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
          >
            Solicitați documentația <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
