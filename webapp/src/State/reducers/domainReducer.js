import { DOMAIN_RECEIVED, REMOVE_DOMAINS } from "../actions/user";

let initialState = null;

function domainReducer(state = initialState, action) {
	switch (action.type) {
		case DOMAIN_RECEIVED: {
			return { ...state, domains: [...action.data.domains.domains] };
		}
		case REMOVE_DOMAINS: {
			return null;
		}

		default:
			return state;
	}
}

export default domainReducer;
