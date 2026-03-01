"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  time: string;
  activity: string;
  info: string;
  photo?: string;
}

interface Program {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date_display: string;
  location: string;
  registration_url: string;
  details: {
    description: string;
    gallery?: {
      images: string[];
      folder_url?: string;
    };
    timeline: TimelineItem[];
  };
}

const innerShadowStyle = {
  boxShadow: "inset 0 0 28px 6px rgba(163, 196, 100, 0.35)",
};

function GalleryCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {/* Desktop: 3 foto statis tanpa animasi */}
      <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6 items-center">
        {[0, 1, 2].map((offset) => {
          const idx = offset % images.length;
          const isCenter = offset === 1;
          return (
            <div
              key={offset}
              className={cn(
                "relative aspect-[4/3] overflow-hidden border border-white/10",
                isCenter ? "rounded-2xl shadow-xl" : "rounded-xl",
              )}
            >
              <img src={images[idx]} alt={`${title} ${offset + 1}`} className="h-full w-full object-cover" />
              {/* Inner shadow overlay */}
              <div className="absolute inset-0 rounded-[inherit] pointer-events-none" style={innerShadowStyle} />
            </div>
          );
        })}
      </div>

      {/* Mobile: 1 foto dengan fade transition */}
      <div className="relative md:hidden w-full aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} ${i + 1}`}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
              i === current ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* Inner shadow overlay mobile */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={innerShadowStyle} />
      </div>
    </>
  );
}

function IramaTimelineCard({ item }: { item: TimelineItem }) {
  const lines = item.info.split("\n");
  const pembicara = lines
    .find((l) => l.startsWith("Pembicara:"))
    ?.replace("Pembicara:", "")
    .trim();
  const topik = lines
    .find((l) => l.startsWith("Topik:"))
    ?.replace("Topik:", "")
    .trim();
  const isPlaceholder =
    !pembicara ||
    pembicara.includes("Segera diumumkan") ||
    !topik ||
    topik.includes("Segera diumumkan");

  return (
    <div className="bg-card w-full overflow-hidden rounded-2xl border border-border shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-3">
        <h3 className="font-montserrat text-primary text-lg font-bold md:text-xl">
          {item.activity}
        </h3>
        {isPlaceholder && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1">
            <Clock size={11} className="text-primary" />
            <span className="font-montserrat text-[10px] font-semibold tracking-wider text-primary uppercase">
              Segera Hadir
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 px-6 py-5">
        {item.photo && !isPlaceholder && (
          <div className="flex-shrink-0">
            <img
              src={item.photo}
              alt={pembicara ?? "Pembicara"}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-start gap-2">
            <span className="font-montserrat min-w-[60px] text-xs font-semibold text-text-gray/70 flex-shrink-0">
              Pembicara
            </span>
            <span className={cn("font-montserrat text-xs", isPlaceholder ? "italic text-text-gray/50" : "font-medium text-text-gray")}>
              {isPlaceholder ? "Akan segera diumumkan" : pembicara}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-montserrat min-w-[60px] text-xs font-semibold text-text-gray/70 flex-shrink-0">
              Topik
            </span>
            <span className={cn("font-montserrat text-xs pl-1.5", isPlaceholder ? "italic text-text-gray/50" : "font-medium text-text-gray")}>
              {isPlaceholder ? "Akan segera diumumkan" : topik}
            </span>
          </div>
          {isPlaceholder && (
            <p className="font-montserrat border-t border-border pt-2 text-[11px] leading-relaxed text-text-gray/40">
              Pantau terus informasi terbaru dari kami.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetailClient({ program }: { program: Program }) {
  const timelineItems = program.details.timeline;
  const timelineLength = timelineItems.length;

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="bg-primary relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-hero-bg/20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute -bottom-32 -left-20 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute top-1/3 right-1/4 h-40 w-40 rounded-full blur-2xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          {/* Back Button */}
          <div className="mb-8 flex justify-start">
            <Link href="/program" className="font-montserrat group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
              <div className="group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all group-hover:text-black">
                <ChevronLeft size={16} />
              </div>
              Kembali
            </Link>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles size={16} className="text-accent" />
              <span className="font-montserrat text-accent text-xs font-semibold tracking-wider uppercase">Ramadhan 1447 H</span>
            </div>

            {/* Title */}
            <h1 className="font-forum mb-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {program.title}
            </h1>

            {/* Meta info */}
            <div className="font-montserrat mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80 md:text-base">
              {program.date_display && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="flex-shrink-0" aria-hidden="true" />
                  <span>{program.date_display}</span>
                </div>
              )}
              {program.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="flex-shrink-0" aria-hidden="true" />
                  <span>{program.location}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            <p className="font-montserrat max-w-2xl text-sm leading-relaxed font-medium text-white/70 md:text-base">
              {program.summary}
            </p>

            {/* Gallery */}
            {program.details.gallery && program.details.gallery.images.length > 0 && (
              <div className="mt-10 w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
                <GalleryCarousel images={program.details.gallery.images} title={program.title} />
                <div className="mt-8 flex justify-center">
                  <a
                    href={program.details.gallery.folder_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-montserrat relative inline-flex items-center rounded-full bg-accent py-2.5 pl-6 pr-12 text-sm font-bold text-accent-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-105"
                  >
                    Dokumentasi Lainnya
                    <div className="bg-primary absolute right-[3px] flex h-[calc(100%-6px)] aspect-square items-center justify-center rounded-full text-white shadow-md transition-transform duration-300">
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Description Section ─── */}
      <section className="px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="border-border bg-card rounded-2xl border p-8 shadow-lg md:rounded-3xl md:p-12">
            <h2 className="font-forum text-foreground mb-6 text-center text-3xl sm:text-4xl md:text-5xl">
              Deskripsi Program
            </h2>
            <p className="font-montserrat text-text-gray text-center text-sm leading-relaxed font-medium md:text-base lg:text-lg">
              {program.details.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Timeline Section ─── */}
      {timelineLength > 0 && (
        <section id="detailtimeline" className="scroll-mt-20 px-6 pt-6 pb-10 md:px-12 md:pt-12 md:pb-16 lg:px-20 lg:pb-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-forum text-foreground mb-8 text-center text-3xl sm:text-4xl md:mb-12 md:text-5xl lg:text-6xl">
              Timeline
            </h2>

            {/* Location badge */}
            <div className="mb-12 flex justify-center md:mb-16">
              <div className="bg-primary inline-flex items-center gap-3 rounded-2xl px-8 py-4 shadow-md">
                <MapPin size={24} className="flex-shrink-0 text-white" aria-hidden="true" />
                <span className="font-montserrat text-accent text-sm font-semibold sm:text-base md:text-lg">
                  {program.location}
                </span>
              </div>
            </div>

            {/* Single item */}
            {timelineLength === 1 ? (
              <div className="flex flex-col items-center gap-6">
                <div className="from-[#91AE4C] to-[#4C782B] rounded-full bg-gradient-to-r px-8 py-3 shadow-md">
                  <span className="font-montserrat text-sm font-bold text-white">{timelineItems[0]!.date}</span>
                </div>
                <div className="border-border bg-card w-full max-w-md rounded-2xl border p-8 text-center shadow-lg">
                  <h3 className="font-montserrat text-primary mb-2 text-xl font-bold">{timelineItems[0]!.activity}</h3>
                  {timelineItems[0]!.time && (
                    <p className="font-montserrat text-primary/70 mb-4 text-sm font-semibold">{timelineItems[0]!.time}</p>
                  )}
                  <p className="font-montserrat text-text-gray text-sm font-medium whitespace-pre-line">{timelineItems[0]!.info}</p>
                </div>
              </div>
            ) : (
              /*
               * Timeline multi-item.
               * Kunci agar garis nyambung:
               * - Tidak pakai gap antar row, tapi pakai py-6/py-8 di dalam tiap row
               * - Garis vertikal di center column adalah satu elemen absolute full-height
               *   yang dibatasi dari dot pertama ke dot terakhir menggunakan top/bottom padding
               * - Dot diposisikan absolute di tengah card (top-1/2)
               */
              <div className="relative">
                {/* Mobile: garis kiri absolute full height, dikurangi setengah row pertama & terakhir */}
                <div
                  className="md:hidden absolute left-[7px] w-0.5 bg-primary/20"
                  style={{ top: "calc(1.5rem + 8px)", bottom: "calc(1.5rem + 8px)" }}
                />
                {/* Desktop: garis tengah absolute full height */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary/20"
                  style={{ top: "calc(3rem + 10px)", bottom: "calc(3rem + 10px)" }}
                />

                {timelineItems.map((item, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex w-full items-center py-6 md:py-8",
                        "flex-row",
                        isEven ? "md:flex-row" : "md:flex-row-reverse",
                      )}
                    >
                      {/* Mobile: dot */}
                      <div className="relative mr-6 flex-shrink-0 md:hidden">
                        <div className="bg-primary ring-background-page z-20 h-4 w-4 rounded-full ring-4" />
                      </div>

                      {/* Content side */}
                      <div className={cn("flex w-full flex-col gap-3 md:w-[42%]", isEven ? "md:items-start" : "md:items-end")}>
                        {/* Date badge */}
                        <div className="from-[#91AE4C] to-[#4C782B] w-fit rounded-full bg-gradient-to-r px-6 py-2 shadow-sm">
                          <span className="font-montserrat text-xs font-bold text-white sm:text-sm">{item.date}</span>
                        </div>

                        {/* Card */}
                        {program.slug === "irama" ? (
                          <IramaTimelineCard item={item} />
                        ) : (
                          <div className="border-border bg-card w-full rounded-2xl border p-6 shadow-lg">
                            <h3 className="font-montserrat text-primary text-lg font-bold md:text-xl mb-4">{item.activity}</h3>
                            <div className="flex items-center gap-4">
                              {item.photo && (
                                <div className="flex-shrink-0">
                                  <img src={item.photo} alt="Imam" className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20" />
                                </div>
                              )}
                              <div className="min-w-0">
                                {item.time && (
                                  <p className="font-montserrat text-primary/70 mb-2 text-xs font-semibold md:text-sm">{item.time}</p>
                                )}
                                <p className="font-montserrat text-text-gray text-xs leading-relaxed font-medium whitespace-pre-line md:text-sm">
                                  {item.info}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Desktop: center column with dot + dashed connector */}
                      <div className="relative hidden md:flex md:w-[16%] items-center justify-center">
                        {/* Dashed line to card */}
                        <div
                          className={cn("absolute h-0.5 w-12", isEven ? "right-[calc(50%+12px)]" : "left-[calc(50%+12px)]")}
                          style={{ backgroundImage: "repeating-linear-gradient(to right, var(--color-primary) 0, var(--color-primary) 6px, transparent 6px, transparent 12px)" }}
                        />
                        {/* Dot */}
                        <div className="bg-primary ring-background-page z-20 h-5 w-5 rounded-full ring-4" />
                      </div>

                      {/* Spacer */}
                      <div className="hidden md:block md:w-[42%]" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── CTA Button ─── */}
      {program.registration_url && program.registration_url !== "#" && (
        <section className="flex justify-center px-6 pt-6 pb-20 md:pb-28">
          <Link
            href={program.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-accent font-montserrat text-accent-foreground inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-105 md:px-10 md:py-5 md:text-lg"
          >
            Daftar Sekarang
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-1 md:h-12 md:w-12">
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          </Link>
        </section>
      )}
    </>
  );
}