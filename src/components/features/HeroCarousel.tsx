"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const HERO_IMAGES = [
    {
        src: "/images/hero-salman.jpg",
        alt: "Suasana ceramah jamaah di Masjid Salman ITB",
    },
    {
        src: "/images/hero-salman-2.jpg",
        alt: "Jamaah sholat berjamaah di Masjid Salman ITB",
    },
    {
        src: "/images/hero-salman-3.jpg",
        alt: "Kegiatan IRAMA - Inspirasi Ramadhan di Salman ITB",
    },
    {
        src: "/images/hero-salman-4.jpg",
        alt: "Jamaah sholat berjamaah di Masjid Salman ITB",
    },
];

const INTERVAL_MS = 5000; // 5‑second auto-rotate

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (index === current || isTransitioning) return;
            setIsTransitioning(true);
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 700);
        },
        [current, isTransitioning],
    );

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="relative h-full w-full overflow-hidden"
            style={{
                WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%)",
                maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%)",
                WebkitMaskComposite: "destination-in",
                maskComposite: "intersect",
            }}
        >
            {/* Images */}
            {HERO_IMAGES.map((img, i) => (
                <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className={`object-cover object-center transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            {/* Indicator dots */}
            <div className="absolute bottom-6 left-1/4 z-20 flex items-center gap-2">
                {HERO_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Foto ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current
                            ? "w-6 bg-white"
                            : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
