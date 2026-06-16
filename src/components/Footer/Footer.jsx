// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialGrid}>
        <a href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz" target="_blank" rel="me noopener noreferrer" className={styles.platformLink}>
          <i className="fa-brands fa-spotify"></i> <span>SPOTIFY</span>
        </a>
        <a href="https://alarmalarm.bandcamp.com/" target="_blank" rel="me noopener noreferrer" className={styles.platformLink}>
          <i className="fa-brands fa-bandcamp"></i> <span>BANDCAMP</span>
        </a>
        <a href="https://www.instagram.com/alarmalarmmalaga" target="_blank" rel="me noopener noreferrer" className={styles.platformLink}>
          <i className="fa-brands fa-instagram"></i> <span>INSTAGRAM</span>
        </a>
        <a href="https://linktr.ee/alarmalarm" target="_blank" rel="me noopener noreferrer" className={styles.platformLink}>
          <i className="fa-solid fa-link"></i> <span>LINKTREE</span>
        </a>
        <a href="https://www.youtube.com/channel/UCmn_2X05dsJOHFXRM7fERsQ" target="_blank" rel="me noopener noreferrer" className={styles.platformLink}>
          <i className="fa-brands fa-youtube"></i> <span>YOUTUBE</span>
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
