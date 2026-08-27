import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { brands } from "@/lib/data/brands";

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
  metadataBase: new URL("https://scudiver.ro"),
  title: {
    default: "ScuDiver — Distribuitor Branduri de Scule și Echipamente",
    template: "%s | ScuDiver",
  },
  description:
    "Distribuim Bosch, DeWalt, Makita, Milwaukee, Unior, YATO, INGCO, SAF-FRO, SOUDAL, Schneider Electric și Eaton — gama completă a fiecărui brand, la cerere. Operator economic înregistrat în SEAP.",
  keywords: [
    "distribuitor scule",
    "branduri scule",
    "furnizor scule",
    "scule electrice",
    "echipament de protectie",
    "aparataj electric",
    "SEAP",
    "licitatii publice",
    ...brands.map((b) => b.name),
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
        <WhatsAppBubble />
        <CookieBanner />
      </body>
    </html>
  );
}
