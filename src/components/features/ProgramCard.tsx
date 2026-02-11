import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

interface ProgramCardProps {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  dateDisplay?: string;
  location?: string;
}

const ProgramCard = ({
  slug,
  title,
  summary,
  image,
  dateDisplay,
  location,
}: ProgramCardProps) => {
  return (
    <Link
      href={`/program/${slug}`}
      className="group block h-full focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-2xl md:rounded-3xl"
      aria-label={`Lihat detail program ${title}`}
    >
      <article className="relative bg-card rounded-2xl md:rounded-3xl shadow-lg border-2 border-white hover:border-brand-purple/40 hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-48 sm:h-44 md:h-52 overflow-hidden">
          <Image
            src={image || "/images/empty-img.png"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Meta info */}
          {(dateDisplay || location) && (
            <div className="mb-3 flex flex-col gap-1.5">
              {dateDisplay && (
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar
                    size={14}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-montserrat text-xs font-semibold leading-tight">
                    {dateDisplay}
                  </span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-text-muted">
                  <MapPin
                    size={14}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-montserrat text-xs font-medium leading-tight">
                    {location}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-card-foreground font-forum text-xl sm:text-2xl md:text-2xl mb-2 line-clamp-2 group-hover:text-brand-purple transition-colors duration-300">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-text-gray font-montserrat text-sm font-medium line-clamp-3 leading-relaxed">
            {summary}
          </p>

          {/* Spacer */}
          <div className="flex-1 min-h-4" />

          {/* CTA */}
          <div className="flex items-center gap-2 text-text-muted group-hover:text-brand-purple font-montserrat text-sm font-semibold transition-all duration-300 mt-4 pt-4 border-t border-border">
            <span>Lihat Selengkapnya</span>
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProgramCard;
