// src/sections/Music/Music.jsx
import styles from "./Music.module.css";
import React, { useEffect, useState, useCallback } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import { supabase } from '../../supabaseClient';
import useTranslation from '../../hooks/useTranslation';

const SpotifyFallback = ({ url, t }) => (
  <div className={styles.spotifyFallback}>
    <p>{t('spotify_fallback')}</p>
    {url && (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fallbackLink}
      >
        {t('listen_on_spotify')}
      </a>
    )}
  </div>
);

const Music = () => {
  const { t } = useTranslation();
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
      <meta name="description" content={`Stream the latest noise from Alarm! Alarm!: ${noise.title}. ${t('latest_noise_message')}`} />

      <div className={styles.heroReleaseContainer}>
        <div className={styles.heroReleaseInfo}>
          <h2 className={styles.sectionTitle}>{t('latest_noise_header')}: "{noise.title}"</h2>
          <p className={styles.musicIntro}>
            {t('latest_noise_message')}
          </p>
          <div className={styles.ctaButtons}>
            {noise.bandcamp_url && (
              <a href={noise.bandcamp_url} target="_blank" rel="noopener noreferrer" className={styles.buyButton}>
                <i className="fa-brands fa-bandcamp"></i> BUY ON BANDCAMP
              </a>
            )}
          </div>
        </div>

        <div className={styles.heroReleaseVisual}>
          <ErrorBoundary fallback={<SpotifyFallback t={t} url={noise.spotify_embed_url.replace('/embed', '')} />}>
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
        </div>
      </div>
      <div className={styles.otherPlatforms}>
        <h3 className={styles.otherPlatformsTitle}>DEPLOY OUR SOUND:</h3>
        <div className={styles.platformGrid}>
          {noise.spotify_embed_url && (
             <a href={noise.spotify_embed_url.replace('/embed', '')} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
               <i className="fa-brands fa-spotify"></i> <span>STREAM ON SPOTIFY</span>
             </a>
          )}
          {noise.apple_music_url && (
            <a href={noise.apple_music_url} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
              <i className="fa-brands fa-apple"></i> <span>STREAM ON APPLE MUSIC</span>
            </a>
          )}
          {noise.bandcamp_url && (
            <a href={noise.bandcamp_url} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
              <i className="fa-brands fa-bandcamp"></i> <span>BUY ON BANDCAMP</span>
            </a>
          )}
          {noise.youtube_music_url && (
            <a href={noise.youtube_music_url} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
              <i className="fa-brands fa-youtube"></i> <span>WATCH ON YOUTUBE</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Music;
