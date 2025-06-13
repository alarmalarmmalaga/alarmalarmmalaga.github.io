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
    <section className={styles.bioSection}>
      <h2 className={styles.sectionTitle}>Our Story</h2> {/* Changed title */}

      <div className={styles.bioContainer}>
        {/* <h3>Our Story</h3> This sub-heading might be redundant if the main title is "Our Story" */}
        <p>{bio || 'Loading bio...'}</p>
      </div>
    </section>
  );
};

export default Bio;
