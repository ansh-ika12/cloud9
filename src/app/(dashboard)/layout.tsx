import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Sidebar from "@/components/layout/Sidebar";

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
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-grid-pastel">
          {children}
        </main>
      </div>
    </div>
  );
}
