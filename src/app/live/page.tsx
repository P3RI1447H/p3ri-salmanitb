import type { Metadata } from "next";
import { getChannelUrl } from "@/lib/youtube";
import LivePageClient from "@/components/features/LivePageClient";

export const metadata: Metadata = {
  title: "Live Stream — P3RI Salman ITB",
  description:
    "Saksikan siaran langsung kegiatan P3RI Masjid Salman ITB. Tarawih, kajian, dan kegiatan Ramadhan lainnya.",
};

export default function LivePage() {
  const channelUrl = getChannelUrl();

  return (
    <main className="min-h-screen bg-background-page">
      {/* Main Content */}
      <section className="px-4 py-6 pt-8 sm:px-8 md:px-12 md:py-10 md:pt-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <LivePageClient channelUrl={channelUrl} />
        </div>
      </section>
    </main>
  );
}
