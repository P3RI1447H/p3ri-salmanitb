import Placeholder from "@/components/ui/Placeholder";
import { CalendarClock } from "lucide-react";

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-background-page flex items-center justify-center p-4">
      <Placeholder
        title="Jadwal Kegiatan"
        description="Jadwal lengkap kegiatan Ramadhan dan Idul Adha 1447 H sedang disusun. Pantau terus halaman ini untuk pembaruan terbaru."
        icon={CalendarClock}
        action={{
          label: "Lihat Program",
          href: "/program",
        }}
      />
    </main>
  );
}
