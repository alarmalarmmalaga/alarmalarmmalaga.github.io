// src/hooks/useTranslation.js
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const useTranslation = () => {
  // 1. Detect language from URL (e.g., /es/, /de/, /jp/)
  const getLanguageFromUrl = () => {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/de/')) return 'de';
    if (path.includes('/jp/')) return 'jp';
    return 'en';
  };

  const [language, setLanguage] = useState(getLanguageFromUrl());
  // Use window.__SITE_DATA__.strings if available from prerendering
  const [strings, setStrings] = useState(window.__SITE_DATA__?.strings || {});

  const fetchStrings = useCallback(async () => {
    if (!supabase) return;

    // If strings are already in window.__SITE_DATA__, we still fetch to support real-time updates
    const { data, error } = await supabase
      .from('site_strings')
      .select('*');

    if (error) {
      console.error('Error fetching site strings:', error);
    } else if (data) {
      const stringsMap = data.reduce((acc, row) => {
        acc[row.key] = row;
        return acc;
      }, {});
      setStrings(stringsMap);
    }
  }, []);

  useEffect(() => {
    fetchStrings();

    if (!supabase) return;

    // Real-time subscription for UI string updates
    const channel = supabase
      .channel('site_strings_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_strings' },
        () => fetchStrings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStrings]);

  // Translation function
  const t = (key) => {
    const row = strings[key];
    if (!row) return key; // Fallback to key if not found

    // Fallback to English if requested language is missing
    return row[language] || row['en'] || key;
  };

  return { t, language, setLanguage };
};

export default useTranslation;
