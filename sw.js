// Static Cache with version number - change version number when updating static assets
const appName = 'retaurant-reviews';
const staticCacheName = appName + '-v1.0';

// Image Cache
const contentImgCache = appName + '-images';

// All Cache Array
let allCaches = [
  staticCacheName,
  contentImgCache
];

// Cache all static assets at service worker install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/register-sw.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json'
      ])
      .catch(error => {
        console.log('Caches open failed: ' + error);
      });
    })
  );
});

// Delete previous caches, if any, on service worker activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith(appName) && !allCaches.includes(cacheName);
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Hijack fetch requests
self.addEventListener('fetch', event => {
  // Respond with cached data, if any, falling back to network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});