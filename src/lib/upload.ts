import { supabase, STORAGE_BUCKET } from '@/lib/supabase';

export async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    const bucketIdx = parts.indexOf(STORAGE_BUCKET);
    if (bucketIdx === -1) return;
    const filePath = parts.slice(bucketIdx + 1).join('/');
    await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
  } catch {
    // ignore
  }
}
