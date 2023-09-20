import axios from "axios/index";
import store from "../State/configureStore";
import { NotifyClassComp } from "../Components/ModalMessages/ToastNotif";
import { getAuthData } from "./StorageService";

const request = axios.create({
	timeout: 100000,
});

function getHeaders() {
	// let auth = store.getState().user ? store.getState().user.auth : null;
	let auth = getAuthData();
	if (auth) {
		return {
			token: auth?.token,
		};
	}
}

function get(url) {
	let options = {
		method: "get",
		url: url,
		headers: getHeaders(),
	};
	return request(options).then(handleResponse).catch(handleError);
}

function downloadFile(url) {
	let options = {
		method: "get",
		url: url,
		headers: { ...getHeaders() },
		responseType: "blob",
	};

	return request(options).then(handleResponse).catch(handleError);
}

function downloadBotFile(url) {
	let options = {
		method: "get",
		url: url,
		headers: getHeaders(),
	};

	return request(options).then(handleResponse).catch(handleError);
}

function downloadSignedUrlFile(url) {
	let options = {
		method: "get",
		url: url,
		headers: { ...getHeaders() },
	};

	return request(options).then(handleResponse).catch(handleError);
}

function uploadFile(url, file, contentType, onUploadProgress) {
	let options = {
		method: "post",
		url: url,
		data: file,
		onUploadProgress: onUploadProgress,
	};
	options.headers = { ...getHeaders(), "content-type": contentType };
	return request(options).then(handleResponse).catch(handleError);
}

export default {
	get,
	downloadFile,
	downloadSignedUrlFile,
	uploadFile,
	downloadBotFile,
};

function handleResponse(response) {
	return response.data;
}

function handleError(error) {
	if (!error || !error.response) {
		NotifyClassComp({
			type: "error",
			message: "Network error has occurred. Please try again",
		});
	}

	throw Error;
}
