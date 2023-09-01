import { SHOW_LOADER, HIDE_LOADER, BOT_WAIT_LOADER } from "../actions/loader";

let initialState = {
	process: [],
	botWaitLoader: false,
};

function loaderReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_LOADER:
		case HIDE_LOADER:
		case BOT_WAIT_LOADER:
			return {
				...state,
				...action.data,
			};

		default:
			return state;
	}
}

export default loaderReducer;
