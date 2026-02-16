"use client";

import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  time: string;
  activity: string;
  info: string;
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
    timeline: TimelineItem[];
  };
}

export default function ProgramDetailClient({ program }: { program: Program }) {

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="bg-primary relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-hero-bg/20 absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute -bottom-32 -left-20 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-brand-purple/10 absolute top-1/3 right-1/4 h-40 w-40 rounded-full blur-2xl" />
        </div>

        {/* Dot pattern */}
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
          {/* Back Button */}
          <div className="mb-8 flex justify-start">
            <Link
              href="/program"
              className="font-montserrat group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
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
              <span className="font-montserrat text-accent text-xs font-semibold tracking-wider uppercase">
                Ramadhan 1447 H
              </span>
            </div>

            {/* Title */}
            <h1 className="font-forum mb-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {program.title}
            </h1>

            {/* Meta info */}
            <div className="font-montserrat mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80 md:text-base">
              {program.date_display && (
                <div className="flex items-center gap-2">
                  <Calendar
                    size={16}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{program.date_display}</span>
                </div>
              )}
              {program.location && (
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{program.location}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            <p className="font-montserrat max-w-2xl text-sm leading-relaxed font-medium text-white/70 md:text-base">
              {program.summary}
            </p>
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
      {program.details.timeline.length > 0 && (
        <section
          id="detailtimeline"
          className="scroll-mt-20 px-6 pt-6 pb-10 md:px-12 md:pt-12 md:pb-16 lg:px-20 lg:pb-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="font-forum text-foreground mb-8 text-center text-3xl sm:text-4xl md:mb-12 md:text-5xl lg:text-6xl">
              Timeline
            </h2>

            {/* Location badge */}
            <div className="mb-12 flex justify-center md:mb-16">
              <div className="bg-primary inline-flex items-center gap-3 rounded-2xl px-8 py-4 shadow-md">
                <MapPin
                  size={24}
                  className="flex-shrink-0 text-white"
                  aria-hidden="true"
                />
                <span className="font-montserrat text-accent text-sm font-semibold sm:text-base md:text-lg">
                  {program.location}
                </span>
              </div>
            </div>

            {/* Timeline items */}
            {program.details.timeline.length === 1 ? (
              /* Single item — centered */
              <div className="flex flex-col items-center gap-6">
                <div className="from-brand-purple to-brand-purple-dark rounded-full bg-gradient-to-r px-8 py-3 shadow-md">
                  <span className="font-montserrat text-sm font-bold text-white">
                    {program.details.timeline[0]!.date}
                  </span>
                </div>
                <div className="border-border bg-card w-full max-w-md rounded-2xl border p-8 text-center shadow-lg">
                  <h3 className="font-montserrat text-brand-purple mb-2 text-xl font-bold">
                    {program.details.timeline[0]!.activity}
                  </h3>
                  {program.details.timeline[0]!.time && (
                    <p className="font-montserrat text-brand-purple/70 mb-4 text-sm font-semibold">
                      {program.details.timeline[0]!.time}
                    </p>
                  )}
                  <p className="font-montserrat text-text-gray text-sm font-medium whitespace-pre-line">
                    {program.details.timeline[0]!.info}
                  </p>
                </div>
              </div>
            ) : (
              /* Multiple items — alternating timeline */
              <div className="relative">
                {/* Center line (desktop) */}
                <div className="bg-brand-purple/20 absolute top-0 left-6 hidden h-full w-0.5 md:left-1/2 md:block md:-translate-x-1/2" />
                {/* Left line (mobile) */}
                <div className="bg-brand-purple/20 absolute top-0 left-6 h-full w-0.5 md:hidden" />

                <div className="flex flex-col gap-12 md:gap-16">
                  {program.details.timeline.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex w-full items-start",
                          /* Mobile: always left-aligned */
                          "flex-row",
                          /* Desktop: alternate sides */
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        )}
                      >
                        {/* Mobile dot */}
                        <div className="relative mr-6 flex flex-col items-center md:hidden">
                          <div className="bg-brand-purple ring-background-page z-20 h-4 w-4 rounded-full ring-4" />
                        </div>

                        {/* Content side */}
                        <div
                          className={cn(
                            "flex w-full flex-col gap-3 md:w-[42%]",
                            isEven ? "md:items-start" : "md:items-end"
                          )}
                        >
                          {/* Date badge */}
                          <div className="from-brand-purple to-brand-purple-dark w-fit rounded-full bg-gradient-to-r px-6 py-2 shadow-sm">
                            <span className="font-montserrat text-xs font-bold text-white sm:text-sm">
                              {item.date}
                            </span>
                          </div>

                          {/* Card */}
                          <div className="border-border bg-card w-full rounded-2xl border p-6 shadow-lg">
                            <h3 className="font-montserrat text-brand-purple text-lg font-bold md:text-xl">
                              {item.activity}
                            </h3>
                            {item.time && (
                              <p className="font-montserrat text-brand-purple/70 mb-3 text-xs font-semibold md:text-sm">
                                {item.time}
                              </p>
                            )}
                            <p className="font-montserrat text-text-gray text-xs leading-relaxed font-medium whitespace-pre-line md:text-sm">
                              {item.info}
                            </p>
                          </div>
                        </div>

                        {/* Center dot (desktop) */}
                        <div className="relative hidden items-center justify-center md:flex md:w-[16%]">
                          {/* Dashed connector line */}
                          <div
                            className={cn(
                              "absolute top-1/2 h-0.5 w-12",
                              isEven
                                ? "right-[calc(50%+14px)]"
                                : "left-[calc(50%+14px)]"
                            )}
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(to right, var(--color-brand-purple) 0, var(--color-brand-purple) 6px, transparent 6px, transparent 12px)",
                            }}
                          />
                          <div className="bg-brand-purple-dark ring-background-page z-20 h-5 w-5 rounded-full ring-4" />
                        </div>

                        {/* Spacer for opposite side (desktop) */}
                        <div className="hidden md:block md:w-[42%]" />
                      </div>
                    );
                  })}
                </div>
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
            <div className="bg-brand-purple flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-1 md:h-12 md:w-12">
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          </Link>
        </section>
      )}
    </>
  );
}
