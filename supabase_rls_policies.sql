-- Alarm! Alarm! Supabase Permission Setup Script
-- Execute this in the Supabase SQL Editor to enable RLS and public read access.

-- 1. Enable Row Level Security (RLS) for all tables
ALTER TABLE brutalist_grid ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_kit ENABLE ROW LEVEL SECURITY;

-- 2. Create policies to allow public read access (SELECT)
-- We explicitly grant to 'anon' (unauthenticated) and 'authenticated' roles.
-- Note: 'DROP POLICY IF EXISTS' is used to ensure the script can be re-run safely.

DROP POLICY IF EXISTS "Allow public read access" ON brutalist_grid;
CREATE POLICY "Allow public read access" ON brutalist_grid FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON albums;
CREATE POLICY "Allow public read access" ON albums FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON songs;
CREATE POLICY "Allow public read access" ON songs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read access" ON press_kit;
CREATE POLICY "Allow public read access" ON press_kit FOR SELECT TO anon, authenticated USING (true);

-- 3. Storage Policies for public buckets
-- Ensure these buckets (band_assets, albums, press_kit) are created and set to 'Public' in the dashboard.

DROP POLICY IF EXISTS "Allow public select on band_assets" ON storage.objects;
CREATE POLICY "Allow public select on band_assets" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'band_assets');

DROP POLICY IF EXISTS "Allow public select on albums" ON storage.objects;
CREATE POLICY "Allow public select on albums" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'albums');

DROP POLICY IF EXISTS "Allow public select on press_kit" ON storage.objects;
CREATE POLICY "Allow public select on press_kit" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'press_kit');
