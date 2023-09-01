import {
	USER_LOG_IN_ERROR,
	USER_LOGGED_IN,
	LOGOUT_USER,
	BOT_SUBSCRIPTIONS_RECEIVED,
	UPDATE_USER,
	TERMS_AND_CONDITIONS_ACCEPTED,
	USER_GEOLOCATION_DATA,
	UPDATE_PHONE_BALANCE,
	UPDATE_CALL_HISTORY,
	PROFILE_IMAGE,
	UPDATE_USER_AUTH_DATA,
	UPDATE_LOGIN_METHOD,
	UPDATE_BANNER,
	FORM_UNSAVED,
	UPDATE_LOGGED_IN_USER_CALL_HISTORY,
	CLEAR_LOGGED_IN_USER_CALL_HISTORY,
	UPDATE_SELECTED_CONTACT_CALL_HISTORY,
	CLEAR_LOGIN_ERROR,
	SET_REFRESH_ANONYMOUS_SESSION_FLAG,
	SHOW_ERROR_PAGE,
	SHOW_SESSION_EXPIRED,
	SET_CALL_QUALITY,
	VOIP_STATUS,
	LICENSE_STATUS,
	REMOVE_USER_LOG_IN_ERROR,
	REMOVE_SUBSCRIBED_BOTS,
	USER_ONLINE_STATUS,
	UPDATE_IS_IDLE_STATUS,
	UPDATE_SOFTWARE_MFA_STATUS,
	UPDATE_QR_CODE_URI,
	UPDATE_SOFTWARE_MFA,
	UPDATE_BOTID_MFA,
	ENABLE_2FA_AUTH_MODAL,
	GENERATING_PUSH_NOTIFICATIONS,
	DE_GENERATING_PUSH_NOTIFICATIONS,
	pushNotificationsApiRequest,
} from "../actions/user";
import _ from "lodash";

import { UPDATE_USER_BOT_SUBSCRIPTION } from "../actions/notification";
import { getUpdatedSubscriptions } from "../../Utils/Helpers";
import {
	isUserOnline,
	isUserManualOnline,
	updateDataInStorage,
	getAuthData,
} from "../../Services/StorageService";

let initialState = {
	isOnline: _.isEmpty(getAuthData())
		? true
		: isUserManualOnline() && navigator.onLine && isUserOnline(),
	user: null,
	auth: null,
	error: null,
	formUnsaved: false,
	botSubscriptions: [],
	settingsOpen: false,
	balance: 0,
	callHistory: [],
	loggedInUserCallHistory: [],
	timeStampOfLastRecordInRcvdCallHistoryForLoggedInUser: null,
	hasMoreRecords: true,
	contactsCallHistory: {},
	clear_login_error: "",
	isRefreshAnonymousSessionBeingCalled: false,
	show404Error: false,
	sessionExpired: false,
	retryReconnectCount: 0,
	low_bw_calls: false,
	voipStatus: {},
	isLicenseValid: true,
	isIdle: false,
	softwareMfaStatus: null,
	qrCodeURI: null,
	enable2faAuthModal: false,
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOG_IN_ERROR:
			return { ...state, error: action.data.message };
		case REMOVE_USER_LOG_IN_ERROR:
			return { ...state, error: null };
		case SHOW_ERROR_PAGE:
			return { ...state, show404Error: !state.show404Error };
		case SHOW_SESSION_EXPIRED:
			return { ...state, sessionExpired: action.data };
		case VOIP_STATUS:
			return { ...state, voipStatus: { ...action.data } };
		case LICENSE_STATUS:
			return {
				...state,
				isLicenseValid: action.data,
			};
		case USER_LOGGED_IN:
			return {
				...state,
				user: action.data.user,
				low_bw_calls: action.data.user && action.data.user.lowBandwidthCalls,
				auth: action.data.auth,
				isAnonymousUser: action.data.isAnonymousUser,
				error: null,
			};

		case PROFILE_IMAGE:
			return {
				...state,
				profileImage: action.payload,
			};
		case UPDATE_BANNER:
			return {
				...state,
				bannerDetails: {
					...action.data,
				},
			};
		case FORM_UNSAVED:
			return {
				...state,
				formUnsaved: action.data,
			};
		case USER_GEOLOCATION_DATA:
			return {
				...state,
				geoData: { ...action.data },
			};

		case UPDATE_IS_IDLE_STATUS:
			return {
				...state,
				isIdle: action.data,
			};
		case UPDATE_QR_CODE_URI:
			return {
				...state,
				qrCodeURI: action.data,
			};
		case UPDATE_SOFTWARE_MFA:
			return {
				...state,
				user: {
					...state.user,
					softwareMfaEnabled: action.data,
				},
			};
		case UPDATE_BOTID_MFA:
			return {
				...state,
				currentBotId: action.data,
			};
		case UPDATE_SOFTWARE_MFA_STATUS:
			return {
				...state,
				softwareMfaStatus: action.status,
			};
		case ENABLE_2FA_AUTH_MODAL:
			return {
				...state,
				enable2faAuthModal: action.data,
			};
		case BOT_SUBSCRIPTIONS_RECEIVED:
			return {
				...state,
				botSubscriptions: action.data.botSubscriptions,
			};
		case REMOVE_SUBSCRIBED_BOTS:
			return {
				...state,
				botSubscriptions: [],
			};

		case UPDATE_USER_BOT_SUBSCRIPTION: {
			let subscription = action.data.subscription;
			let subscriptions = state.user.webSubscriptions || [];
			let updatedSubscriptions = getUpdatedSubscriptions(
				subscriptions,
				subscription
			);
			return {
				...state,
				user: {
					...state.user,
					webSubscriptions: [].concat(updatedSubscriptions),
				},
			};
		}

		case GENERATING_PUSH_NOTIFICATIONS:
			let dataToGenerate = action.data;
			if (dataToGenerate) {
				pushNotificationsApiRequest(dataToGenerate);
			}
			return {
				...state,
			};
		case DE_GENERATING_PUSH_NOTIFICATIONS:
			let dataToDEgenrate = action.data;
			if (dataToDEgenrate) {
				pushNotificationsApiRequest(dataToDEgenrate);
			}
			return {
				...state,
			};

		case UPDATE_USER: {
			let updUser = Object.assign({}, state.user, action.data.user);
			updateDataInStorage("user", updUser);
			return {
				...state,
				user: updUser,
			};
		}
		case UPDATE_PHONE_BALANCE:
			return {
				...state,
				...action.payload,
			};
		case UPDATE_CALL_HISTORY:
			return {
				...state,
				...action.payload,
			};
		case UPDATE_SELECTED_CONTACT_CALL_HISTORY: {
			const { callHistory, selectedContactId } = action.payload;
			let updatedContactCallHistory = state.contactsCallHistory;
			updatedContactCallHistory[selectedContactId] = callHistory
				? callHistory.content
				: [];

			return {
				...state,
				contactsCallHistory: updatedContactCallHistory,
			};
		}
		case UPDATE_LOGGED_IN_USER_CALL_HISTORY: {
			let rcvdCallHistory = action.payload.records;
			let moreRecordsExist = action.payload.moreRecordsExist;
			// rcvdCallHistory.sort((a, b) => b.callTimestamp - a.callTimestamp)
			const exCallHistory = state.loggedInUserCallHistory;

			const customResults = _.differenceWith(
				rcvdCallHistory,
				exCallHistory,
				(rcvdCallRecord, exCallRecord) =>
					exCallRecord.callTimestamp === rcvdCallRecord.callTimestamp
			);
			// console.log("customResults", customResults);
			exCallHistory.push(...customResults);
			exCallHistory.sort((a, b) => b.callTimestamp - a.callTimestamp);

			const timeStampOfLastRecordInExCallHistoryForLoggedInUser =
				exCallHistory &&
				exCallHistory[exCallHistory.length - 1] &&
				exCallHistory[exCallHistory.length - 1].callTimestamp
					? exCallHistory[exCallHistory.length - 1].callTimestamp
					: null;

			const updatedRecords = [...exCallHistory, ...rcvdCallHistory];

			return {
				...state,
				loggedInUserCallHistory: exCallHistory,
				timeStampOfLastRecordInExCallHistoryForLoggedInUser:
					timeStampOfLastRecordInExCallHistoryForLoggedInUser,
				hasMoreRecords: moreRecordsExist,
			};
		}
		case CLEAR_LOGGED_IN_USER_CALL_HISTORY:
			return {
				...state,
				loggedInUserCallHistory: [],
				timeStampOfLastRecordInRcvdCallHistoryForLoggedInUser: null,
				hasMoreRecords: true,
			};
		case CLEAR_LOGIN_ERROR:
			return { ...state, error: null };

		case TERMS_AND_CONDITIONS_ACCEPTED: {
			let user = state.user;
			if (action.data.accepted) {
				user.tncAccept = true;
				updateDataInStorage("user", user);
				return { ...state, user: { ...user } };
			} else {
				return { ...state };
			}
		}
		case UPDATE_LOGIN_METHOD: {
			let loginState = action.data.data;
			return {
				...state,
				loginState: loginState,
			};
		}
		case UPDATE_USER_AUTH_DATA: {
			let newUserVal = action.data.newUser;
			return {
				...state,
				auth: {
					...state.auth,
					newUser: newUserVal,
				},
			};
		}
		case SET_REFRESH_ANONYMOUS_SESSION_FLAG: {
			let status = action.data;
			return {
				...state,
				isRefreshAnonymousSessionBeingCalled: status,
			};
		}
		case LOGOUT_USER:
			return {
				...initialState,
				loggedInUserCallHistory: [],
				timeStampOfLastRecordInRcvdCallHistoryForLoggedInUser: null,
				hasMoreRecords: true,
				contactsCallHistory: {},
			};
		case SET_CALL_QUALITY:
			return {
				...state,
				...action.payload,
			};

		case USER_ONLINE_STATUS:
			return Object.assign({
				...state,
				isOnline: action.payload,
			});
		default:
			return state;
	}
}

export default userReducer;
