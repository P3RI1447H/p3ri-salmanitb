"use client";

import { useState, useEffect } from "react";

// Target: Idul Adha 1447 H (Estimasi 27 Mei 2026)
// Menggunakan ISO String agar aman dari perbedaan pembacaan bulan di JS
const ADHA_TARGET = new Date("2026-05-27T00:00:00+07:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const now = Date.now();
  const diff = ADHA_TARGET - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm sm:h-14 sm:w-14 md:h-16 md:w-16">
        <span className="font-forum text-2xl leading-none tabular-nums text-white sm:text-3xl md:text-4xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-montserrat text-[9px] font-medium tracking-widest text-white/60 uppercase md:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export default function AdhaCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const tl = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex items-start gap-2 md:gap-3">
      <CountdownUnit value={tl.days} label="Hari" />
      <div className="flex h-12 items-center sm:h-14 md:h-16">
        <span className="font-forum text-lg text-white/30 md:text-xl">:</span>
      </div>
      <CountdownUnit value={tl.hours} label="Jam" />
      <div className="flex h-12 items-center sm:h-14 md:h-16">
        <span className="font-forum text-lg text-white/30 md:text-xl">:</span>
      </div>
      <CountdownUnit value={tl.minutes} label="Menit" />
      <div className="flex h-12 items-center sm:h-14 md:h-16">
        <span className="font-forum text-lg text-white/30 md:text-xl">:</span>
      </div>
      <CountdownUnit value={tl.seconds} label="Detik" />
    </div>
  );
}