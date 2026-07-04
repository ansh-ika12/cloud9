import FeedbackButtons from "@/components/chat/FeedbackButtons";

export type ChatMode = "debug" | "explain" | "practice";

export type ChatMessage = {
  id: string;
  role: "user" | "mentor";
  content: string;
  mode?: ChatMode; // only set on mentor messages, for the window-chrome tint
};

const MODE_CARD_CLASS: Record<ChatMode, string> = {
  debug: "card-sticky--pink",
  explain: "card-sticky--blue",
  practice: "card-sticky--mint",
};

/**
 * Two variants per FRD §6.2:
 * - user: right-aligned, solid ink fill, white text, monospace (most user
 *   messages are pasted code, so monospace by default reads better)
 * - mentor: left-aligned white "window" card, 3-dot chrome tinted to the
 *   message's mode, FeedbackButtons row beneath
 *
 * Body renders as plain text with line breaks preserved, not full Markdown
 * + syntax highlighting — that needs react-markdown, which isn't installed.
 * Straightforward to upgrade later; flag if you want it now instead.
 */
export default function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="ml-auto max-w-[80%] whitespace-pre-wrap rounded-lg bg-[var(--ink)] px-4 py-3 font-mono text-sm text-[var(--surface)]">
        {message.content}
      </div>
    );
  }

  const cardClass = MODE_CARD_CLASS[message.mode ?? "debug"];

  return (
    <div className={`card-sticky ${cardClass} mr-auto max-w-[80%]`}>
      <div className="window-chrome">
        <span className="window-chrome__dot" />
        <span className="window-chrome__dot" />
        <span className="window-chrome__dot" />
      </div>
      <p className="whitespace-pre-wrap p-4 text-sm leading-relaxed text-[var(--ink)]">
        {message.content}
      </p>
      <div className="border-t border-[var(--ink)]/10 px-4 py-2">
        <FeedbackButtons messageId={message.id} />
      </div>
    </div>
  );
}