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
    "image": album.cover_url,
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
    "logo": "https://alarmalarmmalaga.github.io/AlarmAlarm_icon.png",
    "genre": "Punk Rock",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Málaga",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz",
      "https://alarmalarm.bandcamp.com/",
      "https://www.instagram.com/alarmalarmmalaga"
    ]
  };
}

function generateHomeStaticHtml(data) {
  const releasesHtml = data.albums.map(album => `
    <article>
      <h3>${album.title} (${new Date(album.release_date).getFullYear()})</h3>
      <img src="${album.cover_url}" alt="${album.title} cover" />
      <ul>
        ${(album.songs || []).map(song => `<li>${song.title}</li>`).join('')}
      </ul>
    </article>
  `).join('');

  const gridHtml = data.gridItems.map(item => `
    <figure>
      <img src="${item.image_url}" alt="${item.alt_description || item.caption || 'Band photo'}" />
      <figcaption>${item.caption}</figcaption>
    </figure>
  `).join('');

  const pressKitHtml = data.pressKit.map(asset => `
    <p><a href="${asset.file_url}">${asset.label}</a></p>
  `).join('');

  return `
    <header><h1>Alarm! Alarm! | Official Website</h1></header>
    <main>
      <section id="releases">
        <h2>Latest Releases</h2>
        ${releasesHtml}
      </section>
      <section id="social">
        <h2>The Brutalist Grid</h2>
        ${gridHtml}
      </section>
      <section id="contact">
        <h2>Contact & Official Channels</h2>
        <p>Email: <a href="mailto:alarmalarmmalaga@gmail.com">alarmalarmmalaga@gmail.com</a></p>
        <ul>
          <li><a href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz" rel="me">Spotify Official</a></li>
          <li><a href="https://alarmalarm.bandcamp.com/" rel="me">Bandcamp Official</a></li>
          <li><a href="https://www.instagram.com/alarmalarmmalaga" rel="me">Instagram</a></li>
        </ul>
        <div id="press-kit">
          <h3>Press Kit Downloads</h3>
          ${pressKitHtml}
        </div>
      </section>
    </main>
  `;
}

function generateAlbumStaticHtml(album) {
  const year = new Date(album.release_date).getFullYear();
  return `
    <header>
      <h1>${album.title} (${year})</h1>
      <p>Official release by Alarm! Alarm!</p>
    </header>
    <main>
      <article>
        <img src="${album.cover_url}" alt="${album.title} cover" />
        <p>Released on ${album.release_date}</p>
        <h2>Tracklist</h2>
        <ol>
          ${(album.songs || []).sort((a,b) => (a.track_number || 0) - (b.track_number || 0)).map(song => `<li>${song.title}</li>`).join('')}
        </ol>
        <div class="streaming-links">
          ${album.spotify_link ? `<a href="${album.spotify_link}">Listen on Spotify</a>` : ''}
          ${album.bandcamp_link ? `<a href="${album.bandcamp_link}">Listen on Bandcamp</a>` : ''}
        </div>
      </article>
    </main>
    <footer>
      <p><a href="/">Back to Home</a></p>
    </footer>
  `;
}

async function prerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Build template not found at', TEMPLATE_PATH);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const data = await fetchData();

  const baseUrl = 'https://alarmalarmmalaga.github.io';

  // 1. Generate Homepage
  let homeHtml = template;

  // Inject SITE_DATA
  const siteDataScript = `<script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`;
  homeHtml = homeHtml.replace('</head>', `${siteDataScript}\n</head>`);

  // Inject Home Schema
  const homeSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicGroupSchema())}</script>`;
  homeHtml = homeHtml.replace('</head>', `${homeSchema}\n</head>`);

  // Inject Static HTML for SEO (Idempotent replacement)
  const homeStaticHtml = generateHomeStaticHtml(data);
  homeHtml = homeHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${homeStaticHtml}</div>`);

  fs.writeFileSync(TEMPLATE_PATH, homeHtml);
  console.log('Main index.html updated with site data, schema, and semantic HTML.');

  // 2. Generate Album Pages
  const albumsDir = path.join(DIST_DIR, 'albums');
  if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir, { recursive: true });

  for (const album of data.albums) {
    const slug = slugify(album.title);
    const albumPath = path.join(albumsDir, slug);
    if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });

    let albumHtml = template;
    const year = new Date(album.release_date).getFullYear();
    const albumTitle = `${album.title} (${year}) | Alarm! Alarm! Official Discography`;
    const albumDesc = `Listen to ${album.title}, a release by Málaga punk rock band Alarm! Alarm!. Released in ${year}. Tracklist: ${(album.songs || []).map(s => s.title).join(', ')}.`;

    // Replace title and meta tags
    albumHtml = albumHtml.replace(/<title>.*?<\/title>/, `<title>${albumTitle}</title>`);
    albumHtml = albumHtml.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${albumDesc}" />`);

    // Update Open Graph tags
    albumHtml = albumHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${albumTitle}" />`);
    albumHtml = albumHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${albumDesc}" />`);
    albumHtml = albumHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${album.cover_url}" />`);
    albumHtml = albumHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${baseUrl}/albums/${slug}/" />`);

    // Update Twitter tags
    albumHtml = albumHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${albumTitle}" />`);
    albumHtml = albumHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${albumDesc}" />`);
    albumHtml = albumHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="${album.cover_url}" />`);

    // Inject Album Schema
    const albumSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicAlbumSchema(album))}</script>`;
    albumHtml = albumHtml.replace('</head>', `${albumSchema}\n</head>`);

    // Inject SITE_DATA
    albumHtml = albumHtml.replace('</head>', `${siteDataScript}\n</head>`);

    // Inject Static HTML for SEO
    const albumStaticHtml = generateAlbumStaticHtml(album);
    albumHtml = albumHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${albumStaticHtml}</div>`);

    fs.writeFileSync(path.join(albumPath, 'index.html'), albumHtml);
    console.log(`Generated page for album: ${album.title} (/albums/${slug})`);
  }

  // 3. Generate Sitemap
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
