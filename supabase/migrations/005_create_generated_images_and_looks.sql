-- Create generated_images table (AI try-on results)
create table if not exists generated_images (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  outfit_id uuid references outfits(id) on delete set null,
  image_path text,
  prompt text,
  created_at timestamptz default now()
);

-- Create looks table (saved previous looks)
create table if not exists looks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  generated_image_id uuid references generated_images(id) on delete cascade not null,
  name text,
  created_at timestamptz default now()
);

-- Indexes
create index idx_generated_images_user on generated_images (user_id);
create index idx_looks_user on looks (user_id);

-- Enable RLS
alter table generated_images enable row level security;
alter table looks enable row level security;

-- Generated images RLS policies
create policy "Users can view their own generated images"
  on generated_images for select
  using (auth.uid() = user_id);

create policy "Users can insert their own generated images"
  on generated_images for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own generated images"
  on generated_images for delete
  using (auth.uid() = user_id);

-- Looks RLS policies
create policy "Users can view their own looks"
  on looks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own looks"
  on looks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own looks"
  on looks for delete
  using (auth.uid() = user_id);
