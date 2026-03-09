// src/sections/Bio/Bio.jsx
import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import styles from './Bio.module.css';

const Bio = () => {
  const { t } = useTranslation();

  return (
    <section id="bio" className={styles.bioSection}>
      <h2 className={styles.sectionTitle}>{t('bio_title')}</h2>

      <div className={styles.bioContainer}>
        <p>{t('bio_content')}</p>
      </div>
    </section>
  );
};

export default Bio;
