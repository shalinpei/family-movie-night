import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY, TMDB_READ_TOKEN } from './config.js';

// ─── TMDB ────────────────────────────────────────────────────────
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export async function fetchPosterURL(title, type, year, tmdbId, tmdbType) {
  try {
    let url, poster;
    if (tmdbId) {
      url = `https://api.themoviedb.org/3/${tmdbType}/${tmdbId}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${TMDB_READ_TOKEN}` } });
      const data = await res.json();
      poster = data.poster_path;
    } else {
      const yearParam = year ? `&year=${year}` : '';
      url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(title)}${yearParam}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${TMDB_READ_TOKEN}` } });
      const data = await res.json();
      poster = data.results?.[0]?.poster_path;
    }
    return poster ? TMDB_IMAGE_BASE + poster : null;
  } catch {
    return null;
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function incrementClickCount(showId) {
  const { data, error } = await supabase.rpc('increment_click_count', { p_show_id: showId });
  if (error) console.error('incrementClickCount error:', error);
  return data;
}

export { incrementClickCount as incrementClick };

export async function getClickCounts() {
  const { data, error } = await supabase.from('shows').select('show_id, click_count');
  if (error) {
    console.error('getClickCounts error:', error);
    return {};
  }
  return Object.fromEntries(data.map(row => [row.show_id, row.click_count]));
}
