import {
	BANNER_VISIBILITY,
	SET_COUNTER,
	SET_LAST_CALL,
} from "../actions/offlineBanner";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	visibility: false,
	counter: 5,
	latestAPIRequest: null,
};

function offlineBannerReducer(state = initialState, action) {
	switch (action.type) {
		case BANNER_VISIBILITY:
			return { ...state, visibility: false };

		case SET_COUNTER:
			return { ...state, counter: action.data };

		case SET_LAST_CALL:
			return { ...state, latestAPIRequest: action.data };

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default offlineBannerReducer;
