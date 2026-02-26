// src/sections/Releases/Releases.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Releases.module.css';

// Placeholder data - fallback for when Supabase is not available
const releasesData = [
  {
    id: 1,
    title: 'Bloody Hell! (2020)',
    imageUrl: 'https://via.placeholder.com/300?text=Bloody+Hell',
    spotifyUrl: 'https://open.spotify.com/album/4SIJzb8ZWfxtvz6kjQlJe0',
    tracklist: ["Hello World", "Office Hours", "Radio", "Saturday Night", "Midlife Crisis", "All You Can Eat", "Hass", "Summer Love", "Give Up", "No"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/album/bloody-hell',
  },
  {
    id: 2,
    title: 'Whatever... (2022)',
    imageUrl: 'https://via.placeholder.com/300?text=Whatever',
    spotifyUrl: 'https://open.spotify.com/album/1cb5wJKrETBtXU5iauhmj2',
    tracklist: ["Git Init", "With Or Without You", "Punk Rock Scene", "I'm Not Alright'", "Pull Request", "Déjame En Paz", "Scheissegal", "I'm Not Worried Enough", "I'm Only Happy When I'm Angry", "Friday Night", "A Song To Leah"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/album/whatever',
  },
  {
    id: 3,
    title: "'98-'99 (2025)",
    imageUrl: 'https://via.placeholder.com/300?text=98-99',
    spotifyUrl: 'https://open.spotify.com/album/2bFikvFpFiMqFP8CmU2ttM',
    tracklist: ["Todo Sin Terminar", "Sprint Retrospective", "Banda Tributo", "Déjame En Paz (Live)"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/music',
  },
  {
    id: 4,
    title: 'Amateur Skater (2025)',
    imageUrl: 'https://via.placeholder.com/300?text=Amateur+Skater',
    spotifyUrl: 'https://open.spotify.com/album/38AXd6UNJ3EDpUUZGx0ubE?si=UuNqiABQTTOiw2Z27HCh9g',
    tracklist: ["All By My Best Friend Bob, Again", "Esto Termina Aqui", "NOFX", "I'm not worried enough (Live)"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/music',
  },
];

const Releases = ({ albums: initialAlbums }) => {
  const [releases, setReleases] = useState(initialAlbums || []);
  const [loading, setLoading] = useState(!initialAlbums && !!supabase);

  const fetchReleases = useCallback(async () => {
    if (!supabase) {
      if (!initialAlbums) {
        setReleases(releasesData);
      }
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('albums')
      .select('*, songs(*)')
      .order('release_date', { ascending: false });

    if (error) {
      console.error('Error fetching releases:', error);
      if (!initialAlbums) setReleases(releasesData);
    } else {
      const sortedData = data ? data.map(album => ({
        ...album,
        songs: album.songs ? album.songs.sort((a, b) => (a.track_number || 0) - (b.track_number || 0)) : []
      })) : [];
      setReleases(sortedData);
    }
    setLoading(false);
  }, [initialAlbums]);

  useEffect(() => {
    if (!initialAlbums) {
        fetchReleases();
    }

    if (!supabase) return;

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
  }, [fetchReleases, initialAlbums]);

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
                src={release.cover_url || release.imageUrl || 'https://via.placeholder.com/300?text=Album+Cover'}
                alt={release.title || release.name}
                className={styles.albumArt}
              />
            </div>
            <div className={styles.releaseInfoContainer}>
              <h3 className={styles.releaseTitle}>{release.title || release.name}</h3>
              <ul className={styles.tracklist}>
                {(release.songs || release.tracks || release.tracklist || []).map((track, index) => (
                  <li key={track.id || index} className={styles.tracklistItem}>
                    {track.title || track.name || track}
                  </li>
                ))}
              </ul>
              <div className={styles.releaseLinks}>
                {(release.spotify_link || release.spotifyUrl || release.spotify_url) && (
                  <a
                    href={release.spotify_link || release.spotifyUrl || release.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.spotifyLink}
                    aria-label={`Listen to ${release.title || release.name} on Spotify (opens in a new tab)`}
                  >
                    Spotify
                  </a>
                )}
                {(release.bandcamp_link || release.bandcampUrl || release.bandcamp_url) && (
                  <a
                    href={release.bandcamp_link || release.bandcampUrl || release.bandcamp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bandcampLink}
                    aria-label={`Listen to and buy ${release.title || release.name} on Bandcamp (opens in a new tab)`}
                  >
                    Bandcamp
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Releases;
