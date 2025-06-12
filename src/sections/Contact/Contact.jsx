// src/sections/Contact/Contact.jsx
import styles from './Contact.module.css';

const Contact = () => {
  const pressKitUrl = '/press-kit.zip'; // Path to the zip file in the public folder

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact & Downloads</h2>
      <div className={styles.contactInfo}>
        <p className={styles.emailLinkWrapper}>
          BOOKING/PRESS: <a href="mailto:alarmalarmmalaga@gmail.com" className={styles.emailLink}>alarmalarmmalaga@gmail.com</a>
        </p>
      </div>
      <div className={styles.pressKit}>
        <a href={pressKitUrl} download="AlarmAlarm-PressKit.zip" className={styles.pressKitButton}>
          DOWNLOAD FULL PRESS KIT
        </a>
        {/* New buttons added below */}
        <a href="/press-kit/photo1.jpg" download="AlarmAlarm_Photo1.jpg" className={styles.pressKitButton}>
          Photo (High Res)
        </a>
        <a href="/public/press-kit/band_logo.png" download="AlarmAlarm_Logo.png" className={styles.pressKitButton}>
          Band Logo (High Res)
        </a>
      </div>
    </section>
  );
};

export default Contact;
