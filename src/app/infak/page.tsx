"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/Button";
import DonationCard from "../../components/features/DonationCard";

export default function InfakPage() {
  const qrSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQR = () => {
    qrSectionRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const donationCards = [
    {
      title: "Wakaf Salman",
      summary: "Wakaf merupakan amalan dengan harta yang jariyah (abadi), diberikan kepada umat sehingga bermanfaat untuk masyarakat luas dan dalam rangka mendekatkan diri pada Allah SWT.",
      image_url: "/images/wakaf.jpg",
      link: "https://www.wakafsalman.or.id/"
    },
    {
      title: "Salurkan Zakatmu di Rumah Amal",
      summary: "Harta kita tidak sepenuhnya milik kita, ada zakat yang harus kita salurkan. Mudah bayar zakat, sangat dekat.",
      image_url: "/images/zakat.jpg",
      link: "https://www.rumahamal.org/donasi"
    },
    {
      title: "Berbagi Bersama Kitabisa",
      summary: "Situs donasi dan menggalang dana (fundraising) untuk inisiatif, campaign dan program sosial. Mari bergotong royong membangun Indonesia!",
      image_url: "/images/infaq.jpg",
      link: "https://www.rumahamal.org/donasi"
    }
  ];

  return (
    <main className="min-h-screen bg-background-page">
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
        style={{
            background: "linear-gradient(to left, #8F9F00 1%, #FFFFFF 100%)"
          }}
      >
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left: QR Placeholder */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[500px] sm:max-w-[500px] md:max-w-[520px] aspect-[4/3] bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 flex items-center justify-center">
                <div className="w-full w-full h-full rounded-[20px] bg-gray-200/50 flex items-center justify-center">

                <Image
                  src="/images/berbagi-pge.jpg"
                  alt="QR Code Hero"
                  fill
                  className="object-cover"
                  priority
                />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-white space-y-6 md:space-y-8 order-1 lg:order-2">
              <h1 className="font-forum font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                Bersama, Bermanfaat
              </h1>
              
              <p className="font-forum font-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-xl opacity-95">
                Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar.
              </p>

              <Button
                onClick={scrollToQR}
                className="bg-white text-primary hover:bg-white/90 font-montserrat font-semibold text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Scan QR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Cards Section */}
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#F5F7DC] to-[#E8EBCC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {donationCards.map((card, index) => (
              <DonationCard
                key={index}
                title={card.title}
                summary={card.summary}
                image_url={card.image_url}
                link={card.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QR Scan Section */}
      <section 
        ref={qrSectionRef}
        className="w-full py-16 md:py-20 lg:py-24 relative overflow-hidden"
        style={{
          // Urutan stop: 44% (10% opac), 66% (100% opac), 100% (10% opac)
          background: "radial-gradient(circle at 15% 50%, rgba(173, 205, 97, 0.4) 0%, rgba(214, 206, 49, 0.2) 40%, transparent 70%), linear-gradient(to right, #8F9F00 1%, #FFFFFF 100%)"
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Phone Mockup */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[360px]">
                <div className="relative aspect-[9/18] bg-white rounded-[40px] sm:rounded-[48px] shadow-2xl overflow-hidden border-8 sm:border-[12px] border-gray-800">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl z-20" />
                  
                  {/* Phone Screen - QR Code Area */}
                  <div className="absolute inset-0 bg-white flex items-center justify-center p-10 sm:p-12">
                    <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square relative">
                      {/* Ganti '/qr-code.jpg' dengan path gambar QR code Anda */}
                      <Image
                        src="/qr-infaq.jpg"
                        alt="QR Code Donasi"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-3xl bg-white/20 scale-105" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-gray-900 space-y-6 md:space-y-8 order-1 lg:order-2">
              <h2 className="font-forum font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Salurkan infak terbaikmu dengan scan QR Code
              </h2>
              
              <p className="font-forum font-medium text-base sm:text-lg md:text-xl leading-relaxed opacity-80">
                Nec massa viverra eget feugiat pellentesque. Feugiat adipiscing massa vitae auctor mi massa. Sodales libero viverra cursus sed duis luctus nulla. In malesuada vulputate pharetra ipsum orci.
              </p>

              <a 
                href="link-whatsapp-pengurus" 
                target="_blank" 
                rel="noopener noreferrer"
              >
              </a>

              <Button
                onClick={scrollToQR}
                className="bg-primary hover:bg-primary/90 text-white font-forum font-semibold text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Konfirmasi Donasi
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}