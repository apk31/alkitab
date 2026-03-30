let isAppReady = false;
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    showHome();
  }
});
// ── Book list ────────────────────────────────────────────────
const BOOKS = [
  {no:1, abbr:"Kej", en_abbr:"Gen", name:"Kejadian", en_name:"Genesis", chapter:50, t:"old"},
  {no:2, abbr:"Kel", en_abbr:"Exo", name:"Keluaran", en_name:"Exodus", chapter:40, t:"old"},
  {no:3, abbr:"Ima", en_abbr:"Lev", name:"Imamat", en_name:"Leviticus", chapter:27, t:"old"},
  {no:4, abbr:"Bil", en_abbr:"Num", name:"Bilangan", en_name:"Numbers", chapter:36, t:"old"},
  {no:5, abbr:"Ula", en_abbr:"Deu", name:"Ulangan", en_name:"Deuteronomy", chapter:34, t:"old"},
  {no:6, abbr:"Yos", en_abbr:"Jos", name:"Yosua", en_name:"Joshua", chapter:24, t:"old"},
  {no:7, abbr:"Hak", en_abbr:"Jdg", name:"Hakim-hakim", en_name:"Judges", chapter:21, t:"old"},
  {no:8, abbr:"Rut", en_abbr:"Rut", name:"Rut", en_name:"Ruth", chapter:4, t:"old"},
  {no:9, abbr:"1Sam", en_abbr:"1Sa", name:"1 Samuel", en_name:"1 Samuel", chapter:31, t:"old"},
  {no:10, abbr:"2Sam", en_abbr:"2Sa", name:"2 Samuel", en_name:"2 Samuel", chapter:24, t:"old"},
  {no:11, abbr:"1Raj", en_abbr:"1Ki", name:"1 Raja-Raja", en_name:"1 Kings", chapter:22, t:"old"},
  {no:12, abbr:"2Raj", en_abbr:"2Ki", name:"2 Raja-Raja", en_name:"2 Kings", chapter:25, t:"old"},
  {no:13, abbr:"1Taw", en_abbr:"1Ch", name:"1 Tawarikh", en_name:"1 Chronicles", chapter:29, t:"old"},
  {no:14, abbr:"2Taw", en_abbr:"2Ch", name:"2 Tawarikh", en_name:"2 Chronicles", chapter:36, t:"old"},
  {no:15, abbr:"Ezr", en_abbr:"Ezr", name:"Ezra", en_name:"Ezra", chapter:10, t:"old"},
  {no:16, abbr:"Neh", en_abbr:"Neh", name:"Nehemia", en_name:"Nehemiah", chapter:13, t:"old"},
  {no:17, abbr:"Est", en_abbr:"Est", name:"Ester", en_name:"Esther", chapter:10, t:"old"},
  {no:18, abbr:"Ayb", en_abbr:"Job", name:"Ayub", en_name:"Job", chapter:42, t:"old"},
  {no:19, abbr:"Maz", en_abbr:"Psa", name:"Mazmur", en_name:"Psalms", chapter:150, t:"old"},
  {no:20, abbr:"Ams", en_abbr:"Pro", name:"Amsal", en_name:"Proverbs", chapter:31, t:"old"},
  {no:21, abbr:"Pkh", en_abbr:"Ecc", name:"Pengkhotbah", en_name:"Ecclesiastes", chapter:12, t:"old"},
  {no:22, abbr:"Kid", en_abbr:"Sng", name:"Kidung Agung", en_name:"Song of Solomon", chapter:8, t:"old"},
  {no:23, abbr:"Yes", en_abbr:"Isa", name:"Yesaya", en_name:"Isaiah", chapter:66, t:"old"},
  {no:24, abbr:"Yer", en_abbr:"Jer", name:"Yeremia", en_name:"Jeremiah", chapter:52, t:"old"},
  {no:25, abbr:"Rat", en_abbr:"Lam", name:"Ratapan", en_name:"Lamentations", chapter:5, t:"old"},
  {no:26, abbr:"Yeh", en_abbr:"Ezk", name:"Yehezkiel", en_name:"Ezekiel", chapter:48, t:"old"},
  {no:27, abbr:"Dan", en_abbr:"Dan", name:"Daniel", en_name:"Daniel", chapter:12, t:"old"},
  {no:28, abbr:"Hos", en_abbr:"Hos", name:"Hosea", en_name:"Hosea", chapter:14, t:"old"},
  {no:29, abbr:"Yoe", en_abbr:"Jol", name:"Yoel", en_name:"Joel", chapter:3, t:"old"},
  {no:30, abbr:"Amo", en_abbr:"Amo", name:"Amos", en_name:"Amos", chapter:9, t:"old"},
  {no:31, abbr:"Oba", en_abbr:"Oba", name:"Obaja", en_name:"Obadiah", chapter:1, t:"old"},
  {no:32, abbr:"Yun", en_abbr:"Jon", name:"Yunus", en_name:"Jonah", chapter:4, t:"old"},
  {no:33, abbr:"Mik", en_abbr:"Mic", name:"Mikha", en_name:"Micah", chapter:7, t:"old"},
  {no:34, abbr:"Nah", en_abbr:"Nam", name:"Nahum", en_name:"Nahum", chapter:3, t:"old"},
  {no:35, abbr:"Hab", en_abbr:"Hab", name:"Habakuk", en_name:"Habakkuk", chapter:3, t:"old"},
  {no:36, abbr:"Zef", en_abbr:"Zep", name:"Zefanya", en_name:"Zephaniah", chapter:3, t:"old"},
  {no:37, abbr:"Hag", en_abbr:"Hag", name:"Hagai", en_name:"Haggai", chapter:2, t:"old"},
  {no:38, abbr:"Zak", en_abbr:"Zec", name:"Zakharia", en_name:"Zechariah", chapter:14, t:"old"},
  {no:39, abbr:"Mal", en_abbr:"Mal", name:"Maleakhi", en_name:"Malachi", chapter:4, t:"old"},
  {no:40, abbr:"Mat", en_abbr:"Mat", name:"Matius", en_name:"Matthew", chapter:28, t:"new"},
  {no:41, abbr:"Mar", en_abbr:"Mrk", name:"Markus", en_name:"Mark", chapter:16, t:"new"},
  {no:42, abbr:"Luk", en_abbr:"Luk", name:"Lukas", en_name:"Luke", chapter:24, t:"new"},
  {no:43, abbr:"Yoh", en_abbr:"Jhn", name:"Yohanes", en_name:"John", chapter:21, t:"new"},
  {no:44, abbr:"Kis", en_abbr:"Act", name:"Kisah Para Rasul", en_name:"Acts", chapter:28, t:"new"},
  {no:45, abbr:"Rom", en_abbr:"Rom", name:"Roma", en_name:"Romans", chapter:16, t:"new"},
  {no:46, abbr:"1Kor", en_abbr:"1Co", name:"1 Korintus", en_name:"1 Corinthians", chapter:16, t:"new"},
  {no:47, abbr:"2Kor", en_abbr:"2Co", name:"2 Korintus", en_name:"2 Corinthians", chapter:13, t:"new"},
  {no:48, abbr:"Gal", en_abbr:"Gal", name:"Galatia", en_name:"Galatians", chapter:6, t:"new"},
  {no:49, abbr:"Efe", en_abbr:"Eph", name:"Efesus", en_name:"Ephesians", chapter:6, t:"new"},
  {no:50, abbr:"Flp", en_abbr:"Php", name:"Filipi", en_name:"Philippians", chapter:4, t:"new"},
  {no:51, abbr:"Kol", en_abbr:"Col", name:"Kolose", en_name:"Colossians", chapter:4, t:"new"},
  {no:52, abbr:"1Tes", en_abbr:"1Th", name:"1 Tesalonika", en_name:"1 Thessalonians", chapter:5, t:"new"},
  {no:53, abbr:"2Tes", en_abbr:"2Th", name:"2 Tesalonika", en_name:"2 Thessalonians", chapter:3, t:"new"},
  {no:54, abbr:"1Tim", en_abbr:"1Ti", name:"1 Timotius", en_name:"1 Timothy", chapter:6, t:"new"},
  {no:55, abbr:"2Tim", en_abbr:"2Ti", name:"2 Timotius", en_name:"2 Timothy", chapter:4, t:"new"},
  {no:56, abbr:"Tit", en_abbr:"Tit", name:"Titus", en_name:"Titus", chapter:3, t:"new"},
  {no:57, abbr:"Flm", en_abbr:"Phm", name:"Filemon", en_name:"Philemon", chapter:1, t:"new"},
  {no:58, abbr:"Ibr", en_abbr:"Heb", name:"Ibrani", en_name:"Hebrews", chapter:13, t:"new"},
  {no:59, abbr:"Yak", en_abbr:"Jas", name:"Yakobus", en_name:"James", chapter:5, t:"new"},
  {no:60, abbr:"1Pet", en_abbr:"1Pe", name:"1 Petrus", en_name:"1 Peter", chapter:5, t:"new"},
  {no:61, abbr:"2Pet", en_abbr:"2Pe", name:"2 Petrus", en_name:"2 Peter", chapter:3, t:"new"},
  {no:62, abbr:"1Yoh", en_abbr:"1Jn", name:"1 Yohanes", en_name:"1 John", chapter:5, t:"new"},
  {no:63, abbr:"2Yoh", en_abbr:"2Jn", name:"2 Yohanes", en_name:"2 John", chapter:1, t:"new"},
  {no:64, abbr:"3Yoh", en_abbr:"3Jn", name:"3 Yohanes", en_name:"3 John", chapter:1, t:"new"},
  {no:65, abbr:"Yud", en_abbr:"Jud", name:"Yudas", en_name:"Jude", chapter:1, t:"new"},
  {no:66, abbr:"Wah", en_abbr:"Rev", name:"Wahyu", en_name:"Revelation", chapter:22, t:"new"}
];

// ── Version Names & Formatting ───────────────────────────────
const VERSION_NAMES = {
  'tb': 'Terjemahan Baru (TB)',
  'bis': 'Bahasa Indonesia Masa Kini (BIS)',
  'nkjv': 'New King James Version (NKJV)',
  'av': 'King James Version (AV)'
};

function formatVerseText(text, version) {
  if (!text) return '';
  let html = text;
  
  if (version === 'nkjv') {
    // Matches \i1 or \\i1 (plus trailing space) and converts to <i>
    html = html.replace(/(?:\\\\|\\)i1\s?/g, '<i>').replace(/(?:\\\\|\\)i0/g, '</i>');
  } else if (version === 'av') {
    // Converts [word] into <i>word</i>
    html = html.replace(/\[/g, '<i>').replace(/\]/g, '</i>');
  }
  
  return html;
}

// ── State ────────────────────────────────────────────────────
let testament = 'old';
let curBook = null;
let curChapter = 1;
let fontSize = 1.18;
const cache = {}; // abbr -> {ch: [...verses]}
let miniSearch = null;
let searchIndexBuilt = false;
let searchIndexBuilding = false;
let deferredInstallPrompt = null;
let currentVersion = localStorage.getItem('alkitab-version') || 'tb';
let versionCache = {}; // holds downloaded JSONs
let activeBibleData = null; // Holds the currently active Bible DB
let currentVerseIdx = 0;
let downloadedVersions = JSON.parse(localStorage.getItem('alkitab-downloaded')) || ['tb'];

// 1. Open/Close Logic
const versionPanel = document.getElementById('version-panel');

document.getElementById('version-trigger-btn').addEventListener('click', () => {
  closeSidebar();
  renderVersionPanel(); // <--- ADD THIS LINE HERE
  versionPanel.classList.add('open');
  
  // Optional: Auto-switch to the "Terpasang" (Installed) tab every time it opens
  document.querySelectorAll('.vp-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.vp-tab[data-target="installed"]').classList.add('active');
  document.querySelectorAll('.vp-content').forEach(c => c.style.display = 'none');
  document.getElementById('vp-installed').style.display = 'block';
});

document.getElementById('vp-close-btn').addEventListener('click', () => {
  versionPanel.classList.remove('open');
});

// 2. Tab Switching Logic
document.querySelectorAll('.vp-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('.vp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.vp-content').forEach(c => c.style.display = 'none');
    
    e.target.classList.add('active');
    document.getElementById(`vp-${e.target.dataset.target}`).style.display = 'block';
  });
});

// 3. The Download & Switch Function
async function switchVersion(newVersionCode) {
  
  currentVersion = newVersionCode;
  localStorage.setItem('alkitab-version', newVersionCode);
  
  showLoading();
  versionPanel.classList.remove('open');
  
  try {
    // Fetch if not in memory
    if (!versionCache[newVersionCode]) {
      const res = await fetch(`data/alkitab-${newVersionCode}.json`);
      if (!res.ok) throw new Error('Failed to download version');
      versionCache[newVersionCode] = await res.json();
    }
    // Save to permanent storage so it survives page refreshes
    if (!downloadedVersions.includes(newVersionCode)) {
      downloadedVersions.push(newVersionCode);
      localStorage.setItem('alkitab-downloaded', JSON.stringify(downloadedVersions));
    }
    // Update top UI label
    const versionName = VERSION_NAMES[newVersionCode] || newVersionCode.toUpperCase();
    
    const btn = document.getElementById('version-trigger-btn');
    btn.innerHTML = `${versionName} <svg class="ic" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`;
      
    // Re-render sidebar books to swap languages if necessary
    renderBooks();
    
    // If user is currently reading a book, reload that chapter in the new version
    if (curBook) {
      // We call selectBook instead of loadChapter to ensure the topbar also updates
      selectBook(curBook, curChapter);
    } else {
      showHome();
    }
    
    // Reset search index so it searches the new language
    searchIndexBuilt = false;
    document.getElementById('ft-status').textContent = 'Pencarian siap di-refresh untuk versi baru.';
    updateUILocale()
  } catch (error) {
    console.error("Switch failed:", error);
    showToast("Gagal memuat versi.");
    showError();
  }
}

// ── Delete Version ───────────────────────────────────────────
async function deleteVersion(code) {
  // 1. Remove from localStorage tracker
  downloadedVersions = downloadedVersions.filter(v => v !== code);
  localStorage.setItem('alkitab-downloaded', JSON.stringify(downloadedVersions));

  // 2. Remove from RAM cache
  delete versionCache[code];

  // 3. Delete the physical file from the Service Worker cache to free up space
  try {
    const cacheKeys = await caches.keys();
    for (const key of cacheKeys) {
       const cache = await caches.open(key);
       const requests = await cache.keys();
       for (const req of requests) {
          if (req.url.includes(`alkitab-${code}.json`)) {
              await cache.delete(req);
          }
       }
    }
  } catch (e) {
    console.warn("Could not clear SW cache for", code, e);
  }
  
  showToast(`Versi ${VERSION_NAMES[code] || code.toUpperCase()} berhasil dihapus.`);
}

// List of all versions you have made available on your server
const SUPPORTED_VERSIONS = ['tb', 'nkjv', 'av', 'bis'];

function renderVersionPanel() {
  const installedContainer = document.getElementById('vp-installed');
  const availableContainer = document.getElementById('vp-available');

  installedContainer.innerHTML = '';
  availableContainer.innerHTML = '';

  let availableCount = 0;

  SUPPORTED_VERSIONS.forEach(code => {
    const name = VERSION_NAMES[code] || code.toUpperCase();
    const isCurrent = code === currentVersion;
    
    // FIX: Check permanent storage instead of RAM
    const isDownloaded = downloadedVersions.includes(code);

    const item = document.createElement('div');
    item.className = `version-item ${isCurrent ? 'active-version' : ''}`;

    let statusText = 'Membutuhkan unduhan (±5MB)';
    if (isCurrent) statusText = 'Sedang digunakan';
    else if (isDownloaded) statusText = 'Tersedia offline';

    let btnText = 'Unduh';
    if (isCurrent) btnText = 'Aktif';
    else if (isDownloaded) btnText = 'Pilih';

    // FEATURE: Only show delete button if downloaded, not active, and NOT 'tb'
    const showDelete = isDownloaded && !isCurrent && code !== 'tb';

    // We wrap the buttons in a flex container so they sit side-by-side
    item.innerHTML = `
      <div class="v-info">
        <span class="v-title">${name}</span>
        <span class="v-size">${statusText}</span>
      </div>
      <div class="v-actions" style="display:flex; gap:8px;">
        ${showDelete ? `
          <button class="v-action-btn delete-btn" data-code="${code}" style="padding: 8px 12px;" title="Hapus versi ini">
            <svg class="ic" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </button>
        ` : ''}
        <button class="v-action-btn main-btn" data-code="${code}" ${isCurrent ? 'disabled style="opacity:0.5; cursor:default;"' : ''}>
          ${btnText}
        </button>
      </div>
    `;

    // Click handler for Main Action Button (Unduh/Pilih)
    const mainBtn = item.querySelector('.main-btn');
    if (!isCurrent) {
      mainBtn.addEventListener('click', async () => {
        mainBtn.textContent = 'Memuat...';
        await switchVersion(code);
        renderVersionPanel();
      });
    }

    // Click handler for Delete Button
    if (showDelete) {
      const delBtn = item.querySelector('.delete-btn');
      delBtn.addEventListener('click', async () => {
        if (confirm(`Hapus ${name} dari perangkat?`)) {
           await deleteVersion(code);
           renderVersionPanel();
        }
      });
    }

    // Sort into tabs
    if (isDownloaded) {
      installedContainer.appendChild(item);
    } else {
      availableContainer.appendChild(item);
      availableCount++;
    }
  });

  if (availableCount === 0) {
    availableContainer.innerHTML = `
      <div style="text-align:center; padding: 30px 20px; color: var(--ink-light); font-style: italic;">
        Semua versi telah diunduh dan tersedia offline.
      </div>
    `;
  }
}

// ── IndexedDB (bookmarks) ─────────────────────────────────────
const DB_NAME = 'alkitab-tb';
const DB_VER  = 1;
let db = null;

function openDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('bookmarks')) {
        const s = d.createObjectStore('bookmarks', { keyPath: 'id' });
        s.createIndex('by_date', 'date', { unique: false });
      }
    };
    req.onsuccess = e => { db = e.target.result; res(db); };
    req.onerror = () => rej(req.error);
  });
}

async function dbGetAll(store) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function dbPut(store, item) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(item);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

async function dbDelete(store, key) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => res();
    req.onerror = () => rej(req.error);
  });
}

async function dbGet(store, key) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

// ── Toast ─────────────────────────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// ── DOM ──────────────────────────────────────────────────────
const bookListEl     = document.getElementById('book-list');
const searchInput    = document.getElementById('search-input');
const chapterSelect  = document.getElementById('chapter-select');
const chapterLabel   = document.getElementById('chapter-label');
const prevBtn        = document.getElementById('prev-btn');
const nextBtn        = document.getElementById('next-btn');
const welcomeScreen  = document.getElementById('welcome-screen');
const loadingEl      = document.getElementById('loading');
const errorEl        = document.getElementById('error-msg');
const chapterContent = document.getElementById('chapter-content');
const bookTitleEl    = document.getElementById('book-title');
const chapterSubEl   = document.getElementById('chapter-subtitle');
const versesEl       = document.getElementById('verses-container');
const sidebar        = document.getElementById('sidebar');
const overlay        = document.getElementById('overlay');


// ── Render "Lanjutkan Bacaan" card jika ada histori ─────────────────
function renderContinueReading() {
  const historyStr = localStorage.getItem('alkitab-history');
  if (!historyStr) return;

  try {
    const { abbr, ch } = JSON.parse(historyStr);
    const book = BOOKS.find(b => b.abbr === abbr);
    if (!book) return;

    const banner = document.getElementById('continue-banner');
    const text = document.getElementById('cb-text');
    const openBtn = document.getElementById('cb-open');

    // FIX: Bilingual check for the popup
    const isEnglish = ['nkjv', 'av'].includes(currentVersion);
    const displayName = isEnglish ? book.en_name : book.name;
    const prefixText = isEnglish ? "Continue Reading:" : "Lanjutkan Bacaan:";

    // Update text and button language
    text.textContent = `${prefixText}   ${displayName} ${ch}`;
    openBtn.textContent = isEnglish ? "Open" : "Buka";

    banner.classList.add('show');

    openBtn.onclick = () => {
      selectBook(book, ch);
      banner.classList.remove('show');
    };

    document.getElementById('cb-dismiss').onclick = () => {
      banner.classList.remove('show');
    };
  } catch (e) {
    console.error('Failed to parse history:', e);
    localStorage.removeItem('alkitab-history'); // Reset corrupted data
  }
}

// ── Render book list ─────────────────────────────────────────
function renderBooks() {
  const q = searchInput.value.toLowerCase();
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);

  const filtered = BOOKS.filter(b => {
    // Search both Indonesian and English names
    const searchName = isEnglish ? b.en_name.toLowerCase() : b.name.toLowerCase();
    return b.t === testament && searchName.includes(q);
  });
  
  bookListEl.innerHTML = '';
  filtered.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-item' + (curBook && curBook.abbr === book.abbr ? ' active' : '');
    
    // Choose which name/abbr to display based on selected version
    const displayAbbr = isEnglish ? book.en_abbr : book.abbr;
    const displayName = isEnglish ? book.en_name : book.name;
    
    div.innerHTML = `<span class="book-abbr">${displayAbbr}</span>${displayName}`;
    div.addEventListener('click', () => {
      selectBook(book);
      if (window.innerWidth <= 768) closeSidebar();
    });
    bookListEl.appendChild(div);
  });
}

// ── Select book ──────────────────────────────────────────────
function selectBook(book, ch = 1) {
  if (!isAppReady) return;
  curBook = book;
  curChapter = ch;
  renderBooks();
  
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);
  
  // Rebuild the dropdown options (Pasal vs Chapter)
  chapterSelect.innerHTML = '';
  for (let i = 1; i <= book.chapter; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = isEnglish ? `Chapter ${i}` : `Pasal ${i}`;
    if (i === ch) opt.selected = true;
    chapterSelect.appendChild(opt);
  }
  chapterSelect.style.display = 'inline-block';
  
  // FIX: Dynamically set the topbar label to English or Indonesian
  chapterLabel.textContent = isEnglish ? book.en_name : book.name;
  
  document.getElementById('topbar-row2').classList.add('visible');
  loadChapter();
}

// ── Load chapter ─────────────────────────────────────────────
let isLoadingChapter = false;

async function loadChapter() {
  if (!curBook) return;
  if (isLoadingChapter) return;
  isLoadingChapter = true;
  
  showLoading();
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  chapterSelect.disabled = true;
  
  try {
    // 1. Ensure the master JSON for the current version is loaded
    if (!versionCache[currentVersion]) {
      const res = await fetch(`data/alkitab-${currentVersion}.json`);
      if (!res.ok) throw new Error(`File alkitab-${currentVersion}.json not found`);
      versionCache[currentVersion] = await res.json();
    }
    activeBibleData = versionCache[currentVersion];

    // 2. Determine which key to look up (Indonesian vs English API key)
    const isEnglish = ['nkjv', 'av'].includes(currentVersion);
    const lookupKey = isEnglish ? curBook.en_abbr : curBook.abbr;

    // 3. Extract verses
    const bookData = activeBibleData[lookupKey];
    const verses = bookData ? bookData[curChapter] || [] : [];
    
    await renderVerses(verses);
    saveReadingHistory(curBook.abbr, curChapter);
    
  } catch (e) {
    console.error(e);
    showError();
  } finally {
    // Find where we are in the entire Bible
    const bookIndex = BOOKS.findIndex(b => b.abbr === curBook.abbr);
    const isFirstBook = bookIndex === 0; // Genesis
    const isLastBook = bookIndex === BOOKS.length - 1; // Revelation

    // Only disable at the absolute beginning and absolute end of the Bible
    prevBtn.disabled = (isFirstBook && curChapter === 1);
    nextBtn.disabled = (isLastBook && curChapter === curBook.chapter);
    
    chapterSelect.disabled = false;
    isLoadingChapter = false;
  }
}

// ── Save reading history ─────────────────────────────────────
function saveReadingHistory(abbr, ch) {
  let history = JSON.parse(localStorage.getItem('alkitab-history-list') || '[]');

  history = history.filter(h => !(h.abbr === abbr && h.ch === ch));

  history.unshift({
    abbr,
    ch,
    date: Date.now()
  });

  history = history.slice(0, 50); // Keep only the latest 50 entries

  localStorage.setItem('alkitab-history-list', JSON.stringify(history));
  localStorage.setItem('alkitab-history', JSON.stringify({ abbr, ch }));
}
function renderHistoryList() {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('alkitab-history-list') || '[]');
  } catch (e) {
    console.error('Failed to parse history list:', e);
    localStorage.removeItem('alkitab-history-list');
  }

  historyList.innerHTML = '';
  
  // FIX: Check language
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);

  if (!history.length) {
    historyList.innerHTML = `
      <div class="bm-empty">
        ${isEnglish ? 'No reading history yet.' : 'Belum ada riwayat bacaan.'}
      </div>
    `;
    return;
  }

  history.forEach(item => {
    const book = BOOKS.find(b => b.abbr === item.abbr);
    if (!book) return;

    // FIX: Translate book name in history
    const displayName = isEnglish ? book.en_name : book.name;

    const div = document.createElement('div');
    div.className = 'history-item';

    div.innerHTML = `
      <div class="history-ref">${displayName} ${item.ch}</div>
      <div class="history-time">${formatHistoryTime(item.date)}</div>
    `;

    div.addEventListener('click', () => {
      closeHistoryPanel();
      selectBook(book, item.ch);
    });

    historyList.appendChild(div);
  });
}
function formatHistoryTime(timestamp) {
  const diff = Date.now() - timestamp;

  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;

  return new Date(timestamp).toLocaleDateString('id-ID');
}

// ── Render verses ────────────────────────────────────────────
async function renderVerses(verses) {
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);
  bookTitleEl.textContent = isEnglish ? curBook.en_name : curBook.name;
  chapterSubEl.textContent = isEnglish ? `Chapter ${curChapter}` : `Pasal ${curChapter}`;
  versesEl.innerHTML = '';
  versesEl.style.fontSize = fontSize + 'rem';
  if (!verses.length) {
    versesEl.textContent = '(Data pasal ini tidak tersedia)';
    showContent();
    return;
  }
  // Load saved bookmarks for this chapter
  let savedIds = new Set();
  if (db) {
    const all = await dbGetAll('bookmarks');
    all.forEach(b => {
      if (b.book === curBook.abbr && b.chapter === curChapter) savedIds.add(b.verse);
    });
  }
  let firstVerse = true;
  verses.forEach((v) => {
    if (v.v == 0) {
      const heading = document.createElement('h3'); // Changed to h3 for better semantics/block layout
      heading.className = 'section-heading';
      heading.textContent = v.t;
      versesEl.appendChild(heading);
      return;
    }
    
    // 1. Changed from 'span' to 'div' for proper block formatting
    const wrap = document.createElement('div'); 
    wrap.className = 'verse-wrap';
    wrap.dataset.verse = v.v;

    // 2. Added the click listener to the ENTIRE wrap
    wrap.addEventListener('click', () => {
      const isAlreadyActive = wrap.classList.contains('verse-active');
      document.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
      if (!isAlreadyActive) {
        wrap.classList.add('verse-active');
      }
    });

    const numEl = document.createElement('div');
    numEl.className = 'verse-number' + (firstVerse ? ' v1' : '');
    numEl.textContent = v.v;
    // (Removed the click listener from here)

    const textEl = document.createElement('span');
    textEl.className = 'verse-text';
    textEl.innerHTML = formatVerseText(v.t, currentVersion) + ' ';

    const bmBtn = document.createElement('button');
    bmBtn.className = 'verse-bm-btn' + (savedIds.has(v.v) ? ' saved' : '');
    if (savedIds.has(v.v)) wrap.classList.add('highlighted-verse');
    bmBtn.innerHTML = '<svg class="ic" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>';
    bmBtn.title = 'Simpan bookmark';
    
    // Prevent the bookmark click from triggering the verse toggle
    bmBtn.addEventListener('click', async (e) => {
      e.stopPropagation(); 
      await toggleBookmark(v, wrap, bmBtn);
    });

    const leftCol = document.createElement('div');
    leftCol.className = 'verse-meta';

    leftCol.appendChild(numEl);
    leftCol.appendChild(bmBtn);

    wrap.appendChild(leftCol);
    wrap.appendChild(textEl);
    versesEl.appendChild(wrap);
    
    firstVerse = false;
  });
  showContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Bookmark toggle ───────────────────────────────────────────
async function toggleBookmark(verse, wrap, btn) {
  if (!db) return;
  const id = `${curBook.abbr}-${curChapter}-${verse.v}`;
  const existing = await dbGet('bookmarks', id);
  if (existing) {
    await dbDelete('bookmarks', id);
    btn.classList.remove('saved');
    wrap.classList.remove('highlighted-verse');
    // Tetap aktif setelah hapus bookmark supaya user bisa simpan lagi
    showToast('Bookmark dihapus');
  } else {
    await dbPut('bookmarks', {
      id, book: curBook.abbr, bookName: curBook.name,
      chapter: curChapter, verse: verse.v,
      text: verse.t, date: Date.now()
    });
    btn.classList.add('saved');
    wrap.classList.add('highlighted-verse'); // penanda permanen
    wrap.classList.remove('verse-active');   // tidak perlu active lagi
    showToast('✓ Disimpan ke bookmark');
  }
}

// ── UI helpers ───────────────────────────────────────────────
function showLoading() {
  welcomeScreen.style.display = 'none';
  chapterContent.style.display = 'none';
  errorEl.style.display = 'none';
  loadingEl.style.display = 'block';
}
function showHome() {
  chapterContent.style.display = 'none';
  errorEl.style.display = 'none';
  loadingEl.style.display = 'none';

  welcomeScreen.style.display = 'block';
  renderContinueReading();
  startWelcomeAnimations();
}
function showContent() {
  loadingEl.style.display = 'none';
  errorEl.style.display = 'none';
  welcomeScreen.style.display = 'none';
  chapterContent.style.display = 'block';
  chapterContent.classList.remove('fade-in');
  void chapterContent.offsetWidth;
  chapterContent.classList.add('fade-in');
}
function showError() {
  loadingEl.style.display = 'none';
  chapterContent.style.display = 'none';
  errorEl.style.display = 'block';
}

// ── Nav ──────────────────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  if (!curBook) return;
  
  if (curChapter > 1) { 
    // Normal previous chapter
    curChapter--; 
    chapterSelect.value = curChapter;
    loadChapter(); 
  } else {
    // We are at chapter 1, jump to the previous book!
    const bookIndex = BOOKS.findIndex(b => b.abbr === curBook.abbr);
    if (bookIndex > 0) {
      const prevBook = BOOKS[bookIndex - 1];
      // Select the previous book, and load its LAST chapter
      selectBook(prevBook, prevBook.chapter); 
    }
  }
});

nextBtn.addEventListener('click', () => {
  if (!curBook) return;

  if (curChapter < curBook.chapter) { 
    // Normal next chapter
    curChapter++; 
    chapterSelect.value = curChapter;
    loadChapter(); 
  } else {
    // We are at the last chapter, jump to the next book!
    const bookIndex = BOOKS.findIndex(b => b.abbr === curBook.abbr);
    if (bookIndex < BOOKS.length - 1) {
      const nextBook = BOOKS[bookIndex + 1];
      // Select the next book, and load chapter 1
      selectBook(nextBook, 1); 
    }
  }
});

chapterSelect.addEventListener('change', () => {
  if (!curBook) return; 
  curChapter = parseInt(chapterSelect.value);
  loadChapter();
});

// ── Testament tabs ───────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    testament = btn.dataset.t;
    searchInput.value = '';
    renderBooks();
  });
});
searchInput.addEventListener('input', renderBooks);

// ── Sidebar Toggle (Desktop) ──────────────────────────────────
document.getElementById('desktop-sidebar-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('closed');
  document.getElementById('main').classList.toggle('expanded');
});

// ── Font size ─────────────────────────────────────────────────
document.getElementById('font-inc').addEventListener('click', () => {
  fontSize = Math.min(fontSize + .1, 1.9);
  versesEl.style.fontSize = fontSize + 'rem';
});
document.getElementById('font-dec').addEventListener('click', () => {
  fontSize = Math.max(fontSize - .1, .85);
  versesEl.style.fontSize = fontSize + 'rem';
});

// ── Full-text Search ──────────────────────────────────────────
const searchPanel  = document.getElementById('search-panel');
const ftInput      = document.getElementById('ft-input');
const ftStatus     = document.getElementById('ft-status');
const ftResults    = document.getElementById('ft-results');

async function buildSearchIndex() {
  if (searchIndexBuilt || searchIndexBuilding) return;
  searchIndexBuilding = true;
  ftStatus.textContent = 'Membangun indeks pencarian…';
  
miniSearch = new MiniSearch({
    fields: ['t'],
    storeFields: ['book', 'bookName', 'chapter', 'verse', 't'],
    searchOptions: { 
      // Only use prefix matching for words longer than 3 letters
      prefix: (term) => term.length > 3, 
      // Only use fuzzy matching for words longer than 4 letters, and keep it very strict
      fuzzy: (term) => term.length > 4 ? 0.1 : false, 
      boost: { t: 1 },
      // Require ALL words in the search query to be present in the verse
      combineWith: 'AND' 
    }
  });
  
  const docs = [];
  let id = 0;
  
  // Ensure we have data for the current version
  if (!versionCache[currentVersion]) {
      const res = await fetch(`data/alkitab-${currentVersion}.json`);
      versionCache[currentVersion] = await res.json();
  }
  const dbData = versionCache[currentVersion];
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);

  for (const book of BOOKS) {
    const lookupKey = isEnglish ? book.en_abbr : book.abbr;
    const bName = isEnglish ? book.en_name : book.name;
    const bookData = dbData[lookupKey];
    
    if (!bookData) continue;

    for (const [ch, verses] of Object.entries(bookData)) {
      for (const v of verses) {
        if (v.v == 0) continue;
        docs.push({ id: id++, book: book.abbr, bookName: bName, chapter: parseInt(ch), verse: v.v, t: v.t });
      }
    }
  }
  
  miniSearch.addAll(docs);
  searchIndexBuilt = true;
  searchIndexBuilding = false;
  ftStatus.textContent = `Indeks siap — ${docs.length.toLocaleString('id')} ayat terindeks`;
}

function highlightMatch(text, terms) {
  let result = text;
  // Sort terms by length descending so we highlight longer words first
  const sortedTerms = [...terms].sort((a, b) => b.length - a.length);
  
  sortedTerms.forEach(term => {
    // Only highlight if the term is 3 or more characters to avoid highlighting random 'di' or 'ke'
    if (term.length >= 3) {
      // Use word boundaries (\b) to only highlight whole words
      const re = new RegExp(`\\b(${term})\\b`, 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    }
  });
  return result;
}

function runSearch() {
  const q = ftInput.value.trim();
  if (!q) { ftResults.innerHTML = ''; return; }
  if (!searchIndexBuilt) { ftStatus.textContent = 'Indeks belum siap, tunggu sebentar…'; return; }
  
  // 1. Check if the user is searching for an exact phrase (wrapped in quotes)
  const isExactPhrase = q.startsWith('"') && q.endsWith('"');
  // Clean the quotes off the query for the search engine
  const cleanQuery = isExactPhrase ? q.slice(1, -1) : q;
  const terms = cleanQuery.toLowerCase().split(/\s+/);
  
  // 2. Run the base search
  let results = miniSearch.search(cleanQuery, { limit: 100 }); // Pull a larger pool to filter
  
  // 3. If exact phrase, strictly filter the results
  if (isExactPhrase) {
      results = results.filter(r => r.t.toLowerCase().includes(cleanQuery.toLowerCase()));
  }
  
  // 4. Cap the final output to 50 for performance
  results = results.slice(0, 50);

  if (!results.length) {
    ftResults.innerHTML = `<div class="ft-empty">Tidak ada hasil untuk "<strong>${q}</strong>"</div>`;
    ftStatus.textContent = '0 hasil ditemukan';
    return;
  }
  
  const capNotice = results.length === 50 ? ' (Maksimal 50 ditampilkan)' : '';
  ftStatus.textContent = `${results.length} hasil ditemukan${capNotice}`;
  
  ftResults.innerHTML = '';
  results.forEach(r => {
    const item = document.createElement('div');
    item.className = 'ft-result-item';
    
    const formattedText = formatVerseText(r.t, currentVersion);
    // Pass the clean terms to the highlighter
    const finalHTML = highlightMatch(formattedText, terms); 
    
    item.innerHTML = `
      <div class="ft-ref">${r.bookName} ${r.chapter}:${r.verse}</div>
      <div class="ft-text">${finalHTML}</div>`;
      
    item.addEventListener('click', () => {
      const book = BOOKS.find(b => b.abbr === r.book);
      closeSearchPanel();
      selectBook(book, r.chapter);
      setTimeout(() => {
        const target = versesEl.querySelector(`[data-verse="${r.verse}"]`);
        if (target) {
          document.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
          target.classList.add('verse-active');
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
    });
    ftResults.appendChild(item);
  });
}

// FIX: Restore the "Index Ready" count when the user clears the search box
ftInput.addEventListener('input', () => {
  if (ftInput.value.length >= 2) {
      runSearch();
  } else { 
      ftResults.innerHTML = ''; 
      if (searchIndexBuilt) {
          const totalDocs = Object.keys(miniSearch._docs || {}).length;
          ftStatus.textContent = `Indeks siap — ${totalDocs.toLocaleString('id')} ayat terindeks`;
      } else {
          ftStatus.textContent = 'Ketuk tombol Cari di bawah untuk memulai';
      }
  }
});

function openSearchPanel() {
    closeHistoryPanel();
  closeBookmarkPanel();
  closeSidebar();
  searchPanel.classList.add('open');
  document.body.classList.add('no-overscroll');
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('bnav-search').classList.add('active');
  buildSearchIndex();
  setTimeout(() => ftInput.focus(), 200);
}
function closeSearchPanel() {
  searchPanel.classList.remove('open');
  document.getElementById('bnav-search').classList.remove('active');
  document.body.classList.remove('no-overscroll');
}

document.getElementById('ft-close-btn').addEventListener('click', closeSearchPanel);
ftInput.addEventListener('input', () => {
  if (ftInput.value.length >= 2) runSearch();
  else { ftResults.innerHTML = ''; }
});
ftInput.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });

// Desktop search shortcut (Ctrl+F / Cmd+F override)
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    openSearchPanel();
  }
});

// ── Bookmark Panel ────────────────────────────────────────────
const bookmarkPanel = document.getElementById('bookmark-panel');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
const historyBtn = document.getElementById('history-btn');
const historyCloseBtn = document.getElementById('history-close-btn');

async function openBookmarkPanel() {
    closeHistoryPanel();
  closeSearchPanel();
  closeSidebar();
  bookmarkPanel.classList.add('open');
  document.body.classList.add('no-overscroll');
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('bnav-bookmark').classList.add('active');
  await renderBookmarkList();
}
function closeBookmarkPanel() {
  bookmarkPanel.classList.remove('open');
  document.body.classList.remove('no-overscroll');
  if (document.getElementById('bnav-bookmark'))
    document.getElementById('bnav-bookmark').classList.remove('active');
}
function openHistoryPanel() {
  console.log('history clicked');
  closeSearchPanel();
  closeBookmarkPanel();
  closeSidebar();

  historyPanel.classList.add('open');
  document.body.classList.add('no-overscroll');

  renderHistoryList();
}

function closeHistoryPanel() {
  historyPanel.classList.remove('open');
  document.body.classList.remove('no-overscroll');
}
historyBtn.addEventListener('click', openHistoryPanel);
console.log('history button bind success');
historyCloseBtn.addEventListener('click', closeHistoryPanel);
async function renderBookmarkList() {
  const listEl = document.getElementById('bookmark-list');
  if (!db) { listEl.innerHTML = '<div class="bm-empty">Database tidak tersedia.</div>'; return; }
  const all = await dbGetAll('bookmarks');
  all.sort((a, b) => b.date - a.date);
  if (!all.length) {
    listEl.innerHTML = '<div class="bm-empty" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;gap:16px;"><svg style="width:3rem;height:3rem;color:var(--gold-pale);opacity:.7" viewBox="0 0 384 512"><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg><p style="text-align:center;color:var(--ink-light);font-style:italic;line-height:1.6;">Belum ada bookmark.<br>Ketuk nomor ayat lalu ikon bookmark untuk menyimpan.</p></div>';
    return;
  }
  listEl.innerHTML = '';
  all.forEach(bm => {
    const item = document.createElement('div');
    item.className = 'bm-item';
    item.innerHTML = `
      <span class="bm-icon"><svg class="ic" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg></span>
      <div class="bm-info">
        <div class="bm-ref">${bm.bookName} ${bm.chapter}:${bm.verse}</div>
        <div class="bm-preview">${bm.text}</div>
      </div>
      <button class="bm-delete" data-id="${bm.id}" title="Hapus bookmark"><svg class="ic" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>`;
    item.querySelector('.bm-info').addEventListener('click', () => {
      const book = BOOKS.find(b => b.abbr === bm.book);
      closeBookmarkPanel();
      selectBook(book, bm.chapter);
      setTimeout(() => {
        const target = versesEl.querySelector(`[data-verse="${bm.verse}"]`);
        if (target) {
          target.classList.add('highlighted-verse');
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
    });
    item.querySelector('.bm-delete').addEventListener('click', async (e) => {
      e.stopPropagation();
      await dbDelete('bookmarks', bm.id);
      showToast('Bookmark dihapus');
      await renderBookmarkList();
      // Update icon if currently viewing same chapter
      if (curBook && curBook.abbr === bm.book && curChapter === bm.chapter) {
        const bmBtn = versesEl.querySelector(`[data-verse="${bm.verse}"] .verse-bm-btn`);
        if (bmBtn) bmBtn.classList.remove('saved');
      }
    });
    listEl.appendChild(item);
  });
}

document.getElementById('bm-close-btn').addEventListener('click', closeBookmarkPanel);

// ── Desktop Search button in topbar ──────────────────────────
// Add search button to desktop topbar
(function addDesktopSearch() {
  const fontCtrl = document.getElementById('font-controls');
  const btn = document.createElement('button');
  btn.className = 'font-btn desktop-search-btn';
  btn.title = 'Cari Ayat (Ctrl+F)';
  btn.innerHTML = '<svg class="ic" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>';
  btn.addEventListener('click', openSearchPanel);
  const bmBtn = document.createElement('button');
  bmBtn.className = 'font-btn desktop-bm-btn';
  bmBtn.title = 'Bookmark';
  bmBtn.innerHTML = '<svg class="ic" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>';
  bmBtn.addEventListener('click', openBookmarkPanel);
  fontCtrl.prepend(bmBtn);
  fontCtrl.prepend(btn);
})();

// ── Mobile bottom nav ─────────────────────────────────────────
const bnavBooks    = document.getElementById('bnav-books');
const bnavPrev     = document.getElementById('bnav-prev');
const bnavNext     = document.getElementById('bnav-next');
const bnavSearch   = document.getElementById('bnav-search');
const bnavBookmark = document.getElementById('bnav-bookmark');

function toggleMobileSidebar() {
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('visible', isOpen);
  if (bnavBooks) bnavBooks.classList.toggle('active', isOpen);
  
  if (isOpen) { 
    closeSearchPanel(); 
    closeBookmarkPanel(); 
    document.body.classList.add('no-overscroll'); 
  } else { 
    document.body.classList.remove('no-overscroll'); 
  }
}


if (bnavBooks) {
  bnavBooks.addEventListener('click',toggleMobileSidebar);

  // ── Drag sidebar ke bawah untuk tutup ──────────────────────
  // Hanya aktif jika drag dimulai dari sidebar-header (drag handle area),
  // BUKAN dari #book-list supaya scroll list tidak terganggu.
  let dragStartY = 0, dragStarted = false;
  const sidebarHeader = document.getElementById('sidebar-header');
  const bookListScroll = document.getElementById('book-list');

  sidebarHeader.addEventListener('touchstart', e => {
    dragStartY = e.touches[0].clientY;
    dragStarted = true;
  }, { passive: true });

  // touchmove dan touchend tetap di sidebar level agar smooth,
  // tapi hanya bereaksi jika dragStarted (dari header)
  sidebar.addEventListener('touchmove', e => {
    if (!dragStarted) return;
    const dy = e.touches[0].clientY - dragStartY;
    if (dy > 0) {
      sidebar.style.transition = 'none';
      sidebar.style.transform = `translateY(${dy}px)`;
    }
  }, { passive: true });

  sidebar.addEventListener('touchend', e => {
    if (!dragStarted) return;
    dragStarted = false;
    sidebar.style.transition = '';
    const dy = e.changedTouches[0].clientY - dragStartY;
    sidebar.style.transform = '';
    if (dy > 80) closeSidebar();
  }, { passive: true });

  // Pastikan scroll di book-list tidak mentrigger drag
  bookListScroll.addEventListener('touchstart', e => {
    dragStarted = false; // batalkan drag jika sentuhan mulai dari list
  }, { passive: true });
let lastNavClick = 0;
const NAV_THROTTLE_MS = 200;

bnavPrev.addEventListener('click', () => {
  if (Date.now() - lastNavClick > NAV_THROTTLE_MS) {
    lastNavClick = Date.now();
    prevBtn.click();
  }
});

bnavNext.addEventListener('click', () => {
  if (Date.now() - lastNavClick > NAV_THROTTLE_MS) {
    lastNavClick = Date.now();
    nextBtn.click();
  }
});
  bnavSearch.addEventListener('click', openSearchPanel);
  bnavBookmark.addEventListener('click', openBookmarkPanel);
}

overlay.addEventListener('click', closeSidebar);
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  if (bnavBooks) bnavBooks.classList.remove('active');
  document.body.classList.remove('no-overscroll');
}

// ── Keyboard ─────────────────────────────────────────────────
let navTimer = null;

document.addEventListener('keydown', e => {
  if (e.target === searchInput || e.target === ftInput) return;
  if (e.key === 'Escape') { closeSearchPanel(); closeBookmarkPanel(); closeSidebar(); }
  
  // Debounce & prevent multiple simultaneous navigations
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    if (isLoadingChapter) return; // Block if already loading
    clearTimeout(navTimer);
    navTimer = setTimeout(() => {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
    }, 50);
  }
});


// ── PWA Install ───────────────────────────────────────────────
const installBanner = document.getElementById('install-banner');
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  installBanner.classList.add('visible');
});
document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === 'accepted') showToast('✓ Alkitab TB berhasil diinstall!');
  deferredInstallPrompt = null;
  installBanner.classList.remove('visible');
});
document.getElementById('install-dismiss').addEventListener('click', () => {
  installBanner.classList.remove('visible');
});
window.addEventListener('appinstalled', () => {
  installBanner.classList.remove('visible');
  showToast('✓ Alkitab TB sudah diinstall');
});

// ── Service Worker + Auto Update ─────────────────────────────
if ('serviceWorker' in navigator) {
  // 🔥 FIX ADDED HERE: { updateViaCache: 'none' }
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
    console.log('[SW] Registered:', reg.scope);

    // Cek update setiap kali halaman difokuskan
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reg.update();
    });

    // Saat SW baru menunggu → tampilkan notif update
    const onNewSW = (sw) => {
      const updateBanner = document.getElementById('update-banner');
      if (!updateBanner) return;
      updateBanner.classList.add('visible');

      document.getElementById('update-reload-btn').addEventListener('click', () => {
        sw.postMessage({ type: 'SKIP_WAITING' });
      });
      document.getElementById('update-dismiss-btn').addEventListener('click', () => {
        updateBanner.classList.remove('visible');
      });
    };

    if (reg.waiting) onNewSW(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          onNewSW(newSW);
        }
      });
    });

    // Reload otomatis saat SW baru aktif
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) { refreshing = true; window.location.reload(); }
    });

  }).catch(err => console.warn('[SW] Failed:', err));
}

// ── Chapter label clickable di mobile (buka sidebar) ─────────
document.getElementById('chapter-label').addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    toggleMobileSidebar(); }
  }
);

// ── Welcome screen animations ────────────────────────────────
const FEATURED_VERSES = [
  { q: '"Firman-Mu adalah pelita bagi kakiku dan terang bagi jalanku."', r: '— Mazmur 119:105' },
  { q: '"Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal."', r: '— Yohanes 3:16' },
  { q: '"Tuhan adalah gembalaku, takkan kekurangan aku."', r: '— Mazmur 23:1' },
  { q: '"Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku."', r: '— Filipi 4:13' },
  { q: '"Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, rancangan damai sejahtera."', r: '— Yeremia 29:11' },
  { q: '"Serahkanlah segala kekuatiranmu kepada-Nya, sebab Ia yang memelihara kamu."', r: '— 1 Petrus 5:7' },
  { q: '"Percayalah kepada TUHAN dengan segenap hatimu dan janganlah bersandar kepada pengertianmu sendiri."', r: '— Amsal 3:5' },
  { q: '"Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu."', r: '— Matius 22:37' },
  { q: '"Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga."', r: '— Matius 5:3' },
  { q: '"Mintalah, maka akan diberikan kepadamu; carilah, maka kamu akan mendapat."', r: '— Matius 7:7' },
  { q: '"Jangan takut, sebab Aku menyertai engkau."', r: '— Yesaya 41:10' },
  { q: '"Mazmur bagi Allah kami itu baik, bahkan indah dan layaklah memuji-muji Dia."', r: '— Mazmur 147:1' },
];

const FEATURED_VERSES_EN = [
  { q: '"Your word is a lamp to my feet and a light to my path."', r: '— Psalms 119:105' },
  { q: '"For God so loved the world that He gave His only begotten Son..."', r: '— John 3:16' },
  { q: '"The Lord is my shepherd; I shall not want."', r: '— Psalms 23:1' },
  { q: '"I can do all things through Christ who strengthens me."', r: '— Philippians 4:13' },
  { q: '"For I know the thoughts that I think toward you, says the Lord..."', r: '— Jeremiah 29:11' },
  { q: '"Casting all your care upon Him, for He cares for you."', r: '— 1 Peter 5:7' },
  { q: '"Trust in the Lord with all your heart, and lean not on your own understanding."', r: '— Proverbs 3:5' },
  { q: '"You shall love the Lord your God with all your heart..."', r: '— Matthew 22:37' },
  { q: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven."', r: '— Matthew 5:3' },
  { q: '"Ask, and it will be given to you; seek, and you will find."', r: '— Matthew 7:7' },
  { q: '"Fear not, for I am with you; Be not dismayed, for I am your God."', r: '— Isaiah 41:10' },
  { q: '"Praise the Lord! For it is good to sing praises to our God..."', r: '— Psalms 147:1' }
];

// Helper to update static UI text
function updateUILocale() {
  const isEnglish = ['nkjv', 'av'].includes(currentVersion);
  const welcomeTitle = document.querySelector('#welcome-screen h2');
  
  if (welcomeTitle) {
    const versionName = VERSION_NAMES[currentVersion] || currentVersion.toUpperCase();
    // Changes "Alkitab Terjemahan Baru" to "Holy Bible - NKJV" etc.
    welcomeTitle.textContent = isEnglish ? `Holy Bible - ${versionName}` : `Alkitab - ${versionName}`;
  }
  // --- NEW: Hot-swap the random verse immediately ---
  const vodQuote = document.getElementById('vod-quote');
  const vodCite = document.getElementById('vod-cite');
  
  // Only update if the elements exist (user is on the home screen)
  if (vodQuote && vodCite) {
    const activeArray = isEnglish ? FEATURED_VERSES_EN : FEATURED_VERSES;
    
    // Safety check: ensure index is within bounds of the array
    currentVerseIdx = currentVerseIdx % activeArray.length; 
    
    const v = activeArray[currentVerseIdx];
    vodQuote.textContent = v.q;
    vodCite.textContent = v.r;
  }
  renderContinueReading();
}

// ✅ ADDED: global timeout holders (put this OUTSIDE the function, near top of file)
let hintTimeout = null;
let verseTimeout = null;


function startWelcomeAnimations() {
  const hintDefault  = document.getElementById('hint-default');
  const hintTutorial = document.getElementById('hint-tutorial');
  const cardInner    = document.getElementById('verse-card-inner');
  const vodQuote     = document.getElementById('vod-quote');
  const vodCite      = document.getElementById('vod-cite');
  
  if (!hintDefault || !cardInner) return;

  // 🔥 ADDED: CLEAR PREVIOUS LOOPS (VERY IMPORTANT)
  if (hintTimeout) {
    clearTimeout(hintTimeout);
    hintTimeout = null;
  }
  if (verseTimeout) {
    clearTimeout(verseTimeout);
    verseTimeout = null;
  }

  // ── Cycling hint ─────────────────────────────
  // let verseIdx = 0;

  function showHint(el) {
    [hintDefault, hintTutorial].forEach(h => {
      h.classList.remove('visible');
      h.classList.add('hidden');
    });

    setTimeout(() => {
      el.classList.remove('hidden');
      el.classList.add('visible');
    }, 450);
  }

  function runHintCycle() {
    if (curBook) return; // Stop cycling if user has started reading
    showHint(hintTutorial);

    // 🔥 EDITED: store timeout reference
    hintTimeout = setTimeout(() => {
      if (curBook) return; // 🔥 Stop loop
      showHint(hintDefault);

      // 🔥 EDITED: chain properly with tracking
      hintTimeout = setTimeout(runHintCycle, 5000);

    }, 9000);
  }

  // 🔥 EDITED: store initial timeout
  hintTimeout = setTimeout(runHintCycle, 5000);


  // ── Cycling verse card ───────────────────────
  function nextVerse() {
    cardInner.classList.remove('verse-visible');
    cardInner.classList.add('verse-hidden');

    setTimeout(() => {
      const isEnglish = ['nkjv', 'av'].includes(currentVersion);
      const activeArray = isEnglish ? FEATURED_VERSES_EN : FEATURED_VERSES;
      
      // Use the global variable here
      currentVerseIdx = (currentVerseIdx + 1) % activeArray.length;
      const v = activeArray[currentVerseIdx];

      vodQuote.textContent = v.q;
      vodCite.textContent  = v.r;

      requestAnimationFrame(() => {
        cardInner.classList.remove('verse-hidden');
        cardInner.classList.add('verse-visible');
      });
    }, 720); // Waits for the fade-out CSS transition before swapping text
  }

  function scheduleNextVerse() {
    if (curBook) return; // 🔥 Stop cycling if user has started reading
    const delay = 10000 + Math.random() * 5000;

    // 🔥 EDITED: track timeout
    verseTimeout = setTimeout(() => {
      if (curBook) return; // 🔥 Stop loop
      nextVerse();
      scheduleNextVerse();
    }, delay);
  }

  scheduleNextVerse();
}

// ── Init ─────────────────────────────────────────────────────
(async function init() {
  try { await openDB(); } catch(e) { console.warn('IndexedDB unavailable:', e); }
  // 🔥 HARD RESET UI FIRST
  curBook = null;
  chapterSelect.value = '';
chapterSelect.style.display = 'none';
  chapterContent.style.display = 'none';
  welcomeScreen.style.display = 'block';
  const initName = VERSION_NAMES[currentVersion] || currentVersion.toUpperCase();
  document.getElementById('version-trigger-btn').innerHTML = `${initName} <svg class="ic" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`;
  console.log('INIT RUN');
console.log('curBook:', curBook);
updateUILocale()
  renderBooks();
  // renderContinueReading();
  showHome();
  isAppReady = true;
})();