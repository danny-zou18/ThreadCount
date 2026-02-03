export interface WardrobeItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  imageUrl: string;
  colors: string[];
  season: string[];
  tags: string[];
  usageCount: number;
}

export interface Outfit {
  id: string;
  name: string;
  itemIds: string[];
  previewUrl: string;
  createdAt: string;
  season?: string[];
}

// Mock data with flat-lay style images (clean backgrounds)
export const mockWardrobeItems: WardrobeItem[] = [
  {
    id: '1',
    name: 'White Cotton T-Shirt',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1594734415578-00fc9540929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGZsYXRsYXklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMTE0NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['white'],
    season: ['spring', 'summer', 'fall'],
    tags: ['casual', 'basic'],
    usageCount: 15,
  },
  {
    id: '2',
    name: 'Blue Denim Jeans',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1638042479727-6ca355e0e891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwamVhbnMlMjBmbGF0bGF5JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MDExNDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['blue'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['casual', 'denim'],
    usageCount: 20,
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGphY2tldCUyMGZsYXRsYXklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMTE0NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['black'],
    season: ['fall', 'winter'],
    tags: ['edgy', 'leather'],
    usageCount: 8,
  },
  {
    id: '4',
    name: 'White Sneakers',
    category: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzcwMTE0NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['white'],
    season: ['spring', 'summer', 'fall'],
    tags: ['casual', 'sporty'],
    usageCount: 25,
  },
  {
    id: '5',
    name: 'Beige Trench Coat',
    category: 'outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1684841565198-41e4887476f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGNvYXQlMjBmbGF0bGF5JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MDExNDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['beige', 'tan'],
    season: ['fall', 'spring'],
    tags: ['elegant', 'classic'],
    usageCount: 12,
  },
  {
    id: '6',
    name: 'Grey Hoodie',
    category: 'tops',
    imageUrl: 'https://images.unsplash.com/photo-1704645402893-e159cfcfcd2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwaG9vZGllJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMTQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['grey'],
    season: ['fall', 'winter', 'spring'],
    tags: ['casual', 'comfortable'],
    usageCount: 18,
  },
  {
    id: '7',
    name: 'Black Dress Pants',
    category: 'bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1608384177866-0bca0d225435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBhbnRzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMTQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['black'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['formal', 'business'],
    usageCount: 10,
  },
  {
    id: '8',
    name: 'Brown Leather Boots',
    category: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1716179838642-95c55067ba01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGJvb3RzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['brown'],
    season: ['fall', 'winter'],
    tags: ['formal', 'leather'],
    usageCount: 14,
  },
  {
    id: '9',
    name: 'White Ankle Socks',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1608384177866-0bca0d225435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNvY2tzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMjA5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['white'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['casual', 'basic', 'socks'],
    usageCount: 20,
  },
  {
    id: '10',
    name: 'Black Cotton Socks',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1608384177866-0bca0d225435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNvY2tzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMjA5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['black'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['casual', 'basic', 'socks'],
    usageCount: 18,
  },
  {
    id: '11',
    name: 'Colorful Striped Socks',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1612241531445-fea16fba97fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMjA5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['multicolor'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['fun', 'colorful', 'socks'],
    usageCount: 10,
  },
  {
    id: '12',
    name: 'Canvas Tote Bag',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1617030557822-c8c35f07c60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3RlJTIwYmFnJTIwZmxhdGxheSUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMjE2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['beige'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['casual', 'bag'],
    usageCount: 15,
  },
  {
    id: '13',
    name: 'Black Leather Tote',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1697551894947-25fba13585e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwdG90ZSUyMGJhZyUyMGZsYXRsYXl8ZW58MXx8fHwxNzcwMTIxNjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['black'],
    season: ['spring', 'summer', 'fall', 'winter'],
    tags: ['elegant', 'bag'],
    usageCount: 12,
  },
  {
    id: '14',
    name: 'Wool Scarf',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1608158222851-af032106bca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwc2NhcmYlMjBmbGF0bGF5fGVufDF8fHx8MTc3MDEyMTYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['beige'],
    season: ['fall', 'winter'],
    tags: ['warm', 'scarf'],
    usageCount: 8,
  },
  {
    id: '15',
    name: 'Plaid Scarf',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1741173826628-199d13c4914a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FyZiUyMGZsYXRsYXklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMTIxNjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['multicolor'],
    season: ['fall', 'winter'],
    tags: ['warm', 'scarf'],
    usageCount: 6,
  },
  {
    id: '16',
    name: 'Black Knit Beanie',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1699347611474-5be693bee31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0JTIwYmVhbmllJTIwd2ludGVyJTIwaGF0fGVufDF8fHx8MTc3MDEyMTYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['black'],
    season: ['fall', 'winter'],
    tags: ['warm', 'hat'],
    usageCount: 14,
  },
  {
    id: '17',
    name: 'White Baseball Cap',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1652091733988-077855ba35dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMGhhdCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAxMjE2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    colors: ['white'],
    season: ['spring', 'summer', 'fall'],
    tags: ['casual', 'hat'],
    usageCount: 16,
  },
];

export const mockOutfits: Outfit[] = [
  {
    id: 'outfit-1',
    name: 'Casual Weekend',
    itemIds: ['1', '2', '4'],
    previewUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMG91dGZpdCUyMGZsYXRsYXl8ZW58MXx8fHwxNzcwMDcyNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    createdAt: '2026-01-28',
    season: ['spring', 'summer'],
  },
  {
    id: 'outfit-2',
    name: 'Night Out',
    itemIds: ['3', '2', '4'],
    previewUrl: 'https://images.unsplash.com/photo-1727524366429-27de8607d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzcwMDcyNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    createdAt: '2026-01-25',
    season: ['fall'],
  },
  {
    id: 'outfit-3',
    name: 'Classic Elegance',
    itemIds: ['5', '7', '8'],
    previewUrl: 'https://images.unsplash.com/photo-1633821879282-0c4e91f96232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHRyZW5jaCUyMGNvYXR8ZW58MXx8fHwxNzcwMDIxNjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    createdAt: '2026-01-20',
    season: ['fall', 'spring'],
  },
];
