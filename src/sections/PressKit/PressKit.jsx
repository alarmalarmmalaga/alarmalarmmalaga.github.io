// src/sections/PressKit/PressKit.jsx
import React, { useEffect, useState } from 'react';
import styles from './PressKit.module.css';

const PressKit = () => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetch('/press-kit/bio.txt')
      .then(response => response.text())
      .then(text => setBio(text))
      .catch(error => console.error('Error fetching bio:', error));
  }, []);

  return (
    <section className={styles.pressKitSection}>
      <h2 className={styles.sectionTitle}>Press Kit & Bio</h2>

      <div className={styles.bioContainer}>
        <h3>Our Story</h3>
        <p>{bio || 'Loading bio...'}</p>
      </div>

      <div className={styles.downloadsContainer}>
        <h3>Downloads</h3>
        <ul>
          <li>
                <a href="/press-kit/photo1.jpg" download="AlarmAlarm_Photo1.jpg">Photo 1 (High Res)</a>
          </li>
          {/* Assuming there might be more photos, add placeholders or check public/press-kit */}
          <li>
                <a href="/public/press-kit/band_logo.png" download="AlarmAlarm_Logo.png">Band Logo (High Res)</a>
          </li>
          <li>
                <a href="/press-kit.zip" download="AlarmAlarm_PressKit.zip">Full Press Kit (.zip)</a>
          </li>
        </ul>
      </div>
      <div className={styles.keywords}>
        <p>Keywords for SEO: punk, punk rock, Malaga, Spanish punk band, Alarm! Alarm! music.</p>
      </div>
    </section>
  );
};

export default PressKit;
