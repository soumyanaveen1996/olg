import {
	FILES_SELECTED,
	REMOVE_FILE,
	CANCEL_UPLOAD,
	SET_CONVERSATION_DETAILS,
} from "../actions/files";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	selected: [],
	conversationId: null,
	conversationName: null,
};

function filesReducer(state = initialState, action) {
	switch (action.type) {
		case FILES_SELECTED:
			return {
				...state,
				selected: [].concat(action.data.files),
			};

		case REMOVE_FILE:
			let index = action.data.index;
			let { selected } = state;
			let updatedFiles = [
				...selected.slice(0, index),
				...selected.slice(index + 1),
			];
			return {
				...state,
				selected: updatedFiles,
			};

		// case SET_CONVERSATION_DETAILS:
		//   return {
		//     ...state,
		//     conversationId: action.data.conversationId,
		//     conversationName: action.data.conversationName
		//   };

		case CANCEL_UPLOAD:
			return {
				selected: [],
			};

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default filesReducer;
