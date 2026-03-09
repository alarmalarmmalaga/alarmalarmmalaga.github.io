// src/components/LanguageToggle.jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { language } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN', path: '/' },
    { code: 'es', label: 'ES', path: '/es/' },
    { code: 'de', label: 'DE', path: '/de/' },
    { code: 'jp', label: 'JP', path: '/jp/' },
  ];

  return (
    <nav className={styles.toggleContainer} aria-label="Language selection">
      {languages.map((lang) => (
        <a
          key={lang.code}
          href={lang.path}
          className={`${styles.languageLink} ${language === lang.code ? styles.active : ''}`}
          aria-current={language === lang.code ? 'page' : undefined}
        >
          {lang.label}
        </a>
      ))}
    </nav>
  );
};

export default LanguageToggle;
