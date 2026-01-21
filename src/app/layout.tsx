import type { Metadata } from "next";
import { Montserrat, Forum } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}