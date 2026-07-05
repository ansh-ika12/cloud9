import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route guard: anyone without a session gets bounced to /login.
  // This runs for every route inside (dashboard) — /chat and /admin both.
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--surface)] px-6 py-4">
        <Link href="/chat" className="font-display text-xl text-[var(--ink)]">
          Cloud9
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-[var(--ink-muted)] sm:inline">
            {user.email}
          </span>
          <form action={signOut}>
            <button type="submit" className="btn btn-secondary text-sm">
              Log out
            </button>
          </form>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Placeholder sidebar — becomes components/layout/Sidebar.tsx with
            real conversation history once api/conversations exists. */}
        <aside className="hidden w-60 flex-col gap-4 border-r-2 border-[var(--ink)] bg-[var(--surface)] p-4 sm:flex">
          <a href="/chat" className="btn btn-primary w-full text-sm">
            + New Chat
          </a>
          <p className="text-xs text-[var(--ink-muted)]">
            Conversation history is coming soon — each chat is separate for
            now.
          </p>
        </aside>

        <main className="flex-1 overflow-y-auto bg-grid-pastel">
          {children}
        </main>
      </div>
    </div>
  );
}