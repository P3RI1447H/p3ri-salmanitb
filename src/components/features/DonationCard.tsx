import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface DonationCardProps {
  title: string;
  summary: string;
  image_url: string;
  link: string;
}

const DonationCard = ({ title, summary, image_url, link }: DonationCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label={`${title} — buka di tab baru`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
        <div className="relative h-44 w-full bg-gray-100 md:h-52">
          <Image
            src={image_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-montserrat text-base font-bold leading-tight text-card-foreground md:text-lg">
            {title}
          </h3>

          <p className="mt-2 line-clamp-3 font-montserrat text-sm font-medium leading-relaxed text-text-gray">
            {summary}
          </p>

          <div className="mt-auto flex items-center gap-1.5 pt-4 font-montserrat text-sm font-semibold text-primary transition-colors group-hover:text-secondary">
            <span>Selengkapnya</span>
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </a>
  );
};

export default DonationCard;
