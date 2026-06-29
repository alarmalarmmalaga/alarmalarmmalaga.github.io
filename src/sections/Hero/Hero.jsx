import styles from './Hero.module.css';
import useTranslation from '../../hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className={`${styles.heroSection} hero-section-stable`}>
      <h1 className={`${styles.bandName} band-name-stable`}>{t('site_title')}</h1>
      <p className={`${styles.heroTagline} hero-tagline-stable`}>
        {t('hero_tagline')}
      </p>
    </header>
  );
};

export default Hero;
