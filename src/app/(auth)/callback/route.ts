import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

/**
 * Where Supabase sends the user back to after Google OAuth. The login page
 * calls signInWithOAuth with redirectTo pointing here — Supabase appends a
 * one-time `code` param, which gets traded for a real session below.
 *
 * This is a Route Handler (route.ts), not a page — it never renders
 * anything, it just does the exchange and immediately redirects onward.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/chat";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code, or the exchange failed — send them back to login with a flag
  // rather than leaving them stuck on a blank redirect page.
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}