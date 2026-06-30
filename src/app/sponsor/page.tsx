import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import SponsorGrid from "@/components/features/SponsorGrid";
import whatsappIcon from "@/assets/whatsapp-icon.svg";
import { StatisticsSection } from "@/components/features/StatisticsSection";
import {
  Podcast,
  Utensils,
  MoonStar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsor & Partner",
  description:
    "Jadilah bagian dari nyala lentera inspirasi P3RI. Sponsori kegiatan Ramadhan & Idul Adha 1447 H Masjid Salman ITB dan jangkau lebih dari 120.000 penerima manfaat.",
  alternates: {
    canonical: "/sponsor",
  },
  openGraph: {
    title: "Sponsor & Partner — P3RI Salman ITB",
    description:
      "Jadilah bagian dari nyala lentera inspirasi P3RI. Sponsori kegiatan Ramadhan & Idul Adha 1447 H Masjid Salman ITB dan jangkau lebih dari 120.000 penerima manfaat.",
    url: "/sponsor",
  },
  twitter: {
    title: "Sponsor & Partner — P3RI Salman ITB",
    description:
      "Jadilah bagian dari nyala lentera inspirasi P3RI. Sponsori kegiatan Ramadhan & Idul Adha 1447 H Masjid Salman ITB.",
  },
};

interface PageProps {
  searchParams: Promise<{ program?: string; pekan?: string }>;
}

export default async function SponsorPage({ searchParams }: PageProps) {
  const stats = [
      {
        icon: Podcast,
        value: "20.000+",
        label: "Pendengar IRAMA",
      },
      {
        icon: Utensils,
        value: "20.100+",
        label: "Total Jumlah Porsi Buka & Sahur",
      },
      {
        icon: MoonStar,
        value: "20k+",
        label: "Jama'ah Tarawih",
      },
    ];
  
  return (
    <main id="main-content" className="bg-background-page">

      {/* ── Hero Section ── */}
      <section
        aria-labelledby="sponsor-hero-heading"
        className="relative min-h-[340px] w-full overflow-hidden md:min-h-[400px] bg-gradient-to-br from-primary to-secondary"
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.45,
          }}
        />

        {/* Flower illustration — kanan atas */}
        <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-20">
          <Image
            src="/images/footer-flower.png"
            alt=""
            width={380}
            height={380}
            className="drop-shadow-xl"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-center px-8 py-14 md:min-h-[400px] md:px-16 lg:max-w-[60%] lg:px-20 xl:px-24">
          <h1
            id="sponsor-hero-heading"
            className="font-forum mb-5 text-[36px] leading-tight text-white font-normal text-foreground md:text-[48px] lg:text-[56px]"
          >
            Nyalakan Semangat Kebaikan bersama P3RI
          </h1>
          <p className="font-montserrat mb-8 max-w-xl text-sm font-medium leading-relaxed text-white text-foreground/80 md:text-base">
            P3RI 1447 H menargetkan lebih dari{" "}
            <span className="font-bold text-accent-foreground underline text-white decoration-accent decoration-2 underline-offset-2">
              120.000</span>{" "}
            penerima manfaat kepada semua kalangan masyarakat. Mari jadi bagian
            nyala lentera inspirasi dengan menjadi sponsor kami.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <p className="font-montserrat text-sm font-semibold text-accent md:text-base">
              Hubungi Kami :
            </p>
            <a
              href="mailto:p3ri@salmanitb.com"
              aria-label="Email P3RI"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black shadow-md transition-colors duration-200 hover:bg-accent-hover"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/6281319487627"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Kayla Celesti"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-md transition-colors duration-200 hover:bg-accent-hover"
            >
              <Image
                src={whatsappIcon}
                alt="WhatsApp"
                width={22}
                height={22}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        aria-labelledby="stats-heading"
        className="bg-gradient-to-b from-background-page from-5% to-[#FFD640]/70 to-85% px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="stats-heading" className="font-forum text-foreground mb-4 text-4xl leading-tight font-normal md:mb-6 md:text-5xl">
            Ringkasan Ramadhan P3RI 1447H
          </h2>
          <p className="font-montserrat text-text-gray mx-auto mb-10 max-w-2xl text-sm leading-relaxed font-medium md:mb-14 md:text-base">
            Jumlah Penerima Manfaat
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card flex flex-col items-center gap-3 rounded-2xl p-6 md:gap-4 md:p-8">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14">
                  <stat.icon className="text-primary h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
                </div>
                <span className="font-forum text-primary text-3xl md:text-4xl">{stat.value}</span>
                <span className="font-montserrat text-text-gray text-sm font-medium md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>

          <h2 id="stats-heading" className="font-forum text-foreground mt-8 mb-4 text-4xl leading-tight font-normal md:mb-6 md:text-5xl">
            Grafik
          </h2>
          
          {/* Jama'ah Statistics */}
          <StatisticsSection searchParams={searchParams} />
          
        </div>
      </section>

      {/* ── Mitra Sponsor & Mitra Informasi ── */}
      <section
        aria-labelledby="mitra-heading"
        className="bg-background-page py-10 md:py-14 lg:py-16"
      >
        <h2 id="mitra-heading" className="sr-only">
          Daftar Mitra dan Sponsor
        </h2>
        <SponsorGrid />
      </section>

      {/* ── Tahun Lalu di P3RI ── */}
      <section
        aria-labelledby="tahun-lalu-heading"
        className="from-primary from-30% to-secondary to-85% bg-gradient-to-b relative w-full overflow-hidden"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-8 py-16 md:flex-row md:gap-16 md:px-16 md:py-20 lg:px-20">
          {/* Teks kiri */}
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            <h2
              id="tahun-lalu-heading"
              className="font-forum text-[36px] font-normal leading-tight text-white/90 md:text-[44px] lg:text-[52px]"
            >
              Tahun Lalu di P3RI
            </h2>
            <p className="font-montserrat text-sm font-medium leading-relaxed text-white/70 md:text-base">
              <span className="font-bold text-accent">Puluhan ribu</span>{" "}
              kebahagiaan telah tersalurkan lewat P3RI tahun lalu, dari paket
              berbuka hingga hewan kurban. Tahun ini, mari bergerak bersama
              lagi. Jadilah bagian dari semangat berbagi yang tak pernah padam.
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-2xl bg-white/10 shadow-2xl">
              <Image
                src="/images/tahun-lalu-p3ri.jpg"
                alt="Dokumentasi kegiatan P3RI tahun lalu"
                width={700}
                height={420}
                className="h-64 w-full object-cover md:h-72 lg:h-80"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}