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
      <div className={styles.pressKit}>
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
