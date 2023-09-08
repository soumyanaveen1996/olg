import store from "../../State/configureStore";
import { showSpinner, hideSpinner } from "../../State/actions/spinner";
import { logout } from "../../State/actions/user";
import {
	setBannerVisibility,
	setCounter,
} from "../../State/actions/offlineBanner";
import Config from "./../../Utils/Config";

export default class ServiceClientUtils {
	static requestInterceptor(noSpinner) {
		if (!noSpinner) {
			store.dispatch(showSpinner());
		}
	}

	static handleResponse(response) {
		if (!response) {
			console.error("ERRROR NO RESPONSE", response);
			return;
		}

		if (
			(Object.prototype.hasOwnProperty.call(response, "success") &&
				!response.success) ||
			(Object.prototype.hasOwnProperty.call(response, "error") &&
				response.error !== 0)
		) {
			if (
				response.message &&
				response.message ===
					"Missing required parameter SOFTWARE_TOKEN_MFA_CODE"
			) {
				return response;
			}

			if (
				response.errorCode &&
				response.errorCode === "InvalidParameterException"
			) {
				response.message = "Invalid Email";
			}

			if (response.message === "Username/client id combination not found.") {
				response.message = "The email address doesn't exist";
			}

			if (response.error === 98) {
				console.error("Error 98: ", response);
				if (
					response.errorMessage &&
					response.content &&
					response.content.length === 0
				) {
					let errorRespnse = {
						errorCode: response.error,
						errorMessage: response.errorMessage,
					};
					throw errorRespnse;
				}
			}
		}
		store.dispatch(hideSpinner());
		return response;
	}

	static handleError(error, url) {
		store.dispatch(hideSpinner());
		if (error && error.code === 14) {
			console.error("API ERROR @ 14: ", error.message);
			store.dispatch(setBannerVisibility(true));
			store.dispatch(setCounter(5));
		} else {
			let message =
				error && error.message
					? error.message
					: "Server error has occurred. Please try again";
			if (Config.envName === "dev") {
				message += ". URL= " + url;
			}
			let auth = store.getState().user ? store.getState().user.auth : null;
			if (!auth) {
				return;
			}
			console.error("API ERROR: ", message);
		}

		if (error.message === "UNAUTHORIZED") {
			console.error("API ERROR @ UNAUTHORIZED: ", error.message);
			store.dispatch(logout());
		}
		throw Error;
	}

	static parseBytesContent(content) {
		if (content && content.data && content.data.length > 0) {
			let utf8decoder = new TextDecoder();
			return JSON.parse(utf8decoder.decode(new Uint8Array(content.data)));
		}
		return content;
	}
}
