import Link from "next/link";
import { logout } from "../app/actions";

/** Site name plus the sign-in or status links. */
export default function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const link =
    "font-montserrat text-navy/80 hover:text-navy focus-visible:outline-navy rounded text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 md:text-sm";
  return (
    <header className="flex items-center justify-between gap-4 px-4 pt-6 sm:px-6 md:px-12 md:pt-10">
      <Link
        href="/"
        className="font-montserrat text-olive text-xs font-semibold tracking-[0.2em] uppercase md:text-sm"
      >
        P3RI Masjid Salman ITB
      </Link>
      <nav className="flex items-center gap-4">
        {signedIn ? (
          <>
            <Link href="/status" className={link}>
              Status
            </Link>
            <form action={logout}>
              <button type="submit" className={link}>
                Keluar
              </button>
            </form>
          </>
        ) : (
          <Link href="/masuk" className={link}>
            Masuk
          </Link>
        )}
      </nav>
    </header>
  );
}
