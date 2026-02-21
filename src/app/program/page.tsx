import { PROGRAMS_DATA } from "../../lib/constants";
import ProgramPageClient from "./ProgramPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program P3RI | Salman ITB",
  description:
    "Jelajahi beragam program Ramadhan, Idul Fitri, dan Idul Adha yang diselenggarakan oleh P3RI Masjid Salman ITB.",
};

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-background-page">
      <ProgramPageClient programs={PROGRAMS_DATA} />
    </main>
  );
}
