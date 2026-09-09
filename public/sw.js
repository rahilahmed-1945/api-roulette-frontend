// Service Worker – self-unregistering stub
// Registration was disabled in commit 418e284 to prevent stale Vite bundles
// being served on Render deployments. This file now immediately unregisters
// itself and deletes all caches so browsers that cached the old SW get clean.

self.addEventListener('install', () => {
  // Skip waiting so this stub activates immediately, replacing the old SW.
  self.skipWaiting();
});

self.addEventListener('activate', async () => {
  // Delete every cache entry left by the old service worker.
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));

  // Unregister this service worker so it is never consulted again.
  await self.registration.unregister();

  // Force all controlled clients to reload with fresh assets from the server.
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) => client.navigate(client.url));
});