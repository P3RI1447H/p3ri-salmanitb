import type { Metadata } from "next";
import { getChannelUrl } from "@/lib/youtube";
import LivePageClient from "@/components/features/LivePageClient";

export const metadata: Metadata = {
  title: "Live Streaming",
  description:
    "Saksikan siaran langsung kegiatan P3RI Masjid Salman ITB. Tarawih, kajian, dan kegiatan Ramadhan 1447 H lainnya.",
  alternates: {
    canonical: "/live",
  },
  openGraph: {
    title: "Live Streaming — P3RI Salman ITB",
    description:
      "Saksikan siaran langsung kegiatan P3RI Masjid Salman ITB. Tarawih, kajian, dan kegiatan Ramadhan 1447 H lainnya.",
    url: "/live",
  },
  twitter: {
    title: "Live Streaming — P3RI Salman ITB",
    description:
      "Saksikan siaran langsung kegiatan P3RI Masjid Salman ITB. Tarawih, kajian, dan kegiatan Ramadhan 1447 H lainnya.",
  },
};

export default function LivePage() {
  const channelUrl = getChannelUrl();

  return (
    <main className="min-h-screen bg-background-page">
      {/* Main Content */}
      <section className="px-4 py-6 pt-8 sm:px-8 md:px-12 md:py-10 md:pt-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 font-forum text-3xl text-foreground md:text-4xl lg:text-5xl">
            Live Streaming
          </h1>
          <LivePageClient channelUrl={channelUrl} />
        </div>
      </section>
    </main>
  );
}
