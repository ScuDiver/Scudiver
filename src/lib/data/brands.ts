import type { Brand } from "@/lib/types";
import { products } from "@/lib/data/products";

const CATALOG = "/assets/brands/catalog";
const LOGOS = "/assets/brands";

function images(slug: string) {
  return {
    imageWide: `${CATALOG}/${slug}-wide.webp`,
    imageWideSm: `${CATALOG}/${slug}-wide-sm.webp`,
    imagePortrait: `${CATALOG}/${slug}-portrait.webp`,
    imagePortraitSm: `${CATALOG}/${slug}-portrait-sm.webp`,
  };
}

export const brands: Brand[] = [
  // ─── Scule electrice ────────────────────────────────────────────────────────
  {
    slug: "bosch",
    name: "Bosch Professional",
    productBrands: ["Bosch"],
    logo: `${LOGOS}/bosch.webp`,
    ...images("bosch"),
    imageAlt:
      "Nivelă laser Bosch Professional pe trepied, folosită pentru trasarea unui perete placat cu faianță",
    tagline: "Seria albastră, pentru utilizare zilnică pe șantier",
    origin: "Germania",
    founded: "1886",
    summary:
      "Gama Bosch Professional acoperă rotopercutoare, mașini de găurit, polizoare și aparate de măsură laser, construite în jurul sistemului de acumulatori 18V Professional.",
    description: [
      "Bosch este unul dintre cei mai mari producători de scule electrice din lume, cu sediul central în Germania și o istorie care începe în 1886. Gama Bosch Professional — recunoscută după culoarea albastră — este dedicată exclusiv utilizatorilor profesioniști: firme de construcții, instalatori, electricieni și echipe de întreținere industrială.",
      "Sculele Professional sunt construite în jurul sistemului de acumulatori 18V, compatibil între zeci de mașini din gamă, și al motoarelor fără perii care oferă randament ridicat și durată de viață extinsă. Sistemele electronice de protecție reduc riscul de accidentare la blocarea accesoriului și protejează motorul la suprasarcină.",
      "ScuDiver livrează scule electrice, aparate de măsură și accesorii Bosch Professional către instituții publice și companii, cu declarație de conformitate CE, fișă tehnică și certificat de garanție incluse.",
    ],
    specialties: [
      "Rotopercutoare SDS-Plus și SDS-Max",
      "Sistem acumulatori 18V Professional",
      "Aparate de măsură și nivele laser",
      "Accesorii Expert și Diamond",
    ],
    categorySlugs: ["scule-electrice", "burghie-si-accesorii", "echipament-de-protectie"],
    accent: "#0A5C9E",
    featured: true,
    seo: {
      title: "Scule Bosch Professional",
      description:
        "Distribuitor Bosch Professional: rotopercutoare, mașini de găurit, polizoare, aparate de măsură laser și accesorii. Ofertă pentru instituții publice și firme.",
      keywords: [
        "Bosch Professional",
        "scule Bosch",
        "rotopercutor Bosch",
        "Bosch 18V",
        "accesorii Bosch Expert",
        "furnizor Bosch Romania",
      ],
    },
  },
  {
    slug: "dewalt",
    name: "DeWalt",
    productBrands: ["DeWalt"],
    logo: `${LOGOS}/dewalt.webp`,
    ...images("dewalt"),
    imageAlt:
      "Mașină de găurit cu acumulator DeWalt 18V XR folosită pentru înșurubare într-o structură de lemn",
    tagline: "Platforma 18V XR pentru construcții și amenajări",
    origin: "Statele Unite",
    founded: "1924",
    summary:
      "Scule cu acumulator 18V XR, fierăstraie și mașini de găurit construite pentru șantiere de construcții și lucrări de amenajare cu ritm intens.",
    description: [
      "DeWalt este un producător american de scule electrice fondat în 1924, prezent astăzi pe toate piețele majore de construcții. Combinația galben–negru este printre cele mai recognoscibile din domeniu, iar gama este orientată către lucrări de structură, dulgherie și amenajări interioare.",
      "Platforma de acumulatori 18V XR leagă mașinile de găurit, fierăstraiele circulare, șurubelnițele cu impact și sculele de tăiat într-un singur sistem de alimentare. Motoarele fără perii și carcasele armate sunt dimensionate pentru utilizare continuă în condiții de praf, vibrații și variații de temperatură.",
      "Furnizăm scule și accesorii DeWalt pentru contracte de construcții, dotări de atelier și proceduri de achiziție publică, cu documentația tehnică completă la livrare.",
    ],
    specialties: [
      "Platforma acumulatori 18V XR",
      "Mașini de găurit și șurubelnițe cu impact",
      "Fierăstraie circulare și sabie",
      "Scule pentru dulgherie și structuri",
    ],
    categorySlugs: ["scule-electrice", "burghie-si-accesorii"],
    accent: "#FDB913",
    featured: true,
    seo: {
      title: "Scule DeWalt",
      description:
        "Distribuitor DeWalt: mașini de găurit 18V XR, fierăstraie circulare, șurubelnițe cu impact și accesorii. Ofertă în 48 de ore pentru firme și instituții.",
      keywords: [
        "DeWalt",
        "scule DeWalt",
        "DeWalt 18V XR",
        "masina de gaurit DeWalt",
        "fierastrau DeWalt",
        "furnizor DeWalt Romania",
      ],
    },
  },
  {
    slug: "makita",
    name: "Makita",
    productBrands: ["Makita"],
    logo: `${LOGOS}/makita.webp`,
    ...images("makita"),
    imageAlt: "Polizor unghiular Makita folosit pentru debitarea unui profil metalic",
    tagline: "Fiabilitate japoneză pentru utilizare continuă",
    origin: "Japonia",
    founded: "1915",
    summary:
      "Polizoare, mașini de găurit și scule de tăiat cu reputație de fiabilitate în regim de lucru continuu, susținute de o gamă largă de accesorii.",
    description: [
      "Makita este un producător japonez înființat în 1915, specializat în scule electrice pentru construcții, prelucrarea lemnului și industrie. Gama este cunoscută pentru echilibrul dintre greutate redusă, ergonomie și rezistență la utilizare intensivă.",
      "Portofoliul acoperă polizoare unghiulare, mașini de găurit cu cablu și cu acumulator, fierăstraie, scule pneumatice și o gamă completă de accesorii abrazive. Sistemele de reducere a vibrațiilor și de aspirare a prafului răspund cerințelor de sănătate și securitate în muncă pentru lucrul prelungit în beton și zidărie.",
      "ScuDiver asigură scule Makita și consumabilele aferente pentru dotarea atelierelor, a echipelor de intervenție și a instituțiilor publice, inclusiv în cadrul licitațiilor pe SEAP.",
    ],
    specialties: [
      "Polizoare unghiulare 115 și 125 mm",
      "Mașini de găurit și rotopercutoare",
      "Accesorii abrazive și discuri de fibră",
      "Reducerea vibrațiilor și aspirare praf",
    ],
    categorySlugs: ["scule-electrice", "burghie-si-accesorii"],
    accent: "#009AA6",
    featured: true,
    seo: {
      title: "Scule Makita",
      description:
        "Distribuitor Makita: polizoare unghiulare, mașini de găurit, fierăstraie și accesorii abrazive. Livrare pentru firme, atelier și achiziții publice.",
      keywords: [
        "Makita",
        "scule Makita",
        "polizor Makita",
        "masina de gaurit Makita",
        "accesorii Makita",
        "furnizor Makita Romania",
      ],
    },
  },
  {
    slug: "milwaukee",
    name: "Milwaukee",
    productBrands: ["Milwaukee"],
    logo: `${LOGOS}/milwaukee.webp`,
    ...images("milwaukee"),
    imageAlt:
      "Muncitor pe schelă găurind un planșeu de beton cu un rotopercutor Milwaukee M18 FUEL cu aspirare de praf",
    tagline: "Sistemul M18 FUEL pentru lucrări grele",
    origin: "Statele Unite",
    founded: "1924",
    summary:
      "Scule fără fir M18 FUEL cu motoare POWERSTATE și electronică REDLINK, dimensionate pentru cuplu mare și utilizare industrială.",
    description: [
      "Milwaukee Tool este un producător american fondat în 1924, specializat în scule electrice profesionale pentru construcții, instalații și mentenanță industrială. Gama M18 FUEL reprezintă vârful portofoliului, cu scule proiectate pentru cele mai solicitante aplicații.",
      "Sculele FUEL combină motorul fără perii POWERSTATE, electronica de management REDLINK PLUS și acumulatorii REDLITHIUM. Rezultatul este un cuplu ridicat într-un corp compact, cu protecție la supraîncălzire și suprasarcină atât pentru sculă, cât și pentru acumulator.",
      "Furnizăm scule, acumulatori și accesorii Milwaukee pentru echipe de instalatori, electricieni și service industrial, cu ofertare rapidă pe cantități mari.",
    ],
    specialties: [
      "Sistem M18 FUEL fără perii",
      "Șurubelnițe cu impact de cuplu mare",
      "Polizoare unghiulare cu acumulator",
      "Electronică REDLINK PLUS",
    ],
    categorySlugs: ["scule-electrice"],
    accent: "#DB011C",
    featured: true,
    seo: {
      title: "Scule Milwaukee",
      description:
        "Distribuitor Milwaukee: scule M18 FUEL fără perii, șurubelnițe cu impact, polizoare și acumulatori REDLITHIUM. Ofertă pentru firme și instituții publice.",
      keywords: [
        "Milwaukee",
        "scule Milwaukee",
        "Milwaukee M18 FUEL",
        "surubelnita impact Milwaukee",
        "acumulator Milwaukee",
        "furnizor Milwaukee Romania",
      ],
    },
  },

  // ─── Scule de mână și truse ─────────────────────────────────────────────────
  {
    slug: "unior",
    name: "Unior",
    productBrands: ["Unior"],
    logo: `${LOGOS}/unior.webp`,
    ...images("unior"),
    imageAlt: "Chei și clești Unior din oțel crom-vanadiu, așezate pe un banc de lucru",
    tagline: "Scule forjate din oțel Cr-V, fabricate în Slovenia",
    origin: "Slovenia",
    founded: "1919",
    summary:
      "Chei, clești și truse de electrician forjate în Slovenia, conforme DIN și ISO, cu variante izolate 1000 V pentru lucrul sub tensiune.",
    description: [
      "Unior este un producător sloven cu tradiție de forjare din 1919, specializat în scule de mână pentru mecanică, instalații și electrotehnică. Producția integrată — de la forjare la tratament termic și finisare — permite un control strict al calității oțelului.",
      "Gama acoperă chei fixe și inelare, clești, șurubelnițe, chei dinamometrice și truse complete, executate conform standardelor DIN și ISO. Sculele izolate sunt testate individual și certificate pentru lucrul la 1000 V conform EN 60900, o cerință frecventă în caietele de sarcini pentru lucrări electrice.",
      "ScuDiver oferă truse Unior configurate pe profil de activitate — electrician, instalator, mecanic — potrivite pentru dotarea echipelor și pentru licitații publice.",
    ],
    specialties: [
      "Oțel Cr-V forjat, tratat termic",
      "Scule izolate 1000 V (EN 60900)",
      "Chei inelare și fixe conform DIN",
      "Truse complete pe profil de meserie",
    ],
    categorySlugs: ["scule-de-mana", "truse-de-scule"],
    accent: "#E30613",
    featured: true,
    seo: {
      title: "Scule Unior",
      description:
        "Distribuitor Unior: chei inelare, clești, șurubelnițe izolate 1000 V și truse de electrician forjate în Slovenia. Conform DIN, ISO și EN 60900.",
      keywords: [
        "Unior",
        "scule Unior",
        "chei Unior",
        "trusa electrician Unior",
        "scule izolate 1000V",
        "furnizor Unior Romania",
      ],
    },
  },
  {
    slug: "yato",
    name: "YATO",
    productBrands: ["YATO"],
    logo: `${LOGOS}/YATO.webp`,
    ...images("yato"),
    imageAlt: "Trusă YATO cu chei tubulare și clichet, deschisă într-o valiză metalică",
    tagline: "Truse complete la raport calitate-preț competitiv",
    origin: "Polonia",
    summary:
      "Truse de scule cu număr mare de piese, chei tubulare, elemente de asamblare și consumabile — soluția potrivită pentru dotări pe volum.",
    description: [
      "YATO este un brand polonez de scule profesionale, prezent în majoritatea țărilor europene. Poziționarea sa — scule conforme standardelor DIN și ISO la un preț accesibil — îl face potrivit pentru dotări pe cantități mari, unde bugetul pe unitate contează.",
      "Gama acoperă truse de scule de 100–250 de piese în valize metalice compartimentate, seturi de chei tubulare cu antrenori de 1/4″, 3/8″ și 1/2″, discuri abrazive și elemente de asamblare la cutie. Sculele sunt executate din oțel crom-vanadiu, cu finisaje cromate sau fosfatate în funcție de destinație.",
      "Pentru instituții publice și firme cu echipe numeroase, YATO este frecvent varianta cu cel mai bun raport între conformitate tehnică și cost total al dotării.",
    ],
    specialties: [
      "Truse de 100–250 piese în valiză",
      "Chei tubulare 1/4″, 3/8″, 1/2″",
      "Șuruburi și elemente de asamblare",
      "Discuri abrazive pentru metal și inox",
    ],
    categorySlugs: ["truse-de-scule", "scule-de-mana", "burghie-si-accesorii", "elemente-de-asamblare"],
    accent: "#C8102E",
    featured: true,
    seo: {
      title: "Scule YATO",
      description:
        "Distribuitor YATO: truse de scule în valiză, chei tubulare, discuri abrazive și elemente de asamblare. Raport calitate-preț pentru dotări pe volum.",
      keywords: [
        "YATO",
        "scule YATO",
        "trusa scule YATO",
        "chei tubulare YATO",
        "suruburi YATO",
        "furnizor YATO Romania",
      ],
    },
  },
  {
    slug: "bgs",
    name: "BGS technic",
    productBrands: ["BGS"],
    logo: `${LOGOS}/sculeBGS.webp`,
    ...images("bgs"),
    imageAlt: "Set de șurubelnițe și scule de atelier BGS technic pe un panou de perete",
    tagline: "Dotare completă de atelier, din Germania",
    origin: "Germania",
    summary:
      "Scule de atelier și truse pentru service auto și mentenanță industrială, cu accent pe seturi specializate și organizare în valiză.",
    description: [
      "BGS technic este un furnizor german de scule de atelier, cu un portofoliu construit în jurul lucrărilor de service auto, mentenanță industrială și întreținere generală. Gama numără mii de referințe, de la scule individuale la seturi dedicate unei singure operații.",
      "Punctul forte al mărcii îl reprezintă trusele organizate: șurubelnițe cu vârf magnetizat și mânere bi-material, seturi de burghie Forstner, seturi de bolțuri și piulițe compartimentate, precum și truse de atelier de peste 100 de piese cu tavă organizatoare.",
      "Furnizăm scule BGS technic pentru dotarea atelierelor, a punctelor de lucru și a garajelor instituționale, cu posibilitatea de configurare a truselor în funcție de caietul de sarcini.",
    ],
    specialties: [
      "Truse de atelier peste 100 de piese",
      "Seturi de șurubelnițe magnetizate",
      "Burghie Forstner pentru lemn",
      "Seturi de bolțuri, piulițe și șaibe",
    ],
    categorySlugs: ["scule-de-mana", "truse-de-scule", "burghie-si-accesorii", "elemente-de-asamblare"],
    accent: "#E2001A",
    seo: {
      title: "Scule BGS technic",
      description:
        "Distribuitor BGS technic: truse de atelier, seturi de șurubelnițe, burghie Forstner și elemente de asamblare. Dotare completă pentru service și mentenanță.",
      keywords: [
        "BGS technic",
        "scule BGS",
        "trusa atelier BGS",
        "surubelnite BGS",
        "scule service auto",
        "furnizor BGS Romania",
      ],
    },
  },
  {
    slug: "projahn",
    name: "PROJAHN",
    productBrands: ["Projahn"],
    logo: `${LOGOS}/projahn.webp`,
    ...images("projahn"),
    imageAlt: "Set de burghie PROJAHN HSS în casetă metalică, alături de o coroană diamantată",
    tagline: "Scule de precizie și accesorii de găurire",
    origin: "Germania",
    summary:
      "Burghie HSS, coroane diamantate, ancore și scule de mână de precizie, executate conform standardelor DIN și certificate ETA.",
    description: [
      "PROJAHN este un producător german specializat în scule de precizie și accesorii de găurire. Portofoliul este orientat către aplicații unde toleranța și durabilitatea accesoriului determină calitatea lucrării: găuriri în metal, beton armat și materiale compozite.",
      "Gama include burghie HSS conform DIN 338, coroane diamantate segmentate pentru găurire uscată, ciocane de lăcătuș conform DIN 1041, truse pentru instalatori și ancore mecanice expansibile cu agrement tehnic european ETA — o cerință frecventă la fixările structurale.",
      "ScuDiver livrează accesorii și scule PROJAHN pentru firme de instalații, construcții și pentru proceduri de achiziție unde se solicită documentație tehnică și certificare ETA.",
    ],
    specialties: [
      "Burghie HSS conform DIN 338",
      "Coroane diamantate pentru beton",
      "Ancore expansibile certificate ETA",
      "Truse pentru instalatori",
    ],
    categorySlugs: ["burghie-si-accesorii", "scule-de-mana", "truse-de-scule", "elemente-de-asamblare"],
    accent: "#D6001C",
    seo: {
      title: "Scule și Accesorii PROJAHN",
      description:
        "Distribuitor PROJAHN: burghie HSS DIN 338, coroane diamantate, ancore expansibile ETA și truse pentru instalatori. Scule de precizie din Germania.",
      keywords: [
        "PROJAHN",
        "burghie PROJAHN",
        "coroana diamantata",
        "ancore expansibile ETA",
        "burghie HSS DIN 338",
        "furnizor PROJAHN Romania",
      ],
    },
  },
  {
    slug: "ingco",
    name: "INGCO",
    productBrands: ["Ingco"],
    logo: `${LOGOS}/ingco.webp`,
    ...images("ingco"),
    imageAlt:
      "Echipament de protecție INGCO — cască, mănuși și antifoane — pregătit pentru intrarea pe șantier",
    tagline: "Scule și echipament de protecție pentru dotări pe volum",
    origin: "Brand internațional",
    summary:
      "Gamă largă care acoperă de la ciocane demolatoare la echipament individual de protecție conform normelor europene, la costuri accesibile.",
    description: [
      "INGCO este un brand internațional de scule și echipamente pentru construcții, distribuit în peste 100 de țări. Amploarea gamei — scule electrice, scule de mână, echipament de protecție și elemente de fixare — permite acoperirea unei dotări complete de la un singur furnizor.",
      "Echipamentul individual de protecție INGCO este certificat conform normelor europene aplicabile: EN 397 pentru căștile de protecție, EN 388 pentru mănușile antiretezare și EN 352 pentru protecția auditivă. Sculele electrice acoperă lucrările grele de demolare și spargere beton.",
      "Pentru instituții publice care trebuie să doteze simultan echipe numeroase cu EIP conform și scule de bază, INGCO este de regulă soluția cu cel mai bun raport între conformitate și cost.",
    ],
    specialties: [
      "EIP conform EN 397, EN 388, EN 352",
      "Ciocane demolatoare SDS-MAX",
      "Șuruburi autofiletante și inox A2",
      "Dotări complete pentru echipe",
    ],
    categorySlugs: ["echipament-de-protectie", "scule-electrice", "elemente-de-asamblare"],
    accent: "#F58220",
    featured: true,
    seo: {
      title: "Scule și Echipament de Protecție INGCO",
      description:
        "Distribuitor INGCO: echipament individual de protecție EN 397 / EN 388 / EN 352, ciocane demolatoare, șuruburi și scule pentru dotări pe volum.",
      keywords: [
        "INGCO",
        "scule INGCO",
        "echipament protectie INGCO",
        "casca protectie EN 397",
        "manusi EN 388",
        "furnizor INGCO Romania",
      ],
    },
  },

  // ─── Sudură ─────────────────────────────────────────────────────────────────
  {
    slug: "saf-fro",
    name: "SAF-FRO",
    productBrands: ["SAF-FRO"],
    ...images("saf-fro"),
    imageAlt:
      "Sudor cu mască SAF-FRO în timpul sudării unui profil metalic, alături de electrozi și un aparat de sudură SAF-FRO",
    tagline: "Aparate de sudură, electrozi și consumabile",
    origin: "Franța / Italia",
    founded: "1909",
    summary:
      "Aparate de sudură cu electrod învelit, MIG-MAG și TIG, electrozi înveliți, sârmă și flux — o marcă europeană de sudură din grupul Lincoln Electric.",
    description: [
      "SAF-FRO s-a format prin reunirea a două mărci istorice ale sudurii europene: SAF — La Soudure Autogène Française, înființată în Franța în 1909 — și FRO — Fabbriche Riunite Ossigeno, deschisă în Italia în 1924. Ambele au pornit de la sudura oxiacetilenică și au devenit referințe pe piețele lor naționale.",
      "Din 1993 cele două mărci au funcționat în cadrul grupului Air Liquide Welding, iar din 2017 SAF-FRO face parte din grupul Lincoln Electric, unul dintre liderii mondiali în echipamente și consumabile pentru sudură și tăiere.",
      "ScuDiver furnizează aparate de sudură, electrozi înveliți, sârmă de sudură, măști cu cristale lichide și accesorii SAF-FRO pentru ateliere, echipe de întreținere și instituții publice, cu fișe tehnice și declarații de conformitate la livrare.",
    ],
    specialties: [
      "Aparate de sudură cu electrod învelit (MMA)",
      "Instalații MIG-MAG și TIG",
      "Electrozi înveliți pentru oțel și inox",
      "Sârmă de sudură și flux",
    ],
    categorySlugs: ["sudura", "echipament-de-protectie"],
    accent: "#0069B4",
    seo: {
      title: "Aparate de Sudură și Electrozi SAF-FRO",
      description:
        "Distribuitor SAF-FRO: aparate de sudură MMA, MIG-MAG și TIG, electrozi înveliți, sârmă de sudură și accesorii. Ofertă pentru firme și instituții publice.",
      keywords: [
        "SAF-FRO",
        "aparat de sudura",
        "electrozi sudura",
        "sudura MIG MAG",
        "sudura TIG",
        "furnizor SAF-FRO Romania",
      ],
    },
  },

  // ─── Chimie de construcții și finisaje ──────────────────────────────────────
  {
    slug: "soudal",
    name: "SOUDAL",
    productBrands: ["SOUDAL"],
    logo: `${LOGOS}/SOUDAL.webp`,
    ...images("soudal"),
    imageAlt: "Aplicarea unui sigilant SOUDAL cu pistolul, la îmbinarea dintre două elemente",
    tagline: "Sigilanți, adezivi și spume poliuretanice",
    origin: "Belgia",
    founded: "1966",
    summary:
      "Adezivi elastici, sigilanți poliuretanici și spume PU pentru etanșări, montaj și izolații, cu rezistență la UV și intemperii.",
    description: [
      "SOUDAL este un producător belgian independent de chimie pentru construcții, fondat în 1966 și prezent astăzi în peste 130 de țări. Specializarea sa acoperă întreaga zonă de etanșare, lipire și izolare din execuția unei clădiri.",
      "Gama include adezivi-sigilanți elastici cu aderență pe suprafețe umede, sigilanți poliuretanici și silicoinice pentru rosturi de dilatație, spume PU pentru montaj și izolare, precum și produse de curățare și pregătire a suprafeței. Produsele de montaj sunt încadrate în sisteme cu agrement tehnic, relevante pentru recepția lucrărilor.",
      "ScuDiver furnizează chimie de construcții SOUDAL pentru șantiere, firme de amenajări și instituții, cu fișe tehnice și fișe cu date de securitate la livrare.",
    ],
    specialties: [
      "Adezivi-sigilanți elastici",
      "Spume poliuretanice de montaj",
      "Etanșări rezistente la UV și apă",
      "Fișe tehnice și FDS complete",
    ],
    categorySlugs: ["consumabile"],
    accent: "#003DA5",
    seo: {
      title: "Adezivi și Sigilanți SOUDAL",
      description:
        "Distribuitor SOUDAL: adezivi-sigilanți elastici, spume poliuretanice de montaj și produse de etanșare rezistente la UV. Fișe tehnice incluse.",
      keywords: [
        "SOUDAL",
        "sigilant SOUDAL",
        "Fix All High Tack",
        "spuma poliuretanica",
        "adeziv constructii",
        "furnizor SOUDAL Romania",
      ],
    },
  },
  {
    slug: "henkel",
    name: "Henkel",
    productBrands: ["HENKEL"],
    logo: `${LOGOS}/HENKEL.webp`,
    ...images("henkel"),
    imageAlt: "Spumă poliuretanică Henkel Makroflex aplicată la montajul unui tocuri de ușă",
    tagline: "Loctite, Makroflex și Pattex pentru construcții",
    origin: "Germania",
    founded: "1876",
    summary:
      "Adezivi industriali Loctite, spume și etanșări Makroflex, produse de asamblare Pattex — chimie de construcții cu certificare CE.",
    description: [
      "Henkel este un grup german fondat în 1876, care reunește sub umbrela sa unele dintre cele mai cunoscute mărci de adezivi și chimie de construcții: Loctite pentru asamblări industriale, Makroflex pentru spume și etanșări, Pattex pentru montaj.",
      "Pentru lucrările de construcții și instalații, gama relevantă acoperă spumele poliuretanice cu expansiune redusă pentru montajul tâmplăriei, adezivii de fixare chimică, frânele de filet și produsele de etanșare a îmbinărilor filetate. Produsele de izolație sunt certificate CE conform standardelor europene aplicabile.",
      "Livrăm chimie Henkel pentru șantiere și ateliere, inclusiv în cadrul contractelor unde se solicită trasabilitatea lotului și documentația de conformitate.",
    ],
    specialties: [
      "Spume PU Makroflex cu expansiune redusă",
      "Adezivi și frâne de filet Loctite",
      "Fixare chimică pentru construcții",
      "Produse certificate CE",
    ],
    categorySlugs: ["consumabile"],
    accent: "#E1000F",
    seo: {
      title: "Adezivi Henkel — Loctite, Makroflex, Pattex",
      description:
        "Distribuitor Henkel: spume poliuretanice Makroflex, adezivi și frâne de filet Loctite, produse de montaj Pattex. Certificare CE și fișe tehnice.",
      keywords: [
        "Henkel",
        "Loctite",
        "Makroflex",
        "Pattex",
        "spuma poliuretanica Makroflex",
        "adeziv Loctite",
        "furnizor Henkel Romania",
      ],
    },
  },
  {
    slug: "dupli-color",
    name: "Dupli-Color",
    productBrands: ["DUPLICOLOR"],
    logo: `${LOGOS}/DUPLICOLOR.webp`,
    ...images("dupli-color"),
    imageAlt: "Vopsire cu spray Dupli-Color a unei suprafețe metalice, cu paleta de nuanțe RAL alături",
    tagline: "Vopsele spray în nuanțe RAL, pentru marcaj și recondiționare",
    origin: "Germania",
    summary:
      "Vopsele spray acrilice în nuanțe RAL, grunduri și lacuri pentru marcaj, recondiționare și protecție anticorozivă.",
    description: [
      "Dupli-Color este o marcă germană de vopsele în aerosol, folosită pe scară largă pentru recondiționare, marcaj industrial și retușuri de finisaj. Sistemul de nuanțe RAL permite potrivirea exactă a culorii pe elemente metalice existente.",
      "Gama include vopsele acrilice cu uscare rapidă, grunduri de aderență pentru metal și materiale plastice, lacuri de protecție și produse cu rezistență la temperatură. Formulările respectă limitele de compuși organici volatili din Directiva 2004/42/CE.",
      "Furnizăm produse Dupli-Color pentru ateliere, servicii de întreținere a infrastructurii și instituții care necesită marcaje în nuanțe RAL standardizate.",
    ],
    specialties: [
      "Vopsele spray în nuanțe RAL",
      "Grunduri pentru metal și plastic",
      "Lacuri de protecție și finisare",
      "Conform Directivei VOC 2004/42/CE",
    ],
    categorySlugs: ["consumabile", "vopsele-si-accesorii"],
    accent: "#D9251C",
    seo: {
      title: "Vopsele Spray Dupli-Color",
      description:
        "Distribuitor Dupli-Color: vopsele spray acrilice în nuanțe RAL, grunduri de aderență și lacuri de protecție pentru marcaj și recondiționare.",
      keywords: [
        "Dupli-Color",
        "vopsea spray RAL",
        "spray RAL 7035",
        "grund spray metal",
        "vopsea marcaj industrial",
        "furnizor Dupli-Color Romania",
      ],
    },
  },
  {
    slug: "schuller",
    name: "Schuller Eh'klar",
    productBrands: ["Schuller"],
    logo: `${LOGOS}/SCHULLER.webp`,
    ...images("schuller"),
    imageAlt: "Trafalete, pensule și bandă de mascare Schuller pregătite pentru o lucrare de zugrăvit",
    tagline: "Unelte de zugrăvit și accesorii de finisaj",
    origin: "Austria",
    summary:
      "Trafalete, pensule, benzi de mascare și folii de protecție pentru lucrări de zugrăvit interioare și exterioare.",
    description: [
      "Schuller Eh'klar este un furnizor austriac specializat în unelte și accesorii pentru zugrăvit, vopsit și finisaje. Gama este construită pentru zugravi profesioniști, unde uniformitatea aplicării și durata de viață a uneltei influențează direct productivitatea.",
      "Portofoliul acoperă trafalete cu fibre adaptate fiecărui tip de vopsea și suprafață, pensule cu fir natural sau sintetic, benzi de mascare pentru muchii nete, folii și pânze de protecție, tăvi și grile de stors. Accesoriile sunt gândite ca sistem, cu mânere și prelungitoare compatibile între ele.",
      "ScuDiver livrează unelte de zugrăvit Schuller pentru firme de amenajări și pentru lucrările de întreținere a clădirilor administrative și de învățământ.",
    ],
    specialties: [
      "Trafalete pentru vopsele lavabile și pe bază de solvent",
      "Pensule cu fir natural și sintetic",
      "Benzi de mascare pentru muchii nete",
      "Folii, pânze și tăvi de protecție",
    ],
    categorySlugs: ["vopsele-si-accesorii"],
    accent: "#009640",
    seo: {
      title: "Unelte de Zugrăvit Schuller Eh'klar",
      description:
        "Distribuitor Schuller Eh'klar: trafalete, pensule, benzi de mascare și folii de protecție pentru lucrări de zugrăvit și finisaje.",
      keywords: [
        "Schuller",
        "Schuller Eh'klar",
        "trafalete",
        "pensule zugravit",
        "banda de mascare",
        "accesorii zugravit",
      ],
    },
  },

  // ─── Aparataj electric ──────────────────────────────────────────────────────
  {
    slug: "schneider",
    name: "Schneider Electric",
    productBrands: ["SCHNEIDERELECTRIC"],
    logo: `${LOGOS}/SCHNEIDERELECTRIC.webp`,
    ...images("schneider"),
    imageAlt:
      "Tablou electric echipat cu siguranțe automate Schneider Electric pe șină DIN",
    tagline: "Aparataj modular și distribuție electrică",
    origin: "Franța",
    founded: "1836",
    summary:
      "Siguranțe automate, întrerupătoare diferențiale și tablouri de distribuție pentru instalații electrice civile și industriale.",
    description: [
      "Schneider Electric este un grup francez cu origini în 1836, devenit una dintre referințele mondiale în distribuția electrică și automatizări. În zona de instalații de joasă tensiune, gama Acti9 este printre cele mai utilizate soluții de aparataj modular din Europa.",
      "Portofoliul relevant pentru construcții și mentenanță acoperă siguranțe automate cu diverse curbe de declanșare, întrerupătoare diferențiale de tip AC și A, blocuri de protecție combinată, tablouri de distribuție pentru montaj îngropat sau aparent și aparataj de comandă și semnalizare.",
      "Furnizăm aparataj Schneider Electric pentru lucrări de instalații electrice, modernizări de tablouri și proceduri de achiziție publică, cu declarații de conformitate și fișe tehnice pentru fiecare referință.",
    ],
    specialties: [
      "Siguranțe automate modulare Acti9",
      "Întrerupătoare diferențiale tip AC și A",
      "Tablouri de distribuție pe șină DIN",
      "Aparataj de comandă și semnalizare",
    ],
    categorySlugs: ["aparataj-electric", "consumabile"],
    accent: "#3DCD58",
    seo: {
      title: "Aparataj Electric Schneider Electric",
      description:
        "Distribuitor Schneider Electric: siguranțe automate Acti9, întrerupătoare diferențiale, tablouri de distribuție și aparataj de comandă pentru instalații.",
      keywords: [
        "Schneider Electric",
        "siguranta automata Schneider",
        "Acti9",
        "intrerupator diferential",
        "tablou electric Schneider",
        "aparataj modular",
      ],
    },
  },
  {
    slug: "eaton",
    name: "Eaton",
    productBrands: ["Eaton"],
    logo: `${LOGOS}/EATON.webp`,
    ...images("eaton"),
    imageAlt:
      "Aparataj electric Eaton montat pe șină DIN într-un tablou de distribuție industrial",
    tagline: "Protecție electrică și management al energiei",
    origin: "Irlanda / Statele Unite",
    founded: "1911",
    summary:
      "Aparataj de protecție, tablouri de distribuție și echipamente de comutație pentru instalații electrice industriale și terțiare.",
    description: [
      "Eaton este un grup de management al energiei fondat în 1911, cu o divizie electrică prezentă în întreaga Europă. Gama sa de joasă tensiune este utilizată frecvent în clădiri administrative, unități industriale și infrastructură.",
      "Portofoliul acoperă siguranțe automate modulare, întrerupătoare diferențiale, întrerupătoare automate în carcasă turnată, contactoare și relee termice, precum și carcase și tablouri de distribuție. Seria xEffect și gama modulară xPole sunt proiectate pentru montaj rapid pe șină DIN și pentru selectivitate în scheme complexe.",
      "ScuDiver furnizează aparataj Eaton pentru lucrări de instalații electrice și pentru achiziții publice unde se solicită echipamente cu certificare conform standardelor IEC și declarații de performanță complete.",
    ],
    specialties: [
      "Aparataj modular xPole pe șină DIN",
      "Întrerupătoare diferențiale și de protecție",
      "Contactoare și relee termice",
      "Tablouri și carcase de distribuție",
    ],
    categorySlugs: ["aparataj-electric"],
    accent: "#005EB8",
    seo: {
      title: "Aparataj Electric Eaton",
      description:
        "Distribuitor Eaton: siguranțe automate xPole, întrerupătoare diferențiale, contactoare, relee termice și tablouri de distribuție pentru instalații.",
      keywords: [
        "Eaton",
        "aparataj Eaton",
        "siguranta automata Eaton",
        "xPole",
        "intrerupator diferential Eaton",
        "contactor Eaton",
      ],
    },
  },
];

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}

/** Products belonging to a brand, in catalogue order. */
export function getProductsByBrand(slug: string) {
  const brand = getBrandBySlug(slug);
  if (!brand) return [];
  return products.filter((p) => brand.productBrands.includes(p.brand));
}

/** The brand a catalogue product belongs to, if it has a dedicated page. */
export function getBrandForProduct(productBrand: string) {
  return brands.find((b) => b.productBrands.includes(productBrand));
}

/**
 * Brands that supply a category, in catalogue order. Read from each brand's
 * own `categorySlugs` rather than derived from the products on file — the
 * catalogue holds a sample of the range, so deriving it would hide brands
 * whose products simply have not been written up yet.
 */
export function getBrandsForCategory(categorySlug: string) {
  return brands.filter((b) => b.categorySlugs.includes(categorySlug));
}

export function getFeaturedBrands() {
  return brands.filter((b) => b.featured);
}
