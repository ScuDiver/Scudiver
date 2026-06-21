import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "scule-electrice",
    name: "Scule Electrice",
    description:
      "Mașini de găurit, polizoare, ciocane rotopercutoare, fierăstraie și alte scule electrice profesionale pentru construcții și industrie.",
    cpvCode: "43830000-0",
    cpvDescription: "Scule electrice / scule cu motor",
    icon: "⚡",
    image: "/assets/categories/sudura-saffro.webp",
    productCount: 8,
  },
  {
    slug: "scule-de-mana",
    name: "Scule de Mână",
    description:
      "Chei, șurubelnițe, clești, ciocare, fierăstraie manuale și alte scule de mână de calitate profesională.",
    cpvCode: "44511000-5",
    cpvDescription: "Scule de mână",
    icon: "🔧",
    image: "/assets/categories/scule-de-mana.webp",
    productCount: 6,
  },
  {
    slug: "burghie-si-accesorii",
    name: "Burghie și Accesorii",
    description:
      "Burghie pentru metal, beton și lemn, discuri abrazive, freze și accesorii pentru scule electrice.",
    cpvCode: "44512000-2",
    cpvDescription: "Diverse scule de mână / accesorii",
    icon: "🔩",
    image: "/assets/categories/burghie-bolman.webp",
    productCount: 6,
  },
  {
    slug: "truse-de-scule",
    name: "Truse de Scule",
    description:
      "Truse complete de scule pentru electricieni, mecanici și construcții, în valize profesionale.",
    cpvCode: "44512940-3",
    cpvDescription: "Truse de scule",
    icon: "🧰",
    image: "/assets/categories/truse-de-scule.webp",
    productCount: 4,
  },
  {
    slug: "echipament-de-protectie",
    name: "Echipament de Protecție",
    description:
      "Căști, ochelari de protecție, mănuși, salopete și alte echipamente individuale de protecție (EIP) conform normelor UE.",
    cpvCode: "18100000-0",
    cpvDescription: "Echipament individual de protecție",
    icon: "🦺",
    image: "/assets/categories/echipament-de-protectie.webp",
    productCount: 4,
  },
  {
    slug: "consumabile",
    name: "Consumabile și Accesorii",
    description:
      "Dibluri, adezivi, sigilanți, abrazive și alte consumabile pentru construcții și instalații.",
    cpvCode: "44316000-8",
    cpvDescription: "Articole de fierărie / consumabile",
    icon: "📦",
    image: "/assets/categories/elemente-de-fixare-loctite.webp",
    productCount: 4,
  },
  {
    slug: "elemente-de-asamblare",
    name: "Elemente de Asamblare",
    description:
      "Șuruburi pentru lemn, metal și rigips, bolțuri metrice, piulițe, șaibe și ancore expansibile pentru construcții și instalații.",
    cpvCode: "44530000-4",
    cpvDescription: "Dispozitive de fixare / elemente de asamblare",
    icon: "🔩",
    image: "/assets/categories/elemente-de-fixare.webp",
    productCount: 6,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
