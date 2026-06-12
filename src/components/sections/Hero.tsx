import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Truck } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, text: "Scule certificate CE" },
  { icon: Award, text: "ISO 9001 furnizori" },
  { icon: Truck, text: "Livrare rapidă B2G" },
];

export function Hero() {
  return (
    <section
      className="relative bg-charcoal hero-pattern overflow-hidden"
      aria-label="Secțiune principală"
    >
      {/* Red accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand" aria-hidden="true" />

      {/* Background texture grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 39px, rgba(255,255,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 39px, rgba(255,255,255,0.3) 40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-brand font-display font-bold text-lg uppercase tracking-widest mb-4">
            Furnizor Autorizat SEAP · Est. 2016
          </p>

          {/* Main headline */}
          <h1 className="font-display font-extrabold text-white uppercase leading-none tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              SCULE &amp;
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand">
              ACCESORII
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-white/80 mt-2">
              PENTRU CONSTRUCȚII
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            Distribuitor profesional de scule electrice, scule de mână, burghie și
            consumabile. Participăm la licitații publice prin{" "}
            <a
              href="https://e-licitatie.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:text-brand-light underline"
            >
              e-licitatie.ro
            </a>{" "}
            — răspuns rapid la solicitările instituțiilor publice.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-lg uppercase px-8 py-4 rounded-sm hover:bg-brand-dark transition-colors group"
            >
              Cere Ofertă
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/produse"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-display font-bold text-lg uppercase px-8 py-4 rounded-sm hover:border-white hover:bg-white/10 transition-colors"
            >
              Catalog Produse
            </Link>
          </div>

          {/* Trust pillars */}
          <div className="mt-10 flex flex-wrap gap-6">
            {pillars.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon size={16} className="text-brand" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
