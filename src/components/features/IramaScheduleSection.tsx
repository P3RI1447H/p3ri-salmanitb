"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PROGRAMS_DATA } from "@/lib/constants";

const MONTH_NUM: Record<string, number> = {
  Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4,
  Juni: 5, Juli: 6, Agustus: 7, September: 8, Oktober: 9,
  November: 10, Desember: 11,
};

function parseDate(str: string): Date | null {
  const m = str.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTH_NUM[m[2]!];
  if (month === undefined) return null;
  return new Date(Number(m[3]), month, Number(m[1]));
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function extractField(info: string, field: string): string | null {
  const line = info.split("\n").find((l) => l.startsWith(`${field}:`));
  return line ? line.replace(`${field}:`, "").trim() : null;
}

function extractDayNum(activity: string): string | null {
  const m = activity.match(/Hari ke-(\d+)/);
  return m ? m[1]! : null;
}

const iramaProgram = PROGRAMS_DATA.find((p) => p.slug === "irama");
const sessions = iramaProgram?.details.timeline ?? [];

type Session = (typeof sessions)[number];

export default function IramaScheduleSection() {
  const [todaySession, setTodaySession] = useState<Session | null>(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const key = getDateKey(today);
    const found = sessions.find((s) => {
      const d = parseDate(s.date);
      if (!d) return false;
      d.setHours(0, 0, 0, 0);
      return getDateKey(d) === key;
    });
    setTodaySession(found ?? null);
  }, []);

  if (!todaySession) return null;

  const dayNum = extractDayNum(todaySession.activity);
  const pembicara = extractField(todaySession.info, "Pembicara");
  const topik = extractField(todaySession.info, "Topik");
  const isPlaceholder = !pembicara || pembicara.includes("Segera diumumkan");

  return (
    <section
      aria-labelledby="irama-today-heading"
      className="bg-background-page px-6 py-6 md:px-12 md:py-8 lg:px-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <Link
          href="/program/irama"
          className="group block overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          {/* Header strip */}
          <div className="flex items-center justify-between border-b border-violet-100 bg-violet-500/8 px-5 py-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-violet-500" />
              <p
                id="irama-today-heading"
                className="font-montserrat text-xs font-semibold tracking-wider text-violet-600 uppercase"
              >
                IRAMA Hari Ini
                {dayNum && (
                  <span className="ml-1.5 font-normal opacity-70">
                    · Hari ke-{dayNum}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-montserrat hidden text-xs text-text-muted sm:block">
                16:00 – 17:50 WIB
              </span>
              <ChevronRight
                size={16}
                className="text-text-muted/40 transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:p-5">
            <div className="rounded-xl bg-background-page/70 px-4 py-3">
              <p className="font-montserrat text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                Pembicara
              </p>
              <p className="font-montserrat mt-0.5 text-sm font-bold leading-snug text-text-main">
                {isPlaceholder ? (
                  <span className="italic text-text-gray/50">
                    Akan segera diumumkan
                  </span>
                ) : (
                  pembicara
                )}
              </p>
            </div>
            <div className="rounded-xl bg-background-page/70 px-4 py-3">
              <p className="font-montserrat text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                Topik
              </p>
              <p className="font-montserrat mt-0.5 text-sm font-medium leading-snug text-text-main">
                {isPlaceholder ? (
                  <span className="italic text-text-gray/50">
                    Akan segera diumumkan
                  </span>
                ) : (
                  topik
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
