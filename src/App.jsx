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
      <title>Alarm! Alarm! - Official Website</title>
      <meta name="description" content="Official website for Alarm! Alarm!, a punk rock band from Malaga. Listen to our new EP 'Amateur Skater', find tour dates, and more." />
      <meta name="keywords" content="Alarm! Alarm!, punk, punk rock, Malaga, music, band, Spanish punk band, live music, rock en español, Amateur Skater, new EP, punk pop" />
      <link rel="canonical" href="https://alarmalarmmalaga.github.io/" />
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
