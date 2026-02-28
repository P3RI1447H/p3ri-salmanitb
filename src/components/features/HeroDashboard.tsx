"use client";

import { useState, useEffect } from "react";
import { Moon } from "lucide-react";

// Ramadhan starts at Maghrib (18:00 WIB) on Feb 18, 2026
const RAMADHAN_START_MAGHRIB = new Date("2026-02-18T18:00:00+07:00").getTime();
const RAMADHAN_END = new Date(2026, 2, 19); // Mar 19, 2026 (30 Ramadhan)

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = RAMADHAN_START_MAGHRIB - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getRamadhanDay(now: Date): number | null {
  if (now.getTime() < RAMADHAN_START_MAGHRIB) return null;
  const end = new Date(RAMADHAN_END);
  end.setHours(23, 59, 59, 999);
  if (now > end) return null;
  const start = new Date(2026, 1, 18);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff + 1;
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

export default function HeroDashboard() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [ramadhanDay, setRamadhanDay] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    setRamadhanDay(getRamadhanDay(new Date()));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setRamadhanDay(getRamadhanDay(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  // During Ramadhan: show a simple badge
  if (ramadhanDay !== null) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/10 px-5 py-2.5 backdrop-blur-md">
        <Moon size={16} className="text-white" />
        <span className="font-montserrat text-white text-xs font-semibold tracking-wider uppercase md:text-sm">
          {ramadhanDay} Ramadhan 1447 H
        </span>
      </div>
    );
  }

  // Before Ramadhan: show countdown
  const tl = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
        <Moon size={14} className="text-accent" />
        <span className="font-montserrat text-accent text-[10px] font-semibold tracking-widest uppercase md:text-xs">
          Menuju Ramadhan 1447 H
        </span>
      </div>
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
    </div>
  );
}
