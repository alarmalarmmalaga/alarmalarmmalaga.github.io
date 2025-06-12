// src/sections/Contact/Contact.jsx
import styles from './Contact.module.css';

const Contact = () => {
  const pressKitUrl = '/press-kit.zip'; // Path to the zip file in the public folder

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Get In Touch / Press</h2>
      <div className={styles.contactInfo}>
        <p className={styles.emailLinkWrapper}>
          BOOKING/PRESS: <a href="mailto:contact@alarmalarm.band" className={styles.emailLink}>contact@alarmalarm.band</a>
        </p>
      </div>
      <div className={styles.pressKit}>
        <a href={pressKitUrl} download="AlarmAlarm-PressKit.zip" className={styles.pressKitButton}>
          DOWNLOAD PRESS KIT
        </a>
      </div>
    </section>
  );
};

export default Contact;
