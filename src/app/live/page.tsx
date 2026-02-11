import Placeholder from "@/components/ui/Placeholder";
import { Video } from "lucide-react";

export default function LivePage() {
  return (
    <main className="min-h-screen bg-background-page flex items-center justify-center p-4">
      <Placeholder
        title="Live Stream"
        description="Saksikan siaran langsung kegiatan P3RI Masjid Salman ITB di sini. Jadwal live streaming akan segera diperbarui."
        icon={Video}
        action={{
          label: "Lihat Jadwal Kegiatan",
          href: "/timeline",
        }}
      />
    </main>
  );
}
