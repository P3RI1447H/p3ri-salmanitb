"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube} from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

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
        <Image
          src = {whatsappIcon}
          alt="Whatsapp"
          width={24}
          height={24}
          className="invert brightness-0"
        />
      )
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <footer className="relative w-full bg-primary overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/footer-bg.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.50)",
          backgroundBlendMode: "soft-light",
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
