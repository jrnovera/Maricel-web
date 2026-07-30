import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl, siteName } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

/** Calligraphy accent used for the "Meet Our" / "Join Our Team" hero lines. */
const greatVibes = Great_Vibes({
  variable: "--font-greatvibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Premium hair, skin, nail, lash and body treatments in Dubai. Beauty, care and confidence in every detail.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Luxury Beauty, Tailored For You`,
    template: `%s — ${siteName}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_AE",
    url: "/",
    title: `${siteName} — Luxury Beauty, Tailored For You`,
    description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
