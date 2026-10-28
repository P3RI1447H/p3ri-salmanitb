import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import WinterBackground from "../../components/WinterBackground";
import { ENV } from "../../env";
import { getToken } from "../../lib/api";
import { GOOGLE_ERRORS, getGoogleConfig, safeNext } from "../../lib/google";
import { startGoogleLogin } from "../actions";
import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

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
  const { next = "/status", expired, googleError } = await searchParams;
  const google = getGoogleConfig() !== null;
  if ((await getToken()) && !expired && !googleError) redirect(safeNext(next));
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
          {googleError && (
            <p
              role="alert"
              className="font-montserrat mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {GOOGLE_ERRORS[googleError] ?? GOOGLE_ERRORS.GOOGLE_LOGIN_FAILED}
            </p>
          )}
          {google && (
            <>
              <form action={startGoogleLogin}>
                <input type="hidden" name="next" value={safeNext(next)} />
                <GoogleButton />
              </form>
              <div
                className="font-montserrat text-navy/50 my-5 flex items-center gap-3 text-xs"
                aria-hidden="true"
              >
                <span className="h-px flex-1 bg-slate-300" />
                atau dengan email
                <span className="h-px flex-1 bg-slate-300" />
              </div>
            </>
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
