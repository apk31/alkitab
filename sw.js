// ── Alkitab TB Service Worker ──────────────────────────────────
//
// CARA UPDATE: Tidak perlu ubah apapun secara manual.
// Browser selalu fetch sw.js dari network (tidak di-cache),
// sehingga setiap perubahan di sw.js atau BUILD_TIME
// otomatis trigger update cache.
//
const BUILD_TIME  = '20260328-1858'; // diganti otomatis oleh generate_alkitab.py
const CACHE_DATA  = 'alkitab-data-v1.1.0';          // JSON ayat (jarang berubah)
const CACHE_SHELL = 'alkitab-shell-' + BUILD_TIME; // shell app (fresh tiap deploy)

const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
];

// ── Install ───────────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Install cache:', CACHE_SHELL);
  event.waitUntil(
    caches.open(CACHE_SHELL)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
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
// App shell (HTML/manifest): network-first → selalu dapat versi terbaru
if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/') ||
    url.pathname === '/' ||
    (url.pathname.endsWith('.json') && !url.pathname.includes('/data/'))
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) caches.open(CACHE_SHELL).then(c => c.put(event.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || caches.match('./index.html')))
    );
  // Data JSON ayat: cache-first + background revalidate
if (url.pathname.includes('/data/') && url.pathname.endsWith('.json')) {
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res.ok) {
          caches.open(CACHE_DATA).then(cache => cache.put(event.request, res.clone()));
        }
        return res;
      })
      .catch(() => 
        caches.match(event.request)
          .then(cached => cached || new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
      )
  );
    return;
    
  }

  // Google Fonts: cache-first (tidak pernah berubah)
  if (url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(res => {
          if (res.ok) caches.open(CACHE_SHELL).then(c => c.put(event.request, res.clone()));
          return res;
        }).catch(() => new Response('', { status: 408 }))
      )
    );
    return;
  }

  // Default
  event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
  return;
  
}
});

// ── Terima pesan force-update dari halaman ────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});