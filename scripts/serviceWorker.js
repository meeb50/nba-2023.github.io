const staticApp = "nba-2023"
const assets = [
    "/",
    "/Index.html",
    "/Noticias.html",
    "/Contacto.html",
    "/AcercaDe.html",
    "/css/estilos.css",
    "/css/all.min.css",
    "/scripts/service-worker.js",
    "/img/favicon.ico",
    "/img/logo.png",
    "/img/icons/mipmap-mdpi/icon.png",
    "/img/icons/mipmap-hdpi/icon.png",
    "/img/icons/mipmap-xhdpi/icon.png",
    "/img/icons/mipmap-xxhdpi/icon.png",
    "/img/icons/mipmap-xxxhdpi/icon.png",
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticApp).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("scripts/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    });
}

