// src/sections/Releases/Releases.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Releases.module.css';
import useTranslation from '../../hooks/useTranslation';

const Releases = () => {
  const { t } = useTranslation();
  // Use window.__SITE_DATA__ if available (for SEO/Prerendering)
  const initialReleases = window.__SITE_DATA__?.albums || [];
  const [releases, setReleases] = useState(initialReleases);
  const [loading, setLoading] = useState(initialReleases.length === 0);

  const fetchReleases = useCallback(async () => {
    if (!supabase) {
      console.warn('Supabase client not initialized. Releases will not be available.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('albums')
      .select('*, songs(*)')
      .order('release_date', { ascending: false });

    if (error) {
      console.error('Error fetching releases:', error);
    } else {
      // Sort songs by track_number within each album
      const sortedData = data ? data.map(album => ({
        ...album,
        songs: album.songs ? album.songs.sort((a, b) => (a.track_number || 0) - (b.track_number || 0)) : []
      })) : [];
      setReleases(sortedData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReleases();

    if (!supabase) return;

    // Subscribe to changes in albums and songs for real-time updates
    const albumsChannel = supabase
      .channel('albums_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'albums' },
        () => fetchReleases()
      )
      .subscribe();

    const songsChannel = supabase
      .channel('songs_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'songs' },
        () => fetchReleases()
      )
      .subscribe();

    return () => {
      if (supabase) {
        if (albumsChannel) supabase.removeChannel(albumsChannel);
        if (songsChannel) supabase.removeChannel(songsChannel);
      }
    };
  }, [fetchReleases]);

  if (loading && releases.length === 0) {
    return (
      <section id="releases" className={styles.releasesSection}>
        <h2 className={styles.sectionTitle}>{t('releases_title')}</h2>
        <p className={styles.loading}>{t('loading_releases')}</p>
      </section>
    );
  }

  return (
    <section id="releases" className={styles.releasesSection}>
      <h2 className={styles.sectionTitle}>{t('releases_title')}</h2>
      <div className={styles.discographyGrid}>
        {releases.map((release) => (
          <article key={release.id} className={styles.discographyItem}>
            <div className={styles.albumCoverWrapper}>
              <img
                src={release.cover_url ? release.cover_url.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") + "?width=400&quality=75&format=webp" : ""}
                alt={release.title} width="400" height="400"
                className={styles.albumCover}
                loading="lazy"
              />
              <div className={styles.albumOverlay}>
                <div className={styles.miniLinks}>
                  {release.spotify_link && (
                    <a href={release.spotify_link} target="_blank" rel="noopener noreferrer" className={styles.releaseLink}>
                      <i className="fa-brands fa-spotify"></i> <span>STREAM</span>
                    </a>
                  )}
                  {release.bandcamp_link && (
                    <a href={release.bandcamp_link} target="_blank" rel="noopener noreferrer" className={styles.releaseLink}>
                      <i className="fa-brands fa-bandcamp"></i> <span>BUY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.albumInfo}>
              <h3 className={styles.albumTitleMini}>{release.title}</h3>
              <p className={styles.albumYearMini}>
                {release.release_date && new Date(release.release_date).getFullYear()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Releases;
