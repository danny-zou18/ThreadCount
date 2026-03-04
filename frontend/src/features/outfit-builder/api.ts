import { supabase } from '@/shared/api/supabase';
import type { Outfit, OutfitCreateInput, OutfitUpdateInput } from './types';

export async function fetchOutfits(userId: string): Promise<Outfit[]> {
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchOutfit(outfitId: string, userId: string): Promise<Outfit | null> {
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('id', outfitId)
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }
  return data;
}

export async function createOutfit(userId: string, input: OutfitCreateInput): Promise<Outfit> {
  const { data, error } = await supabase
    .from('outfits')
    .insert({
      user_id: userId,
      name: input.name || null,
      item_ids: input.item_ids,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateOutfit(
  outfitId: string,
  userId: string,
  updates: OutfitUpdateInput
): Promise<Outfit> {
  const updateData: Record<string, unknown> = {};
  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.item_ids !== undefined) updateData.item_ids = updates.item_ids;

  const { data, error } = await supabase
    .from('outfits')
    .update(updateData)
    .eq('id', outfitId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteOutfit(outfitId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('outfits')
    .delete()
    .eq('id', outfitId)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
}

export async function fetchOutfitItems(itemIds: string[]) {
  if (itemIds.length === 0) return [];

  const { data, error } = await supabase
    .from('wardrobe_items')
    .select('id, name, category, image_path')
    .in('id', itemIds);

  if (error) throw new Error(error.message);
  return data || [];
}

export function getItemImageUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from('wardrobe').getPublicUrl(path);
  return data.publicUrl;
}
