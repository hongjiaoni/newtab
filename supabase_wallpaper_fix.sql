-- Fix for wallpaper upload: Add INSERT policy for wallpapers table
-- Run this in Supabase SQL Editor if wallpaper upload is failing

-- Add INSERT policy for wallpapers table (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'wallpapers' 
    AND policyname = 'Users can insert their own wallpapers.'
  ) THEN
    CREATE POLICY "Users can insert their own wallpapers."
      ON public.wallpapers FOR INSERT
      WITH CHECK ( auth.uid() = user_id );
  END IF;
END $$;

-- Storage bucket setup for wallpapers
-- Note: You need to create the storage bucket in Supabase Dashboard:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name it "wallpapers"
-- 4. Make it PUBLIC (so wallpaper URLs are accessible)
-- 5. Add the following policies:

-- Storage policies (run these in SQL Editor):

-- Allow authenticated users to upload to their own folder
-- Policy name: "Users can upload wallpapers"
-- Allowed operation: INSERT
-- Target roles: authenticated
-- WITH CHECK expression:
--   (bucket_id = 'wallpapers') AND (auth.uid()::text = (storage.foldername(name))[1])

-- Allow public to view all wallpapers
-- Policy name: "Public can view wallpapers"  
-- Allowed operation: SELECT
-- Target roles: public (anon)
-- USING expression:
--   bucket_id = 'wallpapers'

-- Allow users to delete their own wallpapers
-- Policy name: "Users can delete own wallpapers"
-- Allowed operation: DELETE
-- Target roles: authenticated
-- USING expression:
--   (bucket_id = 'wallpapers') AND (auth.uid()::text = (storage.foldername(name))[1])
