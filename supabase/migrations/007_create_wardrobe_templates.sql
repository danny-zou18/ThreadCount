-- Create preloaded wardrobe templates (sample items for new users)
create table if not exists wardrobe_templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null check (category in ('tops', 'bottoms', 'dresses', 'shoes', 'accessories', 'outerwear')),
  image_path text,
  labels text[] default '{}',
  created_at timestamptz default now()
);

-- Seed with sample items
insert into wardrobe_templates (name, category, labels) values
-- Tops
('White T-Shirt', 'tops', array['casual', 'basics', 'summer']),
('Blue Denim Jacket', 'outerwear', array['denim', 'casual', 'spring', 'fall']),
('Black Blazer', 'tops', array['formal', 'work', 'classic']),
('Striped Button-Up', 'tops', array['casual', 'office', 'summer']),
('Grey Hoodie', 'tops', array['casual', 'athletic', 'winter']),

-- Bottoms
('Blue Jeans', 'bottoms', array['casual', 'classic', 'denim']),
('Black Trousers', 'bottoms', array['formal', 'work', 'classic']),
('Khaki Shorts', 'bottoms', array['casual', 'summer']),
('Black Joggers', 'bottoms', array['casual', 'athletic', 'lounge']),

-- Dresses
('Little Black Dress', 'dresses', array['formal', 'classic', 'evening']),
('Summer Maxi Dress', 'dresses', array['casual', 'summer', 'bohemian']),
('Floral Wrap Dress', 'dresses', array['casual', 'spring', 'work']),

-- Shoes
('White Sneakers', 'shoes', array['casual', 'athletic', 'summer']),
('Black Leather Boots', 'shoes', array['classic', 'fall', 'winter']),
('Brown Sandals', 'shoes', array['casual', 'summer']),

-- Accessories
('Silver Watch', 'accessories', array['classic', 'minimal']),
('Leather Belt', 'accessories', array['classic', 'formal']),
('Sunglasses', 'accessories', array['summer', 'accessories']);

-- This table is read-only seed data, no RLS needed (managed by backend)
