// src/sections/Bio/Bio.jsx
import React, { useEffect, useState } from 'react';
import styles from './Bio.module.css';

const Bio = () => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetch('/press-kit/bio.txt')
      .then(response => response.text())
      .then(text => setBio(text))
      .catch(error => console.error('Error fetching bio:', error));
  }, []);

  return (
    <section id="bio" className={styles.bioSection}>
      <h2 className={styles.sectionTitle}>Our Story</h2> {/* Changed title */}

      <div className={styles.bioContainer}>
        {/* <h3>Our Story</h3> This sub-heading might be redundant if the main title is "Our Story" */}
        <p>{bio || 'Loading bio...'}</p>
      </div>

      <div className={styles.pressLinks}>
        <h3>Connect & Verify</h3>
        <div className={styles.meLinks}>
          <a href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz" rel="me" target="_blank" aria-label="Official Spotify Profile">Spotify</a>
          <a href="https://alarmalarm.bandcamp.com/" rel="me" target="_blank" aria-label="Official Bandcamp Profile">Bandcamp</a>
          <a href="https://www.instagram.com/alarmalarmmalaga/" rel="me" target="_blank" aria-label="Official Instagram Profile">Instagram</a>
        </div>
      </div>
    </section>
  );
};

export default Bio;
