// src/sections/EPK/EPK.jsx
import React from 'react';
import styles from './EPK.module.css';
import useTranslation from '../../hooks/useTranslation';

const EPK = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.epkPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Electronic Press Kit</h1>
        <p className={styles.subtitle}>Alarm! Alarm! | Punk Rock Málaga</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Biography</h2>
        <div className={styles.content}>
          <p>{t('bio_content')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Music & Assets</h2>
        <div className={styles.assetsGrid}>
           <div className={styles.assetItem}>
             <h3>Official Logos</h3>
             <p>High-resolution transparent PNGs.</p>
             <a href="/press-kit/logos.zip" download className={styles.downloadButton}>Download Logos</a>
           </div>
           <div className={styles.assetItem}>
             <h3>Band Photos</h3>
             <p>Promotional shots for web and print.</p>
             <a href="/press-kit/photos.zip" download className={styles.downloadButton}>Download Photos</a>
           </div>
           <div className={styles.assetItem}>
             <h3>Technical Rider</h3>
             <p>Stage plot and input list.</p>
             <a href="/press-kit/rider.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>View Rider</a>
           </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Streaming</h2>
        <div className={styles.playerContainer}>
           <iframe
            src="https://open.spotify.com/embed/artist/6Q3jUbGq2b2MeN2lMBYDxz"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify EPK Player"
          ></iframe>
        </div>
      </section>

      <footer className={styles.epkFooter}>
        <a href="/" className={styles.backLink}>← Back to Main Site</a>
      </footer>
    </div>
  );
};

export default EPK;
