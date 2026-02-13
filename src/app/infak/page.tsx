"use client";

import { useRef } from "react";
import Image from "next/image";
import DonationCard from "../../components/features/DonationCard";

export default function InfakPage() {
  const qrSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQR = () => {
    qrSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const donationCards = [
    {
      title: "Wakaf Salman",
      summary:
        "Wakaf merupakan amalan dengan harta yang jariyah (abadi), diberikan kepada umat sehingga bermanfaat untuk masyarakat luas dan dalam rangka mendekatkan diri pada Allah SWT.",
      image_url: "/images/empty-img.png",
      link: "https://www.wakafsalman.or.id/",
    },
    {
      title: "Salurkan Zakatmu di Rumah Amal",
      summary:
        "Harta kita tidak sepenuhnya milik kita, ada zakat yang harus kita salurkan. Mudah bayar zakat, sangat dekat.",
      image_url: "/images/empty-img.png",
      link: "https://www.rumahamal.org/donasi",
    },
    {
      title: "Berbagi Bersama Kitabisa",
      summary:
        "Situs donasi dan menggalang dana (fundraising) untuk inisiatif, campaign dan program sosial. Mari bergotong royong membangun Indonesia!",
      image_url: "/images/empty-img.png",
      link: "https://www.rumahamal.org/donasi",
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-background-page">
      {/* Hero */}
      <section
        aria-labelledby="infak-heading"
        className="bg-primary px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="infak-heading"
            className="font-forum text-4xl font-normal leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Bersama, Bermanfaat
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-montserrat text-sm font-medium leading-relaxed text-primary-foreground/80 md:mt-6 md:text-base lg:text-lg">
            Salurkan infak, zakat, dan wakaf Anda untuk mendukung program-program
            Ramadhan P3RI Masjid Salman ITB. Setiap kontribusi membantu memperluas
            manfaat bagi jamaah dan masyarakat sekitar.
          </p>
          <button
            onClick={scrollToQR}
            className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 font-montserrat text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-10 md:py-4 md:text-base"
          >
            Scan QR untuk Infak
          </button>
        </div>
      </section>

      {/* Donation Cards */}
      <section
        aria-labelledby="donation-heading"
        className="bg-background-page px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="donation-heading"
            className="mb-8 text-center font-forum text-3xl font-normal text-foreground md:mb-12 md:text-4xl lg:text-5xl"
          >
            Salurkan Kebaikan
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {donationCards.map((card) => (
              <DonationCard
                key={card.title}
                title={card.title}
                summary={card.summary}
                image_url={card.image_url}
                link={card.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section
        ref={qrSectionRef}
        aria-labelledby="qr-heading"
        className="bg-background-section px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-20 lg:py-20"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-1">
            <h2
              id="qr-heading"
              className="font-forum text-3xl font-normal leading-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Salurkan infak terbaikmu dengan scan QR Code
            </h2>
            <p className="mt-4 font-montserrat text-sm font-medium leading-relaxed text-text-gray md:mt-6 md:text-base">
              Scan QR code di samping untuk menyalurkan infak Anda secara langsung.
              Setelah melakukan transfer, silakan konfirmasi donasi melalui WhatsApp
              agar kami dapat mencatat kontribusi Anda.
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-primary px-8 py-3 font-montserrat text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mt-8 md:px-10 md:py-4 md:text-base"
            >
              Konfirmasi Donasi
            </a>
          </div>

          {/* QR Code */}
          <div className="order-2 flex justify-center">
            <div className="w-full max-w-xs overflow-hidden rounded-2xl bg-card p-6 shadow-sm md:p-8">
              <div className="relative aspect-square w-full rounded-lg bg-gray-100">
                <Image
                  src="/images/empty-img.png"
                  alt="QR Code untuk infak P3RI Salman ITB"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-4 text-center font-montserrat text-xs font-medium text-text-gray md:text-sm">
                Scan dengan aplikasi e-wallet atau mobile banking Anda
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
