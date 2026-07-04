"use client";

import { useEffect, useRef } from "react";
import MessageBubble, { type ChatMessage } from "@/components/chat/MessageBubble";

/**
 * Scrollable message list — renders one MessageBubble per message and
 * auto-scrolls to the latest one, per FRD §6.2.
 *
 * ChatMessage is exported from MessageBubble.tsx for now (next file in the
 * FRONTEND list). Once src/types/index.ts exists, this type moves there so
 * every component/hook imports one shared definition instead of each
 * redefining its own.
 */
export default function ChatWindow({
  messages,
}: {
  messages: ChatMessage[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-16">
        <p className="sticky-note max-w-xs text-center text-sm font-semibold">
          Paste your code, ask a question, or request a practice problem to
          get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}