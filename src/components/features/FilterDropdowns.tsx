'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterDropdownsProps {
  currentProgram: string;
  currentPekan: string;
}

export default function FilterDropdowns({ currentProgram, currentPekan }: FilterDropdownsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Memperbarui URL query string tanpa memicu refresh halaman penuh
  const handleFilterChange = (key: 'program' | 'pekan', value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const programList = ["Tarawih", "IRAMA", "Berbagi"];
  const pekanList = ["Pekan 1", "Pekan 2", "Pekan 3", "Pekan 4"];

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1">
        <label className="font-montserrat text-[11px] font-bold text-text-gray uppercase tracking-wider">Program</label>
        <select
          value={currentProgram}
          onChange={(e) => handleFilterChange('program', e.target.value)}
          className="font-montserrat bg-white border-2 border-primary rounded-xl px-3 py-2 text-sm font-semibold text-foreground cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all hover:shadow-lg"
        >
          {programList.map((prog) => (
            <option key={prog} value={prog}>{prog}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-montserrat text-[11px] font-bold text-text-gray uppercase tracking-wider">Waktu</label>
        <select
          value={currentPekan}
          onChange={(e) => handleFilterChange('pekan', e.target.value)}
          className="font-montserrat bg-white border-2 border-primary rounded-xl px-3 py-2 text-sm font-semibold text-foreground cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all hover:shadow-lg"
        >
          {pekanList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}