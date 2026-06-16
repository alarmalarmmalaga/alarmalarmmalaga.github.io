// src/sections/EPK/EPK.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './EPK.module.css';
import useTranslation from '../../hooks/useTranslation';

const EPK = () => {
  const { t, language } = useTranslation();
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
        // Show all assets from the table as requested
        setAssets(data || []);
      }
      setLoading(false);
    };

    fetchAssets();
  }, []);

  // Default titles for fallback if translation system is not ready
  const epkTitle = t('epk_title') === 'epk_title' ? 'Electronic Press Kit' : t('epk_title');

  return (
    <div className={styles.epkPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>{epkTitle}</h1>
        <p className={styles.subtitle}>Alarm! Alarm! | Punk Rock Málaga</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('bio_title')}</h2>
        <div className={styles.content}>
          <p>{t('bio_content')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('press_kit_title')}</h2>
        <div className={styles.assetsGrid}>
          {loading ? (
            <p className={styles.loading}>{t('loading_downloads')}</p>
          ) : assets.length > 0 ? (
            assets.map((asset) => (
              <div key={asset.id} className={styles.assetItem}>
                <h3>{asset.label.toUpperCase()}</h3>
                <p>{t('asset_promo_text')}</p>
                <a
                  href={asset.file_url}
                  download
                  className={styles.downloadButton}
                  aria-label={`Download ${asset.label}`}
                >
                  <i className="fa-solid fa-download"></i> {t('download_label')}
                </a>
              </div>
            ))
          ) : (
            <p className={styles.loading}>{t('downloads_unavailable')}</p>
          )}
          {/* Official static assets */}
           <div className={styles.assetItem}>
             <h3>{t('official_dossier_label')}</h3>
             <p>{t('dossier_description')}</p>
             <a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmdossier.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
               <i className="fa-solid fa-file-pdf"></i> {t('view_dossier_label')}
             </a>
           </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('contact_booking_title')}</h2>
        <div className={styles.content}>
          <p className={styles.contactEmail}>
            <i className="fa-solid fa-envelope"></i> <a href="mailto:alarmalarmmalaga@gmail.com">alarmalarmmalaga@gmail.com</a>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('streaming_title')}</h2>
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
        <a href={language === 'en' ? '/' : `/${language}/`} className={styles.backLink}>
          <i className="fa-solid fa-arrow-left"></i> {t('back_to_main_site')}
        </a>
      </footer>
    </div>
  );
};

export default EPK;
