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
-- 1. Database Schema Updates
-- Add alt_description column to brutalist_grid for SEO/GEO
ALTER TABLE brutalist_grid ADD COLUMN IF NOT EXISTS alt_description TEXT;

-- Create latest_noise table
CREATE TABLE IF NOT EXISTS latest_noise (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  spotify_embed_url TEXT NOT NULL,
  apple_music_url TEXT,
  bandcamp_url TEXT,
  youtube_music_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_strings table for UI translations
CREATE TABLE IF NOT EXISTS site_strings (
  key TEXT PRIMARY KEY,
  en TEXT NOT NULL,
  es TEXT,
  de TEXT,
  jp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS for all tables
ALTER TABLE brutalist_grid ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_kit ENABLE ROW LEVEL SECURITY;
ALTER TABLE latest_noise ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_strings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (SELECT)
-- Explicitly grant to both 'anon' and 'authenticated' roles.
CREATE POLICY "Allow public read access" ON brutalist_grid FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON albums FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON songs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON press_kit FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON latest_noise FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access" ON site_strings FOR SELECT TO anon, authenticated USING (true);

-- Storage Policies for public buckets
CREATE POLICY "Allow public select on band_assets" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'band_assets');
CREATE POLICY "Allow public select on albums" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'albums');
CREATE POLICY "Allow public select on press_kit" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'press_kit');

-- 3. Initial UI Strings
INSERT INTO site_strings (key, en, es, de, jp) VALUES
('latest_noise_header', 'Our Latest Noise', 'Nuestro último ruido', 'Unser neuester Lärm', '最新のノイズ'),
('latest_noise_message', 'Stream our new release, ''Stuck at the Green Hill Zone,'' right here via Spotify. For the best experience, use headphones and turn it up loud. Also available on all major streaming platforms.', 'Escucha nuestro nuevo lanzamiento, ''Stuck at the Green Hill Zone,'' aquí mismo a través de Spotify. Para la mejor experiencia, usa auriculares y sube el volumen. También disponible en todas las principales plataformas de streaming.', 'Streame unsere neue Veröffentlichung ''Stuck at the Green Hill Zone'' direkt hier über Spotify. Für das beste Erlebnis verwende Kopfhörer und drehe die Lautstärke auf. Auch auf allen gängigen Streaming-Plattformen verfügbar.', '最新リリース「Stuck at the Green Hill Zone」をここSpotifyでストリーミング。最高の体験のために、ヘッドフォンを使用して音量を上げてお楽しみください。主要なすべてのストリーミングプラットフォームでも配信中。'),
('spotify_fallback', 'The Spotify player is currently unavailable.', 'El reproductor de Spotify no está disponible actualmente.', 'Der Spotify-Player ist derzeit nicht verfügbar.', 'Spotifyプレーヤーは現在利用できません。'),
('listen_on_spotify', 'Listen on Spotify', 'Escuchar en Spotify', 'Auf Spotify anhören', 'Spotifyで聴く'),
('tour_title', 'See Alarm! Alarm! Live in Málaga and Beyond', 'Mira a Alarm! Alarm! en vivo en Málaga y más allá', 'Erlebe Alarm! Alarm! live in Málaga und darüber hinaus', 'マラガ内外でAlarm! Alarm!のライブを観よう'),
('tour_intro', 'We''re hitting the road. Check out our upcoming dates below, powered by Bandsintown. Never miss a show.', 'Nos vamos de gira. Consulta nuestras próximas fechas a continuación, por Bandsintown. No te pierdas ningún concierto.', 'Wir gehen auf Tour. Schau dir unten unsere nächsten Termine an, präsentiert von Bandsintown. Verpasse keine Show.', 'ツアーに出ます。Bandsintown提供の今後のスケジュールをチェック。ショーを見逃さないで。'),
('social_title', 'The Brutalist Grid', 'La Red Brutalista', 'Das brutalistische Raster', 'ブルータリスト・グリッド'),
('loading_grid', 'Loading grid...', 'Cargando red...', 'Raster wird geladen...', 'グリッドを読み込み中...'),
('instagram_cta', 'WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →', 'VIVIMOS EN INSTAGRAM. SIGUE EL CAOS @ALARMALARMMALAGA →', 'WIR LEBEN AUF INSTAGRAM. FOLGE DEM CHAOS @ALARMALARMMALAGA →', 'インスタグラムで活動中。カオスをフォロー @ALARMALARMMALAGA →'),
('video_title', 'Watch Us', 'Míranos', 'Schau uns zu', 'ウォッチ・アス'),
('releases_title', 'Releases', 'Lanzamientos', 'Veröffentlichungen', 'リリース'),
('loading_releases', 'Loading releases...', 'Cargando lanzamientos...', 'Veröffentlichungen werden geladen...', 'リリースを読み込み中...'),
('bio_title', 'Our Story', 'Nuestra Historia', 'Unsere Geschichte', '私たちの物語'),
('loading_bio', 'Loading bio...', 'Cargando biografía...', 'Biografie wird geladen...', 'バイオを読み込み中...'),
('bio_content', 'Alarm! Alarm! is a punk band from Málaga singing about all the stuff we try to ignore: aging, work, and the general disappointment of modern life. The current lineup includes Pablo Rodríguez (vocals and guitar), Alejandro Villegas (drums and backing vocals), and Mike Thrippleton (bass and backing vocals). Former members include Emilio Villegas (bass and selective silence) and José Arjona (guitar and backing vocals). Their debut album Bloody Hell! (2020) was a loud scream into the void. The follow-up, Whatever... (2022), confirmed that things hadn’t improved. Now, in 2025, they surprise everyone (including themselves) by releasing three new EPs, the first titled ''98-''99 — a nostalgic, melodic tribute to the era of baggy jeans and MSN Messenger. Alarm! Alarm! won’t fix your problems, but they’ll shout them loud enough to make you feel better.', 'Alarm! Alarm! es una banda de punk de Málaga que canta sobre todas las cosas que intentamos ignorar: el envejecimiento, el trabajo y la decepción general de la vida moderna. La formación actual incluye a Pablo Rodríguez (voz y guitarra), Alejandro Villegas (batería y coros) y Mike Thrippleton (bajo y coros). Los antiguos miembros incluyen a Emilio Villegas (bajo y silencio selectivo) y José Arjona (guitarra y coros). Su álbum debut Bloody Hell! (2020) fue un fuerte grito al vacío. El siguiente, Whatever... (2022), confirmó que las cosas no habían mejorado. Ahora, en 2025, sorprenden a todos (incluidos ellos mismos) lanzando tres nuevos EPs, el primero titulado ''98-''99, un tributo nostálgico y melódico a la era de los pantalones anchos y MSN Messenger. Alarm! Alarm! no solucionará tus problemas, pero los gritará lo suficientemente fuerte como para que te sientas mejor.', 'Alarm! Alarm! ist eine Punkband aus Málaga, die über all die Dinge singt, die wir zu ignorieren versuchen: das Älterwerden, die Arbeit und die allgemeine Enttäuschung über das moderne Leben. Die aktuelle Besetzung besteht aus Pablo Rodríguez (Gesang und Gitarre), Alejandro Villegas (Schlagzeug und Hintergrundgesang) und Mike Thrippleton (Bass und Hintergrundgesang). Ehemalige Mitglieder sind Emilio Villegas (Bass und selektives Schweigen) und José Arjona (Gitarre und Hintergrundgesang). Ihr Debütalbum Bloody Hell! (2020) war ein lauter Schrei ins Nichts. Der Nachfolger Whatever... (2022) bestätigte, dass sich die Dinge nicht verbessert hatten. Jetzt, im Jahr 2025, überraschen sie alle (einschließlich sich selbst) mit der Veröffentlichung von drei neuen EPs, von denen die erste den Titel ''98-''99 trägt – eine nostalgische, melodische Hommage an die Ära der Baggy Jeans und des MSN Messengers. Alarm! Alarm! wird deine Probleme nicht lösen, aber sie werden sie laut genug herausschreien, damit du dich besser fühlst.', 'Alarm! Alarm!は、加齢、仕事、現代生活の一般的な失望など、私たちが無視しようとしているすべてのことについて歌うマラガ出身のパンクバンドです。現在のラインナップは、パブロ・ロドリゲス（ボーカル、ギター）、アレハンドロ・ビジェガス（ドラム、バックボーカル）、マイク・スリップルトン（ベース、バックボーカル）です。元メンバーには、エミリオ・ビジェガス（ベース、選択的沈黙）とホセ・アルホナ（ギター、バックボーカル）がいます。デビューアルバム『Bloody Hell!』（2020年）は、虚空への大きな叫びでした。続く『Whatever...』（2022年）は、状況が改善されていないことを裏付けました。そして2025年、彼らは3枚の新しいEPをリリースすることで全員（自分たち自身を含む）を驚かせます。最初のタイトルは『''98-''99』で、バギージーンズとMSNメッセンジャーの時代へのノスタルジックでメロディックなトリビュートです。Alarm! Alarm!はあなたの問題を解決しませんが、あなたが気分良くなれるように十分に大きな声でそれらを叫びます。'),
('contact_title', 'Contact & Downloads', 'Contacto y Descargas', 'Kontakt & Downloads', '連絡先とダウンロード'),
('booking_press', 'BOOKING/PRESS:', 'CONTRATACIÓN/PRENSA:', 'BOOKING/PRESSE:', 'ブッキング/プレス:'),
('official_channels', 'Official Channels (E-E-A-T)', 'Canales Oficiales (E-E-A-T)', 'Offizielle Kanäle (E-E-A-T)', '公式チャンネル (E-E-A-T)'),
('press_kit_title', 'Press Kit & Downloads', 'Press Kit y Descargas', 'Pressemappe & Downloads', 'プレス・キットとダウンロード'),
('loading_downloads', 'Loading downloads...', 'Cargando descargas...', 'Downloads werden geladen...', 'ダウンロードを読み込み中...'),
('downloads_unavailable', 'Downloads currently unavailable.', 'Descargas no disponibles actualmente.', 'Downloads derzeit nicht verfügbar.', '現在ダウンロードできません。'),
('back_to_home', 'Back to Home', 'Volver al Inicio', 'Zurück zur Startseite', 'ホームに戻る')
ON CONFLICT (key) DO UPDATE SET
  en = EXCLUDED.en,
  es = EXCLUDED.es,
  de = EXCLUDED.de,
  jp = EXCLUDED.jp;
```

## 3. Realtime Configuration

To enable real-time updates for the "Brutalist Grid" (Social Feed), "Releases", and "Latest Noise" sections:
1.  Go to the **Database** tab in your Supabase dashboard.
2.  Select **Replication** from the sidebar.
3.  Under `supabase_realtime`, click on **Source**.
4.  Toggle the switches for the following tables to enable them for Realtime:
    - `brutalist_grid`
    - `albums`
    - `songs`
    - `latest_noise`
    - `site_strings`

The website will automatically update when new entries are added to these tables. Note that the "Brutalist Grid" is configured to show only the last 8 entries.

## 4. Generative Engine Optimization (GEO) & SEO
To maximize visibility for AI crawlers (Gemini, Perplexity) and traditional search engines:
1.  **Alt Text:** Ensure the `alt_description` column in `brutalist_grid` is populated with semantic descriptions of band photos.
2.  **Entity Links:** Use the `rel="me"` links provided in the Contact section to link the website to official Spotify and Bandcamp profiles, helping AIs build a correct Knowledge Graph.
3.  **Automated Prerendering:** The build process automatically generates static HTML and JSON-LD for all albums to ensure content is indexable without JavaScript.
4.  **Multilingual SEO:** The site supports English, Spanish, German, and Japanese. Localized versions are generated in subdirectories (e.g., `/jp/`) to ensure proper indexing of translated content.

## 5. Environment Variables & GitHub Secrets

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

### Troubleshooting Deployment
If the deployment succeeds but the website shows "Supabase environment variables are missing":
1.  **Check Workflow Permissions:** Go to **Settings > Actions > General**. Scroll down to **Workflow permissions** and ensure **Read and write permissions** is selected. (Even with the YAML permissions block, some organizational settings require this manual toggle).
2.  **Verify Secrets Scope:** Ensure the secrets are named exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. If you are using an **Environment** (like `github-pages`), make sure the secrets are added *to that environment* specifically, not just the repository.
3.  **Avoid Manual Deploys:** Do not use `npm run deploy` locally unless you have a `.env` file with the correct values. The automated GitHub Action is the preferred way to deploy as it handles the injection automatically.

## 6. Database Schema Notes

The `albums` table should have the following columns (among others):
- `spotify_link` (TEXT)
- `bandcamp_link` (TEXT)
(Replaced the previous `streaming_link` column to support both platforms.)
