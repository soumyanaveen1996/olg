import {
	BOTS_RECEIVED,
	COMPANIES_RECEIVED,
	CATEGORIES_RECEIVED,
	CATALOGUE_ERROR,
	SEARCH_RESULTS_RECEIVED,
	PASSWORD_SUCCESS,
	UPDATE_MFA_STATUS,
	SELECTED_BOT_ID,
} from "../actions/catalogue";

import { LOGOUT_USER } from "../actions/user";

let initialState = {
	bots: [],
	companies: null,
	categories: null,
	searchResults: [],
	searchKey: null,
	mfaStatus: null,
	selectedBotId: null,
	conversationBot: null,
};

function catalogueReducer(state = initialState, action) {
	switch (action.type) {
		case BOTS_RECEIVED:
			return {
				...state,
				bots: [].concat(action.data.bots),
			};

		case COMPANIES_RECEIVED:
			return {
				...state,
				companies: action.data.companies,
			};

		case PASSWORD_SUCCESS:
			return {
				...state,
				mfaStatus: action.data.mfaStatus,
			};
		case UPDATE_MFA_STATUS:
			return {
				...state,
				mfaStatus: action.data.mfaStatus,
			};
		case SELECTED_BOT_ID:
			return {
				...state,
				conversationBot: action.data.conversationBot,
				selectedBotId: action.data.selectedBotId,
			};

		case CATEGORIES_RECEIVED:
			return {
				...state,
				categories: action.data.categories,
			};

		case SEARCH_RESULTS_RECEIVED: {
			let sr = action.data.searchResults;
			return {
				...state,
				searchResults: sr ? [].concat(sr) : [],
				searchKey: action.data.searchKey,
			};
		}

		case LOGOUT_USER:
			return { ...initialState };

		case CATALOGUE_ERROR:
		default:
			return state;
	}
}

export default catalogueReducer;
