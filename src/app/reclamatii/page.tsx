"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Send, Clock, Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const steps = [
  {
    num: "1",
    title: "Depuneți reclamația",
    desc: "Completați formularul de mai jos sau trimiteți un email la reclamatii@scudiver.ro sau sunați la numărul de telefon.",
  },
  {
    num: "2",
    title: "Confirmare primire",
    desc: "Veți primi o confirmare de primire în maximum 48 de ore lucrătoare.",
  },
  {
    num: "3",
    title: "Analiză și răspuns",
    desc: "Sesizarea este analizată și primiți un răspuns complet în termenul legal aplicabil.",
  },
];

export default function ReclamatiiPage() {
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
      setErrorMsg("Vă rugăm să bifați acordul GDPR pentru a putea trimite formularul.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: `[RECLAMAȚIE] ${form.subject}` }),
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
        title="Reclamații și Sesizări"
        subtitle="Procedură gratuită de soluționare a reclamațiilor, conform Legii nr. 365/2002."
        dark
      />

      <div className="bg-surface py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Procedure info */}
          <div className="bg-white border border-border rounded-sm p-6 mb-8">
            <h2 className="font-display font-bold text-xl text-charcoal uppercase mb-4">
              Procedura de Reclamații
            </h2>
            <div className="flex items-center gap-2 mb-4 text-sm text-brand font-semibold bg-brand/10 border border-brand/20 rounded-sm px-3 py-2">
              <Clock size={14} />
              Confirmare primire: maximum 48 de ore. Procedura este GRATUITĂ.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex gap-3">
                  <div className="w-8 h-8 bg-brand text-white font-display font-bold text-sm rounded-sm flex items-center justify-center shrink-0">
                    {num}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{title}</p>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a
              href="mailto:reclamatii@scudiver.ro"
              className="flex items-center gap-3 bg-white border border-border rounded-sm p-4 hover:border-brand hover:bg-brand/5 transition-colors group"
            >
              <Mail size={20} className="text-brand" />
              <div>
                <p className="font-semibold text-charcoal text-sm group-hover:text-brand transition-colors">
                  Email reclamații
                </p>
                <p className="text-xs text-muted">reclamatii@scudiver.ro</p>
              </div>
            </a>
            <a
              href="tel:[TELEFON_PLACEHOLDER]"
              className="flex items-center gap-3 bg-white border border-border rounded-sm p-4 hover:border-brand hover:bg-brand/5 transition-colors group"
            >
              <Phone size={20} className="text-brand" />
              <div>
                <p className="font-semibold text-charcoal text-sm group-hover:text-brand transition-colors">
                  Telefon
                </p>
                <p className="text-xs text-muted">[TELEFON_PLACEHOLDER]</p>
              </div>
            </a>
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="bg-white border border-border rounded-sm p-10 text-center">
              <CheckCircle2 size={48} className="text-brand mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl text-charcoal uppercase mb-2">
                Sesizare Primită!
              </h3>
              <p className="text-muted">
                Am înregistrat sesizarea dvs. și veți primi o confirmare în cel mult{" "}
                <strong>48 de ore</strong>.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-sm p-6">
              <h3 className="font-display font-bold text-xl text-charcoal uppercase mb-4">
                Formular Online
              </h3>
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
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClass}
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
                    placeholder="Descrieți pe scurt problema..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>
                    Detalii reclamație <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className={inputClass}
                    placeholder="Descrieți detaliat situația, data producerii, documentele justificative disponibile..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {/* GDPR — unchecked by default */}
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
                      <span className="text-brand font-bold">*</span> Sunt de acord cu prelucrarea
                      datelor personale conform{" "}
                      <Link
                        href="/politica-confidentialitate"
                        target="_blank"
                        className="text-brand underline hover:text-brand-dark"
                      >
                        Politicii de Confidențialitate
                      </Link>{" "}
                      în scopul soluționării reclamației.
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
                  {status === "loading" ? "Se trimite..." : "Trimite Sesizarea"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
