import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import WinterBackground from "../../components/WinterBackground";
import { ENV } from "../../env";
import { getToken } from "../../lib/api";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; expired?: string }>;
}) {
  const { next = "/status", expired } = await searchParams;
  if ((await getToken()) && !expired)
    redirect(next.startsWith("/") ? next : "/status");
  return (
    <main id="main-content" className="winter relative isolate min-h-svh">
      <WinterBackground />
      <SiteHeader signedIn={false} />
      <div className="mx-auto w-full max-w-md px-4 py-10 sm:px-6 md:py-16">
        <div className="frost-card rounded-3xl p-6 sm:p-8">
          <h1
            className="text-navy text-4xl leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            Masuk
          </h1>
          <p className="font-montserrat text-navy/75 mt-2 mb-6 text-sm leading-relaxed">
            Gunakan akun Kaderisasi Salman yang sama dengan
            kaderisasi.salmanitb.com.
          </p>
          {expired && (
            <p className="font-montserrat mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Sesi kamu berakhir. Silakan masuk lagi.
            </p>
          )}
          <LoginForm
            next={next}
            kaderisasiUrl={ENV.NEXT_PUBLIC_KADERISASI_URL}
          />
        </div>
      </div>
    </main>
  );
}
