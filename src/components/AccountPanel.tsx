"use client";

import { useRef, useState, useTransition } from "react";
import { checkEmail, signIn, signUp, startGoogleLogin } from "../app/actions";
import GoogleButton from "../app/masuk/GoogleButton";

const input =
  "font-montserrat text-navy focus:border-navy focus:ring-navy/20 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring-4";
const label = "font-montserrat text-navy mb-1.5 block text-sm font-semibold";
const primary =
  "font-montserrat bg-navy hover:bg-navy/90 focus-visible:outline-navy w-full rounded-full px-6 py-3 text-base font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60";

type Stage = "email" | "password" | "create";

/**
 * One panel for signing in and signing up: Google, or email first. A known
 * email asks for the password; a new one creates the Kaderisasi account right
 * here and continues to `next`.
 */
export default function AccountPanel({
  next,
  googleEnabled,
  kaderisasiUrl,
}: {
  next: string;
  googleEnabled: boolean;
  kaderisasiUrl: string;
}) {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      if (stage === "email") {
        const result = await checkEmail(email);
        if (result.error) return setError(result.error);
        setStage(result.exists ? "password" : "create");
        setTimeout(() =>
          (result.exists ? passwordRef : nameRef).current?.focus()
        );
        return;
      }
      const result =
        stage === "password"
          ? await signIn({ email, password, next })
          : await signUp({ fullname, email, password, next });
      if (result?.exists) setStage("password");
      if (result?.error) setError(result.error);
    });
  };

  const changeEmail = () => {
    setStage("email");
    setPassword("");
    setError("");
  };

  return (
    <div>
      {googleEnabled && (
        <>
          <form action={startGoogleLogin}>
            <input type="hidden" name="next" value={next} />
            <GoogleButton />
          </form>
          <p className="font-montserrat text-navy/60 mt-2 text-center text-xs">
            Belum punya akun? Akun Kaderisasi otomatis dibuat dari akun
            Google-mu.
          </p>
          <div
            className="font-montserrat text-navy/50 my-5 flex items-center gap-3 text-xs"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-slate-300" />
            atau pakai email
            <span className="h-px flex-1 bg-slate-300" />
          </div>
        </>
      )}

      <form onSubmit={submit} className="space-y-4" noValidate>
        <label className="block">
          <span className={label}>Email</span>
          <div className="relative">
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              readOnly={stage !== "email"}
              onChange={(e) => setEmail(e.target.value)}
              className={`${input} ${stage !== "email" ? "bg-slate-50 pr-20" : ""}`}
            />
            {stage !== "email" && (
              <button
                type="button"
                onClick={changeEmail}
                className="font-montserrat text-navy/80 hover:text-navy absolute top-1/2 right-4 -translate-y-1/2 text-sm underline underline-offset-4"
              >
                Ubah
              </button>
            )}
          </div>
        </label>

        {stage === "create" && (
          <>
            <p className="font-montserrat text-navy/75 rounded-xl bg-sky-50 px-4 py-3 text-sm leading-relaxed">
              Email ini belum punya akun Kaderisasi. Buat akunnya sekarang —
              akun ini juga bisa dipakai di kaderisasi.salmanitb.com.
            </p>
            <label className="block">
              <span className={label}>Nama lengkap</span>
              <input
                ref={nameRef}
                type="text"
                autoComplete="name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className={input}
              />
            </label>
          </>
        )}

        {stage !== "email" && (
          <label className="block">
            <span className={label}>
              {stage === "create" ? "Buat kata sandi" : "Kata sandi"}
            </span>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                autoComplete={
                  stage === "create" ? "new-password" : "current-password"
                }
                required
                minLength={stage === "create" ? 6 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${input} pr-24`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="font-montserrat text-navy/80 hover:text-navy absolute top-1/2 right-4 -translate-y-1/2 text-sm underline underline-offset-4"
              >
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
            {stage === "create" && (
              <span className="font-montserrat text-navy/60 mt-1 block text-xs">
                Minimal 6 karakter.
              </span>
            )}
          </label>
        )}

        {error && (
          <p
            role="alert"
            className="font-montserrat rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button type="submit" disabled={pending} className={primary}>
          {pending
            ? "Memproses…"
            : stage === "email"
              ? "Lanjut"
              : stage === "password"
                ? "Masuk & lanjutkan"
                : "Buat akun & lanjutkan"}
        </button>

        {stage === "password" && (
          <p className="font-montserrat text-navy/75 text-center text-sm">
            <a
              href={`${kaderisasiUrl}/forgot`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-navy underline underline-offset-4"
            >
              Lupa kata sandi?
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
