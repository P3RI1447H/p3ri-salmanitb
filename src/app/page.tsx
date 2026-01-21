import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 
import { DONATION_ITEMS } from "../lib/constants";
import DonationCard from "../components/features/DonationCard";
import GalleryCarousel from "../components/features/GalleryCarousel";

const HomePage = () => {
  return (
    <main className="bg-[#F7FFD8]">
      <section className="relative max-w-360 h-[500px] sm:h-[600px] md:h-[700px] lg:h-[814px] bg-[#91AE4C] rounded-b-[32px] md:rounded-b-[48px] lg:rounded-b-[64px] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25),inset_0px_-4px_24px_0px_rgba(255,255,255,0.5)] overflow-hidden">
        <div className="absolute inset-0 rounded-b-[32px] md:rounded-b-[48px] lg:rounded-b-[64px] overflow-hidden">
          <div className="relative w-full h-full lg:w-3/4">
            <Image
              src="/images/hero-bg.png"
              alt="Masjid Salman ITB"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent from-30% to-[#91AE4C]"></div>
          </div>
        </div>

        <div className="relative w-full mx-auto h-full px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-center lg:justify-end py-6 md:py-8">
          <div className="w-150 h-[318px] flex flex-col gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-white font-forum text-3xl sm:text-4xl md:text-5xl lg:text-[72px] font-normal leading-[100%]">
              Ramadhan dan Idul Adha bersama P3RI
            </h1>
            <p className="text-white font-montserrat text-sm sm:text-base md:text-lg font-medium leading-7">
              Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi sit cursus tincidunt massa et a. Dolor odio parturient cursus justo nunc enim, a, sit facilisi. Eleifend at ac lacus, ullamcorper mauris eget tortor mollis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <Link
                href="/timeline"
                className="bg-[#FFB800] text-[#353B00] font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
              >
                Lihat Jadwal
              </Link>
              <Link
                href="/infak"
                className="bg-[#353B00] text-white font-montserrat text-sm md:text-base lg:text-lg font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all"
              >
                Infak & Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] p-4 sm:p-6">
        <div 
          className="max-w-348 mx-auto shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] rounded-[32px] md:rounded-[48px] lg:rounded-[56px] p-6 sm:p-10 md:p-14 text-center"
          style={{
            background: 'linear-gradient(90deg, #ADCD61 0%, #FFFFFF 50%, #ADCD61 100%)',
            boxShadow: 'inset 0px -4px 24px 0px rgba(255,255,255,0.5)'
          }}
        >
          <div className="flex flex-col items-center gap-6 md:gap-10 lg:gap-12">
            <h2 className="text-[#21272A] font-forum text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-normal leading-[66px]">
              Banyak kegiatan yang kami buat, spesial untuk Anda
            </h2>
            <p className="text-[#21272A] font-montserrat text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-[30px]">
              Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus iaculis.
            </p>
            <div className="relative inline-block">
               <Link
                href="/timeline"
                className="inline-flex items-center bg-[#FFC80B] text-[#353B00] font-montserrat text-sm md:text-base lg:text-lg font-bold pl-6 md:pl-10 pr-[3px] py-[3px] rounded-full shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all"
              >
                Jadwal Lengkap
                <div className="ml-4 d:ml-6 w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-white bg-[#9C4299] rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-360 mx-auto">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-[#21272A] font-forum text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-normal mb-6 md:mb-8 lg:mb-12">
              Beramal di Bulan Suci, Bersama P3RI
            </h2>
            <p className="text-[#21272A] font-montserrat text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16">
              P3RI membantu anda dalam menyalurkan infak, sedekah, dan donasi kepada orang-orang yang membutuhkan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {DONATION_ITEMS.map((item) => (
              <DonationCard
                key={item.id}
                title={item.title}
                summary={item.summary}
                image_url={item.image_url}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7FFD8] p-20">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-[#21272A] font-forum text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-normal leading-tight mb-6 md:mb-10 lg:mb-12">
              Tahun Lalu di P3RI
            </h2>
            <p className="text-[#21272A] font-montserrat text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-[30px] px-4">
              Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus iaculis.
            </p>
        </div>
      </section>

      <section className="relative w-full sm:h-[500px] md:h-[700px] lg:h-223 overflow-hidden bg-[#F7FFD8]">
        <div className="absolute inset-0">
          <div className="relative w-full h-full" style={{ clipPath: 'url(#gallery-mask)' }}>
            <Image
              src="/images/gallery-bg.png"
              alt="Gallery Background"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="gallery-mask" clipPathUnits="objectBoundingBox">
              <path d="M1,1 H0 V0 C0,0.031,0.032,0.056,0.071,0.056 C0.111,0.056,0.143,0.031,0.143,0 C0.143,0.031,0.175,0.056,0.214,0.056 C0.254,0.056,0.286,0.031,0.286,0 C0.286,0.031,0.318,0.056,0.357,0.056 C0.397,0.056,0.429,0.031,0.429,0 C0.429,0.031,0.461,0.056,0.5,0.056 C0.54,0.056,0.571,0.031,0.571,0 C0.571,0.031,0.603,0.056,0.643,0.056 C0.683,0.056,0.714,0.031,0.714,0 C0.714,0.031,0.746,0.056,0.786,0.056 C0.825,0.056,0.857,0.031,0.857,0 C0.857,0.031,0.889,0.056,0.929,0.056 C0.968,0.056,1,0.031,1,0 V1 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative max-w-360 mx-auto h-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 z-20">
          <GalleryCarousel />
        </div>
      </section>
    </main>
  )
}

export default HomePage 