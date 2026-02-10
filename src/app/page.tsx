"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProgramCard from "../components/features/ProgramCard";
import FAQAccordion from "../components/features/FAQBox";
import { PROGRAMS_DATA } from "../lib/constants";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    <main className="bg-[#F7FFD8]">
      <section className="relative w-full h-screen bg-[#91AE4C] rounded-b-[32px] md:rounded-b-[64px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25),inset_0px_-4px_24px_0px_rgba(255,255,255,0.5)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full lg:w-3/4">
            <Image
              src="/images/hero-bg.png"
              alt="Masjid Salman ITB"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-10% to-[#91AE4C] to-75% lg:bg-[radial-gradient(150%_165%_at_-50%_50%,_transparent_64%,_#91AE4C_70%)] xl:bg-[radial-gradient(165%_195%_at_-50%_50%,_transparent_64%,_#91AE4C_70%)]" />
          </div>
        </div>

        <div className="relative w-full mx-auto h-full pl-8 sm:pl-12 md:pl-16 lg:pl-20 pr-10 lg:pr-10 xl:pr-16 flex items-end lg:items-center justify-start lg:justify-end pb-22 md:pb-26">
          <div className="w-150 h-[318px] flex flex-col gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-white font-forum text-[56px] lg:text-[68px] font-normal leading-none">
              Ramadhan dan Idul Adha bersama P3RI
            </h1>
            <p className="text-white font-montserrat text-sm lg:text-lg font-medium leading-normal">
              Proin quis cras euismod sit et metus risus ut. Semper nam vel
              morbi sit cursus tincidunt massa et a. Dolor odio parturient
              cursus justo nunc enim, a, sit facilisi. Eleifend at ac lacus,
              ullamcorper mauris eget tortor mollis.
            </p>
            <div className="flex flex-row items-center justify-start gap-3 md:gap-4">
              <Link
                href="/timeline"
                className="bg-[#FFB800] text-[#353B00] font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/infak"
                className="bg-[#353B00] text-white font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
              >
                Infak & Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] p-6 flex items-center justify-center">
        <div
          className="max-w-348 mx-auto shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] rounded-[32px] md:rounded-[48px] lg:rounded-[56px] p-6 sm:p-10 md:p-14 text-center"
          style={{
            background:
              "linear-gradient(90deg, #ADCD61 0%, #FFFFFF 50%, #ADCD61 100%)",
            boxShadow: "inset 0px -4px 24px 0px rgba(255,255,255,0.5)",
          }}
        >
          <div className="flex flex-col items-center gap-6 md:gap-10 lg:gap-12">
            <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl lg:text-[56px] font-normal leading-tight">
              Banyak kegiatan yang kami buat, spesial untuk Anda
            </h2>
            <p className="text-[#21272A] font-montserrat text-xs md:text-lg lg:text-xl font-medium leading-normal">
              Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum
              sit nunc in eros scelerisque sed. Commodo in viverra nunc,
              ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis,
              pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo
              eleifend ultricies purus iaculis.
            </p>
            <div className="relative inline-block">
              <Link
                href="/timeline"
                className="inline-flex items-center bg-[#FFC80B] text-[#353B00] font-montserrat text-sm md:text-base lg:text-lg font-bold pl-6 md:pl-10 pr-[3px] py-[3px] rounded-full shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all"
              >
                Jadwal Lengkap
                <div className="ml-4 md:ml-6 w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-white bg-[#9C4299] rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] py-10 sm:py-14 md:py-16 lg:py-20 px-10 md:px-12 lg:px-20">
        <div className="max-w-360 mx-auto">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl lg:text-6xl font-normal mb-6 md:mb-8 lg:mb-12 leading-tight">
              Program Ramadhan, Idul Adha, dan Idul Fitri
            </h2>
            <p className="text-[#21272A] font-montserrat text-xs md:text-lg lg:text-xl font-medium max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16 leading-normal">
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
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-white text-[#8F9F00] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all flex items-center justify-center shadow-md flex-shrink-0"
            >
              <ChevronLeft
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>

            <div className="flex items-center gap-1.5 md:gap-4">
              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[0]! > 1 && (
                  <span className="text-[#21272A] font-montserrat text-xs md:text-xl px-1">
                    ...
                  </span>
                )}

              {getPaginationGroup().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full font-montserrat text-xs sm:text-sm md:text-xl font-semibold transition-all shadow-md ${
                    currentPage === page
                      ? "bg-[#FFC80B] text-[#353B00]"
                      : "bg-white text-[#21272A] hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              {getPaginationGroup().length > 0 &&
                getPaginationGroup()[getPaginationGroup().length - 1]! <
                  totalPages && (
                  <span className="text-[#21272A] font-montserrat text-xs md:text-xl px-1">
                    ...
                  </span>
                )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-white text-[#8F9F00] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all flex items-center justify-center shadow-md flex-shrink-0"
            >
              <ChevronRight
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] px-6 pb-10 pt-8 md:pt-10 md:pb-14 md:px-12 lg:px-20 lg:pt-14 lg:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl font-normal leading-tight mb-6 md:mb-10 lg:mb-12">
            Tahun Lalu di P3RI
          </h2>
          <p className="text-[#21272A] font-montserrat text-xs md:text-lg lg:text-xl font-medium leading-normal px-4">
            Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum
            sit nunc in eros scelerisque sed. Commodo in viverra nunc,
            ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis,
            pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo
            eleifend ultricies purus iaculis.
          </p>
        </div>
      </section>

      <section className="relative bg-[#F7FFD8] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
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
            <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl font-normal text-center mb-8 md:mb-10 lg:mb-12">
              FAQs
            </h2>
          </div>
          <div className="p-6 max-w-225 mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <section className="bg-[#EDEDBC] px-6 md:px-12 lg:px-20 py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-360 mx-auto flex flex-col gap-10 md:gap-14 lg:gap-16">
          <div className="text-center flex flex-col gap-8 md:gap-12 lg:gap-16">
            <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl lg:text-5xl font-normal">
              Sponsor
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"></div>
          </div>

          <div className="text-center flex flex-col gap-8 md:gap-12 lg:gap-16">
            <h2 className="text-[#21272A] font-forum text-4xl md:text-5xl lg:text-5xl font-normal">
              Media Partner
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
