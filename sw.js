// sw.js

// يمنع الكاش تمامًا ويجعل السويتش سريع
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// التعامل مع أي طلب بدون كاش
self.addEventListener("fetch", function (e) {
  // مفيش كاش هنا، نسمح لكل الطلبات تروح للسيرفر مباشرة
});
