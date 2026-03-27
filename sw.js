<<<<<<< HEAD
/* Updated Service Worker */
=======
// ── Alkitab TB Service Worker ──────────────────────────────────
//
// CARA UPDATE: Tidak perlu ubah apapun secara manual.
// Browser selalu fetch sw.js dari network (tidak di-cache),
// sehingga setiap perubahan di sw.js atau BUILD_TIME
// otomatis trigger update cache.
//
// const BUILD_TIME  = '__BUILD_TIME__'; // diganti otomatis oleh generate_alkitab.py
const BUILD_TIME = '20260322-1407';
const CACHE_DATA  = 'alkitab-data-v1.1.0';          // JSON ayat (jarang berubah)
const CACHE_SHELL = 'alkitab-shell-' + BUILD_TIME; // shell app (fresh tiap deploy)
>>>>>>> parent of 46feefa (Update sw.js)

self.addEventListener('install', event => {
  // Cache files
});

self.addEventListener('fetch', event => {
  // Network-first strategy implementation for data files
});

const BUILD_TIME = '20260327-2300';

// Further implementation details...