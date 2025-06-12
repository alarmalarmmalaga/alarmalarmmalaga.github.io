// src/sections/Releases/Releases.jsx
import React from 'react';
import styles from './Releases.module.css';

// Placeholder data - replace with actual data and image paths
const releasesData = [
  {
    id: 1,
    title: 'Studio Album LP 1',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder1',
    tracklist: ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5", "Track 6", "Track 7", "Track 8", "Track 9", "Track 10"],
    bandcampUrl: 'https://bandcamp.com/album/placeholder1',
  },
  {
    id: 2,
    title: 'Studio Album LP 2',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder2',
    tracklist: ["Intro", "Song Two", "Another One", "Interlude", "The Big Hit", "Song Six", "Seven's Secret", "Outro"],
    bandcampUrl: 'https://bandcamp.com/album/placeholder2',
  },
  {
    id: 3,
    title: 'Our Cool EP',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder3',
    tracklist: ["EP Track A", "EP Track B", "EP Track C (Extended Mix)"],
    bandcampUrl: 'https://bandcamp.com/album/placeholder3',
  },
  {
    id: 4,
    title: 'Live Insanity',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder4',
    tracklist: ["Live Intro", "Hit Song (Live)", "Crowd Favorite (Live)", "Encore (Live)"],
    bandcampUrl: 'https://bandcamp.com/album/placeholder4',
  },
  {
    id: 5,
    title: 'Compilation Chaos',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder5',
    tracklist: ["Greatest Hit v1", "Remix of a Song", "Previously Unreleased", "Acoustic Jam"],
    bandcampUrl: 'https://bandcamp.com/album/placeholder5',
  },
];

const Releases = () => {
  return (
    <section className={styles.releasesSection}>
      <h2 className={styles.sectionTitle}>Releases</h2>
      <div className={styles.releasesGrid}>
        {releasesData.map((release) => (
          <div key={release.id} className={styles.releaseItemContainer}>
            <div className={styles.albumArtContainer}>
              <img
                src={release.imageUrl}
                alt={release.title}
                className={styles.albumArt}
              />
            </div>
            <div className={styles.releaseInfoContainer}>
              <h3 className={styles.releaseTitle}>{release.title}</h3>
              <ul className={styles.tracklist}>
                {release.tracklist.map((track, index) => (
                  <li key={index} className={styles.tracklistItem}>{track}</li>
                ))}
              </ul>
              <div className={styles.releaseLinks}>
                {release.spotifyUrl && (
                  <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles.spotifyLink}>
                    Spotify
                  </a>
                )}
                {release.bandcampUrl && (
                  <a href={release.bandcampUrl} target="_blank" rel="noopener noreferrer" className={styles.bandcampLink}>
                    Bandcamp
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Releases;
