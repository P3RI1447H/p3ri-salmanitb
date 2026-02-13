"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProgramCard from "../components/features/ProgramCard";
import FAQAccordion from "../components/features/FAQBox";
import { PROGRAMS_DATA } from "../lib/constants";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  UtensilsCrossed,
  Heart,
} from "lucide-react";
import RamadhanCountdown from "../components/features/RamadhanCountdown";

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
    indexOfLastProgram,
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
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex w-full min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-0 overflow-hidden bg-background-page lg:flex-row lg:gap-12 xl:gap-20"
      >
        <div className="relative flex h-[40vh] w-full items-center justify-center p-6 pb-2 lg:h-screen lg:w-1/2 lg:justify-end lg:p-0">
          <div className="relative h-full w-full max-w-2xl lg:max-w-none">
            <Image
              src="/images/image_placeholder.png"
              alt="Masjid Salman ITB saat kegiatan Ramadhan"
              fill
              className="object-contain object-center mix-blend-multiply lg:object-right"
              priority
            />
          </div>
        </div>

        <div className="relative flex h-auto w-full items-center justify-center px-6 pt-2 pb-12 sm:p-12 md:p-16 lg:h-screen lg:w-1/2 lg:justify-start lg:pl-0">
          <div className="z-10 flex w-full max-w-xl flex-col items-start gap-5 text-left md:gap-6 lg:gap-8">
            <h1
              id="hero-heading"
              className="font-forum text-[40px] font-normal leading-none text-foreground md:text-[56px] lg:text-[68px]"
            >
              Ramadhan dan Idul Adha bersama P3RI
            </h1>
            <RamadhanCountdown />
            <p className="font-montserrat text-sm font-medium leading-relaxed text-text-gray lg:text-lg">
              Sambut Ramadhan 1447 H dan rangkaian Idul Adha bersama
              program-program P3RI Masjid Salman ITB. Dari terawih berjamaah,
              berbagi buka, hingga festival Ramadhan — mari hidupkan semangat
              kebersamaan dan kebaikan.
            </p>
            <div className="flex flex-row items-center justify-start gap-3 md:gap-4">
              <Link
                href="/timeline"
                className="rounded-full bg-primary px-6 py-3 font-montserrat text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:px-8 md:py-4 md:text-base lg:text-lg"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/infak"
                className="rounded-full border border-primary bg-transparent px-6 py-3 font-montserrat text-sm font-bold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:px-8 md:py-4 md:text-base lg:text-lg"
              >
                Infak & Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        aria-labelledby="cta-heading"
        className="bg-background-page px-6 py-4"
      >
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-8 py-10 text-center sm:px-12 md:rounded-[48px] md:px-16 md:py-14">
          <h2
            id="cta-heading"
            className="font-forum text-3xl font-normal leading-tight text-primary-foreground md:text-4xl lg:text-5xl"
          >
            Banyak kegiatan yang kami buat, spesial untuk Anda
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-montserrat text-sm font-medium leading-relaxed text-primary-foreground/80 md:mt-6 md:text-base lg:text-lg">
            Kami menyiapkan beragam program yang dirancang untuk memperkaya
            pengalaman ibadah dan mempererat ukhuwah. Temukan kegiatan yang
            sesuai untuk Anda, keluarga, maupun komunitas.
          </p>
          <Link
            href="/timeline"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-montserrat text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mt-8 md:px-8 md:py-4 md:text-base"
          >
            Jadwal Lengkap
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Programs */}
      <section
        aria-labelledby="programs-heading"
        className="bg-background-page px-6 py-10 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 text-center md:mb-10 lg:mb-12">
            <h2
              id="programs-heading"
              className="mb-4 font-forum text-4xl font-normal leading-tight text-foreground md:mb-6 md:text-5xl lg:text-6xl"
            >
              Program Ramadhan, Idul Adha, dan Idul Fitri
            </h2>
            <p className="mx-auto max-w-3xl font-montserrat text-sm font-medium text-text-gray md:text-base lg:text-lg">
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
          <nav aria-label="Navigasi halaman program" className="flex items-center justify-center gap-2 md:gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-1.5 md:gap-3">
              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[0]! > 1 && (
                  <span
                    className="px-1 font-montserrat text-sm text-text-gray"
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
                  className={`h-10 w-10 rounded-full font-montserrat text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:h-12 md:w-12 md:text-base ${
                    currentPage === page
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
                    className="px-1 font-montserrat text-sm text-text-gray"
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
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:h-12 md:w-12"
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
            className="mb-4 font-forum text-4xl font-normal leading-tight text-foreground md:mb-6 md:text-5xl"
          >
            Tahun Lalu di P3RI
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-montserrat text-sm font-medium leading-relaxed text-text-gray md:mb-14 md:text-base">
            Semoga tahun ini lebih baik lagi!
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 md:gap-4 md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:h-14 md:w-14">
                  <stat.icon
                    className="h-6 w-6 text-primary md:h-7 md:w-7"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-forum text-3xl text-primary md:text-4xl">
                  {stat.value}
                </span>
                <span className="font-montserrat text-sm font-medium text-text-gray md:text-base">
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
        className="relative overflow-hidden bg-background-page px-4 py-10 sm:px-6 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="absolute inset-0">
          <div
            className="relative h-full w-full"
            style={{ clipPath: "url(#faq-mask)" }}
          >
            <Image
              src="/images/gallery-bg.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="faq-mask" clipPathUnits="objectBoundingBox">
              <path d="M1,1 H0 V0 C0,0.031,0.032,0.056,0.071,0.056 C0.111,0.056,0.143,0.031,0.143,0 C0.143,0.031,0.175,0.056,0.214,0.056 C0.254,0.056,0.286,0.031,0.286,0 C0.286,0.031,0.318,0.056,0.357,0.056 C0.397,0.056,0.429,0.031,0.429,0 C0.429,0.031,0.461,0.056,0.5,0.056 C0.54,0.056,0.571,0.031,0.571,0 C0.571,0.031,0.603,0.056,0.643,0.056 C0.683,0.056,0.714,0.031,0.714,0 C0.714,0.031,0.746,0.056,0.786,0.056 C0.825,0.056,0.857,0.031,0.857,0 C0.857,0.031,0.889,0.056,0.929,0.056 C0.968,0.056,1,0.031,1,0 V1 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <h2
            id="faq-heading"
            className="mb-8 text-center font-forum text-4xl font-normal text-foreground md:mb-10 md:text-5xl lg:mb-12"
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
