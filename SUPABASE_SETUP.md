# Supabase Setup Guide

This guide details the steps required to configure Supabase for the Alarm! Alarm! website migration.

## 1. Storage Configuration

Create the following **public** buckets in the Supabase Storage dashboard:
- `band_assets` - General band photos and assets.
- `albums` - Album and EP cover images.
- `press_kit` - Zip files and promotional documents for download.

### URL Format
Ensure your database tables use the public URL format:
`https://[PROJECT_ID].supabase.co/storage/v1/object/public/[BUCKET_NAME]/[FILENAME]`

## 2. Row Level Security (RLS)

Execute the following SQL in the Supabase SQL Editor to enable RLS and allow public read access:

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

-- Storage Policies for public buckets
CREATE POLICY "Allow public select on band_assets" ON storage.objects FOR SELECT USING (bucket_id = 'band_assets');
CREATE POLICY "Allow public select on albums" ON storage.objects FOR SELECT USING (bucket_id = 'albums');
CREATE POLICY "Allow public select on press_kit" ON storage.objects FOR SELECT USING (bucket_id = 'press_kit');
```

## 3. Realtime Configuration

To enable real-time updates for the "Brutalist Grid" (Social Feed) and the "Releases" section:
1.  Go to the **Database** tab in your Supabase dashboard.
2.  Select **Replication** from the sidebar.
3.  Under `supabase_realtime`, click on **Source**.
4.  Toggle the switches for the following tables to enable them for Realtime:
    - `brutalist_grid`
    - `albums`
    - `songs`

The website will automatically update when new entries are added to these tables. Note that the "Brutalist Grid" is configured to show only the last 8 entries.

## 4. Environment Variables & GitHub Secrets

For the application to connect to Supabase, you must set the following environment variables.

### Local Development
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### GitHub Actions / Production
Add these as **Secrets** or **Variables** in your GitHub repository settings (**Settings > Secrets and variables > Actions**):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

#### Secrets vs. Variables
- **Secrets:** Use these for the `VITE_SUPABASE_ANON_KEY`. Values are encrypted and not visible after being saved.
- **Variables:** Use these for `VITE_SUPABASE_URL` if you want them to be visible in the settings.

The deployment workflow is configured to check both locations. If you use **Environments**, ensure the secrets/variables are added to the `github-pages` environment.

These will be automatically injected during the GitHub Actions build process.

## 5. Database Schema Notes

The `albums` table should have the following columns (among others):
- `spotify_link` (TEXT)
- `bandcamp_link` (TEXT)
(Replaced the previous `streaming_link` column to support both platforms.)
