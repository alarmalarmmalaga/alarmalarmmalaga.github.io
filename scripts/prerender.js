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
      pressKit: [],
      latestNoise: {
        title: 'Amateur Skater',
        message: 'Stream our new EP, "Amateur Skater," right here via Spotify. For the best experience, use headphones and turn it up loud. Also available on all major streaming platforms.',
        spotify_embed_url: 'https://open.spotify.com/embed/album/38AXd6UNJ3EDpUUZGx0ubE?utm_source=generator',
        apple_music_url: 'https://music.apple.com/us/artist/alarm-alarm/1494187277',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/',
        youtube_music_url: 'https://music.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ'
      },
      strings: {
        latest_noise_header: { en: 'Our Latest Noise', es: 'Nuestro último ruido', de: 'Unser neuester Lärm', jp: '最新のノイズ' },
        latest_noise_message: {
          en: 'Stream our new release, \'Stuck at the Green Hill Zone,\' right here via Spotify. For the best experience, use headphones and turn it up loud. Also available on all major streaming platforms.',
          es: 'Escucha nuestro nuevo lanzamiento, \'Stuck at the Green Hill Zone,\' aquí mismo a través de Spotify. Para la mejor experiencia, usa auriculares y sube el volumen. También disponible en todas las principales plataformas de streaming.',
          de: 'Streame unsere neue Veröffentlichung \'Stuck at the Green Hill Zone\' direkt hier über Spotify. Für das beste Erlebnis verwende Kopfhörer und drehe die Lautstärke auf. Auch auf allen gängigen Streaming-Plattformen verfügbar.',
          jp: '最新リリース「Stuck at the Green Hill Zone」をここSpotifyでストリーミング。最高の体験のために、ヘッドフォンを使用して音量を上げてお楽しみください。主要なすべてのストリーミングプラットフォームでも配信中。'
        },
        tour_title: { en: 'See Alarm! Alarm! Live in Málaga and Beyond' },
        tour_intro: { en: "We're hitting the road. Check out our upcoming dates below, powered by Bandsintown. Never miss a show." },
        social_title: { en: 'The Brutalist Grid', jp: 'ブルータリスト・グリッド' },
        instagram_cta: { en: 'WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →' },
        video_title: { en: 'Watch Us' },
        releases_title: { en: 'Releases' },
        bio_title: { en: 'Our Story' },
        bio_content: { en: 'Alarm! Alarm! is a punk band from Málaga singing about all the stuff we try to ignore: aging, work, and the general disappointment of modern life.' },
        contact_title: { en: 'Contact & Downloads' },
        booking_press: { en: 'BOOKING/PRESS:' },
        official_channels: { en: 'Official Channels (E-E-A-T)' },
        press_kit_title: { en: 'Press Kit & Downloads' },
        back_to_home: { en: 'Back to Home' }
      }
    };
  }

  const { data: albums } = await supabase.from('albums').select('*, songs(*)').order('release_date', { ascending: false });
  const { data: gridItems } = await supabase.from('brutalist_grid').select('*').order('created_at', { ascending: false }).limit(8);
  const { data: pressKit } = await supabase.from('press_kit').select('*');
  const { data: latestNoise } = await supabase.from('latest_noise').select('*').order('created_at', { ascending: false }).limit(1).single();
  const { data: siteStrings } = await supabase.from('site_strings').select('*');

  const stringsMap = (siteStrings || []).reduce((acc, row) => {
    acc[row.key] = row;
    return acc;
  }, {});

  return {
    albums: albums || [],
    gridItems: gridItems || [],
    pressKit: pressKit || [],
    latestNoise: latestNoise || null,
    strings: stringsMap
  };
}

function t(strings, key, lang) {
  const row = strings[key];
  if (!row) return key;
  return row[lang] || row['en'] || key;
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

function generateHomeStaticHtml(data, lang) {
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

  const noise = data.latestNoise;
  const noiseHtml = noise ? `
    <section id="music">
      <h2>${t(data.strings, 'latest_noise_header', lang)}: "${noise.title}"</h2>
      <p>${t(data.strings, 'latest_noise_message', lang)}</p>
      <div>
        <iframe src="${noise.spotify_embed_url}" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      <div>
        ${noise.apple_music_url ? `<a href="${noise.apple_music_url}">Apple Music</a>` : ''}
        ${noise.bandcamp_url ? `<a href="${noise.bandcamp_url}">Bandcamp</a>` : ''}
        ${noise.youtube_music_url ? `<a href="${noise.youtube_music_url}">YouTube Music</a>` : ''}
      </div>
    </section>
  ` : '';

  return `
    <header><h1>Alarm! Alarm! | Official Website</h1></header>
    <main>
      ${noiseHtml}
      <section id="releases">
        <h2>${t(data.strings, 'releases_title', lang)}</h2>
        ${releasesHtml}
      </section>
      <section id="social">
        <h2>${t(data.strings, 'social_title', lang)}</h2>
        ${gridHtml}
      </section>
      <section id="contact">
        <h2>${t(data.strings, 'contact_title', lang)}</h2>
        <p>${t(data.strings, 'booking_press', lang)} <a href="mailto:alarmalarmmalaga@gmail.com">alarmalarmmalaga@gmail.com</a></p>
        <ul>
          <li><a href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz" rel="me">Spotify Official</a></li>
          <li><a href="https://alarmalarm.bandcamp.com/" rel="me">Bandcamp Official</a></li>
          <li><a href="https://www.instagram.com/alarmalarmmalaga" rel="me">Instagram</a></li>
        </ul>
        <div id="press-kit">
          <h3>${t(data.strings, 'press_kit_title', lang)}</h3>
          ${pressKitHtml}
        </div>
      </section>
      <section id="bio">
        <h2>${t(data.strings, 'bio_title', lang)}</h2>
        <p>${t(data.strings, 'bio_content', lang)}</p>
      </section>
    </main>
  `;
}

function generateAlbumStaticHtml(album, data, lang) {
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
      <p><a href="${lang === 'en' ? '/' : `/${lang}/`}">${t(data.strings, 'back_to_home', lang)}</a></p>
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
  const languages = ['en', 'es', 'de', 'jp'];

  for (const lang of languages) {
    const langSuffix = lang === 'en' ? '' : `${lang}/`;
    const langDir = path.join(DIST_DIR, lang === 'en' ? '' : lang);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    // 1. Generate Homepage
    let homeHtml = template;
    homeHtml = homeHtml.replace('<html lang="en">', `<html lang="${lang}">`);

    // Inject SITE_DATA
    const siteDataScript = `<script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`;
    homeHtml = homeHtml.replace('</head>', `${siteDataScript}\n</head>`);

    // Inject Home Schema
    const homeSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicGroupSchema())}</script>`;
    homeHtml = homeHtml.replace('</head>', `${homeSchema}\n</head>`);

    // Inject Static HTML for SEO
    const homeStaticHtml = generateHomeStaticHtml(data, lang);
    homeHtml = homeHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${homeStaticHtml}</div>`);

    fs.writeFileSync(path.join(langDir, 'index.html'), homeHtml);
    console.log(`Generated ${lang.toUpperCase()} index.html`);

    // 2. Generate Album Pages for this language
    const albumsDir = path.join(langDir, 'albums');
    if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir, { recursive: true });

    for (const album of data.albums) {
      const slug = slugify(album.title);
      const albumPath = path.join(albumsDir, slug);
      if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });

      let albumHtml = template;
      albumHtml = albumHtml.replace('<html lang="en">', `<html lang="${lang}">`);

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
      albumHtml = albumHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${baseUrl}/${langSuffix}albums/${slug}/" />`);

      // Inject Album Schema
      const albumSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicAlbumSchema(album))}</script>`;
      albumHtml = albumHtml.replace('</head>', `${albumSchema}\n</head>`);

      // Inject SITE_DATA
      albumHtml = albumHtml.replace('</head>', `${siteDataScript}\n</head>`);

      // Inject Static HTML for SEO
      const albumStaticHtml = generateAlbumStaticHtml(album, data, lang);
      albumHtml = albumHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${albumStaticHtml}</div>`);

      fs.writeFileSync(path.join(albumPath, 'index.html'), albumHtml);
    }
    console.log(`Generated ${lang.toUpperCase()} album pages`);
  }

  // 3. Generate Sitemap
  const urls = [];
  for (const lang of languages) {
    const langSuffix = lang === 'en' ? '' : `${lang}/`;
    urls.push({ loc: `${baseUrl}/${langSuffix}`, priority: lang === 'en' ? '1.0' : '0.9' });
    for (const a of data.albums) {
      urls.push({ loc: `${baseUrl}/${langSuffix}albums/${slugify(a.title)}/`, priority: '0.8' });
    }
  }

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
