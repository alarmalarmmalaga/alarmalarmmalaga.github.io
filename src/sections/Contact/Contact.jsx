// src/sections/Contact/Contact.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Contact.module.css';

const Contact = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client not initialized. Press kit assets will not be available.');
      setLoading(false);
      return;
    }

    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from('press_kit')
        .select('*');

      if (error) {
        console.error('Error fetching press kit assets:', error);
      } else {
        setAssets(data || []);
      }
      setLoading(false);
    };

    fetchAssets();
  }, []);

  return (
    <section id="contact" className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact & Downloads</h2>
      <div className={styles.contactInfo}>
        <p className={styles.emailLinkWrapper}>
          BOOKING/PRESS: <a href="mailto:alarmalarmmalaga@gmail.com" className={styles.emailLink}>alarmalarmmalaga@gmail.com</a>
        </p>
      </div>

      <div className={styles.officialLinks}>
        <h3 className={styles.subTitle}>Official Channels (E-E-A-T)</h3>
        <div className={styles.linksGrid}>
          <a
            href="https://open.spotify.com/artist/6Q3jUbGq2b2MeN2lMBYDxz"
            target="_blank"
            rel="me noopener noreferrer"
            className={styles.officialLink}
          >
            Spotify Official
          </a>
          <a
            href="https://alarmalarm.bandcamp.com/"
            target="_blank"
            rel="me noopener noreferrer"
            className={styles.officialLink}
          >
            Bandcamp Official
          </a>
          <a
            href="https://www.instagram.com/alarmalarmmalaga"
            target="_blank"
            rel="me noopener noreferrer"
            className={styles.officialLink}
          >
            Instagram
          </a>
        </div>
      </div>

      <div className={styles.pressKit}>
        <h3 className={styles.subTitle}>Press Kit & Downloads</h3>
        {loading ? (
          <p className={styles.loading}>Loading downloads...</p>
        ) : assets.length > 0 ? (
          assets.map((asset) => (
            <a
              key={asset.id}
              href={asset.file_url}
              download
              className={styles.pressKitButton}
              aria-label={`Download ${asset.label}`}
            >
              {asset.label.toUpperCase()}
            </a>
          ))
        ) : (
          <p className={styles.loading}>Downloads currently unavailable.</p>
        )}
      </div>
    </section>
  );
};

export default Contact;
