"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PROGRAMS_DATA } from "../../../lib/constants";

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { slug } = use(params);
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const images = program.images || [
    "/images/empty-img.png",
    "/images/empty-img.png",
    "/images/empty-img.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getPrevIndex = () =>
    (currentImageIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (currentImageIndex + 1) % images.length;

  return (
    <main className="bg-background-page min-h-screen">
      <section className="w-full px-6 md:px-20 pt-20 lg:pt-20 pb-10 md:pb-20 flex flex-col items-center">
        <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-center leading-tight mb-[50px]">
          {program.title}
        </h1>

        <div className="relative w-full flex items-center justify-center gap-4 md:gap-10">
          <div
            className="hidden md:block w-[20%] lg:w-72 aspect-[4/3] bg-card rounded-[20px] border border-neutral-300 overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-500"
            onClick={() => goToSlide(getPrevIndex())}
          >
            <Image
              src={images[getPrevIndex()] ?? "/images/empty-img.png"}
              alt="prev"
              width={300}
              height={230}
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          <div className="w-full max-w-[90%] md:w-[50%] lg:w-[550px] aspect-video md:aspect-[4/3] bg-card rounded-[20px] border border-neutral-300 overflow-hidden relative shadow-lg">
            <Image
              src={images[currentImageIndex] ?? "/images/empty-img.png"}
              alt="main"
              fill
              className="object-cover transition-all duration-500"
              key={currentImageIndex}
            />
          </div>

          <div
            className="hidden md:block w-[20%] lg:w-72 aspect-[4/3] bg-card rounded-[20px] border border-neutral-300 overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-500"
            onClick={() => goToSlide(getNextIndex())}
          >
            <Image
              src={images[getNextIndex()] ?? "/images/empty-img.png"}
              alt="next"
              width={300}
              height={230}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        <div className="mt-12 md:mt-20">
          <Link
            href="#detailtimeline"
            className="bg-secondary text-white font-montserrat text-sm md:text-base lg:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
          >
            Lihat Timeline
          </Link>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-text-highlight via-white to-text-highlight p-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-secondary text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-forum mb-6 md:mb-10">
            Deskripsi Program
          </h2>
          <p className="text-secondary text-sm sm:text-base md:text-lg lg:text-xl font-medium font-montserrat max-w-4xl mx-auto leading-relaxed">
            {program.details.description}
          </p>
        </div>
      </section>

      <section
        id="detailtimeline"
        className="w-full px-6 md:px-20 pt-12 md:pt-20 flex flex-col items-center scroll-mt-20"
      >
        <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum mb-12">
          Timeline
        </h2>

        <div className="w-fit mb-16">
          <div className="px-10 py-4 md:px-14 bg-primary rounded-2xl shadow-md flex justify-center items-center gap-5">
            <MapPin size={32} className="text-white flex-shrink-0" />
            <div className="text-status-warning text-base sm:text-lg md:text-xl font-semibold font-montserrat text-center whitespace-nowrap">
              {program.location}
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto relative pb-20">
          {program.details.timeline.length === 1 ? (
            <div className="flex flex-col items-center gap-8">
              <div className="h-12 px-8 bg-gradient-to-r from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold font-montserrat">
                  {program.details.timeline[0]!.date}
                </span>
              </div>
              <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl text-center">
                <h3 className="text-brand-purple text-xl font-bold mb-2 font-montserrat">
                  {program.details.timeline[0]!.activity}
                </h3>
                <p className="text-brand-purple font-semibold text-sm mb-4">
                  {program.details.timeline[0]!.time}
                </p>
                <p className="text-text-gray font-medium font-montserrat">
                  {program.details.timeline[0]!.info}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="absolute left-6 md:left-1/2 top-20 md:-translate-x-1/2 z-0 w-[2px] bg-destructive"
                style={{
                  bottom: "10rem",
                }}
              />

              <div className="flex flex-col gap-20 relative z-10">
                {program.details.timeline.map((item, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={`flex items-start md:items-center w-full flex-row md:${isEven ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className="md:hidden flex flex-col items-center relative mr-8">
                        <div className="w-8 h-8 rounded-full bg-brand-purple-dark z-20 ring-8 ring-background-page" />
                        <div
                          className="absolute left-[calc(100%+8px)] top-1/2 h-[2px] w-10"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(to right, var(--color-brand-purple) 0, var(--color-brand-purple) 6px, transparent 6px, transparent 12px)",
                          }}
                        />
                      </div>

                      <div
                        className={`flex flex-col gap-4 w-full md:w-[42%] md:${isEven ? "items-start" : "items-end"}`}
                      >
                        <div className="h-10 px-6 bg-gradient-to-r from-brand-purple to-brand-purple-dark rounded-full flex items-center w-fit shadow-sm">
                          <span className="text-white text-sm font-bold font-montserrat">
                            {item.date}
                          </span>
                        </div>

                        <div className="bg-card rounded-2xl p-6 shadow-xl w-full border border-white/20">
                          <h3 className="text-brand-purple text-lg md:text-xl font-bold font-montserrat">
                            {item.activity}
                          </h3>
                          <p className="text-brand-purple font-semibold text-xs md:text-sm mb-3">
                            {item.time}
                          </p>
                          <p className="text-text-gray text-xs md:text-sm font-medium leading-relaxed font-montserrat">
                            {item.info}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:flex w-[16%] justify-center items-center relative">
                        <div
                          className={`absolute top-1/2 h-[2px] w-16 ${isEven ? "right-[calc(50%+16px)]" : "left-[calc(50%+16px)]"}`}
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(to right, var(--color-brand-purple) 0, var(--color-brand-purple) 6px, transparent 6px, transparent 12px)",
                          }}
                        />

                        <div className="w-8 h-8 rounded-full bg-brand-purple-dark z-20 ring-8 ring-background-page" />
                      </div>

                      <div className="hidden md:block md:w-[42%]" />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="w-full flex justify-center pt-10 pb-24">
          <div className="relative group">
            <Link
              href={program.registration_url}
              target="_blank"
              className="relative h-14 px-10 py-4 bg-accent group-hover:bg-brand-purple rounded-full flex items-center shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all duration-300 border-2 border-accent group-hover:border-brand-purple"
            >
              <div className="absolute left-[2px] top-[2px] group-hover:left-auto group-hover:right-[2px] w-12 h-12 bg-brand-purple group-hover:bg-hero-bg rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
                <ArrowRight size={24} className="text-white" />
              </div>

              <span className="text-accent-foreground group-hover:text-white text-lg md:text-xl font-semibold font-montserrat pl-12 group-hover:pl-0 group-hover:pr-12 transition-all duration-300">
                Daftar Sekarang
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
