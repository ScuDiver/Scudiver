import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Declarație de Accesibilitate",
  description: "Declarația de accesibilitate a site-ului scudiver.ro — angajamentul față de standardul WCAG 2.1 Nivel AA.",
};

const achieved = [
  "Structură semantică HTML5 cu landmark-uri ARIA (header, nav, main, footer)",
  "Contrast cromatică conformă cu WCAG 2.1 criteriul 1.4.3 (contrast minim 4.5:1 pentru text normal)",
  "Navigare completă prin tastatură — toate elementele interactive sunt accesibile cu Tab/Enter/Space",
  "Link de salt la conținut principal (skip-link) vizibil la focus cu tastatură",
  "Imagini cu atribute alt descriptive",
  "Formulare cu etichete (label) asociate și mesaje de eroare accesibile (role=alert)",
  "Titluri ierarhice (h1–h3) utilizate corect pentru structurarea conținutului",
  "Atribute lang=\"ro\" pe elementul html pentru suport screen-reader corect",
  "Banner de cookie-uri operat integral prin tastatură",
];

const known = [
  "Imaginile logo-urilor de brand (fișiere JPEG furnizate de producători) pot prezenta contrast redus pe fundaluri deschise — se compensează prin atribut alt descriptiv.",
  "Harta locației din pagina Contact este o reprezentare grafică CSS fără date reale — se furnizează adresa textuală completă alăturat.",
];

export default function DeclaratieAccesibilitatePage() {
  return (
    <>
      <PageHeader
        title="Declarație de Accesibilitate"
        subtitle="Angajamentul ScuDiver față de accesibilitatea digitală — WCAG 2.1 Nivel AA."
        dark
      />
      <div className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border rounded-sm p-6 md:p-8 space-y-8 text-sm text-charcoal leading-relaxed">

            <section aria-labelledby="h-angajament">
              <h2 id="h-angajament" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                1. Angajamentul față de accesibilitate
              </h2>
              <p>
                <strong>[DENUMIRE_COMPLETA_FIRMA] SRL</strong> se angajează să asigure accesibilitatea
                site-ului scudiver.ro pentru toate persoanele, inclusiv pentru cele cu dizabilități vizuale,
                motorii, auditive sau cognitive. Facem eforturi continue pentru a îmbunătăți experiența
                utilizatorilor și pentru a respecta standardele internaționale de accesibilitate.
              </p>
            </section>

            <section aria-labelledby="h-standard">
              <h2 id="h-standard" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                2. Standardul aplicat
              </h2>
              <p>
                Site-ul scudiver.ro urmărește conformitatea cu <strong>WCAG 2.1 Nivel AA</strong>{" "}
                (Web Content Accessibility Guidelines 2.1, publicat de W3C) și cu Directiva UE 2016/2102
                privind accesibilitatea site-urilor web și a aplicațiilor mobile ale organismelor din sectorul public.
              </p>
              <div className="mt-4 bg-surface border border-border rounded-sm p-4 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal">Starea conformității: Parțial conform</p>
                  <p className="text-muted mt-1">
                    Site-ul este parțial conform cu WCAG 2.1 Nivel AA. Neconformitățile cunoscute și
                    limitările sunt listate mai jos.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="h-realizat">
              <h2 id="h-realizat" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                3. Ce am realizat
              </h2>
              <ul className="space-y-2">
                {achieved.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-brand shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="h-limitari">
              <h2 id="h-limitari" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                4. Limitări cunoscute
              </h2>
              <ul className="space-y-3">
                {known.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="h-testare">
              <h2 id="h-testare" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                5. Metode de testare
              </h2>
              <p>Accesibilitatea site-ului a fost evaluată prin:</p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-charcoal">
                <li>Navigare exclusivă prin tastatură (Tab, Shift+Tab, Enter, Space, Escape)</li>
                <li>Testare cu screen-reader NVDA + Mozilla Firefox (Windows)</li>
                <li>Testare cu VoiceOver + Safari (macOS/iOS)</li>
                <li>Verificare contrast cromatică cu WebAIM Contrast Checker</li>
                <li>Audit automat cu Lighthouse (Google Chrome DevTools)</li>
              </ul>
            </section>

            <section aria-labelledby="h-feedback">
              <h2 id="h-feedback" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                6. Feedback și raportare probleme
              </h2>
              <p>
                Dacă întâmpinați probleme de accesibilitate pe site-ul nostru sau dacă aveți nevoie de
                informații într-un format alternativ, vă rugăm să ne contactați:
              </p>
              <address className="mt-4 not-italic bg-surface border border-border rounded-sm p-4">
                <p><strong>[DENUMIRE_COMPLETA_FIRMA] SRL</strong></p>
                <p>Email accesibilitate:{" "}
                  <a href="mailto:accesibilitate@scudiver.ro" className="text-brand underline">
                    accesibilitate@scudiver.ro
                  </a>
                  {" "}(sau office@scudiver.ro cu subiectul „Accesibilitate")
                </p>
                <p>Telefon: <a href="tel:[TELEFON_PLACEHOLDER]" className="text-brand underline">[TELEFON_PLACEHOLDER]</a></p>
                <p>Termen răspuns: 15 zile lucrătoare</p>
              </address>
              <p className="mt-4">
                De asemenea, puteți utiliza{" "}
                <Link href="/contact" className="text-brand underline">formularul de contact</Link> de pe site.
              </p>
            </section>

            <section aria-labelledby="h-procedura">
              <h2 id="h-procedura" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                7. Procedura de aplicare
              </h2>
              <p>
                Dacă răspunsul nostru la sesizarea dumneavoastră de accesibilitate nu este satisfăcător,
                puteți escalada problema la:
              </p>
              <address className="mt-3 not-italic bg-surface border border-border rounded-sm p-4 text-sm">
                <p><strong>Autoritatea Națională pentru Administrare și Reglementare în Comunicații (ANCOM)</strong></p>
                <p>Str. Delea Nouă nr. 2, sector 3, București 030925</p>
                <p>
                  <a href="https://www.ancom.ro" target="_blank" rel="noopener noreferrer" className="text-brand underline">
                    www.ancom.ro
                  </a>
                </p>
              </address>
            </section>

            <p className="text-xs text-muted border-t border-border pt-4">
              Prezenta declarație a fost redactată la [DATA_ACTUALIZARE] și va fi revizuită anual sau ori de câte ori sunt efectuate modificări semnificative ale site-ului.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
