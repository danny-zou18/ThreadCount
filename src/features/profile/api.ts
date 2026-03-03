import { fal } from '@fal-ai/client';
import { supabase } from '@/shared/api/supabase';
import type { Avatar } from './types';

const FAL_API_KEY = import.meta.env.VITE_FAL_API_KEY;

const AVATAR_PROMPT = `Role: You are a professional fashion photography and virtual try-on image generator. Objective: Given a photo of a person, generate a high-quality, neutral modeling image that serves as a reusable canvas for future product visualization (e.g., clothing, accessories). The output must prioritize realism, accurate body proportions, and clean separation between the model and clothing regions. Instructions: Generate a full-body fashion model photo based on the person in the input image. Preserve: Body shape and proportions Skin tone Facial structure (neutral expression) Hair shape and volume (simple, unobstructive styling) Do not stylize the face or body beyond realistic enhancement (no beauty exaggeration). Pose & Composition: Neutral, balanced stance (e.g., slight contrapposto or straight-on). Arms relaxed and positioned to avoid covering torso or hips. Legs visible and unobstructed. Camera angle: eye-level or slightly above. Framing: full body, centered, with margin around the subject. Clothing (Temporary / Placeholder): Dress the model in simple, form-fitting, neutral garments: Solid color (e.g., beige, light gray, muted pink, soft black) No logos, text, patterns, or branding Clothing should clearly define: Torso Waist Hips Legs Avoid excessive layering, accessories, or textures. Clothing must be easy to replace digitally (clean edges, no occlusion). Footwear: Minimal, neutral shoes or barefoot. No dramatic heels or complex straps unless unavoidable. Lighting & Environment: Studio lighting: soft, even, shadow-controlled. Background: plain, light neutral (white, off-white, or light gray). No props, no furniture, no background elements. Image Quality: Ultra-high resolution Sharp focus Realistic skin texture Accurate fabric drape No motion blur, no artistic effects Constraints (Important): No exaggerated fashion poses No dramatic expressions No stylization (editorial, fantasy, cinematic, anime, etc.) No cropping of limbs No body distortion No sexualized posing Final Output Goal: A clean, realistic, full-body model image that functions as a neutral base canvas for future virtual try-on rendering, where tops, bottoms, dresses, shoes, and accessories can be swapped without re-posing or re-lighting the subject.`;

export async function uploadAvatarPhoto(
  userId: string,
  file: File,
): Promise<{ url: string; path: string }> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/original.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
    upsert: true,
    contentType: file.type,
  });

  if (uploadError) {
    throw new Error(`Failed to upload avatar: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
  };
}

async function generateModelCanvas(imageUrl: string): Promise<Blob> {
  if (!FAL_API_KEY) {
    throw new Error('FAL_API_KEY not configured. Add VITE_FAL_API_KEY to .env.local');
  }

  console.log('Calling fal.ai with image:', imageUrl);

  fal.config({
    credentials: FAL_API_KEY,
  });

  const result = await fal.subscribe('fal-ai/nano-banana-2/edit', {
    input: {
      prompt: AVATAR_PROMPT,
      image_urls: [imageUrl],
    },
  });

  console.log('fal.ai result:', result);

  const images = result.data?.images;
  if (!images || images.length === 0) {
    throw new Error('No image generated - fal.ai returned empty result');
  }

  const generatedImageUrl = images[0].url;
  console.log('Generated image URL:', generatedImageUrl);

  const response = await fetch(generatedImageUrl);

  if (!response.ok) {
    throw new Error(`Failed to download generated image: ${response.statusText}`);
  }

  return response.blob();
}

async function uploadGeneratedModel(userId: string, blob: Blob): Promise<string> {
  const fileExt = 'png';
  const fileName = `${userId}/model.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, blob, {
    upsert: true,
    contentType: 'image/png',
  });

  if (uploadError) {
    throw new Error(`Failed to upload generated model: ${uploadError.message}`);
  }

  return filePath;
}

export async function processAvatar(userId: string): Promise<Avatar> {
  const { data: avatar, error: fetchError } = await supabase
    .from('avatars')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (fetchError || !avatar) {
    throw new Error('Avatar not found');
  }

  await supabase
    .from('avatars')
    .update({ model_status: 'processing', updated_at: new Date().toISOString() })
    .eq('id', avatar.id);

  try {
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(avatar.original_photo_path);
    const originalImageUrl = urlData.publicUrl;

    const generatedBlob = await generateModelCanvas(originalImageUrl);
    const modelPath = await uploadGeneratedModel(userId, generatedBlob);

    await supabase
      .from('avatars')
      .update({
        model_status: 'ready',
        model_canvas_path: modelPath,
        updated_at: new Date().toISOString(),
      })
      .eq('id', avatar.id);
  } catch (error) {
    await supabase
      .from('avatars')
      .update({ model_status: 'failed', updated_at: new Date().toISOString() })
      .eq('id', avatar.id);
    throw error;
  }

  const { data: updatedAvatar, error } = await supabase
    .from('avatars')
    .select('*')
    .eq('id', avatar.id)
    .single();

  if (error) {
    throw new Error('Failed to get updated avatar');
  }

  return updatedAvatar;
}

async function ensureProfile(userId: string): Promise<void> {
  const { data: existing, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching profile:', fetchError);
    throw new Error(`Failed to fetch profile: ${fetchError.message}`);
  }

  if (!existing) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, display_name: null });

    if (insertError) {
      console.error('Error creating profile:', insertError);
      throw new Error(`Failed to create profile: ${insertError.message}`);
    }
  }
}

export async function createAvatar(userId: string, photoPath: string): Promise<Avatar> {
  await ensureProfile(userId);

  const { data, error } = await supabase
    .from('avatars')
    .insert({
      user_id: userId,
      original_photo_path: photoPath,
      model_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create avatar: ${error.message}`);
  }

  return data;
}

export async function getAvatar(userId: string): Promise<Avatar | null> {
  const { data, error } = await supabase
    .from('avatars')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get avatar: ${error.message}`);
  }

  return data || null;
}

export async function deleteAvatar(avatarId: string): Promise<void> {
  const { error } = await supabase.from('avatars').update({ is_active: false }).eq('id', avatarId);

  if (error) {
    throw new Error(`Failed to delete avatar: ${error.message}`);
  }
}

export async function updateProfile(
  userId: string,
  updates: {
    display_name?: string;
    onboarding_completed?: boolean;
    tutorial_completed?: boolean;
  },
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}

export async function getProfile(userId: string): Promise<{
  id: string;
  display_name: string | null;
  onboarding_completed: boolean;
  tutorial_completed: boolean;
} | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, onboarding_completed, tutorial_completed')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to get profile: ${error.message}`);
  }

  return data || null;
}
