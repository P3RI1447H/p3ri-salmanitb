import ProgramCard from "../../components/features/ProgramCard";
import { PROGRAMS_DATA } from "../../lib/constants";

const ProgramPage = () => {
  return (
      <main className="min-h-screen bg-[#F7FFD8] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-360 mx-auto">
        <h1 className="text-[#353B00] font-forum text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-normal mb-8 md:mb-10 lg:mb-12 text-center">
          Program P3RI
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {PROGRAMS_DATA.map((program) => (
            <ProgramCard
              key={program.id}
              slug={program.slug}
              title={program.title}
              date_display={program.date_display}
              summary={program.summary}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProgramPage