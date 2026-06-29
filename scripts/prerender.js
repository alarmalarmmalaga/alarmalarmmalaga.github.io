import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const getOptimizedUrl = (url, width) => {
  if (!url) return '';
  if (url.includes('supabase.co')) {
    return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + `?width=${width}&quality=75&format=webp`;
  }
  return url;
};

const slugify = (text) =>
  text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

const getHreflangTags = (currentSlug = '', isXml = false) => {
  const baseUrl = 'https://alarmalarmmalaga.github.io';
  const languages = ['en', 'es', 'de', 'jp'];
  const seoLangCodes = { en: 'en', es: 'es', de: 'de', jp: 'ja' };

  let tags = languages.map(l => {
    const lSuffix = l === 'en' ? '' : `${l}/`;
    const seoLang = seoLangCodes[l] || l;
    const url = `${baseUrl}/${lSuffix}${currentSlug}`;
    return isXml
      ? `    <xhtml:link rel="alternate" hreflang="${seoLang}" href="${escapeXml(url)}" />`
      : `    <link rel="alternate" hreflang="${seoLang}" href="${url}" />`;
  }).join('\n');

  const xDefaultUrl = `${baseUrl}/${currentSlug}`;
  tags += isXml
    ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefaultUrl)}" />`
    : `\n    <link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`;

  return tags;
};

const escapeXml = (unsafe) => {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/ʼ/g, "'")
    .replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
};

async function fetchData() {
  if (!supabase) {
    return {
      albums: [
        { id: 1, title: 'Amateur Skater', release_date: '2025-01-01', cover_url: 'https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/albums/mock.png', songs: [{ title: 'Track 1' }] },
      ],
      gridItems: [
        { id: 1, image_url: 'https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/mock.jpg', caption: 'Mock Photo', alt_description: 'Mock Alt' }
      ],
      pressKit: [],
      latestNoise: {
        title: 'Amateur Skater',
        message: 'Stream our new EP, "Amateur Skater," right here via Spotify.',
        spotify_embed_url: 'https://open.spotify.com/embed/album/38AXd6UNJ3EDpUUZGx0ubE?utm_source=generator',
        apple_music_url: 'https://music.apple.com/us/artist/alarm-alarm/1494187277',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/',
        youtube_music_url: 'https://music.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ'
      },
      strings: {
        latest_noise_header: { en: 'Our Latest Noise', es: 'Último trallazo', de: 'Unser neuester Lärm', jp: '最新のノイズ' },
        latest_noise_message: { en: 'Stream our new release, \'Stuck at the Green Hill Zone,\' right here via Spotify.', es: 'Escucha nuestro nuevo lanzamiento, \'Stuck at the Green Hill Zone\', aquí mismo en Spotify.' },
        tour_title: { en: 'See Alarm! Alarm! Live in Málaga and Beyond', es: 'Alarm! Alarm! en directo en Málaga y más allá' },
        tour_intro: { en: "We're hitting the road.", es: 'Nos echamos a la carretera.' },
        social_title: { en: 'The Brutalist Grid', es: 'El Grid Brutalista', jp: 'ブルータリスト・グリッド' },
        instagram_cta: { en: 'WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →' },
        video_title: { en: 'Watch Us', es: 'Míranos en acción' },
        releases_title: { en: 'Releases' },
        bio_title: { en: 'Biography', es: 'Biografía', de: 'Biografie', jp: 'バイオグラフィー' },
        bio_content: { en: 'Alarm! Alarm! is a Punk Rock band from Málaga, Spain.', es: 'Alarm! Alarm! es una banda de Punk Rock de Málaga.' },
        epk_title: { en: 'Electronic Press Kit', es: 'EPK / Dossier de Prensa', de: 'Elektronische Pressemappe', jp: '電子プレスキット' },
        press_kit_title: { en: 'Press Kit & Downloads', es: 'Kit de Prensa y Descargas' },
        contact_booking_title: { en: 'Contact & Booking' },
        streaming_title: { en: 'Streaming' },
        back_to_main_site: { en: 'BACK TO MAIN SITE' },
        back_to_home: { en: 'Back to Home' },
        site_title: {
          en: 'Alarm! Alarm! | Official Punk Rock from Málaga',
          es: 'Alarm! Alarm! | Punk Rock Oficial de Málaga',
          de: 'Alarm! Alarm! | Offizieller Punkrock aus Málaga',
          jp: 'Alarm! Alarm! | マラガの公式パンクロック'
        },
        site_description: {
          en: 'Official website for Alarm! Alarm!, a punk rock band from Málaga.',
          es: 'Sitio oficial de Alarm! Alarm!, banda de punk rock de Málaga.',
          de: 'Offizielle Website von Alarm! Alarm!, einer Punkrock-Band aus Málaga.',
          jp: 'マラガのパンクロックバンド、Alarm! Alarm!の公式サイト。'
        },
        album_cover_alt: { en: 'album cover - Alarm! Alarm! Punk Málaga' },
        band_photo_alt: { en: 'Alarm! Alarm! band photo' },
        hero_tagline: {
          en: 'Aging, work, and the general disappointment of modern life in high-volume punk rock.',
          es: 'Envejecimiento, trabajo y la decepción general de la vida moderna en punk rock a todo volumen.',
          de: 'Altern, Arbeit und die allgemeine Enttäuschung des modernen Lebens in lautstarkem Punkrock.',
          jp: '大音量のパンクロックで歌う、加齢、仕事、そして現代生活への全般的な失望。'
        }
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
  const fallbacks = {
    'site_title': 'Alarm! Alarm! | Official Punk Rock from Málaga',
    'site_description': 'Official website for Alarm! Alarm!, a punk rock band from Málaga.'
  };
  if (!row) return fallbacks[key] || key;
  return row[lang] || row['en'] || fallbacks[key] || key;
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
    "genre": "Punk Rock"
  };
}

function generateMusicGroupSchema(data, lang) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Alarm Alarm",
    "alternateName": "Alarm! Alarm!",
    "url": "https://alarmalarmmalaga.github.io/",
    "logo": "https://alarmalarmmalaga.github.io/AlarmAlarm_icon.png",
    "image": "https://alarmalarmmalaga.github.io/AlarmAlarm_icon.png",
    "genre": ["Punk Rock"],
    "description": t(data.strings, 'bio_content', lang)
  };
}

function generateHomeStaticHtml(data, lang) {
  const releasesHtml = data.albums.map(album => `
    <article class="album-card">
      <img src="${getOptimizedUrl(album.cover_url, 400)}" alt="${album.title} ${t(data.strings, 'album_cover_alt', lang)}" loading="lazy" width="400" height="400" />
      <div class="album-info">
        <h3>${album.title}</h3>
        <p class="album-year">${new Date(album.release_date).getFullYear()}</p>
      </div>
    </article>
  `).join('');

  const gridHtml = data.gridItems.map(item => `
    <figure class="grid-item">
      <img src="${getOptimizedUrl(item.image_url, 600)}" alt="${item.alt_description || item.caption || t(data.strings, 'band_photo_alt', lang)}" loading="lazy" width="600" height="600" />
      <figcaption>${item.caption}</figcaption>
    </figure>
  `).join('');

  const noise = data.latestNoise;
  const noiseHtml = noise ? `
    <section id="music">
      <h2>${t(data.strings, 'latest_noise_header', lang)}: "${noise.title}"</h2>
      <p>${t(data.strings, 'latest_noise_message', lang)}</p>
      <div class="video-container">
        <iframe src="${noise.spotify_embed_url}" title="Spotify Embed - ${noise.title}" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </section>
  ` : '';

  return `
    <header class="hero-section-stable">
      <h1 class="band-name-stable">${t(data.strings, 'site_title', lang)}</h1>
      <p class="hero-tagline-stable">${t(data.strings, 'hero_tagline', lang)}</p>
    </header>
    <main>
      ${noiseHtml}
      <section id="tour">
        <h2>${t(data.strings, 'tour_title', lang)}</h2>
      </section>
      <section id="releases">
        <h2>${t(data.strings, 'releases_title', lang)}</h2>
        <div class="releases-grid">${releasesHtml}</div>
      </section>
      <section id="social">
        <h2>${t(data.strings, 'social_title', lang)}</h2>
        <div class="brutalist-grid">${gridHtml}</div>
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
      <h1>${album.title} (${year}) | Alarm! Alarm!</h1>
    </header>
    <main>
      <article>
        <img src="${getOptimizedUrl(album.cover_url, 800)}" alt="${album.title} cover art" loading="eager" width="800" height="800" />
        <h2>Tracklist for ${album.title}</h2>
        <ol>${(album.songs || []).sort((a,b) => (a.track_number || 0) - (b.track_number || 0)).map(song => `<li>${song.title}</li>`).join('')}</ol>
      </article>
    </main>
    <footer>
      <p><a href="${lang === 'en' ? '/' : `/${lang}/`}">${t(data.strings, 'back_to_home', lang)}</a></p>
    </footer>
  `;
}

async function prerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) process.exit(1);
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const data = await fetchData();
  const baseUrl = 'https://alarmalarmmalaga.github.io';
  const languages = ['en', 'es', 'de', 'jp'];
  const seoLangCodes = { en: 'en', es: 'es', de: 'de', jp: 'ja' };

  for (const lang of languages) {
    const langSuffix = lang === 'en' ? '' : `${lang}/`;
    const langDir = path.join(DIST_DIR, lang === 'en' ? '' : lang);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    let homeHtml = template;
    homeHtml = homeHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);
    homeHtml = homeHtml.replace('<!--HREFLANG_PLACEHOLDER-->', getHreflangTags('', false));
    const homeCanonical = `${baseUrl}/${langSuffix}`;
    homeHtml = homeHtml.replace('<!--CANONICAL_PLACEHOLDER-->', `<link rel="canonical" href="${homeCanonical}" />`);

    const homeTitle = t(data.strings, 'site_title', lang);
    const homeDesc = t(data.strings, 'site_description', lang);
    homeHtml = homeHtml.replace(/<title>.*?<\/title>/, `<title>${homeTitle}</title>`);
    homeHtml = homeHtml.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${homeDesc}" />`);

    const siteDataScript = `<script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`;
    homeHtml = homeHtml.replace('</head>', `${siteDataScript}\n</head>`);
    const homeSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicGroupSchema(data, lang))}</script>`;
    homeHtml = homeHtml.replace('</head>', `${homeSchema}\n</head>`);
    homeHtml = homeHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${generateHomeStaticHtml(data, lang)}</div>`);

    fs.writeFileSync(path.join(langDir, 'index.html'), homeHtml);

    const epkDir = path.join(langDir, 'epk');
    if (!fs.existsSync(epkDir)) fs.mkdirSync(epkDir, { recursive: true });
    let epkHtml = template;
    epkHtml = epkHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);
    epkHtml = epkHtml.replace('<!--HREFLANG_PLACEHOLDER-->', getHreflangTags('epk/', false));
    epkHtml = epkHtml.replace('<!--CANONICAL_PLACEHOLDER-->', `<link rel="canonical" href="${baseUrl}/${langSuffix}epk/" />`);
    epkHtml = epkHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root"><main><h1>${t(data.strings, 'epk_title', lang)}</h1><p>${t(data.strings, 'bio_content', lang)}</p></main></div>`);
    fs.writeFileSync(path.join(epkDir, 'index.html'), epkHtml);

    const albumsDir = path.join(langDir, 'albums');
    if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir, { recursive: true });
    for (const album of data.albums) {
      const slug = slugify(album.title);
      const albumPath = path.join(albumsDir, slug);
      if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });
      let albumHtml = template;
      albumHtml = albumHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);
      albumHtml = albumHtml.replace('<!--HREFLANG_PLACEHOLDER-->', getHreflangTags(`albums/${slug}/`, false));
      albumHtml = albumHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${generateAlbumStaticHtml(album, data, lang)}</div>`);
      fs.writeFileSync(path.join(albumPath, 'index.html'), albumHtml);
    }
  }

  let lastmod = new Date().toISOString().split('T')[0];
  if (lastmod.startsWith('2026')) lastmod = '2025-12-31';

  const sitemapUrls = [];
  const homePages = languages.map(l => ({ lang: l, loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}` }));
  for (const page of homePages) {
    sitemapUrls.push(`  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.lang === 'en' ? '1.0' : '0.9'}</priority>
${getHreflangTags('', true)}
  </url>`);
  }

  const epkPages = languages.map(l => ({ lang: l, loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}epk/` }));
  for (const page of epkPages) {
    sitemapUrls.push(`  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${getHreflangTags('epk/', true)}
  </url>`);
  }

  for (const album of data.albums) {
    const slug = slugify(album.title);
    const albumPages = languages.map(l => ({ lang: l, loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}albums/${slug}/` }));
    for (const page of albumPages) {
      sitemapUrls.push(`  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${getHreflangTags(`albums/${slug}/`, true)}
  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemapUrls.join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
