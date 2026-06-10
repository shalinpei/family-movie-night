import { getClickCounts, incrementClick } from './db.js';

// ─── Show data ──────────────────────────────────────────────────
const SHOWS = [
  {
    id: 'bluey',
    title: 'Bluey',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/browse/entity-fa6973b9-e7cf-49fb-81a2-d4908e4bf694',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_bluey_19703_en_us_360x540_54a5827e.jpeg',
    addedDate: '2024-01-15',
    isComing: false,
  },
  {
    id: 'minnie-mouse-bow-toons',
    title: 'Minnie Mouse Bow Toons',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/series/minnie-mouse-bow-toons',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_mickeymouseclubhouse_19736_en_us_360x540.jpeg',
    addedDate: '2024-01-22',
    isComing: false,
  },
  {
    id: 'k-pop-demon-hunters',
    title: 'K-Pop Demon Hunters',
    platform: 'Netflix',
    url: 'https://www.netflix.com/title/81953594',
    image: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABT6pTMpLGPaTSRSVg7BKlvMlkKGcASbMsB9i1-RCH7Gp2UtJb8QfJBZXGnZ5h7PGHGF.jpg',
    addedDate: '2024-11-01',
    isComing: false,
  },
  {
    id: 'aladdin',
    title: 'Aladdin',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/movies/aladdin/5oxSjCHKG3AL',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_aladdin_19736_en_us_360x540.jpeg',
    addedDate: '2024-02-10',
    isComing: false,
  },
  {
    id: 'the-lion-king',
    title: 'The Lion King',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/movies/the-lion-king/4jMnyDmhkSxF',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_thelionking_19736_en_us_360x540.jpeg',
    addedDate: '2024-02-14',
    isComing: false,
  },
  {
    id: 'frozen',
    title: 'Frozen',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/movies/frozen/4uFbHUZsHqhM',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_frozen_19736_en_us_360x540.jpeg',
    addedDate: '2024-02-20',
    isComing: false,
  },
  {
    id: 'moana',
    title: 'Moana',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/movies/moana/6pARgIAMvH0M',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_moana_19736_en_us_360x540.jpeg',
    addedDate: '2024-03-05',
    isComing: false,
  },
  {
    id: 'lilo-stitch-movie',
    title: 'Lilo & Stitch (Movie)',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/movies/lilo-stitch/7lHSMxcFxnPE',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_liloandstitch_19736_en_us_360x540.jpeg',
    addedDate: '2024-03-15',
    isComing: false,
  },
  {
    id: 'lilo-stitch-series',
    title: 'Lilo & Stitch (Series)',
    platform: 'Disney+',
    url: 'https://www.disneyplus.com/series/lilo-stitch-the-series',
    image: 'https://lumiere-a.akamaihd.net/v1/images/p_lilostitchtheseries_19736_en_us_360x540.jpeg',
    addedDate: '2024-03-15',
    isComing: false,
  },
  {
    id: 'puffin-rock',
    title: 'Puffin Rock',
    platform: 'Netflix',
    url: 'https://www.netflix.com/title/80044965',
    image: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXEd8BSdvP4bBTH0kJKRTJmr.jpg',
    addedDate: '2024-04-01',
    isComing: false,
  },
  {
    id: 'numberblocks',
    title: 'Numberblocks',
    platform: 'Netflix',
    url: 'https://www.netflix.com/title/81272431',
    image: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABQbwbk1nNkQRSmkPmDGW5RwH.jpg',
    addedDate: '2024-04-10',
    isComing: false,
  },
  {
    id: 'sesame-street',
    title: 'Sesame Street',
    platform: 'Max',
    url: 'https://www.max.com/shows/sesame-street/f175ce7b-ab72-4ac9-a029-c8c29bd17b7c',
    image: 'https://m.media-amazon.com/images/M/MV5BMTkzNjk3MDYxNF5BMl5BanBnXkFtZTgwNjExNjY3NzE@._V1_.jpg',
    addedDate: '2024-04-20',
    isComing: false,
  },
  {
    id: 'daniel-tiger',
    title: 'Daniel Tiger',
    platform: 'PBS Kids',
    url: 'https://pbskids.org/daniel',
    image: 'https://m.media-amazon.com/images/M/MV5BZWQ4OTM5ZTAtZjE1ZS00Y2M2LWI0YWYtNWZlNzJlZGZlZGQ4XkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg',
    addedDate: '2024-05-01',
    isComing: false,
  },
  {
    id: 'great-pumpkin-charlie-brown',
    title: "It's the Great Pumpkin, Charlie Brown",
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/its-the-great-pumpkin-charlie-brown/umc.cmc.1q5lkfbk8gy0eetmb5ki8z15o',
    image: 'https://m.media-amazon.com/images/M/MV5BYjJjZWFkZTYtNWI0NS00NmZjLTg5Y2ItNzFjMDQ1YWVkNWU4XkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg',
    addedDate: '2024-09-15',
    isComing: false,
  },
  {
    id: 'charlie-brown-thanksgiving',
    title: 'A Charlie Brown Thanksgiving',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/a-charlie-brown-thanksgiving/umc.cmc.1gy0eetmb5ki8z15o',
    image: 'https://m.media-amazon.com/images/M/MV5BOWIwZjAxZTYtNWI0NS00NmZjLTg5Y2ItNzFjMDQ1YWVkNWU4XkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg',
    addedDate: '2024-09-20',
    isComing: false,
  },
  {
    id: 'charlie-brown-christmas',
    title: 'A Charlie Brown Christmas',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/a-charlie-brown-christmas/umc.cmc.2mzm2a2nfj3rn0z9h9b6z0v3v',
    image: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtNWI0NS00NmZjLTg5Y2ItNzFjMDQ1YWVkNWU4XkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg',
    addedDate: '2024-10-01',
    isComing: false,
  },
  {
    id: 'happy-new-year-charlie-brown',
    title: 'Happy New Year, Charlie Brown',
    platform: 'Apple TV+',
    url: 'https://tv.apple.com/us/movie/happy-new-year-charlie-brown/umc.cmc.3mzm2a2nfj3rn0z9h9b6z0v3v',
    image: 'https://m.media-amazon.com/images/M/MV5BZjYxNGMyZTYtNWI0NS00NmZjLTg5Y2ItNzFjMDQ1YWVkNWU4XkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg',
    addedDate: '2024-12-01',
    isComing: false,
  },
  {
    id: 'my-neighbor-totoro',
    title: 'My Neighbor Totoro',
    platform: 'Max',
    url: 'https://www.max.com/movies/my-neighbor-totoro/5e1eb7b5-c256-402d-b63a-4ce7676a3c8e',
    image: 'https://m.media-amazon.com/images/M/MV5BYzJjMTkzYjEtZjA5ZC00ZDc2LWIxMzYtYWVmZDMzMDExZTAyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    addedDate: '2024-12-05',
    isComing: false,
  },
  {
    id: 'ponyo',
    title: 'Ponyo',
    platform: 'Max',
    url: 'https://www.max.com/movies/ponyo/b7788922-e4c4-42f8-918b-304a7a187f39',
    image: 'https://m.media-amazon.com/images/M/MV5BMTMzMDg5MDY5OV5BMl5BanBnXkFtZTcwNjc5MDUyMg@@._V1_.jpg',
    addedDate: '2024-12-10',
    isComing: false,
  },
  {
    id: 'kikis-delivery-service',
    title: "Kiki's Delivery Service",
    platform: 'Max',
    url: 'https://www.max.com/movies/kikis-delivery-service/b7788922-e4c4-42f8-918b-304a7a187f38',
    image: 'https://m.media-amazon.com/images/M/MV5BZDZiZGM1YjAtNGQ3OS00OWEwLThkZDctMDkwMDQyYmQzZmMxXkEyXkFqcGdeQXVyNTA4NTI0OTM@._V1_.jpg',
    addedDate: '2024-12-15',
    isComing: false,
  },
  { id: 'coming-soon-1', title: 'Coming Soon', platform: null, url: null, image: null, addedDate: '2024-12-31', isComing: true },
  { id: 'coming-soon-2', title: 'Coming Soon', platform: null, url: null, image: null, addedDate: '2024-12-31', isComing: true },
  { id: 'coming-soon-3', title: 'Coming Soon', platform: null, url: null, image: null, addedDate: '2024-12-31', isComing: true },
];

// ─── State ──────────────────────────────────────────────────────
let clickCounts = {};
let currentSort = 'popular';
let currentTheme = 'dreamy';

// ─── Render ─────────────────────────────────────────────────────
function renderGrid(sortBy) {
  const grid = document.getElementById('card-grid');
  const sorted = sortShows([...SHOWS], sortBy);

  if (currentTheme === 'blockbuster') {
    const { classics, newReleases } = splitIntoShelves(sorted);
    grid.innerHTML = `
      <div class="shelf">
        <div class="shelf-label">⭐ CLASSICS</div>
        <div class="shelf-grid">${classics.map(buildCardHTML).join('')}</div>
      </div>
      <div class="shelf">
        <div class="shelf-label">🆕 NEW RELEASES</div>
        <div class="shelf-grid">${newReleases.map(buildCardHTML).join('')}</div>
      </div>`;
  } else {
    grid.innerHTML = sorted.map(buildCardHTML).join('');
  }

  grid.querySelectorAll('.card-img[src]').forEach(img => {
    img.onerror = () => img.replaceWith(makePlaceholder());
  });

  grid.querySelectorAll('.card[data-url]').forEach(card => {
    card.addEventListener('click', () => handleCardClick(card.dataset.id, card.dataset.url));
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
      <img class="card-img" src="${show.image}" alt="${show.title}">
      ${countBadge}
      <div class="card-label">
        <div class="card-title">${show.title}</div>
        <div class="card-platform">${show.platform}</div>
      </div>
    </div>`;
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

// ─── Theme toggle ────────────────────────────────────────────────
const THEMES = {
  dreamy:      { next: 'blockbuster', label: '📼 Blockbuster', bodyClass: ''             },
  blockbuster: { next: 'dreamy',      label: '🌙 Dreamy',      bodyClass: 'blockbuster'  },
};

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  btn.textContent = THEMES[currentTheme].label;

  btn.addEventListener('click', () => {
    const { next } = THEMES[currentTheme];
    const { label, bodyClass } = THEMES[next];

    document.body.classList.remove('blockbuster');
    if (bodyClass) document.body.classList.add(bodyClass);

    currentTheme = next;
    btn.textContent = label;
    renderGrid(currentSort);
  });
}

// ─── Boot ────────────────────────────────────────────────────────
async function init() {
  initSortControls();
  initThemeToggle();

  try {
    clickCounts = await getClickCounts() ?? {};
  } catch {
    clickCounts = {};
  }

  renderGrid(currentSort);

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
