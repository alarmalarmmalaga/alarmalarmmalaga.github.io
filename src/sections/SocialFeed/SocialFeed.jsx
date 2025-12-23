// src/sections/SocialFeed/SocialFeed.jsx
import styles from './SocialFeed.module.css';
import photo1 from '../../assets/images/photo1.jpg';
import albumCoverEp1 from '../../assets/images/album-cover-ep1.jpg';
import albumCoverEp2 from '../../assets/images/album-cover-ep2.jpg';
import albumCoverLp1 from '../../assets/images/album-cover-lp1.jpg';
import albumCoverLp2 from '../../assets/images/album-cover-lp2.jpg';
import albumCoverLive from '../../assets/images/album-cover-live.jpg';

const socialPosts = [
  {
    id: 1,
    image: photo1,
    alt: "Alarm! Alarm! punk band performing live at a dark venue in Málaga.",
    caption: "Málaga was a blast. Thanks for coming out. We'll be back soon. #punk #livemusic #malaga"
  },
  {
    id: 2,
    image: albumCoverEp1,
    alt: "Album cover for Amateur Skater EP by Alarm! Alarm!",
    caption: "Our new EP 'Amateur Skater' is out now! Stream it everywhere. #newmusic #punkrock #amate skater"
  },
  {
    id: 3,
    image: albumCoverLp1,
    alt: "Alarm! Alarm! band members posing for a photo in a gritty urban setting.",
    caption: "In the studio, cooking up something new. #bandlife #studiotime #punk"
  },
  {
    id: 4,
    image: albumCoverEp2,
    alt: "Artwork for the '98-'99 EP by Alarm! Alarm!",
    caption: "Throwback to the '98-'99 EP. What's your favorite track? #tbt #punkhistory #90spunk"
  },
  {
    id: 5,
    image: albumCoverLive,
    alt: "Live shot of Alarm! Alarm! mid-performance.",
    caption: "Always for the pit. #live #punk #moshpit"
  },
    {
    id: 6,
    image: albumCoverLp2,
    alt: "Alarm! Alarm! posing in front of a graffiti wall.",
    caption: "New merch coming soon. #merch #bandmerch #punkfashion"
  }
];

// Function to generate a random rotation
const getRandomRotation = () => `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;

const SocialFeed = () => {
  return (
    <section className={styles.socialFeedSection}>
      <h2 className={styles.sectionTitle}>The Brutalist Grid</h2>
      <div className={styles.feedContainer}>
        {socialPosts.map(post => (
          <figure key={post.id} className={styles.gridItem} style={{ transform: getRandomRotation() }}>
            <img src={post.image} alt={post.alt} />
            <figcaption className={styles.caption}>{post.caption}</figcaption>
          </figure>
        ))}
      </div>
      <footer className={styles.socialFooter}>
        <a href="https://www.instagram.com/alarm_alarm_official/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARM_ALARM_OFFICIAL →
        </a>
      </footer>
    </section>
  );
};

export default SocialFeed;
