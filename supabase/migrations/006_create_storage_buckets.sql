-- Create storage buckets
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('wardrobe', 'wardrobe', true),
  ('generated', 'generated', true)
on conflict (id) do nothing;

-- Storage bucket policies using Supabase's built-in auth functions
-- Avatars bucket policies
create policy "Users can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload avatars"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
  );

create policy "Users can update avatars"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
  );

create policy "Users can delete avatars"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
  );

-- Wardrobe bucket policies
create policy "Users can view wardrobe"
  on storage.objects for select
  using (bucket_id = 'wardrobe');

create policy "Users can upload wardrobe"
  on storage.objects for insert
  with check (
    bucket_id = 'wardrobe'
    and auth.role() = 'authenticated'
  );

create policy "Users can update wardrobe"
  on storage.objects for update
  using (
    bucket_id = 'wardrobe'
    and auth.role() = 'authenticated'
  );

create policy "Users can delete wardrobe"
  on storage.objects for delete
  using (
    bucket_id = 'wardrobe'
    and auth.role() = 'authenticated'
  );

-- Generated bucket policies
create policy "Users can view generated"
  on storage.objects for select
  using (bucket_id = 'generated');

create policy "Users can upload generated"
  on storage.objects for insert
  with check (
    bucket_id = 'generated'
    and auth.role() = 'authenticated'
  );

create policy "Users can update generated"
  on storage.objects for update
  using (
    bucket_id = 'generated'
    and auth.role() = 'authenticated'
  );

create policy "Users can delete generated"
  on storage.objects for delete
  using (
    bucket_id = 'generated'
    and auth.role() = 'authenticated'
  );
