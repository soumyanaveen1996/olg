export const ADD_APP_NOTIFICATION = "ADD_APP_NOTIFICATION";
export const REMOVE_APP_NOTIFICATION = "REMOVE_APP_NOTIFICATION";
export const SHOW_APP_NOTIFICATION_MODAL = "SHOW_APP_NOTIFICATION_MODAL";
export const HIDE_APP_NOTIFICATION_MODAL = "HIDE_APP_NOTIFICATION_MODAL";

export function addAppNotification(msg, type) {
	return {
		type: ADD_APP_NOTIFICATION,
		data: {
			msg: msg,
			type: type,
		},
	};
}

export function removeAppNotification(val, type, valType) {
	if (valType === "id") {
		return {
			type: REMOVE_APP_NOTIFICATION,
			data: {
				id: val,
				type: type,
			},
		};
	} else if (valType === "msg") {
		return {
			type: REMOVE_APP_NOTIFICATION,
			data: {
				msg: val,
				type: type,
			},
		};
	}
}

export function showAppNotificationModal() {
	return {
		type: SHOW_APP_NOTIFICATION_MODAL,
		data: {
			show: true,
		},
	};
}

export function hideAppNotificationModal() {
	return {
		type: HIDE_APP_NOTIFICATION_MODAL,
		data: {
			show: false,
		},
	};
}
