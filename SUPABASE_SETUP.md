# Supabase Setup Guide

This guide details the steps required to configure Supabase for the Alarm! Alarm! website migration.

## 1. Storage Configuration

Create a **public** bucket named `band-assets` in the Supabase Storage dashboard.

Organize the bucket with the following folder structure:
- `brutalist-grid/` - High-resolution images for the social feed grid.
- `discography/` - Album and EP cover images.
- `press-kit/` - Zip files and promotional photos for download.

## 2. Row Level Security (RLS)

Execute the following SQL in the Supabase SQL Editor to enable RLS and allow public read access to your data:

```sql
-- Enable RLS for all tables
ALTER TABLE brutalist_grid ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_kit ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (SELECT)
CREATE POLICY "Allow public read access" ON brutalist_grid FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON albums FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON songs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON press_kit FOR SELECT USING (true);

-- Storage Policies for 'band-assets' bucket
-- This allows anyone to view/download files in the 'band-assets' bucket
CREATE POLICY "Allow public select on band-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'band-assets');
```

## 3. Environment Variables & GitHub Secrets

For the application to connect to Supabase, you must set the following environment variables.

### Local Development
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### GitHub Actions / Production
Add these as Secrets in your GitHub repository settings (**Settings > Secrets and variables > Actions**):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These will be injected during the build process (Vite automatically picks up variables prefixed with `VITE_`).

## 4. Data Population

Ensure your tables are populated with the correct URLs pointing to your files in the `band-assets` bucket.
Example URL format:
`https://[PROJECT_ID].supabase.co/storage/v1/object/public/band-assets/[FOLDER]/[FILENAME]`
