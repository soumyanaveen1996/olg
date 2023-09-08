try {
	if ("function" === typeof importScripts) {
		importScripts(
			"https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"
		);

		// Global workbox
		if (workbox) {
			// console.log("Workbox is loaded");

			// Disable logging
			workbox.setConfig({ debug: false });

			//`generateSW` and `generateSWString` provide the option
			// to force update an exiting service worker.
			// Since we're using `injectManifest` to build SW,
			// manually overriding the skipWaiting();
			self.addEventListener("install", (event) => {
				self.skipWaiting(); // Skip to activation step - taken care in serviceWorker.ts
				//self.clients.claim();
			});

			// Manual injection point for manifest files.
			// All assets under build/ and 5MB sizes are precached.
			try {
				workbox.precaching.precacheAndRoute([]);
			} catch (e) {
				console.error(e);
			}

			// Font caching
			workbox.routing.registerRoute(
				new RegExp("https://fonts.(.*)"),
				// new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
				new workbox.strategies.CacheFirst({
					cacheName: "googleapis",
					plugins: [
						new workbox.expiration.ExpirationPlugin({
							maxEntries: 30,
						}),
					],
				})
			);

			// Font caching
			workbox.routing.registerRoute(
				"https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js",
				// new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
				new workbox.strategies.CacheFirst({
					cacheName: "workbox",
					plugins: [
						new workbox.expiration.ExpirationPlugin({
							maxEntries: 30,
						}),
					],
				})
			);

			workbox.routing.registerRoute(
				({ event }) => event.request.mode === "navigate",
				async () => {
					const defaultBase = "/index.html";
					return caches
						.match(workbox.precaching.getCacheKeyForURL(defaultBase))
						.then((response) => {
							return response || fetch(defaultBase);
						})
						.catch((err) => {
							return fetch(defaultBase);
						});
				}
			);
		} else {
			console.error("Workbox could not be loaded. No offline support");
		}
	}
} catch (e) {
	console.error("Unable to install service worker. Possible network error.", e);
}

self.addEventListener("fetch", function () {
	// it can be empty if you just want to get rid of that error
});
