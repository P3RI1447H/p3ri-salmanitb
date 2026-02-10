"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "../../lib/constants";

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-360 flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 py-8 md:py-10">
      
      <div className="text-center">
        <h2 className="text-[#21272A] font-forum text-3xl md:text-4xl lg:text-[56px] font-normal">
          Dokumentasi
        </h2>
      </div>

      <div className="relative w-full flex items-center justify-center min-h-[200px] sm:min-h-[280px] md:min-h-[350px] lg:min-h-[420px] px-12 sm:px-16 md:px-20">

        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 md:left-6 z-30 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#9C4299] rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} color="white" strokeWidth={2.5} />
        </button>

        <div className="relative w-full max-w-[250px] h-[220px] md:max-w-[450px] md:h-[350px] lg:max-w-[750px] lg:h-[440px] bg-[#E5E5E5] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] z-10">
          <div className="absolute inset-0 p-1">
            <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden">
              <Image
                src={GALLERY_IMAGES[currentIndex].src}
                alt={GALLERY_IMAGES[currentIndex].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 md:right-6 z-30 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#9C4299] rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} color="white" strokeWidth={2.5} />
        </button>

      </div>

      <div className="flex gap-2 md:gap-3">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#21272A] w-5 md:w-8"
                : "bg-[#21272A] opacity-30 w-2 md:w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}