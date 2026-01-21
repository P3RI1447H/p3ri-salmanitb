import Image from "next/image";import React from 'react'
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="bg-[#F7FFD8]">
      <section className="relative max-w-360 h-[500px] sm:h-[600px] md:h-[700px] lg:h-[814px] bg-[#91AE4C] rounded-b-[32px] md:rounded-b-[48px] lg:rounded-b-[64px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25),inset_0px_-4px_24px_0px_rgba(255,255,255,0.5)] overflow-hidden">
        <div className="absolute inset-0 rounded-b-[32px] md:rounded-b-[48px] lg:rounded-b-[64px] overflow-hidden">
          <div className="relative w-full h-full lg:w-3/4">
            <Image
              src="/images/hero-bg.png"
              alt="Masjid Salman ITB"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent from-30% to-[#91AE4C]"></div>
          </div>
        </div>

        <div className="relative w-full mx-auto h-full px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-center lg:justify-end py-6 md:py-8">
          <div className="w-150 h-[318px] flex flex-col gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-white font-forum text-3xl sm:text-4xl md:text-5xl lg:text-[72px] font-normal leading-[100%]">
              Ramadhan dan Idul Adha bersama P3RI
            </h1>
            <p className="text-white font-montserrat text-sm sm:text-base md:text-lg font-medium leading-7">
              Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi. Eleifend at ac lacus, ullamcorper mauris eget tortor mollis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
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
    </main>
  )
}

export default HomePage 