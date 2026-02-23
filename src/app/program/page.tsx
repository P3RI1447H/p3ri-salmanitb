import { PROGRAMS_DATA } from "../../lib/constants";
import ProgramPageClient from "./ProgramPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Ramadhan, Idul Fitri & Idul Adha",
  description:
    "Jelajahi beragam program Ramadhan, Idul Fitri, dan Idul Adha 1447 H yang diselenggarakan oleh P3RI Masjid Salman ITB.",
  alternates: {
    canonical: "/program",
  },
  openGraph: {
    title: "Program Ramadhan, Idul Fitri & Idul Adha — P3RI Salman ITB",
    description:
      "Jelajahi beragam program Ramadhan, Idul Fitri, dan Idul Adha 1447 H yang diselenggarakan oleh P3RI Masjid Salman ITB.",
    url: "/program",
  },
  twitter: {
    title: "Program Ramadhan, Idul Fitri & Idul Adha — P3RI Salman ITB",
    description:
      "Jelajahi beragam program Ramadhan, Idul Fitri, dan Idul Adha 1447 H yang diselenggarakan oleh P3RI Masjid Salman ITB.",
  },
};

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-background-page">
      <ProgramPageClient programs={PROGRAMS_DATA} />
    </main>
  );
}
