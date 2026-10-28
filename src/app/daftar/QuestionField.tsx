"use client";

import { useId, useState } from "react";
import type { AnswerValue, Question, UploadedFile } from "../../lib/form";

export const inputClass =
  "font-montserrat text-navy focus:border-navy focus:ring-navy/20 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:ring-4";

const choiceClass =
  "font-montserrat text-navy has-[:checked]:border-navy has-[:checked]:bg-navy/5 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm md:text-base";

const MAX_SIDE = 1600;

/** Shrinks a photo to at most 1600px and re-encodes it as JPEG. */
async function compress(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Browser tidak mendukung unggahan foto.");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function FileField({
  value,
  onChange,
  describedBy,
}: {
  value: UploadedFile | undefined;
  onChange: (value: UploadedFile | undefined) => void;
  describedBy?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const upload = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Unggah foto (JPG, PNG, atau WebP).");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await compress(file);
      const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      const res = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mime: "image/jpeg",
          size: file.size,
          dataUrl,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        message?: string;
        data?: UploadedFile;
      };
      if (!res.ok || !body.data)
        throw new Error(body.message || "Unggahan gagal.");
      onChange(body.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unggahan gagal.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-3">
      {value?.key && (
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- private file served by our own route */}
          <img
            src={`/api/files?key=${encodeURIComponent(value.key)}`}
            alt={value.name}
            className="h-24 w-24 rounded-xl border border-slate-200 object-cover"
          />
          <div className="font-montserrat text-navy/80 min-w-0 text-sm">
            <p className="truncate font-semibold">{value.name}</p>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="mt-1 text-red-700 underline underline-offset-4"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
      <label className="font-montserrat border-navy/30 text-navy hover:bg-navy/5 inline-flex cursor-pointer items-center rounded-full border bg-white px-5 py-2.5 text-sm font-semibold">
        {busy ? "Mengunggah…" : value?.key ? "Ganti foto" : "Pilih foto"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={busy}
          aria-describedby={describedBy}
          onChange={(event) => {
            void upload(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      {error && (
        <p role="alert" className="font-montserrat text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuestionField({
  question: q,
  value,
  error,
  onChange,
}: {
  question: Question;
  value: AnswerValue | undefined;
  error?: string;
  onChange: (value: AnswerValue | undefined) => void;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy =
    [q.help ? helpId : "", error ? errorId : ""].filter(Boolean).join(" ") ||
    undefined;
  const text = typeof value === "string" ? value : "";
  const list = Array.isArray(value) ? value : [];
  const isOther = q.other && text !== "" && !q.options?.includes(text);
  const [otherText, setOtherText] = useState(isOther ? text : "");
  const listOther = list.filter((v) => !q.options?.includes(v))[0] ?? "";

  const label = (
    <span className="font-montserrat text-navy block text-sm font-semibold md:text-base">
      {q.label}
      {q.required && (
        <span className="text-red-700" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </span>
  );
  const help = q.help && (
    <span
      id={helpId}
      className="font-montserrat text-navy/65 mt-1 block text-xs leading-relaxed whitespace-pre-line md:text-sm"
    >
      {q.help}
    </span>
  );

  let control: React.ReactNode;
  switch (q.type) {
    case "short":
    case "date":
      control = (
        <input
          id={id}
          type={q.type === "date" ? "date" : "text"}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={inputClass}
        />
      );
      break;
    case "long":
      control = (
        <textarea
          id={id}
          rows={4}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={inputClass}
        />
      );
      break;
    case "dropdown":
      control = (
        <select
          id={id}
          value={text}
          onChange={(e) => onChange(e.target.value || undefined)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={inputClass}
        >
          <option value="">Pilih…</option>
          {q.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
      break;
    case "radio":
      control = (
        <div
          className="grid gap-2 sm:grid-cols-2"
          role="radiogroup"
          aria-describedby={describedBy}
        >
          {q.options?.map((option) => (
            <label key={option} className={choiceClass}>
              <input
                type="radio"
                name={id}
                checked={text === option}
                onChange={() => onChange(option)}
                className="accent-navy h-4 w-4"
              />
              {option}
            </label>
          ))}
          {q.other && (
            <label className={`${choiceClass} sm:col-span-2`}>
              <input
                type="radio"
                name={id}
                checked={Boolean(isOther)}
                onChange={() => onChange(otherText || " ")}
                className="accent-navy h-4 w-4"
              />
              <span className="shrink-0">Yang lain:</span>
              <input
                type="text"
                value={otherText}
                aria-label={`${q.label}, yang lain`}
                onChange={(e) => {
                  setOtherText(e.target.value);
                  onChange(e.target.value);
                }}
                className="border-navy/30 min-w-0 flex-1 border-b bg-transparent px-1 py-0.5 outline-none"
              />
            </label>
          )}
        </div>
      );
      break;
    case "checkbox":
      control = (
        <div
          className="grid gap-2 sm:grid-cols-2"
          aria-describedby={describedBy}
        >
          {q.options?.map((option) => (
            <label key={option} className={choiceClass}>
              <input
                type="checkbox"
                checked={list.includes(option)}
                onChange={(e) =>
                  onChange(
                    e.target.checked
                      ? [...list, option]
                      : list.filter((v) => v !== option)
                  )
                }
                className="accent-navy h-4 w-4"
              />
              {option}
            </label>
          ))}
          {q.other && (
            <label className={`${choiceClass} sm:col-span-2`}>
              <span className="shrink-0">Yang lain:</span>
              <input
                type="text"
                value={listOther}
                aria-label={`${q.label}, yang lain`}
                onChange={(e) => {
                  const kept = list.filter((v) => q.options?.includes(v));
                  onChange(e.target.value ? [...kept, e.target.value] : kept);
                }}
                className="border-navy/30 min-w-0 flex-1 border-b bg-transparent px-1 py-0.5 outline-none"
              />
            </label>
          )}
        </div>
      );
      break;
    case "scale": {
      const numbers = Array.from(
        { length: (q.max ?? 5) - (q.min ?? 1) + 1 },
        (_, i) => (q.min ?? 1) + i
      );
      control = (
        <div
          className="flex gap-2"
          role="radiogroup"
          aria-describedby={describedBy}
        >
          {numbers.map((n) => (
            <label
              key={n}
              className="font-montserrat text-navy has-[:checked]:bg-navy has-[:checked]:border-navy flex h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white text-base font-semibold has-[:checked]:text-white sm:max-w-16"
            >
              <input
                type="radio"
                name={id}
                checked={value === n}
                onChange={() => onChange(n)}
                className="sr-only"
              />
              {n}
            </label>
          ))}
        </div>
      );
      break;
    }
    case "grid": {
      const grid = (value ?? {}) as Record<string, string>;
      control = (
        <div className="space-y-2" aria-describedby={describedBy}>
          {q.rows?.map((row) => (
            <fieldset
              key={row}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <legend className="sr-only">{row}</legend>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-montserrat text-navy text-sm">{row}</span>
                <div className="flex gap-2">
                  {q.columns?.map((column) => (
                    <label
                      key={column}
                      className="font-montserrat text-navy has-[:checked]:bg-navy has-[:checked]:border-navy cursor-pointer rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold has-[:checked]:text-white md:text-sm"
                    >
                      <input
                        type="radio"
                        name={`${id}-${row}`}
                        checked={grid[row] === column}
                        onChange={() => onChange({ ...grid, [row]: column })}
                        className="sr-only"
                      />
                      {column}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>
          ))}
        </div>
      );
      break;
    }
    case "file":
      control = (
        <FileField
          value={value as UploadedFile | undefined}
          onChange={onChange}
          describedBy={describedBy}
        />
      );
      break;
  }

  const grouped =
    q.type !== "short" &&
    q.type !== "long" &&
    q.type !== "date" &&
    q.type !== "dropdown";
  return (
    <div className="space-y-2">
      {grouped ? (
        <div>
          {label}
          {help}
        </div>
      ) : (
        <label htmlFor={id} className="block">
          {label}
          {help}
        </label>
      )}
      {control}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-montserrat text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
