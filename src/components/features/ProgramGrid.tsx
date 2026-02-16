"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ProgramCard from "./ProgramCard";

interface Program {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date_display: string;
  location: string;
}

/**
 * Search bar component rendered inside the hero section.
 * Accepts onSearch callback to lift state up to the parent client boundary.
 */
export function ProgramSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full max-w-lg">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"
          aria-hidden="true"
        />
        <input
          id="search-program"
          type="text"
          placeholder="Cari program..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-full border-2 border-white/20 bg-white py-3.5 pl-12 pr-12 font-montserrat text-sm font-medium text-foreground shadow-lg outline-none transition-all placeholder:text-text-gray/60 focus:border-accent focus:ring-2 focus:ring-accent/30 md:py-4 md:text-base"
          aria-label="Cari program"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-gray transition-colors hover:bg-gray-100 hover:text-foreground"
            aria-label="Hapus pencarian"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The filtered program list with count and grid. Rendered below the hero.
 */
export function ProgramResults({
  programs,
  searchQuery,
  onClearSearch,
}: {
  programs: Program[];
  searchQuery: string;
  onClearSearch: () => void;
}) {
  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) return programs;
    const query = searchQuery.toLowerCase();
    return programs.filter(
      (program) =>
        program.title.toLowerCase().includes(query) ||
        program.summary.toLowerCase().includes(query) ||
        program.location.toLowerCase().includes(query),
    );
  }, [searchQuery, programs]);

  return (
    <>
      {/* Program count */}
      <section className="px-6 pt-4 md:px-12 md:pt-8 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-montserrat text-sm font-medium text-text-gray md:text-base">
              {searchQuery ? (
                <>
                  Menampilkan{" "}
                  <span className="font-bold text-foreground">
                    {filteredPrograms.length}
                  </span>{" "}
                  dari{" "}
                  <span className="font-bold text-foreground">
                    {programs.length}
                  </span>{" "}
                  program
                </>
              ) : (
                <>
                  <span className="font-bold text-foreground">
                    {programs.length}
                  </span>{" "}
                  program tersedia
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="px-6 pb-20 pt-6 md:px-12 md:pb-28 md:pt-8 lg:px-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
              {filteredPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ProgramCard
                    slug={program.slug}
                    title={program.title}
                    summary={program.summary}
                    dateDisplay={program.date_display}
                    location={program.location}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background-section">
                <Search size={32} className="text-text-muted" />
              </div>
              <h3 className="mb-2 font-forum text-2xl text-foreground md:text-3xl">
                Program tidak ditemukan
              </h3>
              <p className="max-w-md font-montserrat text-sm font-medium text-text-gray md:text-base">
                Coba gunakan kata kunci lain atau{" "}
                <button
                  onClick={onClearSearch}
                  className="font-semibold text-brand-purple underline underline-offset-2 transition-colors hover:text-brand-purple-hover"
                >
                  lihat semua program
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
