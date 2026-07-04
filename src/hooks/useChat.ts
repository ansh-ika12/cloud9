"use client";

import { useState } from "react";
import type { ChatMessage, ChatMode } from "@/components/chat/MessageBubble";

/**
 * Chat state + send logic, extracted from what's currently inline in
 * (dashboard)/chat/page.tsx. Not wired into that page yet — this is the
 * reusable version to swap in later, same "build the piece now, integrate
 * later" pattern as Sidebar/Header/AuthProvider.
 *
 * Sends to /api/mentor/{mode} once that route exists; until then, falls
 * back to a placeholder reply so the hook is testable without the backend.
 */
export function useChat(initialMode: ChatMode = "debug") {
  const [mode, setMode] = useState<ChatMode>(initialMode);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const res = await fetch(`/api/mentor/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) throw new Error("Mentor request failed");

      const data = await res.json();
      const mentorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "mentor",
        content: data.reply,
        mode,
      };
      setMessages((prev) => [...prev, mentorMessage]);
    } catch {
      // api/mentor/{mode} isn't built yet — show a placeholder reply so
      // the chat flow is testable without the backend existing.
      const placeholderMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "mentor",
        content:
          "The mentor API isn't connected yet — this is a placeholder response so you can see the chat flow working.",
        mode,
      };
      setMessages((prev) => [...prev, placeholderMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return { mode, setMode, messages, isSending, sendMessage };
}