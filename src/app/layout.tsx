import type { Metadata } from "next";
import { Montserrat, Instrument_Serif } from "next/font/google";
import "../styles/globals.css";
import JsonLd from "../components/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com"
  ),
  title: {
    default: "P3RI Salman ITB — Program Ramadhan & Idul Adha Masjid Salman ITB",
    template: "%s | P3RI Salman ITB",
  },
  description:
    "Website resmi P3RI Masjid Salman ITB sedang disiapkan. Nantikan informasi program Ramadhan dan Idul Adha berikutnya.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "P3RI Salman ITB",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "P3RI Salman ITB — Program Ramadhan & Idul Adha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P3RI Salman ITB — Program Ramadhan & Idul Adha Masjid Salman ITB",
    description:
      "Website resmi P3RI Masjid Salman ITB sedang disiapkan. Nantikan informasi program Ramadhan dan Idul Adha berikutnya.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.variable} ${instrumentSerif.variable} font-montserrat antialiased`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "P3RI Masjid Salman ITB",
            url:
              process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com",
            logo:
              (process.env.NEXT_PUBLIC_API_URL ||
                "https://p3ri.salmanitb.com") + "/images/logo-p3ri.png",
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
        {children}
      </body>
    </html>
  );
}
