import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { categories } from "@/lib/data/categories";
import { ArrowRight, CheckCircle2, FileText, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Licitații Publice B2G",
  description: "ScuDiver participă la licitații publice prin SEAP / e-licitatie.ro. Furnizor autorizat de scule și accesorii pentru instituții publice din România.",
};

const advantages = [
  { Icon: ShieldCheck, title: "Operator înregistrat SEAP", desc: "Înregistrați și activi pe platforma e-licitatie.ro cu semnătură electronică calificată." },
  { Icon: FileText, title: "Documentație completă", desc: "Furnizăm fișe tehnice, declarații de conformitate CE, certificate ISO și specificații detaliate." },
  { Icon: Clock, title: "Răspuns în 48 ore", desc: "Răspundem la orice solicitare de ofertă în maximum 48 de ore lucrătoare de la primire." },
  { Icon: CheckCircle2, title: "Conformitate legală", desc: "Toate ofertele respectă Legea 98/2016 privind achizițiile publice și normele de aplicare." },
];

const steps = [
  { num: "1", title: "Identificați produsele necesare", desc: "Consultați catalogul nostru sau contactați-ne cu specificațiile tehnice / codul CPV." },
  { num: "2", title: "Solicitați oferta", desc: "Completați formularul de cerere de ofertă cu detalii despre cantitate și termenul de livrare." },
  { num: "3", title: "Primiți oferta detaliată", desc: "Vă transmitem oferta în maxim 48 de ore, cu prețuri, termeni și documentația necesară." },
  { num: "4", title: "Publicați procedura SEAP", desc: "Publicați procedura de achiziție pe e-licitatie.ro. Participăm și depunem oferta electronică." },
];

export default function LicitatiiB2GPage() {
  return (
    <>
      <PageHeader
        title="Licitații Publice B2G"
        subtitle="Furnizor autorizat SEAP — participăm la achiziții publice pentru scule, accesorii și echipamente de protecție."
        dark
      />

      {/* Why us */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">De ce ScuDiver</p>
            <h2 className="font-display font-extrabold text-4xl text-white uppercase leading-none">
              Partener B2G de Încredere
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-sm p-6">
                <Icon size={32} className="text-brand mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-white text-lg uppercase mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPV Codes table */}
      <section className="bg-surface py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Nomenclator</p>
            <h2 className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none">
              Coduri CPV Disponibile
            </h2>
            <p className="text-muted mt-3 text-sm">
              Conform Regulamentului CE nr. 213/2008 privind Vocabularul Comun al Achizițiilor Publice.
            </p>
          </div>
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm" aria-label="Coduri CPV produse ScuDiver">
              <thead>
                <tr className="bg-charcoal text-white">
                  <th className="text-left px-5 py-3 font-display font-bold uppercase text-xs tracking-wider">Categorie</th>
                  <th className="text-left px-5 py-3 font-display font-bold uppercase text-xs tracking-wider">Cod CPV</th>
                  <th className="text-left px-5 py-3 font-display font-bold uppercase text-xs tracking-wider hidden md:table-cell">Descriere CPV</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={cat.slug} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                    <td className="px-5 py-3.5 font-semibold text-charcoal">{cat.name}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-brand">{cat.cpvCode}</td>
                    <td className="px-5 py-3.5 text-muted hidden md:table-cell">{cat.cpvDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-3">
            * Pentru produse cu coduri CPV specifice nelistate, contactați-ne — portofoliul nostru acoperă o gamă extinsă de articole de fierărie și scule.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Cum funcționează</p>
            <h2 className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none">
              Procesul de Achiziție
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-brand text-white font-display font-extrabold text-xl rounded-sm flex items-center justify-center shrink-0">
                  {num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-charcoal uppercase mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="bg-surface py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-charcoal uppercase mb-6">
            Documente furnizate la cerere
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Declarație de conformitate CE",
              "Fișă tehnică / manual utilizare",
              "Certificat de garanție",
              "Certificate ISO furnizor",
              "Autorizații specifice produs",
              "Specificație tehnică detaliată",
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-3 bg-white border border-border rounded-sm px-4 py-3">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span className="text-sm text-charcoal font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-4xl text-white uppercase mb-4">
            Solicitați Oferta
          </h2>
          <p className="text-white/60 mb-8">
            Completați formularul de cerere de ofertă cu specificațiile necesare și vă răspundem în maxim 48 de ore lucrătoare cu o ofertă detaliată.
          </p>
          <Link
            href="/cerere-oferta"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-lg uppercase px-10 py-4 rounded-sm hover:bg-brand-dark transition-colors"
          >
            Cerere de Ofertă <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
