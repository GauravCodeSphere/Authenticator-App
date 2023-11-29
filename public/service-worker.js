// public/service-worker.js
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
          '/path/to/your/script.js',  // Add paths to assets you want to cache
          '/path/to/another/asset',
          // Add other assets like CSS, images, etc.
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  