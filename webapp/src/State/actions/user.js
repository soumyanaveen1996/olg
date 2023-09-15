import {
	storeAuthData,
	removeAuthData,
	removeFromStorage,
	storeDomainSelected,
	removeDomainSelcted,
	storeLoginState,
	removeLoginState,
	removeOpenForm,
	updateAuthData,
	removeSelectedConversation,
	removeLinkData,
	getSignupPath,
	removePathName,
	setUserOnline,
	setUserManualOnline,
} from "../../Services/StorageService";
import _ from "lodash";
import history from "./../../Services/History";
import Notify from "../../Components/ModalMessages/ToastNotif";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import ConversationServiceClient from "../../Services/Clients/ConversationServiceClient";
import { fetchSubscribedChannels, fetchAllChannels } from "./channels";
import Config from "../../Utils/Config";
import {
	getFavourite,
	getTimeLine,
	streamChatMessages,
} from "../actions/chats";
import axios from "axios";
import { fetchContacts } from "./contacts";
import {
	fetchWalletBalance,
	getPaginatedCallHistory,
} from "../../Services/VoipServices";

import { getCallHistoryForSelectedContact } from "../../Services/VoipServices";
import { getProfilePhoto } from "../../Services/FilesService";
import {
	initiateLFStorage,
	setAllBotsForSelectedDomainInLFStorage,
	loadAllDomainsListInLFStorage,
	getDataFromLFStorage,
	LFStorageKeys,
	setBotsDependenciesList,
	updateBotForSelectedDomainInLFStorage,
} from "../../Services/LFStorage";

import Toast from "../../Components/ModalMessages/Toast";
import {
	FRONTM_DOMAIN,
	FRONTM_LANDING,
	FRONTM_LOGIN,
	HELPER_MESSAGE,
	ONECARE,
	onecare_pushkey,
	ONECARE_STAGE,
	SOCKET,
	VIKAND_DIRECT,
	vikand_direct_pushkey,
	VIKAND_DIRECT_STAGE,
} from "../../Utils/Constants";
import appType from "../../Utils/ApiConfig";
import { dequeueFileUpload } from "../../v2/Containers/NonConversational/NonConversationalHelpers/NonConversationalHelpers";
import { resetNonConversational } from "../../v2/Containers/NonConversational/Store/NonConversationalAction";
import { setBannerVisibility } from "./offlineBanner";
import AudioElement from "../../Utils/AudioElement";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";
import Error from "../../Components/Common/Error";

export const USER_LOGGED_IN = "USER_LOGGED_IN";

export const USER_GEOLOCATION_DATA = "USER_GEOLOCATION_DATA";
export const USER_LOG_IN_ERROR = "USER_LOG_IN_ERROR";
export const REMOVE_USER_LOG_IN_ERROR = "REMOVE_USER_LOG_IN_ERROR";
export const BOT_SUBSCRIPTIONS_RECEIVED = "BOT_SUBSCRIPTIONS_RECEIVED";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const TERMS_AND_CONDITIONS_ACCEPTED = "TERMS_AND_CONDITIONS_ACCEPTED";
export const DOMAIN_RECEIVED = "DOMAIN_RECEIVED";
export const SELECTED_DOMAIN = "SELECTED_DOMAIN";
export const UPDATE_DOMAIN = "UPDATE_DOMAIN";
export const DOMAIN_SELECTED_IN = "DOMAIN_SELECTED_IN";
export const GENERATING_PUSH_NOTIFICATIONS = "GENERATING_PUSH_NOTIFICATIONS";
export const DE_GENERATING_PUSH_NOTIFICATIONS =
	"DE_GENERATING_PUSH_NOTIFICATIONS";
export const UPDATE_PHONE_BALANCE = "UPDATE_PHONE_BALANCE";
export const UPDATE_CALL_HISTORY = "UPDATE_CALL_HISTORY";
export const PROFILE_IMAGE = "PROFILE_IMAGE";
export const UPDATE_USER_AUTH_DATA = "UPDATE_USER_AUTH_DATA";
export const UPDATE_LOGIN_METHOD = "UPDATE_LOGIN_METHOD";
export const UPDATE_BANNER = "UPDATE_BANNER";
export const REMOVE_SELECTED_DOMAIN = "REMOVE_SELECTED_DOMAIN";
export const REMOVE_SUBSCRIBED_BOTS = "REMOVE_SUBSCRIBED_BOTS";
export const REMOVE_DOMAINS = "REMOVE_DOMAINS";
export const FORM_UNSAVED = "FORM_UNSAVED";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const UPDATE_LOGGED_IN_USER_CALL_HISTORY =
	"UPDATE_LOGGED_IN_USER_CALL_HISTORY";
export const CLEAR_LOGGED_IN_USER_CALL_HISTORY =
	"CLEAR_LOGGED_IN_USER_CALL_HISTORY";
export const UPDATE_SELECTED_CONTACT_CALL_HISTORY =
	"UPDATE_SELECTED_CONTACT_CALL_HISTORY";
export const SET_REFRESH_ANONYMOUS_SESSION_FLAG =
	"SET_REFRESH_ANONYMOUS_SESSION_FLAG";
export const SHOW_ERROR_PAGE = "SHOW_ERROR_PAGE";
export const SHOW_SESSION_EXPIRED = "SHOW_SESSION_EXPIRED";
export const SET_CALL_QUALITY = "SET_CALL_QUALITY";
export const VOIP_STATUS = "VOIP_STATUS";
export const LICENSE_STATUS = "LICENSE_STATUS";
export const USER_ONLINE_STATUS = "USER_ONLINE_STATUS";
export const UPDATE_IS_IDLE_STATUS = "UPDATE_IS_IDLE_STATUS";
export const UPDATE_SOFTWARE_MFA_STATUS = "UPDATE_SOFTWARE_MFA_STATUS";
export const UPDATE_QR_CODE_URI = "UPDATE_QR_CODE_URI";
export const UPDATE_SOFTWARE_MFA = "UPDATE_SOFTWARE_MFA";
export const UPDATE_BOTID_MFA = "UPDATE_BOTID_MFA";
export const ENABLE_2FA_AUTH_MODAL = "ENABLE_2FA_AUTH_MODAL";

const R = require("ramda");

export function doFrontMLogin(email, password, otpToken = null, callback) {
	return (dispatch) => {
		let typeOfApp = appType;
		let doFrontMLoginObj = {
			email,
			password,
			platform: "web",
		};
		if (typeOfApp) {
			doFrontMLoginObj = {
				email,
				password,
				platform: "web",
				appType: typeOfApp,
			};
		}

		if (otpToken) {
			doFrontMLoginObj["otpToken"] = otpToken;
		}

		return AuthServiceClient.doFrontMLogin(doFrontMLoginObj)
			.then(async (response) => {
				if (response.success) {
					const { user, sessionId, newUser } = response;

					if (user.softwareMfaEnabled) {
						dispatch(updateSoftwareMfaEnabled(true));
					}

					await dispatch(updateLoginMethod("frontm"));
					await dispatch(onSuccessfulAuth(user, sessionId, newUser, false));
					await getProfilePhoto(user.userId + "_75x75.png").catch((err) => {
						console.error("no profile image", err);
					});
					await dispatch(getAllDomains());
					await dispatch(fetchWalletBalanceService());
					await callback(null);
				} else {
					const error = response?.message;
					if (
						error === "Missing required parameter SOFTWARE_TOKEN_MFA_CODE" ||
						error?.message ===
							"Missing required parameter SOFTWARE_TOKEN_MFA_CODE"
					) {
						callback("Missing required parameter SOFTWARE_TOKEN_MFA_CODE");
					} else {
						let message = response?.message;
						if (message && message.includes("confirmed")) {
							callback(message);
						} else {
							callback(message);
							dispatch({ type: USER_LOG_IN_ERROR, data: { message } });
						}
					}
				}
			})
			.catch((error) => {
				console.error("doFrontMLogin: ", error);
				if (
					error === "Missing required parameter SOFTWARE_TOKEN_MFA_CODE" ||
					error.message === "Missing required parameter SOFTWARE_TOKEN_MFA_CODE"
				) {
					callback("Missing required parameter SOFTWARE_TOKEN_MFA_CODE");
				} else {
					let message = error.message;
					if (message && message.includes("confirmed")) {
						callback(message);
					} else {
						callback(message);
						dispatch({ type: USER_LOG_IN_ERROR, data: { message } });
					}
				}
				// dispatch({ type: USER_LOG_IN_ERROR, data: { message: error.message } });
			});
	};
}

export function removeUserLoginError() {
	return (dispatch) => {
		dispatch({
			type: REMOVE_USER_LOG_IN_ERROR,
		});
	};
}

export function getGeoLocationData() {
	const ipURL = "https://ipapi.co/json/";
	return (dispatch) => {
		return axios
			.get(ipURL)
			.then((response) => {
				let data = response.data;

				let geoData = {
					country: data.country || "",
					country_calling_code: data.country_calling_code || "",
					country_name: data.country_name || "",
					currency: data.currency || "",
					languages: data.languages.split(",")[0] || "",
				};

				dispatch({ type: USER_GEOLOCATION_DATA, data: { ...geoData } });
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

export function getVoipStatus() {
	return (dispatch, getState) => {
		let userIdData = {
			userId: getState()?.user?.user?.userId,
		};
		UserServiceClient.GetVoipStatus(userIdData)
			.then((response) => {
				dispatch({
					type: VOIP_STATUS,
					data: response,
				});
			})
			.catch((error) => {
				console.error("error on voip status", error);
			});
	};
}

export function setSelectedDomain(data) {
	return (dispatch) => {
		dispatch(removeSelectedDomain());
		let newData = _.cloneDeep(data);

		let selectedDomain = {
			selectedDomain: newData.userDomain,
		};

		UserServiceClient.getDomain().then((response) => {
			if (response.domains) {
				let allDomains = response.domains;
				if (data.lockInUsers) {
					//when lockInUsers true dropdown will show the Plus but hiding frontm.ai
					_.remove(allDomains, (domain) => {
						return domain.userDomain === "frontmai";
					});
				}
				dispatch({
					type: DOMAIN_RECEIVED,
					data: { domains: response },
				});
			}
		});

		dispatch({
			type: SELECTED_DOMAIN,
			data: { selectedDomain: newData },
		});
		dispatch(getTimeLine("domainChange"));
		dispatch(getFavourite(selectedDomain));
		dispatch(fetchContacts(selectedDomain));
		dispatch(fetchBotSubscriptions(selectedDomain));
		dispatch(fetchSubscribedChannels(selectedDomain));
		dispatch(fetchAllChannels(selectedDomain));
	};
}

export function isCorporateLicenseValid(isValid) {
	return {
		type: LICENSE_STATUS,
		data: isValid,
	};
}

export async function selectedUserDomain() {
	let lastLoginDomain = null;
	await UserServiceClient.getDomain().then((response) => {
		response.domains.forEach((elem) => {
			if (elem.lastLoggedIn) {
				lastLoginDomain = elem;
			}
		});
	});

	return lastLoginDomain;
}

export function getAllDomains() {
	return async (dispatch) => {
		try {
			// let domainsList = await getDataFromLFStorage(LFStorageKeys.DOMAINS);
			// if (!domainsList?.length) {
			// 	let domainsListRes = await UserServiceClient.getDomain();
			// 	domainsList = domainsListRes.domains;
			// 	if (getSignupPath() !== "/login") {
			// 		domainsList = domainsList.filter(
			// 			(domain) => domain.userDomain !== FRONTM_DOMAIN
			// 		);
			// 		loadAllDomainsListInLFStorage(domainsList);
			// 	} else {
			// 		loadAllDomainsListInLFStorage(domainsList);
			// 	}
			// }

			// // dispatch(removeSelectedDomain());
			// let isLastLogin = false;
			// let lastLoginDomain = null;

			// domainsList.forEach((elem) => {
			// 	if (elem && elem.lastLoggedIn) {
			// 		isLastLogin = true;
			// 		lastLoginDomain = elem;
			// 	}
			// });

			// let lastLoggedInDomain = _.cloneDeep(lastLoginDomain);
			// let responseDomain = _.cloneDeep(domainsList[0]);

			// if (lastLoggedInDomain && lastLoggedInDomain.lockInUsers) {
			// 	//when lockInUsers true dropdown will show the Plus but hiding frontm.ai
			// 	let allDomains = _.cloneDeep(domainsList);
			// 	_.remove(allDomains, (domain) => {
			// 		return domain.userDomain === "frontmai";
			// 	});
			// 	domainsList = allDomains;
			// }

			// if (isLastLogin) {
			// 	dispatch({
			// 		type: SELECTED_DOMAIN,
			// 		data: { selectedDomain: lastLoggedInDomain },
			// 	});
			// } else {
			// 	dispatch({
			// 		type: SELECTED_DOMAIN,
			// 		data: { selectedDomain: responseDomain },
			// 	});
			// }
			// dispatch(onFirstSelectDomain(lastLoggedInDomain));
			// dispatch(getVoipStatus());
			// dispatch({
			// 	type: DOMAIN_RECEIVED,
			// 	data: { domains: { domains: domainsList } },
			// });
		} catch (error) {
			console.error("%c Error in getAllDomains: ", "color: red;", error);
		}
	};
}

export function setAllDomanins(data) {
	return (dispatch) => {
		dispatch({
			type: DOMAIN_RECEIVED,
			data: { domains: data },
		});
	};
}

export function doAnonymousAuth(urlDomain, botId, callback) {
	return (dispatch) => {
		let typeOfApp = appType;
		let createAnonymousAccessObj = {};
		if (typeOfApp) {
			createAnonymousAccessObj = {
				urlDomain: `${urlDomain}/${botId}`,
				botId: botId,
				platform: "web",
				appType: typeOfApp,
			};
		} else {
			createAnonymousAccessObj = {
				urlDomain: `${urlDomain}/${botId}`,
				botId: botId,
				platform: "web",
			};
		}

		return AuthServiceClient.createAnonymousAccess(createAnonymousAccessObj)
			.then(async (response) => {
				const { user, sessionId, newUser, success, message } = response;
				// Here we show the bot only with valid botID in the deepLink URL
				if (success) {
					await dispatch(onSuccessfulAuth(user, sessionId, newUser, true));
					await dispatch(getAllDomains());
					callback && callback(null);
				} else {
					// If you use random/invalid botID in the deeplink URL 
					Toast({ type: "error", message: message, autoClose: 4000 });
					// Since showErrorPage() is a root component, we use setTimeout so that toast message is displayed
					setTimeout(() => {
						dispatch(showErrorPage());
						callback && callback(message);
					}, 4000);
				}
			})
			.catch((e) => {
				let message = e.message;
				console.error("doAnonymousAuth error:", message);
				dispatch(showErrorPage());
				// Toast({
				//   type: "error",
				//   message: message,
				//   autoClose: 4000
				// });
				callback && callback(message);
			});
	};
}

export function showErrorPage() {
	return {
		type: SHOW_ERROR_PAGE,
	};
}

export function showSessionExpiredModal(data) {
	return {
		type: SHOW_SESSION_EXPIRED,
		data
	};
}

export function refreshAnonymousUserSession(callback) {
	return (dispatch) => {
		dispatch(setFlagForRefreshAnonymousSessionCall(true));
		let typeOfApp = appType;
		let dataObj = {};
		if (typeOfApp) {
			dataObj = {
				appType: typeOfApp,
			};
		}
		return AuthServiceClient.refreshAnonymousUserSession(dataObj)
			.then(() => {
				updateAuthData();
				callback && callback(null);
			})
			.catch((error) => {
				let message = error.message;
				console.error(
					"error while anonymous user session refresh :: ",
					JSON.stringify(error.message)
				);
				Toast({
					type: "error",
					message: message,
					autoClose: 4000,
				});
				callback && callback(message);
			})
			.finally(() => {
				dispatch(setFlagForRefreshAnonymousSessionCall(false));
			});
	};
}

const activateEnterpriseBotAndSetLastLoggedInDomain = () => {
	let message = null;
	const authCode = R.prop("onshipDomain", Config);
	return activateEnterpriseBots(authCode).then((activateResponse) => {
		let { content, error, errorMessage } = activateResponse;
		if (error !== 0 || content.length === 0) {
			message = errorMessage
				? errorMessage + ". " + HELPER_MESSAGE
				: HELPER_MESSAGE;
			return updateLastLoggedInDomain(FRONTM_DOMAIN).then(() => {
				if (message) {
					throw new Error(message);
				}
			});
		} else {
			const domains = content;
			let corporateDomainList = domains.filter((domain) => {
				return domain.userDomain !== FRONTM_DOMAIN;
			});
			loadAllDomainsListInLFStorage(corporateDomainList);
			let corporateDomain =
				corporateDomainList.length > 0 ? corporateDomainList[0].userDomain : "";
			if (corporateDomain.length === 0) {
				message = HELPER_MESSAGE;
				corporateDomain = FRONTM_DOMAIN;
			}
			return updateLastLoggedInDomain(corporateDomain).then(() => {
				if (message) {
					throw new Error();
				}
			});
		}
	});
};

export function doGoogleAuth(code, callback) {
	return (dispatch) => {
		return AuthServiceClient.doGoogleLogin(code, appType)
			.then((response) => {
				if (response.success) {
					dispatch(updateLoginMethod("google"));
					const { user, sessionId, newUser } = response;
					dispatch(onSuccessfulAuth(user, sessionId, newUser, false));
					dispatch(getAllDomains());
					if (newUser) {
						activateEnterpriseBotAndSetLastLoggedInDomain()
							.then((response) => {
								callback(null);
							})
							.catch((error) => {
								Toast({
									type: "error",
									message: error?.message || "Something went wrong",
									autoClose: 4000,
								});
							});
					} else {
						callback(null);
					}
				} else {
					Toast({
						type: "error",
						message: response.message,
						autoClose: 4000,
					});
					throw new Error(response.message);
				}
			})
			.catch((e) => {
				Toast({
					type: "error",
					message: e.message,
					autoClose: 4000,
				});
				// Notify({ type: "error", message: e.message });
			});
	};
}

export function updateAuthUser(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_USER_AUTH_DATA,
			data: { newUser: data },
		});
	};
}

export function updateLoginMethod(data) {
	storeLoginState(data);
	return (dispatch) => {
		dispatch({
			type: UPDATE_LOGIN_METHOD,
			data: {
				data,
			},
		});
	};
}

export function pushNotificationGenerator(data) {
	return {
		type: GENERATING_PUSH_NOTIFICATIONS,
		data,
	};
}

export function pushNotificationDegerator(data) {
	return {
		type: DE_GENERATING_PUSH_NOTIFICATIONS,
		data,
	};
}

export function pushNotificationsApiRequest(data) {
	let { currentUserDomain, sessionId, webPushAppType, userEmail, baseURL } =
		data;
	let pushKey;
	if (currentUserDomain === ONECARE || currentUserDomain === ONECARE_STAGE) {
		pushKey = onecare_pushkey;
	}

	if (
		currentUserDomain === VIKAND_DIRECT ||
		currentUserDomain === VIKAND_DIRECT_STAGE
	) {
		pushKey = vikand_direct_pushkey;
	}

	const config = {
		pushKey,
	};
	async function subscribe(topic) {
		let swReg = await navigator.serviceWorker.register("/sw.js");

		const subscription = await swReg.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlB64ToUint8Array(config.pushKey),
		});

		if (!subscription) {
			navigator.serviceWorker.ready.then((reg) => {
				reg.pushManager.getSubscription().then((subscription) => {
					subscription
						.unsubscribe()
						.then((successful) => {})
						.catch((e) => {});
				});
			});
		}

		if (subscription) {
			// Posting a request to grpc using axios once we get the subscription

			let data = JSON.stringify({
				subscriptionEndpoint: JSON.stringify(subscription),
				webPushAppType: webPushAppType,
			});

			let config = {
				method: "post",
				url: baseURL,
				headers: {
					"Content-Type": "application/json",
					sessionId: sessionId,
				},
				data: data,
			};

			axios(config)
				.then(function (response) {})
				.catch(function (error) {});
		}
	}
	function urlB64ToUint8Array(base64String) {
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
	subscribe(userEmail);
}

function onFirstSelectDomain(data) {
	storeDomainSelected(data);
	return {
		type: DOMAIN_SELECTED_IN,
		data: {
			selectedDomain: data,
		},
	};
}
export function onSelectDomain(data) {
	return {
		type: DOMAIN_SELECTED_IN,
		data: {
			selectedDomain: data,
		},
	};
}

export function setFlagForRefreshAnonymousSessionCall(status) {
	return {
		type: SET_REFRESH_ANONYMOUS_SESSION_FLAG,
		data: status,
	};
}

export function removeSelectedDomain() {
	return {
		type: REMOVE_SELECTED_DOMAIN,
	};
}

export function removeSubscribedBotList() {
	return {
		type: REMOVE_SUBSCRIBED_BOTS,
	};
}
export function removeDomains() {
	return {
		type: REMOVE_DOMAINS,
	};
}

export function updateSoftwareMfaStatus(status) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_SOFTWARE_MFA_STATUS,
			status,
		});
	};
}

export function updateIsIdleStatus(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_IS_IDLE_STATUS,
			data,
		});
	};
}
export function updateQrCodeUri(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_QR_CODE_URI,
			data,
		});
	};
}

export function updateSoftwareMfaEnabled(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_SOFTWARE_MFA,
			data,
		});
	};
}
export function updateBotIdForMFA(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_BOTID_MFA,
			data,
		});
	};
}

function onSuccessfulAuth(user, sessionId, newUser, isAnonymousUser) {
	initiateLFStorage(user);
	storeAuthData({
		user,
		auth: {
			sessionId,
			newUser,
		},
		isAnonymousUser: isAnonymousUser,
	});

	return {
		type: USER_LOGGED_IN,
		data: {
			user,
			auth: {
				sessionId,
				newUser,
			},
			isAnonymousUser: isAnonymousUser,
		},
	};
}

export function hydrateUserData(data) {
	return {
		type: USER_LOGGED_IN,
		data: data,
	};
}

export function fetchBotSubscriptions(
	domain,
	botId = null,
	forceUpdate = false,
	updateNow,
	type = ""
) {
	return async (dispatch) => {
		try {
			let selectedDomain = domain.selectedDomain || domain.userDomain;
			let botsList = await getDataFromLFStorage(selectedDomain);
			let botsListRes = "";
			if (!botsList?.length || forceUpdate) {
				try {
					botsListRes = await UserServiceClient.getBotSubscriptionsInfo(domain);
				} catch (error) {
					console.error("Error in fetchBotSubscriptions: ", error);
				}
				const allSystemBots = await UserServiceClient.getAllSystemBots();

				// add the IM-BOT stuff here
				allSystemBots.content.Items.forEach((item) => {
					if (item.botId === "im-bot" || item.botId === "onboarding-bot") {
						item.botClients.web = true;
						botsListRes.content.subscribed.push(item);
					}
				});

				if (botsListRes.error) {
					dispatch({
						type: BOT_SUBSCRIPTIONS_RECEIVED,
						data: { botSubscriptions: [] },
					});
					return;
				}

				if (botId !== null) {
					let filteredBotsList = botsListRes?.content?.subscribed?.filter(
						(bot) => bot.botId === botId
					);
					updateBotForSelectedDomainInLFStorage(
						selectedDomain,
						filteredBotsList[0]
					);
					setBotsDependenciesList(filteredBotsList);
				} else {
					botsList = botsListRes.content.subscribed;
					setAllBotsForSelectedDomainInLFStorage(selectedDomain, botsList);
					setBotsDependenciesList(botsList);
				}
			}
			botsList = updateNow === true ? botsListRes.content.subscribed : botsList;
			dispatch({
				type: BOT_SUBSCRIPTIONS_RECEIVED,
				data: { botSubscriptions: botsList },
			});

			if (type && type == "update") {
				dispatch(fetchBotsForInstalledTab());
			}
		} catch (error) {
			console.error("Error in fetchBotSubscriptions: ", error);
		}
	};
}

export function fetchCatalog() {
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		ConversationServiceClient.getCatalog({
			isWebRequest: true,
			selectedDomain: seleDom,
		}).then((response) => {
			let subscribedBots = response.bots || [];
			dispatch({
				type: BOT_SUBSCRIPTIONS_RECEIVED,
				data: { botSubscriptions: subscribedBots },
			});
		});
	};
}

export function fetchBotsForInstalledTab() {
	return async (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		seleDom = seleDom?.selectedDomain || seleDom?.userDomain;

		let botsFromLFS = await getDataFromLFStorage(seleDom);

		let botIds = [];
		botIds = botsFromLFS?.map((eachBot) => eachBot.botId);
		const allSystemBots = await UserServiceClient.getAllSystemBots();
		let systemBots = [];
		allSystemBots.content.Items.forEach((item) => {
			if (item.botId === "im-bot" || item.botId === "onboarding-bot") {
				item.botClients.web = true;
				systemBots.push(item);
			}
		});

		ConversationServiceClient.getCatalog({
			isWebRequest: true,
			selectedDomain: seleDom,
		}).then((response) => {
			let subscribedBots = response.bots || [];

			if (botIds.length > 0) {
				subscribedBots = subscribedBots.filter((eachBot) =>
					botIds.includes(eachBot.botId)
				);
				subscribedBots = [...subscribedBots, ...systemBots];

				dispatch({
					type: BOT_SUBSCRIPTIONS_RECEIVED,
					data: { botSubscriptions: subscribedBots },
				});
			}
		});
	};
}

export function unsavedForm(bol) {
	return {
		type: FORM_UNSAVED,
		data: bol,
	};
}

export function logout(paramAppType) {
	AudioElement.pauseRing();
	if (SOCKET.STREAM_QUEUE_MSG !== null) {
		SOCKET.STREAM_QUEUE_MSG.disconnect();
		SOCKET.STREAM_QUEUE_MSG = null;
	}

	if (paramAppType === "onecare") {
		let loginPath = "/onecare";
		history.push({
			pathname: loginPath,
		});
	} else {
		let loginPath = getSignupPath();
		if (loginPath && loginPath.includes("/signup")) {
			loginPath = loginPath.replace("/signup", "");
		}

		if (loginPath && loginPath.length) {
			if (loginPath === FRONTM_LANDING || loginPath === FRONTM_LOGIN) {
				removePathName();
				history.push("/login");
			}
			history.push({
				pathname: loginPath,
			});
		} else {
			removePathName();
			history.push("/login");
		}
	}
	// destructLFStorage();
	return (dispatch, getState) => {
		// degenerating push notifications
		let currentUserDomain = getState().selectedDomain.userDomain;
		let sessionId = getState().user.auth.sessionId;
		let shouldSendPushNotification = false;
		let baseURL = `${Config.gRPCURL}/grpc/user.UserService/DeregisterWebApp`;
		let userEmail = getState().user.user.userEmail;

		let webPushAppType;
		if (currentUserDomain == "onecare") {
			webPushAppType = "onecare_dev";
			shouldSendPushNotification = true;
		}

		if (shouldSendPushNotification) {
			dispatch(
				pushNotificationDegerator({
					currentUserDomain,
					sessionId,
					baseURL,
					webPushAppType,
					userEmail,
				})
			);
		}
		let checkFormUnsaved = getState().user.formUnsaved;
		if (!checkFormUnsaved) {
			window.document.title = "FrontM Platform";
			clearTimeout(window.interval);
			removeAuthData();
			removeOpenForm();
			removeDomainSelcted();
			removeFromStorage();
			removeLoginState();
			removeLinkData();
			removeSelectedConversation();
			dispatch({ type: LOGOUT_USER });
			dispatch(removeSelectedDomain());
			dispatch(removeDomains());
			dispatch(resetNonConversational());
			setUserManualOnline(true);
			dispatch(setUserOnlineStatus(true));
		}
	};
}

export function updateUserProfile(data) {
	return {
		type: UPDATE_USER,
		data: { user: data },
	};
}
export function updateSelectedDomian(data) {
	return {
		type: UPDATE_DOMAIN,
		data: {
			selectedDomain: data,
		},
	};
}

export function closeBanner() {
	return {
		type: UPDATE_BANNER,
		data: {
			bannerType: null,
			message: null,
		},
	};
}

export function sendMsgForBanner(bannerType, msg) {
	return {
		type: UPDATE_BANNER,
		data: {
			bannerType: bannerType,
			message: msg,
		},
	};
}

export function updateTnC(accepted) {
	return (dispatch) => {
		UserServiceClient.updateTnC(accepted).then((data) => {
			if (!data.error || data.error == 0) {
				dispatch({
					type: TERMS_AND_CONDITIONS_ACCEPTED,
					data: { accepted },
				});
			}
		});
	};
}

export const fetchWalletBalanceService = () => (dispatch) => {
	fetchWalletBalance()
		.then((balance) => {
			dispatch(
				setPhoneBalance({
					balance,
				})
			);
		})
		.catch((error) => {
			console.error("Cannot fetch wallet balance", error);
		});
};

export const setCallHistory = (selectedContactId) => (dispatch) => {
	if (selectedContactId) {
		getCallHistoryForSelectedContact(selectedContactId).then((callHistory) => {
			dispatch({
				type: UPDATE_SELECTED_CONTACT_CALL_HISTORY,
				payload: {
					callHistory,
					selectedContactId,
				},
			});
		});
	}
};

export const getLoggedInUserCallHistory =
	(startTime) => (dispatch, getState) => {
		const timeStamp =
			startTime ||
			getState().user.timeStampOfLastRecordInExCallHistoryForLoggedInUser;
		getPaginatedCallHistory(timeStamp)
			.then((callHistory) => {
				dispatch({
					type: UPDATE_LOGGED_IN_USER_CALL_HISTORY,
					payload: {
						records: callHistory.records,
						moreRecordsExist: callHistory.moreRecordsExist,
					},
				});
			})
			.catch((error) => {
				console.error("Cannot fetch logged in user Call History", error);
			});
	};

export const clearLoginError = () => {
	return {
		type: CLEAR_LOGIN_ERROR,
		payload: "",
	};
};

export const clearLoggedInUserCallHistory = () => {
	return {
		type: CLEAR_LOGGED_IN_USER_CALL_HISTORY,
	};
};
export const setPhoneBalance = (payload) => ({
	type: UPDATE_PHONE_BALANCE,
	payload,
});

export const setCallQuality = (payload) => ({
	type: SET_CALL_QUALITY,
	payload,
});

export const setUserProfileImage = (payload) => ({
	type: PROFILE_IMAGE,
	payload,
});

export const enable2faAuthModal = (data) => ({
	type: ENABLE_2FA_AUTH_MODAL,
	data,
});

export const setUserOnlineStatus = (payload) => (dispatch) => {
	if (payload) {
		dispatch(setBannerVisibility(false));
		setUserOnline(true);
		setTimeout(() => {
			dequeueFileUpload();
			dispatch(streamChatMessages());
		}, 30000);
	} else {
		setUserOnline(false);
		dispatch(setBannerVisibility(true));
	}
	AudioElement.pauseBeep();
	dispatch({
		type: USER_ONLINE_STATUS,
		payload,
	});
};
