const CACHE_NAME = "atomcamp-v1"
const OFFLINE_URL = "/"

/* Pages and assets to pre-cache on install */
const PRECACHE = [
  "/",
  "/learner",
  "/course",
  "/instructor",
  "/alumni",
  "/manifest.json",
  "/logo.png",
]

self.addEventListener("install", (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE).catch(() => {})
    )
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  /* Only intercept GET requests from the same origin */
  if (event.request.method !== "GET") return
  const url = new URL(event.request.url)
  if (url.origin !== location.origin) return
  /* Skip Next.js HMR / dev websocket */
  if (url.pathname.startsWith("/_next/webpack-hmr")) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request)
      if (cached) return cached

      try {
        const response = await fetch(event.request)
        /* Cache successful page/asset responses */
        if (response.ok && (
          event.request.destination === "document" ||
          event.request.destination === "image" ||
          event.request.destination === "style" ||
          event.request.destination === "script" ||
          event.request.destination === "font"
        )) {
          cache.put(event.request, response.clone())
        }
        return response
      } catch {
        /* Network failed — return cached root for navigation requests */
        if (event.request.destination === "document") {
          const fallback = await cache.match(OFFLINE_URL)
          if (fallback) return fallback
        }
        return new Response("Offline — please check your connection.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        })
      }
    })
  )
})
