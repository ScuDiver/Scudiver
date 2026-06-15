import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Truck, Zap } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, text: "Scule certificate CE" },
  { icon: Award, text: "ISO 9001 furnizori" },
  { icon: Truck, text: "Livrare rapidă B2G" },
];

const stats = [
  { n: "500+", l: "Produse" },
  { n: "8 ani", l: "Experiență" },
  { n: "48h", l: "Răspuns B2G" },
  { n: "16+", l: "Branduri" },
];

export function Hero() {
  return (
    <section
      className="relative bg-charcoal overflow-hidden"
      aria-label="Secțiune principală"
    >
      {/* Red accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand z-10" aria-hidden="true" />

      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.8) 39px, rgba(255,255,255,0.8) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.8) 39px, rgba(255,255,255,0.8) 40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text content */}
          <div>
            <p className="text-brand font-display font-bold text-sm uppercase tracking-widest mb-4">
              Furnizor Autorizat SEAP · Est. 2016
            </p>

            <h1 className="font-display font-extrabold text-white uppercase leading-none tracking-tight">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl">
                SCULE &amp;
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-brand">
                ACCESORII
              </span>
              <span className="block text-3xl sm:text-4xl md:text-4xl text-white/70 mt-2">
                PENTRU CONSTRUCȚII
              </span>
            </h1>

            <p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              Distribuitor profesional de scule electrice, scule de mână, burghie,
              elemente de asamblare și consumabile. Participăm la licitații publice
              prin{" "}
              <a
                href="https://e-licitatie.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-white underline transition-colors"
              >
                e-licitatie.ro
              </a>
              .
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-base uppercase px-7 py-3.5 rounded-sm hover:bg-brand-dark transition-colors group"
              >
                Cere Ofertă
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/produse"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-display font-bold text-base uppercase px-7 py-3.5 rounded-sm hover:border-white/50 hover:bg-white/5 transition-colors"
              >
                Catalog Produse
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              {pillars.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                  <Icon size={14} className="text-brand" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual composition */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-full max-w-md">

              {/* Main card */}
              <div
                className="relative rounded-sm overflow-hidden border border-white/10 p-8"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}
              >
                {/* Diagonal stripe pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "14px 14px",
                  }}
                />

                {/* Central icon block */}
                <div className="relative flex flex-col items-center py-8">
                  {/* Large icon in brand red square */}
                  <div className="relative">
                    <div
                      className="w-24 h-24 rounded-sm flex items-center justify-center shadow-2xl"
                      style={{ background: "linear-gradient(135deg, #D32027 0%, #8B1419 100%)" }}
                    >
                      <Zap size={52} className="text-white" strokeWidth={1.5} />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-sm opacity-40 blur-xl bg-brand scale-150" />
                  </div>

                  {/* Label under icon */}
                  <div className="mt-5 text-center">
                    <p className="font-display font-extrabold text-white text-xl uppercase tracking-wide">
                      Calitate Certificată
                    </p>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">
                      CE · ISO 9001 · ETA
                    </p>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-2 -right-4 bg-white text-charcoal text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-brand" />
                    Certificat CE
                  </div>
                  <div className="absolute -bottom-2 -left-4 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1.5">
                    <Award size={12} />
                    SEAP Autorizat
                  </div>
                </div>

                {/* Stats grid */}
                <div className="relative grid grid-cols-2 gap-3 mt-4">
                  {stats.map(({ n, l }) => (
                    <div
                      key={n}
                      className="border border-white/10 rounded-sm p-3 text-center"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <div className="font-display font-extrabold text-white text-2xl leading-none">
                        {n}
                      </div>
                      <div className="text-white/40 text-xs mt-1 uppercase tracking-wide">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-brand rounded-tl-sm" />
              <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-brand rounded-br-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
