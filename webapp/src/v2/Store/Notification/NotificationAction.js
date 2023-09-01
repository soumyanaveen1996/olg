import {
	SHOW_SNACKBAR,
	HIDE_SNACKBAR,
	RENDER_NOTIFICATION,
	REMOVE_NOTIFICATION,
	RING_START,
} from "./types";
import store from "../../../State/configureStore";
import _ from "lodash";

export const showSnackbarV2 = (severity, message) => (dispatch) => {
	dispatch({
		type: SHOW_SNACKBAR,
		data: {
			severity,
			message,
		},
	});
};

export const hideSnackbarV2 = () => (dispatch) => {
	dispatch({
		type: HIDE_SNACKBAR,
		data: null,
	});
};

export const handleMessageTypeNotification =
	(conversationId, message) => (dispatch) => {
		if (
			store.getState().v2.Notification &&
			!_.isEmpty(store.getState().v2.Notification)
		) {
			let NonConversationalData =
				store.getState().v2.Notification[conversationId];

			if (
				NonConversationalData &&
				!_.isEmpty(NonConversationalData) &&
				["ringStart", "ringStop", "startVideo"].includes(message.message.action)
			) {
				// NonConversationalData.forEach((item, i) => {
				// 	if (
				// 		(item?.messageId && message?.messageId,
				// 		item?.messageId === message?.messageId)
				// 	) {
				// 		NonConversationalData.splice(i, 1);
				// 	}
				// });

				NonConversationalData = NonConversationalData.filter(
					(item) => item?.messageId !== message?.messageId
				);

				NonConversationalData.push(message);
			} else {
				NonConversationalData = [message];
			}

			dispatch({
				type: RENDER_NOTIFICATION,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		} else {
			dispatch({
				type: RENDER_NOTIFICATION,
				data: {
					[conversationId]: [message],
				},
			});
		}
	};

export const handleMessageTypeNonVideoNotification =
	(conversationId, message) => (dispatch) => {
		if (
			store.getState().v2.Notification &&
			!_.isEmpty(store.getState().v2.Notification)
		) {
			let NonConversationalData =
				store.getState().v2.Notification[conversationId];

			if (NonConversationalData && !_.isEmpty(NonConversationalData)) {
				NonConversationalData = NonConversationalData.filter((item) => {
					if (
						(item?.messageId && message?.messageId,
						item?.messageId === message?.messageId)
					) {
						return false;
					}
					return true;
				});
				NonConversationalData = [...NonConversationalData, message];
			} else {
				NonConversationalData = [message];
			}

			dispatch({
				type: RENDER_NOTIFICATION,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		} else {
			dispatch({
				type: RENDER_NOTIFICATION,
				data: {
					[conversationId]: [message],
				},
			});
		}
	};

export const removeNotification = (conversationId, messageId) => (dispatch) => {
	if (
		store.getState().v2.Notification &&
		!_.isEmpty(store.getState().v2.Notification)
	) {
		let NonConversationalData =
			store.getState().v2.Notification[conversationId];

		if (NonConversationalData && !_.isEmpty(NonConversationalData)) {
			NonConversationalData.forEach((item, i) => {
				if ((item?.messageId && messageId, item?.messageId === messageId)) {
					NonConversationalData.splice(i, 1);
				}
			});
		}

		dispatch({
			type: REMOVE_NOTIFICATION,
			data: {
				[conversationId]: NonConversationalData,
			},
		});
	}
};

export const removeNotifications =
	(conversationId, messageIds) => (dispatch) => {
		if (
			store.getState().v2.Notification &&
			!_.isEmpty(store.getState().v2.Notification)
		) {
			let NonConversationalData =
				store.getState().v2.Notification[conversationId];

			if (NonConversationalData && !_.isEmpty(NonConversationalData)) {
				NonConversationalData = NonConversationalData.filter((item, i) => {
					if (
						(item?.messageId && messageIds && messageIds?.length,
						messageIds?.includes(item?.messageId))
					) {
						return false;
					}
					return true;
				});
			}

			dispatch({
				type: REMOVE_NOTIFICATION,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		}
	};

export const markAsOldNotifications = (conversationId) => (dispatch) => {
	if (
		store.getState().v2.Notification &&
		!_.isEmpty(store.getState().v2.Notification)
	) {
		let NonConversationalData =
			store.getState().v2.Notification[conversationId];

		if (NonConversationalData && !_.isEmpty(NonConversationalData)) {
			NonConversationalData = NonConversationalData.map((item, i) => {
				return { ...item, markAsOld: true };
			});
		}

		dispatch({
			type: RENDER_NOTIFICATION,
			data: {
				[conversationId]: NonConversationalData,
			},
		});
	}
};

export const startRingCallCenter = (toggleData, data) => (dispatch) => {
	if (!toggleData && !data) {
		dispatch({
			type: RING_START,
			data: {
				toggle: false,
			},
		});
	}
	dispatch({
		type: RING_START,
		data: {
			toggle: toggleData,
			videoCallData: { ...data },
		},
	});
};
