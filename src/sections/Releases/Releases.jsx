// src/sections/Releases/Releases.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Releases.module.css';

const Releases = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReleases = useCallback(async () => {
    const { data, error } = await supabase
      .from('albums')
      .select('*, songs(*)')
      .order('release_date', { ascending: false });

    if (error) {
      console.error('Error fetching releases:', error);
    } else {
      // Sort songs by track_number within each album
      const sortedData = data.map(album => ({
        ...album,
        songs: album.songs.sort((a, b) => (a.track_number || 0) - (b.track_number || 0))
      }));
      setReleases(sortedData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReleases();

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
      supabase.removeChannel(albumsChannel);
      supabase.removeChannel(songsChannel);
    };
  }, [fetchReleases]);

  if (loading) {
    return (
      <section id="releases" className={styles.releasesSection}>
        <h2 className={styles.sectionTitle}>Releases</h2>
        <p className={styles.loading}>Loading releases...</p>
      </section>
    );
  }

  return (
    <section id="releases" className={styles.releasesSection}>
      <h2 className={styles.sectionTitle}>Releases</h2>
      <div className={styles.releasesGrid}>
        {releases.map((release) => (
          <article key={release.id} className={styles.releaseItemContainer}>
            <div className={styles.albumArtContainer}>
              <img
                src={release.cover_url}
                alt={release.title}
                className={styles.albumArt}
              />
            </div>
            <div className={styles.releaseInfoContainer}>
              <h3 className={styles.releaseTitle}>{release.title}</h3>
              <ul className={styles.tracklist}>
                {release.songs && release.songs.map((song) => (
                  <li key={song.id} className={styles.tracklistItem}>{song.title}</li>
                ))}
              </ul>
              <div className={styles.releaseLinks}>
                {release.streaming_link && (
                  <a href={release.streaming_link} target="_blank" rel="noopener noreferrer" className={styles.spotifyLink}>
                    Spotify
                  </a>
                )}
                {/* Bandcamp link can be added here if included in the schema later */}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Releases;
