const Cache_Name = "TTC-Cache";
const Cache_Files = [
  "/",
  "/icons",
  "/static/css",
  "/static/js",
  "/favicon.ico",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(Cache_Name);
      console.log("[Service Worker] Caching Files");
      await cache.addAll(Cache_Files);
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches?.keys()?.then((keyList) => {
      Promise.all(
        keyList.map((key) => {
          if (key === Cache_Name) {
            return;
          }
          caches.delete(key);
        })
      );
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(Cache_Name);
      // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
