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
        latest_noise_header: { en: 'Our Latest Noise', es: 'Último trallazo', de: 'Unser neuester Lärm', jp: '最新のノイズ' },
        latest_noise_message: {
          en: 'Stream our new release, \'Stuck at the Green Hill Zone,\' right here via Spotify. For the best experience, use headphones and turn it up loud. Also available on all major streaming platforms.',
          es: 'Escucha nuestro nuevo lanzamiento, \'Stuck at the Green Hill Zone\', aquí mismo en Spotify. Para disfrutarlo de verdad, ponte los cascos y ponlo a todo volumen. También disponible en el resto de plataformas de streaming.',
          de: 'Streame unsere neue Veröffentlichung \'Stuck at the Green Hill Zone\' direkt hier über Spotify. Kopfhörer aufsetzen und voll aufdrehen für das beste Erlebnis. Auch auf allen gängigen Streaming-Plattformen verfügbar.',
          jp: '最新リリース「Stuck at the Green Hill Zone」をここSpotifyでストリーミング。最高の体験のために、ヘッドフォンを使用して音量を上げてお楽しみください。主要なすべてのストリーミングプラットフォームでも配信中。'
        },
        tour_title: { en: 'See Alarm! Alarm! Live in Málaga and Beyond', es: 'Alarm! Alarm! en directo en Málaga y más allá' },
        tour_intro: { en: "We're hitting the road. Check out our upcoming dates below, powered by Bandsintown. Never miss a show.", es: 'Nos echamos a la carretera. Echa un ojo a nuestras próximas fechas abajo, cortesía de Bandsintown. No te pierdas ni un bolo.' },
        social_title: { en: 'The Brutalist Grid', es: 'El Grid Brutalista', jp: 'ブルータリスト・グリッド' },
        instagram_cta: { en: 'WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →' },
        video_title: { en: 'Watch Us', es: 'Míranos en acción' },
        releases_title: { en: 'Releases' },
        bio_title: { en: 'Biography', es: 'Biografía', de: 'Biografie', jp: 'バイオグラフィー' },
        bio_content: {
          en: 'Alarm! Alarm! is a Punk Rock band from Málaga, Spain. We sing about all the stuff we try to ignore: aging, work, and the general disappointment of modern life.',
          es: 'Alarm! Alarm! es una banda de Punk Rock de Málaga que canta sobre todas las cosas que intentamos ignorar: el envejecimiento, el curro y la decepción general de la vida moderna. La formación actual incluye a Pablo Rodríguez (voz y guitarra), Alejandro Villegas (batería y coros) y Mike Thrippleton (bajo y coros). Por la banda también han pasado Emilio Villegas (bajo y silencio selectivo) y José Arjona (guitarra y coros). Su álbum debut Bloody Hell! (2020) fue un fuerte grito al vacío. El siguiente, Whatever... (2022), confirmó que las cosas no habían mejorado. Ahora, en 2025, sorprenden a todos (incluidos ellos mismos) lanzando tres nuevos EPs, el primero titulado \'98-\'99 — un tributo nostálgico y melódico a la era de los pantalones anchos y el MSN Messenger. Alarm! Alarm! no solucionará tus problemas, pero los gritará lo suficientemente fuerte como para que te sientas mejor.',
          de: 'Alarm! Alarm! ist eine Punkrock-Band aus Málaga, die über all die Dinge singt, die wir zu ignorieren versuchen: Altern, Arbeit und die allgemeine Enttäuschung über das moderne Leben.',
          jp: 'Alarm! Alarm!は、マラガ出身のパンクロックバンドです。加齢、仕事、現代生活の全般的な失望など、私たちが無視しようとしているすべてのことについて歌っています。'
        },
        contact_title: { en: 'Contact & Downloads' },
        booking_press: { en: 'BOOKING/PRESS:', es: 'BOOKING / PRENSA:' },
        official_channels: { en: 'Official Channels (E-E-A-T)' },
        linktree_label: { en: 'Linktree Official', es: 'Linktree Oficial', de: 'Offizielles Linktree', jp: 'Linktree公式' },
        press_kit_title: { en: 'Press Kit & Downloads', es: 'Kit de Prensa y Descargas', de: 'Pressekit & Downloads', jp: 'プレスキットとダウンロード' },
        epk_title: { en: 'Electronic Press Kit', es: 'EPK / Dossier de Prensa', de: 'Elektronische Pressemappe', jp: '電子プレスキット' },
        tour_recent_highlights: { en: 'Recent Missions & Highlights:', es: 'Últimas misiones y highlights:', de: 'Aktuelle Missionen & Highlights:', jp: '最近のミッションとハイライト：' },
        tour_view_full_log: { en: 'VIEW FULL MISSION LOG', es: 'VER HISTORIAL COMPLETO DE MISIONES', de: 'VOLLSTÄNDIGES MISSIONSPROTOKOLL ANSEHEN', jp: 'ミッションログをすべて表示' },
        tour_close_log: { en: 'CLOSE ARCHIVE', es: 'CERRAR ARCHIVO', de: 'ARCHIV SCHLIESSEN', jp: 'アーカイブを閉じる' },
        asset_promo_text: { en: 'Official band asset for promotional use.', es: 'Material oficial de la banda para uso promocional.', de: 'Offizielles Band-Asset für Werbezwecke.', jp: 'プロモーション用の公式バンドアセット。' },
        download_label: { en: 'DOWNLOAD', es: 'DESCARGAR', de: 'HERUNTERLADEN', jp: 'ダウンロード' },
        official_dossier_label: { en: 'OFFICIAL DOSSIER', es: 'DOSSIER OFICIAL', de: 'OFFIZIELLES DOSSIER', jp: '公式ドシエ' },
        dossier_description: { en: 'Stage plot, input list and bio.', es: 'Stage plot, input list y bio.', de: 'Stageplot, Inputliste und Biografie.', jp: 'ステージプロット、インプットリスト、バイオグラフィー。' },
        view_dossier_label: { en: 'VIEW DOSSIER', es: 'VER DOSSIER', de: 'DOSSIER ANSEHEN', jp: 'ドシエを見る' },
        contact_booking_title: { en: 'Contact & Booking', es: 'Contacto y Booking', de: 'Kontakt & Booking', jp: 'お問い合わせと予約' },
        streaming_title: { en: 'Streaming', es: 'Streaming', de: 'Streaming', jp: 'ストリーミング' },
        back_to_main_site: { en: 'BACK TO MAIN SITE', es: 'VOLVER AL SITIO PRINCIPAL', de: 'ZURÜCK ZUR HAUPTSEITE', jp: 'メインサイトに戻る' },
        loading_downloads: { en: 'Loading downloads...', es: 'Cargando descargas...', de: 'Downloads werden geladen...', jp: 'ダウンロードを読み込んでいます...' },
        downloads_unavailable: { en: 'Downloads are currently unavailable.', es: 'Las descargas no están disponibles en este momento.', de: 'Downloads sind derzeit nicht verfügbar.', jp: '現在、ダウンロードは利用できません。' },
        back_to_home: { en: 'Back to Home', es: 'Volver al Inicio', de: 'Zurück zum Start', jp: 'ホームに戻る' },
        site_title: {
          en: 'Alarm! Alarm! | Official Punk Rock from Málaga',
          es: 'Alarm! Alarm! | Punk Rock Oficial de Málaga',
          de: 'Alarm! Alarm! | Offizieller Punkrock aus Málaga',
          jp: 'Alarm! Alarm! | マラガの公式パンクロック'
        },
        site_description: {
          en: 'Official website for Alarm! Alarm!, a punk rock band from Málaga. Listen to our latest releases, find tour dates, and follow the chaos.',
          es: 'Sitio oficial de Alarm! Alarm!, banda de punk rock de Málaga. Escucha nuestros últimos lanzamientos, encuentra fechas de gira y sigue el caos.',
          de: 'Offizielle Website von Alarm! Alarm!, einer Punkrock-Band aus Málaga. Hören Sie unsere neuesten Veröffentlichungen, finden Sie Tourdaten und folgen Sie dem Chaos.',
          jp: 'マラガのパンクロックバンド、Alarm! Alarm!の公式サイト。最新リリースの視聴、ツアー日程の確認、そしてカオスをフォローしてください。'
        },
        album_cover_alt: {
          en: 'album cover - Alarm! Alarm! Punk Málaga',
          es: 'portada del álbum - Alarm! Alarm! Punk Málaga',
          de: 'Albumcover - Alarm! Alarm! Punk Málaga',
          jp: 'アルバムのカバー - Alarm! Alarm! パンク マラガ'
        },
        band_photo_alt: {
          en: 'Alarm! Alarm! band photo',
          es: 'Foto de la banda Alarm! Alarm!',
          de: 'Alarm! Alarm! Bandfoto',
          jp: 'Alarm! Alarm! バンド写真'
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
    'site_description': 'Official website for Alarm! Alarm!, a punk rock band from Málaga. Listen to our latest releases, find tour dates, and follow the chaos.'
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
    "genre": "Punk Rock",
    "numTracks": album.songs?.length || 0,
    "track": (album.songs || []).map((song, index) => ({
      "@type": "MusicRecording",
      "name": song.title,
      "position": song.track_number || (index + 1)
    })),
    "offers": album.bandcamp_link ? {
      "@type": "Offer",
      "url": album.bandcamp_link,
      "availability": "https://schema.org/InStock"
    } : undefined
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
    "genre": ["Punk Rock", "Melodic Punk", "Skate Punk"],
    "description": t(data.strings, 'bio_content', lang),
    "foundingDate": "2019",
    "foundingLocation": {
      "@type": "City",
      "name": "Málaga"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Málaga",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "member": [
      {
        "@type": "OrganizationRole",
        "member": {
          "@type": "Person",
          "name": "Pablo Rodríguez"
        },
        "roleName": ["vocals", "guitar"]
      },
      {
        "@type": "OrganizationRole",
        "member": {
          "@type": "Person",
          "name": "Alejandro Villegas"
        },
        "roleName": ["drums", "backing vocals"]
      },
      {
        "@type": "OrganizationRole",
        "member": {
          "@type": "Person",
          "name": "Mike Thrippleton"
        },
        "roleName": ["bass", "backing vocals"]
      }
    ],
    "sameAs": [
      "https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz",
      "https://alarmalarm.bandcamp.com/",
      "https://www.instagram.com/alarmalarmmalaga",
      "https://linktr.ee/alarmalarm",
      "https://www.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ"
    ]
  };
}

function generateHomeStaticHtml(data, lang) {
  const releasesHtml = data.albums.map(album => `
    <article class="album-card">
      <img src="${album.cover_url}" alt="${album.title} ${t(data.strings, 'album_cover_alt', lang)}" loading="lazy" width="300" height="300" />
      <div class="album-info">
        <h3>${album.title}</h3>
        <p class="album-year">${new Date(album.release_date).getFullYear()}</p>
      </div>
      <p>Tracks on ${album.title}:</p>
      <ul>
        ${(album.songs || []).map(song => `<li>${song.title}</li>`).join('')}
      </ul>
      <p>
        <a href="${lang === 'en' ? '' : '/' + lang}/albums/${slugify(album.title)}/">View Album Details</a>
      </p>
    </article>
  `).join('');

  const gridHtml = data.gridItems.map(item => `
    <figure class="grid-item">
      <img src="${item.image_url}" alt="${item.alt_description || item.caption || t(data.strings, 'band_photo_alt', lang)}" loading="lazy" />
      <figcaption>${item.caption}</figcaption>
    </figure>
  `).join('');

  const tourHighlightsHtml = `
    <ul class="show-list">
      <li>Tue, May 19: <strong>THE RUMJACKS</strong> + ALARM! ALARM! at Jerez de la Frontera (Spain)</li>
      <li>Fri, Jan 9: Sinergy Music Fest I (with <strong>Futuras Cuñadas + Picky Pressure</strong>) at Sala Roka (Málaga, Spain)</li>
      <li>Sat, Jun 28, 2025: Malaga Shock Festival (with <strong>Fuzz Division, TV Dangers and The GTO's</strong>) at CSA Las Vegas (Málaga, Spain)</li>
    </ul>
  `;

  const noise = data.latestNoise;
  const noiseHtml = noise ? `
    <section id="music" aria-labelledby="noise-header">
      <h2 id="noise-header">${t(data.strings, 'latest_noise_header', lang)}: "${noise.title}"</h2>
      <p>${t(data.strings, 'latest_noise_message', lang)}</p>
      <div class="video-container">
        <iframe src="${noise.spotify_embed_url}" title="Spotify Embed - ${noise.title}" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
      <nav class="streaming-links" aria-label="Streaming platforms">
        ${noise.apple_music_url ? `<a href="${noise.apple_music_url}" target="_blank" rel="noopener noreferrer">Apple Music</a>` : ''}
        ${noise.bandcamp_url ? `<a href="${noise.bandcamp_url}" target="_blank" rel="noopener noreferrer">Bandcamp</a>` : ''}
        ${noise.youtube_music_url ? `<a href="${noise.youtube_music_url}" target="_blank" rel="noopener noreferrer">YouTube Music</a>` : ''}
      </nav>
    </section>
  ` : '';

  return `
    <header>
      <h1>Alarm! Alarm! | Official Punk Rock from Málaga</h1>
      <p>Aging, work, and the general disappointment of modern life in high-volume punk rock.</p>
    </header>
    <main>
      ${noiseHtml}
      <section id="tour" aria-labelledby="tour-header">
        <h2 id="tour-header">${t(data.strings, 'tour_title', lang)}</h2>
        <p>${t(data.strings, 'tour_intro', lang)}</p>
        <div class="past-shows">
          <h3>${t(data.strings, 'tour_recent_highlights', lang)}</h3>
          ${tourHighlightsHtml}
        </div>
      </section>
      <section id="releases" aria-labelledby="releases-header">
        <h2 id="releases-header">${t(data.strings, 'releases_title', lang)}</h2>
        <div class="releases-grid">
          ${releasesHtml}
        </div>
      </section>
      <section id="social" aria-labelledby="social-header">
        <h2 id="social-header">${t(data.strings, 'social_title', lang)}</h2>
        <div class="brutalist-grid">
          ${gridHtml}
        </div>
      </section>
      <section id="bio" aria-labelledby="bio-header">
        <h2 id="bio-header">${t(data.strings, 'bio_title', lang)}</h2>
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
      <p>Official punk rock release from Málaga, Spain.</p>
    </header>
    <main>
      <article class="h-entry">
        <img src="${album.cover_url}" alt="${album.title} cover art - Alarm! Alarm! Official" loading="eager" width="600" height="600" />
        <p>Released on <time class="dt-published" datetime="${album.release_date}">${album.release_date}</time></p>
        <h2>Tracklist for ${album.title}</h2>
        <ol>
          ${(album.songs || []).sort((a,b) => (a.track_number || 0) - (b.track_number || 0)).map(song => `<li>${song.title}</li>`).join('')}
        </ol>
        <nav class="streaming-links" aria-label="Listen to ${album.title} on streaming platforms">
          ${album.spotify_link ? `<a href="${album.spotify_link}" target="_blank" rel="noopener noreferrer">Listen on Spotify</a>` : ''}
          ${album.bandcamp_link ? `<a href="${album.bandcamp_link}" target="_blank" rel="noopener noreferrer">Listen on Bandcamp</a>` : ''}
        </nav>
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
  const seoLangCodes = { en: 'en', es: 'es', de: 'de', jp: 'ja' };

  for (const lang of languages) {
    const langSuffix = lang === 'en' ? '' : `${lang}/`;
    const langDir = path.join(DIST_DIR, lang === 'en' ? '' : lang);
    if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

    // Helper for hreflang tags
    const generateHreflangTags = (currentSlug = '') => {
      return languages.map(l => {
        const lSuffix = l === 'en' ? '' : `${l}/`;
        const seoLang = seoLangCodes[l] || l;
        return `<link rel="alternate" hreflang="${seoLang}" href="${baseUrl}/${lSuffix}${currentSlug}" />`;
      }).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${currentSlug}" />`;
    };

    // 1. Generate Homepage
    let homeHtml = template;
    homeHtml = homeHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);

    // Inject hreflang
    homeHtml = homeHtml.replace('<!--HREFLANG_PLACEHOLDER-->', generateHreflangTags(''));

    // Inject Canonical
    const homeCanonical = `${baseUrl}/${langSuffix}`;
    homeHtml = homeHtml.replace('<!--CANONICAL_PLACEHOLDER-->', `<link rel="canonical" href="${homeCanonical}" />`);

    // Localize Title and Meta Tags
    const homeTitle = t(data.strings, 'site_title', lang);
    const homeDesc = t(data.strings, 'site_description', lang);
    homeHtml = homeHtml.replace(/<title>.*?<\/title>/, `<title>${homeTitle}</title>`);
    homeHtml = homeHtml.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${homeDesc}" />`);

    // Localize OG and Twitter
    homeHtml = homeHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${homeTitle}" />`);
    homeHtml = homeHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${homeDesc}" />`);
    homeHtml = homeHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${homeCanonical}" />`);
    homeHtml = homeHtml.replace(/<meta property="twitter:url" content=".*?"\s*\/?>/g, `<meta property="twitter:url" content="${homeCanonical}" />`);
    homeHtml = homeHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${homeTitle}" />`);
    homeHtml = homeHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${homeDesc}" />`);
    homeHtml = homeHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/header.jpg" />`);
    homeHtml = homeHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/header.jpg" />`);

    // Inject SITE_DATA
    const siteDataScript = `<script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`;
    homeHtml = homeHtml.replace('</head>', `${siteDataScript}\n</head>`);

    // Inject Home Schema
    const homeSchema = `<script type="application/ld+json">${JSON.stringify(generateMusicGroupSchema(data, lang))}</script>`;
    homeHtml = homeHtml.replace('</head>', `${homeSchema}\n</head>`);

    // Inject Static HTML for SEO
    const homeStaticHtml = generateHomeStaticHtml(data, lang);
    homeHtml = homeHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${homeStaticHtml}</div>`);

    fs.writeFileSync(path.join(langDir, 'index.html'), homeHtml);
    console.log(`Generated ${lang.toUpperCase()} index.html`);

    // 1.5 Generate EPK Page
    const epkDir = path.join(langDir, 'epk');
    if (!fs.existsSync(epkDir)) fs.mkdirSync(epkDir, { recursive: true });

    let epkHtml = template;
    epkHtml = epkHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);
    epkHtml = epkHtml.replace('<!--HREFLANG_PLACEHOLDER-->', generateHreflangTags('epk/'));
    const epkCanonical = `${baseUrl}/${langSuffix}epk/`;
    epkHtml = epkHtml.replace('<!--CANONICAL_PLACEHOLDER-->', `<link rel="canonical" href="${epkCanonical}" />`);

    const epkTitle = `EPK | Alarm! Alarm! Official Press Kit | Punk Rock Málaga`;
    const epkDesc = `Official Electronic Press Kit for Alarm! Alarm!, a punk rock band from Málaga. Biography, high-res photos, logos, and technical rider.`;

    epkHtml = epkHtml.replace(/<title>.*?<\/title>/, `<title>${epkTitle}</title>`);
    epkHtml = epkHtml.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${epkDesc}" />`);
    epkHtml = epkHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/header.jpg" />`);
    epkHtml = epkHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/band_assets/header.jpg" />`);

    epkHtml = epkHtml.replace('</head>', `${siteDataScript}\n</head>`);
    epkHtml = epkHtml.replace('</head>', `${homeSchema}\n</head>`);

    // For SEO, we should at least put the bio, contact and downloads.
    const epkDownloadsHtml = data.pressKit.map(asset => `
      <li><a href="${asset.file_url}" download>${asset.label}</a></li>
    `).join('') + `
      <li><a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/band_logo.png" download>Official Logo</a></li>
      <li><a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmalarm25-64.jpg" download>Band Photo 1</a></li>
      <li><a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmalarm25-83.jpg" download>Band Photo 2</a></li>
      <li><a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmdossier.pdf" target="_blank">Official Dossier</a></li>
    `;

    const epkStaticHtml = `
      <header>
        <h1>${t(data.strings, 'epk_title', lang)}</h1>
        <p>Alarm! Alarm! | Punk Rock Málaga</p>
      </header>
      <main>
        <section><h2>${t(data.strings, 'bio_title', lang)}</h2><p>${t(data.strings, 'bio_content', lang)}</p></section>
        <section><h2>${t(data.strings, 'press_kit_title', lang)}</h2><ul>${epkDownloadsHtml}</ul></section>
        <section><h2>${t(data.strings, 'contact_booking_title', lang)}</h2><p>alarmalarmmalaga@gmail.com</p></section>
        <section><h2>${t(data.strings, 'streaming_title', lang)}</h2><p>Spotify Artist Profile: https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz</p></section>
      </main>
      <footer>
        <a href="${lang === 'en' ? '/' : `/${lang}/`}">${t(data.strings, 'back_to_main_site', lang)}</a>
      </footer>
    `;
    epkHtml = epkHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${epkStaticHtml}</div>`);

    fs.writeFileSync(path.join(epkDir, 'index.html'), epkHtml);
    console.log(`Generated ${lang.toUpperCase()} epk/index.html`);

    // 2. Generate Album Pages for this language
    const albumsDir = path.join(langDir, 'albums');
    if (!fs.existsSync(albumsDir)) fs.mkdirSync(albumsDir, { recursive: true });

    for (const album of data.albums) {
      const slug = slugify(album.title);
      const albumPath = path.join(albumsDir, slug);
      if (!fs.existsSync(albumPath)) fs.mkdirSync(albumPath, { recursive: true });

      let albumHtml = template;
      albumHtml = albumHtml.replace('<html lang="en">', `<html lang="${seoLangCodes[lang] || lang}">`);

      // Inject hreflang for albums
      albumHtml = albumHtml.replace('<!--HREFLANG_PLACEHOLDER-->', generateHreflangTags(`albums/${slug}/`));

      // Inject Canonical for albums
      const albumCanonical = `${baseUrl}/${langSuffix}albums/${slug}/`;
      albumHtml = albumHtml.replace('<!--CANONICAL_PLACEHOLDER-->', `<link rel="canonical" href="${albumCanonical}" />`);

      const year = new Date(album.release_date).getFullYear();
      const albumTitle = `${album.title} (${year}) | Alarm! Alarm! Official Discography`;
      const albumDesc = `Listen to ${album.title}, a release by Málaga punk rock band Alarm! Alarm!. Released in ${year}. Tracklist: ${(album.songs || []).map(s => s.title).join(', ')}.`;

      // Replace title and meta tags
      albumHtml = albumHtml.replace(/<title>.*?<\/title>/, `<title>${albumTitle}</title>`);
      albumHtml = albumHtml.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${albumDesc}" />`);

      // Update Open Graph and Twitter tags
      albumHtml = albumHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${albumTitle}" />`);
      albumHtml = albumHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${albumDesc}" />`);
      albumHtml = albumHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${album.cover_url}" />`);
      albumHtml = albumHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${albumCanonical}" />`);
      albumHtml = albumHtml.replace(/<meta property="twitter:url" content=".*?"\s*\/?>/g, `<meta property="twitter:url" content="${albumCanonical}" />`);
      albumHtml = albumHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${albumTitle}" />`);
      albumHtml = albumHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${albumDesc}" />`);
      albumHtml = albumHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="${album.cover_url}" />`);

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
  const sitemapUrls = [];
  const lastmod = new Date().toISOString().split('T')[0];
  const homePages = languages.map(l => ({
    lang: l,
    loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}`
  }));

  const videos = [
    { id: 'sNInMwOkwdw', title: 'Alarm! Alarm! Official Music Video', description: 'Official punk rock music video from Málaga-based band Alarm! Alarm!.' },
    { id: 'HSVprxESFAs', title: 'Alarm! Alarm! Live Performance', description: 'Alarm! Alarm! performing live punk rock in Málaga.' }
  ];

  const epkPages = languages.map(l => ({
    lang: l,
    loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}epk/`
  }));

  for (const page of homePages) {
    const links = homePages.map(p => `    <xhtml:link rel="alternate" hreflang="${seoLangCodes[p.lang] || p.lang}" href="${p.loc}" />`).join('\n');
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />`;

    const videoTags = videos.map(v => `    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${v.id}/hqdefault.jpg</video:thumbnail_loc>
      <video:title>${v.title}</video:title>
      <video:description>${v.description}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${v.id}</video:player_loc>
    </video:video>`).join('\n');

    sitemapUrls.push(`  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
${xDefault}
${videoTags}
    <changefreq>weekly</changefreq>
    <priority>${page.lang === 'en' ? '1.0' : '0.9'}</priority>
  </url>`);
  }

  for (const page of epkPages) {
    const links = epkPages.map(p => `    <xhtml:link rel="alternate" hreflang="${seoLangCodes[p.lang] || p.lang}" href="${p.loc}" />`).join('\n');
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/epk/" />`;

    sitemapUrls.push(`  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
${xDefault}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  for (const album of data.albums) {
    const slug = slugify(album.title);
    const albumPages = languages.map(l => ({
      lang: l,
      loc: `${baseUrl}/${l === 'en' ? '' : l + '/'}albums/${slug}/`
    }));

    for (const page of albumPages) {
      const links = albumPages.map(p => `    <xhtml:link rel="alternate" hreflang="${seoLangCodes[p.lang] || p.lang}" href="${p.loc}" />`).join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/albums/${slug}/" />`;

      const imageTag = album.cover_url ? `    <image:image>
      <image:loc>${album.cover_url}</image:loc>
      <image:title>${album.title} - Alarm! Alarm!</image:title>
      <image:caption>Cover art for the album ${album.title} by Alarm! Alarm!</image:caption>
    </image:image>` : '';

      sitemapUrls.push(`  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
${xDefault}
${imageTag}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${sitemapUrls.join('\n')}
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
User-agent: anthropic-ai
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
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
