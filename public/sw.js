const CACHE_NAME = 'avocado-farm-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/images/pexels-matreding-11911814.jpg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  // Only handle GET requests for static assets
  if (event.request.method !== 'GET') {
    return
  }
  
  // Skip Firebase, API requests, and dynamic content
  const url = new URL(event.request.url)
  if (url.hostname !== location.hostname ||
      event.request.url.includes('firebase') || 
      event.request.url.includes('googleapis') ||
      event.request.url.includes('firebaseio') ||
      event.request.url.includes('api/')) {
    return
  }
  
  // Only cache specific static resources
  if (event.request.destination === 'document' ||
      event.request.destination === 'script' ||
      event.request.destination === 'style' ||
      event.request.destination === 'image' ||
      event.request.destination === 'manifest') {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
        })
        .catch(() => {
          // Return cached index for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/')
          }
        })
    )
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})