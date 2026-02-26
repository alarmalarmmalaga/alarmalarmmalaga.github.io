import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function fetchData() {
  if (!supabase) {
    console.warn('Supabase credentials missing. Using mock data for development.');
    return mockData();
  }

  try {
    const { data: albums, error: albumError } = await supabase
      .from('albums')
      .select('*')
      .order('release_date', { ascending: false });

    if (albumError) throw albumError;

    const { data: songs, error: songError } = await supabase
      .from('songs')
      .select('*')
      .order('position', { ascending: true });

    if (songError) throw songError;

    const { data: gridItems, error: gridError } = await supabase
      .from('brutalist_grid')
      .select('*');

    if (gridError) throw gridError;

    // Nest songs into albums
    const albumsWithSongs = albums.map(album => ({
      ...album,
      tracks: songs.filter(song => song.album_id === album.id)
    }));

    return { albums: albumsWithSongs, gridItems };
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
    return mockData(); // Fallback to mock data for build robustness
  }
}

function mockData() {
  return {
    albums: [
      {
        id: '1',
        name: 'Amateur Skater',
        release_date: '2025-01-01',
        description: 'Our latest EP about trying to stay radical while your joints tell you otherwise.',
        spotify_url: 'https://open.spotify.com/album/38AXd6UNJ3EDpUUZGx0ubE',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/music',
        image_url: 'https://via.placeholder.com/300?text=Amateur+Skater',
        tracks: [
          { name: "All By My Best Friend Bob, Again", position: 1 },
          { name: "Esto Termina Aqui", position: 2 },
          { name: "NOFX", position: 3 },
          { name: "I'm not worried enough (Live)", position: 4 }
        ]
      },
      {
        id: '2',
        name: '98-99',
        release_date: '2025-02-01',
        description: 'A melodic tribute to the era of baggy jeans, MSN Messenger, and the peak of 90s punk.',
        spotify_url: 'https://open.spotify.com/album/2bFikvFpFiMqFP8CmU2ttM',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/music',
        image_url: 'https://via.placeholder.com/300?text=98-99',
        tracks: [
          { name: "Todo Sin Terminar", position: 1 },
          { name: "Sprint Retrospective", position: 2 },
          { name: "Banda Tributo", position: 3 },
          { name: "Déjame En Paz (Live)", position: 4 }
        ]
      },
      {
        id: '3',
        name: 'Whatever...',
        release_date: '2022-01-01',
        description: 'A confirmation that, indeed, things haven\'t improved.',
        spotify_url: 'https://open.spotify.com/album/1cb5wJKrETBtXU5iauhmj2',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/album/whatever',
        image_url: 'https://via.placeholder.com/300?text=Whatever',
        tracks: [
          { name: "Git Init", position: 1 },
          { name: "With Or Without You", position: 2 },
          { name: "Punk Rock Scene", position: 3 },
          { name: "I'm Not Alright'", position: 4 },
          { name: "Pull Request", position: 5 },
          { name: "Déjame En Paz", position: 6 },
          { name: "Scheissegal", position: 7 },
          { name: "I'm Not Worried Enough", position: 8 },
          { name: "I'm Only Happy When I'm Angry", position: 9 },
          { name: "Friday Night", position: 10 },
          { name: "A Song To Leah", position: 11 }
        ]
      },
      {
        id: '4',
        name: 'Bloody Hell!',
        release_date: '2020-01-01',
        description: 'Our debut scream into the void, recorded at Hollers Analog Studio.',
        spotify_url: 'https://open.spotify.com/album/4SIJzb8ZWfxtvz6kjQlJe0',
        bandcamp_url: 'https://alarmalarm.bandcamp.com/album/bloody-hell',
        image_url: 'https://via.placeholder.com/300?text=Bloody+Hell',
        tracks: [
          { name: "Hello World", position: 1 },
          { name: "Office Hours", position: 2 },
          { name: "Radio", position: 3 },
          { name: "Saturday Night", position: 4 },
          { name: "Midlife Crisis", position: 5 },
          { name: "All You Can Eat", position: 6 },
          { name: "Hass", position: 7 },
          { name: "Summer Love", position: 8 },
          { name: "Give Up", position: 9 },
          { name: "No", position: 10 }
        ]
      }
    ],
    gridItems: [
      { id: '1', image_url: 'https://via.placeholder.com/300?text=Band+Photo+1', caption: 'Preparing new stuff! #bandlife #phototime #punk', alt_description: 'Alarm! Alarm! band members posing for a photo in a gritty urban setting.' },
      { id: '2', image_url: 'https://via.placeholder.com/300?text=Spotify+Stats', caption: 'Thanks everyone! Almost 8K listeners! We love you! #spotify #punkrock #alarmalarm', alt_description: 'Alarm! Alarm! 2025 Spotify stats screenshot showing streams and listeners.' }
      // ... more mock grid items can be added
    ]
  };
}

function generateSitemap(albums) {
  const baseUrl = 'https://alarmalarmmalaga.github.io';
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>`;

  albums.forEach(album => {
    const slug = album.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sitemap += `
  <url>
    <loc>${baseUrl}/albums/${slug}</loc>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';
  return sitemap;
}

function generateJsonLd(album) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": album.name,
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Alarm! Alarm!"
    },
    "numTracks": album.tracks.length,
    "track": album.tracks.map(track => ({
      "@type": "MusicRecording",
      "name": track.name,
      "position": track.position
    }))
  };
}

async function run() {
  const data = await fetchData();

  // Save data for client
  fs.mkdirSync('public', { recursive: true });
  fs.writeFileSync('public/site-data.json', JSON.stringify(data, null, 2));
  console.log('Site data saved to public/site-data.json');

  // Generate sitemap
  const sitemap = generateSitemap(data.albums);
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated in public/sitemap.xml');

  // Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://alarmalarmmalaga.github.io/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /
`;
  fs.writeFileSync('public/robots.txt', robotsTxt);
  console.log('Robots.txt updated');

  // Prerendering Logic: This part should ideally be run as a separate step after 'vite build'
  // But for now, let's prepare the individual metadata for injection.
  const albumMetadata = data.albums.map(album => ({
    slug: album.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: `${album.name} by Alarm! Alarm! | Official Discography`,
    description: album.description,
    jsonLd: generateJsonLd(album)
  }));

  fs.writeFileSync('public/album-metadata.json', JSON.stringify(albumMetadata, null, 2));
  console.log('Album metadata saved for post-build injection');

  // Check if dist exists, if so, run post-build generation
  if (fs.existsSync('dist')) {
    await postBuild(data, albumMetadata);
  }
}

async function postBuild(data, albumMetadata) {
  console.log('Running post-build static generation...');
  const indexHtmlPath = path.join('dist', 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Build the project first.');
    return;
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf8');

  // Generate individual album pages
  for (const metadata of albumMetadata) {
    const albumDir = path.join('dist', 'albums', metadata.slug);
    fs.mkdirSync(albumDir, { recursive: true });

    let albumHtml = template
      .replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${metadata.description}" />`)
      .replace(/<script type="application\/ld\+json">.*?<\/script>/s, `<script type="application/ld+json">${JSON.stringify(metadata.jsonLd, null, 2)}</script>`)
      .replace('<body>', `<body><script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`);

    // Add Open Graph tags for better social visualization
    const ogTags = `
    <meta property="og:title" content="${metadata.title}">
    <meta property="og:description" content="${metadata.description}">
    <meta property="og:type" content="music.album">
    <meta property="og:url" content="https://alarmalarmmalaga.github.io/albums/${metadata.slug}">
    `;
    albumHtml = albumHtml.replace('</head>', `${ogTags}\n  </head>`);

    fs.writeFileSync(path.join(albumDir, 'index.html'), albumHtml);
    console.log(`Generated: albums/${metadata.slug}/index.html`);
  }

  // Also update the main index.html with the latest site data
  let mainHtml = template.replace('<body>', `<body><script>window.__SITE_DATA__ = ${JSON.stringify(data)};</script>`);
  fs.writeFileSync(indexHtmlPath, mainHtml);
  console.log('Updated main dist/index.html with site data.');

  console.log('Post-build static generation complete.');
}

run();
