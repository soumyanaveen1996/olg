import localforage from "localforage";
import axios from "axios";
import { getAuthData } from "./StorageService";
import Config from "../Utils/Config";
import GenericAjax from "../Services/GenericAjax.js";
import _ from "lodash";
import store from "../State/configureStore";
import { hideLoader, showLoader } from "../State/actions/loader";
import { fetchCompanies, fetchCategories } from "../State/actions/catalogue";

const R = require("ramda");

let user = getAuthData()?.user || null;
let userId = user?.userId;

export const LFStorage = {};
export const LFStorageKeys = {
	DOMAINS: "DOMAINS",
	DEPENDENCIES: "DEPENDENCIES",
	OFFLINE_QUEUE: "OFFLINE_QUEUE",
	FMTABLE_EDIT_BUFFER: "FMTABLE_EDIT_BUFFER",
	CONTACTS: "CONTACTS",
	MESSAGES: "MESSAGES",
};

export const initiateLFStorage = async (user) => {
	const { userId, userName } = user;
	// Supply a list of drivers, in order of preference.
	localforage.setDriver([
		localforage.INDEXEDDB,
		localforage.WEBSQL,
		localforage.LOCALSTORAGE,
	]);

	LFStorage[userId] = localforage.createInstance({
		name: userId,
	});
	LFStorage[userId].config({
		storeName: userId,
		description: `DB for user ${userName}`,
	});
	await LFStorage[userId]
		.ready()
		.then(function () {
			console.log(
				"%c LFSTORAGE IS READY:",
				"color: green;",
				LFStorage[userId].driver()
			);
		})
		.catch(function (error) {
			console.error("%c LFSTORAGE IS NOT READY:", "color: red;", error);
		});
};

export const destructLFStorage = () => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	if (LFStorage[userId]) {
		LFStorage[userId]
			.dropInstance({
				name: userId,
				storeName: userId,
			})
			.then(function () {
				console.log("Dropped LFStorage for user", userId);
			});

		delete LFStorage[userId];
	}
};

export const clearLFStorage = () => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	if (LFStorage[userId]) {
		LFStorage[userId]
			.clear()
			.then(function () {
				console.log(
					`%c Cleared LFStorage DB for user`,
					"color: green;",
					userId
				);
			})
			.catch((error) => {
				console.error(
					"%c LFStorage Error in clearLFStorage: ====",
					"color: red;",
					error
				);
			});
	}
};

export const saveDataInLFStorage = (key, value) => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	if (LFStorage[userId]) {
		LFStorage[userId]
			.setItem(key, value)
			.then(function (value) {
				console.log(`%c Saved ${key} in LFStorage DB`, "color: green;", value);
			})
			.catch(function (err) {
				console.error("%c LFStorage Error: ====", "color: red;", err);
			});
		return;
	}
};

export const getDataFromLFStorage = async (key) => {
	userId = getAuthData()?.user?.userId || null;
	const value = await LFStorage[userId]
		.getItem(key)
		.then(function (value) {
			return value;
		})
		.catch(function (err) {
			console.error("%c LFStorage Error: ====", "color: red;", err);
			return;
		});

	return value;
};

export const removeDataFromLFStorage = (key) => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	LFStorage[userId]
		.removeItem(key)
		.then(() => {
			return true;
		})
		.catch(function (err) {
			console.error("%c LFStorage Error: ====", "color: red;", err);
			return;
		});
	return;
};

export const getKeysFromLFStorage = () => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	LFStorage[userId]
		.keys()
		.then(function (keys) {
			console.log(keys);
		})
		.catch(function (err) {
			console.error("%c LFStorage Error: ====", "color: red;", err);
		});
};

export const checkKeyExistInLFStorage = async (key) => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}

	const value = await LFStorage[userId]
		.keys()
		.then(function (keys) {
			if (keys.includes(key)) {
				return true;
			}
			return false;
		})
		.catch(function (err) {
			console.error("%c LFStorage Error: ====", "color: red;", err);
		});
	return value;
};

export const iterateLFStorage = (iteratorCallback, successCallback) => {
	if (!userId) {
		userId = getAuthData()?.user?.userId || null;
	}
	if (iteratorCallback) {
		LFStorage[userId]
			.iterate(iteratorCallback, successCallback)
			.then(function () {
				console.log("%c LFStorage iteration has completed", "color: green;");
			})
			.catch(function (err) {
				console.error("%c LFStorage Error: ====", "color: red;", err);
			});
	}
};

export const storeFileInLFStorage = (key, url, fileType) => {
	try {
		axios(url, {
			method: "GET",
			responseType: "blob", //Force to receive data in a Blob Format
		}).then((response) => {
			//Create a Blob from the PDF Stream
			const file = new Blob([response.data], { type: fileType });
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file);
			saveDataInLFStorage(key, fileURL);
		});
	} catch (error) {
		console.error("ERROR in storeFileInLFStorage:", error);
	}
};

export const getFileInLFStorage = (key, fileType, download = false) => {
	try {
		getDataFromLFStorage(key).then((blob) => {
			var url = URL.createObjectURL(
				new window.Blob([blob], { type: fileType })
			);
			if (download) {
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.style = "display: none";
				a.href = url;
				a.download = key + ".pdf";
				a.target = "_blank";
				a.click();
			} else {
				window.open(url);
			}
		});
	} catch (error) {
		console.error("ERROR in storeFileInLFStorage:", error);
	}
};

export const setBotsDependenciesList = async (bots) => {
	try {
		let dependenciesList =
			(await getDataFromLFStorage(LFStorageKeys.DEPENDENCIES)) || [];
		bots.forEach((bot) => {
			Object.entries(bot.dependencies).forEach(([key, value]) => {
				if (!_.isEmpty(value)) {
					let checkDuplicateDependencies = dependenciesList.filter(
						(dependency) =>
							dependency.remoteDependencies === key &&
							dependency.version === value.version
					);
					if (!checkDuplicateDependencies.length) {
						dependenciesList.push({
							...value,
							remoteDependencies: key,
						});
					}
				}
			});
		});
		store.dispatch(showLoader("Setting up dependencies"));
		await Promise.all(
			dependenciesList.map((dependency) => {
				if (!dependency.Content?.length) {
					return GenericAjax.downloadBotFile(
						R.prop("botFilesAPI", Config) + dependency.url
					).then((res) => {
						dependency.Content = res;
					});
				}
				return dependency;
			})
		).then(() => {
			saveDataInLFStorage(LFStorageKeys.DEPENDENCIES, dependenciesList);
			store.dispatch(hideLoader("Setting up dependencies"));
			return dependenciesList;
		});
	} catch (error) {
		console.error(
			"%c Error in setBotsDependenciesList:===",
			"color: red;",
			error
		);
	}
};

export const setAllBotsForSelectedDomainInLFStorage = async (
	domainName,
	bots = []
) => {
	try {
		store.dispatch(showLoader("Setting up Domain"));
		let botsList = _.cloneDeep(bots);
		await Promise.all(
			botsList.map((bot) =>
				GenericAjax.downloadBotFile(R.prop("botFilesAPI", Config) + bot.botUrl)
					.then((res) => {
						bot.botContent = res;
					})
					.catch((err) => {
						console.error(
							`Failed to load bot file content for bot ${bot.botName}: ${bot.botId}`
						);
						console.error("err", err);
					})
			)
		)
			.then(() => {
				let selectedDomain = domainName;
				if (!selectedDomain) {
					const getFromLocalStorage = localStorage.getItem("StoredDomain");
					selectedDomain = JSON.parse(getFromLocalStorage)?.userDomain;
				}
				saveDataInLFStorage(selectedDomain, botsList);
				store.dispatch(hideLoader("Setting up Domain"));
				return botsList;
			})
			.catch((error) => console.log("ERROR:::", error));
	} catch (error) {
		console.error(
			"%c Error in setAllBotsForSelectedDomainInLFStorage:===",
			"color: red;",
			error
		);
	}
};

export const updateBotForSelectedDomainInLFStorage = async (
	domainName,
	bot
) => {
	try {
		store.dispatch(showLoader("Setting up Domain"));
		let botsList = await getDataFromLFStorage(domainName);
		botsList = botsList?.filter((item) => item.botId !== bot.botId);
		GenericAjax.downloadBotFile(
			R.prop("botFilesAPI", Config) + bot.botUrl
		).then((res) => {
			bot.botContent = res;
			saveDataInLFStorage(domainName, [bot, ...botsList]);
			store.dispatch(fetchCompanies());
			store.dispatch(fetchCategories());
			store.dispatch(hideLoader("Setting up Domain"));
			return botsList;
		});
	} catch (error) {
		console.error(
			"%c Error in updateBotForSelectedDomainInLFStorage:===",
			"color: red;",
			error
		);
	}
};

export const loadAllDomainsListInLFStorage = async (domains) => {
	try {
		await saveDataInLFStorage(LFStorageKeys.DOMAINS, domains);
	} catch (error) {
		console.error(
			"%c Error while loading domains and domains details in LFStorage: ====",
			"color: red;",
			error
		);
	}
};

export const updateSelectedDomainInLFStorage = async (selectedDomain) => {
	try {
		let domains = await getDataFromLFStorage(LFStorageKeys.DOMAINS);
		if (domains.length) {
			domains = domains.map((domain) => {
				if (domain.userDomain === selectedDomain) {
					domain.lastLoggedIn = true;
				} else {
					domain.lastLoggedIn = false;
				}
				return domain;
			});
			await saveDataInLFStorage(LFStorageKeys.DOMAINS, domains);
		}
	} catch (error) {
		console.error(
			"%c Error while updateSelectedDomainInLFStorage in LFStorage: ====",
			"color: red;",
			error
		);
	}
};
