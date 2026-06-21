import Link from "next/link";
import { ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ShowcaseCard {
  title: string;
  subtitle: string;
  desc: string;
  gradient: string;
  accentColor: string;
  Icon: LucideIcon;
  tags: string[];
  href: string;
  label: string;
}

const cards: ShowcaseCard[] = [
  {
    title: "Putere",
    subtitle: "Industrială",
    desc: "Scule electrice profesionale cu motor fără perii, concepute pentru randament maxim în condiții grele de șantier.",
    gradient: "linear-gradient(145deg, #D32027 0%, #8B1419 60%, #5A0D10 100%)",
    accentColor: "#ff6b6b",
    Icon: Zap,
    tags: ["Rotopercutoare", "Polizoare Unghiulare", "Fierăstraie Circulare"],
    href: "/produse/scule-electrice",
    label: "Scule Electrice",
  },
  {
    title: "Precizie",
    subtitle: "Maximă",
    desc: "Instrumente de mână și accesorii calibrate la toleranțe strânse, pentru mecanici, instalatori și constructori profesioniști.",
    gradient: "linear-gradient(145deg, #1A1A1A 0%, #374151 60%, #1F2937 100%)",
    accentColor: "#9CA3AF",
    Icon: Target,
    tags: ["Chei Dinamometrice", "Truse Complete", "Burghie HSS"],
    href: "/produse/scule-de-mana",
    label: "Scule de Mână",
  },
  {
    title: "Protecție",
    subtitle: "Conformă UE",
    desc: "Echipamente individuale de protecție cu marcaj CE și certificare conform standardelor europene EN 397, EN 388 și EN 166.",
    gradient: "linear-gradient(145deg, #EA580C 0%, #C2410C 60%, #7C2D12 100%)",
    accentColor: "#FB923C",
    Icon: ShieldCheck,
    tags: ["EN 397 Căști", "EN 388 Mănuși", "EN 166 Ochelari"],
    href: "/produse/echipament-de-protectie",
    label: "Echipament Protecție",
  },
];

export function ToolsShowcase() {
  return (
    <section className="bg-charcoal py-16" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">
            De ce ScuDiver
          </p>
          <h2
            id="showcase-heading"
            className="font-display font-extrabold text-4xl md:text-5xl text-white uppercase leading-none"
          >
            Scule pentru Profesioniști
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => {
            const { Icon } = card;
            return (
              <div
                key={card.title}
                className="group relative rounded-sm overflow-hidden"
                style={{ background: card.gradient }}
              >
                {/* Diagonal stripe texture */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                    backgroundSize: "14px 14px",
                  }}
                  aria-hidden="true"
                />
                {/* Radial dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                  aria-hidden="true"
                />
                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)" }}
                  aria-hidden="true"
                />

                <div className="relative p-7 flex flex-col h-full min-h-[320px]">
                  {/* Icon with glow */}
                  <div className="mb-5">
                    <div className="relative inline-block">
                      <Icon
                        size={48}
                        className="text-white"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute inset-0 blur-xl opacity-60 scale-150"
                        style={{ background: card.accentColor }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-white uppercase leading-none">
                    <span className="block text-3xl">{card.title}</span>
                    <span className="block text-xl text-white/70">{card.subtitle}</span>
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-white/60 text-sm leading-relaxed flex-1">
                    {card.desc}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-white/70 border border-white/20 px-2 py-0.5 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-white font-display font-bold text-sm uppercase hover:gap-3 transition-all"
                    aria-label={`Vezi ${card.label}`}
                  >
                    Vezi produsele
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
