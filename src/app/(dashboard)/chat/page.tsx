"use client";

import { useState } from "react";

type ModeId = "debug" | "explain" | "practice";

const MODES: { id: ModeId; label: string; cardClass: string }[] = [
  { id: "debug", label: "Debug", cardClass: "card-sticky--pink" },
  { id: "explain", label: "Explain", cardClass: "card-sticky--blue" },
  { id: "practice", label: "Practice", cardClass: "card-sticky--mint" },
];

const CHAR_LIMIT = 5000;

type Message = {
  id: string;
  role: "user" | "mentor";
  content: string;
};

export default function ChatPage() {
  const [mode, setMode] = useState<ModeId>("debug");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const isOverLimit = input.length > CHAR_LIMIT;
  const canSubmit = input.trim().length >= 10 && !isOverLimit;
  const activeModeCardClass = MODES.find((m) => m.id === mode)?.cardClass;

  function sendMessage() {
    if (!canSubmit) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    // Placeholder reply — src/app/api/mentor/* isn't built yet, so this
    // just proves the chat UI works end-to-end until that's wired up.
    const mentorMessage: Message = {
      id: crypto.randomUUID(),
      role: "mentor",
      content:
        "The mentor API isn't connected yet — this is a placeholder response so you can see the chat flow working.",
    };

    setMessages((prev) => [...prev, userMessage, mentorMessage]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter inserts a newline (native textarea
    // behavior) instead of submitting.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
      <div className="mb-6 flex gap-3">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`btn text-sm ${
              mode === m.id ? "btn-primary" : "btn-secondary"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center py-16">
            <p className="sticky-note max-w-xs text-center text-sm font-semibold">
              Paste your code, ask a question, or request a practice problem
              to get started.
            </p>
          </div>
        ) : (
          messages.map((message) =>
            message.role === "user" ? (
              <div
                key={message.id}
                className="ml-auto max-w-[80%] rounded-lg bg-[var(--ink)] px-4 py-3 text-sm text-[var(--surface)]"
              >
                {message.content}
              </div>
            ) : (
              <div
                key={message.id}
                className={`card-sticky ${activeModeCardClass} mr-auto max-w-[80%]`}
              >
                <div className="window-chrome">
                  <span className="window-chrome__dot" />
                  <span className="window-chrome__dot" />
                  <span className="window-chrome__dot" />
                </div>
                <p className="p-4 text-sm leading-relaxed text-[var(--ink)]">
                  {message.content}
                </p>
              </div>
            )
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          placeholder="Paste code that's breaking, or ask a question..."
          className="w-full rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] p-4 font-mono text-sm text-[var(--ink)] focus-visible:outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: isOverLimit ? "var(--danger)" : "var(--ink-muted)" }}
          >
            {input.length} / {CHAR_LIMIT}
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn btn-primary text-sm disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}