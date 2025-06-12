// src/sections/SocialFeed/SocialFeed.jsx
import styles from './SocialFeed.module.css';

const SocialFeed = () => {
  return (
    <section className={styles.socialFeedSection}>
      <h2 className={styles.sectionTitle}>Our Noise</h2>
      <div className={styles.feedContainer}>
        {/* Conceptual placeholder for an Instagram feed embed */}
        {/* In a real scenario, this would be the actual embed code from Lightwidget/Elfsight */}
        <div className={styles.instagramEmbedPlaceholder}>
            <p className={styles.placeholderInfoText}></p>
            {/* Example of how items might be structured if we built it manually, for styling concept */}
            <div className={`${styles.instaItem} ${styles.instaItem1}`}>Item 1</div>
            <div className={`${styles.instaItem} ${styles.instaItem2}`}>Item 2</div>
            <div className={`${styles.instaItem} ${styles.instaItem3}`}>Item 3</div>
            <div className={`${styles.instaItem} ${styles.instaItem4}`}>Item 4</div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
