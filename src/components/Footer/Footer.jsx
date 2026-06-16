// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz" target="_blank" rel="me noopener noreferrer" title="Spotify">
          <span className={styles.icon}>🎧</span>
        </a>
        <a href="https://alarmalarm.bandcamp.com/" target="_blank" rel="me noopener noreferrer" title="Bandcamp">
          <span className={styles.icon}>💰</span>
        </a>
        <a href="https://www.instagram.com/alarmalarmmalaga" target="_blank" rel="me noopener noreferrer" title="Instagram">
          <span className={styles.icon}>📸</span>
        </a>
        <a href="https://linktr.ee/alarmalarm" target="_blank" rel="me noopener noreferrer" title="Linktree">
          <span className={styles.icon}>🌳</span>
        </a>
        <a href="https://www.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ" target="_blank" rel="me noopener noreferrer" title="YouTube">
          <span className={styles.icon}>📺</span>
        </a>
      </div>
      <div className={styles.footerLinks}>
         <a href="/epk" className={styles.footerLink}>EPK / Press</a>
      </div>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Alarm! Alarm! | Punk Rock Málaga
      </p>
    </footer>
  );
};

export default Footer;
