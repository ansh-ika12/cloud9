"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConversations } from "@/hooks/useConversations";

const MODE_BADGE_CLASS: Record<string, string> = {
  debug: "bg-[var(--bg-pink)]",
  explain: "bg-[var(--bg-blue)]",
  practice: "bg-[var(--bg-mint)]",
};

function formatRelativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString();
}

function SidebarContent() {
  const pathname = usePathname();
  const activeId = pathname.startsWith("/chat/")
    ? pathname.split("/chat/")[1]
    : undefined;
  const { conversations, isLoading } = useConversations();

  return (
    <>
      {/* Plain <a>, not <Link> — forces a full reload so chat state resets
          even when already sitting on /chat (Link skips navigation
          entirely when the target URL matches the current one). */}
      <a href="/chat" className="btn btn-primary w-full text-sm">
        + New Chat
      </a>

      <nav className="mt-4 flex-1 space-y-2 overflow-y-auto">
        {isLoading && (
          <p className="text-xs text-[var(--ink-muted)]">Loading…</p>
        )}
        {!isLoading && conversations.length === 0 && (
          <p className="text-xs text-[var(--ink-muted)]">
            No conversations yet — start one above.
          </p>
        )}
        {conversations.map((conversation) => {
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
                  {formatRelativeDate(conversation.updatedAt)}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

/**
 * Left sidebar per FRD §6.1: New Chat button + scrollable conversation
 * list, each row showing title + mode badge + relative date. Active
 * conversation gets the sticky-note shadow. Collapses to a
 * hamburger-triggered drawer below md (768px), per FRD §8.
 *
 * Now backed by real data via useConversations() (GET /api/conversations)
 * instead of the mock array this used to render. Active conversation is
 * derived from the URL via usePathname() rather than a prop, since the
 * (dashboard) layout that renders this sidebar sits above both /chat and
 * /chat/[id] and can't see the [id] param directly.
 */
export default function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-64 flex-col border-r-2 border-[var(--ink)] bg-[var(--surface)] p-4 md:flex">
        <SidebarContent />
      </aside>

      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open conversation history"
        className="btn btn-secondary fixed left-4 top-20 z-20 text-sm md:hidden"
      >
        ☰
      </button>

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
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
