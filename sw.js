// ملف sw.js بدون كاش نهائيًا
self.addEventListener("install", function (e) {
  // تثبيت بدون كاش
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  // حذف كل الكاشات
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", function (e) {
  // كل الطلبات تروح مباشرة للإنترنت
  e.respondWith(fetch(e.request));
});
