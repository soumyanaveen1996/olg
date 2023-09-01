import {
	SELECTED_DOMAIN,
	UPDATE_DOMAIN,
	DOMAIN_SELECTED_IN,
	REMOVE_SELECTED_DOMAIN,
} from "../actions/user";

import _ from "lodash";

import { updateDataInStorage } from "../../Services/StorageService";

let initialState = null;

function selectedDomainReducer(state = initialState, action) {
	switch (action.type) {
		case DOMAIN_SELECTED_IN: {
			let domainSelected = {};
			let selectedDomain = _.cloneDeep(action.data.selectedDomain);
			domainSelected = { ...selectedDomain };
			let newState = {
				...state,
				...domainSelected,
			};
			return newState;
		}
		case REMOVE_SELECTED_DOMAIN:
			return null;

		case UPDATE_DOMAIN: {
			let updDomain = {};
			let domainUpdated = _.cloneDeep(action.data.selectedDomain);
			updDomain = { ...domainUpdated };
			updateDataInStorage("StoredDomain", updDomain);
			let newState = {
				...state,
				updDomain,
			};
			return newState;
		}
		case SELECTED_DOMAIN: {
			let selectedDomain = _.cloneDeep(action.data.selectedDomain);
			let domainSelected = {};
			domainSelected = { ...selectedDomain };

			let newState = { ...state, ...domainSelected };
			return newState;
		}
		default:
			return state;
	}
}

export default selectedDomainReducer;
