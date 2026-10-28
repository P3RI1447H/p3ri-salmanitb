import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import WinterBackground from "../../components/WinterBackground";
import {
  ApiError,
  getForm,
  getProfile,
  getRegistration,
  getToken,
  type Profile,
} from "../../lib/api";
import type { AnswerValue, Answers, Form, Registration } from "../../lib/form";
import AccountPanel from "../../components/AccountPanel";
import { ENV } from "../../env";
import { GOOGLE_ERRORS, getGoogleConfig } from "../../lib/google";
import RegistrationForm from "./RegistrationForm";

export const metadata: Metadata = { title: "Daftar Panitia" };

/** Prefills identity answers from the Kaderisasi profile. */
function fromProfile(profile: Profile | null): Answers["common"] {
  const common: Record<string, AnswerValue> = {};
  if (!profile) return common;
  if (profile.name) common.nama_lengkap = profile.name;
  if (profile.gender === "M") common.jenis_kelamin = "Laki-laki";
  if (profile.gender === "F") common.jenis_kelamin = "Perempuan";
  if (profile.birth_date)
    common.tanggal_lahir = profile.birth_date.slice(0, 10);
  if (profile.whatsapp) common.whatsapp = profile.whatsapp;
  if (profile.line) common.line = profile.line;
  if (profile.university?.name) common.instansi = profile.university.name;
  if (profile.major) common.program_studi = profile.major;
  if (profile.intake_year) common.tahun_masuk = String(profile.intake_year);
  return common;
}

/** Turns stored file keys back into the file objects the form edits. */
function fromRegistration(form: Form, registration: Registration): Answers {
  const common = { ...registration.answers.common };
  for (const section of form.sections)
    for (const q of section.questions)
      if (q.type === "file" && typeof common[q.id] === "string") {
        const file = registration.files.find((f) => f.key === common[q.id]);
        if (file) common[q.id] = file;
        else delete common[q.id];
      }
  return { common, divisions: registration.answers.divisions ?? {} };
}

const serif = { fontFamily: "var(--font-instrument-serif), serif" };

const STEPS_PREVIEW = [
  "Identitas & data akademik",
  "Kontak, kesehatan & kaderisasi",
  "Pertanyaan umum",
  "Pilih hingga 3 bidang/divisi",
  "Pertanyaan tiap pilihan",
  "Unggah berkas",
];

/** Signed-out visitors start the form here: the account is its first step. */
function AccountStep({
  form,
  expired,
  googleError,
}: {
  form: Form;
  expired: boolean;
  googleError?: string;
}) {
  return (
    <main id="main-content" className="winter relative isolate min-h-svh">
      <WinterBackground />
      <SiteHeader signedIn={false} />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 md:py-12">
        <h1
          className="text-navy text-4xl leading-tight md:text-5xl"
          style={serif}
        >
          {form.title}
        </h1>
        <div className="frost-card mt-6 rounded-3xl p-5 sm:p-8">
          <div className="font-montserrat text-navy/70 text-xs font-semibold md:text-sm">
            Langkah 1 · Akun
          </div>
          <div
            className="bg-navy/10 mt-2 mb-6 h-1.5 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div className="bg-navy h-full w-[6%] rounded-full" />
          </div>
          <h2
            className="text-navy text-3xl leading-tight md:text-4xl"
            style={serif}
          >
            Mulai dengan akunmu
          </h2>
          <p className="font-montserrat text-navy/75 mt-2 mb-6 text-sm leading-relaxed">
            Pendaftaran memakai akun Kaderisasi Salman supaya jawabanmu
            tersimpan dan statusnya bisa kamu pantau. Belum punya akun? Langsung
            buat di sini, tidak perlu pindah halaman.
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
            next="/daftar"
            googleEnabled={getGoogleConfig() !== null}
            kaderisasiUrl={ENV.NEXT_PUBLIC_KADERISASI_URL}
          />
          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="font-montserrat text-navy text-sm font-semibold">
              Setelah ini
            </p>
            <ol className="font-montserrat text-navy/70 mt-2 grid gap-1 text-sm sm:grid-cols-2">
              {STEPS_PREVIEW.map((step, i) => (
                <li key={step}>
                  {i + 2}. {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ googleError?: string }>;
}) {
  const { googleError } = await searchParams;
  const form = await getForm();
  if (!form.is_open) redirect("/");
  if (!(await getToken()))
    return (
      <AccountStep form={form} expired={false} googleError={googleError} />
    );
  let registration: Registration | null;
  let profile: Awaited<ReturnType<typeof getProfile>>;
  try {
    [registration, profile] = await Promise.all([
      getRegistration(),
      getProfile(),
    ]);
  } catch (error) {
    // A stale session (expired token or a removed account) starts over at the account step.
    if (error instanceof ApiError && error.status === 401)
      return <AccountStep form={form} expired googleError={googleError} />;
    throw error;
  }
  if (registration && !registration.editable) redirect("/status");

  return (
    <main id="main-content" className="winter relative isolate min-h-svh">
      <WinterBackground />
      <SiteHeader signedIn />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 md:py-12">
        <h1
          className="text-navy text-4xl leading-tight md:text-5xl"
          style={{ fontFamily: "var(--font-instrument-serif), serif" }}
        >
          {form.title}
        </h1>
        {form.is_open ? (
          <div className="mt-6">
            <RegistrationForm
              form={form}
              editing={Boolean(registration)}
              email={profile?.email ?? null}
              initial={
                registration
                  ? {
                      choices: registration.choices,
                      answers: fromRegistration(form, registration),
                    }
                  : {
                      choices: [],
                      answers: { common: fromProfile(profile), divisions: {} },
                    }
              }
            />
          </div>
        ) : (
          <div className="frost-card font-montserrat text-navy mt-6 rounded-3xl p-6 text-sm leading-relaxed md:text-base">
            Pendaftaran sedang tidak dibuka.{" "}
            <Link href="/" className="underline underline-offset-4">
              Kembali ke beranda
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
