"use client";

export const CODE_INPUT_CHAR_LIMIT = 5000;
export const CODE_INPUT_MIN_CHARS = 10;

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Other",
];

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

/**
 * Monospace code/question input with a language selector and a 0/5000
 * character counter, per FRD §6.2 and the validation states in §9.
 * Submitting stays with the parent (Send button lives on the chat page) —
 * this component only owns the input itself and its validation messaging.
 */
export default function CodeInput({
  value,
  onChange,
  language,
  onLanguageChange,
  disabled,
  placeholder = "Paste code that's breaking, or ask a question...",
}: CodeInputProps) {
  const isTooShort =
    value.trim().length > 0 && value.trim().length < CODE_INPUT_MIN_CHARS;
  const isTooLong = value.length > CODE_INPUT_CHAR_LIMIT;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="code-input"
          className="text-sm font-semibold text-[var(--ink)]"
        >
          Your code or question
        </label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={disabled}
          className="rounded-md border-2 border-[var(--ink)] bg-[var(--surface)] px-2 py-1 text-xs font-semibold text-[var(--ink)] focus-visible:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <textarea
        id="code-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--ink)] focus-visible:outline-none disabled:opacity-60"
      />

      <div className="mt-2 flex items-center justify-between">
        <span
          className="text-xs font-medium"
          style={{ color: isTooLong ? "var(--danger)" : "var(--ink-muted)" }}
        >
          {value.length} / {CODE_INPUT_CHAR_LIMIT}
        </span>
        {isTooLong && (
          <span
            className="text-xs font-medium"
            style={{ color: "var(--danger)" }}
          >
            Please paste only the relevant function.
          </span>
        )}
        {!isTooLong && isTooShort && (
          <span className="text-xs text-[var(--ink-muted)]">
            Please paste your code or type a question.
          </span>
        )}
      </div>
    </div>
  );
}