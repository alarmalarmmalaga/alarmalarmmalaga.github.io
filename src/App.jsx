// src/App.jsx
import styles from './App.module.css';
import Hero from './sections/Hero/Hero';
import Music from './sections/Music/Music';
import Tour from './sections/Tour/Tour';
import SocialFeed from './sections/SocialFeed/SocialFeed';
import Video from './sections/Video/Video';
import Releases from './sections/Releases/Releases'; // Import Releases
import Bio from './sections/Bio/Bio.jsx';
import EPK from './sections/EPK/EPK'; // Import EPK
import Footer from './components/Footer/Footer'; // Import Footer
import LanguageToggle from './components/LanguageToggle';

function App() {
  // Simple routing for EPK page
  const isEPK = window.location.pathname.includes('/epk');

  if (isEPK) {
    return (
      <div className={styles.container}>
        <LanguageToggle />
        <EPK />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LanguageToggle />
      {/*
        Note: Title and Meta tags are now managed via static prerendering
        in scripts/prerender.js to ensure better SEO/GEO and prevent runtime overrides.
      */}
      <Hero />
      <Music />
      <Tour />
      <Releases />
      <SocialFeed />
      <Bio />
      <Video />
      <Footer />
    </div>
  );
}

export default App;
