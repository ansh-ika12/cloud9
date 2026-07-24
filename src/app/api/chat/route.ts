import { NextRequest, NextResponse } from "next/server";
import { getMentorResponse } from "@/lib/generate";
import type { MentorMode } from "@/prompts/mentorPrompt";
import { createClient } from "@/lib/supabase-server";

const VALID_MODES: MentorMode[] = ["debug", "explain", "practice"];

function makeTitle(message: string): string {
  const trimmed = message.trim().replace(/\s+/g, " ");
  return trimmed.length > 60 ? trimmed.slice(0, 57) + "..." : trimmed;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, message, conversationId } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "A non-empty 'message' string is required." },
        { status: 400 }
      );
    }

    if (!mode || !VALID_MODES.includes(mode)) {
      return NextResponse.json(
        { error: `'mode' must be one of: ${VALID_MODES.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const result = await getMentorResponse(mode as MentorMode, message);

    let activeConversationId = conversationId as string | undefined;

    if (!activeConversationId) {
      const { data: newConversation, error: convError } = await supabase
        .from("conversations")
        .insert({ user_id: user.id, mode, title: makeTitle(message) })
        .select("id")
        .single();

      if (convError || !newConversation) {
        throw convError ?? new Error("Failed to create conversation");
      }

      activeConversationId = newConversation.id;
    }

    const { data: insertedMessages, error: messagesError } = await supabase
      .from("messages")
      .insert([
        {
          conversation_id: activeConversationId,
          role: "user",
          content: message,
        },
        {
          conversation_id: activeConversationId,
          role: "mentor",
          content: result.response,
        },
      ])
      .select("id, role");

    if (messagesError) throw messagesError;

    const mentorMessageId = insertedMessages?.find(
      (m) => m.role === "mentor"
    )?.id;

    return NextResponse.json({
      ...result,
      conversationId: activeConversationId,
      messageId: mentorMessageId,
    });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      { error: "Something went wrong generating a response. Please try again." },
      { status: 500 }
    );
  }
}