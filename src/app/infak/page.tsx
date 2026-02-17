import type { Metadata } from "next";
import DonationCard from "../../components/features/DonationCard";

export const metadata: Metadata = {
  title: "Infak & Donasi",
  description:
    "Salurkan infak dan donasi Anda untuk mendukung program Ramadhan P3RI Masjid Salman ITB. Pembayaran mudah via QRIS.",
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

export default function InfakPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background-page">
      {/* Hero + QRIS */}
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
            Salurkan infak Anda untuk mendukung program Ramadhan P3RI Masjid
            Salman ITB.
          </p>

          {/* QRIS Card */}
          <div className="mx-auto mt-10 max-w-xs md:mt-12">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white p-5 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/qris"
                alt="QRIS untuk infak P3RI Salman ITB"
                className="aspect-square w-full rounded-lg object-contain"
                draggable={false}
              />
              <p className="mt-3 font-montserrat text-xs font-medium text-text-gray md:text-sm">
                Scan dengan e-wallet atau mobile banking Anda
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/628995228114"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 font-montserrat text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-10 md:py-4 md:text-base"
          >
            Konfirmasi Donasi via WhatsApp
          </a>
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
    </main>
  );
}
