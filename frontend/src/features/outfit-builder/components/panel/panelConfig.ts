import type { MainCategory, OutfitSlot } from '../../types';
import type { Category } from '@/features/wardrobe/types';

export type { MainCategory };

export const SLOT_TO_MAIN: Record<OutfitSlot, MainCategory> = {
  top: 'top',
  bottom: 'bottoms',
  shoes: 'shoes',
  accessoriesLeft: 'accessories',
  accessoriesRight: 'accessories',
};

export const CATEGORY_TO_SLOT: Record<
  Category,
  'top' | 'bottom' | 'shoes' | 'accessoriesLeft' | 'accessoriesRight'
> = {
  tops: 'top',
  bottoms: 'bottom',
  dresses: 'top',
  outerwear: 'top',
  shoes: 'shoes',
  accessories: 'accessoriesLeft',
};

export const MAIN_CATEGORIES: MainCategory[] = ['top', 'bottoms', 'shoes', 'accessories'];

export const SUB_CATEGORIES: Record<MainCategory, string[]> = {
  top: ['T-shirts', 'Tank tops', 'Dresses', 'Outerwear'],
  bottoms: ['Jeans', 'Dress pants'],
  shoes: ['Shoes'],
  accessories: ['Hats', 'Jewelry', 'Bags', 'Watches', 'Sunglasses', 'Other'],
};

export const SUB_TO_CATEGORY: Record<string, Category[]> = {
  'T-shirts': ['tops'],
  'Tank tops': ['tops'],
  Dresses: ['dresses'],
  Outerwear: ['outerwear'],
  Jeans: ['bottoms'],
  'Dress pants': ['bottoms'],
  Shoes: ['shoes'],
  Hats: ['accessories'],
  Jewelry: ['accessories'],
  Bags: ['accessories'],
  Watches: ['accessories'],
  Sunglasses: ['accessories'],
  Other: ['accessories'],
};

export const MAIN_TO_CATEGORY: Record<MainCategory, Category[]> = {
  top: ['tops', 'dresses', 'outerwear'],
  bottoms: ['bottoms'],
  shoes: ['shoes'],
  accessories: ['accessories'],
};
