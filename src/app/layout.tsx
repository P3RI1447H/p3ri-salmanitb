import type { Metadata } from "next";
import { Montserrat, Forum } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JsonLd from "../components/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com",
  ),
  title: {
    default:
      "P3RI Salman ITB — Program Ramadhan & Idul Adha Masjid Salman ITB",
    template: "%s | P3RI Salman ITB",
  },
  description:
    "Website resmi P3RI Masjid Salman ITB. Informasi program Ramadhan, Idul Fitri, dan Idul Adha 1447 H — jadwal kegiatan, live streaming, dan donasi.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "P3RI Salman ITB",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "P3RI Salman ITB — Program Ramadhan & Idul Adha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${montserrat.variable} ${forum.variable} font-montserrat antialiased`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "P3RI Masjid Salman ITB",
            url:
              process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com",
            logo:
              (process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com") +
              "/images/logo-p3ri.png",
            description:
              "Panitia Pelaksana Program Ramadhan dan Idul Adha Masjid Salman ITB.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Ganesa No.7",
              addressLocality: "Bandung",
              addressRegion: "Jawa Barat",
              postalCode: "40132",
              addressCountry: "ID",
            },
            sameAs: [
              "https://www.youtube.com/@SalmanITB",
              "https://www.instagram.com/salmanitb",
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "P3RI Salman ITB",
            url:
              process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com",
          }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 font-montserrat text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          Langsung ke konten
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}