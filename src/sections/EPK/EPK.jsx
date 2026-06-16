// src/sections/EPK/EPK.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './EPK.module.css';
import useTranslation from '../../hooks/useTranslation';

const EPK = () => {
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
    <div className={styles.epkPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Electronic Press Kit</h1>
        <p className={styles.subtitle}>Alarm! Alarm! | Punk Rock Málaga</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Biography</h2>
        <div className={styles.content}>
          <p>{t('bio_content')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Press Kit & Downloads</h2>
        <div className={styles.assetsGrid}>
          {loading ? (
            <p className={styles.loading}>{t('loading_downloads')}</p>
          ) : assets.length > 0 ? (
            assets.map((asset) => (
              <div key={asset.id} className={styles.assetItem}>
                <h3>{asset.label.toUpperCase()}</h3>
                <p>Official band asset for promotional use.</p>
                <a
                  href={asset.file_url}
                  download
                  className={styles.downloadButton}
                  aria-label={`Download ${asset.label}`}
                >
                  <i className="fa-solid fa-download"></i> DOWNLOAD
                </a>
              </div>
            ))
          ) : (
            <p className={styles.loading}>{t('downloads_unavailable')}</p>
          )}
          {/* Official static assets */}
           <div className={styles.assetItem}>
             <h3>OFFICIAL LOGO</h3>
             <p>High-resolution transparent PNG.</p>
             <a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/band_logo.png" download className={styles.downloadButton}>
               <i className="fa-solid fa-image"></i> DOWNLOAD LOGO
             </a>
           </div>
           <div className={styles.assetItem}>
             <h3>BAND PHOTO 1</h3>
             <p>Official promotional shot (2025).</p>
             <a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmalarm25-64.jpg" download className={styles.downloadButton}>
               <i className="fa-solid fa-image"></i> DOWNLOAD PHOTO
             </a>
           </div>
           <div className={styles.assetItem}>
             <h3>BAND PHOTO 2</h3>
             <p>Official promotional shot (2025).</p>
             <a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmalarm25-83.jpg" download className={styles.downloadButton}>
               <i className="fa-solid fa-image"></i> DOWNLOAD PHOTO
             </a>
           </div>
           <div className={styles.assetItem}>
             <h3>OFFICIAL DOSSIER</h3>
             <p>Stage plot, input list and bio.</p>
             <a href="https://sacimvemsixvqghmhxtd.supabase.co/storage/v1/object/public/press_kit/alarmdossier.pdf" target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
               <i className="fa-solid fa-file-pdf"></i> VIEW DOSSIER
             </a>
           </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact & Booking</h2>
        <div className={styles.content}>
          <p className={styles.contactEmail}>
            <i className="fa-solid fa-envelope"></i> <a href="mailto:alarmalarmmalaga@gmail.com">alarmalarmmalaga@gmail.com</a>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Streaming</h2>
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
        <a href="/" className={styles.backLink}>
          <i className="fa-solid fa-arrow-left"></i> BACK TO MAIN SITE
        </a>
      </footer>
    </div>
  );
};

export default EPK;
