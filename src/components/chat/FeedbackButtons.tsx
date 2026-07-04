"use client";

import { useState } from "react";

type Rating = "up" | "down";

/**
 * Thumbs up/down under each mentor reply, per FRD §6.2. Optimistically
 * updates on click, then POSTs to /api/feedback (not built yet — this call
 * will 404 until that route exists, but the optimistic UI and "Thanks!"
 * toast work regardless, so the interaction is testable now).
 */
export default function FeedbackButtons({
  messageId,
}: {
  messageId: string;
}) {
  const [rating, setRating] = useState<Rating | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  async function handleRate(next: Rating) {
    setRating(next); // optimistic
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2000);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, rating: next }),
      });
      if (!res.ok) throw new Error("Feedback request failed");
    } catch {
      // api/feedback isn't built yet — silently keep the optimistic state
      // rather than rolling it back, so this component is testable without
      // the backend existing yet.
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Good response"
        aria-pressed={rating === "up"}
        onClick={() => handleRate("up")}
        className={`text-lg transition-transform hover:scale-110 ${
          rating === "up" ? "" : "opacity-50"
        }`}
      >
        👍
      </button>
      <button
        type="button"
        aria-label="Bad response"
        aria-pressed={rating === "down"}
        onClick={() => handleRate("down")}
        className={`text-lg transition-transform hover:scale-110 ${
          rating === "down" ? "" : "opacity-50"
        }`}
      >
        👎
      </button>
      {showThanks && (
        <span
          role="status"
          aria-live="polite"
          className="text-xs font-semibold text-[var(--ink-muted)]"
        >
          Thanks!
        </span>
      )}
    </div>
  );
}