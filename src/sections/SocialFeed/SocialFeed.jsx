// src/sections/SocialFeed/SocialFeed.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from "./SocialFeed.module.css";

// Placeholder data - fallback for when Supabase is not available
const socialPosts = [
    {
    id: 1,
    image: 'https://via.placeholder.com/300?text=Spotify+Stats',
    alt: "Alarm! Alarm! 2025 Spotify stats screenshot showing streams and listeners.",
    caption:
      "Thanks everyone! Almost 8K listeners! We love you! #spotify #punkrock #alarmalarm",
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300?text=Amateur+Skater',
    alt: "Album cover for Amateur Skater EP by Alarm! Alarm!",
    caption:
      "Our new EP 'Amateur Skater' is out now! Stream it everywhere. #newmusic #punkrock #amateurskater",
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300?text=98-99',
    alt: "Artwork for the '98-'99 EP by Alarm! Alarm!",
    caption:
      "Throwback to the '98-'99 EP. What's your favorite track? #tbt #punkhistory #90spunk",
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300?text=Band+Photo',
    alt: "Alarm! Alarm! band members posing for a photo in a gritty urban setting.",
    caption:
      "Preparing new stuff! #bandlife #phototime #punk",
  },
];

// Function to generate a random rotation
const getRandomRotation = () =>
  `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;

const SocialFeed = ({ gridItems: initialGridItems }) => {
  const [posts, setPosts] = useState(initialGridItems || []);
  const [loading, setLoading] = useState(!initialGridItems && !!supabase);

  useEffect(() => {
    if (!supabase) {
      if (!initialGridItems) {
        setPosts(socialPosts);
      }
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
        if (!initialGridItems) setPosts(socialPosts);
      } else {
        setPosts(data ? data.slice(0, 8) : []);
      }
      setLoading(false);
    };

    if (!initialGridItems) {
        fetchPosts();
    }

    // Real-time subscription for new entries
    const channel = supabase
      .channel('brutalist_grid_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'brutalist_grid' },
        (payload) => {
          setPosts((currentPosts) => {
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
  }, [initialGridItems]);

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
            <img
                src={post.image_url || post.image || 'https://via.placeholder.com/300?text=Band+Photo'}
                alt={post.alt_description || post.alt || post.caption || "Band photo"}
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
          aria-label="Follow Alarm! Alarm! on Instagram (opens in a new tab)"
        >
          WE LIVE ON INSTAGRAM. FOLLOW THE CHAOS @ALARMALARMMALAGA →
        </a>
      </footer>
    </section>
  );
};

export default SocialFeed;
