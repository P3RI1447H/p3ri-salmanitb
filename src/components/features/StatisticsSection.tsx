import StatisticsPanel from "@/components/features/StatisticsPanel";
import { statisticsData } from "@/data/statisticsData";

interface StatisticsPageProps {
  searchParams?: Promise<{ program?: string; pekan?: string }>;
}

export async function StatisticsSection({ 
  searchParams 
}: StatisticsPageProps = {}) {
  // Jika searchParams tidak ada, gunakan default values
  const params = searchParams ? await searchParams : {};
  
  const selectedProgram = params.program || "Tarawih";
  const selectedPekan = params.pekan || "Pekan 1";

  // Proses filtering data secara penuh di sisi server
  const filteredData = statisticsData.filter(
    (item) => item.program === selectedProgram && item.pekan === selectedPekan
  );

  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center py-4">
      <StatisticsPanel
        data={filteredData}
        currentProgram={selectedProgram}
        currentPekan={selectedPekan}
      />
    </div>
  );
}