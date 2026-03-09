// src/sections/SocialFeed/SocialFeed.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from "./SocialFeed.module.css";
import useTranslation from '../../hooks/useTranslation';

// Function to generate a random rotation
const getRandomRotation = () =>
  `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;

const SocialFeed = () => {
  const { t } = useTranslation();
  // Use window.__SITE_DATA__ if available (for SEO/Prerendering)
  const initialPosts = window.__SITE_DATA__?.gridItems?.slice(0, 8) || [];
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client not initialized. Social feed will not be available.');
      setLoading(false);
      return;
    }

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
      if (supabase && channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  if (loading) {
    return (
      <section id="social" className={styles.socialFeedSection}>
        <h2 className={styles.sectionTitle}>{t('social_title')}</h2>
        <p className={styles.loading}>{t('loading_grid')}</p>
      </section>
    );
  }

  return (
    <section id="social" className={styles.socialFeedSection}>
      <h2 className={styles.sectionTitle}>{t('social_title')}</h2>
      <div className={styles.feedContainer}>
        {posts.map((post) => (
          <figure
            key={post.id}
            className={styles.gridItem}
            style={{ transform: getRandomRotation() }}
          >
            <img
              src={post.image_url}
              alt={post.alt_description || post.caption || "Band photo"}
            />
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
          {t('instagram_cta')}
        </a>
      </footer>
    </section>
  );
};

export default SocialFeed;
