self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll([
        './', './index.html',
        './assets/cloud.svg',
        './assets/logo (1).png',
        './assets/logo (2).png',
        '/assets/logo.png',
        '/assets/rainy.svg',
        '/assets/sunny-icon.svg',
        '/assets/weather4.jpg',
        '/css/styles.css',
        '/src/app.js',
      ])
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request)
    })
  )
})