import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const menuItems = [
    { name: "Program", href: "/program" },
    { name: "Jadwal", href: "/timeline" },
    { name: "Live Stream", href: "/live" },
    { name: "Infak", href: "/infak" },
    { name: "Sponsor", href: "/sponsor" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#4F5900] w-full h-20 flex items-center">
      <div className="w-full flex items-center justify-between px-20 h-full">
        
        <div className="h-full py-4 flex items-center">
          <Link href="/" className="h-full block">
            <Image 
              src="/images/logo-p3ri.png" 
              alt="Logo P3RI" 
              width={80} 
              height={80}
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white px-2 py-3 text-base font-semibold font-montserrat hover:text-[#ADCD61] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}