// "use strict";

// Object.defineProperty(exports, "__esModule", {
// 	value: true,
// });

function _asyncToGenerator(fn) {
	return function () {
		var gen = fn.apply(this, arguments);
		return new Promise(function (resolve, reject) {
			function step(key, arg) {
				try {
					var info = gen[key](arg);
					var value = info.value;
				} catch (error) {
					reject(error);
					return;
				}
				if (info.done) {
					resolve(value);
				} else {
					return Promise.resolve(value).then(
						function (value) {
							step("next", value);
						},
						function (err) {
							step("throw", err);
						}
					);
				}
			}
			return step("next");
		});
	};
}

class RemoteBotInstall {}

/**
 * Install the bot. It's private because it doesn't check connection type.
 * @param {Object} botManifest Bot's manifest
 * @returns {Promise} True if installed or updated, False if not.
 */

RemoteBotInstall.getSubscribedBots = () =>
	new Promise((resolve, reject) => {
		resolve([]);
	});

RemoteBotInstall.getBotManifestFromId = (botID, catalog) => {
	catalog = catalog.bots || [];
	const subscribedBotManifest = catalog.find((manifest) => {
		return manifest.botId === botID;
	});
	return subscribedBotManifest;
};

RemoteBotInstall.isSatellite = () =>
	new Promise((resolve, reject) => {
		return resolve(false);
	});

RemoteBotInstall.installBot = (botManifest) =>
	new Promise((resolve, reject) => {
		resolve(true);
	});

RemoteBotInstall.syncronizeBots = () =>
	new Promise((resolve, reject) => {
		resolve();
	});

function performInstallation(botManifest) {
	return new Promise(
		(() => {
			var _ref = _asyncToGenerator(function* (resolve, reject) {
				resolve(true);
			});

			return function (_x, _x2) {
				return _ref.apply(this, arguments);
			};
		})()
	);
}

export default RemoteBotInstall;
