import { RENDER_NONCONVERSATIONAL_FILTER } from "./types";

let initialState = {};

export function NonConversationalFilterReducer(state = initialState, action) {
	switch (action.type) {
		case RENDER_NONCONVERSATIONAL_FILTER:
			return { ...state, ...action.data };
		default:
			return state;
	}
}
