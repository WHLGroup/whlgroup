import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase Project details
// You can find these in your Supabase Dashboard under Project Settings > API
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'your-public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Global Upload Helper
 */
export const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Supabase Upload Error:', err);
    return null;
  }
};
