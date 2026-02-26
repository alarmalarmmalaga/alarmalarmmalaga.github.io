import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables manually if not in GitHub Actions
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Prerendering will use mock data.');
}

const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

// Helper to generate slug
const slugify = (text) =>
  text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

async function fetchData() {
  if (!supabase) {
    return {
      albums: [
        { id: 1, title: 'Amateur Skater', release_date: '2025-01-01', cover_url: '', songs: [{ title: 'Track 1' }] },
      ],
      gridItems: [
        { id: 1, image_url: '', caption: 'Mock Photo', alt_description: 'Mock Alt' }
      ],
      pressKit: []
    };
  }

  const { data: albums } = await supabase.from('albums').select('*, songs(*)').order('release_date', { ascending: false });
  const { data: gridItems } = await supabase.from('brutalist_grid').select('*').order('created_at', { ascending: false }).limit(8);
  const { data: pressKit } = await supabase.from('press_kit').select('*');

  return {
    albums: albums || [],
    gridItems: gridItems || [],
    pressKit: pressKit || []
  };
}

function generateMusicAlbumSchema(album) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": album.title,
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Alarm Alarm",
      "url": "https://alarmalarmmalaga.github.io/"
    },
    "datePublished": album.release_date,
    "numTracks": album.songs?.length || 0,
    "track": (album.songs || []).map((song, index) => ({
      "@type": "MusicRecording",
      "name": song.title,
      "position": song.track_number || (index + 1)
    }))
  };
}

function generateMusicGroupSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Alarm Alarm",
    "url": "https://alarmalarmmalaga.github.io/",
    "genre": "Punk Rock",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Málaga",
      "addressCountry": "ES"
    }
  };
}

async function prerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Build template not found at', TEMPLATE_PATH);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const data = await fetchData();

  // 1. Generate Homepage
  let homeHtml = template;

  // Inject SITE_DATA
  const siteDataScript = `<script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`;
  homeHtml = homeHtml.replace('</head>', `${siteDataScript}\n</head>`);

  // Inject Home Schema
  const homeSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicGroupSchema())}</script>`;
  homeHtml = homeHtml.replace('</head>', `${homeSchema}\n</head>`);

  fs.writeFileSync(TEMPLATE_PATH, homeHtml);
  console.log('Main index.html updated with site data and schema.');

  // 2. Generate Album Pages
  const albumsDir = path.join(DIST_DIR, 'albums');
  if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir, { recursive: true });

  for (const album of data.albums) {
    const slug = slugify(album.title);
    const albumPath = path.join(albumsDir, slug);
    if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });

    let albumHtml = template;
    const albumTitle = `${album.title} by Alarm! Alarm! | Official Discography`;
    const albumDesc = `Listen to ${album.title}, a release by Málaga punk rock band Alarm! Alarm!. Released on ${album.release_date}.`;

    // Replace title and meta tags
    albumHtml = albumHtml.replace(/<title>.*?<\/title>/, `<title>${albumTitle}</title>`);
    albumHtml = albumHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${albumDesc}" />`);

    // Inject Album Schema
    const albumSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicAlbumSchema(album))}</script>`;
    albumHtml = albumHtml.replace('</head>', `${albumSchema}\n</head>`);

    // Inject SITE_DATA (so the app knows which album to show if we add routing later)
    albumHtml = albumHtml.replace('</head>', `${siteDataScript}\n</head>`);

    fs.writeFileSync(path.join(albumPath, 'index.html'), albumHtml);
    console.log(`Generated page for album: ${album.title} (/albums/${slug})`);
  }

  // 3. Generate Sitemap
  const baseUrl = 'https://alarmalarmmalaga.github.io';
  const urls = [
    { loc: `${baseUrl}/`, priority: '1.0' },
    ...data.albums.map(a => ({ loc: `${baseUrl}/albums/${slugify(a.title)}/`, priority: '0.8' }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated.');

  // 4. Generate Robots.txt
  const robots = `# Allow all crawlers, including AI
User-agent: *
Allow: /

# Specific AI crawlers
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('Robots.txt generated.');
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
