// src/sections/Contact/Contact.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Contact.module.css';
import useTranslation from '../../hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();
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
      <h2 className={styles.sectionTitle}>{t('contact_title')}</h2>
      <div className={styles.contactInfo}>
        <p className={styles.emailLinkWrapper}>
          {t('booking_press')} <a href="mailto:alarmalarmmalaga@gmail.com" className={styles.emailLink}>alarmalarmmalaga@gmail.com</a>
        </p>
      </div>

      <div className={styles.officialLinks}>
        <h3 className={styles.subTitle}>{t('official_channels')}</h3>
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
        <h3 className={styles.subTitle}>{t('press_kit_title')}</h3>
        <div className={styles.pressKitButtonsContainer}>
          {loading ? (
            <p className={styles.loading}>{t('loading_downloads')}</p>
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
            <p className={styles.loading}>{t('downloads_unavailable')}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
