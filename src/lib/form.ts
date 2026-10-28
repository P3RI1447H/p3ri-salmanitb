// Types and checks for the P3RI form served by GET /v2/p3ri/form. The API
// (kaderisasi-web-be-go internal/p3ri) validates again on save; these checks
// only give the applicant early, per-step feedback.

export type QuestionType =
  | "short"
  | "long"
  | "date"
  | "radio"
  | "dropdown"
  | "checkbox"
  | "scale"
  | "grid"
  | "file";

export type Question = {
  id: string;
  label: string;
  help?: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  other?: boolean;
  min?: number;
  max?: number;
  rows?: string[];
  columns?: string[];
  accept?: string[];
};

export type Section = {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
};

export type Division = { code: string; name: string; questions: Question[] };

export type Form = {
  code: string;
  title: string;
  opens_at: string;
  closes_at: string;
  is_open: boolean;
  intro: string[];
  contacts: { name: string; role: string; whatsapp: string | null }[];
  guidebook_url: string | null;
  faq_url: string | null;
  max_choices: number;
  sections: Section[];
  choice_questions: Question[];
  divisions: Division[];
};

export type UploadedFile = {
  field?: string;
  key: string;
  name: string;
  mime: string;
  size: number;
};

export type AnswerValue =
  | string
  | number
  | string[]
  | Record<string, string>
  | UploadedFile;

export type Answers = {
  common: Record<string, AnswerValue>;
  divisions: Record<string, Record<string, AnswerValue>>;
};

export type Status = "terdaftar" | "diterima";

export type Registration = {
  id: number;
  status: Status;
  choices: string[];
  accepted_division: string | null;
  answers: Answers;
  files: UploadedFile[];
  editable: boolean;
  submitted_at: string;
  updated_at: string;
  status_updated_at: string | null;
};

export const STATUS_STEPS: { status: Status; label: string; hint: string }[] = [
  {
    status: "terdaftar",
    label: "Terdaftar",
    hint: "Pendaftaranmu sudah kami terima. Panitia akan meninjaunya dan mengabarkan hasilnya.",
  },
  {
    status: "diterima",
    label: "Diterima",
    hint: "Selamat! Kamu diterima sebagai panitia P3RI.",
  },
];

export const STATUS_LABELS: Record<Status, string> = {
  terdaftar: "Terdaftar",
  diterima: "Diterima",
};

export const MAX_SHORT = 300;
export const MAX_LONG = 3000;

export const emptyAnswers = (): Answers => ({ common: {}, divisions: {} });

export const divisionName = (form: Form, code: string) =>
  form.divisions.find((d) => d.code === code)?.name ?? code;

/** Returns an Indonesian error for one answer, or null when it is valid. */
export function checkAnswer(
  q: Question,
  value: AnswerValue | undefined
): string | null {
  const blank =
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0);
  switch (q.type) {
    case "grid": {
      const grid = (value ?? {}) as Record<string, string>;
      const missing = (q.rows ?? []).find((row) => !grid[row]);
      if (q.required && missing) return `Isi baris "${missing}".`;
      return null;
    }
    case "file": {
      const file = value as UploadedFile | undefined;
      if (q.required && !file?.key) return "Unggah berkas ini.";
      return null;
    }
  }
  if (blank) return q.required ? "Wajib diisi." : null;
  if (typeof value === "string") {
    const limit = q.type === "long" ? MAX_LONG : MAX_SHORT;
    if (value.trim().length > limit) return `Maksimal ${limit} karakter.`;
  }
  return null;
}

export function checkQuestions(
  questions: Question[],
  answers: Record<string, AnswerValue> | undefined
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of questions) {
    const error = checkAnswer(q, answers?.[q.id]);
    if (error) errors[q.id] = error;
  }
  return errors;
}

/** Renders a stored answer as text for the summary. */
export function answerText(value: unknown): string {
  if (value === undefined || value === null || value === "") return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    if ("key" in (value as object)) return (value as UploadedFile).name;
    return Object.entries(value as Record<string, string>)
      .map(([row, column]) => `${row}: ${column}`)
      .join("\n");
  }
  return String(value);
}
