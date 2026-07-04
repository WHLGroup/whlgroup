import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace the Anon Key with the one from your dashboard
const supabaseUrl = 'https://fepjopmedwjwjyqcnhuq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGpvcG1lZHdqd2p5cWNuaHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMDMyNTAsImV4cCI6MjA5ODY3OTI1MH0.tZqqdl7In3lGd3iW0nJA9qdZGU2szrRcLj13XE35SPM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Global Upload Helper
 */
export const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
  try {
    // 1. Create a clean filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // 2. Perform the upload
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('SUPABASE STORAGE ERROR:', uploadError.message);
      return null;
    }

    // 3. Get the public URL
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      console.error('SUPABASE URL ERROR: Could not generate public link.');
      return null;
    }

    return data.publicUrl;
  } catch (err: any) {
    console.error('UNEXPECTED UPLOAD ERROR:', err.message);
    return null;
  }
};
