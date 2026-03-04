import type { Category } from '@/features/wardrobe/types';

export interface Outfit {
  id: string;
  user_id: string;
  name: string | null;
  item_ids: string[];
  thumbnail_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutfitItem {
  id: string;
  name: string;
  category: Category;
  image_path: string | null;
}

export interface OutfitCreateInput {
  name?: string;
  item_ids: string[];
}

export interface OutfitUpdateInput {
  name?: string;
  item_ids?: string[];
}

export type OutfitSlot = 'top' | 'bottom' | 'shoes';

export interface OutfitCanvasState {
  top: OutfitItem[];
  bottom: OutfitItem | null;
  shoes: OutfitItem | null;
}

export const SLOT_ORDER: OutfitSlot[] = ['top', 'bottom', 'shoes'];

export const SLOT_LABELS: Record<OutfitSlot, string> = {
  top: 'Top',
  bottom: 'Bottoms',
  shoes: 'Shoes',
};

export const SLOT_CATEGORIES: Record<OutfitSlot, Category[]> = {
  top: ['tops', 'dresses', 'outerwear'],
  bottom: ['bottoms'],
  shoes: ['shoes'],
};

export type MainCategory = 'tops' | 'bottoms' | 'accessories';

export interface SubCategory {
  id: string;
  label: string;
  categories: Category[];
}

export const MAIN_CATEGORIES: Record<MainCategory, { label: string; subCategories: SubCategory[] }> = {
  tops: {
    label: 'Tops',
    subCategories: [
      { id: 'shirts', label: 'Shirts', categories: ['tops'] },
      { id: 'outerwear', label: 'Outerwear', categories: ['outerwear'] },
      { id: 'dresses', label: 'Dresses', categories: ['dresses'] },
    ],
  },
  bottoms: {
    label: 'Bottoms',
    subCategories: [
      { id: 'pants', label: 'Pants', categories: ['bottoms'] },
    ],
  },
  accessories: {
    label: 'Accessories',
    subCategories: [
      { id: 'shoes', label: 'Shoes', categories: ['shoes'] },
      { id: 'other', label: 'Other', categories: ['accessories'] },
    ],
  },
};

export const MAIN_CATEGORY_ORDER: MainCategory[] = ['tops', 'bottoms', 'accessories'];

export const categoryToSlot = (category: Category): OutfitSlot => {
  if (category === 'tops' || category === 'dresses' || category === 'outerwear') return 'top';
  if (category === 'bottoms') return 'bottom';
  return 'shoes';
};
