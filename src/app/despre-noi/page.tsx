import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Award, Handshake, Building2, Users, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Despre Noi",
  description: "ScuDiver — distribuitor profesional de scule și accesorii pentru construcții din 2016. Partener B2G de încredere în licitații publice SEAP.",
};

const milestones = [
  {
    year: "2016",
    title: "Înființare",
    desc: "Compania ia ființă cu focalizare pe furnizarea de scule profesionale pentru sectorul construcțiilor și al instituțiilor publice din România.",
  },
  {
    year: "2018",
    title: "Extindere portofoliu",
    desc: "Parteneriate cu branduri internaționale premium: Bosch, DeWalt, Milwaukee, Makita, Unior, BGS, YATO și alți producători europeni.",
  },
  {
    year: "2020",
    title: "Înregistrare SEAP",
    desc: "Certificare și înregistrare activă pe platforma SEAP / e-licitatie.ro pentru participarea la licitații publice și achiziții directe.",
  },
  {
    year: "2026",
    title: "Astăzi",
    desc: "Portofoliu de peste 500 de produse, 16+ branduri internaționale și parteneriate active cu instituții publice din toată România.",
  },
];

const values = [
  { Icon: Award, title: "Calitate certificată", desc: "Toate produsele dețin marcaj CE și sunt conforme cu directivele europene aplicabile." },
  { Icon: Handshake, title: "Parteneriat B2G", desc: "Experiență solidă în colaborarea cu instituții publice, primării, școli și spitale prin SEAP." },
  { Icon: Building2, title: "Transparență totală", desc: "Oferte detaliate, documentație tehnică completă și transparență în toate etapele contractuale." },
  { Icon: Users, title: "Suport tehnic", desc: "Consultanță pentru specificații, caiet de sarcini și documentație necesară achizițiilor publice." },
];

const caenCodes = [
  { code: "4674", desc: "Comerț cu ridicata al articolelor de fierărie, feronerie și articole din sticlă" },
  { code: "4752", desc: "Comerț cu amănuntul al articolelor de fierărie, vopsele și sticlă" },
  { code: "4690", desc: "Comerț cu ridicata nespecializat" },
];

export default function DespreNoiPage() {
  return (
    <>
      <PageHeader
        title="Despre ScuDiver"
        subtitle="Distribuitor profesional de scule și accesorii pentru construcții — partener de încredere în licitații publice din 2016."
        dark
      />

      {/* Mission */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
                Misiunea noastră
              </p>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none mb-6">
                Scule Profesionale pentru Constructori
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                ScuDiver este o companie românească specializată în distribuția de scule electrice,
                scule de mână, burghie, accesorii, elemente de asamblare și echipamente individuale
                de protecție destinate industriei construcțiilor, instalatorilor și instituțiilor publice.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Participăm activ la proceduri de achiziție publică prin platforma SEAP /
                e-licitatie.ro, oferind documentație tehnică completă, certificare CE și termene
                de livrare adaptate necesităților instituționale.
              </p>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 mt-6 bg-brand text-white font-display font-bold text-sm uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
              >
                Solicitați o ofertă <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white/5 border border-white/10 rounded-sm p-5">
                  <Icon size={28} className="text-brand mb-3" strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-white text-base uppercase mb-2">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Istoric</p>
            <h2 className="font-display font-extrabold text-4xl text-charcoal uppercase leading-none">
              Evoluție în timp
            </h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-0 items-stretch">
                {/* Year column */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-charcoal rounded-sm flex flex-col items-center justify-center border-2 border-brand relative z-10 shrink-0">
                    <Calendar size={12} className="text-brand mb-1" />
                    <span className="font-display font-extrabold text-white text-lg leading-none">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" aria-hidden="true" />
                  )}
                </div>
                {/* Content */}
                <div className={`ml-6 pb-10 flex-1 ${i === milestones.length - 1 ? "pb-0" : ""}`}>
                  <div className="bg-white border border-border rounded-sm p-5 mt-3">
                    <h3 className="font-display font-bold text-xl text-charcoal uppercase mb-2">{m.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAEN codes */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-charcoal uppercase mb-6">
            Coduri CAEN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caenCodes.map((c) => (
              <div key={c.code} className="bg-surface border border-border rounded-sm p-5">
                <p className="font-mono font-extrabold text-brand text-3xl mb-2">{c.code}</p>
                <p className="text-sm text-charcoal leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">
            Coduri CAEN înregistrate conform Ordinului INS nr. 337/2007 privind actualizarea Clasificării Activităților din Economia Națională — CAEN Rev. 2.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-12 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl text-charcoal uppercase mb-4">
            Colaborați cu noi
          </h2>
          <p className="text-muted mb-6">
            Sunteți o instituție publică sau o firmă de construcții? Completați formularul de cerere de ofertă și vă răspundem în maxim 48 de ore lucrătoare.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-8 py-3.5 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Cerere de Ofertă <ArrowRight size={16} />
            </Link>
            <Link
              href="/licitatii-b2g"
              className="inline-flex items-center justify-center gap-2 border-2 border-charcoal text-charcoal font-display font-bold text-base uppercase px-8 py-3.5 rounded-sm hover:bg-charcoal hover:text-white transition-colors"
            >
              Licitații Publice B2G
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
