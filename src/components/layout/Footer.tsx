"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube} from "lucide-react";


export default function Footer() {
  const pathname = usePathname();

  const footerLinks = [
    { name: "Beranda", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Jadwal", href: "/timeline" },
  ];

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@SalmanITB",
      icon: <Youtube size={24} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/salmanitb",
      icon: <Instagram size={24} />,
    },
    {
      name: "Whatsapp",
      href: "https://whatsapp.com/channel/0029VbBQARfCMY0GJ1Wh2M2S",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <footer className="relative w-full bg-primary overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-8"
        style={{
          backgroundImage: `url('/images/new-footer-bg.svg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-20 w-full mx-auto pt-12 pb-12 lg:pt-6 lg:pb-12 flex flex-col justify-center items-start gap-12">
        <div className="self-stretch flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12 px-8 md:px-20">
          <div className="flex justify-between items-center w-full md:w-auto md:flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo-white.svg"
                alt="Logo P3RI"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>

            <div className="flex md:hidden justify-end items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-white hover:text-text-highlight transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-1 md:gap-4 flex-1">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-2 py-2 md:py-3 flex justify-start items-center gap-2 text-white hover:text-text-highlight transition-colors"
              >
                <div
                  className={`text-base font-montserrat leading-6 ${
                    isActive(link.href) ? "font-bold" : "font-semibold"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex flex-shrink-0 justify-end items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-white hover:text-text-highlight transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="self-stretch text-center text-white text-sm font-medium font-montserrat leading-5 px-6">
          P3RI @ 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}