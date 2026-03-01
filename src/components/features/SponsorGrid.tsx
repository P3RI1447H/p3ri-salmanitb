import Image from "next/image";
import { SPONSORS_DATA, MITRA_INFORMASI_DATA } from "@/lib/constants";

function LogoGrid({
  items,
}: {
  items: { id: number; name: string; logo: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex h-20 w-28 items-center justify-center rounded-2xl bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105 md:h-24 md:w-36"
        >
          <Image
            src={item.logo}
            alt={item.name}
            width={120}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function SponsorGrid() {
  return (
    <div className="bg-secondary-foreground mx-4 rounded-3xl px-8 py-10 md:mx-8 md:px-12 md:py-14 lg:mx-16 lg:px-16 lg:py-16">
      {/* Mitra Sponsor */}
      <div className="mb-10 md:mb-14">
        <h2 className="font-forum mb-8 text-center text-3xl font-normal text-secondary md:mb-10 md:text-4xl">
          Sponsored by
        </h2>
        <LogoGrid items={SPONSORS_DATA} />
      </div>

      {/* Divider */}
      <div className="mx-auto mb-10 h-px w-full max-w-2xl bg-white/10 md:mb-14" />

      {/* Mitra Informasi */}
      <div>
        <h2 className="font-forum mb-8 text-center text-3xl font-normal text-secondary md:mb-10 md:text-4xl">
          Supported by
        </h2>
        <LogoGrid items={MITRA_INFORMASI_DATA} />
      </div>
    </div>
  );
}