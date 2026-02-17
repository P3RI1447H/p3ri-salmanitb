"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Moon,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { getAllCalendarEvents } from "@/lib/utils";
import { IMSAKIYAH_DATA } from "@/lib/constants";

// Ramadhan starts at Maghrib (18:00 WIB) on Feb 18, 2026
const RAMADHAN_START_MAGHRIB = new Date("2026-02-18T18:00:00+07:00").getTime();
const RAMADHAN_END = new Date(2026, 2, 19); // Mar 19, 2026 (30 Ramadhan)

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getRamadhanDay(now: Date): number | null {
  if (now.getTime() < RAMADHAN_START_MAGHRIB) return null;

  const end = new Date(RAMADHAN_END);
  end.setHours(23, 59, 59, 999);
  if (now > end) return null;

  // Day 1 starts at maghrib Feb 18 — use calendar date Feb 18 as base
  const start = new Date(2026, 1, 18);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff + 1;
}

// ── Countdown (before Ramadhan) ──

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

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 sm:h-20 sm:w-20 md:h-24 md:w-24 md:rounded-2xl">
        <span className="font-forum text-4xl leading-none tabular-nums text-white sm:text-5xl md:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-montserrat text-[10px] font-medium tracking-widest text-white/60 uppercase md:text-xs">
        {label}
      </span>
    </div>
  );
}

function CountdownView() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tl = mounted ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="bg-primary flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl p-6 md:gap-8 md:rounded-3xl md:p-10">
      <div className="text-center">
        <Moon size={28} className="text-accent mx-auto mb-2" />
        <p className="font-montserrat text-accent text-xs font-semibold tracking-widest uppercase md:text-sm">
          Menuju Ramadhan 1447 H
        </p>
      </div>

      {tl && (
        <div className="flex items-start gap-3 md:gap-4">
          <CountdownUnit value={tl.days} label="Hari" />
          <div className="flex h-16 items-center sm:h-20 md:h-24">
            <span className="font-forum text-xl text-white/30 md:text-2xl">:</span>
          </div>
          <CountdownUnit value={tl.hours} label="Jam" />
          <div className="flex h-16 items-center sm:h-20 md:h-24">
            <span className="font-forum text-xl text-white/30 md:text-2xl">:</span>
          </div>
          <CountdownUnit value={tl.minutes} label="Menit" />
          <div className="flex h-16 items-center sm:h-20 md:h-24">
            <span className="font-forum text-xl text-white/30 md:text-2xl">:</span>
          </div>
          <CountdownUnit value={tl.seconds} label="Detik" />
        </div>
      )}

      <p className="font-montserrat text-xs text-white/40 md:text-sm">
        18 Februari 2026 &middot; 18:00 WIB
      </p>
    </div>
  );
}

// ── Ramadhan Dashboard (during Ramadhan) ──

function parseTarawihInfo(info: string): {
  imam: string | null;
  penceramah: string | null;
} {
  let imam: string | null = null;
  let penceramah: string | null = null;

  // Handle "Imam & Penceramah: ..." format
  const combined = info.match(/Imam\s*&\s*Penceramah:\s*(.+)/);
  if (combined) {
    const name = combined[1]!.trim();
    return { imam: name, penceramah: name };
  }

  const imamMatch = info.match(/Imam:\s*(.+)/);
  if (imamMatch) imam = imamMatch[1]!.trim();

  const penceramahMatch = info.match(/Penceramah:\s*(.+)/);
  if (penceramahMatch) penceramah = penceramahMatch[1]!.trim();

  return { imam, penceramah };
}

function RamadhanDashboard({ ramadhanDay }: { ramadhanDay: number }) {
  const events = useMemo(() => getAllCalendarEvents(), []);
  const todayKey = formatDateKey(new Date());
  const todayEvents = events.get(todayKey) ?? [];
  const tarawihEvent = todayEvents.find((e) => e.programSlug === "tarawih");
  const imsakiyah = IMSAKIYAH_DATA.find((e) => e.day === ramadhanDay);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* Imsakiyah Card */}
      {imsakiyah && (
        <div className="from-primary to-secondary overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-xl md:p-5">
          <div className="relative">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <p className="font-montserrat text-accent text-xs font-semibold tracking-wider uppercase">
                  Imsakiyah Bandung
                </p>
              </div>
              <p className="font-montserrat text-xs font-medium text-white/60">
                {ramadhanDay} Ramadhan
              </p>
            </div>

            {/* Imsak & Maghrib */}
            <div className="mb-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 px-3 py-3 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1.5">
                  <Moon size={14} className="text-accent" />
                  <p className="font-montserrat text-[10px] font-medium tracking-wider text-white/70 uppercase">
                    Imsak
                  </p>
                </div>
                <p className="font-montserrat mt-1 text-2xl font-bold text-white">
                  {imsakiyah.imsak}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-3 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1.5">
                  <Sunset size={14} className="text-accent" />
                  <p className="font-montserrat text-[10px] font-medium tracking-wider text-white/70 uppercase">
                    Maghrib
                  </p>
                </div>
                <p className="font-montserrat mt-1 text-2xl font-bold text-white">
                  {imsakiyah.maghrib}
                </p>
              </div>
            </div>

            {/* Other prayer times */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { label: "Subuh", time: imsakiyah.subuh, icon: Moon },
                { label: "Terbit", time: imsakiyah.terbit, icon: Sunrise },
                { label: "Dzuhur", time: imsakiyah.dzuhur, icon: Sun },
                { label: "Ashar", time: imsakiyah.ashar, icon: Sun },
                { label: "Isya", time: imsakiyah.isya, icon: Moon },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-white/5 px-1 py-2 text-center"
                >
                  <p className="font-montserrat text-[9px] font-medium tracking-wider text-white/50 uppercase">
                    {item.label}
                  </p>
                  <p className="font-montserrat mt-0.5 text-xs font-bold text-white/90">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tarawih Tonight */}
      <Link
        href="/program/tarawih"
        className="border-primary/10 group block flex-1 overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md md:p-5"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-primary" />
            <p className="font-montserrat text-primary text-xs font-semibold tracking-wider uppercase">
              Tarawih Malam Ini
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-text-muted/40 transition-transform group-hover:translate-x-0.5"
          />
        </div>

        {tarawihEvent ? (
          (() => {
            const { imam, penceramah } = parseTarawihInfo(tarawihEvent.info);
            return (
              <div className="space-y-3">
                {imam && (
                  <div className="bg-background-page/70 rounded-xl px-3.5 py-3">
                    <p className="font-montserrat text-text-muted text-[10px] font-semibold tracking-wider uppercase">
                      Imam
                    </p>
                    <p className="font-montserrat text-text-main mt-0.5 text-sm font-bold md:text-base">
                      {imam}
                    </p>
                  </div>
                )}
                {penceramah && (
                  <div className="bg-background-page/70 rounded-xl px-3.5 py-3">
                    <p className="font-montserrat text-text-muted text-[10px] font-semibold tracking-wider uppercase">
                      Penceramah
                    </p>
                    <p className="font-montserrat text-text-main mt-0.5 text-sm font-bold md:text-base">
                      {penceramah}
                    </p>
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <p className="font-montserrat text-text-muted py-4 text-center text-sm">
            Belum ada jadwal tarawih untuk malam ini.
          </p>
        )}
      </Link>
    </div>
  );
}

// ── Main Export ──

export default function HeroDashboard() {
  const [mounted, setMounted] = useState(false);
  const [ramadhanDay, setRamadhanDay] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setRamadhanDay(getRamadhanDay(new Date()));
  }, []);

  if (!mounted) {
    // SSR/hydration placeholder
    return (
      <div className="from-primary to-secondary flex h-full w-full items-center justify-center rounded-3xl bg-gradient-to-br p-10">
        <Moon size={48} className="text-accent animate-pulse" />
      </div>
    );
  }

  if (ramadhanDay !== null) {
    return <RamadhanDashboard ramadhanDay={ramadhanDay} />;
  }

  return <CountdownView />;
}
