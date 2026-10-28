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
  type Profile,
} from "../../lib/api";
import type { AnswerValue, Answers, Form, Registration } from "../../lib/form";
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

export default async function RegisterPage() {
  let form: Form, registration: Registration | null, profile: Profile | null;
  try {
    [form, registration, profile] = await Promise.all([
      getForm(),
      getRegistration(),
      getProfile(),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401)
      redirect("/masuk?expired=1&next=/daftar");
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
