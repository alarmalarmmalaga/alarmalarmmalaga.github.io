// src/sections/Video/Video.jsx
import styles from './Video.module.css';

const Video = () => {
  const videoId1 = 'sNInMwOkwdw'; 
  const videoId2 = 'HSVprxESFAs';

  return (
    <section id="video" className={styles.videoSection}>
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
