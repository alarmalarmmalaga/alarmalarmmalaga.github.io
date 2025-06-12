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
  },
  {
    id: 2,
    title: 'Studio Album LP 2',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder2',
  },
  {
    id: 3,
    title: 'Our Cool EP',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder3',
  },
  {
    id: 4,
    title: 'Live Insanity',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder4',
  },
  {
    id: 5,
    title: 'Compilation Chaos',
    imageUrl: 'https://via.placeholder.com/180', // Using placeholder URL
    spotifyUrl: 'https://open.spotify.com/album/placeholder5',
  },
];

const Releases = () => {
  return (
    <section className={styles.releasesSection}>
      <h2 className={styles.sectionTitle}>Releases</h2>
      <div className={styles.releasesGrid}>
        {releasesData.map((release) => (
          <a
            key={release.id}
            href={release.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.releaseLink}
          >
            <div className={styles.releaseItem}>
              <img
                src={release.imageUrl}
                alt={release.title}
                className={styles.albumArt}
              />
              <p className={styles.releaseName}>{release.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Releases;
