"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";

export default function GoogleButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-montserrat text-navy focus-visible:outline-navy flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
    >
      <Image src="/images/google-logo.png" width={20} height={20} alt="" />
      {pending ? "Mengalihkan…" : "Lanjutkan dengan Google"}
    </button>
  );
}
