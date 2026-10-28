import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountPanel from "../../components/AccountPanel";
import SiteHeader from "../../components/SiteHeader";
import WinterBackground from "../../components/WinterBackground";
import { ENV } from "../../env";
import { getToken } from "../../lib/api";
import { GOOGLE_ERRORS, getGoogleConfig, safeNext } from "../../lib/google";

export const metadata: Metadata = { title: "Masuk" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string;
    expired?: string;
    googleError?: string;
  }>;
}) {
  const { next: rawNext, expired, googleError } = await searchParams;
  const next = safeNext(rawNext);
  if ((await getToken()) && !expired && !googleError) redirect(next);
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
            Pakai akun Kaderisasi Salman. Belum punya? Cukup masukkan emailmu,
            akunnya bisa langsung dibuat di sini.
          </p>
          {expired && (
            <p className="font-montserrat mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Sesi kamu berakhir. Silakan masuk lagi.
            </p>
          )}
          {googleError && (
            <p
              role="alert"
              className="font-montserrat mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {GOOGLE_ERRORS[googleError] ?? GOOGLE_ERRORS.GOOGLE_LOGIN_FAILED}
            </p>
          )}
          <AccountPanel
            next={next}
            googleEnabled={getGoogleConfig() !== null}
            kaderisasiUrl={ENV.NEXT_PUBLIC_KADERISASI_URL}
          />
        </div>
      </div>
    </main>
  );
}
