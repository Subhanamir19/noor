import { File } from 'expo-file-system';

import { supabase } from './supabase';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const JOURNEY_PHOTOS_BUCKET = 'journey-photos';

// ---------------------------------------------------------------------------
// Journey Photo Upload
// ---------------------------------------------------------------------------

/**
 * Upload a journey photo to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadJourneyPhoto(
  userId: string,
  photoUri: string
): Promise<string> {
  // Create File instance from URI
  const file = new File(photoUri);

  // Read file as ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // Generate unique filename: userId/timestamp.jpg
  const timestamp = Date.now();
  const filename = `${userId}/${timestamp}.jpg`;

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from(JOURNEY_PHOTOS_BUCKET)
    .upload(filename, arrayBuffer, {
      contentType: 'image/jpeg',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(JOURNEY_PHOTOS_BUCKET)
    .getPublicUrl(filename);

  return urlData.publicUrl;
}

/**
 * Delete a journey photo from Supabase Storage.
 * Silently fails if deletion fails (non-critical operation).
 */
export async function deleteJourneyPhoto(photoUrl: string): Promise<void> {
  try {
    // Extract filename from URL: .../journey-photos/userId/timestamp.jpg
    const urlParts = photoUrl.split('/');
    const filename = urlParts.slice(-2).join('/');

    await supabase.storage.from(JOURNEY_PHOTOS_BUCKET).remove([filename]);
  } catch (error) {
    // Log but don't throw - photo deletion is not critical
    console.warn('[Storage] Failed to delete photo:', error);
  }
}
