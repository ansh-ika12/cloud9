import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

/**
 * Styled text input with label + inline error message, per FRD §6.3.
 * Reusable version of the <label>+<input> pairs currently duplicated
 * inline in login/signup — swap those in when convenient, not required.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = "", ...props },
  ref
) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-[var(--ink)]"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`mt-1 w-full rounded-lg border-2 bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] focus-visible:outline-none ${
          error ? "border-[var(--danger)]" : "border-[var(--ink)]"
        } ${className}`}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1 text-xs font-medium"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;