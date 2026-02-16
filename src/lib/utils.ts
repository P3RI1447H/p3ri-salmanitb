import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PROGRAMS_DATA } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CalendarEvent {
  programTitle: string;
  programSlug: string;
  activity: string;
  info: string;
  date: Date;
}

const INDONESIAN_MONTHS: Record<string, number> = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

function parseIndonesianDate(dateStr: string): Date | null {
  // Match "18 Februari 2026"
  const match = dateStr.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (!match) return null;
  const [, dayStr, monthStr, yearStr] = match;
  const month = INDONESIAN_MONTHS[monthStr!];
  if (month === undefined) return null;
  return new Date(Number(yearStr), month, Number(dayStr));
}

function parseDateRange(
  dateStr: string,
): { start: Date; end: Date } | null {
  // Match "18 Februari - 27 Februari 2026" or "28 Februari 2026 - 1 Maret 2026"
  const rangeMatch = dateStr.match(
    /^(\d{1,2})\s+(\w+)(?:\s+(\d{4}))?\s*-\s*(\d{1,2})\s+(\w+)\s+(\d{4})$/,
  );
  if (!rangeMatch) return null;

  const [, startDay, startMonth, startYear, endDay, endMonth, endYear] =
    rangeMatch;
  const endMonthNum = INDONESIAN_MONTHS[endMonth!];
  if (endMonthNum === undefined) return null;

  const startMonthNum = INDONESIAN_MONTHS[startMonth!];
  if (startMonthNum === undefined) return null;

  const resolvedStartYear = startYear ? Number(startYear) : Number(endYear);

  return {
    start: new Date(resolvedStartYear, startMonthNum, Number(startDay)),
    end: new Date(Number(endYear), endMonthNum, Number(endDay)),
  };
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getAllCalendarEvents(): Map<string, CalendarEvent[]> {
  const events = new Map<string, CalendarEvent[]>();

  function addEvent(key: string, event: CalendarEvent) {
    const existing = events.get(key);
    if (existing) {
      existing.push(event);
    } else {
      events.set(key, [event]);
    }
  }

  for (const program of PROGRAMS_DATA) {
    for (const item of program.details.timeline) {
      // Strip parenthetical notes like "(Perkiraan)"
      const dateStr = item.date.trim().replace(/\s*\(.*?\)\s*$/, "");

      // Try single date first
      const singleDate = parseIndonesianDate(dateStr);
      if (singleDate) {
        addEvent(formatDateKey(singleDate), {
          programTitle: program.title,
          programSlug: program.slug,
          activity: item.activity,
          info: item.info,
          date: singleDate,
        });
        continue;
      }

      // Try date range
      const range = parseDateRange(dateStr);
      if (range) {
        const current = new Date(range.start);
        while (current <= range.end) {
          addEvent(formatDateKey(current), {
            programTitle: program.title,
            programSlug: program.slug,
            activity: item.activity,
            info: item.info,
            date: new Date(current),
          });
          current.setDate(current.getDate() + 1);
        }
        continue;
      }

      // Skip unparseable dates ("Coming Soon", "Mei 2026", etc.)
    }
  }

  return events;
}
