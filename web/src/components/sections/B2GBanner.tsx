import Link from "next/link";
import { ArrowRight, FileText, BadgeCheck, Clock } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Operator înregistrat în SEAP",
    desc: "Prezenti pe e-licitatie.ro. Toate documentele de calificare disponibile la cerere.",
  },
  {
    icon: FileText,
    title: "Oferte tehnice detaliate",
    desc: "Specificații tehnice complete, coduri CPV, conformitate CE și certificate ISO.",
  },
  {
    icon: Clock,
    title: "Răspuns în 48 de ore",
    desc: "Cerințele dvs. primesc ofertă fermă în maximum 2 zile lucrătoare.",
  },
];

export function B2GBanner() {
  return (
    <section className="bg-charcoal py-16" aria-labelledby="b2g-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">
            Achiziții Publice
          </p>
          <h2
            id="b2g-heading"
            className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none"
          >
            Partener de Încredere
            <br />
            <span className="text-brand">pentru Instituții Publice</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Experiență în livrarea de scule și echipamente prin proceduri de
            licitație publică. Documentație completă, prețuri competitive, garanție.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-brand/20 rounded-sm flex items-center justify-center">
                  <Icon size={18} className="text-brand" />
                </div>
                <h3 className="font-display font-bold text-white uppercase text-base leading-tight">
                  {title}
                </h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/cerere-oferta"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-8 py-4 rounded-sm hover:bg-brand-dark transition-colors group"
          >
            Trimite Cerere de Ofertă
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/licitatii-b2g"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-display font-bold text-base uppercase px-8 py-4 rounded-sm hover:border-white hover:bg-white/10 transition-colors"
          >
            Informații B2G / SEAP
          </Link>
        </div>
      </div>
    </section>
  );
}
