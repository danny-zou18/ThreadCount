-- Create avatars table
create table if not exists avatars (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  original_photo_path text,
  model_canvas_path text,
  model_status text default 'pending' check (model_status in ('pending', 'processing', 'ready', 'failed')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table avatars enable row level security;

-- Avatars RLS policies
create policy "Users can view their own avatars"
  on avatars for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = avatars.user_id
        and profiles.id = auth.uid()
    )
  );

create policy "Users can insert their own avatars"
  on avatars for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own avatars"
  on avatars for update
  using (auth.uid() = user_id);

create policy "Users can delete their own avatars"
  on avatars for delete
  using (auth.uid() = user_id);
