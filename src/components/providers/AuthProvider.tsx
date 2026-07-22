"use client";

import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import type { AuthContextValue } from "@/types";
import { createClient } from "@/lib/supabase-client";

/**
 * The context object itself — exported so useAuth.ts (next file in the
 * list) can read it via useContext. Components should use the useAuth()
 * hook once it exists rather than importing this directly.
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

/**
 * Wraps the app in a React Context exposing the current session/user, per
 * FRD §6.1. Subscribes to Supabase's onAuthStateChange so the whole app
 * reacts immediately to login/logout/token refresh, instead of only
 * reading the session once on load.
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // "Keep me logged in" enforcement — see login/page.tsx for where these
    // flags get set. sessionStorage clears on an actual browser close;
    // Supabase's own cookie session can otherwise outlive that by design.
    // If "false" was chosen last time and the session marker is gone, the
    // browser was closed and reopened since — sign out instead of quietly
    // honoring a cookie that outlived what the person actually asked for.
    const rememberMe = localStorage.getItem("cloud9-remember-me");
    const sessionStillActive = sessionStorage.getItem("cloud9-session-active");

    if (rememberMe === "false" && !sessionStillActive) {
      localStorage.removeItem("cloud9-remember-me");
      supabase.auth.signOut().finally(() => {
        setSession(null);
        setIsLoading(false);
        router.push("/");
        router.refresh();
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}