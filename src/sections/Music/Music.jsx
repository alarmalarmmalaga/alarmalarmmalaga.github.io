// src/sections/Music/Music.jsx
import styles from "./Music.module.css";
import React, { useEffect, useState, useCallback } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import { supabase } from '../../supabaseClient';

const SpotifyFallback = ({ url }) => (
  <div className={styles.spotifyFallback}>
    <p>The Spotify player is currently unavailable.</p>
    {url && (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fallbackLink}
      >
        Listen on Spotify
      </a>
    )}
  </div>
);

const Music = () => {
  const initialData = window.__SITE_DATA__?.latestNoise || null;
  const [noise, setNoise] = useState(initialData);

  const fetchLatestNoise = useCallback(async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('latest_noise')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest noise:', error);
    } else {
      setNoise(data);
    }
  }, []);

  useEffect(() => {
    fetchLatestNoise();

    if (!supabase) return;

    const channel = supabase
      .channel('latest_noise_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'latest_noise' },
        () => fetchLatestNoise()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLatestNoise]);

  if (!noise) return null;

  return (
    <section id="music" className={styles.musicSection}>
      <meta name="description" content={`Stream the latest noise from Alarm! Alarm!: ${noise.title}. ${noise.message}`} />
      <h2 className={styles.sectionTitle}>Our Latest Noise: "{noise.title}"</h2>
      <p className={styles.musicIntro}>
        {noise.message}
      </p>
      <ErrorBoundary fallback={<SpotifyFallback url={noise.spotify_embed_url.replace('/embed', '')} />}>
        <div className={styles.spotifyEmbed}>
          <iframe
            src={noise.spotify_embed_url}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Spotify Player for ${noise.title}`}
          ></iframe>
        </div>
      </ErrorBoundary>
      <div className={styles.otherPlatforms}>
        {noise.apple_music_url && (
          <a href={noise.apple_music_url} target="_blank" rel="noopener noreferrer">
            Apple Music
          </a>
        )}
        {noise.bandcamp_url && (
          <a href={noise.bandcamp_url} target="_blank" rel="noopener noreferrer">
            Bandcamp
          </a>
        )}
        {noise.youtube_music_url && (
          <a href={noise.youtube_music_url} target="_blank" rel="noopener noreferrer">
            YouTube Music
          </a>
        )}
      </div>
    </section>
  );
};

export default Music;
