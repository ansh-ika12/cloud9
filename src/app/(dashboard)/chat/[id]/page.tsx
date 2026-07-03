import Link from "next/link";

/**
 * Loads a past conversation's messages into the chat UI — per FRD route
 * table. Not wired up yet: there's no `conversations` table or
 * api/conversations/[id] route to fetch from. Built now so the route
 * exists and the [id] param works; swap the placeholder card below for a
 * real fetch + <ChatWindow> once that API exists.
 *
 * `params` is a Promise here (not a plain object) because this project is
 * on Next.js 16 — same reason src/lib/supabase-server.ts awaits cookies().
 */
export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 py-6 text-center">
      <div className="card-sticky card-sticky--ink max-w-md p-6">
        <h1 className="text-lg font-bold text-[var(--ink)]">
          Conversation history isn&rsquo;t connected yet
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          This page will load the saved messages for conversation{" "}
          <code className="font-mono text-xs">{id}</code> once
          api/conversations/[id] and the conversations table exist.
        </p>
        <Link href="/chat" className="btn btn-primary mt-4 text-sm">
          Start a new chat instead
        </Link>
      </div>
    </div>
  );
}