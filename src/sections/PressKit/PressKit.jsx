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
      <h2 className={styles.sectionTitle}>Our Story</h2> {/* Changed title */}

      <div className={styles.bioContainer}>
        {/* <h3>Our Story</h3> This sub-heading might be redundant if the main title is "Our Story" */}
        <p>{bio || 'Loading bio...'}</p>
      </div>
      <div className={styles.downloadsContainer}>
        <h3>Downloads</h3>
        <ul>
          <li>
            <a href="/press-kit.zip" download className={`button-style-link ${styles.downloadLink}`}>
              Download Press Kit
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PressKit;
