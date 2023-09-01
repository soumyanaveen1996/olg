"use strict";
import I18n from "i18n-js";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import { getAuthData, getLoginState, getDomainSelcted } from "../../Services/StorageService";
import { logout } from "../../State/actions/user";

const AUTH_PROVIDERS = {
	google: "google",
	frontm: "FrontM",
};

class AuthError extends Error {
	constructor(code, message) {
		super();
		this.code = code;
		this.message = message;
	}

	get code() {
		return this.code;
	}

	get message() {
		return this.message;
	}
}

/**
 * A simple auth wrapper
 */
class Auth {
	constructor() {
		_initialiseProps.call(this);
		// this.user = user || getAuthData().user;
	}
	/**
	 * Auth the user with a given provider (google / facebook etc in future)
	 * @param {string} provider A user object
	 * @param {string} conversationId The bot's conversation id - will be tracked by backend for auth
	 * @param {string} botName The name of the bot that is asking for the auth
	 * @return {Promise}
	 */
	/**
	 * Invalidate the session for now
	 * @return {Promise}
	 */
	/**
	 * A device level method for getting the user session
	 * @param {obj} user A user object
	 * @return {Promise}
	 */
	/**
	 * A device level method for getting the user session
	 * @return {Promise} user
	 */
	/**
	 * A device level method for checking if a User is logged In.
	 * Or a default user session exists.
	 *
	 * @return {Promise} bool
	 */
	/**
	 * Method to update user details like screenName, givenName, surName.
	 * @param {obj} details Method expects a object with screenName, givenName or surName.
	 *  if none of those keys exist, user is not updated.
	 *
	 * @return {Promise} user
	 */
	/**
	 * Method to add domains to the existing user.
	 * @param domains Either a single domain or a list of domains
	 *
	 * @return {Promise} user
	 */
	/**
	 * Invalidate the session for now
	 * @return {Promise}
	 */
	/**
	 * @return Returns Auth Providers
	 */
}

var _initialiseProps = function () {
	this.login = (provider, conversationId, botName) =>
		new Promise((resolve, reject) => {
			if (!AUTH_PROVIDERS[provider]) {
				return reject("Invalid provider. Not supported: ", provider);
			}
			if (provider === AUTH_PROVIDERS.google) {
				return resolve(Auth.loginWithGoogle(conversationId, botName));
			} else {
				return reject("Not supported right now: ", provider);
			}
		});

	this.loginWithGoogle = (conversationId, botName) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.signupWithFrontm = (userDetails) => {
		return new Promise((resolve, reject) => {
			AuthServiceClient.doSignUp(userDetails, (err, result) => {
				if (err) {
					console.log("Error in signupWithFrontm : ", err);
					//   Bugsnag.notify(new Error(JSON.stringify(err)), (report) => {
					//     report.context = "Error in signupWithFrontm";
					//   });
					reject(new AuthError(99, "Error in Authenticating the user"));
				} else {
					console.log("signup result : ", result);
					if (result.success === true) {
						resolve(result.data);
					} else {
						reject(new AuthError(98, result.message));
					}
				}
			});
		});
	};
	this.confirmFrontmSignup = (userDetails) =>
		new Promise((resolve, reject) => {
			AuthServiceClient.doConfirmSignUp(userDetails, (err, result) => {
				if (err) {
					// Bugsnag.notify(new Error(JSON.stringify(err)), (report) => {
					// 	report.context = "Error in confirmFrontmSignup";
					// });
					reject(new AuthError(99, "Error in Authenticating the user"));
				} else {
					console.log("confirm signup result : ", result);
					if (result.success === true) {
						console.log("confirm signup result1 : ", result);
						resolve(result.data);
					} else {
						console.log("confirm signup result2 : ", result);
						reject(new AuthError(98, result.message));
					}
				}
			});
		});

	this.resetPassword = (userDetails) =>
		new Promise((resolve, reject) => {
			AuthServiceClient.resetPassword(userDetails, (err, result) => {
				if (err) {
					// Bugsnag.notify(new Error(JSON.stringify(err)), (report) => {
					// 	report.context = "Error in resetPassword";
					// });
					reject(new AuthError(99, "Error in Authenticating the user"));
				} else {
					console.log("resendFrontmSignupCode signup result : ", result);
					if (result.success === true) {
						resolve(result.data);
					} else {
						reject(
							new AuthError(
								98,
								result.errorCode === "UserNotFoundException"
									? I18n.t("UserNotFoundErrorMessage")
									: result.message
							)
						);
					}
				}
			});
		});

	this.confirmReset = (userDetails) =>
		new Promise((resolve, reject) => {
			AuthServiceClient.confirmPasswordReset(userDetails, (err, result) => {
				if (err) {
					// Bugsnag.notify(new Error(JSON.stringify(err)), (report) => {
					// 	report.context = "Error in confirmReset";
					// });
					reject(new AuthError(99, "Error in Authenticating the user"));
				} else {
					console.log("resendFrontmSignupCode signup result : ", result);
					if (result.success === true) {
						resolve(result.data);
					} else {
						reject(
							new AuthError(
								98,
								result.errorCode === "UserNotFoundException"
									? I18n.t("UserNotFoundErrorMessage")
									: result.message
							)
						);
					}
				}
			});
		});

	this.loginWithFrontm = (userDetails, conversationId, botName) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.setDomains = (domains) =>
		new Promise((resolve, reject) => {
			resolve();
		});

	this.getSelectedDomain = () => { }


	this.deleteUser = () =>
		new Promise((resolve, reject) => {
			resolve();
		});

	this.logout = (argAppType = 'onecare') => {

		return new Promise((resolve, reject) => {
			logout(argAppType);
			resolve();
		})
	};

	this.saveUser = (user) =>
		new Promise((resolve, reject) => {
			if (!user) {
				return reject("Valid user object required");
			}
			// return resolve(DeviceStorage.save(USER_SESSION, user));
			// return resolve(_DeviceStorage.default.save());
			new Promise((resolve) => {
				return resolve();
			});
		});

	this.getUser = () =>
		//ADITYA pass timezone here
		new Promise((resolve) => {
			let userDetails = getAuthData();
			return resolve({
				creds: userDetails.auth,
				info: userDetails.user,
				provider: {
					lastRefreshTime: userDetails.stored_at,
					name: getLoginState(),
				},
				userId: userDetails.user.userId,
			});
		});

	this.isUserLoggedIn = () =>
		new Promise((resolve) => {
			resolve(true);
		});

	this.updateUserDetails = (details) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.addDomains = (domains) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.updatePassword = (payload) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.refresh = (user) =>
		new Promise((resolve, reject) => {
			resolve({});
		});

	this.setUserSetting = (key, value) =>
		new Promise((resolve, reject) => {
			resolve(true);
		});

	this.getUserSetting = (key, defaultValue = undefined) =>
		new Promise((resolve, reject) => {
			resolve(true);
		});

	this.authProviders = () => {
		return AUTH_PROVIDERS;
	};
};

const AuthErrorCodes = {
	0: "User cancelled",
	1: "Error in saving Auth Session",
	2: "Logout Error",
	98: "Custom Error",
	99: "Unknown error",
};
export { AuthError, AUTH_PROVIDERS, Auth, AuthErrorCodes };
