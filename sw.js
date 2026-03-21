// ── Alkitab TB Service Worker ──────────────────────────────────
// Versi cache — ubah angka ini setiap kali ada update file
const CACHE_VERSION = 'alkitab-tb-v1';

// File shell yang di-cache saat install (langsung)
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/minisearch@6.3.0/dist/umd/index.min.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap',
];

// ── Install: cache app shell ──────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(SHELL_FILES);
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: hapus cache lama ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Cache-first untuk data/, Network-first untuk lainnya ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // File JSON data alkitab → Cache-first (offline utama)
  if (url.pathname.includes('/data/') && url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
        }
      })
    );
    return;
  }

  // App shell & CDN → Cache-first dengan fallback network
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json') ||
    url.pathname === '/' ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.hostname.includes('cdn.jsdelivr.net') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok) {
            caches.open(CACHE_VERSION).then(c => c.put(event.request, response.clone()));
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: network only
  event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
});