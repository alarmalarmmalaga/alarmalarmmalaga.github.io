// src/sections/Music/Music.jsx
import styles from "./Music.module.css";
import React from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';

const SpotifyFallback = (
  <div className={styles.spotifyFallback}>
    <p>The Spotify player is currently unavailable.</p>
    <a
      href="https://open.spotify.com/album/38AXd6UNJ3EDpUUZGx0ubE"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fallbackLink}
    >
      Listen on Spotify
    </a>
  </div>
);

const Music = () => {
  return (
    <section id="music" className={styles.musicSection}>
      <meta name="description" content="Stream the latest EPs from Alarm! Alarm!, the punk rock band from Málaga. Listen to 'Amateur Skater' and the classic '98-'99 EP." />
      <h2 className={styles.sectionTitle}>Our Latest Noise: "Amateur Skater"</h2>
      <p className={styles.musicIntro}>
        Stream our new EP, "Amateur Skater," right here via Spotify. For the best experience, use headphones and turn it up loud. Also available on all major streaming platforms.
      </p>
      <ErrorBoundary fallback={SpotifyFallback}>
        <div className={styles.spotifyEmbed}>
          <iframe
            src="https://open.spotify.com/embed/album/38AXd6UNJ3EDpUUZGx0ubE?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player for Amateur Skater EP"
          ></iframe>
        </div>
      </ErrorBoundary>
      <div className={styles.otherPlatforms}>
        <a href="https://music.apple.com/us/artist/alarm-alarm/1494187277" target="_blank" rel="noopener noreferrer">
          Apple Music
        </a>
        <a href="https://alarmalarm.bandcamp.com/" target="_blank" rel="noopener noreferrer">
          Bandcamp
        </a>
        <a href="https://music.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ" target="_blank" rel="noopener noreferrer">
          YouTube Music
        </a>
      </div>
    </section>
  );
};

export default Music;
