"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

function QuoteForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get("produs") ?? "";
  const prefilledSku = searchParams.get("sku") ?? "";

  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    products: prefilledProduct
      ? `${prefilledProduct}${prefilledSku ? ` (SKU: ${prefilledSku})` : ""}`
      : "",
    message: "",
    gdprConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (prefilledProduct) {
      setForm((f) => ({
        ...f,
        products: `${prefilledProduct}${prefilledSku ? ` (SKU: ${prefilledSku})` : ""}`,
      }));
    }
  }, [prefilledProduct, prefilledSku]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gdprConsent) {
      setErrorMsg("Vă rugăm să bifați acordul GDPR pentru a putea trimite formularul.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/cerere-oferta", {
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
    <div className="bg-surface py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {status === "success" ? (
          <div className="bg-white border border-border rounded-sm p-10 text-center">
            <CheckCircle2 size={48} className="text-brand mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-charcoal uppercase mb-2">
              Cerere Trimisă cu Succes!
            </h2>
            <p className="text-muted mb-6">
              Am primit cererea dvs. de ofertă. Vă vom contacta în cel mult{" "}
              <strong>48 de ore lucrătoare</strong> cu o ofertă detaliată.
            </p>
            <Link
              href="/produse"
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors"
            >
              Continuați navigarea în catalog
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-sm p-6 md:p-8">
            <h2 className="font-display font-bold text-2xl text-charcoal uppercase mb-1">
              Completați Formularul
            </h2>
            <p className="text-muted text-sm mb-6">
              Câmpurile marcate cu <span className="text-brand font-bold">*</span> sunt obligatorii.
              Vom răspunde în maximum 48 de ore lucrătoare.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Firmă / Instituție <span className="text-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="SC Exemplu SRL / Primăria..."
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className={labelClass}>
                    Persoană de contact <span className="text-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Prenume și Nume"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="exemplu@firma.ro"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="07xx xxx xxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="products" className={labelClass}>
                  Produse / Servicii solicitate
                </label>
                <textarea
                  id="products"
                  rows={3}
                  className={inputClass}
                  placeholder="Enumerați produsele, cantitățile, codul SKU sau CPV (dacă îl cunoașteți)..."
                  value={form.products}
                  onChange={(e) => setForm({ ...form, products: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Mesaj suplimentar <span className="text-brand" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className={inputClass}
                  placeholder="Specificați termenul de livrare, condițiile speciale sau orice informație relevantă..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {/* GDPR consent — MUST be unchecked by default, Legea 190/2018 */}
              <div className="bg-surface border border-border rounded-sm p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="gdprConsent"
                    required
                    checked={form.gdprConsent}
                    onChange={(e) => setForm({ ...form, gdprConsent: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-brand shrink-0"
                    aria-describedby="gdpr-desc"
                  />
                  <span className="text-sm text-charcoal" id="gdpr-desc">
                    <span className="text-brand font-bold">*</span> Am citit și sunt de acord cu{" "}
                    <Link
                      href="/politica-confidentialitate"
                      target="_blank"
                      className="text-brand underline hover:text-brand-dark"
                    >
                      Politica de Confidențialitate
                    </Link>
                    . Datele furnizate vor fi utilizate exclusiv pentru procesarea cererii de ofertă.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-brand text-white font-display font-bold text-lg uppercase px-6 py-4 rounded-sm hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {status === "loading" ? "Se trimite..." : "Trimite Cererea"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CerereOfertaPage() {
  return (
    <>
      <PageHeader
        title="Cerere de Ofertă"
        subtitle="Completați formularul și primiți o ofertă personalizată în cel mult 48 de ore lucrătoare."
        dark
      />
      <Suspense fallback={<div className="py-12 text-center text-muted">Se încarcă...</div>}>
        <QuoteForm />
      </Suspense>
    </>
  );
}
