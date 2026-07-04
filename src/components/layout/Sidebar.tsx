"use client";

import { useState } from "react";
import Link from "next/link";

type ConversationMode = "debug" | "explain" | "practice";

type Conversation = {
  id: string;
  title: string;
  mode: ConversationMode;
  relativeDate: string;
};

// Placeholder data — real list loads from api/conversations via the
// useConversations hook once both exist. Standing in so the sidebar has
// something to show.
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    title: "Fix null pointer in loop",
    mode: "debug",
    relativeDate: "2h ago",
  },
  {
    id: "2",
    title: "Explain closures",
    mode: "explain",
    relativeDate: "Yesterday",
  },
  {
    id: "3",
    title: "Binary search practice",
    mode: "practice",
    relativeDate: "3d ago",
  },
];

const MODE_BADGE_CLASS: Record<ConversationMode, string> = {
  debug: "bg-[var(--bg-pink)]",
  explain: "bg-[var(--bg-blue)]",
  practice: "bg-[var(--bg-mint)]",
};

function SidebarContent({ activeId }: { activeId?: string }) {
  return (
    <>
      <Link href="/chat" className="btn btn-primary w-full text-sm">
        + New Chat
      </Link>

      <nav className="mt-4 flex-1 space-y-2 overflow-y-auto">
        {MOCK_CONVERSATIONS.map((conversation) => {
          const isActive = conversation.id === activeId;
          return (
            <Link
              key={conversation.id}
              href={`/chat/${conversation.id}`}
              className={`block rounded-lg border-2 border-[var(--ink)] p-3 ${
                isActive
                  ? "card-sticky card-sticky--ink"
                  : "bg-[var(--surface)]"
              }`}
            >
              <p className="truncate text-sm font-medium text-[var(--ink)]">
                {conversation.title}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span
                  className={`rounded-full border border-[var(--ink)] px-2 py-0.5 text-xs font-semibold ${MODE_BADGE_CLASS[conversation.mode]}`}
                >
                  {conversation.mode}
                </span>
                <span className="text-xs text-[var(--ink-muted)]">
                  {conversation.relativeDate}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <p className="mt-2 text-xs text-[var(--ink-muted)]">
        Showing placeholder conversations — real history loads once
        api/conversations is connected.
      </p>
    </>
  );
}

/**
 * Left sidebar per FRD §6.1: New Chat button + scrollable conversation
 * list, each row showing title + mode badge + relative date. Active
 * conversation gets the sticky-note shadow. Collapses to a
 * hamburger-triggered drawer below md (768px), per FRD §8.
 */
export default function Sidebar({ activeId }: { activeId?: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside className="hidden w-64 flex-col border-r-2 border-[var(--ink)] bg-[var(--surface)] p-4 md:flex">
        <SidebarContent activeId={activeId} />
      </aside>

      {/* Mobile: hamburger trigger */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open conversation history"
        className="btn btn-secondary fixed left-4 top-20 z-20 text-sm md:hidden"
      >
        ☰
      </button>

      {/* Mobile: slide-over drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-[var(--ink)]/40"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r-2 border-[var(--ink)] bg-[var(--surface)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-lg text-[var(--ink)]">
                Cloud9
              </span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close conversation history"
                className="text-lg text-[var(--ink)]"
              >
                ✕
              </button>
            </div>
            <SidebarContent activeId={activeId} />
          </aside>
        </div>
      )}
    </>
  );
}