import type { ReactNode } from "react";

type BadgeTone =
  | "debug"
  | "explain"
  | "practice"
  | "success"
  | "warning"
  | "neutral";

const TONE_CLASS: Record<BadgeTone, string> = {
  debug: "bg-[var(--bg-pink)]",
  explain: "bg-[var(--bg-blue)]",
  practice: "bg-[var(--bg-mint)]",
  success: "bg-[var(--success)]",
  warning: "bg-[var(--warning)]",
  neutral: "bg-[var(--surface-alt)]",
};

/**
 * Small colored pill, per FRD §6.3 — primarily for mode tags
 * (debug/explain/practice, §4 colors), also reused for status pills
 * (active/processing/archived) on the admin page since the same shape
 * fits both jobs.
 */
export default function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full border border-[var(--ink)] px-2 py-0.5 text-xs font-semibold text-[var(--ink)] ${TONE_CLASS[tone]} ${className}`}
    >
      {children}
    </span>
  );
}