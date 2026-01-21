import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

interface ProgramCardProps {
  slug: string;
  title: string;
  date_display: string;
  summary: string;
}

const ProgramCard = ({ slug, title, date_display, summary }: ProgramCardProps) => {
  return (
    <Link href={`/program/${slug}`} className="block h-full">
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border-2 border-white hover:border-[#ADCD61] transition-all flex flex-col h-full">
        <h3 className="text-[--color-text-body] font-montserrat text-lg sm:text-xl font-bold mb-2">
          {title}
        </h3>
        
        <p className="text-[--color-text-body] font-montserrat text-sm sm:text-base font-semibold mb-3 sm:mb-4">
          {date_display}
        </p>
        
        <p className="text-[--color-text-body] font-montserrat text-sm sm:text-base font-medium mb-4 sm:mb-6 flex-1">
          {summary}
        </p>
        
        <div className="flex items-center gap-4 text-[#8F9F00] font-montserrat text-sm sm:text-base font-semibold">
          More Info
            <ArrowRight size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;