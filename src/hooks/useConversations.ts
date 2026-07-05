"use client";

import { useEffect, useState } from "react";
import type { ConversationSummary } from "@/types";

// Same shape as Sidebar.tsx's inline mock array, so swapping that
// component over to this hook later is a clean drop-in rather than a
// rewrite.
const MOCK_CONVERSATIONS: ConversationSummary[] = [
  {
    id: "1",
    title: "Fix null pointer in loop",
    mode: "debug",
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Explain closures",
    mode: "explain",
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Binary search practice",
    mode: "practice",
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Fetches the sidebar's conversation list from /api/conversations. Not
 * wired into Sidebar.tsx yet — this is the reusable version to swap in
 * once api/conversations exists. Falls back to placeholder data on
 * failure so the hook is testable without the backend existing.
 */
export function useConversations() {
  const [conversations, setConversations] = useState<ConversationSummary[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/conversations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load conversations");
        return res.json();
      })
      .then((data: ConversationSummary[]) => {
        if (isMounted) setConversations(data);
      })
      .catch(() => {
        // api/conversations isn't built yet — fall back to placeholder
        // data so the hook/UI is testable without the backend existing.
        if (isMounted) setConversations(MOCK_CONVERSATIONS);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { conversations, isLoading };
}