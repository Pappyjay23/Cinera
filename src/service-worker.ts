/// <reference lib="webworker" />
// NOTE:
// Cinera is an online-first app.
// We intentionally do NOT support offline browsing.
// When offline, users see a branded offline screen only.

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare let self: ServiceWorkerGlobalScope;

// Clean old caches
cleanupOutdatedCaches();

// Precache all Vite-built assets
precacheAndRoute(self.__WB_MANIFEST);

// Single install event handler - cache everything at once
self.addEventListener("install", (event) => {
	event.waitUntil(
		(async () => {
			await caches
				.open("offline-assets")
				.then((cache) =>
					cache.addAll([
						"/offline.html",
						"/app-bg.jpg",
						"/fonts/PlusJakartaSans-Variable.woff2",
					])
				);
			await self.skipWaiting();
		})()
	);
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activated");
	event.waitUntil(Promise.all([self.clients.claim()]));
});

// Cache fonts
registerRoute(
	({ url }) => url.pathname.startsWith("/fonts/"),
	new CacheFirst({
		cacheName: "plus-jakarta-fonts",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 10,
				maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
			}),
			{
				async cacheWillUpdate({ response }) {
					if (!response || response.status !== 200) return null;
					const cloned = response.clone();
					const body = await cloned.blob();
					const headers = new Headers(cloned.headers);

					if (
						!headers.get("Content-Type") ||
						headers.get("Content-Type") === "application/octet-stream"
					) {
						headers.set("Content-Type", "font/woff2");
					}

					return new Response(body, {
						status: cloned.status,
						statusText: cloned.statusText,
						headers,
					});
				},
			},
		],
	})
);

// Cache offline assets
registerRoute(
	({ url }) =>
		url.pathname === "/offline.html" || url.pathname === "/app-bg.jpg",
	new CacheFirst({
		cacheName: "offline-assets",
	})
);

// Cache internal app images
registerRoute(
	({ request, sameOrigin }) => {
		return sameOrigin && request.destination === "image";
	},
	new CacheFirst({
		cacheName: "images",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 80,
				maxAgeSeconds: 14 * 24 * 60 * 60, // 2 weeks
			}),
		],
	})
);

// Cache external images
registerRoute(
	({ request, sameOrigin }) => !sameOrigin && request.destination === "image",
	new CacheFirst({
		cacheName: "external-images",
		plugins: [
			new CacheableResponsePlugin({ statuses: [0, 200] }),
			new ExpirationPlugin({
				maxEntries: 100,
				maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
			}),
		],
	})
);

// Network-first navigation route with offline fallback
registerRoute(
	({ request }) => request.mode === "navigate",
	new NetworkFirst({
		cacheName: "navigation",
		networkTimeoutSeconds: 1,
		plugins: [
			{
				handlerDidError: async () => {
					console.log("Network failed, serving offline page");
					const offlinePage = await caches.match("/offline.html");
					return (
						offlinePage ||
						new Response("Offline", {
							status: 503,
							statusText: "Service Unavailable",
						})
					);
				},
			},
		],
	})
);
