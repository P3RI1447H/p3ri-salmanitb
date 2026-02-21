import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROGRAMS_DATA } from "../../../lib/constants";
import ProgramDetailClient from "./ProgramDetailClient";
import JsonLd from "../../../components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS_DATA.find((p) => p.slug === slug);
  if (!program) return { title: "Program Tidak Ditemukan | P3RI Salman ITB" };

  return {
    title: `${program.title} | P3RI Salman ITB`,
    description: program.details.description,
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
      <ProgramDetailClient program={program} />
    </main>
  );
}
