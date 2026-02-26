// src/sections/SocialFeed/SocialFeed.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from "./SocialFeed.module.css";

// Function to generate a random rotation
const getRandomRotation = () =>
  `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('brutalist_grid')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching brutalist grid:', error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="social" className={styles.socialFeedSection}>
        <h2 className={styles.sectionTitle}>The Brutalist Grid</h2>
        <p className={styles.loading}>Loading grid...</p>
      </section>
    );
  }

  return (
    <section id="social" className={styles.socialFeedSection}>
      <h2 className={styles.sectionTitle}>The Brutalist Grid</h2>
      <div className={styles.feedContainer}>
        {posts.map((post) => (
          <figure
            key={post.id}
            className={styles.gridItem}
            style={{ transform: getRandomRotation() }}
          >
            <img src={post.image_url} alt={post.caption || "Band photo"} />
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
        >
          WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →
        </a>
      </footer>
    </section>
  );
};

export default SocialFeed;
