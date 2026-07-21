import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("id, title, mode, updated_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (convError || !conversation) {
    return NextResponse.json(
      { error: "Conversation not found." },
      { status: 404 }
    );
  }

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Error in GET /api/conversations/[id]:", messagesError);
    return NextResponse.json(
      { error: "Failed to load messages." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    id: conversation.id,
    title: conversation.title,
    mode: conversation.mode,
    updatedAt: conversation.updated_at,
    messages: messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
    })),
  });
}