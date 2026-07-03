import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for Client Components — anything with "use client" at the
 * top (login/signup forms, chat UI, etc.). Runs in the browser.
 *
 * For Server Components, Server Actions, and Route Handlers, use
 * `createClient` from `@/lib/supabase-server` instead — different cookie
 * handling is required on the server.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}