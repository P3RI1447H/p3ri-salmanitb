import { Sparkles } from "lucide-react";
import CalendarView from "@/components/features/CalendarView";

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-background-page">
      {/* Hero Section */}
      <section className="bg-primary relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-hero-bg/20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute -bottom-32 -left-20 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-brand-purple/10 absolute top-1/3 right-1/4 h-40 w-40 rounded-full blur-2xl" />
        </div>

        {/* Dot pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            {/* Sparkles Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles size={16} className="text-accent" />
              <span className="font-montserrat text-accent text-xs font-semibold tracking-wider uppercase">
                Ramadhan 1447 H
              </span>
            </div>

            {/* Title */}
            <h1 className="font-forum mb-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Jadwal Kegiatan
            </h1>

            {/* Description */}
            <p className="font-montserrat mb-10 max-w-2xl text-sm leading-relaxed font-medium text-white/80 md:text-base lg:text-lg">
              Lihat seluruh jadwal kegiatan Ramadhan dan Idul Adha 1447 H di
              Masjid Salman ITB dalam satu kalender terpadu.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <CalendarView />
      </section>
    </main>
  );
}
