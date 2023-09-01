import axios from "axios/index";
import Config from "../Utils/Config";
import store from "./../State/configureStore";
import { showSpinner, hideSpinner } from "../State/actions/spinner";
import Notify from "../Components/ModalMessages/ToastNotif";

const { baseURL } = Config;
const request = axios.create({
	baseURL,
	timeout: 100000,
});

// const requestWithoutBase = axios.create({
//   timeout: 100000
// });

function getHeaders() {
	let auth = store.getState().user ? store.getState().user.auth : null;
	if (auth) {
		return {
			// accesskeyid: auth.accessKeyId,
			// secretaccesskey: auth.secretAccessKey,
			// sessiontoken: auth.sessionToken
			sessionId: auth.sessionId,
		};
	}
}

function get(url, params, blob, noSpinner) {
	let options = {
		method: "get",
		url: url,
	};
	if (params) {
		options.params = params;
	}
	if (getHeaders()) {
		options.headers = getHeaders();
	}

	if (blob) {
		options.responseType = "blob";
	}
	if (!noSpinner) store.dispatch(showSpinner());
	return request(options).then(handleResponse).catch(handleError);
}

function fetchFileFromS3(url) {
	return fetch(url, { mode: "no-cors" })
		.then((response) => response.blob())
		.then((blobRes) => {
			return URL.createObjectURL(blobRes);
		});

	// let options = {
	//   method: "GET",
	//   url: url,
	//   responseType: "blob"
	// };
	//
	// if (!noSpinner) store.dispatch(showSpinner());
	// return axios(options)
	//   .then(handleResponse)
	//   .catch(handleError);
}

function post(url, data, headerParams, noSpinner) {
	let options = {
		method: "post",
		url: url,
		data: data,
	};
	headerParams = headerParams || getHeaders();
	if (headerParams) {
		options.headers = headerParams;
	}
	if (!noSpinner) store.dispatch(showSpinner());
	return request(options).then(handleResponse).catch(handleError);
}

function put(url, data, headerParams, noSpinner) {
	let options = {
		method: "put",
		url: url,
		data: data,
	};
	headerParams = headerParams || getHeaders();
	if (headerParams) {
		options.headers = headerParams;
	}
	if (!noSpinner) store.dispatch(showSpinner());
	return request(options).then(handleResponse).catch(handleError);
}

function upload(url, folder, fileName, file, onUploadProgress) {
	let formData = new FormData();
	formData.append("folderName", folder);
	formData.append("fileName", fileName);
	formData.append("file", file);
	let options = {
		method: "post",
		url: url,
		data: formData,
		onUploadProgress: onUploadProgress,
	};

	let headers = getHeaders();
	if (headers) {
		options.headers = headers;
	}
	options.headers["Content-Type"] = "multipart/form-data";
	return request(options)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
}

export default {
	get: get,
	post: post,
	put: put,
	upload: upload,
	fetchFileFromS3: fetchFileFromS3,
};

function handleResponse(response) {
	store.dispatch(hideSpinner());
	return response.data;
}

function handleError(error) {
	store.dispatch(hideSpinner());
	if (!error || !error.response) {
		Notify({
			type: "error",
			message: "Network error has occurred. Please try again",
		});
	} else if (
		error.response.status === 400 ||
		error.response.status === 401 ||
		error.response.status === 422 ||
		error.response.status === 500
	) {
		// Notify({
		//   type: "error",
		//   message: "You've been logged out. Please login again."
		// });
		// store.dispatch(logout());
		console.log("API failure ajax error code  ", error.response.status);
	}

	throw Error;
}
