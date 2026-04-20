export type LookType = 'saved' | 'rendered';

export type LookFilter = 'all' | LookType;

export interface SavedOutfit {
  id: string;
  user_id: string;
  name: string | null;
  item_ids: string[];
  thumbnail_path: string | null;
  created_at: string;
  type: 'saved';
}

export interface GeneratedImage {
  id: string;
  user_id: string;
  outfit_id: string | null;
  image_url: string;
  prompt: string | null;
  created_at: string;
  type: 'rendered';
}

export type Look = SavedOutfit | GeneratedImage;

export interface LooksState {
  looks: Look[];
  filter: LookFilter;
  isLoading: boolean;
  error: string | null;
}

export const LOOK_FILTERS: { value: LookFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'saved', label: 'Saved Outfits' },
  { value: 'rendered', label: 'Renders' },
];
