// src/sections/Tour/Tour.jsx
import React, { useEffect } from 'react';
import styles from './Tour.module.css';

const Tour = () => {
  useEffect(() => {
    // It's possible the Bandsintown script re-initializes or needs a nudge
    // if loaded dynamically or if the component re-renders.
    // For now, we assume the script in index.html handles initialization.
    // If issues arise, we might need to trigger its functions here.
    if (window.bandsintown && window.bandsintown.widgets && typeof window.bandsintown.widgets.load === 'function') {
      window.bandsintown.widgets.load();
    }
  }, []);

  return (
    <section className={styles.tourSection}>
      <h2 className={styles.sectionTitle}>Upcoming Shows</h2>
      <div className={styles.widgetContainer}>
        <a
          className="bit-widget-initializer"
          data-artist-name="PUP" // Placeholder artist
          data-display-local-dates="false"
          data-display-past-dates="false"
          data-auto-style="false" // Important: try to disable their auto-styling
          data-text-color="#F5F5F5"
          data-link-color="#FFFF00" // Accent color
          data-background-color="#000000"
          data-popup-background-color="#111111" // Darker popup
          data-separator-color="#333333" // Darker separator
          data-font="Inter" // Try to set a base font
          data-display-limit="15"
          data-display-start-time="false"
          data-display-lineup="false"
          data-display-details="false" // Keep it minimal
          data-language="en"
          data-app-id="" // Required by Bandsintown, can be empty
        ></a>
      </div>
    </section>
  );
};
export default Tour;
