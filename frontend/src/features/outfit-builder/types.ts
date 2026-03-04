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

export type OutfitSlot = 'base' | 'outer' | 'bottom' | 'shoes' | 'accessory';

export interface OutfitCanvasState {
  base: OutfitItem | null;
  outer: OutfitItem | null;
  bottom: OutfitItem | null;
  shoes: OutfitItem | null;
  accessory: OutfitItem | null;
}

export const SLOT_ORDER: OutfitSlot[] = ['base', 'outer', 'bottom', 'shoes', 'accessory'];

export const SLOT_LABELS: Record<OutfitSlot, string> = {
  base: 'Top / Base Layer',
  outer: 'Outer Layer',
  bottom: 'Bottoms',
  shoes: 'Shoes',
  accessory: 'Accessories',
};

export const SLOT_CATEGORIES: Record<OutfitSlot, Category[]> = {
  base: ['tops', 'dresses'],
  outer: ['outerwear'],
  bottom: ['bottoms'],
  shoes: ['shoes'],
  accessory: ['accessories'],
};
