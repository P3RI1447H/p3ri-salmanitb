"use client";

import { useState, useEffect } from "react";

const RAMADAN_START = new Date("2026-02-18T18:00:00+07:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const now = Date.now();
  const diff = RAMADAN_START - now;

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
    <div className="flex flex-col items-center gap-1.5 md:gap-2">
      <div className="bg-primary/5 flex h-14 w-14 items-center justify-center rounded-xl sm:h-16 sm:w-16 md:h-20 md:w-20 md:rounded-2xl lg:h-24 lg:w-24">
        <span className="font-forum text-primary text-3xl leading-none tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-montserrat text-primary/60 text-[10px] font-medium uppercase tracking-widest md:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function RamadhanCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch — show nothing until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col items-start gap-2 md:gap-3">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-widest text-primary/70 md:text-sm">
          Menuju Ramadhan 1447 H
        </p>
        <div className="flex gap-2 md:gap-3 lg:gap-4">
          {["Hari", "Jam", "Menit", "Detik"].map((label) => (
            <CountdownUnit key={label} value={0} label={label} />
          ))}
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-3xl">🌙</span>
        <p className="font-forum text-2xl text-primary md:text-3xl lg:text-4xl">
          Ramadhan Mubarak!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <p className="font-montserrat text-primary text-xs font-semibold uppercase tracking-widest md:text-sm">
        Menuju Ramadhan 1447 H
      </p>
      <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
        <CountdownUnit value={timeLeft.days} label="Hari" />
        <div className="flex h-14 items-center sm:h-16 md:h-20 lg:h-24">
          <span className="font-forum text-primary/25 text-xl md:text-2xl">
            :
          </span>
        </div>
        <CountdownUnit value={timeLeft.hours} label="Jam" />
        <div className="flex h-14 items-center sm:h-16 md:h-20 lg:h-24">
          <span className="font-forum text-primary/25 text-xl md:text-2xl">
            :
          </span>
        </div>
        <CountdownUnit value={timeLeft.minutes} label="Menit" />
        <div className="flex h-14 items-center sm:h-16 md:h-20 lg:h-24">
          <span className="font-forum text-primary/25 text-xl md:text-2xl">
            :
          </span>
        </div>
        <CountdownUnit value={timeLeft.seconds} label="Detik" />
      </div>
    </div>
  );
}
