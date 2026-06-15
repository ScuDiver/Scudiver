import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Politică de Cookie-uri",
  description: "Politica de utilizare a cookie-urilor pe site-ul scudiver.ro — ce cookie-uri folosim și cum le puteți gestiona.",
};

const cookieTable = [
  {
    name: "scudiver_cookie_consent",
    type: "Esențial",
    duration: "365 zile",
    purpose: "Stochează preferințele dumneavoastră privind cookie-urile (consimțământ / respingere). Necesar pentru funcționarea bannerului de cookie-uri.",
    thirdParty: false,
  },
  {
    name: "_ga, _ga_*",
    type: "Analitice",
    duration: "2 ani",
    purpose: "Google Analytics — măsoară traficul și comportamentul utilizatorilor pe Site. Activat doar cu consimțământ explicit.",
    thirdParty: true,
  },
  {
    name: "_fbp",
    type: "Marketing",
    duration: "90 zile",
    purpose: "Meta (Facebook) Pixel — urmărirea conversiilor și retargeting publicitar. Activat doar cu consimțământ explicit.",
    thirdParty: true,
  },
];

export default function PoliticaCookiePage() {
  return (
    <>
      <PageHeader
        title="Politică de Cookie-uri"
        subtitle="Ce sunt cookie-urile, ce tipuri folosim pe scudiver.ro și cum le puteți gestiona."
        dark
      />
      <div className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border rounded-sm p-6 md:p-8 space-y-8 text-sm text-charcoal leading-relaxed">

            <section aria-labelledby="h-ce-sunt">
              <h2 id="h-ce-sunt" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                1. Ce sunt cookie-urile?
              </h2>
              <p>
                Cookie-urile sunt fișiere text de mici dimensiuni pe care un site le stochează pe dispozitivul
                dumneavoastră (calculator, telefon, tabletă) atunci când îl vizitați. Cookie-urile permit site-ului
                să vă recunoască la vizitele ulterioare și să rețină anumite preferințe.
              </p>
              <p className="mt-3">
                Utilizarea cookie-urilor este reglementată în România de Legea nr. 506/2004 privind prelucrarea
                datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice
                (transpunerea Directivei 2002/58/CE) și de GDPR (Regulamentul UE 2016/679).
              </p>
            </section>

            <section aria-labelledby="h-tipuri">
              <h2 id="h-tipuri" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                2. Ce tipuri de cookie-uri folosim?
              </h2>

              <h3 className="font-bold text-charcoal mb-2">2.1 Cookie-uri esențiale (întotdeauna active)</h3>
              <p>
                Aceste cookie-uri sunt necesare pentru funcționarea de bază a Site-ului și nu pot fi dezactivate.
                Nu stochează date de identificare personală și nu sunt utilizate în scopuri publicitare.
              </p>

              <h3 className="font-bold text-charcoal mt-4 mb-2">2.2 Cookie-uri analitice (cu consimțământ)</h3>
              <p>
                Ne permit să înțelegem cum utilizați Site-ul (pagini vizitate, durată sesiune, sursă de trafic)
                pentru a-l îmbunătăți. Sunt activate numai dacă vă exprimați consimțământul explicit.
              </p>

              <h3 className="font-bold text-charcoal mt-4 mb-2">2.3 Cookie-uri de marketing (cu consimțământ)</h3>
              <p>
                Utilizate pentru publicitate personalizată și retargeting. Sunt activate numai cu consimțământ explicit.
              </p>
            </section>

            <section aria-labelledby="h-tabel">
              <h2 id="h-tabel" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                3. Lista cookie-urilor utilizate
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-border rounded-sm" aria-label="Lista cookie-urilor utilizate pe scudiver.ro">
                  <thead>
                    <tr className="bg-charcoal text-white">
                      <th className="text-left px-4 py-2.5 font-bold">Nume</th>
                      <th className="text-left px-4 py-2.5 font-bold">Tip</th>
                      <th className="text-left px-4 py-2.5 font-bold">Durată</th>
                      <th className="text-left px-4 py-2.5 font-bold">Terț</th>
                      <th className="text-left px-4 py-2.5 font-bold">Scop</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((c, i) => (
                      <tr key={c.name} className={i % 2 === 0 ? "" : "bg-surface"}>
                        <td className="px-4 py-3 font-mono font-bold text-charcoal align-top">{c.name}</td>
                        <td className="px-4 py-3 align-top">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${c.type === "Esențial" ? "bg-charcoal/10 text-charcoal" : c.type === "Analitice" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted align-top">{c.duration}</td>
                        <td className="px-4 py-3 align-top">{c.thirdParty ? "Da" : "Nu"}</td>
                        <td className="px-4 py-3 text-muted align-top">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="h-gestionare">
              <h2 id="h-gestionare" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                4. Cum puteți gestiona cookie-urile?
              </h2>
              <p>
                Vă puteți gestiona preferințele privind cookie-urile în orice moment prin bannerul de cookie-uri
                afișat la prima vizită pe Site sau prin setările browserului dumneavoastră.
              </p>
              <p className="mt-3">
                <strong>Dezactivarea cookie-urilor prin browser:</strong> Puteți configura browserul să respingă
                toate cookie-urile sau să vă alerteze când un site încearcă să plaseze un cookie.
                Rețineți că dezactivarea cookie-urilor esențiale poate afecta funcționarea Site-ului.
              </p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Chrome", "Firefox", "Safari", "Edge"].map((b) => (
                  <div key={b} className="bg-surface border border-border rounded-sm px-3 py-2 text-center text-xs font-medium text-charcoal">
                    {b}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">
                Căutați „cookie settings" în meniul de setări al browserului preferat pentru instrucțiuni specifice.
              </p>
            </section>

            <section aria-labelledby="h-contact-cookie">
              <h2 id="h-contact-cookie" className="font-display font-bold text-xl text-charcoal uppercase mb-3">
                5. Contact
              </h2>
              <p>
                Pentru întrebări privind utilizarea cookie-urilor, contactați-ne la{" "}
                <a href="mailto:office@scudiver.ro" className="text-brand underline">office@scudiver.ro</a>{" "}
                sau consultați{" "}
                <Link href="/politica-confidentialitate" className="text-brand underline">
                  Politica de Confidențialitate
                </Link>.
              </p>
              <p className="mt-2 text-muted text-xs">Data ultimei actualizări: 16 iunie 2026</p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
