-- Create profiles table (extends auth.users)
create table if not exists profiles (
  id uuid not null references auth.users on delete cascade primary key,
  display_name text,
  onboarding_completed boolean default false,
  tutorial_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Row Level Security
alter table profiles enable row level security;

-- Profiles RLS policies
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);
