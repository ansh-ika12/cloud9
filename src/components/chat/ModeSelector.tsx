"use client";

import type { ChatMode } from "@/types";

const MODES: { id: ChatMode; label: string; activeClass: string }[] = [
  { id: "debug", label: "Debug", activeClass: "bg-[var(--bg-pink)]" },
  { id: "explain", label: "Explain", activeClass: "bg-[var(--bg-blue)]" },
  { id: "practice", label: "Practice", activeClass: "bg-[var(--bg-mint)]" },
];

/**
 * Three pill toggles per FRD §6.2 / §4 — each mode keeps its mapped color
 * when active (pink/blue/mint, the same 3-color palette used everywhere
 * else). Inactive states are plain white with an ink outline, same as the
 * black-outline direction used on the landing page.
 */
export default function ModeSelector({
  mode,
  onChange,
}: {
  mode: ChatMode;
  onChange: (mode: ChatMode) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Mentor mode" className="flex gap-3">
      {MODES.map((m) => {
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(m.id)}
            className={`btn text-sm ${
              isActive ? `${m.activeClass} text-[var(--ink)]` : "btn-secondary"
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}