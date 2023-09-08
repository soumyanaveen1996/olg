import ConversationServiceClient from "../../Services/Clients/ConversationServiceClient";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import Notify from "../../Components/ModalMessages/ToastNotif";
import { fetchBotSubscriptions, isCorporateLicenseValid } from "./user";
import AudioElement from "../../Utils/AudioElement";
const R = require("ramda");

export const BOTS_RECEIVED = "BOTS_RECEIVED";
export const COMPANIES_RECEIVED = "COMPANIES_RECEIVED";
export const CATEGORIES_RECEIVED = "CATEGORIES_RECEIVED";
export const CATALOGUE_URL = "/catalog";
export const CATALOGUE_ERROR = "CATALOGUE_ERROR";
export const SEARCH_RESULTS_RECEIVED = "SEARCH_RESULTS_RECEIVED";
export const PASSWORD_SUCCESS = "PASSWORD_SUCCESS";
export const UPDATE_MFA_STATUS = "UPDATE_MFA_STATUS";
export const SELECTED_BOT_ID = "SELECTED_BOT_ID";

export function fetchBots(query, noSpinner) {
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;

		console.log("@fetchBots before making getCatalog call ");
		ConversationServiceClient.getCatalog(
			{
				isWebRequest: true,
				query: JSON.stringify(query),
				selectedDomain: seleDom.userDomain,
			},
			noSpinner
		).then(function (data) {
			let bots = data.bots || [];
			// console.log("data to bot  ====== ", data);
			AudioElement.pauseRing();
			dispatch({
				type: BOTS_RECEIVED,
				data: { bots: bots.filter((bot) => !bot.systemBot) },
			});
		});
	};
}

export function passwordAuthSuccess() {
	return (dispatch) => {
		dispatch({
			type: PASSWORD_SUCCESS,
			data: { mfaStatus: "validateNumber" },
		});
	};
}

export function updateMFAStatus(data) {
	return (dispatch) => {
		dispatch({
			type: UPDATE_MFA_STATUS,
			data: { mfaStatus: data },
		});
	};
}
export function selectedBotId(data) {
	return (dispatch) => {
		AudioElement.pauseRing();
		dispatch({
			type: SELECTED_BOT_ID,
			data: {
				selectedBotId: data.botId,
				conversationBot: data.conversationBot,
			},
		});
	};
}

export function fetchCompanies() {
	console.log("@fetchCompanies before making getCatalog call ");
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		ConversationServiceClient.getCatalog({
			isWebRequest: true,
			output: "companies",
			selectedDomain: seleDom.userDomain,
		}).then(function (data) {
			let companies = data.companies;
			let cKeys = Object.keys(companies);
			let results = {};
			cKeys.map((key) => {
				results[key] = companies[key].bots;
			});
			if (!getState().user.isLicenseValid) {
				dispatch(isCorporateLicenseValid(true));
			}
			dispatch({
				type: COMPANIES_RECEIVED,
				data: { companies: results },
			});
		});
	};
}

export function fetchCategories() {
	console.log("@fetchCategories before making getCatalog call ");
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		ConversationServiceClient.getCatalog({
			isWebRequest: true,
			output: "categories",
			selectedDomain: seleDom.userDomain,
		}).then(function (data) {
			// console.log("fetch categories ==== ", data);
			let categories = data.categories;
			let cKeys = Object.keys(categories);
			let results = {};
			cKeys.map((key) => {
				results[key] = categories[key].bots.filter((bot) => !bot.systemBot);
			});

			dispatch({
				type: CATEGORIES_RECEIVED,
				data: { categories: results },
			});
		});
	};
}

export function subscribeToBot(botId, type) {
	console.log("subscibe bot ===== ", botId);
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		let seledDomObj = {
			selectedDomain: seleDom.userDomain,
		};

		UserServiceClient.subscribeBot({ botId })
			.then((response) => {
				dispatch(fetchBotSubscriptions(seledDomObj, botId, true, true, type));
			})
			.catch((error) => {
				Notify({
					type: "error",
					message:
						"Error installing the bot. Please try again later. If the error persists report the issue to the FrontM Platform",
				});
				dispatch({ type: CATALOGUE_ERROR });
			});
	};
}

export function searchCatalogue(searchKey) {
	if (!searchKey || searchKey.length === 0) {
		return {
			type: SEARCH_RESULTS_RECEIVED,
			data: { bots: [], searchKey },
		};
	}
	console.log("@searchCatalogue before making getCatalog call ");
	return (dispatch, getState) => {
		let seleDom = getState().selectedDomain;
		ConversationServiceClient.getCatalog({
			isWebRequest: true,
			query: JSON.stringify({ searchKey: searchKey }),
			selectedDomain: seleDom.userDomain,
		}).then(function (data) {
			// console.log("all the data to search ", data);
			let botArray = [...data.bots];
			let bitsA = botArray.filter((bot) => {
				// console.log("we will see each bot ", bot);
			});

			dispatch({
				type: SEARCH_RESULTS_RECEIVED,
				data: {
					searchResults: botArray.filter(
						(bot) =>
							// R.isNil(R.prop("systemBot", bot))
							bot
					),
					searchKey,
				},
			});
		});
	};
}

// onUnsubscribe = e => {
//   e.preventDefault();
//   e.stopPropagation();
//   const botId = e.currentTarget.dataset.botid;
//   const data = { botId };
//   let url = `/bots/unsubscribe`;
//   Ajax.post(url, data)
//     .then(this.props.getBotSubscriptions)
//     .catch(error => {
//       Notify({
//         type: "error",
//         message: "An unexpected error occurred.Cannot Unsubscribe Bots"
//       });
//     });
// };
