import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description: "Termenii și condițiile de utilizare ale site-ului scudiver.ro — site de prezentare comercială, fără facilități de comandă sau plată online.",
};

const sections = [
  {
    id: "identificare",
    title: "1. Identificarea operatorului",
    content: `Prezentul site, accesibil la adresa scudiver.ro, este operat de [DENUMIRE_COMPLETA_FIRMA] SRL, persoană juridică română, cu sediul social la [ADRESA_COMPLETA], [LOCALITATE], [JUDET], înregistrată la Registrul Comerțului sub nr. J[J_PLACEHOLDER], CUI RO[CUI_PLACEHOLDER], email: office@scudiver.ro, tel: [TELEFON_PLACEHOLDER] (denumită în continuare „ScuDiver" sau „Operatorul").`,
  },
  {
    id: "obiect",
    title: "2. Obiectul termenilor",
    content: `Prezentele Termeni și Condiții reglementează accesul și utilizarea site-ului scudiver.ro (denumit în continuare „Site-ul"). Prin accesarea Site-ului, utilizatorul acceptă în mod implicit prezentele Termeni și Condiții.

Site-ul are caracter exclusiv informativ și de prezentare comercială. Site-ul nu constituie un magazin online, nu acceptă comenzi ferme, nu procesează plăți online și nu generează contracte de vânzare-cumpărare prin mecanisme digitale automatizate.`,
  },
  {
    id: "utilizare",
    title: "3. Utilizarea Site-ului",
    content: `Site-ul este pus la dispoziția utilizatorilor cu titlu gratuit, exclusiv în scopuri informative. Utilizatorii au dreptul să:

• Navigheze și vizualizeze conținutul publicat;
• Utilizeze formularele de contact și cerere de ofertă pentru a transmite solicitări ScuDiver;
• Descarce materiale publice puse la dispoziție în mod explicit.

Este interzisă:
• Reproducerea, distribuirea sau modificarea conținutului fără acordul scris al Operatorului;
• Utilizarea Site-ului în scopuri frauduloase, ilegale sau contrare bunelor maniere;
• Orice acțiune care ar putea afecta funcționarea, securitatea sau integritatea Site-ului.`,
  },
  {
    id: "proprietate",
    title: "4. Proprietate intelectuală",
    content: `Toate elementele de conținut ale Site-ului — texte, grafică, logo-uri, imagini, structura paginilor — sunt proprietatea exclusivă a [DENUMIRE_COMPLETA_FIRMA] SRL sau sunt utilizate cu acordul deținătorilor de drepturi, și sunt protejate prin legislația română și europeană privind drepturile de proprietate intelectuală.

Logo-urile și mărcile comerciale ale producătorilor (Bosch, DeWalt, Makita etc.) sunt proprietatea exclusivă a respectivilor titulari și sunt utilizate exclusiv în scop informativ.`,
  },
  {
    id: "raspundere",
    title: "5. Limitarea răspunderii",
    content: `Operatorul depune eforturi rezonabile pentru a menține informațiile de pe Site actualizate și corecte, însă nu garantează exactitatea, completitudinea sau actualitatea acestora.

Prețurile afișate pe Site au caracter orientativ și nu constituie ofertă fermă. Ofertele ferme se transmit exclusiv la cerere, prin comunicare directă.

Operatorul nu răspunde pentru:
• Imposibilitatea temporară de accesare a Site-ului din cauze tehnice independente de voința sa;
• Decizii comerciale luate de utilizatori pe baza informațiilor publicate pe Site;
• Conținutul site-urilor terțe la care Site-ul furnizează linkuri externe.`,
  },
  {
    id: "cookie",
    title: "6. Cookie-uri",
    content: `Site-ul utilizează cookie-uri în conformitate cu Directiva 2002/58/CE (e-Privacy) și cu Legea nr. 506/2004. Utilizarea cookie-urilor non-esențiale este condiționată de consimțământul explicit al utilizatorului, exprimat prin bannerul de cookie-uri afișat la prima vizită.

Detalii complete privind tipurile de cookie-uri utilizate se regăsesc în Politica de Cookie-uri.`,
  },
  {
    id: "modificare",
    title: "7. Modificarea Termenilor",
    content: `Operatorul își rezervă dreptul de a modifica prezentele Termeni și Condiții în orice moment, fără notificare prealabilă. Versiunea actualizată va fi publicată pe Site cu indicarea datei ultimei modificări. Utilizarea continuă a Site-ului după publicarea modificărilor constituie acceptarea acestora.`,
  },
  {
    id: "legislatie",
    title: "8. Legislație aplicabilă și jurisdicție",
    content: `Prezentele Termeni și Condiții sunt guvernate de legislația română în vigoare, inclusiv:

• Legea nr. 365/2002 privind comerțul electronic;
• Legea nr. 31/1990 privind societățile comerciale;
• Regulamentul UE 2016/679 (GDPR) și Legea nr. 190/2018.

Orice litigiu decurgând din sau în legătură cu prezentele Termeni și Condiții va fi soluționat de instanțele judecătorești competente din [LOCALITATE], România, sau prin procedura de soluționare alternativă a litigiilor (SAL) disponibilă la ANPC.`,
  },
  {
    id: "contact",
    title: "9. Contact",
    content: `Pentru orice întrebări legate de prezentele Termeni și Condiții, ne puteți contacta la:

Email: office@scudiver.ro
Telefon: [TELEFON_PLACEHOLDER]
Adresă: [ADRESA_COMPLETA], [LOCALITATE], [JUDET]

Data ultimei actualizări: [DATA_ACTUALIZARE]`,
  },
];

export default function TermeniConditiiPage() {
  return (
    <>
      <PageHeader
        title="Termeni și Condiții"
        subtitle="Condițiile de utilizare ale site-ului scudiver.ro — site de prezentare, fără comenzi sau plăți online."
        dark
      />
      <div className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border rounded-sm p-2 mb-8">
            <nav aria-label="Cuprins" className="flex flex-wrap gap-1 p-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs text-brand hover:underline px-2 py-1"
                >
                  {s.title.split(". ")[1]}
                </a>
              ))}
            </nav>
          </div>
          <div className="bg-white border border-border rounded-sm p-6 md:p-8 space-y-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`}>
                <h2 id={`h-${s.id}`} className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                  {s.title}
                </h2>
                <div className="text-sm text-charcoal leading-relaxed whitespace-pre-line">
                  {s.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
