import ProgramCard from "../../components/features/ProgramCard";
import { PROGRAMS_DATA } from "../../lib/constants";

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-[#F7FFD8] pt-20 pb-26 px-10 md:px-12 lg:pb-24 lg:px-20">
      <div className="max-w-360 mx-auto">
        <h1 className="text-[#353B00] font-forum text-4xl lg:text-[56px] font-normal mb-16 text-center">
          Program P3RI
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 md:gap-16">
          {PROGRAMS_DATA.map((program) => (
            <ProgramCard
              key={program.id}
              slug={program.slug}
              title={program.title}
              summary={program.summary}
            />
          ))}
        </div>
      </div>
    </main>
  );
}