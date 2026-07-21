-- ============================================================================
-- Cloud9 — Row Level Security
-- Without this, any authenticated user can read/write any row in these
-- tables via Supabase's API — RLS is what actually restricts that, enforced
-- by the database itself regardless of which route or client calls it.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- conversations — a user can only see and modify their own
-- ----------------------------------------------------------------------------
alter table conversations enable row level security;

create policy "Users can view their own conversations"
  on conversations for select
  using (auth.uid() = user_id);

create policy "Users can create their own conversations"
  on conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own conversations"
  on conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
  on conversations for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- messages — access is gated through the parent conversation's owner,
-- since messages don't have a user_id column of their own
-- ----------------------------------------------------------------------------
alter table messages enable row level security;

create policy "Users can view messages in their own conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

create policy "Users can add messages to their own conversations"
  on messages for insert
  with check (
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and conversations.user_id = auth.uid()
    )
  );

-- ----------------------------------------------------------------------------
-- knowledge_docs — everyone signed in can read (Explain mode needs to cite
-- any doc, not just ones they personally uploaded), but only the uploader
-- can modify or remove their own upload
-- ----------------------------------------------------------------------------
alter table knowledge_docs enable row level security;

create policy "Any authenticated user can view knowledge docs"
  on knowledge_docs for select
  to authenticated
  using (true);

create policy "Users can upload knowledge docs"
  on knowledge_docs for insert
  with check (auth.uid() = uploaded_by);

create policy "Users can update their own uploaded docs"
  on knowledge_docs for update
  using (auth.uid() = uploaded_by);

create policy "Users can delete their own uploaded docs"
  on knowledge_docs for delete
  using (auth.uid() = uploaded_by);

-- ----------------------------------------------------------------------------
-- feedback — a user can only see and submit their own votes
-- ----------------------------------------------------------------------------
alter table feedback enable row level security;

create policy "Users can view their own feedback"
  on feedback for select
  using (auth.uid() = user_id);

create policy "Users can submit their own feedback"
  on feedback for insert
  with check (auth.uid() = user_id);