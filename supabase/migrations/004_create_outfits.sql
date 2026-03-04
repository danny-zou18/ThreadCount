-- Create outfits table
create table if not exists outfits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text,
  item_ids uuid[] default '{}',
  thumbnail_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for faster user lookups
create index idx_outfits_user on outfits (user_id);

-- Enable RLS
alter table outfits enable row level security;

-- Outfits RLS policies
create policy "Users can view their own outfits"
  on outfits for select
  using (auth.uid() = user_id);

create policy "Users can insert their own outfits"
  on outfits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own outfits"
  on outfits for update
  using (auth.uid() = user_id);

create policy "Users can delete their own outfits"
  on outfits for delete
  using (auth.uid() = user_id);
