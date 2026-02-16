"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Moon, Sun } from "lucide-react";
import { cn, getAllCalendarEvents, type CalendarEvent } from "@/lib/utils";
import { PROGRAMS_DATA } from "@/lib/constants";

const DAY_NAMES = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const GREGORIAN_MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Hijriyah-Gregorian mapping for 1447 H
// 1 Ramadhan 1447 H = 18 Februari 2026
// 1 Dzulhijjah 1447 H = 18 Mei 2026

interface HijriDay {
  hijriDay: number;
  gregorianDate: Date;
  dateKey: string;
}

interface Period {
  id: string;
  label: string;
  hijriMonth: string;
  hijriYear: string;
  icon: typeof Moon;
  days: HijriDay[];
}

function buildPeriodDays(
  startGregorian: Date,
  totalDays: number,
): HijriDay[] {
  const days: HijriDay[] = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startGregorian);
    d.setDate(d.getDate() + i);
    days.push({
      hijriDay: i + 1,
      gregorianDate: d,
      dateKey: formatDateKey(d),
    });
  }
  return days;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDayOfWeekMondayBased(date: Date): number {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

// Ramadhan 1447 H: 30 days, 1 Ramadhan = Feb 18, 2026
const RAMADHAN_PERIOD: Period = {
  id: "ramadhan",
  label: "Ramadhan",
  hijriMonth: "Ramadhan",
  hijriYear: "1447 H",
  icon: Moon,
  days: buildPeriodDays(new Date(2026, 1, 18), 30),
};

// Dzulhijjah 1447 H: show 1-15 Dzulhijjah for Adha coverage
// 1 Dzulhijjah = May 18, 2026, 10 Dzulhijjah (Idul Adha) = May 27
const ADHA_PERIOD: Period = {
  id: "adha",
  label: "Idul Adha",
  hijriMonth: "Dzulhijjah",
  hijriYear: "1447 H",
  icon: Sun,
  days: buildPeriodDays(new Date(2026, 4, 18), 15),
};

const PERIODS = [RAMADHAN_PERIOD, ADHA_PERIOD];

const PROGRAM_COLORS: Record<string, string> = {
  "tarhib-ramadan": "bg-amber-500",
  "p3ri-competition": "bg-rose-500",
  irama: "bg-violet-500",
  "semarak-ramadan": "bg-cyan-500",
  tarawih: "bg-emerald-500",
  itikaf: "bg-blue-500",
  "para-pejuang-alquran": "bg-teal-500",
  eid: "bg-pink-500",
  "ramadan-daycare": "bg-orange-500",
  "berbagi-buka": "bg-lime-500",
  "community-impact": "bg-indigo-500",
  "berbagi-sahur": "bg-yellow-500",
  "festival-adha": "bg-red-500",
  satisfy: "bg-fuchsia-500",
  qurban: "bg-sky-500",
};

const PROGRAM_COLORS_RING: Record<string, string> = {
  "tarhib-ramadan": "border-amber-500",
  "p3ri-competition": "border-rose-500",
  irama: "border-violet-500",
  "semarak-ramadan": "border-cyan-500",
  tarawih: "border-emerald-500",
  itikaf: "border-blue-500",
  "para-pejuang-alquran": "border-teal-500",
  eid: "border-pink-500",
  "ramadan-daycare": "border-orange-500",
  "berbagi-buka": "border-lime-500",
  "community-impact": "border-indigo-500",
  "berbagi-sahur": "border-yellow-500",
  "festival-adha": "border-red-500",
  satisfy: "border-fuchsia-500",
  qurban: "border-sky-500",
};

const PROGRAMS_NAME_MAP: Record<string, string> = Object.fromEntries(
  PROGRAMS_DATA.map((p) => [p.slug, p.title]),
);

function getUniquePrograms(events: CalendarEvent[]): string[] {
  const seen = new Set<string>();
  return events.reduce<string[]>((acc, e) => {
    if (!seen.has(e.programSlug)) {
      seen.add(e.programSlug);
      acc.push(e.programSlug);
    }
    return acc;
  }, []);
}

export default function CalendarView() {
  const [activePeriod, setActivePeriod] = useState("ramadhan");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const events = useMemo(() => getAllCalendarEvents(), []);
  const today = useMemo(() => formatDateKey(new Date()), []);

  const period = PERIODS.find((p) => p.id === activePeriod) ?? RAMADHAN_PERIOD;
  const selectedEvents = selectedDate ? (events.get(selectedDate) ?? []) : [];

  // Build grid: pad start with empty cells to align with day-of-week
  const firstDayOffset = getDayOfWeekMondayBased(
    period.days[0]!.gregorianDate,
  );
  const cells: (HijriDay | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) {
    cells.push(null);
  }
  for (const day of period.days) {
    cells.push(day);
  }

  // Find selected hijri day for heading
  const selectedHijri = selectedDate
    ? period.days.find((d) => d.dateKey === selectedDate)
    : null;

  // Collect active programs for legend (only those with events in this period)
  const periodDateKeys = new Set(period.days.map((d) => d.dateKey));
  const activeProgramSlugs = new Set<string>();
  for (const [key, dayEvents] of events) {
    if (periodDateKeys.has(key)) {
      for (const e of dayEvents) {
        activeProgramSlugs.add(e.programSlug);
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Period Tabs */}
      <div className="mb-6 flex items-center justify-center gap-3">
        {PERIODS.map((p) => {
          const Icon = p.icon;
          const isActive = p.id === activePeriod;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActivePeriod(p.id);
                setSelectedDate(null);
              }}
              className={cn(
                "font-montserrat inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white text-primary hover:bg-primary/10",
              )}
            >
              <Icon size={16} />
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Period Header */}
      <div className="mb-6 text-center">
        <h2 className="font-forum text-2xl text-primary md:text-3xl">
          {period.hijriMonth} {period.hijriYear}
        </h2>
        <p className="font-montserrat mt-1 text-sm text-text-muted">
          {period.days[0]!.gregorianDate.getDate()}{" "}
          {GREGORIAN_MONTH_NAMES[period.days[0]!.gregorianDate.getMonth()]}
          {" \u2013 "}
          {period.days[period.days.length - 1]!.gregorianDate.getDate()}{" "}
          {
            GREGORIAN_MONTH_NAMES[
              period.days[period.days.length - 1]!.gregorianDate.getMonth()
            ]
          }{" "}
          {period.days[period.days.length - 1]!.gregorianDate.getFullYear()}
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-primary/10 bg-primary/5">
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="font-montserrat py-3 text-center text-xs font-semibold tracking-wider text-primary/70 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            if (cell === null) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }

            const dayEvents = events.get(cell.dateKey);
            const hasEvents = !!dayEvents && dayEvents.length > 0;
            const isToday = cell.dateKey === today;
            const isSelected = cell.dateKey === selectedDate;
            const uniquePrograms = hasEvents
              ? getUniquePrograms(dayEvents)
              : [];

            const gDate = cell.gregorianDate;
            const gDay = gDate.getDate();
            const gMonth = GREGORIAN_MONTH_NAMES[gDate.getMonth()]!.slice(
              0,
              3,
            );

            return (
              <button
                key={cell.dateKey}
                onClick={() =>
                  setSelectedDate(isSelected ? null : cell.dateKey)
                }
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-center gap-0.5 border-b border-r border-primary/5 transition-colors",
                  "min-h-[44px] min-w-[44px]",
                  hasEvents && "cursor-pointer hover:bg-accent/10",
                  !hasEvents && "cursor-default",
                  isSelected && "bg-accent/20",
                  isToday && !isSelected && "bg-primary/5",
                )}
                aria-label={`${cell.hijriDay} ${period.hijriMonth} / ${gDay} ${gMonth}${hasEvents ? `, ${dayEvents.length} kegiatan` : ""}`}
              >
                {/* Hijriyah day (prominent) */}
                <span
                  className={cn(
                    "font-montserrat text-sm font-bold leading-none md:text-base",
                    isToday &&
                      "flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground md:h-8 md:w-8",
                    !isToday && hasEvents && "text-primary",
                    !isToday && !hasEvents && "text-text-main/40",
                  )}
                >
                  {cell.hijriDay}
                </span>

                {/* Gregorian date (small) */}
                <span
                  className={cn(
                    "font-montserrat text-[9px] leading-none md:text-[10px]",
                    hasEvents ? "text-text-muted" : "text-text-main/25",
                  )}
                >
                  {gDay} {gMonth}
                </span>

                {/* Event dots */}
                {hasEvents && (
                  <div className="flex items-center gap-0.5">
                    {uniquePrograms.slice(0, 3).map((slug) => (
                      <div
                        key={slug}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          PROGRAM_COLORS[slug] ?? "bg-primary",
                        )}
                      />
                    ))}
                    {uniquePrograms.length > 3 && (
                      <span className="font-montserrat text-[8px] font-bold text-text-muted">
                        +{uniquePrograms.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Panel */}
      {selectedDate && selectedHijri && (
        <div className="mt-6">
          <h3 className="font-forum mb-4 text-xl text-primary md:text-2xl">
            {selectedHijri.hijriDay} {period.hijriMonth} {period.hijriYear}
            <span className="font-montserrat ml-2 text-sm font-medium text-text-muted">
              ({selectedHijri.gregorianDate.getDate()}{" "}
              {
                GREGORIAN_MONTH_NAMES[
                  selectedHijri.gregorianDate.getMonth()
                ]
              }{" "}
              {selectedHijri.gregorianDate.getFullYear()})
            </span>
          </h3>

          {selectedEvents.length === 0 ? (
            <p className="font-montserrat text-sm text-text-muted">
              Tidak ada kegiatan pada tanggal ini.
            </p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((event, i) => (
                <Link
                  key={`${event.programSlug}-${i}`}
                  href={`/program/${event.programSlug}`}
                  className={cn(
                    "group block rounded-xl border-l-4 bg-white p-4 shadow-sm transition-all hover:shadow-md",
                    PROGRAM_COLORS_RING[event.programSlug] ??
                      "border-primary",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-montserrat mb-1 text-xs font-semibold tracking-wider text-text-muted uppercase">
                        {event.programTitle}
                      </p>
                      <p className="font-montserrat text-sm font-bold text-text-main md:text-base">
                        {event.activity}
                      </p>
                      {event.info && (
                        <p className="font-montserrat mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-text-main/70 md:text-sm">
                          <MapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-text-muted"
                          />
                          <span className="whitespace-pre-line">
                            {event.info}
                          </span>
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={18}
                      className="mt-1 shrink-0 text-text-muted/50 transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      {activeProgramSlugs.size > 0 && (
        <div className="mt-8 rounded-xl bg-white p-4 shadow-sm">
          <p className="font-montserrat mb-3 text-xs font-semibold tracking-wider text-text-muted uppercase">
            Keterangan Warna
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.entries(PROGRAM_COLORS)
              .filter(([slug]) => activeProgramSlugs.has(slug))
              .map(([slug, colorClass]) => (
                <div key={slug} className="flex items-center gap-1.5">
                  <div
                    className={cn("h-2.5 w-2.5 rounded-full", colorClass)}
                  />
                  <span className="font-montserrat text-xs text-text-main/70">
                    {PROGRAMS_NAME_MAP[slug]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
