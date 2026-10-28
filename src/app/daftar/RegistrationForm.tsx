"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveRegistration } from "../actions";
import {
  answerText,
  checkQuestions,
  divisionName,
  type AnswerValue,
  type Answers,
  type Form,
  type Question,
} from "../../lib/form";
import QuestionField, { inputClass } from "./QuestionField";

type Step =
  | {
      kind: "section";
      id: string;
      title: string;
      description: string | null;
      questions: Question[];
    }
  | { kind: "choices"; title: string }
  | {
      kind: "division";
      code: string;
      rank: number;
      title: string;
      questions: Question[];
    }
  | { kind: "review"; title: string };

type Draft = { choices: string[]; answers: Answers };

const BERKAS = "berkas";

function readDraft(key: string): Draft | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export default function RegistrationForm({
  form,
  initial,
  editing,
}: {
  form: Form;
  initial: Draft;
  editing: boolean;
}) {
  const router = useRouter();
  const draftKey = `p3ri-draft-${form.code}`;
  const [choices, setChoices] = useState<string[]>(initial.choices);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [restored, setRestored] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  // A new registration picks up unsent answers saved in this browser.
  useEffect(() => {
    if (editing) return;
    const draft = readDraft(draftKey);
    if (draft) {
      const restoredAnswers = {
        common: { ...initial.answers.common, ...draft.answers?.common },
        divisions: draft.answers?.divisions ?? {},
      };
      setChoices(draft.choices ?? []);
      setAnswers(restoredAnswers);
      // Only mention it when the draft holds more than the profile prefill.
      setRestored(
        (draft.choices ?? []).length > 0 ||
          JSON.stringify(restoredAnswers.common) !==
            JSON.stringify(initial.answers.common)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on mount
  }, []);

  useEffect(() => {
    if (editing) return;
    try {
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({ choices, answers })
      );
    } catch {
      // Storage may be unavailable (private mode); the form still works.
    }
  }, [choices, answers, draftKey, editing]);

  const steps: Step[] = useMemo(() => {
    const sections = form.sections.map(
      (s): Step => ({
        kind: "section",
        id: s.id,
        title: s.title,
        description: s.description,
        questions: s.questions,
      })
    );
    const divisions = choices.filter(Boolean).map((code, i): Step => {
      const division = form.divisions.find((d) => d.code === code);
      return {
        kind: "division",
        code,
        rank: i + 1,
        title: `Pilihan ${i + 1}: ${division?.name ?? code}`,
        questions: [...form.choice_questions, ...(division?.questions ?? [])],
      };
    });
    return [
      ...sections.filter((s) => s.kind === "section" && s.id !== BERKAS),
      { kind: "choices", title: "Tentukan pilihanmu" },
      ...divisions,
      ...sections.filter((s) => s.kind === "section" && s.id === BERKAS),
      { kind: "review", title: "Periksa & kirim" },
    ];
  }, [form, choices]);

  const step = steps[Math.min(index, steps.length - 1)]!;

  useEffect(() => {
    heading.current?.focus();
  }, [index]);

  const setCommon = (id: string, value: AnswerValue | undefined) =>
    setAnswers((prev) => {
      const common = { ...prev.common };
      if (value === undefined) delete common[id];
      else common[id] = value;
      return { ...prev, common };
    });

  const setDivision = (
    code: string,
    id: string,
    value: AnswerValue | undefined
  ) =>
    setAnswers((prev) => {
      const current = { ...(prev.divisions[code] ?? {}) };
      if (value === undefined) delete current[id];
      else current[id] = value;
      return { ...prev, divisions: { ...prev.divisions, [code]: current } };
    });

  const stepErrors = (s: Step): Record<string, string> => {
    if (s.kind === "section")
      return checkQuestions(s.questions, answers.common);
    if (s.kind === "division")
      return checkQuestions(s.questions, answers.divisions[s.code]);
    if (s.kind === "choices") {
      const picked = choices.filter(Boolean);
      if (picked.length === 0)
        return { choices: "Pilih minimal satu bidang/divisi." };
      if (new Set(picked).size !== picked.length)
        return { choices: "Setiap pilihan harus berbeda." };
    }
    return {};
  };

  const go = (target: number) => {
    setErrors({});
    setSubmitError("");
    setIndex(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    const found = stepErrors(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step.kind === "choices") setChoices(choices.filter(Boolean));
    go(index + 1);
  };

  const submit = async () => {
    const firstInvalid = steps.findIndex(
      (s) => Object.keys(stepErrors(s)).length > 0
    );
    if (firstInvalid >= 0) {
      setIndex(firstInvalid);
      setErrors(stepErrors(steps[firstInvalid]!));
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const picked = choices.filter(Boolean);
    const divisions = Object.fromEntries(
      picked.map((code) => [code, answers.divisions[code] ?? {}])
    );
    const result = await saveRegistration({
      choices: picked,
      answers: { common: answers.common, divisions },
    });
    setSubmitting(false);
    if (result.error || !result.registration) {
      setSubmitError(result.error ?? "Gagal menyimpan. Coba lagi.");
      return;
    }
    try {
      window.localStorage.removeItem(draftKey);
    } catch {
      // ignore
    }
    router.push("/status?saved=1");
  };

  const progress = Math.round(((index + 1) / steps.length) * 100);

  return (
    <div className="frost-card rounded-3xl p-5 sm:p-8">
      <div className="mb-6">
        <div className="font-montserrat text-navy/70 flex items-center justify-between text-xs font-semibold md:text-sm">
          <span>
            Langkah {index + 1} dari {steps.length}
          </span>
          {editing && <span>Mengubah pendaftaran</span>}
        </div>
        <div
          className="bg-navy/10 mt-2 h-1.5 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <div
            className="bg-navy h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {restored && index === 0 && (
        <p className="font-montserrat mb-5 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
          Jawaban yang belum terkirim di perangkat ini sudah dipulihkan.
        </p>
      )}

      <h2
        ref={heading}
        tabIndex={-1}
        className="text-navy text-3xl leading-tight outline-none md:text-4xl"
        style={{ fontFamily: "var(--font-instrument-serif), serif" }}
      >
        {step.title}
      </h2>
      {step.kind === "section" && step.description && (
        <p className="font-montserrat text-navy/70 mt-2 text-sm">
          {step.description}
        </p>
      )}

      <div className="mt-6 space-y-6">
        {step.kind === "section" &&
          step.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers.common[q.id]}
              error={errors[q.id]}
              onChange={(v) => setCommon(q.id, v)}
            />
          ))}

        {step.kind === "division" &&
          step.questions.map((q) => (
            <QuestionField
              key={`${step.code}-${q.id}`}
              question={q}
              value={answers.divisions[step.code]?.[q.id]}
              error={errors[q.id]}
              onChange={(v) => setDivision(step.code, q.id, v)}
            />
          ))}

        {step.kind === "choices" && (
          <div className="space-y-4">
            <p className="font-montserrat text-navy/75 text-sm leading-relaxed">
              Pilih hingga {form.max_choices} bidang/divisi yang berbeda, urut
              dari yang paling kamu minati. Setiap pilihan punya beberapa
              pertanyaan sendiri di langkah berikutnya.
            </p>
            {Array.from({ length: form.max_choices }, (_, i) => (
              <label key={i} className="block">
                <span className="font-montserrat text-navy mb-1.5 block text-sm font-semibold md:text-base">
                  Pilihan {i + 1}
                  {i === 0 ? (
                    <span className="text-red-700"> *</span>
                  ) : (
                    <span className="text-navy/60 font-normal">
                      {" "}
                      (opsional)
                    </span>
                  )}
                </span>
                <select
                  value={choices[i] ?? ""}
                  disabled={i > 0 && !choices[i - 1]}
                  onChange={(e) => {
                    const updated = [...choices];
                    updated[i] = e.target.value;
                    // Clearing a choice clears the ones after it.
                    setChoices(e.target.value ? updated : updated.slice(0, i));
                  }}
                  className={`${inputClass} disabled:opacity-50`}
                >
                  <option value="">
                    {i === 0 ? "Pilih bidang/divisi…" : "Tidak ada"}
                  </option>
                  {form.divisions.map((d) => (
                    <option
                      key={d.code}
                      value={d.code}
                      disabled={
                        choices.includes(d.code) && choices[i] !== d.code
                      }
                    >
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {errors.choices && (
              <p role="alert" className="font-montserrat text-sm text-red-700">
                {errors.choices}
              </p>
            )}
          </div>
        )}

        {step.kind === "review" && (
          <div className="space-y-5">
            <p className="font-montserrat text-navy/75 text-sm leading-relaxed">
              Periksa lagi jawabanmu. Kamu masih bisa mengubah pendaftaran
              sampai pendaftaran ditutup, selama panitia belum memprosesnya.
            </p>
            {steps.slice(0, -1).map((s, i) => (
              <section
                key={i}
                className="rounded-2xl border border-slate-200 bg-white/70 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-montserrat text-navy text-sm font-bold md:text-base">
                    {s.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className="font-montserrat text-navy/80 hover:text-navy text-sm underline underline-offset-4"
                  >
                    Ubah
                  </button>
                </div>
                <dl className="font-montserrat mt-3 space-y-2 text-sm">
                  {s.kind === "choices" &&
                    choices.filter(Boolean).map((code, n) => (
                      <div key={code}>
                        <dt className="text-navy/60">Pilihan {n + 1}</dt>
                        <dd className="text-navy">
                          {divisionName(form, code)}
                        </dd>
                      </div>
                    ))}
                  {(s.kind === "section" || s.kind === "division") &&
                    s.questions.map((q) => {
                      const value =
                        s.kind === "section"
                          ? answers.common[q.id]
                          : answers.divisions[s.code]?.[q.id];
                      return (
                        <div key={q.id}>
                          <dt className="text-navy/60">{q.label}</dt>
                          <dd className="text-navy break-words whitespace-pre-line">
                            {answerText(value)}
                          </dd>
                        </div>
                      );
                    })}
                </dl>
              </section>
            ))}
            {submitError && (
              <p
                role="alert"
                className="font-montserrat rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>

      {Object.keys(errors).length > 0 && step.kind !== "choices" && (
        <p
          role="alert"
          className="font-montserrat mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Masih ada {Object.keys(errors).length} isian yang perlu dilengkapi.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0 || submitting}
          className="font-montserrat border-navy/30 text-navy rounded-full border bg-white px-6 py-3 text-sm font-bold hover:bg-white/80 disabled:invisible md:text-base"
        >
          Kembali
        </button>
        {step.kind === "review" ? (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="font-montserrat bg-navy hover:bg-navy/90 focus-visible:outline-navy rounded-full px-7 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 md:text-base"
          >
            {submitting
              ? "Mengirim…"
              : editing
                ? "Simpan perubahan"
                : "Kirim pendaftaran"}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="font-montserrat bg-navy hover:bg-navy/90 focus-visible:outline-navy rounded-full px-7 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 md:text-base"
          >
            Lanjut
          </button>
        )}
      </div>
    </div>
  );
}
