"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  ProgramSearchBar,
  ProgramResults,
} from "../../components/features/ProgramGrid";

interface Program {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date_display: string;
  location: string;
  images: string[];
}

/**
 * Client-side wrapper that manages the search state and renders
 * both the hero (with search bar) and the program grid below.
 * The hero visuals are still rendered here but contain zero interactivity
 * beyond the search input — keeping the JS bundle minimal.
 */
export default function ProgramPageClient({
  programs,
}: {
  programs: Program[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary pb-16 pt-24 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-hero-bg/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-brand-purple/10 blur-2xl" />
        </div>

        {/* Decorative pattern dots */}
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles size={16} className="text-accent" />
              <span className="font-montserrat text-xs font-semibold uppercase tracking-wider text-accent">
                Ramadhan 1447 H
              </span>
            </div>

            <h1 className="mb-6 max-w-3xl font-forum text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Program P3RI
            </h1>

            <p className="mb-10 max-w-2xl font-montserrat text-sm font-medium leading-relaxed text-white/80 md:text-base lg:text-lg">
              Jelajahi beragam program yang kami hadirkan untuk menyemarakkan
              Ramadhan, Idul Fitri, dan Idul Adha bersama Masjid Salman ITB.
            </p>

            <ProgramSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z"
              fill="var(--color-background-page)"
            />
          </svg>
        </div>
      </section>

      {/* Results section (count + grid) */}
      <ProgramResults
        programs={programs}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery("")}
      />
    </>
  );
}
