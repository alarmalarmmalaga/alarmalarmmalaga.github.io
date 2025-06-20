// src/sections/Music/Music.jsx
import styles from "./Music.module.css";

const Music = () => {
  return (
    <section className={styles.musicSection}>
      <h2 className={styles.sectionTitle}>Listen To Us</h2>

      <div className={styles.spotifyEmbed}>
        <iframe
          src="https://open.spotify.com/embed/album/2bFikvFpFiMqFP8CmU2ttM?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

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
