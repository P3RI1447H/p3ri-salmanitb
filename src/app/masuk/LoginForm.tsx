"use client";

import { useActionState } from "react";
import { login } from "../actions";

const input =
  "font-montserrat text-navy focus:border-navy focus:ring-navy/20 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring-4";

export default function LoginForm({
  next,
  kaderisasiUrl,
}: {
  next: string;
  kaderisasiUrl: string;
}) {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="font-montserrat text-navy mb-1.5 block text-sm font-semibold">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={input}
        />
      </label>
      <label className="block">
        <span className="font-montserrat text-navy mb-1.5 block text-sm font-semibold">
          Kata sandi
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={input}
        />
      </label>
      {state.error && (
        <p
          role="alert"
          className="font-montserrat rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="font-montserrat bg-navy hover:bg-navy/90 focus-visible:outline-navy w-full rounded-full px-6 py-3 text-base font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {pending ? "Memproses…" : "Masuk"}
      </button>
      <div className="font-montserrat text-navy/75 flex flex-wrap justify-between gap-2 text-sm">
        <a
          href={`${kaderisasiUrl}/register`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-navy underline underline-offset-4"
        >
          Belum punya akun?
        </a>
        <a
          href={`${kaderisasiUrl}/forgot`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-navy underline underline-offset-4"
        >
          Lupa kata sandi?
        </a>
      </div>
    </form>
  );
}
