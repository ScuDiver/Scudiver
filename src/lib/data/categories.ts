import type { Category } from "@/lib/types";

/**
 * Domains of supply, not a catalogue index. A category exists to route a
 * visitor to the brands that cover it and to carry the CPV code a public
 * buyer searches on — it deliberately carries no product count, because the
 * handful of catalogue entries per domain is a sample of the range, not the
 * range itself.
 */
export const categories: Category[] = [
  {
    slug: "scule-electrice",
    name: "Scule Electrice",
    description:
      "Mașini de găurit, polizoare, ciocane rotopercutoare, fierăstraie și alte scule electrice profesionale pentru construcții și industrie.",
    cpvCode: "43830000-0",
    cpvDescription: "Scule electrice / scule cu motor",
    icon: "⚡",
  },
  {
    slug: "scule-de-mana",
    name: "Scule de Mână",
    description:
      "Chei, șurubelnițe, clești, ciocare, fierăstraie manuale și alte scule de mână de calitate profesională.",
    cpvCode: "44511000-5",
    cpvDescription: "Scule de mână",
    icon: "🔧",
  },
  {
    slug: "burghie-si-accesorii",
    name: "Burghie și Accesorii",
    description:
      "Burghie pentru metal, beton și lemn, discuri abrazive, freze și accesorii pentru scule electrice.",
    cpvCode: "44512000-2",
    cpvDescription: "Diverse scule de mână / accesorii",
    icon: "🔩",
  },
  {
    slug: "truse-de-scule",
    name: "Truse de Scule",
    description:
      "Truse complete de scule pentru electricieni, mecanici și construcții, în valize profesionale.",
    cpvCode: "44512940-3",
    cpvDescription: "Truse de scule",
    icon: "🧰",
  },
  {
    slug: "echipament-de-protectie",
    name: "Echipament de Protecție",
    description:
      "Căști, ochelari de protecție, mănuși, salopete și alte echipamente individuale de protecție (EIP) conform normelor UE.",
    cpvCode: "18100000-0",
    cpvDescription: "Echipament individual de protecție",
    icon: "🦺",
  },
  {
    slug: "sudura",
    name: "Sudură și Consumabile",
    description:
      "Aparate de sudură cu electrod învelit, MIG-MAG și TIG, electrozi, sârmă de sudură, măști cu cristale lichide și accesorii pentru atelier și șantier.",
    cpvCode: "42662000-4",
    cpvDescription: "Echipament de sudură",
    icon: "🔥",
  },
  {
    slug: "aparataj-electric",
    name: "Aparataj Electric",
    description:
      "Siguranțe automate, întrerupătoare diferențiale, contactoare și tablouri de distribuție pentru instalații electrice civile și industriale.",
    cpvCode: "31200000-8",
    cpvDescription: "Aparate de distribuție și control al electricității",
    icon: "🔌",
  },
  {
    slug: "vopsele-si-accesorii",
    name: "Vopsele și Accesorii de Zugrăvit",
    description:
      "Vopsele spray în nuanțe RAL, grunduri, lacuri, trafalete, pensule și benzi de mascare pentru finisaje interioare și exterioare.",
    cpvCode: "44810000-1",
    cpvDescription: "Vopsele și produse pentru finisaje",
    icon: "🎨",
  },
  {
    slug: "consumabile",
    name: "Consumabile și Accesorii",
    description:
      "Dibluri, adezivi, sigilanți, abrazive și alte consumabile pentru construcții și instalații.",
    cpvCode: "44316000-8",
    cpvDescription: "Articole de fierărie / consumabile",
    icon: "📦",
  },
  {
    slug: "elemente-de-asamblare",
    name: "Elemente de Asamblare",
    description:
      "Șuruburi pentru lemn, metal și rigips, bolțuri metrice, piulițe, șaibe și ancore expansibile pentru construcții și instalații.",
    cpvCode: "44530000-4",
    cpvDescription: "Dispozitive de fixare / elemente de asamblare",
    icon: "🔩",
    catalog: {
      url: "/assets/catalogs/scudiver-elemente-de-asamblare.pdf",
      label: "Index vizual DIN/ISO — 3 pagini (PDF)",
    },
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
