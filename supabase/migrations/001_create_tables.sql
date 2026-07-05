-- ============================================================================
-- Cloud9 — Core tables
-- Referenced by: api/conversations, api/feedback, api/kb/upload, api/mentor/*
-- ============================================================================

-- Extension needed for gen_random_uuid() below — usually already enabled on
-- Supabase projects by default, but explicit here so this migration is safe
-- to run on a fresh project too.
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- conversations — one row per chat thread, shown in the sidebar
-- ----------------------------------------------------------------------------
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'New conversation',
  mode text not null check (mode in ('debug', 'explain', 'practice')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_user_id_idx
  on conversations (user_id, updated_at desc);

-- ----------------------------------------------------------------------------
-- messages — individual chat bubbles within a conversation
-- ----------------------------------------------------------------------------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations (id) on delete cascade,
  role text not null check (role in ('user', 'mentor')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx
  on messages (conversation_id, created_at);

-- ----------------------------------------------------------------------------
-- knowledge_docs — files uploaded on /admin for Explain mode's RAG lookups
-- ----------------------------------------------------------------------------
create table if not exists knowledge_docs (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid references auth.users (id) on delete set null,
  title text not null,
  status text not null default 'processing'
    check (status in ('processing', 'active', 'archived')),
  chunk_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists knowledge_docs_status_idx
  on knowledge_docs (status);

-- ----------------------------------------------------------------------------
-- feedback — thumbs up/down on a mentor message
-- ----------------------------------------------------------------------------
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  rating text not null check (rating in ('up', 'down')),
  created_at timestamptz not null default now(),
  unique (message_id, user_id) -- one vote per person per message
);

-- ----------------------------------------------------------------------------
-- Keep conversations.updated_at fresh so the sidebar sorts by recent
-- activity (FRD §11: "sidebar lists conversations by date") instead of only
-- by when the conversation was first created.
-- ----------------------------------------------------------------------------
create or replace function touch_conversation_updated_at()
returns trigger
language plpgsql
as $$
begin
  update conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists messages_touch_conversation on messages;
create trigger messages_touch_conversation
  after insert on messages
  for each row
  execute function touch_conversation_updated_at();