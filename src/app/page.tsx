"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ProgramCard from "../components/features/ProgramCard";
import FAQAccordion from "../components/features/FAQBox";
import RamadhanInfoSection from "../components/features/RamadhanInfoSection";
import HeroCarousel from "../components/features/HeroCarousel";
import { PROGRAMS_DATA, FAQ_DATA } from "../lib/constants";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  UtensilsCrossed,
  Heart,
} from "lucide-react";
import HeroDashboard from "../components/features/HeroDashboard";
import JsonLd from "../components/JsonLd";


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [programsPerPage, setProgramsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setProgramsPerPage(4);
      } else if (width >= 1024) {
        setProgramsPerPage(3);
      } else if (width >= 768) {
        setProgramsPerPage(2);
      } else {
        setProgramsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(PROGRAMS_DATA.length / programsPerPage);
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = PROGRAMS_DATA.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, totalPages);

    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const stats = [
    {
      icon: Users,
      value: "Ribuan",
      label: "Jamaah terlayani",
    },
    {
      icon: UtensilsCrossed,
      value: "1.500+",
      label: "Porsi buka per hari",
    },
    {
      icon: Heart,
      value: "Puluhan",
      label: "Panti asuhan disantunan",
    },
  ];

  return (
    <main id="main-content" className="bg-background-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_DATA.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative z-10 w-full overflow-hidden rounded-b-[20px] md:rounded-b-[40px]"
        style={{
          backgroundImage: "linear-gradient(rgba(239, 239, 239, 0.1), rgba(239, 239, 239, 0.1)), url('/images/section-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Image — absolute, bleeds to left edge on md+ */}
        <div className="relative h-[280px] w-full sm:h-[340px] md:absolute md:inset-y-0 md:left-0 md:h-full md:w-[55%]">
          <HeroCarousel />
        </div>

        {/* Content container */}
        <div className="relative z-20 mx-auto max-w-[1200px] px-6 py-10 md:flex md:min-h-[520px] md:items-center md:justify-end md:px-12 md:py-20 lg:min-h-[580px] lg:px-20 lg:py-24">
          {/* Text — right side on md+ */}
          <div className="flex w-full flex-col items-start text-left md:w-[48%] md:pl-4 lg:w-[45%]">
            {/* Ramadhan badge / countdown */}
            <div className="mb-6 md:mb-8">
              <HeroDashboard />
            </div>

            <h1
              id="hero-heading"
              className="font-forum max-w-xl text-[36px] leading-[1.1] font-normal text-foreground drop-shadow-lg sm:text-[42px] md:text-[52px] lg:text-[64px]"
            >
              Ramadhan dan Idul Adha
              <br />
              bersama P3RI
            </h1>

            <p className="font-montserrat mt-5 max-w-lg text-sm leading-relaxed font-medium text-foreground drop-shadow-md md:mt-6 md:text-base lg:text-lg">
              Sambut Ramadhan 1447 H dan rangkaian Idul Adha bersama
              program-program P3RI Masjid Salman ITB. Dari terawih berjamaah,
              berbagi buka, hingga festival Ramadhan — mari hidupkan semangat
              kebersamaan dan kebaikan.
            </p>

            <div className="mt-7 flex flex-row items-center gap-3 md:mt-9 md:gap-4">
              <Link
                href="/timeline"
                className="bg-accent font-montserrat text-accent-foreground hover:bg-accent-hover focus-visible:outline-accent rounded-full px-7 py-3.5 text-sm font-bold shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:px-9 md:py-4 md:text-base lg:text-lg"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/infak"
                className="border-white/60 font-montserrat text-white hover:bg-white/15 focus-visible:outline-white rounded-full border bg-white/10 px-7 py-3.5 text-sm font-bold shadow-lg backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:px-9 md:py-4 md:text-base lg:text-lg"
              >
                Infak &amp; Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ramadhan Info Cards (Imsakiyah, Tarawih, IRAMA) */}
      <RamadhanInfoSection />

      {/* Programs */}
      <section
        aria-labelledby="programs-heading"
        className="bg-background-page px-6 py-10 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 text-center md:mb-10 lg:mb-12">
            <h2
              id="programs-heading"
              className="font-forum text-foreground mb-4 text-4xl leading-tight font-normal md:mb-6 md:text-5xl lg:text-6xl"
            >
              Program Ramadhan, Idul Adha, dan Idul Fitri
            </h2>
            <p className="font-montserrat text-text-gray mx-auto max-w-3xl text-sm font-medium md:text-base lg:text-lg">
              Hidupkan Ramadhan, Idul Adha, dan Idul Fitri 1447 H bersama
              program-program kegiatan P3RI Salman.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 justify-items-center gap-6 md:mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                slug={program.slug}
                title={program.title}
                summary={program.summary}
              />
            ))}
          </div>

          {/* Pagination */}
          <nav
            aria-label="Navigasi halaman program"
            className="flex items-center justify-center gap-2 md:gap-4"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
              className="bg-card text-foreground focus-visible:outline-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-1.5 md:gap-3">
              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[0]! > 1 && (
                  <span
                    className="font-montserrat text-text-gray px-1 text-sm"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                )}

              {getPaginationGroup().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Halaman ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`font-montserrat focus-visible:outline-primary h-10 w-10 rounded-full text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:h-12 md:w-12 md:text-base ${currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-foreground hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}

              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[getPaginationGroup().length - 1]! <
                totalPages && (
                  <span
                    className="font-montserrat text-text-gray px-1 text-sm"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Halaman berikutnya"
              className="bg-card text-foreground focus-visible:outline-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </nav>
        </div>
      </section>

      {/* Stats */}
      <section
        aria-labelledby="stats-heading"
        className="bg-background-section px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="stats-heading"
            className="font-forum text-foreground mb-4 text-4xl leading-tight font-normal md:mb-6 md:text-5xl"
          >
            Tahun Lalu di P3RI
          </h2>
          <p className="font-montserrat text-text-gray mx-auto mb-10 max-w-2xl text-sm leading-relaxed font-medium md:mb-14 md:text-base">
            Semoga tahun ini lebih baik lagi!
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card flex flex-col items-center gap-3 rounded-2xl p-6 md:gap-4 md:p-8"
              >
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14">
                  <stat.icon
                    className="text-primary h-6 w-6 md:h-7 md:w-7"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-forum text-primary text-3xl md:text-4xl">
                  {stat.value}
                </span>
                <span className="font-montserrat text-text-gray text-sm font-medium md:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-background-page relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="absolute inset-0">
          <div
            className="relative h-full w-full"
            style={{ clipPath: "url(#faq-mask)" }}
          >
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <h2
            id="faq-heading"
            className="font-forum text-foreground mb-8 text-center text-4xl font-normal md:mb-10 md:text-5xl lg:mb-12"
          >
            Pertanyaan Umum
          </h2>
          <div className="mx-auto max-w-3xl p-4 sm:p-6">
            <FAQAccordion />
          </div>
        </div>
      </section>
    </main>
  );
}