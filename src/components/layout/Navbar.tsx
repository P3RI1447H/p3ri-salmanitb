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
      <nav className="bg-primary flex h-16 w-full items-center border-b border-white/10 md:h-20">
        <div className="flex h-full w-full items-center justify-between gap-6 px-4 sm:px-8 md:gap-[48px] md:px-12 lg:px-20">
          <Link
            href="/"
            className="flex h-full items-center py-2 md:py-4"
            aria-label="Home"
          >
            <Image
              src="/images/logo-white.svg"
              alt="Logo P3RI"
              width={60}
              height={60}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="bg-secondary m-0 hidden flex-1 list-none items-center justify-end gap-4 rounded-3xl p-1 md:flex">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-start gap-3 rounded-3xl px-4 py-3 transition-colors",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "hover:text-accent text-white"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className="font-montserrat text-base leading-6 font-semibold whitespace-nowrap">
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
            className="hover:bg-secondary/80 focus:ring-accent rounded p-2 text-white transition-colors focus:ring-2 focus:outline-none md:hidden"
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
          className="bg-primary fixed inset-0 z-40 overflow-y-auto md:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4 sm:px-8">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex h-full items-center py-2"
              aria-label="Home"
            >
              <Image
                src="/images/logo-white.svg"
                alt="Logo P3RI"
                width={60}
                height={60}
                className="h-full w-auto object-contain"
              />
            </Link>

            <button
              onClick={closeMenu}
              className="hover:bg-secondary focus:ring-accent rounded p-2 text-white transition-colors focus:ring-2 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="m-0 flex list-none flex-col px-4 pt-4 sm:px-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "font-montserrat block border-b border-white/10 py-4 text-base font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-text-highlight"
                      : "hover:text-accent text-white"
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
