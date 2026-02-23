import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROGRAMS_DATA } from "../../../lib/constants";
import ProgramDetailClient from "./ProgramDetailClient";
import JsonLd from "../../../components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const INDONESIAN_MONTHS: Record<string, string> = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

function parseIndonesianDate(dateStr: string): string | undefined {
  const parts = dateStr.trim().split(" ");
  if (parts.length !== 3) return undefined;
  const [day, monthName, year] = parts;
  const month = monthName ? INDONESIAN_MONTHS[monthName] : undefined;
  if (!month || !day || !year) return undefined;
  return `${year}-${month}-${String(parseInt(day)).padStart(2, "0")}`;
}

export async function generateStaticParams() {
  return PROGRAMS_DATA.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);
  if (!program) return { title: "Program Tidak Ditemukan" };

  return {
    title: program.title,
    description: program.details.description,
    alternates: {
      canonical: `/program/${slug}`,
    },
    openGraph: {
      title: `${program.title} — P3RI Salman ITB`,
      description: program.details.description,
      url: `/program/${slug}`,
    },
    twitter: {
      title: `${program.title} — P3RI Salman ITB`,
      description: program.details.description,
    },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://p3ri.salmanitb.com";

  const timeline = program.details.timeline ?? [];
  const startDate =
    timeline[0]?.date ? parseIndonesianDate(timeline[0].date) : undefined;
  const lastEntry = timeline[timeline.length - 1];
  const endDate =
    lastEntry?.date ? parseIndonesianDate(lastEntry.date) : undefined;

  return (
    <main className="min-h-screen bg-background-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: program.title,
          description: program.details.description,
          eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          location: {
            "@type": "Place",
            name: program.location,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Ganesa No.7",
              addressLocality: "Bandung",
              addressRegion: "Jawa Barat",
              postalCode: "40132",
              addressCountry: "ID",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "P3RI Masjid Salman ITB",
            url: baseUrl,
          },
          url: `${baseUrl}/program/${program.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Program",
              item: `${baseUrl}/program`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: program.title,
              item: `${baseUrl}/program/${program.slug}`,
            },
          ],
        }}
      />
      <ProgramDetailClient program={program} />
    </main>
  );
}
