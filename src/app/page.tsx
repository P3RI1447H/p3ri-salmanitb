"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProgramCard from "../components/features/ProgramCard";
import FAQAccordion from "../components/features/FAQBox";
import { PROGRAMS_DATA } from "../lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <main className="bg-background-page">
      <section className="relative w-full min-h-screen bg-background-page overflow-hidden flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-12 xl:gap-20">
        {/* Image Side */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex items-center justify-center lg:justify-end p-6 pb-2 lg:p-0">
          <div className="relative w-full h-full max-w-2xl lg:max-w-none">
            <Image
              src="/images/image_placeholder.png"
              alt="Masjid Salman ITB"
              fill
              className="object-contain object-center lg:object-right mix-blend-multiply"
              priority
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-6 pt-2 pb-12 sm:p-12 md:p-16 lg:pl-0 h-auto lg:h-screen">
          <div className="w-full max-w-xl flex flex-col gap-5 md:gap-6 lg:gap-8 text-left items-start z-10">
            <h1 className="text-foreground font-forum text-[40px] md:text-[56px] lg:text-[68px] font-normal leading-none">
              Ramadhan dan Idul Adha bersama P3RI
            </h1>
            <div className="w-full flex justify-start">
              <RamadhanCountdown />
            </div>
            <p className="text-text-gray font-montserrat text-sm lg:text-lg font-medium leading-normal text-left">
              Sambut Ramadhan 1447 H dan rangkaian Idul Adha bersama
              program-program P3RI Masjid Salman ITB. Dari terawih berjamaah,
              berbagi buka, hingga festival Ramadhan — mari hidupkan semangat
              kebersamaan dan kebaikan.
            </p>
            <div className="flex flex-row items-center justify-start gap-3 md:gap-4 w-full">
              <Link
                href="/timeline"
                className="bg-primary text-primary-foreground font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.1)] hover:brightness-110 transition-all"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/infak"
                className="bg-transparent border border-primary text-primary font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-primary/5 transition-all"
              >
                Infak & Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-page p-6 flex items-center justify-center">
        <div
          className="max-w-348 mx-auto shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] rounded-[32px] md:rounded-[48px] lg:rounded-[56px] p-6 sm:p-10 md:p-14 text-center"
          style={{
            background:
              "linear-gradient(90deg, #ADCD61 0%, #FFFFFF 50%, #ADCD61 100%)",
            boxShadow: "inset 0px -4px 24px 0px rgba(255,255,255,0.5)",
          }}
        >
          <div className="flex flex-col items-center gap-6 md:gap-10 lg:gap-12">
            <h2 className="text-foreground font-forum text-4xl md:text-5xl lg:text-[56px] font-normal leading-tight">
              Banyak kegiatan yang kami buat, spesial untuk Anda
            </h2>
            <p className="text-foreground font-montserrat text-xs md:text-lg lg:text-xl font-medium leading-normal">
              Kami menyiapkan beragam program yang dirancang untuk memperkaya
              pengalaman ibadah dan mempererat ukhuwah. Temukan kegiatan yang
              sesuai untuk Anda, keluarga, maupun komunitas — dari kajian,
              santunan, hingga festival seru sepanjang Ramadhan.
            </p>
            <div className="relative inline-block">
              <Link
                href="/timeline"
                className="inline-flex items-center bg-accent text-accent-foreground font-montserrat text-sm md:text-base lg:text-lg font-bold pl-6 md:pl-10 pr-[3px] py-[3px] rounded-full shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all"
              >
                Jadwal Lengkap
                <div className="ml-4 md:ml-6 w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-white bg-brand-purple rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-page py-10 sm:py-14 md:py-16 lg:py-20 px-10 md:px-12 lg:px-20">
        <div className="max-w-360 mx-auto">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-foreground font-forum text-4xl md:text-5xl lg:text-6xl font-normal mb-6 md:mb-8 lg:mb-12 leading-tight">
              Program Ramadhan, Idul Adha, dan Idul Fitri
            </h2>
            <p className="text-foreground font-montserrat text-xs md:text-lg lg:text-xl font-medium max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16 leading-normal">
              Hidupkan Ramadhan, Idul Adha, dan Idul Fitri 1447 H bersama
              program-program kegiatan P3RI Salman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] mb-10 md:mb-12 justify-items-center">
            {currentPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                slug={program.slug}
                title={program.title}
                summary={program.summary}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-card text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all flex items-center justify-center shadow-md flex-shrink-0"
            >
              <ChevronLeft
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>

            <div className="flex items-center gap-1.5 md:gap-4">
              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[0]! > 1 && (
                  <span className="text-foreground font-montserrat text-xs md:text-xl px-1">
                    ...
                  </span>
                )}

              {getPaginationGroup().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full font-montserrat text-xs sm:text-sm md:text-xl font-semibold transition-all shadow-md ${
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
                  <span className="text-foreground font-montserrat text-xs md:text-xl px-1">
                    ...
                  </span>
                )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-card text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all flex items-center justify-center shadow-md flex-shrink-0"
            >
              <ChevronRight
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background-page px-6 pb-10 pt-8 md:pt-10 md:pb-14 md:px-12 lg:px-20 lg:pt-14 lg:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-foreground font-forum text-4xl md:text-5xl font-normal leading-tight mb-6 md:mb-10 lg:mb-12">
            Tahun Lalu di P3RI
          </h2>
          <p className="text-foreground font-montserrat text-xs md:text-lg lg:text-xl font-medium leading-normal px-4">
            Tahun lalu, P3RI Salman ITB berhasil melayani ribuan jamaah melalui
            program terawih berjamaah, membagikan lebih dari 1.500 porsi makanan
            berbuka setiap harinya, serta menyelenggarakan santunan ke panti
            asuhan di Bandung Raya. Semoga tahun ini lebih baik lagi!
          </p>
        </div>
      </section>

      <section className="relative bg-background-page py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="relative w-full h-full"
            style={{ clipPath: "url(#faq-mask)" }}
          >
            <Image
              src="/images/gallery-bg.png"
              alt="FAQ Background"
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

        <div className="relative max-w-360 mx-auto z-10">
          <div className="text-center mb-12">
            <h2 className="text-foreground font-forum text-4xl md:text-5xl font-normal text-center mb-8 md:mb-10 lg:mb-12">
              FAQs
            </h2>
          </div>
          <div className="p-6 max-w-225 mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <section className="bg-background-section px-6 md:px-12 lg:px-20 py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-360 mx-auto flex flex-col gap-10 md:gap-14 lg:gap-16">
          <div className="text-center flex flex-col gap-8 md:gap-12 lg:gap-16">
            <h2 className="text-foreground font-forum text-4xl md:text-5xl lg:text-5xl font-normal">
              Sponsor
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"></div>
          </div>

          <div className="text-center flex flex-col gap-8 md:gap-12 lg:gap-16">
            <h2 className="text-foreground font-forum text-4xl md:text-5xl lg:text-5xl font-normal">
              Media Partner
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
