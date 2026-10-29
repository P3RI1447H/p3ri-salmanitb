import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import WinterBackground from "../components/WinterBackground";
import { getForm, getToken } from "../lib/api";
import type { Form } from "../lib/form";

const COMING = [..."Coming"];

const deadline = (form: Form) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(form.closes_at));

/** Registration is past its deadline (not merely not yet open). */
function hasClosed(form: Form): boolean {
  return Date.now() >= new Date(form.closes_at).getTime();
}

async function loadForm(): Promise<Form | null> {
  try {
    return await getForm();
  } catch {
    return null;
  }
}

const button =
  "font-montserrat focus-visible:outline-navy inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:text-base";

export default async function Home() {
  const [form, token] = await Promise.all([loadForm(), getToken()]);
  const signedIn = Boolean(token);
  const closed = form !== null && hasClosed(form);

  return (
    <main
      id="main-content"
      className="winter relative isolate flex min-h-svh flex-col"
    >
      <WinterBackground />
      <SiteHeader signedIn={signedIn} />

      {form?.is_open ? (
        <section
          aria-labelledby="oprec-heading"
          className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6"
        >
          <p className="font-montserrat text-olive text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">
            Open Recruitment
          </p>
          <h1
            id="oprec-heading"
            className="title-glow text-navy mt-3 text-6xl leading-[0.95] sm:text-7xl md:text-8xl"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            Panitia P3RI
            <br />
            1448 H
          </h1>
          <div className="font-montserrat text-navy/85 mt-6 space-y-3 text-sm leading-relaxed md:text-base">
            {form.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="font-montserrat text-olive mt-6 text-sm font-semibold md:text-base">
            Pendaftaran ditutup {deadline(form)} WIB
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/daftar"
              className={`${button} bg-navy hover:bg-navy/90 text-white`}
            >
              Daftar sekarang
            </Link>
            {signedIn && (
              <Link
                href="/status"
                className={`${button} border-navy/30 text-navy border bg-white/60 hover:bg-white/80`}
              >
                Lihat status
              </Link>
            )}
          </div>
          {form.contacts.length > 0 && (
            <p className="font-montserrat text-navy/70 mt-5 text-xs md:text-sm">
              Ada pertanyaan? Hubungi{" "}
              {form.contacts.map((c) => `${c.name} (${c.role})`).join(" atau ")}
              .
            </p>
          )}
        </section>
      ) : (
        <section
          aria-labelledby="coming-soon-heading"
          className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center"
        >
          {closed ? (
            <h1
              id="coming-soon-heading"
              className="title-glow text-navy text-6xl leading-[0.95] sm:text-7xl md:text-8xl"
              style={{ fontFamily: "var(--font-instrument-serif), serif" }}
            >
              Pendaftaran
              <br />
              Ditutup
            </h1>
          ) : (
            <h1
              id="coming-soon-heading"
              aria-label="Coming Soon"
              className="title-glow text-navy flex flex-col items-center leading-none"
            >
              <span aria-hidden="true" className="display-word flex items-end">
                {COMING.map((letter, i) => {
                  // Bend the word along a gentle arch: middle letters rise, ends tip outward.
                  const t =
                    (i - (COMING.length - 1) / 2) / ((COMING.length - 1) / 2);
                  return (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        transform: `translateY(${t * t * 0.14}em) rotate(${t * 6}deg)`,
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
              <span aria-hidden="true" className="display-word mt-[0.08em]">
                Soon
              </span>
            </h1>
          )}

          <p className="font-montserrat text-olive mt-4 max-w-sm text-sm leading-relaxed font-medium md:text-base">
            {closed
              ? "Terima kasih sudah mendaftar. Pantau status pendaftaranmu di halaman status."
              : "Di tengah musim dingin, kami sedang menyiapkan rumah hangat untuk berkumpul kembali. Nantikan program Ramadhan dan Idul Adha bersama P3RI Salman ITB."}
          </p>
          {closed && (
            <Link
              href="/status"
              className={`${button} bg-navy hover:bg-navy/90 mt-6 text-white`}
            >
              Lihat status
            </Link>
          )}
        </section>
      )}

      <footer className="px-6 pb-8 text-center md:px-12 md:pb-10">
        <a
          href="https://www.instagram.com/p3ri.salmanitb"
          target="_blank"
          rel="noopener noreferrer"
          className="font-montserrat text-navy/80 hover:text-navy focus-visible:outline-navy text-xs font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 md:text-sm"
        >
          Ikuti kabar terbaru di @p3ri.salmanitb
        </a>
      </footer>
    </main>
  );
}
