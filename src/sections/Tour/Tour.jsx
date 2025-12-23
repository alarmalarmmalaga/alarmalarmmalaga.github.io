// src/sections/Tour/Tour.jsx
import React, { useEffect } from "react";
import styles from "./Tour.module.css";

const Tour = () => {
  useEffect(() => {
    const scriptId = 'bandsintown-widget-script';
    if (document.getElementById(scriptId)) {
      // If script already exists, assume it's loaded and will handle the widget.
      // Optionally, if Bandsintown API provides a way to re-scan/re-init widgets, call it here.
      // For now, we return, preventing duplicate script injection.
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://widget.bandsintown.com/main.min.js';
    script.async = true;
    script.charset = 'utf-8';

    // The <a> tag should be in the DOM when this script executes.
    // useEffect runs after the render that includes the <a> tag.
    document.body.appendChild(script);

    // No cleanup function for removing main.min.js, as it's likely intended to be global once loaded.
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section id="tour" className={styles.tourSection}>
      <title>Tour Dates - Alarm! Alarm! | Live in Málaga & More</title>
      <meta name="description" content="Find upcoming tour dates for Alarm! Alarm!. See the punk rock band live in Málaga and other cities. Get tickets and RSVP." />
      <h2 className={styles.sectionTitle}>See Alarm! Alarm! Live in Málaga and Beyond</h2>
      <p className={styles.tourIntro}>
        We're hitting the road. Check out our upcoming dates below, powered by Bandsintown. Never miss a show.
      </p>
      <div className={styles.widgetContainer}>
        <a
          className="bit-widget-initializer" // Changed class to className
          data-artist-name="Alarm! Alarm!" // Updated artist name
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
          data-optin-cta-bg-color=""
          data-optin-cta-border-width=""
          data-optin-cta-border-radius=""
          data-optin-cta-border-color=""
          data-language="en"
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
