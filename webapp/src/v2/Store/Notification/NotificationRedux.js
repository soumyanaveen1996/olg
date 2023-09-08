import {
	SHOW_SNACKBAR,
	HIDE_SNACKBAR,
	RENDER_NOTIFICATION,
	REMOVE_NOTIFICATION,
	RING_START,
} from "./types";

let initialState = {};

export function SnackbarReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_SNACKBAR:
		case HIDE_SNACKBAR:
			return action.data;
		default:
			return state;
	}
}

export function NotificationReducer(state = initialState, action) {
	switch (action.type) {
		case RENDER_NOTIFICATION:
		case REMOVE_NOTIFICATION:
			return { ...state, ...action.data };
		default:
			return state;
	}
}

export function CallNotificationReducer(state = initialState, action) {
	switch (action.type) {
		case RING_START:
			return { ...state, ...action.data };
		default:
			return state;
	}
}
