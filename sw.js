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
      return cache
        .addAll([
        '/', // caches index.html
        '/restaurant.html',
        'css/styles.css',
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