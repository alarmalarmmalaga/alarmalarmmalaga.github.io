import styles from './Hero.module.css';

const Hero = () => {
  return (
    <header className={`${styles.heroSection} hero-section-stable`}>
      <h1 className={`${styles.bandName} band-name-stable`}>Alarm! Alarm!</h1>
    </header>
  );
};

export default Hero;
