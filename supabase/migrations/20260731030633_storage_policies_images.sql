/*
# Storage Policies for Images Bucket

## Overview
Sets up public read access and admin-only write access to the `images` storage bucket for product images and gallery uploads.

## Security
- Public (anon) can SELECT (read) objects in the images bucket.
- Only authenticated admin users can INSERT/UPDATE/DELETE objects.
*/

-- Public read
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'images');

-- Admin insert
DROP POLICY IF EXISTS "admin_insert_images" ON storage.objects;
CREATE POLICY "admin_insert_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- Admin update
DROP POLICY IF EXISTS "admin_update_images" ON storage.objects;
CREATE POLICY "admin_update_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  ) WITH CHECK (
    bucket_id = 'images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- Admin delete
DROP POLICY IF EXISTS "admin_delete_images" ON storage.objects;
CREATE POLICY "admin_delete_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );
