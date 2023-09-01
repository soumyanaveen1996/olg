import { SHOW_MODAL, HIDE_MODAL } from "../actions/modal";
import { LOGOUT_USER } from "../actions/user";

const initialState = {
	title: null,
	size: null,
	close: null,
	modalProps: null,
	type: null,
};

function modalReducer(state = initialState, action = null) {
	switch (action.type) {
		case SHOW_MODAL:
			let data = action.data;
			return {
				title: data.title,
				size: data.size,
				close: data.close,
				modalProps: data.modalProps,
				type: data.type,
			};
		case HIDE_MODAL:
			return initialState;

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default modalReducer;
