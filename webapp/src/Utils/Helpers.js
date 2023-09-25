import ShortUUID from "short-uuid";
import dayjs from "dayjs";
import Fingerprint2 from "fingerprintjs2";
import sha1 from "sha1";
import { MessageTypeConstants } from "../Services/Message";
const R = require("ramda");

export const spaceToUnderscore = (value) =>
	value.trim().split(" ").length > 1
		? value.trim().split(" ").join("_")
		: value;

export function createUUID() {
	let uuid = ShortUUID.uuid();
	return ShortUUID().fromUUID(uuid);
}

export function getDateTimeString(createdOn) {
	let messageDate = dayjs(createdOn);
	let currentDate = dayjs();

	if (currentDate.endOf("day").diff(messageDate.endOf("day"), "days") === 0) {
		return messageDate.format("HH:mm");
	}

	if (currentDate.endOf("day").diff(messageDate.endOf("day"), "days") === 1) {
		return "Yesterday, " + messageDate.format("HH:mm");
	}

	if (currentDate.year() === messageDate.year()) {
		return messageDate.format("ddd, D MMM HH:mm");
	}

	return messageDate.format("ddd, D MMM YYYY HH:mm");
}

export function computeElapsedTime(modifiedOn) {
	const date1 = dayjs();
	const date2 = dayjs(modifiedOn);
	if (date1.diff(date2, "days") === 1) {
		return "1d";
	}
	if (date1.diff(date2, "days") > 1) {
		return date2.format("DD MMM");
	}

	if (date1.diff(date2, "hours") >= 1) {
		return date1.diff(date2, "hours") + "h";
	} else {
		if (date1.diff(date2, "minutes") === 0) {
			return "just now";
		}
		return date1.diff(date2, "minutes") + "m";
	}
}

export function urlB64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function getDeviceId() {
	return new Promise(function (resolve, reject) {
		new Fingerprint2.get({ extendedJsFonts: true }, function (result) {
			resolve(result);
		});
	});
}

export function getUpdatedSubscriptions(subscriptions = [], subscription) {
	let extIndex = subscriptions.findIndex((sub) => {
		return sub.deviceId === subscription.deviceId;
	});

	if (extIndex === -1) {
		if (subscription) {
			subscriptions.push(subscription);
			return subscriptions;
		}
	}
	if (subscription.subscription) {
		subscriptions[extIndex] = subscription;
	} else {
		subscriptions.splice(extIndex);
	}

	return subscriptions;
}

export const createConversationId = (userId, botId) => {
	let ids = [userId, botId];
	ids.sort();
	const text = ids.join("-");
	return userId.substr(0, 10) + "-" + sha1(text).substr(0, 12);
};

export const getStripeAmount = (amount) =>
	(Math.round(amount * 100) / 100) * 100;

export const isMobileDevice = () => {
	let orientation = window.orientation;
	let orientation_name = "";

	switch (orientation) {
		case 0:
		case 180:
			orientation_name = ORIENTATION.PORTRAIT;
			break;
		case 90:
		case 270:
			orientation_name = ORIENTATION.LANDSCAPE;
			break;
		default:
			orientation_name = ORIENTATION.PORTRAIT;
	}

	if (
		orientation_name === ORIENTATION.PORTRAIT &&
		window.innerHeight < 1000 &&
		window.innerWidth < 600
	) {
		return {
			isMobile: true,
			orientation: ORIENTATION.PORTRAIT,
		};
	}
	if (
		orientation_name === ORIENTATION.LANDSCAPE &&
		window.innerHeight < 600 &&
		window.innerWidth < 1000
	) {
		return {
			isMobile: true,
			orientation: ORIENTATION.LANDSCAPE,
		};
	}

	return {
		isMobile: false,
	};
};

export const ORIENTATION = {
	PORTRAIT: "portrait",
	LANDSCAPE: "landscape",
};

export const isIpad = () => {
	let isiPad = navigator.userAgent.match(/iPad/i) !== null;
	let isEdge = false;
	if (window.navigator.userAgent.indexOf("Edge") > -1) {
		isEdge = true;
	}

	if (isiPad) {
		return true;
	} else {
		return false;
	}
};

export const getNameAcronym = (name) => {
	if (name.length === 0) {
		return "";
	}

	var matches = name.match(/\b(\w)/g); // ['J','S','O','N']

	var acronym = matches.join(""); // JSON
	acronym = matches.length > 1 ? R.take(2, matches) : matches;
	acronym = acronym.join("");

	return acronym;
};

export const validURL = (str) => {
	var pattern = new RegExp(
		"^(http(s)?:\\/\\/)?" + // protocol
		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	// return !!pattern.test(str);

	// change the URL checking function by using new URL()
	try {
		if (typeof new URL(str) === "object") {
			return true;
		}
	} catch (err) {
		return false;
	}
};

// Helper to dynamically loading manifest.json default to frontM manifest.json
export const updateManifestFile = (manifestFileUrl = "./manifest.json") => {
	document.getElementById("manifest-details").remove();
	var link = document.createElement("link");
	link.id = "manifest-details";
	link.rel = "manifest";
	link.href = manifestFileUrl;
	document.head.appendChild(link);

	var favicon = document.querySelector("link[rel~='icon']");
	if (!favicon) {
		favicon = document.createElement("link");
		favicon.rel = "icon";
		document.head.appendChild(favicon);
	}

	if (manifestFileUrl === "./seamplify-manifest.json") {
		favicon.href = window.location.origin + "/offlinelms/img/seamplify-favicon.ico";
	} else if (manifestFileUrl === "./thuraya-sattrack-manifest.json") {
		favicon.href = window.location.origin + "/offlinelms/img/icon-16x16.ico";
	} else if (manifestFileUrl === "./oneCare-manifest.json") {
		favicon.href = window.location.origin + "/offlinelms/img/oneCare.ico";
	} else if (manifestFileUrl === "./stationSatcom-manifest.json") {
		favicon.href = window.location.origin + "/offlinelms/img/satComFav.ico";
	} else {
		favicon.href = window.location.origin + "/favicon.png";
	}
};

export const chatDayFormats = {
	sameDay: "[Today]",
	nextDay: "[Tomorrow]",
	nextWeek: "dddd",
	lastDay: "[Yesterday]",
	lastWeek: "[Last] dddd",
	sameElse: "DD/MM/YYYY",
};

export function isNormalMessage(type) {
	return (
		type === MessageTypeConstants.MESSAGE_TYPE_STRING ||
		type === MessageTypeConstants.MESSAGE_TYPE_CARD_RESPONSE ||
		type === MessageTypeConstants.MESSAGE_TYPE_WAIT ||
		type === MessageTypeConstants.MESSAGE_TYPE_BUTTON_RESPONSE ||
		type === MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD
	);
}

export function isNotificationMessage(type) {
	return (
		type === MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION ||
		type === MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION ||
		type === MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST
	);
}
