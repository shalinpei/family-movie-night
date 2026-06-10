import { getClickCounts, incrementClick, fetchPosterURL } from './db.js';

// ─── Show data ──────────────────────────────────────────────────
const SHOWS = [
  {
    id: 'bluey',
    title: 'Bluey',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-fa6973b9-e7cf-49fb-81a2-d4908e4bf694',
    addedDate: '2024-01-15',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'minnie-mouse-bow-toons',
    title: 'Minnie Mouse Bow Toons',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-0f3c3935-9eed-41b9-9d24-21e3331a4e48',
    addedDate: '2024-01-22',
    type: 'tv',
    tmdbId: 41997,
    tmdbType: 'tv',
    isComing: false,
  },
  {
    id: 'k-pop-demon-hunters',
    title: 'K-Pop Demon Hunters',
    platform: 'Netflix',
    url: 'https://www.netflix.com/watch/82125877',
    addedDate: '2024-11-01',
    type: 'movie',
    year: 2025,
    tmdbId: 803796,
    tmdbType: 'movie',
    isComing: false,
  },
  {
    id: 'aladdin',
    title: 'Aladdin',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-bfad6284-a0aa-4ae1-8469-dc1653121dbb',
    addedDate: '2024-02-10',
    type: 'movie',
    year: 1992,
    isComing: false,
  },
  {
    id: 'the-lion-king',
    title: 'The Lion King',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-e33d5b99-5424-4015-84ee-d2cf5632e910',
    addedDate: '2024-02-14',
    type: 'movie',
    year: 1994,
    isComing: false,
  },
  {
    id: 'frozen',
    title: 'Frozen',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-5001c2ec-ce1d-474f-8cda-59f3dc3839ac',
    addedDate: '2024-02-20',
    type: 'movie',
    year: 2013,
    isComing: false,
  },
  {
    id: 'moana',
    title: 'Moana',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-e8896bfa-1052-41f7-ae2e-00255d77cf05',
    addedDate: '2024-03-05',
    type: 'movie',
    year: 2016,
    isComing: false,
  },
  {
    id: 'lilo-stitch-movie',
    title: 'Lilo & Stitch (Movie)',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-e291d4ea-cd86-4eb2-9f39-20d2b75165ee',
    addedDate: '2024-03-15',
    type: 'movie',
    year: 2002,
    tmdbId: 11544,
    tmdbType: 'movie',
    isComing: false,
  },
  {
    id: 'lilo-stitch-series',
    title: 'Lilo & Stitch (Series)',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-5da26547-07dc-43a8-abef-2d821c073b13',
    addedDate: '2024-03-15',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'puffin-rock',
    title: 'Puffin Rock',
    platform: 'Netflix',
    url: 'https://www.netflix.com/title/80044965',
    addedDate: '2024-04-01',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'numberblocks',
    title: 'Numberblocks',
    platform: 'Netflix',
    url: 'https://www.netflix.com/title/81272431',
    addedDate: '2024-04-10',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'sesame-street',
    title: 'Sesame Street',
    platform: 'Max',
    url: 'https://www.max.com/shows/sesame-street/f175ce7b-ab72-4ac9-a029-c8c29bd17b7c',
    addedDate: '2024-04-20',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'daniel-tiger',
    title: "Daniel Tiger's Neighborhood",
    platform: 'PBS Kids',
    url: 'https://pbskids.org/videos/daniel-tigers-neighborhood',
    addedDate: '2024-05-01',
    type: 'tv',
    isComing: false,
  },
  {
    id: 'great-pumpkin-charlie-brown',
    title: "It's the Great Pumpkin, Charlie Brown",
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/its-the-great-pumpkin-charlie-brown/umc.cmc.1c5nvp802hos5t3u0umlukkwh',
    addedDate: '2024-09-15',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'charlie-brown-thanksgiving',
    title: 'A Charlie Brown Thanksgiving',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/a-charlie-brown-thanksgiving/umc.cmc.7grdgbjdq3tiy37f4dc3yeyms',
    addedDate: '2024-09-20',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'charlie-brown-christmas',
    title: 'A Charlie Brown Christmas',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/a-charlie-brown-christmas/umc.cmc.mbxalimrwrtq72wj4h601pyf',
    addedDate: '2024-10-01',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'happy-new-year-charlie-brown',
    title: 'Happy New Year, Charlie Brown',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/happy-new-year-charlie-brown/umc.cmc.72bog44gdxl0cafwane0z8r32',
    addedDate: '2024-12-01',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'my-neighbor-totoro',
    title: 'My Neighbor Totoro',
    platform: 'Max',
    url: 'https://www.max.com/movies/my-neighbor-totoro/5e1eb7b5-c256-402d-b63a-4ce7676a3c8e',
    addedDate: '2024-12-05',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'ponyo',
    title: 'Ponyo',
    platform: 'Max',
    url: 'https://play.hbomax.com/movie/cb37168b-290a-4e59-bf82-1b1a7f75b6ae',
    addedDate: '2024-12-10',
    type: 'movie',
    isComing: false,
  },
  {
    id: 'kikis-delivery-service',
    title: "Kiki's Delivery Service",
    platform: 'Max',
    url: 'https://www.max.com/movies/kikis-delivery-service/b7788922-e4c4-42f8-918b-304a7a187f38',
    addedDate: '2024-12-15',
    type: 'movie',
    isComing: false,
  },
];

// ─── State ──────────────────────────────────────────────────────
let clickCounts = {};
let posterCache = {};
let currentSort = 'popular';
let currentTheme = (() => { try { return localStorage.getItem('theme') ?? 'dreamy'; } catch { return 'dreamy'; } })();

// ─── Render ─────────────────────────────────────────────────────
function renderGrid(sortBy) {
  const grid = document.getElementById('card-grid');
  const sorted = sortShows([...SHOWS], sortBy);

  if (currentTheme === 'blockbuster') {
    const { classics, newReleases } = splitIntoShelves(sorted);
    grid.innerHTML = `
      <div class="shelf">
        <div class="shelf-label">🆕 NEW RELEASES</div>
        <div class="shelf-grid">${newReleases.map(buildCardHTML).join('')}</div>
      </div>
      <div class="shelf">
        <div class="shelf-label">⭐ CLASSICS</div>
        <div class="shelf-grid">${classics.map(buildCardHTML).join('')}</div>
      </div>`;
  } else {
    grid.innerHTML = sorted.map(buildCardHTML).join('');
  }

  grid.querySelectorAll('.card[data-url]').forEach(card => {
    card.addEventListener('click', () => handleCardClick(card.dataset.id, card.dataset.url));
  });

  // Attach cached posters via createElement so onerror is always wired
  SHOWS.forEach(show => {
    if (posterCache[show.id]) updateCardImage(show.id, posterCache[show.id]);
  });
}

// 4 most recently added shows go to New Releases; rest are Classics.
// Shelf membership is always by date; sort order within each shelf
// follows the active sort (popular / recent / alpha).
function splitIntoShelves(sortedShows) {
  const real   = sortedShows.filter(s => !s.isComing);
  const coming = sortedShows.filter(s => s.isComing);

  const newReleaseIds = new Set(
    [...real]
      .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
      .slice(0, 4)
      .map(s => s.id)
  );

  return {
    classics:    real.filter(s => !newReleaseIds.has(s.id)),
    newReleases: [...real.filter(s => newReleaseIds.has(s.id)), ...coming],
  };
}

function makePlaceholder() {
  const div = document.createElement('div');
  div.className = 'card-img card-img-placeholder';
  return div;
}

function buildCardHTML(show) {
  if (show.isComing) {
    return `
      <div class="card coming-soon" aria-label="Coming Soon">
        <div class="card-img card-img-placeholder"></div>
        <div class="card-label">
          <div class="card-title">Coming Soon</div>
        </div>
      </div>`;
  }

  const count = clickCounts[show.id] ?? 0;
  const countBadge = count > 0
    ? `<span class="card-count">▶ ${count}</span>`
    : '';
  return `
    <div class="card" data-id="${show.id}" data-url="${show.url}" role="button" tabindex="0"
         aria-label="Watch ${show.title} on ${show.platform}">
      <div class="card-img card-img-placeholder"></div>
      ${countBadge}
      <div class="card-label">
        <div class="card-title">${show.title}</div>
        <div class="card-platform">${show.platform}</div>
      </div>
    </div>`;
}

function updateCardImage(id, url) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (!card) return;
  const show = SHOWS.find(s => s.id === id);
  const img = document.createElement('img');
  img.className = 'card-img';
  img.alt = show?.title ?? id;
  img.onerror = () => { delete posterCache[id]; img.replaceWith(makePlaceholder()); };
  img.src = url;
  const existing = card.querySelector('.card-img');
  if (existing) existing.replaceWith(img);
}

// ─── Sort ────────────────────────────────────────────────────────
function sortShows(shows, sortBy) {
  const real = shows.filter(s => !s.isComing);
  const coming = shows.filter(s => s.isComing);

  switch (sortBy) {
    case 'popular':
      real.sort((a, b) => (clickCounts[b.id] ?? 0) - (clickCounts[a.id] ?? 0));
      break;
    case 'recent':
      real.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      break;
    case 'alpha':
      real.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return [...real, ...coming];
}

// ─── Click tracking ──────────────────────────────────────────────
async function handleCardClick(id, url) {
  window.open(url, '_blank', 'noopener,noreferrer');

  try {
    const updated = await incrementClick(id);
    if (updated !== null) {
      clickCounts[id] = updated;
      if (currentSort === 'popular') renderGrid(currentSort);
      else updateCountBadge(id);
    }
  } catch {
    // click tracking is non-critical — swallow silently
  }
}

function updateCountBadge(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (!card) return;
  let badge = card.querySelector('.card-count');
  const count = clickCounts[id] ?? 0;
  if (count === 0) return;
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'card-count';
    card.appendChild(badge);
  }
  badge.textContent = `▶ ${count}`;
}

// ─── Sort controls ───────────────────────────────────────────────
function initSortControls() {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      renderGrid(currentSort);
    });
  });
}

// ─── Theme system (easter egg) ───────────────────────────────────
function setTheme(theme) {
  document.body.classList.toggle('blockbuster', theme === 'blockbuster');
  document.getElementById('theme-hint').textContent = theme === 'blockbuster'
    ? '🌙'
    : 'Be Kind, Rewind';
  currentTheme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
}

function playVHS(direction, onSwitch) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onSwitch();
    return;
  }
  const overlay = document.getElementById('vhs-overlay');
  const cls = direction === 'in' ? 'vhs-playing' : 'vhs-rewind';
  const cleanup = () => overlay.classList.remove(cls);
  overlay.classList.add(cls);
  setTimeout(onSwitch, direction === 'in' ? 420 : 220);
  overlay.addEventListener('animationend', cleanup, { once: true });
  setTimeout(cleanup, 2000); // fallback if animationend never fires
}

function initThemeSystem() {
  // Restore persisted theme without animation
  try { currentTheme = localStorage.getItem('theme') ?? 'dreamy'; } catch { /* keep default */ }
  setTheme(currentTheme);

  // Footer toggle: Be Kind, Rewind → Blockbuster; 🌙 → Dreamy
  document.getElementById('theme-hint').addEventListener('click', () => {
    if (currentTheme === 'dreamy') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playVHS('in', () => { setTheme('blockbuster'); renderGrid(currentSort); });
    } else {
      playVHS('out', () => { setTheme('dreamy'); renderGrid(currentSort); });
    }
  });
}

// ─── Boot ────────────────────────────────────────────────────────
async function init() {
  initSortControls();
  initThemeSystem();

  try {
    clickCounts = await getClickCounts() ?? {};
  } catch {
    clickCounts = {};
  }

  renderGrid(currentSort);

  // Fetch TMDB posters in parallel; swap each card image in as it arrives
  Promise.all(
    SHOWS.filter(s => !s.isComing).map(show =>
      fetchPosterURL(show.title, show.type, show.year, show.tmdbId, show.tmdbType).then(url => {
        if (url) {
          posterCache[show.id] = url;
          updateCardImage(show.id, url);
        }
      })
    )
  );

  // Keyboard accessibility for cards
  document.getElementById('card-grid').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.card[data-url]');
      if (card) {
        e.preventDefault();
        handleCardClick(card.dataset.id, card.dataset.url);
      }
    }
  });
}

init();
