// src/sections/SocialFeed/SocialFeed.jsx
import styles from "./SocialFeed.module.css";
import photo1 from "../../assets/images/photo1.jpg";
import photo2 from "../../assets/images/photo2.jpeg";
import photo3 from "../../assets/images/photo3.jpg";
import photo4 from "../../assets/images/photo4.jpg";
import photo5 from "../../assets/images/photo5.jpg";
import photo6 from "../../assets/images/photo6.jpg";
import albumCoverEp1 from "../../assets/images/album-cover-ep1.jpg";
import albumCoverEp2 from "../../assets/images/album-cover-ep2.jpg";

const socialPosts = [
    {
    id: 1,
    image: photo2,
    alt: "Alarm! Alarm! 2025 Spotify stats screenshot showing streams and listeners.",
    caption:
      "Thanks everyone! Almost 8K listeners! We love you! #spotify #punkrock #alarmalarm",
  },
  {
    id: 2,
    image: albumCoverEp2,
    alt: "Album cover for Amateur Skater EP by Alarm! Alarm!",
    caption:
      "Our new EP 'Amateur Skater' is out now! Stream it everywhere. #newmusic #punkrock #amateurskater",
  },
  {
    id: 3,
    image: albumCoverEp1,
    alt: "Artwork for the '98-'99 EP by Alarm! Alarm!",
    caption:
      "Throwback to the '98-'99 EP. What's your favorite track? #tbt #punkhistory #90spunk",
  },
  {
    id: 4,
    image: photo1,
    alt: "Alarm! Alarm! band members posing for a photo in a gritty urban setting.",
    caption:
      "Preparing new stuff! #bandlife #phototime #punk",
  },
  {
    id: 5,
    image: photo3,
    alt: "Live shot of Alarm! Alarm! mid-performance.",
    caption: "Always for the pit. #live #punk #moshpit",
  },
  {
    id: 6,
    image: photo4,
    alt: "Alarm! Alarm! all together in the studio.",
    caption: "From the studio!! #studio #recording",
  },
  {
    id: 7,
    image: photo5,
    alt: "Alarm! Alarm! playing live at an outdoor venue.",
    caption: "Live from Malaga! Thanks everyone! #live #malaga #punk",
  },
  {
    id: 8,
    image: photo6,
    alt: "Alarm! Alarm! drummer holding drumsticks and singinging into a microphone.",
    caption: "What a night! Epic! #live #malaga #punk",
  },
];

// Function to generate a random rotation
const getRandomRotation = () =>
  `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;

const SocialFeed = ({ gridItems }) => {
  const dataToRender = gridItems || socialPosts;
  return (
    <section id="social" className={styles.socialFeedSection}>
      <h2 className={styles.sectionTitle}>The Brutalist Grid</h2>
      <div className={styles.feedContainer}>
        {dataToRender.map((post) => (
          <figure
            key={post.id}
            className={styles.gridItem}
            style={{ transform: getRandomRotation() }}
          >
            <img src={post.image || post.image_url} alt={post.alt || post.alt_description} />
            <figcaption className={styles.caption}>{post.caption}</figcaption>
          </figure>
        ))}
      </div>
      <footer className={styles.socialFooter}>
        <a
          href="https://www.instagram.com/alarmalarmmalaga/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
          aria-label="Follow Alarm! Alarm! on Instagram (opens in a new tab)"
        >
          WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →
        </a>
      </footer>
    </section>
  );
};

export default SocialFeed;
