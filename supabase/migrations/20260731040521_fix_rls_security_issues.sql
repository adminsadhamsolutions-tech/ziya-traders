/*
# Fix RLS Policy Security Issues

## Overview
Fixes three security findings:
1. `contacts` INSERT policy `public_insert_contacts` had `WITH CHECK (true)` — unrestricted inserts. Now validates that required fields (name, email, message) are non-empty.
2. `inspection_requests` INSERT policy `public_insert_inspection_requests` had `WITH CHECK (true)` — unrestricted inserts. Now validates that required fields (client_name, phone, email) are non-empty.
3. Public bucket `images` had a broad SELECT policy `public_read_images` on `storage.objects` that allowed clients to list all files in the bucket. Public buckets serve objects via public URLs without needing a SELECT policy, so the policy is dropped to prevent file enumeration.

## Security Changes
- `contacts`: INSERT policy now checks `name`, `email`, and `message` are non-null and non-empty strings.
- `inspection_requests`: INSERT policy now checks `client_name`, `phone`, and `email` are non-null and non-empty strings.
- `storage.objects`: SELECT policy `public_read_images` dropped. Public URL access to individual objects still works (public bucket), but clients can no longer list/enumerate all files in the bucket.
*/

-- ===================== FIX 1: contacts INSERT policy =====================
DROP POLICY IF EXISTS "public_insert_contacts" ON contacts;
CREATE POLICY "public_insert_contacts" ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND btrim(name) <> ''
    AND email IS NOT NULL AND btrim(email) <> ''
    AND message IS NOT NULL AND btrim(message) <> ''
  );

-- ===================== FIX 2: inspection_requests INSERT policy =====================
DROP POLICY IF EXISTS "public_insert_inspection_requests" ON inspection_requests;
CREATE POLICY "public_insert_inspection_requests" ON inspection_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    client_name IS NOT NULL AND btrim(client_name) <> ''
    AND phone IS NOT NULL AND btrim(phone) <> ''
    AND email IS NOT NULL AND btrim(email) <> ''
  );

-- ===================== FIX 3: Drop broad SELECT policy on storage.objects =====================
DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
