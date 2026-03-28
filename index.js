
// ── Book list ────────────────────────────────────────────────
const BOOKS = [
  {no:1,abbr:"Kej",name:"Kejadian",chapter:50,t:"old"},
  {no:2,abbr:"Kel",name:"Keluaran",chapter:40,t:"old"},
  {no:3,abbr:"Ima",name:"Imamat",chapter:27,t:"old"},
  {no:4,abbr:"Bil",name:"Bilangan",chapter:36,t:"old"},
  {no:5,abbr:"Ula",name:"Ulangan",chapter:34,t:"old"},
  {no:6,abbr:"Yos",name:"Yosua",chapter:24,t:"old"},
  {no:7,abbr:"Hak",name:"Hakim-hakim",chapter:21,t:"old"},
  {no:8,abbr:"Rut",name:"Rut",chapter:4,t:"old"},
  {no:9,abbr:"1Sam",name:"1 Samuel",chapter:31,t:"old"},
  {no:10,abbr:"2Sam",name:"2 Samuel",chapter:24,t:"old"},
  {no:11,abbr:"1Raj",name:"1 Raja-Raja",chapter:22,t:"old"},
  {no:12,abbr:"2Raj",name:"2 Raja-Raja",chapter:25,t:"old"},
  {no:13,abbr:"1Taw",name:"1 Tawarikh",chapter:29,t:"old"},
  {no:14,abbr:"2Taw",name:"2 Tawarikh",chapter:36,t:"old"},
  {no:15,abbr:"Ezr",name:"Ezra",chapter:10,t:"old"},
  {no:16,abbr:"Neh",name:"Nehemia",chapter:13,t:"old"},
  {no:17,abbr:"Est",name:"Ester",chapter:10,t:"old"},
  {no:18,abbr:"Ayb",name:"Ayub",chapter:42,t:"old"},
  {no:19,abbr:"Maz",name:"Mazmur",chapter:150,t:"old"},
  {no:20,abbr:"Ams",name:"Amsal",chapter:31,t:"old"},
  {no:21,abbr:"Pkh",name:"Pengkhotbah",chapter:12,t:"old"},
  {no:22,abbr:"Kid",name:"Kidung Agung",chapter:8,t:"old"},
  {no:23,abbr:"Yes",name:"Yesaya",chapter:66,t:"old"},
  {no:24,abbr:"Yer",name:"Yeremia",chapter:52,t:"old"},
  {no:25,abbr:"Rat",name:"Ratapan",chapter:5,t:"old"},
  {no:26,abbr:"Yeh",name:"Yehezkiel",chapter:48,t:"old"},
  {no:27,abbr:"Dan",name:"Daniel",chapter:12,t:"old"},
  {no:28,abbr:"Hos",name:"Hosea",chapter:14,t:"old"},
  {no:29,abbr:"Yoe",name:"Yoel",chapter:3,t:"old"},
  {no:30,abbr:"Amo",name:"Amos",chapter:9,t:"old"},
  {no:31,abbr:"Oba",name:"Obaja",chapter:1,t:"old"},
  {no:32,abbr:"Yun",name:"Yunus",chapter:4,t:"old"},
  {no:33,abbr:"Mik",name:"Mikha",chapter:7,t:"old"},
  {no:34,abbr:"Nah",name:"Nahum",chapter:3,t:"old"},
  {no:35,abbr:"Hab",name:"Habakuk",chapter:3,t:"old"},
  {no:36,abbr:"Zef",name:"Zefanya",chapter:3,t:"old"},
  {no:37,abbr:"Hag",name:"Hagai",chapter:2,t:"old"},
  {no:38,abbr:"Zak",name:"Zakharia",chapter:14,t:"old"},
  {no:39,abbr:"Mal",name:"Maleakhi",chapter:4,t:"old"},
  {no:40,abbr:"Mat",name:"Matius",chapter:28,t:"new"},
  {no:41,abbr:"Mar",name:"Markus",chapter:16,t:"new"},
  {no:42,abbr:"Luk",name:"Lukas",chapter:24,t:"new"},
  {no:43,abbr:"Yoh",name:"Yohanes",chapter:21,t:"new"},
  {no:44,abbr:"Kis",name:"Kisah Para Rasul",chapter:28,t:"new"},
  {no:45,abbr:"Rom",name:"Roma",chapter:16,t:"new"},
  {no:46,abbr:"1Kor",name:"1 Korintus",chapter:16,t:"new"},
  {no:47,abbr:"2Kor",name:"2 Korintus",chapter:13,t:"new"},
  {no:48,abbr:"Gal",name:"Galatia",chapter:6,t:"new"},
  {no:49,abbr:"Efe",name:"Efesus",chapter:6,t:"new"},
  {no:50,abbr:"Flp",name:"Filipi",chapter:4,t:"new"},
  {no:51,abbr:"Kol",name:"Kolose",chapter:4,t:"new"},
  {no:52,abbr:"1Tes",name:"1 Tesalonika",chapter:5,t:"new"},
  {no:53,abbr:"2Tes",name:"2 Tesalonika",chapter:3,t:"new"},
  {no:54,abbr:"1Tim",name:"1 Timotius",chapter:6,t:"new"},
  {no:55,abbr:"2Tim",name:"2 Timotius",chapter:4,t:"new"},
  {no:56,abbr:"Tit",name:"Titus",chapter:3,t:"new"},
  {no:57,abbr:"Flm",name:"Filemon",chapter:1,t:"new"},
  {no:58,abbr:"Ibr",name:"Ibrani",chapter:13,t:"new"},
  {no:59,abbr:"Yak",name:"Yakobus",chapter:5,t:"new"},
  {no:60,abbr:"1Pet",name:"1 Petrus",chapter:5,t:"new"},
  {no:61,abbr:"2Pet",name:"2 Petrus",chapter:3,t:"new"},
  {no:62,abbr:"1Yoh",name:"1 Yohanes",chapter:5,t:"new"},
  {no:63,abbr:"2Yoh",name:"2 Yohanes",chapter:1,t:"new"},
  {no:64,abbr:"3Yoh",name:"3 Yohanes",chapter:1,t:"new"},
  {no:65,abbr:"Yud",name:"Yudas",chapter:1,t:"new"},
  {no:66,abbr:"Wah",name:"Wahyu",chapter:22,t:"new"},
];

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

// ── Render book list ─────────────────────────────────────────
function renderBooks() {
  const q = searchInput.value.toLowerCase();
  const filtered = BOOKS.filter(b =>
    b.t === testament && b.name.toLowerCase().includes(q)
  );
  bookListEl.innerHTML = '';
  filtered.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-item' + (curBook && curBook.abbr === book.abbr ? ' active' : '');
    div.innerHTML = `<span class="book-abbr">${book.abbr}</span>${book.name}`;
    div.addEventListener('click', () => {
      selectBook(book);
      if (window.innerWidth <= 768) closeSidebar();
    });
    bookListEl.appendChild(div);
  });
}

// ── Select book ──────────────────────────────────────────────
function selectBook(book, ch = 1) {
  curBook = book;
  curChapter = ch;
  renderBooks();
  chapterSelect.innerHTML = '';
  for (let i = 1; i <= book.chapter; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Pasal ${i}`;
    if (i === ch) opt.selected = true;
    chapterSelect.appendChild(opt);
  }
  chapterSelect.style.display = 'inline-block';
  chapterLabel.textContent = book.name;
  document.getElementById('topbar-row2').classList.add('visible');
  loadChapter();
}

// ── Load chapter ─────────────────────────────────────────────
let isLoadingChapter = false;

async function loadChapter() {
  if (isLoadingChapter) return; // Prevent concurrent loads
  isLoadingChapter = true;
  
  showLoading();
  prevBtn.disabled = true;  // Disable all navigation during load
  nextBtn.disabled = true;
  chapterSelect.disabled = true;
  
  try {
    let bookData = cache[curBook.abbr];
    if (!bookData) {
      const res = await fetch(`data/${curBook.abbr}.json`);
      if (!res.ok) throw new Error('File not found');
      bookData = await res.json();
      cache[curBook.abbr] = bookData;
    }
    const verses = bookData[curChapter] || [];
    await renderVerses(verses);
    
    // ✦ NEW: Simpan histori bacaan secara otomatis
    localStorage.setItem('alkitab-history', JSON.stringify({ abbr: curBook.abbr, ch: curChapter }));
    
  } catch (e) {
    console.error(e);
    showError();
  } finally {
    // Re-enable navigation buttons only AFTER render is complete
    prevBtn.disabled = curChapter <= 1;
    nextBtn.disabled = curChapter >= curBook.chapter;
    chapterSelect.disabled = false;
    isLoadingChapter = false;
  }
}

// ── Render verses ────────────────────────────────────────────
async function renderVerses(verses) {
  bookTitleEl.textContent = curBook.name;
  chapterSubEl.textContent = `Pasal ${curChapter}`;
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
      const heading = document.createElement('span');
      heading.className = 'section-heading';
      heading.textContent = v.t;
      versesEl.appendChild(heading);
      return;
    }
    const wrap = document.createElement('span');
    wrap.className = 'verse-wrap';
    wrap.dataset.verse = v.v;

    const numEl = document.createElement('sup');
    numEl.className = 'verse-number' + (firstVerse ? ' v1' : '');
    numEl.textContent = v.v;
    numEl.addEventListener('click', () => {
      const isAlreadyActive = wrap.classList.contains('verse-active');
      // Nonaktifkan semua ayat yang sedang aktif (tapi pertahankan 'highlighted-verse' untuk bookmark)
      document.querySelectorAll('.verse-active').forEach(el => el.classList.remove('verse-active'));
      if (!isAlreadyActive) {
        wrap.classList.add('verse-active');
      }
    });

    const textEl = document.createElement('span');
    textEl.className = 'verse-text';
    textEl.textContent = v.t + ' ';

    // Bookmark button
    const bmBtn = document.createElement('button');
    bmBtn.className = 'verse-bm-btn' + (savedIds.has(v.v) ? ' saved' : '');
    if (savedIds.has(v.v)) wrap.classList.add('highlighted-verse');
    bmBtn.innerHTML = '<svg class="ic" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>';
    bmBtn.title = 'Simpan bookmark';
    bmBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await toggleBookmark(v, wrap, bmBtn);
    });

    wrap.appendChild(numEl);
    wrap.appendChild(textEl);
    wrap.appendChild(bmBtn);
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
  if (curChapter > 1) { curChapter--; loadChapter(); chapterSelect.value = curChapter; }
});
nextBtn.addEventListener('click', () => {
  if (curChapter < curBook.chapter) { curChapter++; loadChapter(); chapterSelect.value = curChapter; }
});
chapterSelect.addEventListener('change', () => {
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
  ftStatus.textContent = 'Membangun indeks pencarian… (sekali saja)';
  miniSearch = new MiniSearch({
    fields: ['t'],
    storeFields: ['book', 'bookName', 'chapter', 'verse', 't'],
    searchOptions: { prefix: true, fuzzy: 0.15, boost: { t: 1 } }
  });
  const docs = [];
  let id = 0;
  for (const book of BOOKS) {
    let bookData = cache[book.abbr];
    if (!bookData) {
      try {
        const res = await fetch(`data/${book.abbr}.json`);
        bookData = await res.json();
        cache[book.abbr] = bookData;
      } catch { continue; }
    }
    for (const [ch, verses] of Object.entries(bookData)) {
      for (const v of verses) {
        if (v.v == 0) continue;
        docs.push({ id: id++, book: book.abbr, bookName: book.name, chapter: parseInt(ch), verse: v.v, t: v.t });
      }
    }
    ftStatus.textContent = `Memuat… ${book.name}`;
    await new Promise(r => setTimeout(r, 0)); // yield UI
  }
  miniSearch.addAll(docs);
  searchIndexBuilt = true;
  searchIndexBuilding = false;
  ftStatus.textContent = `Indeks siap — ${docs.length.toLocaleString('id')} ayat terindeks`;
}

function highlightMatch(text, terms) {
  let result = text;
  terms.forEach(term => {
    const re = new RegExp(`(${term})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  });
  return result;
}

function runSearch() {
  const q = ftInput.value.trim();
  if (!q) { ftResults.innerHTML = ''; return; }
  if (!searchIndexBuilt) { ftStatus.textContent = 'Indeks belum siap, tunggu sebentar…'; return; }
  const results = miniSearch.search(q, { limit: 50 });
  const terms = q.toLowerCase().split(/\s+/);
  if (!results.length) {
    ftResults.innerHTML = `<div class="ft-empty">Tidak ada hasil untuk "<strong>${q}</strong>"</div>`;
    ftStatus.textContent = '0 hasil ditemukan';
    return;
  }
  ftStatus.textContent = `${results.length} hasil ditemukan`;
  ftResults.innerHTML = '';
  results.forEach(r => {
    const item = document.createElement('div');
    item.className = 'ft-result-item';
    item.innerHTML = `
      <div class="ft-ref">${r.bookName} ${r.chapter}:${r.verse}</div>
      <div class="ft-text">${highlightMatch(r.t, terms)}</div>`;
    item.addEventListener('click', () => {
      const book = BOOKS.find(b => b.abbr === r.book);
      closeSearchPanel();
      selectBook(book, r.chapter);
      // Highlight target verse after render
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

function openSearchPanel() {
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

async function openBookmarkPanel() {
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

if (bnavBooks) {
  bnavBooks.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('visible', isOpen);
    bnavBooks.classList.toggle('active', isOpen);
    if (isOpen) { closeSearchPanel(); closeBookmarkPanel(); document.body.classList.add('no-overscroll'); }
    else { document.body.classList.remove('no-overscroll'); }
  });

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
let navInProgress = false;
let navTimer = null;

document.addEventListener('keydown', e => {
  if (e.target === searchInput || e.target === ftInput) return;
  if (e.key === 'Escape') { closeSearchPanel(); closeBookmarkPanel(); closeSidebar(); }
  
  // Debounce & prevent multiple simultaneous navigations
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    if (navInProgress) return; // Block if already loading
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
  navigator.serviceWorker.register('sw.js').then(reg => {
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
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('visible', isOpen);
    if (bnavBooks) bnavBooks.classList.toggle('active', isOpen);
    if (isOpen) { closeSearchPanel(); closeBookmarkPanel(); document.body.classList.add('no-overscroll'); }
    else { document.body.classList.remove('no-overscroll'); }
  }
});

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

function startWelcomeAnimations() {
  const hintDefault  = document.getElementById('hint-default');
  const hintTutorial = document.getElementById('hint-tutorial');
  const cardInner    = document.getElementById('verse-card-inner');
  const vodQuote     = document.getElementById('vod-quote');
  const vodCite      = document.getElementById('vod-cite');
  if (!hintDefault || !cardInner) return;

  // ── Cycling hint: default (5s) → tutorial (9s) → default → ...
  // hintDefault sudah visible dari awal, jadi siklus pertama langsung ke tutorial
  let verseIdx = 0;
  function showHint(el) {
    // fade out semua
    [hintDefault, hintTutorial].forEach(h => {
      h.classList.remove('visible');
      h.classList.add('hidden');
    });
    // fade in target setelah transisi selesai
    setTimeout(() => {
      el.classList.remove('hidden');
      el.classList.add('visible');
    }, 450);
  }

  function runHintCycle() {
    // Tampilkan tutorial
    showHint(hintTutorial);
    // Setelah 9 detik, kembali ke default
    setTimeout(() => {
      showHint(hintDefault);
      // Setelah 5 detik, ulangi
      setTimeout(runHintCycle, 5000);
    }, 9000);
  }
  // Mulai siklus setelah 5 detik (beri waktu baca teks default dulu)
  setTimeout(runHintCycle, 5000);

  // ── Cycling verse card: ganti tiap 3 detik ──
  function nextVerse() {
    // Step 1: fade out (sama persis dengan pola showHint)
    cardInner.classList.remove('verse-visible');
    cardInner.classList.add('verse-hidden');
    // Step 2: setelah transition selesai (700ms), ganti konten lalu fade in
    setTimeout(() => {
      verseIdx = (verseIdx + 1) % FEATURED_VERSES.length;
      const v = FEATURED_VERSES[verseIdx];
      vodQuote.textContent = v.q;
      vodCite.textContent  = v.r;
      // Step 3: fade in di frame berikutnya supaya browser register perubahan class
      requestAnimationFrame(() => {
        cardInner.classList.remove('verse-hidden');
        cardInner.classList.add('verse-visible');
      });
    }, 720);
  }
  function scheduleNextVerse() {
    const delay = 10000 + Math.random() * 5000; // 10–15 detik random
    setTimeout(() => { nextVerse(); scheduleNextVerse(); }, delay);
  }
  scheduleNextVerse();
}

// ── Init ─────────────────────────────────────────────────────
(async function init() {
  try { await openDB(); } catch(e) { console.warn('IndexedDB unavailable:', e); }
  renderBooks();
  
  // ✦ NEW: Cek riwayat bacaan terakhir
  let loadedFromHistory = false;
  const historyStr = localStorage.getItem('alkitab-history');
  if (historyStr) {
    try {
      const h = JSON.parse(historyStr);
      const book = BOOKS.find(b => b.abbr === h.abbr);
      if (book) {
        selectBook(book, h.ch);
        loadedFromHistory = true;
      }
    } catch(e) {}
  }
  
  // Hanya tampilkan layar selamat datang jika tidak ada riwayat
  if (!loadedFromHistory) {
    startWelcomeAnimations();
  }
})();
