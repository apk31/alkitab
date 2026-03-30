// ── Alkitab TB Service Worker ──────────────────────────────────
//
// CARA UPDATE: Tidak perlu ubah apapun secara manual.
// Browser selalu fetch sw.js dari network (tidak di-cache),
// sehingga setiap perubahan di sw.js atau BUILD_TIME
// otomatis trigger update cache.
//
const BUILD_TIME  = '20260330.1959'; // diganti otomatis oleh generate_alkitab.py
const CACHE_DATA  = 'alkitab-data-v2.0.0';          // JSON ayat (jarang berubah)
const CACHE_SHELL = 'alkitab-shell-' + BUILD_TIME; // shell app (fresh tiap deploy)

// In sw.js - Update this array:
const SHELL_FILES = [
  './',
  './index.html',
  './index.css',
  './index.js',
  './search.js',
  './manifest.json',
  './icons/favicon.ico'
];

// ── Install ───────────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Install cache:', CACHE_SHELL);
  event.waitUntil(
    caches.open(CACHE_SHELL).then(cache => {
      // FIX: Append a cache-buster or use 'reload' to bypass the browser's HTTP cache.
      // This guarantees the Service Worker always fetches the absolute latest files from your server.
      return Promise.all(SHELL_FILES.map(url => {
        return fetch(new Request(url, { cache: 'reload' }))
          .then(res => cache.put(url, res));
      }));
    })
    // FIX: Removed self.skipWaiting() here. 
    // The SW must "wait" so the Update Banner can show up in the UI.
  );
});

// ── Activate: hapus cache shell lama ─────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('alkitab-shell-') && k !== CACHE_SHELL)
          .map(k => { console.log('[SW] Hapus cache lama:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. DATA JSON (FIRST PRIORITY)
  if (url.pathname.includes('/data/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
  const resClone = res.clone(); // 🔥 clone FIRST

  if (res.ok) {
    caches.open(CACHE_DATA).then(cache => cache.put(event.request, resClone));
  }

  return res;
})
        .catch(() =>
          caches.match(event.request)
            .then(cached => cached || new Response('{}', {
              headers: { 'Content-Type': 'application/json' }
            }))
        )
    );
    return; // ✅ IMPORTANT
  }

// 2. APP SHELL (HTML) - FIX: Change to Cache-First for instant offline loading.
  // Updates will be handled entirely by the SW lifecycle (the banner).
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/') ||
    url.pathname === '/' ||
    (url.pathname.endsWith('.json') && !url.pathname.includes('/data/'))
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(res => {
          const resClone = res.clone();
          if (res.ok) caches.open(CACHE_SHELL).then(c => c.put(event.request, resClone));
          return res;
        });
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // 3. GOOGLE FONTS
  if (
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(res => {
  const resClone = res.clone(); // 🔥 same fix

  if (res.ok) {
    caches.open(CACHE_SHELL).then(c => c.put(event.request, resClone));
  }

  return res;
}).catch(() => new Response('', { status: 408 }))
      )
    );
    return; // ✅ IMPORTANT
  }

  // 4. DEFAULT
  event.respondWith(
    fetch(event.request).catch(() => caches.match('./index.html'))
  );
});

// ── Terima pesan force-update dari halaman ────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});