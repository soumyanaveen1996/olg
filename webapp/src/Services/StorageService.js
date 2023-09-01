import dayjs from "dayjs";
import localforage from "localforage";
import moment from "moment";

let imageStore = localforage.createInstance({
	storeName: "imageStore",
});

export function storeAuthData(data) {
	const myData = { ...data, stored_at: dayjs() };
	localStorage.setItem("LoggedState", JSON.stringify(myData));
}

export function updateAuthData() {
	const authData = getAuthData();
	if (authData && authData.auth) {
		authData.auth.newUser = false;
	}
	const myData = { ...authData, stored_at: dayjs() };
	localStorage.setItem("LoggedState", JSON.stringify(myData));
}

export function storeOpenForm(data) {
	const myData = { ...data };
	localStorage.setItem("openForm", JSON.stringify(myData));
}

export function storeDomainSelected(data) {
	// console.log("store domain ===== ", data);

	const myData = { ...data };
	localStorage.setItem("StoredDomain", JSON.stringify(myData));
}
export function storeLoginState(data) {
	localStorage.setItem("LoginState", data);
}

export function removeLoginState(data) {
	localStorage.removeItem("LoginState", data);
}

export function removeOpenForm() {
	localStorage.removeItem("openForm");
}

export function removeAuthData() {
	localStorage.removeItem("LoggedState");
}
export function removeDomainSelcted() {
	localStorage.removeItem("StoredDomain");
}

export function storeAuthCode(authCode, email) {
	localStorage.setItem("AuthCode", JSON.stringify({ [email]: authCode }));
}

export function setSignupPath(pathName) {
	localStorage.setItem("pathName", pathName);
}

export function setImageFile(imgKey, imgFile) {
	imageStore.setItem(imgKey, imgFile);
}

export const getImageFile = async (imgKey) => {
	try {
		let file = await imageStore.getItem(imgKey);
		return file;
	} catch (error) {
		console.error("file not found", error);
	}
};

export function getStoredForm() {
	let openForm = localStorage.getItem("openForm");
	if (openForm) {
		return JSON.parse(openForm);
	}
}

export function getSignupPath() {
	return localStorage.getItem("pathName");
	// if (signupPath) {
	//   return JSON.parse(signupPath);
	// }
	// return null;
}

export function getAuthCode() {
	let authCode = localStorage.getItem("AuthCode");
	if (authCode) {
		return JSON.parse(authCode);
	}
	return null;
}

export function unsetAuthCode() {
	localStorage.removeItem("AuthCode");
}

export function getAuthData() {
	let stored = localStorage.getItem("LoggedState");
	if (stored) {
		return JSON.parse(stored);
	}
	return null;
}

export function getDomainSelcted() {
	let stored = localStorage.getItem("StoredDomain");
	if (stored) {
		return JSON.parse(stored);
	}
	return null;
}
export function getLoginState() {
	let stored = localStorage.getItem("LoginState");
	if (stored) {
		return stored;
	}
	return null;
}

export function updateDataInStorage(key, value) {
	let data = getAuthData();
	if (data) {
		data[key] = value;
		storeAuthData(data);
	}
}

export function storeUserDetails(userId, user) {
	localStorage.setItem(userId, JSON.stringify(user));
}

export function getStoredUserDetails(userId) {
	let stored = localStorage.getItem(userId);
	if (stored) {
		return JSON.parse(stored);
	}
	return null;
}

export function putInStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
	let stored = localStorage.getItem(key);
	// console.log("stored ======", stored);
	if (stored) {
		return JSON.parse(stored);
	}
	return null;
}

export function removeFromStorage(key) {
	localStorage.removeItem(key);
}

export function removePathName() {
	localStorage.removeItem("pathName");
}

export function storeLinkData(value) {
	putInStorage("linkData", value);
}

export function getLinkData() {
	return getFromStorage("linkData");
}

export function removeLinkData() {
	removeFromStorage("linkData");
}

export function storeFormInLocal(data) {
	putInStorage("storeForm", data);
}

export function getStoreFormFromLocal() {
	return getFromStorage("storeForm");
}

export function removeStoreFormFromLocal() {
	removeFromStorage("storeForm");
}

//  for refresh FC-685
export function storeSelectedConversation(value) {
	putInStorage("SelectedConversation", value);
}

export function getSelectedConversation() {
	return getFromStorage("SelectedConversation");
}

export function removeSelectedConversation() {
	removeFromStorage("SelectedConversation");
}
export function storeSelectedContact(value) {
	console.log("stored value selected contact", value);
	putInStorage("SelectedContact", value);
}

export function getSelectedContact() {
	return getFromStorage("SelectedContact");
}

export function removeSelectedContact() {
	removeFromStorage("SelectedContact");
}

export const setUserOnline = (status) => {
	return localStorage.setItem(`ONLINE`, status);
};

export const isUserOnline = () => {
	let status = localStorage.getItem(`ONLINE`);
	if (status === null) {
		return true;
	}
	return status === "true" ? true : false;
};

export const setUserManualOnline = (status) => {
	return localStorage.setItem(`MANUAL_ONLINE`, status);
};

export const isUserManualOnline = () => {
	let status = localStorage.getItem(`MANUAL_ONLINE`);
	if (status === null) {
		return true;
	}
	return status === "true" ? true : false;
};

export const setUserMessagePoolTimestamp = (timestamp = moment().valueOf()) => {
	return localStorage.setItem("MSG_POOLING_TIMESTAMP", timestamp);
};

export const getUserMessagePoolTimestamp = () => {
	let timestamp = localStorage.getItem("MSG_POOLING_TIMESTAMP");
	if (["null", null, undefined].includes(timestamp)) {
		var now = moment().subtract(2, "weeks").calendar();
		now = moment(now).valueOf();
		return now;
	}
	return parseInt(timestamp);
};
