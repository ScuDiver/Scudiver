"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Send } from "lucide-react";

const contactInfo = [
  {
    Icon: MapPin,
    label: "Adresă sediu social",
    lines: ["[ADRESA_COMPLETA]", "[LOCALITATE], [JUDET] [COD_POSTAL]"],
  },
  {
    Icon: Phone,
    label: "Telefon",
    lines: ["[TELEFON_PLACEHOLDER]"],
    href: "tel:[TELEFON_PLACEHOLDER]",
  },
  {
    Icon: Mail,
    label: "Email",
    lines: ["office@scudiver.ro"],
    href: "mailto:office@scudiver.ro",
  },
  {
    Icon: Clock,
    label: "Program de lucru",
    lines: ["Luni – Vineri: 08:00 – 17:00", "Sâmbătă – Duminică: Închis"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    gdprConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gdprConsent) {
      setErrorMsg("Vă rugăm să bifați acordul GDPR pentru a putea trimite mesajul.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare necunoscută");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Eroare la trimitere.");
    }
  }

  const inputClass =
    "w-full border border-border rounded-sm px-3 py-2.5 text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent placeholder:text-muted/50 transition-shadow";
  const labelClass = "block text-sm font-semibold text-charcoal mb-1";

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="Suntem la dispoziția dumneavoastră pentru orice întrebare, solicitare de ofertă sau informație tehnică."
        dark
      />

      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left — Map placeholder + contact info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Map placeholder */}
              <div
                className="relative rounded-sm overflow-hidden h-52"
                style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #374151 100%)" }}
                aria-label="Hartă locație sediu ScuDiver"
                role="img"
              >
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.5) 29px, rgba(255,255,255,0.5) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(255,255,255,0.5) 29px, rgba(255,255,255,0.5) 30px)",
                  }}
                  aria-hidden="true"
                />
                {/* Glow */}
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 45%, rgba(211,32,39,0.25) 0%, transparent 65%)" }}
                  aria-hidden="true"
                />
                {/* Pin */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center shadow-lg">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand rotate-45" aria-hidden="true" />
                  </div>
                  <div className="mt-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm px-4 py-2 text-center">
                    <p className="text-white font-bold text-sm">ScuDiver SRL</p>
                    <p className="text-white/60 text-xs">[LOCALITATE], România</p>
                  </div>
                </div>
              </div>

              {/* Contact info cards */}
              <div className="space-y-3">
                {contactInfo.map(({ Icon, label, lines, href }) => (
                  <div key={label} className="bg-white border border-border rounded-sm p-4 flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand/10 rounded-sm flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase font-bold tracking-wide mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-charcoal hover:text-brand transition-colors">
                          {lines[0]}
                        </a>
                      ) : (
                        lines.map((l) => (
                          <p key={l} className="text-sm font-semibold text-charcoal">{l}</p>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-charcoal rounded-sm p-5">
                <p className="font-display font-bold text-white uppercase text-base mb-2">Cerere de ofertă</p>
                <p className="text-white/60 text-xs leading-relaxed mb-3">
                  Instituție publică sau firmă? Completați formularul dedicat pentru o ofertă detaliată în 48h.
                </p>
                <Link
                  href="/cerere-oferta"
                  className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-4 py-2.5 rounded-sm hover:bg-brand-dark transition-colors"
                >
                  Cerere de ofertă →
                </Link>
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="bg-white border border-border rounded-sm p-10 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle2 size={48} className="text-brand mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl text-charcoal uppercase mb-2">
                    Mesaj trimis!
                  </h3>
                  <p className="text-muted">
                    Am primit mesajul dumneavoastră și vă vom răspunde în cel mult <strong>48 de ore lucrătoare</strong>.
                  </p>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-sm p-6">
                  <h2 className="font-display font-bold text-xl text-charcoal uppercase mb-1">
                    Trimiteți un mesaj
                  </h2>
                  <p className="text-muted text-sm mb-5">
                    Câmpurile marcate cu <span className="text-brand font-bold">*</span> sunt obligatorii.
                  </p>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Nume complet <span className="text-brand">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          className={inputClass}
                          placeholder="Prenume Nume"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email <span className="text-brand">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          className={inputClass}
                          placeholder="exemplu@firma.ro"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className={labelClass}>Telefon</label>
                        <input
                          id="phone"
                          type="tel"
                          className={inputClass}
                          placeholder="07xx xxx xxx"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className={labelClass}>
                          Subiect <span className="text-brand">*</span>
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          className={inputClass}
                          placeholder="Subiectul mesajului"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Mesaj <span className="text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        className={inputClass}
                        placeholder="Descrieți solicitarea dumneavoastră..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <div className="bg-surface border border-border rounded-sm p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={form.gdprConsent}
                          onChange={(e) => setForm({ ...form, gdprConsent: e.target.checked })}
                          className="mt-0.5 w-4 h-4 accent-brand shrink-0"
                        />
                        <span className="text-sm text-charcoal">
                          <span className="text-brand font-bold">*</span> Sunt de acord cu prelucrarea datelor
                          personale conform{" "}
                          <Link href="/politica-confidentialitate" target="_blank" className="text-brand underline hover:text-brand-dark">
                            Politicii de Confidențialitate
                          </Link>
                          .
                        </span>
                      </label>
                    </div>

                    {errorMsg && (
                      <div role="alert" className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                        <AlertCircle size={16} className="shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center justify-center gap-2 w-full bg-brand text-white font-display font-bold text-base uppercase px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors disabled:opacity-60"
                    >
                      <Send size={16} />
                      {status === "loading" ? "Se trimite..." : "Trimite Mesajul"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
