"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Program", href: "/program", shortName: "Program" },
    { name: "Jadwal", href: "/timeline", shortName: "Jadwal" },
    { name: "Live Stream", href: "/live", shortName: "Live" },
    { name: "Infak", href: "/infak", shortName: "Infak" },
    { name: "Sponsor", href: "/sponsor", shortName: "Sponsor" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Helper to check active state
  const isActive = (href: string) => pathname === href;

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#4F5900] w-full h-16 md:h-20 flex items-center shadow-md">
        <div className="w-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 h-full gap-6 md:gap-[48px]">
          <Link
            href="/"
            className="h-full py-2 md:py-4 flex items-center"
            aria-label="Home"
          >
            <Image
              src="/images/logo-p3ri.png"
              alt="Logo P3RI"
              width={60}
              height={60}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-1 p-1 bg-[#353B00] rounded-3xl justify-end items-center gap-4 list-none m-0">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-3xl flex justify-start items-center gap-3 transition-colors",
                    isActive(item.href)
                      ? "bg-[#FFC80B] text-[#353B00]"
                      : "text-white hover:text-[#FFC80B]",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className="text-base font-semibold font-montserrat leading-6 whitespace-nowrap">
                    <span className="hidden lg:inline">{item.name}</span>
                    <span className="lg:hidden">{item.shortName}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-[#3A4200] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC80B]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 bg-[#4F5900] z-40 overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#3A4200]">
            <Link href="/" onClick={closeMenu} aria-label="Home">
              <Image
                src="/images/logo-p3ri.png"
                alt="Logo P3RI"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>

            <button
              onClick={closeMenu}
              className="text-white p-2 hover:bg-[#3A4200] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC80B]"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col px-6 pt-4 list-none m-0">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "block py-4 text-base font-semibold font-montserrat border-b border-[#3A4200] transition-colors",
                    isActive(item.href)
                      ? "text-[#ADCD61]"
                      : "text-white hover:text-[#FFC80B]",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
