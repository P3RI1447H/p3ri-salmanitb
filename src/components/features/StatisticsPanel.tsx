import FilterDropdowns from './FilterDropdowns';
import BarChartComponent from './BarChartComponent';
import { JamaahData } from '@/data/statisticsData';

interface StatisticsPanelProps {
  data: JamaahData[];
  currentProgram: string;
  currentPekan: string;
}

export default function StatisticsPanel({ data, currentProgram, currentPekan }: StatisticsPanelProps) {
  return (
    <div className="w-full max-w-2xl bg-white border border-primary/10 rounded-2xl shadow-lg p-8 space-y-6">
      {/* Bagian Atas Panel: Judul & Filter Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b-2 border-primary pb-4">
        <div className="flex-1">
          <h2 className="text-3xl font-forum text-slate-900">Statistik Data Jama'ah 1447H</h2>
        </div>
        
        {/* Memanggil Komponen Dropdown */}
        <FilterDropdowns currentProgram={currentProgram} currentPekan={currentPekan} />
      </div>

      {/* Area Visualisasi Grafik Bar Chart */}
      <div className="h-80 w-full flex items-center justify-center bg-gradient-to-br from-background-page/30 to-transparent rounded-xl p-4">
        {data.length > 0 ? (
          <BarChartComponent data={data} />
        ) : (
          <div className="text-center py-12">
            <p className="font-montserrat text-base text-text-gray italic">Tidak ada data untuk program ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}