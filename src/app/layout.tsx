import type { Metadata } from "next";
import { Montserrat, Forum } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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
  title: "P3RI Salman ITB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${montserrat.variable} ${forum.variable} font-montserrat antialiased`}>
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