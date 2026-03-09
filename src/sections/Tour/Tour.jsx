// src/sections/Tour/Tour.jsx
import React, { useEffect } from "react";
import styles from "./Tour.module.css";
import useTranslation from "../../hooks/useTranslation";

const Tour = () => {
  const { t, language } = useTranslation();

  useEffect(() => {
    const scriptId = 'bandsintown-widget-script';
    if (document.getElementById(scriptId)) {
      // If script already exists, we might need to tell it to re-initialize if the language changed
      // but usually these widgets are static.
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://widget.bandsintown.com/main.min.js';
    script.async = true;
    script.charset = 'utf-8';

    document.body.appendChild(script);
  }, []);

  return (
    <section id="tour" className={styles.tourSection}>
      <meta name="description" content="Find upcoming tour dates for Alarm! Alarm!. See the punk rock band live in Málaga and other cities. Get tickets and RSVP." />
      <h2 className={styles.sectionTitle}>{t('tour_title')}</h2>
      <p className={styles.tourIntro}>
        {t('tour_intro')}
      </p>
      <div className={styles.widgetContainer}>
        <a
          className="bit-widget-initializer"
          data-artist-name="Alarm! Alarm!"
          data-events-to-display=""
          data-background-color="rgba(0,0,0,1)"
          data-separator-color="rgba(221,221,221,1)"
          data-text-color="rgba(255,255,255,1)"
          data-auto-style="true"
          data-button-label-capitalization="uppercase"
          data-header-capitalization="uppercase"
          data-location-capitalization="uppercase"
          data-venue-capitalization="uppercase"
          data-display-local-dates="true"
          data-local-dates-position="tab"
          data-display-past-dates="true"
          data-display-details="true"
          data-display-lineup="false"
          data-display-start-time="false"
          data-social-share-icon="false"
          data-display-limit="all"
          data-date-format="MMM. D, YYYY"
          data-date-orientation="horizontal"
          data-date-border-color="#4A4A4A"
          data-date-border-width="1px"
          data-date-capitalization="capitalize"
          data-date-border-radius="10px"
          data-event-ticket-cta-size="medium"
          data-event-custom-ticket-text=""
          data-event-ticket-text="TICKETS"
          data-event-ticket-icon="false"
          data-event-ticket-cta-text-color="rgba(255,255,255,1)"
          data-event-ticket-cta-bg-color="rgba(74,74,74,1)"
          data-event-ticket-cta-border-color="rgba(74,74,74,1)"
          data-event-ticket-cta-border-width="0px"
          data-event-ticket-cta-border-radius="2px"
          data-sold-out-button-text-color="rgba(255,255,255,1)"
          data-sold-out-button-background-color="rgba(74,74,74,1)"
          data-sold-out-button-border-color="rgba(74,74,74,1)"
          data-sold-out-button-clickable="true"
          data-event-rsvp-position="left"
          data-event-rsvp-cta-size="medium"
          data-event-rsvp-only-show-icon="false"
          data-event-rsvp-text="RSVP"
          data-event-rsvp-icon="false"
          data-event-rsvp-cta-text-color="rgba(74,74,74,1)"
          data-event-rsvp-cta-bg-color="rgba(255,255,255,1)"
          data-event-rsvp-cta-border-color="rgba(74,74,74,1)"
          data-event-rsvp-cta-border-width="1px"
          data-event-rsvp-cta-border-radius="2px"
          data-follow-section-position="top"
          data-follow-section-alignment="center"
          data-follow-section-header-text="Get updates on new shows, new music, and more"
          data-follow-section-cta-size="medium"
          data-follow-section-cta-text="FOLLOW"
          data-follow-section-cta-icon="false"
          data-follow-section-cta-text-color="rgba(255,255,255,1)"
          data-follow-section-cta-bg-color="rgba(74,74,74,1)"
          data-follow-section-cta-border-color="rgba(74,74,74,1)"
          data-follow-section-cta-border-width="0px"
          data-follow-section-cta-border-radius="2px"
          data-play-my-city-position="bottom"
          data-play-my-city-alignment="center"
          data-play-my-city-header-text="Don’t see a show near you?"
          data-play-my-city-cta-size="medium"
          data-play-my-city-cta-text="REQUEST A SHOW"
          data-play-my-city-cta-icon="false"
          data-play-my-city-cta-text-color="rgba(0,0,0,1)"
          data-play-my-city-cta-bg-color="rgba(255,255,0,1)"
          data-play-my-city-cta-border-color="rgba(74,74,74,1)"
          data-play-my-city-cta-border-width="0px"
          data-play-my-city-cta-border-radius="2px"
          data-optin-font=""
          data-optin-text-color=""
          data-optin-bg-color=""
          data-optin-cta-text-color=""
          data-optin-cta-border-width=""
          data-optin-cta-border-radius=""
          data-optin-cta-border-color=""
          data-language={language}
          data-layout-breakpoint="900"
          data-app-id=""
          data-affil-code=""
          data-bit-logo-position="bottomRight"
          data-bit-logo-color="rgba(255,255,255,1)"
        ></a>
      </div>
    </section>
  );
};
export default Tour;
