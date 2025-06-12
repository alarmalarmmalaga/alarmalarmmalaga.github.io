// src/sections/Video/Video.jsx
import styles from './Video.module.css';

const Video = () => {
  // Placeholder YouTube video IDs
  const videoId1 = 'dQw4w9WgXcQ'; // Placeholder: Rick Astley (Official Music Video)
  const videoId2 = 'rokGy0huYEA'; // Placeholder: Live concert footage (e.g., a different artist)

  return (
    <section className={styles.videoSection}>
      <h2 className={styles.sectionTitle}>Watch Us</h2>
      <div className={styles.videoGrid}>
        <div className={`${styles.videoWrapper} ${styles.videoWrapperLarge}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Main Band Video"
          ></iframe>
        </div>
        <div className={`${styles.videoWrapper} ${styles.videoWrapperSmall}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId2}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Live Band Video"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
