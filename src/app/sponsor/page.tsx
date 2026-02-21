import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SponsorGrid from "@/components/features/SponsorGrid";

export const metadata: Metadata = {
  title: "Sponsor & Partner",
  description:
    "Jadilah bagian dari nyala lentera inspirasi P3RI. Sponsori kegiatan Ramadhan & Idul Adha 1447 H Masjid Salman ITB dan jangkau lebih dari 120.000 penerima manfaat.",
};

export default function SponsorPage() {
  return (
    <main id="main-content" className="bg-background-page">

      {/* ── Hero Section ── */}
      <section
        aria-labelledby="sponsor-hero-heading"
        className="relative min-h-[340px] w-full overflow-hidden md:min-h-[400px]"
        style={{ backgroundColor: "var(--color-secondary)" }}
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
            width={260}
            height={260}
            className="object-contain drop-shadow-xl"
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
            P3RI 144X H menargetkan lebih dari{" "}
            <span className="font-bold text-accent-foreground underline text-white decoration-accent decoration-2 underline-offset-2">
              120.000</span>{" "}
            penerima manfaat kepada semua kalangan masyarakat. Mari jadi bagian
            nyala lentera inspirasi dengan menjadi sponsor kami.
          </p>
          <Link
            href="mailto:p3ri@salmanitb.com"
            className="bg-accent hover:bg-accent-hover inline-flex w-fit items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-white shadow-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-base"
          >
            Hubungi Kami
          </Link>
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
        className="from-primary to-secondary bg-gradient-to-br relative w-full overflow-hidden"
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
              Pada tahun lalu,{" "}
              <span className="font-semibold text-accent">puluhan ribu</span>{" "}
              paket berbuka, kurban, sembako, dan bantuan lainnya telah
              disalurkan melalui P3RI 1443 H. Tahun ini, kami mengundang Anda
              untuk bergabung dan menjadi bagian dari semangat berbagi yang
              terus kami kobarkan.
            </p>
          </div>

          {/* Gambar kanan */}
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-2xl bg-white/10 shadow-2xl">
              <Image
                src="/images/empty-img.png"
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