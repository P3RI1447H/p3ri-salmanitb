import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface DonationCardProps {
  title: string;
  summary: string;
  image_url: string;
  link: string;
}

const DonationCard = ({ title, summary, image_url, link }: DonationCardProps) => {
  return (
    <Link href={link} className="block h-full">
      <div className="bg-white rounded-[24px] sm:rounded-[28px] md:rounded-[32px] shadow-lg overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col">
        <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] bg-[#DDE1E6]">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4 md:p-6 flex flex-col flex-1 text-left">
          <h3 className="text-[#21272A] font-montserrat text-base md:text-xl font-bold mb-2 md:mb-4 leading-tight">
            {title}
          </h3>

          <p className="text-[#21272A] font-montserrat text-xs md:text-sm font-medium mb-2 md:mb-4 leading-normal line-clamp-3 opacity-80 flex-1">
            {summary}
          </p>
          
          <div className="flex items-center gap-3 text-[#8F9F00] font-montserrat text-sm md:text-base font-semibold mt-2">
            More Info
            <ArrowRight size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DonationCard;