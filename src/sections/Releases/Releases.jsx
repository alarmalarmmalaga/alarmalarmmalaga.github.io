// src/sections/Releases/Releases.jsx
import React from 'react';
import styles from './Releases.module.css';

// Import local images
import albumCoverLp1 from '../../assets/images/album-cover-lp1.jpg';
import albumCoverLp2 from '../../assets/images/album-cover-lp2.jpg';
import albumCoverEp1 from '../../assets/images/album-cover-ep1.jpg';
import albumCoverLive from '../../assets/images/album-cover-live.jpg';
import albumCoverCompilation from '../../assets/images/album-cover-compilation.jpg';

// Placeholder data - replace with actual data and image paths
const releasesData = [
  {
    id: 1,
    title: 'Bloody Hell! (2020)',
    imageUrl: albumCoverLp1,
    spotifyUrl: 'https://open.spotify.com/album/4SIJzb8ZWfxtvz6kjQlJe0',
    tracklist: ["Hello World", "Office Hours", "Radio", "Saturday Night", "Midlife Crisis", "All You Can Eat", "Hass", "Summer Love", "Give Up", "No"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/album/bloody-hell',
  },
  {
    id: 2,
    title: 'Whatever... (2022)',
    imageUrl: albumCoverLp2,
    spotifyUrl: 'https://open.spotify.com/album/1cb5wJKrETBtXU5iauhmj2',
    tracklist: ["Git Init", "With Or Without You", "Punk Rock Scene", "I'm Not Alright'", "Pull Request", "Déjame En Paz", "Scheissegal", "I'm Not Worried Enough", "I'm Only Happy When I'm Angry", "Friday Night", "A Song To Leah"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/album/whatever',
  },
  {
    id: 3,
    title: "'98-'99 (2025)",
    imageUrl: albumCoverEp1,
    spotifyUrl: 'https://open.spotify.com/album/2bFikvFpFiMqFP8CmU2ttM',
    tracklist: ["Todo Sin Terminar", "Sprint Retrospective", "Banda Tributo", "Déjame En Paz (Live)"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/music',
  },
  {
    id: 4,
    title: 'Ay Carumba! (2024)',
    imageUrl: albumCoverLive, // Changed from placeholder
    spotifyUrl: 'https://open.spotify.com/album/79mcSlj7Rt4DEdnplBKIGc',
    tracklist: ["All You Can Eat (Live)", "No (Live)", "Friday Night (Live)", "Scheissegal (Live)"],
    bandcampUrl: 'https://alarmalarm.bandcamp.com/music',
  },
  {
    id: 5,
    title: 'No Limits Vol. 1 (2020)',
    imageUrl: albumCoverCompilation,
    spotifyUrl: 'https://open.spotify.com/album/1bHqGxo8OuwepTItAFML3w',
    tracklist: ["Hass"],
    bandcampUrl: 'https://thomasimposter.bandcamp.com/album/no-limits-vol-1',
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
