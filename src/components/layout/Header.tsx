"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import Avatar from "@/components/ui/Avatar";

type HeaderProps = {
  userEmail: string;
  userName?: string;
};

/**
 * Top bar per FRD §6.1: logo left, user info + Avatar + logout right.
 * Sticky on scroll. Handles its own sign-out via supabase-client rather
 * than needing a server action passed down, so it's fully self-contained
 * and can be dropped into any dashboard page.
 *
 * Forward-references Avatar.tsx (a few files away still, in components/ui).
 */
export default function Header({ userEmail, userName }: HeaderProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--surface)] px-6 py-4">
      <Link href="/chat" className="font-display text-xl text-[var(--ink)]">
        Cloud9
      </Link>
      <div className="flex items-center gap-4">
        <Avatar name={userName ?? userEmail} />
        <span className="hidden text-sm text-[var(--ink-muted)] sm:inline">
          {userName ?? userEmail}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-secondary text-sm"
        >
          Log out
        </button>
      </div>
    </header>
  );
}