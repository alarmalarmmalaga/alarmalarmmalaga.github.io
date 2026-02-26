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
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(window.__SITE_DATA__ || null);

  useEffect(() => {
    if (!data) {
      fetch('/site-data.json')
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Hero />
      <Music />
      <Tour />
      <SocialFeed gridItems={data?.gridItems} />
      <Video />
      <Releases albums={data?.albums} /> {/* Add Releases component */}
      <Bio /> {/* Add PressKit section here */}
      <Contact /> {/* Add Contact component */}
    </div>
  );
}

export default App;
