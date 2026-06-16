// src/components/LanguageToggle.jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { language } = useTranslation();

  // Helper to get current subpage path preserving the rest of the URL
  const getCurrentSubpage = () => {
    const path = window.location.pathname;
    // Remove language prefixes if they exist
    let subpage = path;
    ['/es/', '/de/', '/jp/'].forEach(prefix => {
      if (subpage.startsWith(prefix)) {
        subpage = subpage.replace(prefix, '/');
      }
    });
    // Ensure it starts with / and remove leading double slashes
    return subpage.startsWith('/') ? subpage : '/' + subpage;
  };

  const currentSubpage = getCurrentSubpage();

  const languages = [
    { code: 'en', label: 'EN', path: currentSubpage },
    { code: 'es', label: 'ES', path: '/es' + (currentSubpage === '/' ? '/' : currentSubpage) },
    { code: 'de', label: 'DE', path: '/de' + (currentSubpage === '/' ? '/' : currentSubpage) },
    { code: 'jp', label: 'JP', path: '/jp' + (currentSubpage === '/' ? '/' : currentSubpage) },
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
