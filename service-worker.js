let CACHE_NAME = "aboutme"

let chaceUrl = [
    "/",
    "/images/pwa-logo.jpg",
    "/images/basketball-court.png",
    "/images/guitar.png",
    "/images/instagram.png",
    "/images/twitter.png",
    "/images/man.png",
    "/component/nav.html",
    "/index.html",
    "/style.css",
    "/manifest.json",
    "/pages/home.html",
    "/pages/profile.html",
    "/pages/hobby.html",
    "/pages/sosmed.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(chace => {
            return chace.addAll(chaceUrl)
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches
        .match(e.request, { cacheName : CACHE_NAME })
        .then(response => {
            if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            e.request.url
          );
          return fetch(e.request);
        })
    )
})

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})