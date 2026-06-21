import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ScuDiver — Scule și Accesorii pentru Construcții",
    template: "%s | ScuDiver",
  },
  description:
    "Furnizor autorizat de scule electrice, scule de mână, burghie și accesorii pentru construcții. Participăm la licitații publice SEAP / e-licitatie.ro.",
  keywords: [
    "scule electrice",
    "scule de mana",
    "burghie",
    "truse de scule",
    "accesorii constructii",
    "SEAP",
    "licitatii publice",
    "furnizor scule",
    "DeWalt",
    "Bosch",
    "Makita",
    "Milwaukee",
  ],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "ScuDiver",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${barlowCondensed.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased">
        <a href="#main-content" className="skip-link">
          Sari la conținut principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
