import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  slug: string;
  title: string;
  summary: string;
  image?: string;
}

const ProgramCard = ({ slug, title, summary, image }: ProgramCardProps) => {
  return (
    <Link href={`/program/${slug}`} className="block h-full">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-white hover:border-[#8014A6] transition-all flex flex-col h-full overflow-hidden">
        <Image
          src={image || "/images/empty-img.png"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 md:h-48 object-cover"
        />

        <div className="pt-6 px-6 pb-6 flex flex-col flex-1">
          <h3 className="text-[#21272A] font-forum text-2xl md:text-3xl mb-3 line-clamp-2">
            {title}
          </h3>

          <p className="text-[#21272A] font-montserrat text-sm md:text-base font-medium line-clamp-3 md:line-clamp-4">
            {summary}
          </p>

          <div className="flex-1"></div>

          <div className="flex items-center gap-3 text-[#8F9F00] hover:text-[#8014A6] font-montserrat text-sm md:text-base font-semibold transition-colors mt-8">
            Lihat Selengkapnya
            <ArrowRight size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
