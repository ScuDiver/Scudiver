import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate",
  description: "Politica de confidențialitate ScuDiver — cum prelucrăm datele dumneavoastră personale conform GDPR și Legii 190/2018.",
};

const rights = [
  { title: "Dreptul de acces", desc: "Aveți dreptul de a solicita o copie a datelor personale pe care le deținem despre dumneavoastră (Art. 15 GDPR)." },
  { title: "Dreptul la rectificare", desc: "Aveți dreptul de a solicita corectarea datelor inexacte sau completarea celor incomplete (Art. 16 GDPR)." },
  { title: "Dreptul la ștergere", desc: "Aveți dreptul de a solicita ștergerea datelor personale în anumite condiții prevăzute de Art. 17 GDPR." },
  { title: "Dreptul la portabilitate", desc: "Aveți dreptul de a primi datele furnizate într-un format structurat, utilizat frecvent (Art. 20 GDPR)." },
  { title: "Dreptul la opoziție", desc: "Aveți dreptul de a vă opune prelucrării datelor dumneavoastră în anumite situații (Art. 21 GDPR)." },
  { title: "Dreptul la restricție", desc: "Aveți dreptul de a solicita restricționarea prelucrării în cazurile prevăzute de Art. 18 GDPR." },
];

export default function PoliticaConfidentialitatePage() {
  return (
    <>
      <PageHeader
        title="Politică de Confidențialitate"
        subtitle="Cum colectăm, utilizăm și protejăm datele dumneavoastră personale, conform GDPR și Legii nr. 190/2018."
        dark
      />
      <div className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border rounded-sm p-6 md:p-8 space-y-8 text-sm text-charcoal leading-relaxed">

            <section aria-labelledby="h-operator">
              <h2 id="h-operator" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                1. Cine suntem (operatorul de date)
              </h2>
              <p>
                Operatorul de date cu caracter personal este <strong>[DENUMIRE_COMPLETA_FIRMA] SRL</strong>,
                cu sediul social la [ADRESA_COMPLETA], [LOCALITATE], [JUDET],
                CUI: RO[CUI_PLACEHOLDER], J[J_PLACEHOLDER].
              </p>
              <p className="mt-3">
                Contact responsabil cu protecția datelor (DPO):{" "}
                <a href="mailto:dpo@scudiver.ro" className="text-brand underline">dpo@scudiver.ro</a>{" "}
                (sau office@scudiver.ro cu mențiunea „GDPR").
              </p>
            </section>

            <section aria-labelledby="h-date">
              <h2 id="h-date" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                2. Ce date colectăm
              </h2>
              <p>Colectăm datele cu caracter personal exclusiv atunci când ni le furnizați în mod voluntar:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-charcoal">
                <li><strong>Formulare de contact și cerere de ofertă:</strong> nume, adresă de email, număr de telefon (opțional), denumire firmă/instituție, conținutul mesajului.</li>
                <li><strong>Formulare de reclamații:</strong> aceleași categorii de date, plus subiectul sesizării.</li>
                <li><strong>Cookie-uri:</strong> date tehnice de navigare, conform{" "}
                  <Link href="/politica-cookie" className="text-brand underline">Politicii de Cookie-uri</Link>.
                </li>
              </ul>
              <p className="mt-3">
                Nu colectăm date din categorii speciale (date medicale, biometrice, politice, religioase etc.).
              </p>
            </section>

            <section aria-labelledby="h-scop">
              <h2 id="h-scop" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                3. Scopul și baza legală a prelucrării
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-sm" aria-label="Scopuri prelucrare date">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-4 py-2.5 font-bold border-b border-border">Scop</th>
                      <th className="text-left px-4 py-2.5 font-bold border-b border-border">Baza legală</th>
                      <th className="text-left px-4 py-2.5 font-bold border-b border-border">Retenție</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Răspuns la mesaje de contact", "Art. 6(1)(b) GDPR — executarea unui contract / pași pre-contractuali", "3 ani"],
                      ["Soluționarea reclamațiilor", "Art. 6(1)(c) GDPR — obligație legală (Legea 365/2002)", "5 ani"],
                      ["Trimitere newsletter (dacă aplicabil)", "Art. 6(1)(a) GDPR — consimțământ", "Până la revocare"],
                      ["Cookie-uri esențiale", "Art. 6(1)(f) GDPR — interes legitim tehnic", "Sesiune / 1 an"],
                    ].map(([s, b, r], i) => (
                      <tr key={s} className={i % 2 === 0 ? "" : "bg-surface"}>
                        <td className="px-4 py-2.5 border-b border-border">{s}</td>
                        <td className="px-4 py-2.5 border-b border-border text-muted">{b}</td>
                        <td className="px-4 py-2.5 border-b border-border font-medium">{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="h-destinatari">
              <h2 id="h-destinatari" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                4. Destinatarii datelor
              </h2>
              <p>
                Datele dumneavoastră nu sunt vândute sau închiriate terților. Le putem transmite exclusiv:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Furnizorilor de servicii tehnice (hosting, email) cu care avem contracte de prelucrare — exclusiv în UE/SEE sau cu garanții adecvate;</li>
                <li>Autorităților publice, la solicitarea acestora în exercitarea atribuțiilor legale.</li>
              </ul>
            </section>

            <section aria-labelledby="h-drepturi">
              <h2 id="h-drepturi" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                5. Drepturile dumneavoastră
              </h2>
              <p className="mb-4">
                Conform Regulamentului UE 2016/679 (GDPR) și Legii nr. 190/2018, beneficiați de următoarele drepturi:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rights.map((r) => (
                  <div key={r.title} className="bg-surface border border-border rounded-sm p-4">
                    <h3 className="font-bold text-charcoal text-sm mb-1">{r.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                Pentru a vă exercita drepturile, transmiteți o cerere scrisă la{" "}
                <a href="mailto:office@scudiver.ro" className="text-brand underline">office@scudiver.ro</a>.
                Vom răspunde în termen de 30 de zile calendaristice.
              </p>
            </section>

            <section aria-labelledby="h-anspdcp">
              <h2 id="h-anspdcp" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                6. Dreptul de a depune plângere la ANSPDCP
              </h2>
              <p>
                Dacă considerați că drepturile dumneavoastră au fost încălcate, aveți dreptul de a depune
                o plângere la <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>:
              </p>
              <address className="mt-3 not-italic bg-surface border border-border rounded-sm p-4 text-sm">
                <p><strong>ANSPDCP</strong></p>
                <p>B-dul G-ral. Gheorghe Magheru 28–30, Sector 1, București 010336</p>
                <p>
                  <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-brand underline">
                    www.dataprotection.ro
                  </a>
                </p>
              </address>
            </section>

            <section aria-labelledby="h-actualizare">
              <h2 id="h-actualizare" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                7. Modificarea politicii
              </h2>
              <p>
                Operatorul poate actualiza prezenta Politică de Confidențialitate periodic. Versiunea
                actualizată va fi publicată pe Site cu indicarea datei ultimei revizuiri.
              </p>
              <p className="mt-2 text-muted text-xs">
                Data ultimei actualizări: [DATA_ACTUALIZARE]
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
