import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";
import { Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsor & Partner",
  description:
    "Informasi sponsorship dan partnership untuk kegiatan Ramadhan 1447 H P3RI Masjid Salman ITB.",
};

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-background-page flex items-center justify-center p-4">
      <Placeholder
        title="Sponsor & Partner"
        description="Informasi mengenai sponsorship dan partnership untuk kegiatan Ramadhan 1447 H akan segera tersedia. Hubungi kami untuk kerjasama lebih lanjut."
        icon={Handshake}
        action={{
          label: "Hubungi Kami",
          href: "/kontak", // Assuming /kontak might exist or fallback to home
        }}
      />
    </main>
  );
}
