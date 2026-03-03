-- Create wardrobe_items table
create table if not exists wardrobe_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  category text not null check (category in ('tops', 'bottoms', 'dresses', 'shoes', 'accessories', 'outerwear')),
  image_path text,
  labels text[] default '{}',
  is_inspiration boolean default false,
  is_template boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for faster category lookups
create index idx_wardrobe_items_user_category on wardrobe_items (user_id, category);

-- Enable RLS
alter table wardrobe_items enable row level security;

-- Wardrobe items RLS policies
create policy "Users can view their own wardrobe items"
  on wardrobe_items for select
  using (auth.uid() = user_id);

create policy "Users can insert their own wardrobe items"
  on wardrobe_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own wardrobe items"
  on wardrobe_items for update
  using (auth.uid() = user_id);

create policy "Users can delete their own wardrobe items"
  on wardrobe_items for delete
  using (auth.uid() = user_id);
