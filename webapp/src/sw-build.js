// const workboxBuild = require("workbox-build");

// const buildSW = () => {
// 	// The build is expected to fail if the
// 	// sw install rules couldn't be generated.
// 	// Add a catch block to handle this scenario.
// 	return workboxBuild
// 		.injectManifest({
// 			swSrc: "src/sw-custom.js", // custom sw rule
// 			swDest: "build/sw-custom.js", // sw output file (auto-generated
// 			globDirectory: "build",
// 			globPatterns: ["**/*.{js,css,html,png,jpg,ico,svg,woff,woff2,ttf,json}*"],
// 			maximumFileSizeToCacheInBytes: 20 * 1024 * 1000,
// 		})
// 		.then(({ count, size, warnings }) => {
// 			warnings.forEach(console.warn);
// 			console.info(`${count} files will be precached,
//                   totaling ${size / (1024 * 1024)} MBs.`);
// 		})
// 		.catch((err) => {
// 			console.error("injectManifest", err);
// 		});
// };

// buildSW();
