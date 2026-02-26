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
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching brutalist grid:', error);
      } else {
        // Ensure we only have 8 even if the fetch returns more (safeguard)
        setPosts(data ? data.slice(0, 8) : []);
      }
      setLoading(false);
    };

    fetchPosts();

    // Real-time subscription for new entries
    const channel = supabase
      .channel('brutalist_grid_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'brutalist_grid' },
        (payload) => {
          setPosts((currentPosts) => {
            // Add the new post to the top and keep only the latest 8
            const updatedPosts = [payload.new, ...currentPosts];
            return updatedPosts.slice(0, 8);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
