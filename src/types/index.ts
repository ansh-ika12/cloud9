import type { Session, User } from "@supabase/supabase-js";

/**
 * Consolidated from where these were temporarily defined:
 * ChatMode/ChatMessage — components/chat/MessageBubble.tsx
 * ConversationSummary  — hooks/useConversations.ts
 * AuthContextValue     — components/providers/AuthProvider.tsx
 * Every file that used its own local copy now imports from here instead.
 */

export type ChatMode = "debug" | "explain" | "practice";

export type ChatMessage = {
  id: string;
  role: "user" | "mentor";
  content: string;
  mode?: ChatMode; // only set on mentor messages, for the window-chrome tint
};

export type ConversationSummary = {
  id: string;
  title: string;
  mode: ChatMode;
  updatedAt: string;
};

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};