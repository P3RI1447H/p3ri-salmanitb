"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Clock,
    Mic2,
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

    const start = new Date(2026, 1, 18);
    start.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor(
        (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff + 1;
}

function parseTarawihInfo(info: string): {
    imam: string | null;
    penceramah: string | null;
} {
    let imam: string | null = null;
    let penceramah: string | null = null;

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

function parseIramaInfo(info: string): {
    pembicara: string | null;
    topik: string | null;
} {
    const lines = info.split("\n");
    const pLine = lines.find((l) => l.startsWith("Pembicara:"));
    const tLine = lines.find((l) => l.startsWith("Topik:"));
    const pembicara = pLine ? pLine.replace("Pembicara:", "").trim() : null;
    const topik = tLine ? tLine.replace("Topik:", "").trim() : null;
    return { pembicara, topik };
}

// ── Imsakiyah Card ──
function ImsakiyahCard({ ramadhanDay }: { ramadhanDay: number }) {
    const imsakiyah = IMSAKIYAH_DATA.find((e) => e.day === ramadhanDay);
    if (!imsakiyah) return null;

    return (
        <div className="from-primary to-secondary overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl md:p-6">
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
    );
}

// ── Tarawih Card ──
function TarawihCard() {
    const events = useMemo(() => getAllCalendarEvents(), []);
    const todayKey = formatDateKey(new Date());
    const todayEvents = events.get(todayKey) ?? [];
    const tarawihEvent = todayEvents.find((e) => e.programSlug === "tarawih");

    return (
        <Link
            href="/program/tarawih"
            className="border-primary/10 group block overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md md:p-6"
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
    );
}

// ── IRAMA Card ──
function IramaCard() {
    const events = useMemo(() => getAllCalendarEvents(), []);
    const todayKey = formatDateKey(new Date());
    const todayEvents = events.get(todayKey) ?? [];
    const iramaEvent = todayEvents.find((e) => e.programSlug === "irama");

    if (!iramaEvent) return null;

    const { pembicara, topik } = parseIramaInfo(iramaEvent.info);
    const isPlaceholder =
        !pembicara || pembicara.includes("Segera diumumkan");

    return (
        <Link
            href="/program/irama"
            className="border-primary/10 group block overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md md:p-6"
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Mic2 size={16} className="text-primary" />
                    <p className="font-montserrat text-primary text-xs font-semibold tracking-wider uppercase">
                        IRAMA Hari Ini
                    </p>
                </div>
                <ChevronRight
                    size={16}
                    className="text-text-muted/40 transition-transform group-hover:translate-x-0.5"
                />
            </div>

            {isPlaceholder ? (
                <p className="font-montserrat text-text-muted py-2 text-center text-sm italic">
                    Pembicara & topik akan segera diumumkan.
                </p>
            ) : (
                <div className="space-y-3">
                    {pembicara && (
                        <div className="bg-background-page/70 rounded-xl px-3.5 py-3">
                            <p className="font-montserrat text-text-muted text-[10px] font-semibold tracking-wider uppercase">
                                Pembicara
                            </p>
                            <p className="font-montserrat text-text-main mt-0.5 text-sm font-bold md:text-base">
                                {pembicara}
                            </p>
                        </div>
                    )}
                    {topik && (
                        <div className="bg-background-page/70 rounded-xl px-3.5 py-3">
                            <p className="font-montserrat text-text-muted text-[10px] font-semibold tracking-wider uppercase">
                                Topik
                            </p>
                            <p className="font-montserrat text-text-main mt-0.5 text-sm font-bold md:text-base">
                                {topik}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </Link>
    );
}

// ── Main Section Export ──
export default function RamadhanInfoSection() {
    const [mounted, setMounted] = useState(false);
    const [ramadhanDay, setRamadhanDay] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
        setRamadhanDay(getRamadhanDay(new Date()));
    }, []);

    if (!mounted) {
        return (
            <section className="bg-background-section px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-16">
                <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 animate-pulse rounded-2xl bg-primary/10" />
                    ))}
                </div>
            </section>
        );
    }

    // If Ramadhan hasn't started yet, don't show this section
    if (ramadhanDay === null) return null;

    return (
        <section
            aria-labelledby="ramadhan-info-heading"
            className="bg-background-section px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-16"
        >
            <div className="mx-auto max-w-[1440px]">
                <h2
                    id="ramadhan-info-heading"
                    className="font-forum text-foreground mb-6 text-center text-3xl font-normal md:mb-8 md:text-4xl lg:text-5xl"
                >
                    Hari Ini di Salman
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <ImsakiyahCard ramadhanDay={ramadhanDay} />
                    <TarawihCard />
                    <IramaCard />
                </div>
            </div>
        </section>
    );
}
