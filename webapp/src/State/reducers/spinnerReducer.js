import { SHOW_SPINNER, HIDE_SPINNER } from "../actions/spinner";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	loading: false,
};

function spinnerReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_SPINNER:
			return { loading: true };

		case HIDE_SPINNER:
			return { ...initialState };

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default spinnerReducer;
