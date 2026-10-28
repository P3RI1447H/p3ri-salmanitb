import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import WinterBackground from "../../components/WinterBackground";
import { ApiError, getForm, getRegistration } from "../../lib/api";
import {
  STATUS_LABELS,
  STATUS_STEPS,
  answerText,
  divisionName,
  type Form,
  type Registration,
} from "../../lib/form";

export const metadata: Metadata = { title: "Status Pendaftaran" };

const dateTime = (value: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));

const serif = { fontFamily: "var(--font-instrument-serif), serif" };

function Timeline({
  registration,
  form,
}: {
  registration: Registration;
  form: Form;
}) {
  const rejected = registration.status === "tidak_diterima";
  const steps = rejected
    ? [
        ...STATUS_STEPS.slice(0, 2),
        {
          status: "tidak_diterima" as const,
          label: STATUS_LABELS.tidak_diterima,
          hint: "Terima kasih sudah mendaftar. Kamu belum lolos seleksi kali ini, semoga bertemu di kesempatan berikutnya.",
        },
      ]
    : STATUS_STEPS;
  const current = steps.findIndex((s) => s.status === registration.status);
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.status} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5 ${done ? "bg-navy" : "bg-navy/15"}`}
              />
            )}
            <span
              aria-hidden="true"
              className={`font-montserrat relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                active
                  ? rejected && step.status === "tidak_diterima"
                    ? "bg-red-700 text-white"
                    : "bg-navy text-white"
                  : done
                    ? "bg-navy/80 text-white"
                    : "text-navy/40 border-navy/15 border bg-white"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <div className="pt-1">
              <p
                className={`font-montserrat text-sm font-bold md:text-base ${active ? "text-navy" : done ? "text-navy/80" : "text-navy/45"}`}
              >
                {step.label}
                {active && <span className="sr-only"> (status saat ini)</span>}
              </p>
              {active && (
                <p className="font-montserrat text-navy/75 mt-1 text-sm leading-relaxed">
                  {step.hint}
                  {step.status === "diterima" &&
                    registration.accepted_division && (
                      <>
                        {" "}
                        Kamu diterima di{" "}
                        <strong>
                          {divisionName(form, registration.accepted_division)}
                        </strong>
                        .
                      </>
                    )}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  let form: Form, registration: Registration | null;
  try {
    [form, registration] = await Promise.all([getForm(), getRegistration()]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401)
      redirect("/masuk?expired=1&next=/status");
    throw error;
  }

  return (
    <main id="main-content" className="winter relative isolate min-h-svh">
      <WinterBackground />
      <SiteHeader signedIn />
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 py-8 sm:px-6 md:py-12">
        <h1
          className="text-navy text-4xl leading-tight md:text-5xl"
          style={serif}
        >
          Status Pendaftaran
        </h1>

        {!registration ? (
          <div className="frost-card font-montserrat text-navy rounded-3xl p-6 text-sm leading-relaxed md:text-base">
            <p>Kamu belum mendaftar sebagai panitia P3RI 1448 H.</p>
            {form.is_open && (
              <Link
                href="/daftar"
                className="bg-navy hover:bg-navy/90 mt-4 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white"
              >
                Daftar sekarang
              </Link>
            )}
          </div>
        ) : (
          <>
            {saved && (
              <p
                role="status"
                className="font-montserrat rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              >
                Pendaftaranmu tersimpan. Terima kasih!
              </p>
            )}
            <section
              className="frost-card rounded-3xl p-6 sm:p-8"
              aria-labelledby="timeline-heading"
            >
              <h2
                id="timeline-heading"
                className="text-navy mb-5 text-2xl md:text-3xl"
                style={serif}
              >
                {STATUS_LABELS[registration.status]}
              </h2>
              <Timeline registration={registration} form={form} />
              <p className="font-montserrat text-navy/60 mt-6 text-xs md:text-sm">
                Dikirim {dateTime(registration.submitted_at)}
                {registration.updated_at !== registration.submitted_at &&
                  ` · diubah ${dateTime(registration.updated_at)}`}
              </p>
              {registration.editable && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href="/daftar"
                    className="font-montserrat border-navy/30 text-navy rounded-full border bg-white px-6 py-2.5 text-sm font-bold hover:bg-white/80"
                  >
                    Ubah jawaban
                  </Link>
                  <span className="font-montserrat text-navy/60 text-xs md:text-sm">
                    Bisa diubah sampai pendaftaran ditutup atau sebelum panitia
                    memprosesnya.
                  </span>
                </div>
              )}
            </section>

            <section
              className="frost-card rounded-3xl p-6 sm:p-8"
              aria-labelledby="summary-heading"
            >
              <h2
                id="summary-heading"
                className="text-navy mb-4 text-2xl md:text-3xl"
                style={serif}
              >
                Ringkasan
              </h2>
              <dl className="font-montserrat space-y-3 text-sm">
                {registration.choices.map((code, i) => (
                  <div key={code}>
                    <dt className="text-navy/60">Pilihan {i + 1}</dt>
                    <dd className="text-navy font-semibold">
                      {divisionName(form, code)}
                    </dd>
                  </div>
                ))}
                {["nama_lengkap", "instansi", "program_studi", "whatsapp"].map(
                  (id) => {
                    const q = form.sections
                      .flatMap((s) => s.questions)
                      .find((x) => x.id === id);
                    return (
                      q && (
                        <div key={id}>
                          <dt className="text-navy/60">{q.label}</dt>
                          <dd className="text-navy">
                            {answerText(registration.answers.common[id])}
                          </dd>
                        </div>
                      )
                    );
                  }
                )}
              </dl>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
