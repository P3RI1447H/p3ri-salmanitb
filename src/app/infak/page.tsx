import Placeholder from "@/components/ui/Placeholder";
import { HandHeart } from "lucide-react";

export default function InfakPage() {
  return (
    <main className="min-h-screen bg-background-page flex items-center justify-center p-4">
      <Placeholder
        title="Infak & Zakat"
        description="Fitur pembayaran infak dan zakat secara online akan segera hadir. Saat ini Anda dapat menyalurkan infak melalui kotak amal di masjid."
        icon={HandHeart}
        action={{
          label: "Kembali ke Beranda",
          href: "/",
        }}
      />
    </main>
  );
}
