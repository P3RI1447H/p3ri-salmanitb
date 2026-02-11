"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const profileStr = localStorage.getItem("profile");
      if (token && profileStr) {
        try {
          const profile = JSON.parse(profileStr);
          setUser(profile);
        } catch (e) {
          console.error("Failed to parse profile", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage events (login/logout from other tabs or same tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    router.push("/auth");
  };

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
      <nav className="bg-primary w-full h-16 md:h-20 flex items-center shadow-md">
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
          <ul className="hidden md:flex flex-1 p-1 bg-secondary rounded-3xl justify-end items-center gap-4 list-none m-0">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-3xl flex justify-start items-center gap-3 transition-colors",
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-white hover:text-accent",
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
            <li>
              {user ? (
                <div className="flex items-center gap-4 px-4">
                  <span
                    className="text-white font-montserrat font-semibold truncate max-w-[200px]"
                    title={user.name}
                  >
                    {user.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full w-8 h-8 md:w-9 md:h-9"
                    onClick={handleLogout}
                    title="Keluar"
                  >
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button
                    variant="default"
                    className="rounded-3xl px-6 font-semibold font-montserrat"
                  >
                    Masuk
                  </Button>
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-secondary/80 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
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
          className="md:hidden fixed inset-0 bg-primary z-40 overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-secondary">
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
              className="text-white p-2 hover:bg-secondary rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
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
                    "block py-4 text-base font-semibold font-montserrat border-b border-secondary transition-colors",
                    isActive(item.href)
                      ? "text-text-highlight"
                      : "text-white hover:text-accent",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              {user ? (
                <div className="flex flex-col gap-4 py-4 border-b border-secondary">
                  <span className="text-white font-montserrat font-semibold">
                    Halo, {user.name}
                  </span>
                  <Button
                    variant="destructive"
                    className="w-full rounded-3xl font-semibold font-montserrat"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Keluar
                  </Button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={closeMenu}
                  className="block py-4 text-base font-semibold font-montserrat text-white hover:text-accent transition-colors"
                >
                  Masuk
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
