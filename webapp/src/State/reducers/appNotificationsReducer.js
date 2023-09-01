import {
	ADD_APP_NOTIFICATION,
	REMOVE_APP_NOTIFICATION,
	HIDE_APP_NOTIFICATION_MODAL,
	SHOW_APP_NOTIFICATION_MODAL,
} from "../actions/appNotifications";
import _ from "lodash";
import { createUUID } from "../../Utils/Helpers";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	show: false,
	notificationTypes: [],
	notifications: [],
};

function appNotificationsReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_APP_NOTIFICATION:
			let type = action.data.type;
			let existingNotificationTypes = state.notificationTypes;
			if (existingNotificationTypes.indexOf(type) === -1) {
				existingNotificationTypes.push(type);
			}
			return {
				...state,
				notificationTypes: existingNotificationTypes,
				notifications: [
					{ ...action.data, id: createUUID() },
					...state.notifications,
				],
				show: true,
			};

		case REMOVE_APP_NOTIFICATION:
			let id = action.data.id;
			let msg = action.data.msg;
			let notificationTypes = state.notificationTypes;
			let show = state.show;
			const notifications = state.notifications;
			if (id) {
				_.remove(notifications, (notification) => {
					return notification.id === id;
				});
			} else if (msg) {
				_.remove(notifications, (notification) => {
					return notification.msg === msg;
				});
			}

			console.log("Manish notifications :: ", notifications);

			let keepType = false;
			for (let i = 0; i < notifications.length; i++) {
				if (notifications[i].type === action.data.type) {
					keepType = true;
					break;
				}
			}
			!keepType && _.pull(notificationTypes, action.data.type);
			if (notifications.length === 0) {
				show = false;
			}
			return {
				...state,
				notificationTypes: notificationTypes,
				notifications: [...notifications],
				show: show,
			};

		case HIDE_APP_NOTIFICATION_MODAL:
			return {
				...state,
				show: false,
			};

		case SHOW_APP_NOTIFICATION_MODAL:
			return {
				...state,
				show: true,
			};
		case LOGOUT_USER:
			return {
				...initialState,
				//show: false,
				//notificationTypes: [],
				//notifications: []
			};
		default:
			return state;
	}
}

export default appNotificationsReducer;
