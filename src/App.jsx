// src/App.jsx
import styles from './App.module.css';
import Hero from './sections/Hero/Hero';
import Music from './sections/Music/Music';
import Tour from './sections/Tour/Tour';
import SocialFeed from './sections/SocialFeed/SocialFeed';
import Video from './sections/Video/Video';
import Releases from './sections/Releases/Releases'; // Import Releases
import Bio from './sections/Bio/Bio.jsx';
import Contact from './sections/Contact/Contact'; // Import Contact

function App() {
  return (
    <div className={styles.container}>
      {/*
        Note: Title and Meta tags are now managed via static prerendering
        in scripts/prerender.js to ensure better SEO/GEO and prevent runtime overrides.
      */}
      <Hero />
      <Music />
      <Tour />
      <SocialFeed />
      <Video />
      <Releases /> {/* Add Releases component */}
      <Bio /> {/* Add PressKit section here */}
      <Contact /> {/* Add Contact component */}
    </div>
  );
}

export default App;
